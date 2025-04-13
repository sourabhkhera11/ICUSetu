// components/hospitalUI/HospitalInfo.jsx
import { useEffect } from "react";
import axiosInstance from "../../../config/axios";
import { useProfile } from "../../context/ProfileContext";
import {
  Mail,
  Phone,
  Building,
  MapPin,
  Landmark,
  BedDouble,
  ShieldCheck,
  Fingerprint,
  ScrollText,
  BadgeCheck,
} from "lucide-react";

export default function HospitalInfo() {
  const { profile, setProfile } = useProfile();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/hospitals/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch hospital profile", err);
      }
    };
    if (!profile) fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  const getInitials = (name) => {
    if (!name) return "H";
    const cleaned = name.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, "").trim();
    const parts = cleaned.split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-indigo-500 text-white text-xl font-bold h-16 w-16 flex items-center justify-center rounded-full">
          {getInitials(profile.hospitalName)}
        </div>
        <div>
          <h2 className="text-xl font-semibold capitalize">
            {profile.hospitalName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {profile.hospitalType} Hospital
          </p>
          {profile.isVerified && (
            <span className="mt-1 inline-flex items-center gap-1 text-xs bg-green-600 text-white px-2 py-0.5 rounded">
              <BadgeCheck size={14} /> Verified
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        <div className="flex items-center gap-3">
          <Mail className="text-gray-600" />
          <span>{profile.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="text-gray-600" />
          <span>{profile.contact}</span>
        </div>
        <div className="flex items-center gap-3 capitalize">
          <Building className="text-gray-600" />
          <span>{profile.hospitalName}</span>
        </div>
        <div className="flex items-center gap-3 capitalize">
          <Landmark className="text-gray-600" />
          <span>
            {profile.state}, {profile.city} - {profile.pincode}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="text-gray-600" />
          <span className="capitalize">{profile.address}</span>
        </div>
        <div className="flex items-center gap-3">
          <BedDouble className="text-gray-600" />
          <span>ICU Beds: {profile.icuBeds}</span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-gray-600" />
          <span className="capitalize">Admin: {profile.adminName}</span>
        </div>
        <div className="flex items-center gap-3">
          <Fingerprint className="text-gray-600" />
          <span>Registration #: {profile.registrationNumber}</span>
        </div>
        <div className="flex items-center gap-3">
          <ScrollText className="text-gray-600" />
          <span>License #: {profile.licenseNumber}</span>
        </div>
      </div>

      {/* File Section as Images */}
      <div className="mt-6 space-y-6 flex gap-5">
        <div>
          <h3 className="text-md font-semibold mb-2">Registration File</h3>
          <img
            src={profile.registrationFile}
            alt="Registration File"
            className="w-full max-w-md rounded shadow border"
          />
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2">License File</h3>
          <img
            src={profile.licenseFile}
            alt="License File"
            className="w-full max-w-md rounded shadow border"
          />
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2">Admin ID</h3>
          <img
            src={profile.adminID}
            alt="Admin ID"
            className="w-full max-w-md rounded shadow border"
          />
        </div>
      </div>
    </div>
  );
}
