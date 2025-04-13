import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/LoginPage";
import Register from "../components/RegistrationPage";
import RegSucc from "../components/RegistrationSucc";
import AdminDashboard from "../components/AdminDashboard";
import HospitalDashboard from "../components/HospitalDashboard";
import {
  AdminPrivateRoute,
  HospitalPrivateRoute,
} from "../components/PrivateRoute";
import AdminProfile from "../components/hospitalUI/AdminProfile";
import BedMang from "../components/hospitalUI/BedMang";
import Dashboard from "../components/hospitalUI/Dashboard";
import HospitalInfo from "../components/hospitalUI/HospitalInfo";
import Setting from "../components/hospitalUI/Setting";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registersuccess" element={<RegSucc />} />
        <Route path="/admin/dashboard" element={<AdminPrivateRoute> <AdminDashboard/> </AdminPrivateRoute> } />
        <Route path="/hospital" element={
          <HospitalPrivateRoute> <HospitalDashboard/> </HospitalPrivateRoute>
          } >
            <Route path="profile" element={<AdminProfile />} />
            <Route path="bedmang" element={<BedMang />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="hospitalinfo" element={<HospitalInfo />} />
            <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
