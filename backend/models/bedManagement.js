// models/bedManagement.js
import mongoose from "mongoose";
import hospitals from "./hospital.model.js"
const bedSchema = new mongoose.Schema({
  bedNumber: Number,
  isOccupied: { type: Boolean, default: false },
  hasVentilator: { type: Boolean, default: false },
  patientDetails: {
    name: String,
    age: Number,
    admittedAt: Date,
    condition: String,
  },
});

const floorSchema = new mongoose.Schema({
  floorName: String,
  totalBeds: Number,
  beds: [bedSchema],
});

const bedManagementSchema = new mongoose.Schema({
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hospitals",
    required: true,
    unique: true,
  },
  floors: [floorSchema],
});

export default mongoose.model("BedManagement", bedManagementSchema);
