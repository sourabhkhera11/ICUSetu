import React, { useEffect, useState } from "react";
import axios from "../../../config/axios";
import FloorForm from "../bedsUI/FloorForm";
import BedLayout from "../bedsUI/BedLayout";
import hosid from "../../../utils/getHospitalId";
import { toast } from "react-toastify";
const BedManagement = () => {
  const hospitalId = hosid();
  const [isVerified, setIsVerified] = useState(null);
  const [hospitalData, setHospitalData] = useState(null);
  const [layout, setLayout] = useState([]);
  const [loading, setLoading] = useState(true);

  const instanceCreated = async () => {
      const hospitalId = hosid();
      try {
        await axios.post(`beds/init/${hospitalId}`);
      } catch (err) {
        console.error("Error fetching layout", err);
      } 
    };

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get("/hospitals/profile",{
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsVerified(res.data.isVerified);
      setHospitalData(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch profile");
    }
  };

  const fetchLayout = async () => {
    try {
      const res = await axios.get(`/beds/${hospitalId}`);
      setLayout(res.data.floors);
    } catch (err) {
      console.error("Error fetching layout", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    const initLayout = async () => {
      if (hospitalId && isVerified) {
        await instanceCreated();
        await fetchLayout();
      };
    }
    initLayout();
  }, [hospitalId, isVerified]);
  
  if (isVerified === null) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  if (!isVerified) {
    return (
      <div className="text-center mt-10 text-red-600 text-xl font-semibold">
        You are not verified yet. Please contact admin for access.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bed Management</h1>
      <FloorForm hospitalId={hospitalId} onUpdate={fetchLayout} />
      {loading ? (
        <p>Loading bed layout...</p>
      ) : (
        <BedLayout
          hospitalId={hospitalId}
          layout={layout}
          onUpdate={fetchLayout}
        />
      )}
    </div>
  );
};

export default BedManagement;
