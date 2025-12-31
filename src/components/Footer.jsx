import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Heart,
  Shield,
  Award,
  Star,
} from "lucide-react";
import { FaTooth, FaSprayCan } from "react-icons/fa";
import { TbMoodSmile } from "react-icons/tb";

const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Treatments", path: "/treatments" },
    { label: "Patient Safety", path: "/patient-safety" },
    { label: "Blog", path: "/blog" },
    { label: "Reviews", path: "/reviews" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact", path: "/contact" },
  ];

  const services = [
    { label: "Braces & Aligners", path: "/treatments#braces" },
    { label: "Dental Implants", path: "/treatments#implants" },
    { label: "Teeth Whitening", path: "/treatments#whitening" },
    { label: "Root Canal Treatment", path: "/treatments#rootcanal" },
    { label: "Dental Crowns", path: "/treatments#crowns" },
    { label: "General Dentistry", path: "/treatments#general" },
  ];

  const socialLinks = [
    {
      icon: <Facebook size={18} />,
      label: "Facebook",
      url: "https://facebook.com/drjoshidental",
    },
    {
      icon: <Instagram size={18} />,
      label: "Instagram",
      url: "https://instagram.com/drjoshidental",
    },
    {
      icon: <Twitter size={18} />,
      label: "Twitter",
      url: "https://twitter.com/drjoshidental",
    },
    {
      icon: <Youtube size={18} />,
      label: "YouTube",
      url: "https://youtube.com/drjoshidental",
    },
  ];

  const features = [
    {
      icon: <FaSprayCan size={20} className="text-teal-500" />,
      text: "Sterilized Equipment",
    },
    {
      icon: <Award size={20} className="text-teal-500" />,
      text: "19+ Years Experience",
    },
    {
      icon: <Star size={20} className="text-teal-500" />,
      text: "4.9/5 Google Rating",
    },
    {
      icon: <TbMoodSmile size={20} className="text-teal-500" />,
      text: "13,000+ Happy Patients",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-teal-800 to-teal-900 text-white pt-16 pb-8 px-4 md:px-8">
      {/* Feature Highlights */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 bg-teal-700/30 rounded-lg"
          >
            <div className="bg-teal-100 p-3 rounded-full mb-3">
              {feature.icon}
            </div>
            <p className="text-sm font-medium">{feature.text}</p>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Clinic Info */}
        <div>
          <div className="mb-6 flex items-center">
            <FaTooth className="text-white mr-2" size={28} />
            <span className="text-xl font-bold">
              Dr. Joshi's Care & Cure <br />
              The Dental Wellness Clinic{" "}
            </span>
          </div>
          <p className="text-teal-100 mb-6 leading-relaxed">
            Providing exceptional dental care in Nashik Road since 2007. Our
            team of experienced professionals is dedicated to creating healthy,
            beautiful smiles for all our patients.
          </p>
          <div className="flex gap-3 mb-6">
            {socialLinks.map(({ icon, label, url }, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-700 hover:bg-teal-600 p-2 rounded-full text-white transition-colors"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Google Rating Badge */}
          <div
            onClick={() =>
              window.open(
                "https://www.google.com/search?sca_esv=e126eb4d051b0442&hl=en-IN&sxsrf=AE3TifNr_Dtdbla7hIZPea5IYv8ZDv9R2w:1757507049932&si=AMgyJEvkVjFQtirYNBhM3ZJIRTaSJ6PxY6y1_6WZHGInbzDnMYoQmT4ohuML6aQ2PsEJljXCqJtIR5FaZP8LvlO3lHcOmmVTAnZMmofty28cA7GXa_gdxY2ompeOKMyZBQp2esPbePTO5knQp1Wfb43CWHjUKjtwXwUwiOOFEGTjDwRl6Wqtqpo%3D&q=Dr.+Joshi%27s+Care+%26+Cure+Dental+Clinic+Reviews&sa=X&ved=2ahUKEwiw7Zr7l86PAxVB2DgGHcRVO44Q0bkNegQIJhAE&biw=1478&bih=708&dpr=1.3",
                "_blank"
              )
            }
            className="bg-amber-50 text-gray-800 p-3 rounded-lg inline-flex items-center cursor-pointer"
          >
            <div className="bg-amber-400 text-white p-1 rounded mr-2">
              <Star size={16} fill="currentColor" />
            </div>
            <div>
              <p className="font-bold text-sm">4.9/5 Rating</p>
              <p className="text-xs">Based on 113 Google Reviews</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-white border-b border-teal-600 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <button
                  onClick={() => navigate(link.path)}
                  className="text-teal-100 hover:text-white transition-colors text-left flex items-center group"
                >
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-3 group-hover:bg-amber-400 transition-colors"></span>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-white border-b border-teal-600 pb-2">
            Our Services
          </h3>
          <ul className="space-y-3">
            {services.map((service, index) => (
              <li key={index}>
                <button
                  onClick={() => navigate(service.path)}
                  className="text-teal-100 hover:text-white transition-colors text-left flex items-center group"
                >
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-3 group-hover:bg-amber-400 transition-colors"></span>
                  {service.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-white border-b border-teal-600 pb-2">
            Contact Info
          </h3>
          <ul className="space-y-4 text-teal-100">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-amber-400 mt-1 flex-shrink-0" />
              <span>
                59-60, Howson Rd, near MSEB office, Deolali Camp, Nashik,
                Maharashtra 422401
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-amber-400" />
              <a
                href="tel:+919021256647"
                className="hover:text-white transition-colors font-medium"
              >
                +91 90212 56647
              </a>
            </li>
          </ul>
          <ul className="space-y-4 text-teal-100 pt-4">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-amber-400 mt-1 flex-shrink-0" />
              <span>
                203-204, Hari Amantran, Datta Mandir Road, Near Dattamandir,
                Nashik Road, Nashik 422101
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-amber-400" />
              <a
                href="tel:+918149049104"
                className="hover:text-white transition-colors font-medium"
              >
                +91 81490 49104
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-amber-400" />
              <a
                href="mailto:info@drjoshidental.com"
                className="hover:text-white transition-colors"
              >
                info@drjoshidental.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={20} className="text-amber-400" />
              <div>
                <p>Mon-Sat: 10:30 AM - 3:30 PM</p>
                <p>Evening: 5:30 PM - 9:00 PM</p>
                <p className="text-teal-300">Sunday: Closed</p>
              </div>
            </li>
          </ul>

          {/* Emergency Contact */}
          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-400/30 rounded-lg">
            <p className="font-semibold text-amber-300 mb-1">
              Dental Emergency?
            </p>
            <a
              href="tel:+918149049104"
              className="text-white font-bold text-lg hover:underline"
            >
              Call Now: +91 81490 49104
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto mt-12 text-center text-sm text-teal-300 border-t border-teal-700 pt-6">
        <p className="mb-2">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">
            Dr. Joshi's Care & Cure Dental Clinic
          </span>
          . All Rights Reserved.
        </p>

        <p className="flex flex-wrap justify-center items-center gap-3">
          <button
            onClick={() => navigate("/privacy-policy")}
            className="hover:text-amber-400 transition-colors"
          >
            Privacy Policy
          </button>
          <span className="text-teal-600">•</span>
          <button
            onClick={() => navigate("/terms")}
            className="hover:text-amber-400 transition-colors"
          >
            Terms of Service
          </button>
        </p>

        {/* New line developed by (right side) */}
        <p className="mt-3 text-right text-xs text-teal-400">
          Developed by{" "}
          <a
            href="https://www.instagram.com/niwadigitize/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-amber-400 transition-colors font-medium"
          >
            Niwa Digitize
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
