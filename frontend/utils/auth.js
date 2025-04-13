// utils/auth.js
export const isAdminAuthenticated = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return token && role === "admin";
};

export const isHospitalAuthenticated = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return token && role === "hospital";
};