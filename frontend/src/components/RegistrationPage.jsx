import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import {
  MdEmail,
  MdLock,
  MdPhone,
  MdLocationCity,
  MdLocationOn,
} from "react-icons/md";
import { FaHospitalAlt, FaUserShield } from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";
import axiosInstance from "../../config/axios"; // adjust this path

const HospitalRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [name]: file });
      toast.success(`${name.replace(/([A-Z])/g, " $1")} file submitted`);
    }
  };

  const validateStep = () => {
    const requiredFields = {
      1: [
        "hospitalName",
        "email",
        "contact",
        "hospitalType",
        "icuBeds",
        "address",
        "state",
        "city",
        "pincode",
      ],
      2: [
        "registrationNumber",
        "registrationFile",
        "licenseNumber",
        "licenseFile",
      ],
      3: ["adminName", "adminID", "password", "confirmPassword"],
    };

    for (const field of requiredFields[step]) {
      if (!formData[field]) {
        toast.error("Please fill all required fields.");
        return false;
      }
    }

    if (step === 3 && formData.password !== formData.confirmPassword) {
      toast.error("Passwords are not the same.");
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    if (!validateStep()) return;

    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    try {
      const res = await axiosInstance.post("/hospitals/register", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Hospital registered successfully!");
      sessionStorage.setItem("registrationSuccess", "true");
      setTimeout(() => {
        console.log("Redirecting to /registersuccess");
        navigate("/registersuccess");
      }, 2000);
    } catch (err) {
      const msg = err?.response?.data?.message || "Registration failed.";
      toast.error(msg);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gray-100">
      <img
        src="/clinik.JPG"
        alt="Hospital"
        className="absolute inset-0 w-full h-full object-cover blur-none opacity-70 z-0"
      />
      <div className="relative z-10 w-full bg-opacity-90 shadow-lg rounded-md max-w-4xl mx-auto p-6 bg-white">
        <h2 className="text-2xl font-semibold mb-4">Hospital Registration</h2>

        <div className="flex justify-between mb-6">
          {["Hospital Details", "Documents", "Admin Info"].map(
            (label, index) => (
              <div
                key={index}
                className={`flex-1 text-center py-2 border-b-2 ${
                  step === index + 1
                    ? "border-green-500 font-bold"
                    : "border-gray-300"
                }`}
              >
                {label}
              </div>
            )
          )}
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              icon={<FaHospitalAlt />}
              label="Hospital Name"
              name="hospitalName"
              value={formData.hospitalName || ""}
              required
              onChange={handleInputChange}
            />
            <Field
              icon={<MdEmail />}
              type="email"
              label="Email"
              name="email"
              value={formData.email || ""}
              required
              onChange={handleInputChange}
            />
            <Field
              icon={<MdPhone />}
              label="Contact Number"
              name="contact"
              value={formData.contact || ""}
              required
              onChange={handleInputChange}
            />
            <div>
              <Label icon={<FaHospitalAlt />} text="Hospital Type" required />
              <div className="relative">
                <select
                  className="input appearance-none pr-8"
                  name="hospitalType"
                  onChange={handleInputChange}
                  required
                  value={formData.hospitalType || ""}
                >
                  <option value="">Select Type</option>
                  <option value="government">Government</option>
                  <option value="private">Private</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 text-lg pointer-events-none">
                  <FaHospitalAlt />
                </div>
              </div>
            </div>
            <Field
              label="Total ICU Beds"
              name="icuBeds"
              type="number"
              value={formData.icuBeds || ""}
              required
              onChange={handleInputChange}
            />
            <Field
              icon={<MdLocationOn />}
              label="Address"
              name="address"
              value={formData.address || ""}
              required
              onChange={handleInputChange}
            />
            <Field
              label="State"
              name="state"
              value={formData.state || ""}
              required
              onChange={handleInputChange}
            />
            <Field
              icon={<MdLocationCity />}
              label="City"
              name="city"
              value={formData.city || ""}
              required
              onChange={handleInputChange}
            />
            <Field
              label="Pincode"
              name="pincode"
              value={formData.pincode || ""}
              required
              onChange={handleInputChange}
            />
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Registration Number"
              name="registrationNumber"
              value={formData.registrationNumber || ""}
              required
              onChange={handleInputChange}
            />
            <FileField
              icon={<AiFillFileText />}
              label="Registration Certificate"
              name="registrationFile"
              onChange={handleFileChange}
              required
            />
            <Field
              label="License Number"
              name="licenseNumber"
              value={formData.licenseNumber || ""}
              required
              onChange={handleInputChange}
            />
            <FileField
              icon={<AiFillFileText />}
              label="License Document"
              name="licenseFile"
              onChange={handleFileChange}
              required
            />
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              icon={<FaUserShield />}
              label="Admin Name"
              name="adminName"
              value={formData.adminName || ""}
              required
              onChange={handleInputChange}
            />
            <FileField
              icon={<AiFillFileText />}
              label="Admin ID Proof"
              name="adminID"
              onChange={handleFileChange}
              required
            />
            <Field
              icon={<MdLock />}
              type="password"
              label="Create Password"
              name="password"
              value={formData.password || ""}
              required
              onChange={handleInputChange}
            />
            <Field
              icon={<MdLock />}
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword || ""}
              required
              onChange={handleInputChange}
            />
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button onClick={prevStep} className="btn bg-gray-300">
              Back
            </button>
          )}
          {step < 3 ? (
            <button onClick={nextStep} className="btn bg-green-500 text-white">
              Continue
            </button>
          ) : (
            <button
              className="btn bg-green-600 text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

const Field = ({
  label,
  name,
  type = "text",
  required = false,
  onChange,
  value,
  icon,
}) => (
  <div>
    <Label text={label} icon={icon} required={required} />
    <input
      type={type}
      className="input"
      name={name}
      value={value}
      required={required}
      onChange={onChange}
    />
  </div>
);

const FileField = ({ label, name, required = false, onChange, icon }) => (
  <div>
    <Label text={label} required={required} icon={icon} />
    <label className="block border rounded-md px-3 py-2 bg-gray-50 cursor-pointer hover:bg-gray-100">
      Upload File
      <input
        type="file"
        className="hidden"
        required={required}
        onChange={(e) => onChange(e, name)}
      />
    </label>
  </div>
);

const Label = ({ text, required, icon }) => (
  <label className="text-sm font-medium mb-1 flex items-center gap-2">
    {icon && <span className="text-green-600 text-lg">{icon}</span>}
    {text}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

export default HospitalRegistration;
