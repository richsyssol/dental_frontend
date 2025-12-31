import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

function WhatsAppPopup() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  // Show the icon immediately when component mounts
  useEffect(() => {
    // Component will show immediately, no need for any delay
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (show && !e.target.closest(".whatsapp-popup-container")) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  const handleBookNow = () => {
    setShow(false); // Close the popup
    navigate("/bookform"); // Navigate to bookform page
  };

  return (
    <div className="fixed bottom-8 right-4 z-50">
      {/* Popup - positioned absolutely above the button */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="whatsapp-popup-container absolute bottom-full right-0 mb-4 w-72 sm:w-80 bg-white rounded-xl shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 bg-green-500">
              <div className="flex items-center space-x-3">
                <FaWhatsapp className="text-2xl text-white" />
                <div className="text-white">
                  <h4 className="font-semibold">Get In Touch</h4>
                  <p className="text-xs">How can we help you?</p>
                </div>
              </div>
              <button
                onClick={() => setShow(false)}
                className="text-white hover:text-green-100 transition-colors"
                aria-label="Close popup"
              >
                <RxCross2 className="text-xl" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-gray-600 text-sm text-center">
                Our experts will reply to you shortly
              </p>
              <a
                href="https://wa.me/919850981210?text=Hello%20there!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors w-full"
              >
                <FaWhatsapp className="mr-2" />
                Send Message
              </a>

              <a
                href="tel:+919850981210"
                className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors w-full"
              >
                <Phone className="mr-2" />
                Call Now
              </a>

              <button
                onClick={handleBookNow}
                className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors w-full"
              >
                <Calendar className="mr-2" />
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button - Always visible */}
      <button
        onClick={() => setShow(!show)}
        className="p-3 bg-green-600 hover:bg-green-700 rounded-full shadow-lg transition-colors duration-200"
        aria-label="Contact options"
      >
        <FaWhatsapp className="text-3xl text-white" />
      </button>
    </div>
  );
}

export default WhatsAppPopup;
