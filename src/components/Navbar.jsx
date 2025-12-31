import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Clock,
  Calendar,
  MapPin,
} from "lucide-react";
import DentalLogo from "./DentalLogo";
import axiosInstance from "../services/api";

// Clinic information
const clinics = [
  {
    id: 1,
    name: "Deolali Camp Clinic",
    address: "59-60, Howson Rd, near MSEB office, Deolali Camp, Nashik",
    phone: "+919021256647",
    hours: "Mon–Sat: 10:30 AM – 9:00 PM",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.2780598558447!2d73.8344327!3d19.9548052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd9553a6822c55%3A0xb1e4f0ae27957fe2!2sDr.%20Joshi%27s%20Care%20%26%20Cure%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1756881578216!5m2!1sen!2sin",
    slug: "deolali-camp",
  },
  {
    id: 2,
    name: "Nashik Road Clinic",
    address:
      "203-204, Hari Amantran, Datta Mandir Rd, near Dattamandir, Nashik Road, Nashik",
    phone: "+918149049104",
    hours: "Mon–Sat: 10:30 AM – 9:00 PM",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.5211240099898!2d73.8303748!3d19.902432999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd958535bd1099%3A0x4813ba22d2d1d82!2sDr.%20Joshi%27s%20Care%20%26%20Cure%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1756881602062!5m2!1sen!2sin",
    slug: "nashik-road",
  },
];

