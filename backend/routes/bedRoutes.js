// routes/bedRoutes.js
import express from "express";
import {
  initBeds,
  updateBed,
  updateArchitecture,
  getBeds,
} from "../controllers/bedController.js";

const router = express.Router();

router.post("/init/:hospitalId", initBeds);
router.get("/:hospitalId", getBeds);
router.put("/update/:hospitalId/:floorIndex/:bedIndex", updateBed);
router.put("/architecture/:hospitalId", updateArchitecture);

export default router;
