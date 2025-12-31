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
// import WPPopup from "../components/PopUp/WPPopup";
import WhatsAppPopup from "../components/PopUp/WhatsAppPopup";

// Create axios instance with better error handling
const axiosInstance = {
  get: async (url) => {
    try {
      const response = await fetch(
        `https://dentalcarenasik.demovoting.com/api${url}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  },
};

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch popup data from Laravel API
  const fetchPopupData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get("/active-popup");

      if (response.success && response.data) {
        setPopupData(response.data);

        // Show popup after delay from backend
        const timer = setTimeout(() => {
          setShowPopup(true);
        }, response.data.display_delay || 1000);

        return () => clearTimeout(timer);
      } else {
        console.log("No active popup found or API returned false");
      }
    } catch (error) {
      console.error("Error fetching popup data:", error);
      setError("Failed to load popup data");
      // Use default popup data as fallback
      setPopupData(getDefaultPopupData());

      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000);

      return () => clearTimeout(timer);
    } finally {
      setLoading(false);
    }
  };

  // Default popup data in case API fails
  const getDefaultPopupData = () => ({
    title: "Nitroxide Treatment - Laughing Gas",
    description:
      "Discover the benefits of our specialized Laughing Gas treatment. A safe and effective solution for dental anxiety and pain management.",
    image_url: null,
    button_text: "Learn More",
    redirect_url: "/treatments/dental-implants-nashik",
    features: [
      { text: "Quick & Painless Procedure" },
      { text: "Safe for All Ages" },
      { text: "Anxiety-Free Experience" },
    ],
    display_delay: 1000,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Fetch popup data on component mount
    fetchPopupData();

    return () => {
      window.removeEventListener("scroll", handleScroll);
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

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleLearnMore = () => {
    setShowPopup(false);
    if (popupData?.redirect_url) {
      navigate(popupData.redirect_url);
    } else {
      navigate("/treatments/dental-implants-nashik");
    }
  };

  // Icon mapping for features
  const getFeatureIcon = (index) => {
    const icons = [Clock, CheckCircle, Users];
    return icons[index] || CheckCircle;
  };

  // Don't show popup if still loading and no data
  if (loading && !popupData) {
    return (
      <div className="relative">
        <Navbar />
        <main className="pt-16">
          <Outlet />

          {/* <WPPopup /> */}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar />
      <main className="pt-16">
        <WhatsAppPopup />
        <Outlet />
      </main>
      <Footer />

      {/* Dynamic Popup Advertisement */}
      <AnimatePresence>
        {showPopup && popupData && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50  bg-opacity-60 backdrop-blur-sm"
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
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handlePopupClose}
                  className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <X size={18} className="text-gray-600" />
                </button>

                {/* Dynamic Image Section */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {popupData.image_url ? (
                    <img
                      src={popupData.image_url}
                      alt={popupData.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        // Show fallback if image fails to load
                        const fallback =
                          e.target.parentNode.querySelector(".image-fallback");
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                  ) : null}

                  {/* Fallback if no image or image fails to load */}
                  <div
                    className="image-fallback absolute inset-0 flex items-center justify-center "
                    style={{ display: !popupData.image_url ? "flex" : "none" }}
                  >
                    <Laptop size={80} className="text-white opacity-80" />
                  </div>

                  <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-cyan-600">
                      Specialized Treatment
                    </span>
                  </div>
                </div>

                {/* Dynamic Content Section */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {popupData.title}
                  </h3>

                  {/* Dynamic Features */}
                  {popupData.features &&
                    popupData.features.map((feature, index) => {
                      const IconComponent = getFeatureIcon(index);
                      return (
                        <p
                          key={index}
                          className="text-gray-600 mb-1 flex items-center"
                        >
                          <IconComponent
                            size={16}
                            className="mr-2 text-cyan-500"
                          />
                          {feature.text}
                        </p>
                      );
                    })}

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {popupData.description}
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
                      {popupData.button_text}
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
