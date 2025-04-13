import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "hospital",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/hospitals/login", formData);
      const { token, role, user } = response.data;
      localStorage.setItem("token", token);
      console.log(localStorage.getItem("token"));
      localStorage.setItem("role", role);
      toast.success(`Welcome, ${user.name || user.email}!`, {
        position: "top-center",
        autoClose: 1000,
      });

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/hospital/dashboard");
        }
    
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-4">
      <ToastContainer />
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side - Login Form */}
        <div className="p-10 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Hello!</h2>
          <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute top-3.5 left-3 text-green-500" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                className="pl-10 pr-4 py-2 rounded-full shadow-md"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-3.5 left-3 text-green-500" />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="pl-10 pr-10 py-2 rounded-full shadow-md"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3.5 right-3 text-green-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Role Selection */}
            <div className="relative">
              <FaUserShield className="absolute top-3.5 left-3 text-green-500" />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 px-3 py-2 rounded-md bg-gray-700 text-white shadow-md border appearance-none focus:outline-none"
              >
                <option value="hospital">Hospital</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-500" />
                Remember me
              </label>
              <a href="#" className="hover:underline text-green-500">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full py-2 hover:from-green-600 hover:to-emerald-600"
            >
              SIGN IN
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-green-500 hover:underline">
              Create
            </a>
          </p>
        </div>

        {/* Right Side - Welcome Info */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-10 flex flex-col justify-center text-center">
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-sm text-white/80">
            Welcome to our healthcare system. Sign in to continue managing
            hospital ICU data seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
