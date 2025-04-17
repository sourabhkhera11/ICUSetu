import React, { useState } from "react";
import axios from "../../../config/axios";

const FloorForm = ({ hospitalId, onUpdate }) => {
  const [floorDetails, setFloorDetails] = useState([
    { floorName: "ICU-A", totalBeds: 10 },
  ]);

  const handleChange = (index, field, value) => {
    const newDetails = [...floorDetails];
    newDetails[index][field] = field === "totalBeds" ? Number(value) : value;
    setFloorDetails(newDetails);
  };

  const addFloor = () => {
    setFloorDetails([...floorDetails, { floorName: "", totalBeds: 0 }]);
  };

  const updateArchitecture = async () => {
    try {
      await axios.put(`/beds/architecture/${hospitalId}`, {
        floorDetails,
      });
      onUpdate();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Update Architecture</h2>
      {floorDetails.map((floor, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            className="border p-2 rounded w-1/2"
            placeholder="Floor Name"
            value={floor.floorName}
            onChange={(e) => handleChange(index, "floorName", e.target.value)}
          />
          <input
            type="number"
            className="border p-2 rounded w-1/4"
            placeholder="Total Beds"
            value={floor.totalBeds}
            onChange={(e) => handleChange(index, "totalBeds", e.target.value)}
          />
        </div>
      ))}
      <button onClick={addFloor} className="bg-gray-300 px-3 py-1 rounded mr-2">
        + Add Floor
      </button>
      <button
        onClick={updateArchitecture}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </div>
  );
};

export default FloorForm;
