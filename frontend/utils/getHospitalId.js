// utils/getHospitalId.js
import { jwtDecode } from "jwt-decode"; // ✅

const getHospitalId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token);
  console.log(decoded.id);
  return decoded.id;
};

export default getHospitalId
