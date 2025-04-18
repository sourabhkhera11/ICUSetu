import React, { useState, useEffect } from "react";
import axios from "../../config/axios"; // Adjust this path based on your axios instance location
import { Input } from "@/components/ui/input";
import { ScrollText } from "lucide-react";
import { Loader2 } from "lucide-react";

const getColor = (beds) => {
  if (beds > 10) return "bg-green-500";
  if (beds > 5) return "bg-yellow-400";
  if (beds > 0) return "bg-orange-400";
  return "bg-red-500";
};

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHospitals = async () => {
    try {
      const { data } = await axios.get("/hospitals/verified-with-bedinfo");
      setHospitals(data);
    } catch (error) {
      console.error("Failed to fetch hospitals", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const filteredHospitals = hospitals.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
        <div className="text-2xl font-extrabold text-blue-700">ICU Tracker</div>
        <nav className="space-x-6 font-medium text-gray-700 text-sm md:text-base">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Login</a>
          <a href="#">Register</a>
        </nav>
      </header>

      {/* Notice */}
      <div className="flex items-center gap-2 bg-blue-200 text-blue-900 px-4 py-2 animate-pulse">
        <ScrollText className="w-5 h-5" />
        <p className="text-sm">
          As per Honorable Supreme Court order, hospitals must update ICU bed
          availability daily.{" "}
          <a href="#" className="underline font-semibold">
            Read more
          </a>
        </p>
      </div>

      {/* Legend */}
      <div className="max-w-4xl mx-auto mt-6 px-4 flex flex-wrap justify-center gap-4 text-sm">
        {[
          ["More than 10 beds", "bg-green-500"],
          ["5 - 10 beds", "bg-yellow-400"],
          ["1 - 4 beds", "bg-orange-400"],
          ["0 beds", "bg-red-500"],
        ].map(([label, color]) => (
          <div className="flex items-center gap-2" key={label}>
            <span className={`w-4 h-4 rounded-full ${color}`}></span>
            {label}
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <Input
          placeholder="Search by hospital name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-4 text-lg border border-gray-300 rounded-lg"
        />
      </div>

      {/* Hospital Tags */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 px-4">
        {loading ? (
          <Loader2 className="animate-spin text-blue-600 w-6 h-6" />
        ) : filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital) => (
            <div
              key={hospital._id}
              className={`cursor-pointer rounded-full px-6 py-2 text-white shadow-md text-sm md:text-base font-semibold transition-all hover:scale-105 ${getColor(
                hospital.totalAvailableBeds
              )}`}
              onClick={() => setSelectedHospital(hospital)}
            >
              {hospital.name}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hospitals found.</p>
        )}
      </div>

      {/* Modal */}
      {selectedHospital && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative animate-fade-in">
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-lg"
              onClick={() => setSelectedHospital(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2 text-blue-700">
              {selectedHospital.name}
            </h2>
            <p>
              <strong>Email:</strong> {selectedHospital.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedHospital.contact}
            </p>
            <p>
              <strong>Type:</strong> {selectedHospital.hospitalType}
            </p>
            <p>
              <strong>Address:</strong> {selectedHospital.address},{" "}
              {selectedHospital.state}
            </p>
            <p>
              <strong>ICU Beds:</strong> {selectedHospital.totalAvailableBeds} /{" "}
              {selectedHospital.totalBeds}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
