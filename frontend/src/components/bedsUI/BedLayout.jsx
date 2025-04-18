import React, { useState } from "react";
import Bed from "./Bed";
import BedFormModal from "./BedFormModal";
import PatientInfoModal from "./PatientInfoModal";
import axios from "../../../config/axios";
import getHospitalId from "../../../utils/getHospitalId";
import { toast, Toaster } from "react-hot-toast";

const BedLayout = ({ hospitalId, layout, onUpdate }) => {
  const [activeBed, setActiveBed] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const closeModals = () => {
    setShowForm(false);
    setShowDetails(false);
    setActiveBed(null);
  };

  const handleUpdateTimestamp = async () => {
    const hospitalId = getHospitalId();
    try {
      await axios.put(`/beds/update/${hospitalId}`);
      console.log("Last updated timestamp stored successfully!");
      toast.success("Last updated timestamp stored successfully!");
      onUpdate(); // optional: to refresh layout if needed
    } catch (error) {
      console.error("Error updating timestamp", error);
      toast.error("Failed to update timestamp");
    }
  };

  return (
    <div className="space-y-5 relative z-0">
      {/* Toast container (specific to this component) */}
      <Toaster position="top-right" reverseOrder={false} />

      {layout.map((floor, fIndex) => (
        <div
          key={fIndex}
          className="p-6 rounded-xl shadow-xl backdrop-blur-md bg-white/10 border border-white/20"
        >
          <h3 className="font-bold text-xl text-white mb-4">
            {floor.floorName}
          </h3>

          <div className="grid grid-cols-10 gap-6 justify-center">
            {floor.beds.map((bed, bIndex) => (
              <Bed
                key={bIndex}
                hospitalId={hospitalId}
                floorIndex={fIndex}
                bedIndex={bIndex}
                bed={bed}
                onUpdate={onUpdate}
                onShowForm={() => {
                  setActiveBed({ floorIndex: fIndex, bedIndex: bIndex });
                  setShowForm(true);
                }}
                onShowDetails={() => {
                  setActiveBed({ floorIndex: fIndex, bedIndex: bIndex });
                  setShowDetails(true);
                }}
              />
            ))}
          </div>
        </div>
      ))}

      {showForm && activeBed && (
        <BedFormModal
          hospitalId={hospitalId}
          floorIndex={activeBed.floorIndex}
          bedIndex={activeBed.bedIndex}
          bed={layout[activeBed.floorIndex].beds[activeBed.bedIndex]}
          onClose={closeModals}
          onUpdate={onUpdate}
        />
      )}

      {showDetails && activeBed && (
        <PatientInfoModal
          bed={layout[activeBed.floorIndex].beds[activeBed.bedIndex]}
          onClose={closeModals}
        />
      )}

      <div className="pt-4 text-center">
        <button
          onClick={handleUpdateTimestamp}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default BedLayout;
