// components/ClinicInfo.jsx
import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Calendar, Phone, MapPin, Clock } from "lucide-react";

const ClinicInfo = () => {
  const location = useLocation();

  // Clinic information
  const clinics = {
    "nashik-road": {
      name: "Nashik Road Clinic",
      phone: "081490 49104",
      email: "nashikroad@drjoshidental.com",
      address:
        "203-204, Hari Amantran, Datta Mandir Rd, near Dattamandir, Nashik Road, Nashik, Maharashtra 422101",
      hours: "Mon–Sat: 9:30 AM – 9:00 PM",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.5211240099898!2d73.8303748!3d19.902432999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd958535bd1099%3A0x4813ba22d2d1d82!2sDr.%20Joshi&#39;s%20Care%20%26%20Cure%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1756881602062!5m2!1sen!2sin",
      contactLink: "/contact/nashik-road",
    },
    "deolali-camp": {
      name: "Deolali Camp Clinic",
      phone: "0253 249 6350 – 9021256647",
      email: "deolali@drjoshidental.com",
      address:
        "59-60, Howson Rd, near MSEB office, Deolali Camp, Nashik, Maharashtra 422401",
      hours: "Mon–Sat: 9:30 AM – 9:00 PM",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.2780598558447!2d73.8344327!3d19.9548052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd9553a6822c55%3A0xb1e4f0ae27957fe2!2sDr.%20Joshi&#39;s%20Care%20%26%20Cure%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1756881578216!5m2!1sen!2sin",
      contactLink: "/contact/deolali-camp",
    },
  };

  // Extract treatment name from URL path
  const pathParts = location.pathname.split("/");
  const treatmentSlug = pathParts[pathParts.length - 1];

  // Convert slug to readable treatment name
  const getTreatmentName = (slug) => {
    const nameMap = {
      "dental-implants-nashik": "Dental Implants",
      "root-canal-treatment-nashik": "Root Canal Treatment",
      "cosmetic-dentist-nashik": "Cosmetic Dentistry",
      "pediatric-dentist-nashik": "Pediatric Dentistry",
      "teeth-whitening-nashik": "Teeth Whitening",
      "gum-disease-treatment-nashik": "Gum Disease Treatment",
      "emergency-dental-care-nashik": "Emergency Dental Care",
    };

    return nameMap[slug] || "a Dental Procedure";
  };

  const treatmentName = getTreatmentName(treatmentSlug);

  return (
    <motion.div
      className="mx-auto max-w-7xl my-8 bg-teal-50 p-8 rounded-xl mt-12 border border-teal-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-teal-800 mb-3">
          Book Your {treatmentName} Consultation
        </h2>
        <p className="text-teal-600 text-lg">
          Schedule an appointment at one of our conveniently located clinics in
          Nashik
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(clinics).map(([key, clinic]) => (
          <motion.div
            key={key}
            className="bg-white p-6 rounded-lg shadow-md border border-teal-200"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-teal-100 p-2 rounded-full mr-3">
                <MapPin className="text-teal-600" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-teal-800">
                {clinic.name}
              </h3>
            </div>

            <div className="space-y-3">
              <p className="text-gray-600 flex items-start">
                <MapPin
                  className="text-teal-500 mr-2 mt-1 flex-shrink-0"
                  size={16}
                />
                <span>{clinic.address}</span>
              </p>

              <p className="text-gray-600 flex items-center">
                <Phone className="text-teal-500 mr-2" size={16} />
                <span>{clinic.phone}</span>
              </p>

              <p className="text-gray-600 flex items-center">
                <Clock className="text-teal-500 mr-2" size={16} />
                <span>{clinic.hours}</span>
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={`tel:${clinic.phone.replace(/\D/g, "")}`}
                className="flex-1 bg-teal-700 text-white text-center font-medium py-2 px-4 rounded-lg hover:bg-teal-800 transition-colors flex items-center justify-center"
              >
                <Phone size={16} className="mr-2" />
                Call Now
              </a>
              <a
                href={clinic.contactLink}
                className="flex-1 bg-white text-teal-700 font-medium py-2 px-4 rounded-lg border border-teal-300 hover:bg-teal-50 transition-colors flex items-center justify-center"
              >
                <Calendar size={16} className="mr-2" />
                View Details
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Emergency Notice */}
      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
        <p className="text-amber-800 font-medium">
          <span className="font-bold">Dental Emergency?</span> We accept
          walk-ins for urgent dental issues. Call us directly for immediate
          assistance.
        </p>
      </div>
    </motion.div>
  );
};

export default ClinicInfo;
