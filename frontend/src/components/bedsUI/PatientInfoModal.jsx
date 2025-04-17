import React from "react";

const PatientInfoModal = ({ bed, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Patient Info</h3>
        <ul className="space-y-2">
          <li>
            <strong>Name:</strong> {bed.patientDetails.name}
          </li>
          <li>
            <strong>Age:</strong> {bed.patientDetails.age}
          </li>
          <li>
            <strong>Admitted At:</strong>{" "}
            {new Date(bed.patientDetails.admittedAt).toLocaleString()}
          </li>
          <li>
            <strong>Condition:</strong> {bed.patientDetails.condition}
          </li>
          <li>
            <strong>Ventilator:</strong> {bed.hasVentilator ? "Yes" : "No"}
          </li>
        </ul>
        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoModal;
