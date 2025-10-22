import validator from "validator";
import hospital from "../models/hospital.model.js";

//register route check function
const register = async (req) => {
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
  //Is valid password
  if (!validator.isStrongPassword(password)) {
    throw new Error("Not a strong password!");
  }
  // Check if hospital already exists
  const existingHospital = await hospital.findOne({
    $or: [
      { email },
      { contact },
      { registrationNumber },
      { licenseNumber },
      { hospitalName },
    ],
  });

  if (existingHospital) {
    throw new Error("Hospital already exists with the provided credentials.");
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
};
