import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";
import { CheckCircle, ExternalLink, LogOut } from "lucide-react";
import * as XLSX from "xlsx";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AdminDashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchHospitals = async () => {
    const token = localStorage.getItem("token");
    console.log("token at dashboard",token);
    try {
      const res = await axios.get("http://localhost:3001/hospitals/getAll",{
        headers: { Authorization: `Bearer ${token}` },
      });
      setHospitals(res.data);
    } catch (err) {
      console.error("Failed to fetch hospitals", err);
      toast.error("Failed to fetch hospital data");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token"); // or "adminToken" if you're using separate keys
      toast.success("Logged out successfully!");
      navigate("/login"); // redirect to login
    } catch (err) {
      console.error("Logout error", err);
      toast.error("Logout failed");
    }
  };

  const handleVerify = async (id) => {
    try {
      await axios.put(`/hospitals/verify/${id}`);
      toast.success("Hospital verified successfully!");
      fetchHospitals();
    } catch (err) {
      console.error("Verification failed", err);
      toast.error("Verification failed");
    }
  };

  const handleDownload = () => {
    try {
      const dataToExport = filteredHospitals.map((hospital, index) => ({
        "S.No": index + 1,
        "Hospital Name": hospital.hospitalName,
        Email: hospital.email,
        Contact: hospital.contact,
        "Hospital Type": hospital.hospitalType,
        "ICU Beds": hospital.icuBeds,
        Address: hospital.address,
        State: hospital.state,
        Pincode: hospital.pincode,
        "Admin Name": hospital.adminName,
        "Registration File": hospital.registrationFile || "",
        "License File": hospital.licenseFile || "",
        "Admin ID": hospital.adminID || "",
        Verified: hospital.isVerified ? "Yes" : "No",
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Hospitals");
      XLSX.writeFile(workbook, "hospital_data.xlsx");

      toast.success("Excel file downloaded successfully!");
    } catch (error) {
      console.error("Excel download failed", error);
      toast.error("Failed to download Excel");
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.hospitalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const verified = hospitals.filter((h) => h.isVerified).length;
  const successfullyRegistered = hospitals.filter(
    (h) => h.registrationFile && h.licenseFile && h.adminID
  ).length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Header Summary */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search hospitals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded-md shadow-sm"
        />
        <div className="border px-4 py-2 rounded-full text-sm">
          Verified: {verified}
        </div>
        <div className="border px-4 py-2 rounded-full text-sm">
          Successfully Registered: {successfullyRegistered}
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-95 transition-transform duration-200 text-white px-5 py-2 rounded-full shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
            />
          </svg>
          Download Excel
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">S.No</th>
              <th className="p-3">Hospital Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Type</th>
              <th className="p-3">ICU Beds</th>
              <th className="p-3">Address</th>
              <th className="p-3">State</th>
              <th className="p-3">Pincode</th>
              <th className="p-3">Admin</th>
              <th className="p-3">Reg Cert</th>
              <th className="p-3">License Cert</th>
              <th className="p-3">Admin ID</th>
              <th className="p-3 text-center">Verified</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredHospitals.map((hospital, index) => (
              <tr key={hospital._id} className="border-t">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{hospital.hospitalName}</td>
                <td className="p-3">{hospital.email}</td>
                <td className="p-3">{hospital.contact}</td>
                <td className="p-3 capitalize">{hospital.hospitalType}</td>
                <td className="p-3">{hospital.icuBeds}</td>
                <td className="p-3">{hospital.address}</td>
                <td className="p-3">{hospital.state}</td>
                <td className="p-3">{hospital.pincode}</td>
                <td className="p-3">{hospital.adminName}</td>
                <td className="p-3 text-center">
                  {hospital.registrationFile && (
                    <a
                      href={hospital.registrationFile}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="inline" size={18} />
                    </a>
                  )}
                </td>
                <td className="p-3 text-center">
                  {hospital.licenseFile && (
                    <a
                      href={hospital.licenseFile}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="inline" size={18} />
                    </a>
                  )}
                </td>
                <td className="p-3 text-center">
                  {hospital.adminID && (
                    <a href={hospital.adminID} target="_blank" rel="noreferrer">
                      <ExternalLink className="inline" size={18} />
                    </a>
                  )}
                </td>
                <td className="p-3 text-center">
                  {hospital.isVerified ? (
                    <CheckCircle className="text-green-500 inline" />
                  ) : (
                    "❌"
                  )}
                </td>
                <td className="p-3 text-center">
                  {!hospital.isVerified && (
                    <button
                      onClick={() => handleVerify(hospital._id)}
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                    >
                      Verify
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredHospitals.length === 0 && (
              <tr>
                <td colSpan="15" className="p-4 text-center text-gray-500">
                  No hospitals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
