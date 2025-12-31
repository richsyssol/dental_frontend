import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ChevronDown,
  CheckCircle,
  Award,
  Users,
  Shield,
  Star,
  Heart,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSEO } from "../../hooks/useSEO";
import ClinicInfo from "../../components/ClinicInfo";
import axiosInstance from "../../services/api";

const TreatmentPage2 = () => {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [treatment, setTreatment] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Extract the slug from the pathname
  const pathParts = location.pathname.split("/");
  const treatmentSlug = pathParts[pathParts.length - 1];

  useEffect(() => {
    const fetchTreatmentData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch treatment data
        const treatmentResponse = await axiosInstance.get(
          `/treatments/${treatmentSlug}`
        );

        if (treatmentResponse.data.success) {
          const treatmentData = treatmentResponse.data.data;
          setTreatment(treatmentData);

          // Fetch appointment data for this treatment
          try {
            const appointmentResponse = await axiosInstance.get(
              `/treatments/${treatmentSlug}/appointments`
            );

            if (
              appointmentResponse.data.success &&
              appointmentResponse.data.data.length > 0
            ) {
              setAppointmentData(appointmentResponse.data.data[0]);
            } else {
              // Use default appointment data if no specific appointment data found
              setAppointmentData({
                name: "Book Your Appointment",
                booking_description: "Schedule your dental consultation today",
                deolali_phone: "+91 90212 56647",
                nashik_phone: "+91 81490 49104",
                preferred_time: "9:30 AM - 9:00 PM",
                preferred_date: "Flexible dates available",
                button_text: "Book Appointment Now",
              });
            }
          } catch (appointmentError) {
            console.warn(
              "Failed to fetch appointment data, using defaults:",
              appointmentError
            );
            setAppointmentData({
              name: "Book Your Appointment",
              booking_description: "Schedule your dental consultation today",
              deolali_phone: "+91 90212 56647",
              nashik_phone: "+91 81490 49104",
              preferred_time: "9:30 AM - 9:00 PM",
              preferred_date: "Flexible dates available",
              button_text: "Book Appointment Now",
            });
          }
        } else {
          throw new Error("Failed to fetch treatment data");
        }
      } catch (error) {
        console.error("Error fetching treatment:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load treatment information"
        );
        setTreatment(null);
        setAppointmentData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatmentData();
  }, [treatmentSlug]);

  // Use dynamic SEO data from backend
  useSEO(
    treatment?.meta || {
      title: treatment?.meta_title || "Dental Treatment",
      description:
        treatment?.meta_description || "Professional dental treatment",
      url: treatment?.meta_url || location.pathname,
    }
  );

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Icon mapping function for why choose items
  const getIconComponent = (iconName) => {
    const iconMap = {
      Award: Award,
      Users: Users,
      Shield: Shield,
      Star: Star,
      CheckCircle: CheckCircle,
      Heart: Heart,
      Clock: Clock,
      Calendar: Calendar,
      "fa-check": CheckCircle,
      asdas: CheckCircle,
      default: CheckCircle,
    };

    return iconMap[iconName] || iconMap.default;
  };

  // Handle appointment booking
  const handleBookAppointment = () => {
    navigate("/contact", {
      state: {
        treatment: treatment?.h1,
        treatmentSlug: treatmentSlug,
      },
    });
  };

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    const phoneNumber = "+919021256647";
    const message = `Hello, I would like to book an appointment for ${
      treatment?.h1 || "dental treatment"
    }`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Handle phone call
  const handlePhoneClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  // Format time display
  const formatTimeDisplay = (timeString) => {
    if (!timeString) return "9:30 AM - 9:00 PM";

    // Handle time format like "00:33:00"
    if (timeString.includes(":")) {
      const timeParts = timeString.split(":");
      if (timeParts.length === 3) {
        const hours = parseInt(timeParts[0]);
        const minutes = timeParts[1];
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes} ${ampm}`;
      }
    }
    return timeString;
  };

  // Format date display
  const formatDateDisplay = (dateString) => {
    if (!dateString) return "Flexible dates available";

    // Handle date format like "2030-01-18T00:00:00.000000Z"
    if (dateString.includes("T")) {
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch (e) {
        return "Flexible dates available";
      }
    }
    return dateString;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 mt-32 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </motion.div>
      </div>
    );
  }

  if (error || !treatment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 mt-32 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Treatment Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              {error || "The requested treatment could not be found."}
            </p>
            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-700">
                Slug used:{" "}
                <code className="bg-gray-200 px-1 rounded">
                  {treatmentSlug}
                </code>
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Use the correct property names from your API response
  const {
    h1,
    intro,
    hero_image,
    sections = [],
    faqs = [],
    why_choose_items = [],
  } = treatment;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 mt-32 overflow-hidden">
      {/* Hero Section with Modern Design */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-600/20 to-blue-600/10"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-2xl md:text-4xl font-bold mb-6">{h1}</h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl">
                {intro}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookAppointment}
                  className="bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold py-4 px-8 rounded-full hover:shadow-lg transition-all duration-300 flex items-center"
                >
                  Book Consultation
                  <ArrowRight className="ml-2" size={20} />
                </motion.button>

                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-gray-700 font-medium py-4 px-6 hover:text-teal-600 transition-colors"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="mr-2" size={20} />
                  Chat on WhatsApp
                </motion.button> */}
              </div>

              {/* Stats */}
              {/* <div className="grid grid-cols-3 gap-6 mt-12 max-w-md">
                {[
                  { number: "19+", label: "Years Experience" },
                  { number: "13K+", label: "Happy Patients" },
                  { number: "4.9/5", label: "Google Rating" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-teal-600">
                      {stat.number}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div> */}
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src={
                    hero_image
                      ? `${axiosInstance.defaults.baseURL.replace(
                          "/api",
                          ""
                        )}/uploads/${hero_image}`
                      : "/images/default-treatment.jpg"
                  }
                  alt={h1}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-200/30 rounded-full blur-xl"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-200/30 rounded-full blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative -mt-20">
        {/* Wave Divider */}
        <div className="absolute top-0 left-0 right-0 -translate-y-1">
          <svg
            viewBox="0 0 1200 120"
            className="w-full h-12 text-white fill-current"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
            />
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
          </svg>
        </div>

        {/* Two Column Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Main Content (Scrollable) */}
            <div className="w-full lg:w-2/3">
              <div className="space-y-16">
                {sections?.map((section, index) => (
                  <Section
                    key={section.id || index}
                    section={section}
                    index={index}
                  />
                ))}

                {/* FAQ Section */}
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-16"
                >
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600">
                      Get answers to common questions about your treatment
                    </p>
                  </div>

                  {faqs && faqs.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {faqs.map((faq, index) => (
                        <motion.div
                          key={faq.id || index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                          className="group"
                        >
                          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 group-hover:border-teal-200 transition-all duration-300 h-full">
                            <button
                              className="w-full text-left"
                              onClick={() => toggleFAQ(index)}
                            >
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-gray-800 text-lg pr-4">
                                  {faq.question || "Question"}
                                </h3>
                                <ChevronDown
                                  className={`transition-transform duration-300 text-teal-600 ${
                                    activeFAQ === index ? "rotate-180" : ""
                                  }`}
                                  size={20}
                                />
                              </div>
                            </button>
                            <AnimatePresence>
                              {activeFAQ === index && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-4 border-t border-gray-100">
                                    <div
                                      className="text-gray-600 leading-relaxed"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          faq.answer || "Answer not available",
                                      }}
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-500 text-lg mb-4">
                        No FAQs available for this treatment yet.
                      </div>
                      <p className="text-gray-400">
                        Check back later or contact us directly for any
                        questions.
                      </p>
                    </div>
                  )}
                </motion.section>
              </div>
            </div>

            {/* Right Side - Sticky Sidebar */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-32 space-y-8">
                {/* Book Appointment Section - Sticky */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-white to-teal-50/30 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {appointmentData?.name || "Book Your Appointment"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {appointmentData?.booking_description ||
                        "Schedule your dental consultation today"}
                    </p>
                  </div>

                  <div className="space-y-6 mb-8">
                    {/* Working Hours */}
                    <div
                      className="flex items-center p-4 bg-white/50 rounded-xl border border-white/50 cursor-pointer transition-colors"
                      onClick={() => navigate("/contact")}
                    >
                      <Clock className="text-teal-600 mr-4" size={24} />
                      <div>
                        {/* <p className="font-semibold text-gray-800">
                          Mon - Sat:{" "}
                          {formatTimeDisplay(appointmentData?.preferred_time) ||
                            "9:30 AM - 9:00 PM"}
                        </p> */}
                        {appointmentData?.title && (
                          <p className="font-semibold text-gray-800 mt-1">
                            {appointmentData.title}
                          </p>
                        )}
                        {/* <p className="text-sm text-gray-500 mt-1">
                          {appointmentData?.preferred_date
                            ? `Preferred: ${formatDateDisplay(
                                appointmentData.preferred_date
                              )}`
                            : "Flexible timing available"}
                        </p> */}
                      </div>
                    </div>

                    {/* Phone Numbers */}
                    {appointmentData?.deolali_phone && (
                      <div
                        className="flex items-center p-4 bg-white/50 rounded-xl border border-white/50 cursor-pointer transition-colors"
                        onClick={() =>
                          handlePhoneClick(
                            appointmentData.deolali_phone.replace(/\s/g, "")
                          )
                        }
                      >
                        <Phone className="text-teal-600 mr-4" size={24} />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {appointmentData.deolali_phone}
                          </p>
                          <p className="text-sm text-gray-500">Deolali Camp</p>
                        </div>
                      </div>
                    )}

                    {appointmentData?.nashik_phone && (
                      <div
                        className="flex items-center p-4 bg-white/50 rounded-xl border border-white/50 cursor-pointer transition-colors"
                        onClick={() =>
                          handlePhoneClick(
                            appointmentData.nashik_phone.replace(/\s/g, "")
                          )
                        }
                      >
                        <Phone className="text-teal-600 mr-4" size={24} />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {appointmentData.nashik_phone}
                          </p>
                          <p className="text-sm text-gray-500">Nashik Road</p>
                        </div>
                      </div>
                    )}

                    {/* WhatsApp */}
                    <div
                      className="flex items-center p-4 bg-white/50 rounded-xl border border-white/50 cursor-pointer transition-colors"
                      onClick={handleWhatsAppClick}
                    >
                      <MessageCircle className="text-teal-600 mr-4" size={24} />
                      <div>
                        <p className="font-semibold text-gray-800">
                          WhatsApp Available
                        </p>
                        <p className="text-sm text-gray-500">Quick responses</p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBookAppointment}
                    className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 text-lg"
                  >
                    {appointmentData?.button_text || "Book Appointment Now"}
                  </motion.button>
                </motion.div>

                {/* Why Choose Us Section - Also Sticky */}
                {why_choose_items && why_choose_items.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-br from-teal-600 to-blue-700 rounded-3xl p-8 text-white shadow-lg"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2">Why Choose Us</h3>
                      <p className="text-teal-100">
                        Experience the difference in dental care
                      </p>
                    </div>

                    <div className="space-y-6">
                      {why_choose_items.map((item, index) => {
                        const IconComponent = getIconComponent(item.icon);
                        return (
                          <motion.div
                            key={item.id || index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            className="flex items-start bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                          >
                            <IconComponent
                              className="text-teal-300 mr-4 mt-1 flex-shrink-0"
                              size={20}
                            />
                            <div>
                              <h4 className="font-semibold text-lg mb-1">
                                {item.title || "Feature"}
                              </h4>
                              <p className="text-teal-100 text-sm leading-relaxed">
                                {item.description ||
                                  "Description not available"}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clinic Info Section - Now starts earlier */}
      <div className="bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50">
        <ClinicInfo />
      </div>
    </div>
  );
};

// Section Component
const Section = ({ section, index }) => {
  const {
    h2 = "Section Title",
    content,
    list_items = [],
    list_title,
    subsections = [],
    ordered_list = [],
    note,
    image,
  } = section;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 + 0.4 }}
      className="mb-16"
    >
      <div
        className={`flex flex-col ${
          index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
        } gap-8 items-center`}
      >
        {/* Image Side */}
        {image && (
          <div className="lg:w-1/2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl overflow-hidden"
            >
              <img
                src={
                  image
                    ? `${axiosInstance.defaults.baseURL.replace(
                        "/api",
                        ""
                      )}/uploads/${image}`
                    : "/images/default-section.jpg"
                }
                alt={h2}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

              {/* Floating Number */}
              <div className="absolute top-6 left-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-teal-600 font-bold text-lg">
                  {index + 1}
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Content Side */}
        <div className={image ? "lg:w-1/2" : "w-full"}>
          <div className="backdrop-blur-sm rounded-3xl p-8 border border-white/50 bg-white/80 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{h2}</h2>

            {content && (
              <p className="text-gray-600 mb-6 leading-relaxed">{content}</p>
            )}

            {list_items && list_items.length > 0 && (
              <div className="mb-6">
                {list_title && (
                  <h4 className="font-semibold text-gray-700 mb-3">
                    {list_title}
                  </h4>
                )}
                <div className="grid gap-3">
                  {list_items.map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5 }}
                      className="flex items-center text-gray-600"
                    >
                      <CheckCircle
                        className="text-teal-500 mr-3 flex-shrink-0"
                        size={18}
                      />
                      <span>{typeof item === "object" ? item.item : item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {subsections && subsections.length > 0 && (
              <div className="grid gap-4 mt-6">
                {subsections.map((subsection, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -2 }}
                    className="bg-teal-50/50 p-4 rounded-xl border border-teal-100"
                  >
                    <h3 className="font-semibold text-teal-700 mb-2">
                      {subsection.h3 || "Subsection"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {subsection.content || "Content not available"}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {ordered_list && ordered_list.length > 0 && (
              <div className="mt-6">
                <div className="space-y-4">
                  {ordered_list.map((item, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {item.title || `Step ${i + 1}`}
                        </h4>
                        <p className="text-gray-600 text-sm mt-1">
                          {item.description || "Description not available"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {note && (
                  <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 mt-4">
                    <p className="text-blue-800 text-sm italic">{note}</p>
                  </div>
                )}
              </div>
            )}

            {note && !ordered_list && (
              <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 mt-4">
                <p className="text-blue-800 text-sm italic">{note}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TreatmentPage2;
