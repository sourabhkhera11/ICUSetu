import express from "express";
import multer from "multer"; 
import { body } from "express-validator";
import {
  registerHospital,
  loginHospital,
  getAllHospitals,
  verifyHospital,
  getHospitalProfile,
  getVerifiedHospitalsWithBedInfo,
} from "../controllers/hospital.contoller.js";
import { registerAdmin } from "../controllers/seedAdmin.js";
import {authenticateHospital} from "../middleware/authMiddleware.js";
import {authenticateAdmin}  from "../middleware/adminAuth.js";
/* // Create upload directory if it doesn't exist
const uploadPath = "uploads/hospitals";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
} */

// ✅ Multer Cloudinary Storage Setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Router setup
const router = express.Router();

// Validation rules
const hospitalValidationRules = [
  body("hospitalName").notEmpty().withMessage("Hospital name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("contact")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact number must be exactly 10 digits"),
  body("hospitalType")
    .isIn(["private", "government"])
    .withMessage("Hospital type must be 'private' or 'government'"),
  body("icuBeds").notEmpty().withMessage("ICU beds count is required"),
  body("address").isLength({ min: 6 }),
  body("state").notEmpty(),
  body("city").notEmpty(),
  body("pincode")
    .isLength({ min: 6, max: 6 })
    .withMessage("Pincode must be 6 digits"),
  body("registrationNumber").notEmpty(),
  body("licenseNumber").notEmpty(),
  body("adminName").notEmpty(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

// Route: Register Hospital
router.post(
  "/register",
  upload.fields([
    { name: "registrationFile", maxCount: 1 },
    { name: "licenseFile", maxCount: 1 },
    { name: "adminID", maxCount: 1 },
  ]),
  hospitalValidationRules,
  registerHospital
);
//login Hospital or admin
router.post("/login", loginHospital);
router.post("/registerAdmin", registerAdmin);
router.get("/getAll", authenticateAdmin, getAllHospitals);
router.get("/verified-with-bedinfo", getVerifiedHospitalsWithBedInfo);
router.put("/verify/:id", verifyHospital);
router.get("/profile", authenticateHospital, getHospitalProfile);
export default router;
