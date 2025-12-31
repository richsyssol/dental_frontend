// pages/LocationPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Star,
  Users,
  Award,
  Heart,
} from "lucide-react";

const LocationPage = () => {
  const { clinicId } = useParams();

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
      features: [
        "Modern Dental Equipment",
        "Experienced Dentists",
        "Emergency Services",
        "Digital X-Rays",
        "Painless Treatments",
        "Child-Friendly Environment",
      ],
      doctors: [
        {
          name: "Dr. Rajesh Joshi",
          specialty: "Chief Dental Surgeon",
          experience: "15+ years",
        },
        {
          name: "Dr. Priya Sharma",
          specialty: "Periodontist",
          experience: "10+ years",
        },
      ],
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
      features: [
        "Advanced Dental Technology",
        "Orthodontic Specialists",
        "Cosmetic Dentistry",
        "Teeth Whitening",
        "Root Canal Treatment",
        "Dental Implants",
      ],
      doctors: [
        {
          name: "Dr. Amit Patil",
          specialty: "General Dentist",
          experience: "8+ years",
        },
        {
          name: "Dr. Neha Deshmukh",
          specialty: "Orthodontist",
          experience: "7+ years",
        },
      ],
    },
  };

  const clinic = clinics[clinicId] || clinics["nashik-road"];

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20"
    >
      {/* Clinic Header */}
      <motion.div
        variants={fadeIn("up", "spring", 0.1, 1)}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{clinic.name}</h1>
        <div className="w-24 h-1 bg-green-500 mx-auto"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Providing exceptional dental care with state-of-the-art technology and
          experienced professionals
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Clinic Details */}
        <motion.div variants={fadeIn("right", "spring", 0.2, 1)}>
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-xl shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="text-green-500 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-600">{clinic.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-green-500 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">{clinic.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-green-500 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">{clinic.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-green-500 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800">Hours</h3>
                  <p className="text-gray-600">{clinic.hours}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href={`tel:${clinic.phone.replace(/\D/g, "")}`}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white text-center font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                <Phone size={18} className="mr-2" />
                Call Now
              </a>
              <button className="flex-1 bg-white text-green-500 font-medium py-3 px-4 rounded-md border border-green-300 hover:bg-green-50 transition-colors flex items-center justify-center">
                <Calendar size={18} className="mr-2" />
                Book Appointment
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Clinic Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinic.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Heart className="text-green-500" size={16} />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Map and Doctors */}
        <motion.div variants={fadeIn("left", "spring", 0.2, 1)}>
          {/* Map */}
          <div className="bg-white p-8 rounded-xl shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Location</h2>
            <div className="h-80 rounded-lg overflow-hidden">
              <iframe
                src={clinic.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${clinic.name} Location`}
              ></iframe>
            </div>
          </div>

          {/* Doctors */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Our Dentists
            </h2>
            <div className="space-y-6">
              {clinic.doctors.map((doctor, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users className="text-green-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {doctor.name}
                    </h3>
                    <p className="text-gray-600">{doctor.specialty}</p>
                    <p className="text-sm text-gray-500 mt-1 flex items-center">
                      <Award className="mr-1" size={14} />
                      {doctor.experience} experience
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Emergency Notice */}
      <motion.div
        variants={fadeIn("up", "spring", 0.3, 1)}
        className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-xl text-center"
      >
        <h3 className="text-xl font-bold text-amber-800 mb-2">
          Dental Emergency?
        </h3>
        <p className="text-amber-700">
          We accept walk-ins for urgent dental issues. Call us directly at{" "}
          <a
            href={`tel:${clinic.phone.replace(/\D/g, "")}`}
            className="font-semibold underline"
          >
            {clinic.phone}
          </a>{" "}
          for immediate assistance.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LocationPage;
