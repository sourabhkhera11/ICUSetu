import React, { useEffect }from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
const RegistrationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const isRegistered = sessionStorage.getItem("registrationSuccess");

      if (!isRegistered) {
        navigate("/register");
      } else {
        sessionStorage.removeItem("registrationSuccess");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Registration Successful!</h1>
        <p className="text-gray-600 mb-4">
          Thank you for registering your hospital. Our team will now review the
          submitted details.
        </p>
        <p className="text-sm text-gray-500">
          You’ll receive an email once your registration is authenticated and
          approved. This typically takes 24–48 hours.
        </p>

        <div className="mt-6 text-sm text-gray-600 border-t pt-4">
          For assistance, contact: <br />
          📧 <span className="font-medium">icubed@gov.in</span> <br />
          📞 <span className="font-medium">+91-8700134518</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
