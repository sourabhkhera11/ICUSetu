import React, { useState } from "react";
import Bed from "./Bed";
import BedFormModal from "./BedFormModal";
import PatientInfoModal from "./PatientInfoModal";

const BedLayout = ({ hospitalId, layout, onUpdate }) => {
  const [activeBed, setActiveBed] = useState(null); // { floorIndex, bedIndex }
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const closeModals = () => {
    setShowForm(false);
    setShowDetails(false);
    setActiveBed(null);
  };

  return (
    <div className="space-y-5 relative z-0">
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

      {/* Central Modals */}
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
    </div>
  );
};

export default BedLayout;
