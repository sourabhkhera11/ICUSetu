// routes/bedRoutes.js
import express from "express";
import {
  initBeds,
  updateBed,
  updateArchitecture,
  getBeds,
  updateLastUpdated,
} from "../controllers/bedController.js";

const router = express.Router();

router.post("/init/:hospitalId", initBeds);
router.get("/:hospitalId", getBeds);
router.put("/update/:hospitalId/:floorIndex/:bedIndex", updateBed);
router.put("/architecture/:hospitalId", updateArchitecture);
router.put("/update/:hospitalId", updateLastUpdated);
export default router;
