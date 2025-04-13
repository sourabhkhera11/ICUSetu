// components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import {
  isAdminAuthenticated,
  isHospitalAuthenticated,
} from "../../utils/auth";

export const AdminPrivateRoute = ({ children }) => {
  return isAdminAuthenticated() ? children : <Navigate to="/login" />;
};

export const HospitalPrivateRoute = ({ children }) => {
  return isHospitalAuthenticated() ? children : <Navigate to="/login" />;
};
