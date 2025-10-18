// models/bedManagement.js
import mongoose from "mongoose";
const bedSchema = new mongoose.Schema({
  bedNumber: {
    type: Number,
    required: true,
    unique: true,
    min: 0,
    max: 250,
  },
  isOccupied: { type: Boolean, default: false },
  hasVentilator: { type: Boolean, default: false },
  patientDetails: {
    name: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 35,
    },
    age: {
      type: Number,
      min: 0,
      max: 150,
    },
    admittedAt: {
      type: Date,
      default: Date.now(),
    },
    condition: {
      type: String,
      enum: ["normal", "critical"],
    },
  },
});

const floorSchema = new mongoose.Schema({
  floorName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 15,
  },
  totalBeds: {
    type: Number,
    required: true,
    min: 0,
    max: 250,
  },
  beds: [bedSchema],
});

const bedManagementSchema = new mongoose.Schema({
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hospital",
    required: true,
    unique: true,
  },
  floors: [floorSchema],
  lastUpdated: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("BedManagement", bedManagementSchema);