// Static navigation items (excluding treatments which will be dynamic)
const staticNavItems = [
  { label: "Home", path: "/" },
  { label: "Our Doctors", path: "/doctors" },
  { label: "Patient Safety", path: "/patient-safety" },
  { label: "Blog", path: "/blog" },
  {
    label: "Gallery",
    submenu: [
      { label: "Deolali Camp Gallery", path: "/gallery/deolali-camp-gallery" },
      { label: "Nashik Road Gallery", path: "/gallery/nashik-road-gallery" },
    ],
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(clinics[0]);
  const [hidden, setHidden] = useState(false);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [navItems, setNavItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch treatments for navbar - Updated to match Filament resource structure
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        setLoading(true);
        setError(null);

        // Updated API endpoint to match your Filament resource
        const response = await axiosInstance.get(
          "/treatments?active=true&order=asc"
        );

        if (response.data.success) {
          // Map the response data to match the Filament Treatment model structure
          const treatmentItems = response.data.data.map((treatment) => ({
            id: treatment.id,
            label: treatment.h1, // Using h1 field from Filament as label
            slug: treatment.slug, // Using slug field from Filament
            path: `/treatments/${treatment.slug}`,
            is_active: treatment.is_active,
            order: treatment.order,
            meta_title: treatment.meta_title,
            meta_description: treatment.meta_description,
          }));

          // Filter only active treatments and sort by order
          const activeTreatments = treatmentItems
            .filter((treatment) => treatment.is_active)
            .sort((a, b) => a.order - b.order)
            .map((treatment) => ({
              label: treatment.label,
              path: treatment.path,
            }));

          setTreatments(activeTreatments);

          // Build complete navigation items with dynamic treatments
          const completeNavItems = [
            { label: "Home", path: "/" },
            {
              label: "Treatments",
              submenu: activeTreatments,
            },
            ...staticNavItems.filter((item) => item.label !== "Home"),
          ];

          setNavItems(completeNavItems);
        } else {
          throw new Error("Failed to fetch treatments");
        }
      } catch (error) {
        console.error("Error fetching treatments:", error);
        setError("Failed to load navigation");

        // Set empty treatments array
        setTreatments([]);

        // Build nav items without treatments but with empty treatments submenu
        const completeNavItems = [
          { label: "Home", path: "/" },
          {
            label: "Treatments",
            submenu: [], // Empty array
          },
          ...staticNavItems.filter((item) => item.label !== "Home"),
        ];

        setNavItems(completeNavItems);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleNavItemClick = (item, index) => {
    if (item.submenu && item.submenu.length > 0) {
      toggleDropdown(index);
    } else {
      navigate(item.path);
      setIsMenuOpen(false);
      setOpenDropdown(null);
    }
  };

  const handleSubItemClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  // Handle clinic selection from Contact buttons
  const handleClinicSelection = (clinic) => {
    setSelectedClinic(clinic);
    // Store selected clinic in sessionStorage for ContactUsPage to access
    sessionStorage.setItem("selectedClinic", JSON.stringify(clinic));
    // Navigate to contact page with clinic slug
    navigate(`/contact/${clinic.slug}`);
    setIsMenuOpen(false);
  };

  // Handle contact button click (general contact page)
  const handleContactClick = () => {
    // Store current selected clinic for ContactUsPage
    sessionStorage.setItem("selectedClinic", JSON.stringify(selectedClinic));
    navigate("/contact");
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname.includes("deolali")) {
      setSelectedClinic(clinics[0]);
    } else if (location.pathname.includes("nashik-road")) {
      setSelectedClinic(clinics[1]);
    }
  }, [location.pathname]);

  const primaryColor = "#0E7C7B";

  // Show loading state if needed
  if (loading && navItems.length === 0) {
    return (
      <header className="relative z-50">
        <div className="bg-[#0E7C7B] text-white text-sm px-4 fixed top-0 left-0 w-full z-[100] hidden md:block">
          <div className="container mx-auto flex justify-between items-center py-3">
            <div className="flex items-center space-x-6">
              <div className="h-4 w-40 bg-teal-300 rounded animate-pulse"></div>
              <div className="h-4 w-48 bg-teal-300 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-8">
              {[1, 2].map((item) => (
                <div key={item} className="flex flex-col space-y-1">
                  <div className="h-4 w-32 bg-teal-300 rounded animate-pulse"></div>
                  <div className="h-4 w-28 bg-teal-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <nav className="fixed w-full left-0 bg-white/90 backdrop-blur-sm z-[90] pt-6 md:pt-7 translate-y-0">
          <div className="container mx-auto py-3 px-4 pt-6">
            <div className="flex justify-between items-center">
              <div className="h-12 w-40 bg-gray-300 rounded animate-pulse"></div>
              <div className="flex items-center space-x-4">
                <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-10 w-32 bg-[#0E7C7B] rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="relative z-50">
      {/* ✅ Top Contact Bar (hidden on mobile) */}
      <div className="bg-[#0E7C7B] text-white text-sm px-4 fixed top-0 left-0 w-full z-[100] hidden md:block">
        <div className="container mx-auto flex flex-row justify-between items-center py-3">
          {/* Left: Email & Hours */}
          <div className="flex items-center space-x-6">
            <a
              href="mailto:drjoshidental@gmail.com"
              className="hover:text-teal-200 text-sm flex items-center transition-colors"
            >
              <Mail size={14} className="mr-1" />
              drjoshidental@gmail.com
            </a>
            <div className="flex items-center space-x-2">
              <Clock size={14} />
              <span>Mon–Sat: 10:30 AM – 9:00 PM</span>
            </div>
          </div>

          {/* Right: Clinic Info */}
          <div className="flex items-center space-x-8">
            {clinics.map((clinic) => (
              <div key={clinic.id} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <MapPin size={14} />
                  <span>{clinic.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={14} />
                  <a
                    href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                    className="hover:text-teal-200 text-sm transition-colors"
                  >
                    {clinic.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed w-full left-0 transition-all duration-300 z-[90] pt-6 md:pt-7 ${
          scrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-sm"
        } ${hidden ? "-translate-y-full md:translate-y-0" : "translate-y-0"}`}
        style={{ top: scrolled ? "-5px" : "50px" }}
      >
        <div className="container mx-auto py-3 px-4 pt-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div onClick={() => navigate("/")} className="cursor-pointer">
              <DentalLogo />
            </div>

            <div className="flex flex-col justify-center items-end gap-2">
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1 font-medium text-gray-800 relative">
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() =>
                      item.submenu &&
                      item.submenu.length > 0 &&
                      setOpenDropdown(index)
                    }
                    onMouseLeave={() => item.submenu && setOpenDropdown(null)}
                  >
                    <button
                      onClick={() => handleNavItemClick(item, index)}
                      className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-all ${
                        openDropdown === index
                          ? "text-white bg-[#0E7C7B]"
                          : "hover:text-[#0E7C7B] hover:bg-teal-50"
                      } ${
                        item.submenu && item.submenu.length === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={item.submenu && item.submenu.length === 0}
                    >
                      {item.label}
                      {item.submenu && item.submenu.length > 0 && (
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            openDropdown === index ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {/* Dropdown Menu */}
                    {openDropdown === index &&
                      item.submenu &&
                      item.submenu.length > 0 && (
                        <div className="absolute top-full left-0 bg-white rounded-lg shadow-xl py-2 min-w-[220px] z-[120] border border-gray-100">
                          {item.submenu.map((subItem, subIndex) => (
                            <div
                              key={subIndex}
                              onClick={() => handleSubItemClick(subItem.path)}
                              className="px-4 py-2 text-sm text-gray-700 cursor-pointer transition-all hover:bg-teal-50 hover:text-[#0E7C7B] hover:pl-5"
                            >
                              {subItem.label}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}

                {/* Contact Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setOpenDropdown("contact")}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-all ${
                      openDropdown === "contact"
                        ? "text-white bg-[#0E7C7B]"
                        : "hover:text-[#0E7C7B] hover:bg-teal-50"
                    }`}
                  >
                    Contact
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openDropdown === "contact" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Contact Dropdown Menu */}
                  {openDropdown === "contact" && (
                    <div className="absolute top-full left-0 bg-white rounded-lg shadow-xl py-2 min-w-[220px] z-[120] border border-gray-100">
                      {/* <div
                        onClick={handleContactClick}
                        className="px-4 py-2 text-sm text-gray-700 cursor-pointer transition-all hover:bg-teal-50 hover:text-[#0E7C7B] hover:pl-5"
                      >
                        General Contact
                      </div> */}
                      {clinics.map((clinic) => (
                        <div
                          key={clinic.id}
                          onClick={() => handleClinicSelection(clinic)}
                          className="px-4 py-2 text-sm text-gray-700 cursor-pointer transition-all hover:bg-teal-50 hover:text-[#0E7C7B] hover:pl-5"
                        >
                          {clinic.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleContactClick}
                  className="ml-2 px-4 py-2 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center text-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Calendar size={16} className="mr-2" />
                  Book Appointment
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-gray-800 hover:text-[#0E7C7B] p-2 transition-colors"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white z-[110] shadow-xl p-6 space-y-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div onClick={() => navigate("/")} className="cursor-pointer">
              <DentalLogo />
            </div>
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-[#0E7C7B] p-2"
            >
              <X size={28} />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Clinic Selector */}
          <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Select a Clinic:
            </h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleContactClick}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-left"
              >
                General Contact
              </button>
              {clinics.map((clinic) => (
                <button
                  key={clinic.id}
                  onClick={() => handleClinicSelection(clinic)}
                  className={`px-4 py-2 rounded-lg transition-colors text-left ${
                    selectedClinic.id === clinic.id
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-800"
                  }`}
                >
                  {clinic.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => handleNavItemClick(item, index)}
                  className={`w-full text-left font-medium text-gray-800 py-3 flex justify-between items-center ${
                    item.submenu && item.submenu.length > 0
                      ? ""
                      : "hover:text-[#0E7C7B]"
                  } ${
                    item.submenu && item.submenu.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={item.submenu && item.submenu.length === 0}
                >
                  {item.label}
                  {item.submenu && item.submenu.length > 0 && (
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${
                        openDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
                {item.submenu &&
                  openDropdown === index &&
                  item.submenu.length > 0 && (
                    <div className="ml-4 space-y-2 mb-2">
                      {item.submenu.map((sub, i) => (
                        <div
                          key={i}
                          onClick={() => handleSubItemClick(sub.path)}
                          className="pl-3 py-2 text-gray-700 hover:text-[#0E7C7B] cursor-pointer flex items-center"
                        >
                          <span
                            style={{ color: primaryColor }}
                            className="mr-2"
                          >
                            •
                          </span>
                          {sub.label}
                        </div>
                      ))}
                    </div>
                  )}
                {item.submenu && item.submenu.length === 0 && (
                  <div className="ml-4 text-sm text-gray-500 italic">
                    No treatments available
                  </div>
                )}
              </div>
            ))}

            {/* Contact Section in Mobile */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === "contact" ? null : "contact")
                }
                className="w-full text-left font-medium text-gray-800 py-3 flex justify-between items-center hover:text-[#0E7C7B]"
              >
                Contact
                <ChevronDown
                  size={20}
                  className={`transition-transform ${
                    openDropdown === "contact" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openDropdown === "contact" && (
                <div className="ml-4 space-y-2 mb-2">
                  <div
                    onClick={handleContactClick}
                    className="pl-3 py-2 text-gray-700 hover:text-[#0E7C7B] cursor-pointer flex items-center"
                  >
                    <span style={{ color: primaryColor }} className="mr-2">
                      •
                    </span>
                    General Contact
                  </div>
                  {clinics.map((clinic) => (
                    <div
                      key={clinic.id}
                      onClick={() => handleClinicSelection(clinic)}
                      className="pl-3 py-2 text-gray-700 hover:text-[#0E7C7B] cursor-pointer flex items-center"
                    >
                      <span style={{ color: primaryColor }} className="mr-2">
                        •
                      </span>
                      {clinic.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleContactClick}
              className="w-full mt-4 px-4 py-3 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
              style={{ backgroundColor: primaryColor }}
            >
              <Calendar size={18} className="mr-2" />
              Book Appointment
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Contact Us</h3>
            <div className="space-y-3">
              <a
                href="mailto:drjoshidental@gmail.com"
                className="text-gray-700 hover:text-[#0E7C7B] flex items-center"
              >
                <Mail size={16} className="mr-2" />
                drjoshidental@gmail.com
              </a>
              <a
                href={`tel:${selectedClinic.phone.replace(/\s/g, "")}`}
                className="text-gray-700 hover:text-[#0E7C7B] flex items-center"
              >
                <Phone size={16} className="mr-2" />
                {selectedClinic.phone}
              </a>
              <div className="text-gray-700 flex items-start">
                <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{selectedClinic.address}</span>
              </div>
              <div className="text-gray-700 flex items-center">
                <Clock size={16} className="mr-2" />
                {selectedClinic.hours}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
