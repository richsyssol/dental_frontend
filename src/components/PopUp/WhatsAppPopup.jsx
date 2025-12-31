import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin } from "lucide-react";

function WhatsAppPopup() {
  const [show, setShow] = useState(false);

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

  // Branch information
  const branches = [
    {
      name: "Deolali Camp Clinic",
      address: "59-60, Howson Rd, near MSEB office, Deolali Camp",
      whatsapp: "+919021256647",
      phone: "+919021256647",
      color: "green",
    },
    {
      name: "Nashik Road Clinic",
      address: "203-204, Hari Amantran, Datta Mandir Rd, near Dattamandir",
      whatsapp: "+918149049104",
      phone: "+918149049104",
      color: "green",
    },
  ];

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
            className="whatsapp-popup-container absolute bottom-full right-0 mb-4 w-80 sm:w-96 bg-white rounded-xl shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 bg-green-500">
              <div className="flex items-center space-x-3">
                <FaWhatsapp className="text-2xl text-white" />
                <div className="text-white">
                  <h4 className="font-semibold">Contact Our Clinics</h4>
                  <p className="text-xs">Choose a branch to contact</p>
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

            <div className="p-4 max-h-96 overflow-y-auto">
              {branches.map((branch, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  {/* Branch Header */}
                  <div className="flex items-start mb-2">
                    <MapPin
                      className={`text-${branch.color}-500 mt-1 mr-2`}
                      size={16}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {branch.name}
                      </h3>
                      <p className="text-xs text-gray-600">{branch.address}</p>
                    </div>
                  </div>

                  {/* Branch Buttons */}
                  <div className="grid grid-cols-2 gap-2 ml-6">
                    {/* WhatsApp Button */}
                    <a
                      href={`https://wa.me/${branch.whatsapp}?text=Hello%20Dr.%20Joshi's%20Care%20%26%20Cure%20Dental%20Clinic,%20I%20would%20like%20to%20know%20more%20about%20your%20services`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center bg-${branch.color}-500 hover:bg-${branch.color}-600 text-white px-2 py-2 rounded transition-colors text-sm`}
                    >
                      <FaWhatsapp className="mr-1" size={14} />
                      <span>WhatsApp</span>
                    </a>

                    {/* Call Button */}
                    <a
                      href={`tel:${branch.phone}`}
                      className={`flex items-center justify-center bg-${branch.color}-500 hover:bg-${branch.color}-600 text-white px-2 py-2 rounded transition-colors text-sm`}
                    >
                      <Phone className="mr-1" size={14} />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button - stays in fixed position */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setShow(!show)}
        className="p-3 bg-green-600 hover:bg-green-700 rounded-full shadow-lg transition-colors"
        aria-label="Contact options"
      >
        <FaWhatsapp className="text-3xl text-white" />
      </motion.button>
    </div>
  );
}

export default WhatsAppPopup;
