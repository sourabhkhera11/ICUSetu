import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Input } from "@/components/ui/input";
import { ScrollText } from "lucide-react";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const getColor = (beds) => {
  if (beds > 10)
    return "bg-gradient-to-r from-green-400 to-green-600 group-hover:from-green-600 group-hover:to-black";
  if (beds >= 5)
    return "bg-gradient-to-r from-yellow-300 to-yellow-500 group-hover:from-yellow-600 group-hover:to-black";
  if (beds >= 1)
    return "bg-gradient-to-r from-orange-400 to-orange-600 group-hover:from-orange-700 group-hover:to-black";
  return "bg-gradient-to-r from-red-500 to-red-700 group-hover:from-red-800 group-hover:to-black";
};

const faqs = [
  {
    question: "What is ICUSetu?",
    answer:
      "ICUSetu is a digital platform designed to track and display ICU bed availability across hospitals in real-time, helping both healthcare providers and patients make timely decisions.",
  },
  {
    question: "Who can use ICUSetu?",
    answer:
      "Hospitals, admins, and the general public can use ICUSetu to register, verify, and check ICU bed availability respectively.",
  },
  {
    question: "How can hospitals register?",
    answer:
      "Hospitals can register through our portal by submitting their details and documents. Our admin team verifies all applications before approval.",
  },
  {
    question: "Is the information updated in real-time?",
    answer:
      "Yes, hospitals update ICU bed status from their dashboard which reflects on the public view in real-time.",
  },
  {
    question: "How is data accuracy ensured?",
    answer:
      "Each hospital is verified by an admin, and updates are allowed only by authenticated users. Regular monitoring helps ensure accuracy.",
  },
  {
    question: "Is there any cost for using ICUSetu?",
    answer:
      "No. ICUSetu is a free platform aimed at improving transparency and accessibility of ICU care.",
  },
  {
    question: "What happens if a hospital doesn’t update data regularly?",
    answer:
      "Hospitals failing to update data may be flagged and reviewed by the admin team. Access may be restricted if non-compliance continues.",
  },
  {
    question: "Can users contact hospitals directly from ICUSetu?",
    answer:
      "Yes. Hospital cards show contact information so users can confirm details directly.",
  },
];
const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  const fetchHospitals = async () => {
    try {
      const { data } = await axios.get("/hospitals/verified-with-bedinfo");
      setHospitals(data);
    } catch (error) {
      console.error("Failed to fetch hospitals", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const filteredHospitals = hospitals.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/60 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-6">
          <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 text-transparent bg-clip-text drop-shadow-md">
            ICUSetu
          </div>

          <div className="hidden md:flex gap-8 items-center text-gray-700 font-medium">
            <ScrollLink
              to="#"
              smooth={true}
              duration={500}
              className="hover:text-blue-600 cursor-pointer text-xl transition"
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="hover:text-blue-600 cursor-pointer text-xl transition"
            >
              About
            </ScrollLink>
            <ScrollLink
              to="search"
              smooth={true}
              duration={500}
              className="hover:text-blue-600 cursor-pointer text-xl transition"
            >
              ICUBeds
            </ScrollLink>

            <ScrollLink
              to="how-it-works"
              smooth={true}
              duration={500}
              className="hover:text-blue-600 cursor-pointer text-xl transition"
            >
              How It Works
            </ScrollLink>
            <ScrollLink
              to="faq"
              smooth={true}
              duration={500}
              className="hover:text-blue-600 cursor-pointer text-xl transition"
            >
              FAQ
            </ScrollLink>
            <ScrollLink
              to="testimonial"
              smooth={true}
              duration={500}
              className="hover:text-blue-600 cursor-pointer text-xl transition"
            >
              Testimonial
            </ScrollLink>
            
          </div>

          <div className="flex gap-4">
            <a
              href="/login"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:opacity-90 transition-all duration-300"
            >
              Login
            </a>
            <a
              href="/register"
              className="px-5 py-2.5 rounded-xl border-2 border-transparent bg-gradient-to-r from-white to-white text-blue-600 font-semibold shadow-lg hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
            >
              Register
            </a>
          </div>
        </div>
      </header>

      {/* Notice */}
      <div
        id="#"
        className="relative overflow-hidden bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 text-blue-900 shadow-md py-3 px-6"
      >
        <div className="flex items-center gap-3 animate-bounce-x whitespace-nowrap">
          <ScrollText className="w-6 h-6 text-blue-800" />
          <p className="text-sm md:text-base font-medium">
            Hon'ble <strong className="text-red-600">HIGH COURT</strong> has
            directed to upload the ICU Bed status. Be cautious & humane while
            uploading the data.{" "}
            <a
              href="#"
              className="underline font-semibold text-blue-700 hover:text-blue-900"
            >
              Read more
            </a>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center text-center text-white bg-cover bg-center">
        <img
          src="https://res.cloudinary.com/ddlgwirtw/image/upload/v1745001965/empty-hospital_hrwafq.jpg"
          alt="Hospital Background"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 "
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
        <motion.div
          className="relative z-10 max-w-2xl px-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <motion.h1
            className="text-6xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 2 }}
          >
            Track ICU Beds in Real Time
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 2 }}
          >
            ICUSetu connects hospitals and patients through real-time ICU bed
            availability across regions.
          </motion.p>
          <motion.div
            className="mt-6 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <ScrollLink to="search" smooth duration={500}>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700">
                View Hospitals
              </button>
            </ScrollLink>
            <a
              href="/register"
              className="border border-white text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-white hover:text-blue-700 transition"
            >
              Register Hospital
            </a>
          </motion.div>
        </motion.div>
      </section>
      {/* Legend */}
      {/* Section Heading */}
      <h2
        id="search"
        className="relative text-4xl md:text-5xl font-extrabold text-center mt-24 mb-8 drop-shadow-md"
      >
        <span className="text-black">🔍</span>{" "}
        <span className="bg-gradient-to-b from-gray-900 to-blue-500 text-transparent bg-clip-text relative inline-block">
          Check ICU BED AVAILABILITY
          {/* Underline effect */}
          <span className="absolute left-1/2 -bottom-2 w-45 h-1 bg-blue-500 rounded-full transform -translate-x-1/2"></span>
        </span>
      </h2>

      {/* Legends */}
      <div className="max-w-5xl mx-auto mt-15 px-4 flex flex-wrap justify-center gap-6 text-base md:text-lg">
        {["More than 10 beds", "5 - 10 beds", "1 - 4 beds", "0 beds"].map(
          (label, index) => (
            <div
              key={label}
              className="flex items-center gap-3 px-4 py-2 rounded-xl shadow-md bg-white hover:shadow-lg transition-all"
            >
              <span
                className={`w-6 h-6 rounded-full shadow-inner ${
                  [
                    "bg-gradient-to-r from-green-400 to-green-600",
                    "bg-gradient-to-r from-yellow-300 to-yellow-500",
                    "bg-gradient-to-r from-orange-400 to-orange-600",
                    "bg-gradient-to-r from-red-500 to-red-700",
                  ][index]
                }`}
              ></span>
              <span className="font-semibold text-gray-800">{label}</span>
            </div>
          )
        )}
      </div>

      {/* Search */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <div className="relative">
          <Input
            placeholder="Search by hospital name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-lg border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Hospital Tags */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 max-w-7xl mt-10 mb-30 mx-auto">
        <div className="flex flex-wrap  justify-center gap-4 mt-8 px-4">
          {loading ? (
            <Loader2 className="animate-spin text-blue-600 w-6 h-6" />
          ) : filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital) => (
              <div
                key={hospital._id}
                className="group cursor-pointer transition-all"
                onClick={() => setSelectedHospital(hospital)}
              >
                <div
                  className={`rounded-full px-6 py-3 shadow-md text-white text-sm md:text-base font-semibold transition-all duration-500 ease-in-out ${getColor(
                    hospital.totalAvailableBeds
                  )}`}
                >
                  {hospital.name}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hospitals found.</p>
          )}
        </div>
      </div>
      {/* How It Works */}
      <section id="how-it-works" className="bg-blue-100 py-12 text-center">
        <h2 className="relative text-4xl md:text-5xl font-extrabold text-center mt-24 mb-10 drop-shadow-md">
          <span className="bg-gradient-to-b from-gray-900 to-blue-500 text-transparent bg-clip-text relative inline-block">
            How It Works
            {/* Underline effect */}
            <span className="absolute left-1/2 -bottom-2 w-45 h-1 bg-blue-500 rounded-full transform -translate-x-1/2"></span>
          </span>
        </h2>
        <div className="grid mb-20 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          {[
            "🌐Public Dashboard: Users can view live ICU bed availability across registered hospitals.",
            "🔍 Search & Filter: Users can search hospitals and filter based on availability",
            "🏥 Hospitals Register: Hospitals sign up and upload their verification documents.",
            "✅ Admin Verification: Admin reviews and approves the hospital registration",
            "🛏️ ICU Beds Setup: Hospitals configure their ICU bed architecture (floors, beds, ventilators)",
            "📊 Real-time Bed Status: Hospitals update bed occupancy with patient details and availability",
            "📩 Notifications: Email notifications sent on successful verification or changes",
            "📅 Last Updated Info: Every hospital’s bed data shows a timestamp for its latest update.",
            "🔒 Role-based Access: Admins, hospitals, and public users have dedicated access control.",
          ].map((step, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
            >
              <p className="font-medium text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </section>
      {/* why-icu-setu */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h2 className="relative text-4xl md:text-5xl font-extrabold text-center mt-24 mb-10 drop-shadow-md">
          <span className="bg-gradient-to-b from-gray-900 to-blue-500 text-transparent bg-clip-text relative inline-block">
            Why ICUSetu?
            {/* Underline effect */}
            <span className="absolute left-1/2 -bottom-2 w-30 h-1 bg-blue-500 rounded-full transform -translate-x-1/2"></span>
          </span>
        </h2>
        <p className="text-gray-700 mb-6 text-xl">
          ICUSetu is a real-time ICU bed tracking and management system designed
          to bridge the gap between patients, hospitals, and
          administrators—ensuring that critical care is always within reach when
          it's needed the most.
        </p>
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {[
            "💙 Emergency-First Design",
            "🌍 Scalable Infrastructure",
            "📊 Transparent Data with Timestamps",
            "📄 Verified & Trusted Hospitals",
            "⚡ Fast & Accurate Bed Update",
            "🏥 Centralized Real-Time Platform",
            "📬 Instant Notification System",
            "🧾 Digital Documentation Access",
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded-xl p-4 text-blue-700 font-medium border-t-4 border-blue-400"
            >
              {feature}
            </div>
          ))}
        </div>
      </section>
      {/* Testimonial Section */}
      <section id="testimonial" className="bg-blue-100 py-12 text-center">
        <h2 className="relative text-4xl md:text-5xl font-extrabold text-center mt-24 mb-15 drop-shadow-md">
          <span className="bg-gradient-to-b from-gray-900 to-blue-500 text-transparent bg-clip-text relative inline-block">
            What People Are Saying
            {/* Underline effect */}
            <span className="absolute left-1/2 -bottom-2 w-30 h-1 bg-blue-500 rounded-full transform -translate-x-1/2"></span>
          </span>
        </h2>
        <div className="max-w-4xl mx-auto mb-20 px-6 grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg p-6 rounded-xl text-left">
            <p className="text-gray-700 italic">
              "ICUSetu has revolutionized how we manage ICU data. The real-time
              updates have drastically improved our response times and patient
              admissions."
            </p>
            <p className="mt-4 font-semibold text-blue-600">
              – Dr. Ramesh Kulkarni, Chief Medical Officer
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-xl text-left">
            <p className="text-gray-700 italic">
              "The platform’s simplicity and powerful features make it a
              must-have for any hospital. The verification process was smooth
              and secure."
            </p>
            <p className="mt-4 font-semibold text-blue-600">
              – Ananya Sharma, Hospital Administrator
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-xl text-left">
            <p className="text-gray-700 italic">
              "Finding a hospital with available ICU beds during an emergency
              was effortless thanks to ICUSetu. It truly saved us precious
              time."
            </p>
            <p className="mt-4 font-semibold text-blue-600">
              – Rajiv Mehta, Family Member of Patient
            </p>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="bg-white py-16 px-4">
        <h2 className="relative text-4xl md:text-5xl font-extrabold text-center mb-12 drop-shadow-md">
          <span className="bg-gradient-to-b from-gray-900 to-blue-500 text-transparent bg-clip-text inline-block">
            Frequently Asked Questions
            <span className="absolute left-1/2 -bottom-2 w-32 h-1 bg-blue-500 rounded-full transform -translate-x-1/2"></span>
          </span>
        </h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left text-lg font-semibold text-gray-800 hover:bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-xl transition"
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="text-center py-12 px-6">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Get in Touch</h2>
        <p className="text-gray-700 mb-6">
          For queries or support, contact us at:{" "}
          <strong>support@icusetu.org</strong>
        </p>
      </section>
      {/* Modal */}
      {selectedHospital && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full relative animate-fade-in">
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-lg font-bold p-4"
              onClick={() => setSelectedHospital(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2 text-blue-700 pt-4 pr-4 pl-4">
              {selectedHospital.name.toUpperCase()}
            </h2>
            <p className="p-2">
              <strong>Email:</strong> {selectedHospital.email}
            </p>
            <p className="p-2">
              <strong>Phone:</strong> {selectedHospital.contact}
            </p>
            <p className="p-2">
              <strong>Type:</strong> {selectedHospital.hospitalType}
            </p>
            <p className="p-2">
              <strong>Address:</strong> {selectedHospital.address},{" "}
              {selectedHospital.state}
            </p>
            <p className="p-2">
              <strong>Total ICU Beds:</strong>
              {selectedHospital.totalBeds}
            </p>
            <p className="p-2 flex">
              <strong>Available ICU Beds:</strong>{" "}
              <div className="font-bold text-red-600">
                {selectedHospital.totalAvailableBeds}
              </div>
            </p>
            <p className="p-2">
              <strong>Last Updated:</strong>{" "}
              {formatDateTime(selectedHospital.lastUpdated)}
            </p>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-800 to-black text-white py-8 px-4 text-center mt-12">
        <h1 className="text-3xl font-bold mb-2">ICUSetu</h1>

        <div className="flex justify-center gap-8 mb-4 text-sm font-medium">
          <ScrollLink
            to="search"
            smooth={true}
            duration={500}
            className="hover:underline cursor-pointer text-xl transition"
          >
            ICUBeds
          </ScrollLink>
          <ScrollLink
            to="how-it-works"
            smooth={true}
            duration={500}
            className="hover:underline cursor-pointer text-xl transition"
          >
            How It Works
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="hover:underline cursor-pointer text-xl transition"
          >
            Why ICUSetu?
          </ScrollLink>
          <ScrollLink
            to="testimonial"
            smooth={true}
            duration={500}
            className="hover:underline cursor-pointer text-xl transition"
          >
            Testimonial
          </ScrollLink>
          <ScrollLink
            to="faq"
            smooth={true}
            duration={500}
            className="hover:underline cursor-pointer text-xl transition"
          >
            FAQ
          </ScrollLink>
        </div>

        <p className="text-sm text-gray-300 max-w-xl mx-auto mb-4">
          ICUSetu HQ, A-4, Paschim Vihar, Opp. Paschim Vihar (East) Metro
          Station, Rohtak Road, New Delhi, Delhi 110063
        </p>

        <div className="flex justify-center items-center gap-4 mb-2 text-xl">
          <a href="#" className="hover:text-blue-400">
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/sourabh-khera-356766227/"
            className="hover:text-blue-600"
            target="_blank"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/sourabhkhera11"
            className="hover:text-gray-100"
            target="_blank"
          >
            <FaGithub />
          </a>
        </div>

        <p className="text-sm text-gray-400 mb-2">
          Designed and Developed by ICUSetu Team
        </p>

        <hr className="border-gray-600 my-4 w-3/4 mx-auto" />

        <p className="text-sm font-medium text-gray-300">Contact Us:</p>
        <p className="text-sm text-gray-400">Sourabh Khera: +91-8700134518</p>

        <p className="text-xs text-gray-500 mt-4">
          © 2025 ICUSetu. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
