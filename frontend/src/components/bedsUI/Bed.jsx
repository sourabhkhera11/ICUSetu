import React from "react";
import axios from "../../../config/axios";
import { toast } from "react-toastify";

const Bed = ({
  hospitalId,
  floorIndex,
  bedIndex,
  bed,
  onUpdate,
  onShowForm,
  onShowDetails,
}) => {
  const handleClick = (e) => {
    e.preventDefault();

    if (bed.isOccupied) {
      onShowDetails(); // default double click
    } else {
      onShowForm();
    }
  };

  const handleRightClick = async (e) => {
    e.preventDefault();

    if (bed.isOccupied) {
      const confirmDischarge = window.confirm(
        `Are you sure you want to discharge ${bed.patientDetails.name}?`
      );
      if (!confirmDischarge) return;

      try {
        await axios.put(
          `/beds/update/${hospitalId}/${floorIndex}/${bedIndex}`,
          {
            isOccupied: false,
            hasVentilator: false,
            patientDetails: {
              name: null,
              age: null,
              admittedAt: null,
              condition: null,
            },
          }
        );
        toast.success("Patient discharged successfully");
        onUpdate();
      } catch (err) {
        toast.error("Failed to discharge");
        console.error(err);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      onContextMenu={handleRightClick}
      className={`w-16 h-16 rounded shadow transition-all duration-300 ${
        bed.isOccupied ? "bg-red-500" : "bg-green-500"
      }`}
    >
      {bed.bedNumber}
    </button>
  );
};

export default Bed;
