import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js"; // Adjust path if needed

export const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if an admin with the decoded email exists
    const admin = await Admin.findOne({ email: decoded.email });
    if (!admin) {
      return res.status(403).json({ message: "Forbidden - Not an admin" });
    }

    req.admin = admin; // Attach admin to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
