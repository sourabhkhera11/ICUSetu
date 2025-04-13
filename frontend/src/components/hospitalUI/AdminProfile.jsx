// components/hospitalUI/AdminProfile.jsx
import { useEffect } from "react";
import axiosInstance from "../../../config/axios";
import { Mail, Phone, Building, MapPin, CheckCircle } from "lucide-react";
import { useProfile } from "../../context/ProfileContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
export default function AdminProfile() {
  const { profile, setProfile } = useProfile();
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("fetching profile...", token);
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3001/hospitals/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(
          "Error fetching profile:",
          err.response?.data || err.message
        );
      }
    };

    fetchProfile();
  }, []);
  const getInitials = (name) => {
    if (!name) return "A";
    const cleaned = name.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, "").trim();
    const parts = cleaned.split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-pink-500 text-white text-xl font-bold h-16 w-16 flex items-center justify-center rounded-full">
          {getInitials(profile.adminName)}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{profile.adminName}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Admin at {profile.hospitalName || "Hospital"}
          </p>
          <div className="flex gap-2 mt-1">
            <span className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded">
              admin
            </span>
            <span className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded">
              {profile.hospitalType || "Unknown"}
            </span>
            {profile.isVerified && (
              <span className="px-2 py-0.5 text-xs bg-green-700 text-green-100 rounded flex items-center gap-1">
                <CheckCircle size={12} /> Verified
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center gap-3">
          <Mail className="text-gray-600 dark:text-gray-300" />
          <span>{profile.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="text-gray-600 dark:text-gray-300" />
          <span>{profile.contact}</span>
        </div>
        <div className="flex items-center gap-3">
          <Building className="text-gray-600 dark:text-gray-300" />
          <span>{profile.hospitalName || profile.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="text-gray-600 dark:text-gray-300" />
          <span>{profile.city || profile.state || "Unknown"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium">Referral Code:</span>
          <span>{profile.referralCode || "0000"}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium">Accommodation:</span>
          <span>{profile.accommodation || "On Call Rooms"}</span>
        </div>
      </div>

      {/* Payment Image */}
      {profile.adminID && (
        <>
          <h3 className="mt-6 text-lg font-semibold">Payment Details</h3>
          <div className="mt-2">
            <img
              src={profile.adminID}
              alt="Payment/ID Proof"
              className="rounded-md shadow-md max-w-xs"
            />
          </div>
        </>
      )}
    </div>
  );
}
