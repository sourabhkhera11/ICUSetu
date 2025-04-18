// controllers/bedController.js
import BedManagement from "../models/bedManagement.js";
// INIT Beds
export const initBeds = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    // Check if already initialized
    const existing = await BedManagement.findOne({ hospital: hospitalId });
    if (existing)
      return res.status(400).json({ message: "Already initialized." });

    // Default architecture
    const floors = Array.from({ length: 3 }).map((_, i) => ({
      floorName: `Floor ${i + 1}`,
      totalBeds: 10,
      beds: Array.from({ length: 10 }).map((_, j) => ({
        bedNumber: j + 1,
      })),
    }));

    const bedManagement = await BedManagement.create({
      hospital: hospitalId,
      floors,
    });
    res.status(201).json(bedManagement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET Beds by hospitalId
export const getBeds = async (req, res) => {
  try {
    const { hospitalId } = req.params;
    console.log("Fetching beds for hospital:", hospitalId);
    const layout = await BedManagement.findOne({ hospital: hospitalId });
    res.status(200).json(layout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a bed's status and patient info
export const updateBed = async (req, res) => {
  const { hospitalId, floorIndex, bedIndex } = req.params;
  const { patientDetails, hasVentilator, isOccupied } = req.body;

  try {
    const layout = await BedManagement.findOne({ hospital: hospitalId });
    if (!layout) return res.status(404).json({ message: "Not found" });

    const bed = layout.floors[floorIndex].beds[bedIndex];
    bed.isOccupied = isOccupied;

    if (isOccupied) {
      bed.patientDetails = patientDetails;
      bed.hasVentilator = hasVentilator;
    } else {
      bed.patientDetails = null;
      bed.hasVentilator = false;
    }

    await layout.save();
    res.status(200).json({ message: "Bed updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE ARCHITECTURE
export const updateArchitecture = async (req, res) => {
  const { hospitalId } = req.params;
  const { floorDetails } = req.body;

  try {
    const layout = await BedManagement.findOne({ hospital: hospitalId });
    if (!layout) return res.status(404).json({ message: "Not found" });

    // Replace existing floors
    layout.floors = floorDetails.map(({ floorName, totalBeds }) => ({
      floorName,
      totalBeds,
      beds: Array.from({ length: totalBeds }).map((_, i) => ({
        bedNumber: i + 1,
        isOccupied: false,
        hasVentilator: false,
      })),
    }));

    await layout.save();
    res.status(200)
      .json({ message: "Architecture updated successfully", layout });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLastUpdated = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    const updated = await BedManagement.findOneAndUpdate(
      { hospital: hospitalId },
      { lastUpdated: new Date() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Hospital bed data not found" });
    }

    res.status(200).json({
      message: "Last updated timestamp set successfully",
      lastUpdated: updated.lastUpdated,
    });
  } catch (error) {
    console.error("Error updating lastUpdated:", error);
    res.status(500).json({ message: "Server error" });
  }
};