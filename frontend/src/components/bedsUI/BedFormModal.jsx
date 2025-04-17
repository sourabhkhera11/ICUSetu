import React, { useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaHeartbeat,
  FaProcedures,
} from "react-icons/fa";
import axios from "../../../config/axios";
import { toast } from "react-toastify";

const BedFormModal = ({
  hospitalId,
  floorIndex,
  bedIndex,
  bed,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    admittedAt: new Date().toISOString().slice(0, 16),
    condition: "",
    hasVentilator: false,
  });

  const handleSubmit = async () => {
    await axios.put(`/beds/update/${hospitalId}/${floorIndex}/${bedIndex}`, {
      isOccupied: true,
      hasVentilator: formData.hasVentilator,
      patientDetails: {
        name: formData.name,
        age: Number(formData.age),
        admittedAt: formData.admittedAt,
        condition: formData.condition,
      },
    });
    toast.success("Patient admitted successfully");
    onClose();
    onUpdate();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded-lg shadow-md w-96">
        <h4 className="text-lg font-bold mb-4">Admit Patient</h4>

        <div className="relative mb-3">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Patient Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="relative mb-3">
          <FaProcedures className="absolute top-3 left-3 text-gray-400" />
          <input
            type="number"
            className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Age"
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>

        <div className="relative mb-3">
          <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
          <input
            type="datetime-local"
            value={formData.admittedAt}
            className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setFormData({ ...formData, admittedAt: e.target.value })
            }
          />
        </div>

        <div className="relative mb-3">
          <FaHeartbeat className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Condition"
            onChange={(e) =>
              setFormData({ ...formData, condition: e.target.value })
            }
          />
        </div>

        <label className="block mb-4">
          <input
            type="checkbox"
            className="mr-2"
            onChange={(e) =>
              setFormData({ ...formData, hasVentilator: e.target.checked })
            }
          />
          Requires Ventilator
        </label>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Admit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BedFormModal;
