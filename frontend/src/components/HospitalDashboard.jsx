import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  Building,
  Bed,
  Settings,
  Search,
  Mail,
  Bell,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useProfile } from "../context/ProfileContext";
export default function HospitalDashboardLayout() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  
  const { setProfile } = useProfile();
  const handleLogout = () => {
    // Clear auth token / session here
    localStorage.removeItem("token"); // adjust based on your logic
    // delete axiosInstance.defaults.headers.common["Authorization"];
    // window.location.href = "/login";
    setProfile(null);
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full dark:bg-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 mb-6">ICUSetu</h1>
          <nav className="space-y-4">
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <Home className="w-5 h-5" /> Dashboard
            </NavLink>
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <User className="w-5 h-5" /> Admin Profile
            </NavLink>
            <NavLink
              to="hospitalinfo"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <Building className="w-5 h-5" /> Hospital Info
            </NavLink>
            <NavLink
              to="bedmang"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <Bed className="w-5 h-5" /> Bed Management
            </NavLink>
            <NavLink
              to="setting"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <Settings className="w-5 h-5" /> Settings
            </NavLink>
          </nav>
        </div>
        <div className="text-sm text-gray-400 text-center dark:text-gray-500">
          © 2025 ICUSetu
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
          {/* Search Bar */}
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search for query"
              className="w-full rounded-full border border-gray-300 dark:border-gray-600 px-4 py-2 pl-10 text-sm bg-white dark:bg-gray-800 dark:text-white focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {/* Header Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Toggle Theme"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <Mail className="h-5 w-5 cursor-pointer" />
            <Bell className="h-5 w-5 cursor-pointer" />
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="h-8 w-8 rounded-full border-2 border-gray-300 dark:border-gray-500"
            />
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-300"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Routed Pages */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname} // rerender when route changes
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
