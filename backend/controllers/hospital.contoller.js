// controllers/hospitalController.js

import hospitalModel from "../models/hospital.model.js";
import adminModel from "../models/admin.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
/* import fs from "fs";
import path from "path"; */

// Register a new hospital
export const registerHospital = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      hospitalName,
      email,
      contact,
      hospitalType,
      icuBeds,
      address,
      state,
      city,
      pincode,
      registrationNumber,
      licenseNumber,
      adminName,
      password,
    } = req.body;

    // Check if hospital already exists
    const existingHospital = await hospitalModel.findOne({
      $or: [
        { email },
        { contact },
        { registrationNumber },
        { licenseNumber },
        { hospitalName },
        { adminName },
      ],
    });

    if (existingHospital) {
      return res.status(400).json({
        message: "Hospital already exists with the provided credentials.",
      });
    }

    // Check if all required files are present
    const regFile = req.files?.registrationFile?.[0];
    const licFile = req.files?.licenseFile?.[0];
    const adminIdFile = req.files?.adminID?.[0];

    if (!regFile || !licFile || !adminIdFile) {
      return res
        .status(400)
        .json({ message: "All required files must be uploaded." });
    }

    // ✅ Upload helper
    const uploadToCloudinary = (fileBuffer, folder) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder }, (err, result) => {
            if (err) return reject(err);
            resolve(result.secure_url);
          })
          .end(fileBuffer);
      });
    };

    // ✅ Upload files to Cloudinary (only now!)
    const registrationFileUrl = await uploadToCloudinary(
      regFile.buffer,
      "hospital_docs"
    );
    const licenseFileUrl = await uploadToCloudinary(
      licFile.buffer,
      "hospital_docs"
    );
    const adminIDUrl = await uploadToCloudinary(
      adminIdFile.buffer,
      "hospital_docs"
    );

    // Hash password
    const hashedPassword = await hospitalModel.hashPassword(password);

    // Save to DB
    const newHospital = await hospitalModel.create({
      hospitalName,
      email,
      contact,
      hospitalType,
      icuBeds,
      address,
      state,
      city,
      pincode,
      registrationNumber,
      registrationFile: registrationFileUrl,
      licenseNumber,
      licenseFile: licenseFileUrl,
      adminName,
      adminID: adminIDUrl,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Hospital registered successfully.",
      hospital: {
        id: newHospital._id,
        email: newHospital.email,
        hospitalName: newHospital.hospitalName,
      },
    });
  } catch (error) {
    console.error("Hospital registration error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
//login a hospital or admin 
export const loginHospital = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    if (role === "hospital") {
      user = await hospitalModel.findOne({ email }).select("+password");
    } else if (role === "admin") {
      user = await adminModel.findOne({ email }).select("+password");
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token =await jwt.sign(
        { email: user.email }, //This function creates (signs) a new JWT token.The data you embed inside the token.(payload)
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );;

    res.status(200).json({
      message: "Login successful",
      token,
      role,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || user.hospitalName,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  } 
};
//Fetch all hospital data
export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await hospitalModel.find({});
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hospitals" });
  }
};

//verify hospital by admin
export const verifyHospital = async (req, res) => {
  try {
    const { id } = req.params;
    await hospitalModel.findByIdAndUpdate(id, { isVerified: true });
    res.status(200).json({ message: "Hospital verified" });
  } catch (error) {
    res.status(500).json({ error: "Verification failed" });
  }
};

//fetch hospital data by id
export const getHospitalProfile = async (req, res) => {
  try {
    const hospital = await hospitalModel
      .findOne({ email: req.email })
      .select("-password");
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json(hospital);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: err.message });
  }
};

