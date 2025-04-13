import hospitalModel from "../models/hospital.model.js";
import adminModel from "../models/admin.model.js";
import { validationResult } from "express-validator";
export const registerAdmin = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if email, contact or registration number already exist
    const existingAdmin = await adminModel.findOne({
      $or: [{ email }],
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists with the provided credentials.",
      });
    }

    // Hash the password
    const hashedPassword = await hospitalModel.hashPassword(password);

    // Save hospital
    const newAdmin = await adminModel.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin registered successfully.",
      Admin: {
        id: newAdmin._id,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.error("Admin registration error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
