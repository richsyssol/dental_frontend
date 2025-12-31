import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Calendar,
  Users,
  BookOpen,
  Briefcase,
  Code,
  CheckCircle,
  ArrowRight,
  Clock,
  Laptop,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Show popup on every refresh after a short delay
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Prevent background scrolling when popup is open
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showPopup]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleLearnMore = () => {
    setShowPopup(false);
    navigate("/treatments/nitroxide-treatment");
  };

  return (
    <div className="relative">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />

      {/* Popup Advertisement */}
      <AnimatePresence>
        {showPopup && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm"
              onClick={handlePopupClose}
            />

            {/* Popup Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside popup
              >
                {/* Close Button - Fixed Position */}
                <button
                  onClick={handlePopupClose}
                  className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <X size={18} className="text-gray-600" />
                </button>

                {/* Image Section with Actual Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1674179075488-7bbe91dba99a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Nitroxide Treatment - Laughing Gas"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* Fallback if image fails to load */}
                  <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
                    <Laptop size={80} className="text-white opacity-80" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-cyan-600">
                      Specialized Treatment
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Nitroxide Treatment
                  </h3>
                  <p className="text-gray-600 mb-1 flex items-center">
                    <Clock size={16} className="mr-2 text-cyan-500" />
                    Quick & Painless Procedure
                  </p>
                  <p className="text-gray-600 mb-1 flex items-center">
                    <CheckCircle size={16} className="mr-2 text-cyan-500" />
                    Safe for All Ages
                  </p>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <Users size={16} className="mr-2 text-cyan-500" />
                    Anxiety-Free Experience
                  </p>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Discover the benefits of our specialized Laughing Gas
                    treatment. A safe and effective solution for dental anxiety
                    and pain management.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handlePopupClose}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Maybe Later
                    </button>
                    <button
                      onClick={handleLearnMore}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all font-medium flex items-center justify-center"
                    >
                      Learn More
                      <ArrowRight size={18} className="ml-2" />
                    </button>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="bg-gray-50 px-6 py-3 border-t">
                  <p className="text-xs text-gray-500 text-center">
                    Safe • Effective • Professional Care
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
