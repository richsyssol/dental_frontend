import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Users,
  Award,
  Shield,
  Smile,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { TbDental, TbSparkles } from "react-icons/tb";
import {
  FaTooth,
  FaChild,
  FaTeeth,
  FaTeethOpen,
  FaHeartbeat,
} from "react-icons/fa";
import { LuHeartPulse } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import Stats from "./Stats";
import CTA from "./CTA";

// Base URL configuration
// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://dentalcarenasik.demovoting.com/";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  // state hooks for each section
  const [welcome, setWelcome] = useState(null);
  const [services, setServices] = useState([]);
  const [whyChoose, setWhyChoose] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [resWelcome, resServices, resWhy, resTestimonials, resFaqs] =
          await Promise.all([
            axiosInstance.get("/welcome-section"),
            axiosInstance.get("/services"),
            axiosInstance.get("/why-choose-us"),
            axiosInstance.get("/testimonials"),
            axiosInstance.get("/faqs"),
          ]);

        // Set data from backend responses
        setWelcome(resWelcome.data.data || resWelcome.data);
        setServices(resServices.data.data || resServices.data);
        setWhyChoose(resWhy.data.data || resWhy.data);
        setTestimonials(resTestimonials.data.data || resTestimonials.data);
        setFaqs(resFaqs.data.data || resFaqs.data);
      } catch (err) {
        console.error("Error fetching home page data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // If it's already a full URL, return as is
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // If it starts with uploads/, construct the full URL
    if (imagePath.startsWith("uploads/")) {
      return `${API_BASE_URL}/${imagePath}`;
    }

    // For other cases, assume it's relative to uploads directory
    return `${API_BASE_URL}/uploads/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        <span className="ml-3 text-gray-600">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-32">
        <div className="text-red-600 text-lg mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Sub-components that use the fetched data

  const WelcomeSection = () => {
    if (!welcome) return null;

    // Get dynamic image URLs
    const image1Url = getImageUrl(welcome.image_1);
    const image2Url = getImageUrl(welcome.image_2);
    const image3Url = getImageUrl(welcome.image_3);

    return (
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Content Section */}
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-[#0a8583] mb-6 leading-tight">
                {welcome?.title || "Welcome to Our Dental Clinic"}
              </h2>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {welcome?.description ||
                  "Your trusted partner in dental care. We provide comprehensive dental services with the latest technology and compassionate care."}
              </p>

              {welcome?.highlights &&
                Array.isArray(welcome.highlights) &&
                welcome.highlights.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {welcome.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle2
                          className="text-teal-600 mr-3 flex-shrink-0"
                          size={22}
                        />
                        <span className="text-gray-700 text-base">{hl}</span>
                      </div>
                    ))}
                  </div>
                )}

              {welcome?.cta_text && welcome?.cta_link && (
                <Link
                  to={welcome.cta_link}
                  className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  {welcome.cta_text}
                  <ChevronRight size={20} className="ml-2" />
                </Link>
              )}
            </div>

            {/* Images Grid Section */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {/* Top Left Image */}
                <div className="col-span-1">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    {image1Url ? (
                      <img
                        src={image1Url}
                        alt="Welcome section image 1"
                        className="w-full h-64 md:h-72 object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-64 md:h-72 bg-gray-200 flex items-center justify-center rounded-2xl">
                        <span className="text-gray-500">Image 1</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Top Right Image */}
                <div className="col-span-1">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mt-8">
                    {image2Url ? (
                      <img
                        src={image2Url}
                        alt="Welcome section image 2"
                        className="w-full h-64 md:h-72 object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-64 md:h-72 bg-gray-200 flex items-center justify-center rounded-2xl">
                        <span className="text-gray-500">Image 2</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Full Width Image */}
                <div className="col-span-2">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    {image3Url ? (
                      <img
                        src={image3Url}
                        alt="Welcome section image 3"
                        className="w-full h-60 md:h-64 object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-60 md:h-64 bg-gray-200 flex items-center justify-center rounded-2xl">
                        <span className="text-gray-500">Image 3</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const ServicesSection = () => {
    if (!services || services.length === 0) return null;

    return (
      <section className="py-16 bg-teal-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0a8583] mb-4">
              Our Specialized Dental Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive dental care tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, idx) => {
              // Map icon key to actual React component
              let iconComp = null;
              switch (svc.icon) {
                case "TbDental":
                  iconComp = <TbDental size={32} className="text-teal-600" />;
                  break;
                case "TbSparkles":
                  iconComp = <TbSparkles size={32} className="text-teal-600" />;
                  break;
                case "FaTooth":
                  iconComp = <FaTooth size={32} className="text-teal-600" />;
                  break;
                case "FaTeeth":
                  iconComp = <FaTeeth size={32} className="text-teal-600" />;
                  break;
                case "FaTeethOpen":
                  iconComp = (
                    <FaTeethOpen size={32} className="text-teal-600" />
                  );
                  break;
                case "FaChild":
                  iconComp = <FaChild size={32} className="text-teal-600" />;
                  break;
                case "LuHeartPulse":
                  iconComp = (
                    <LuHeartPulse size={32} className="text-teal-600" />
                  );
                  break;
                case "FaHeartbeat":
                  iconComp = (
                    <FaHeartbeat size={32} className="text-teal-600" />
                  );
                  break;
                case "Users":
                  iconComp = <Users size={32} className="text-teal-600" />;
                  break;
                case "Award":
                  iconComp = <Award size={32} className="text-teal-600" />;
                  break;
                default:
                  iconComp = <TbDental size={32} className="text-teal-600" />;
              }

              return (
                <motion.div
                  key={svc.id || idx}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-teal-100"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4">{iconComp}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {svc.short_description || svc.description}
                  </p>
                  <Link
                    to={`/${svc.path}`} // ✅ Uses backend path field
                    className="text-teal-600 hover:text-teal-800 font-medium flex items-center"
                  >
                    Learn more <ChevronRight size={16} className="ml-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* <div className="text-center mt-12">
            <Link
              to="/treatments"
              className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              View All Services <ChevronRight size={20} className="ml-1" />
            </Link>
          </div> */}
        </div>
      </section>
    );
  };

  const WhyChooseUsSection = () => {
    if (!whyChoose || whyChoose.length === 0) return null;

    return (
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0a8583] mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our patient-centered approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoose.map((item, idx) => {
              let iconComp = null;
              switch (item.icon) {
                case "Users":
                  iconComp = <Users size={24} className="text-teal-600" />;
                  break;
                case "Award":
                  iconComp = <Award size={24} className="text-teal-600" />;
                  break;
                case "Shield":
                  iconComp = <Shield size={24} className="text-teal-600" />;
                  break;
                case "Smile":
                  iconComp = <Smile size={24} className="text-teal-600" />;
                  break;
                case "CheckCircle2":
                  iconComp = (
                    <CheckCircle2 size={24} className="text-teal-600" />
                  );
                  break;
                case "MapPin":
                  iconComp = <MapPin size={24} className="text-teal-600" />;
                  break;
                case "TbDental":
                  iconComp = <TbDental size={24} className="text-teal-600" />;
                  break;
                case "FaTeeth":
                  iconComp = <FaTeeth size={24} className="text-teal-600" />;
                  break;
                case "FaHeartbeat":
                  iconComp = (
                    <FaHeartbeat size={24} className="text-teal-600" />
                  );
                  break;
                default:
                  iconComp = <Users size={24} className="text-teal-600" />;
              }

              return (
                <motion.div
                  key={item.id || idx}
                  className="bg-teal-50 p-6 rounded-lg border border-teal-100 flex items-start"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-teal-100 p-3 rounded-full mr-4">
                    {iconComp}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  const TestimonialsSection = () => {
    const clientsRef = useRef();

    const scrollClients = (direction) => {
      if (clientsRef.current) {
        const scrollAmount = direction === "left" ? -300 : 300;
        clientsRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    };

    if (!testimonials || testimonials.length === 0) return null;

    return (
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-center text-[#0a8583] mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>

          <motion.div
            className="h-1 w-16 bg-[#00786F] mx-auto mb-12"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          />

          <div className="relative">
            <button
              onClick={() => scrollClients("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#00786F] hover:bg-[#00635A] text-white p-3 rounded-full shadow-md hidden md:block transition-transform hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scrollClients("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#00786F] hover:bg-[#00635A] text-white p-3 rounded-full shadow-md hidden md:block transition-transform hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              ref={clientsRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {testimonials.map((client, idx) => (
                <motion.div
                  key={client.id || idx}
                  className="min-w-[300px] max-w-[350px] bg-white rounded-xl shadow-md border border-gray-100 flex-shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-5 flex flex-col h-full justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">
                        {client.name || "Anonymous"}
                      </h4>
                      <p className="text-sm text-[#00786F] mb-2">
                        {client.treatment || "Dental Treatment"}
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        {client.location || "Location not specified"}
                      </p>
                      <p className="text-gray-600 italic mb-4 text-sm">
                        "{client.comment || "Great service!"}"
                      </p>
                    </div>
                    <div className="flex gap-1 text-[#00786F] mt-auto">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < (client.rating || 5) ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                              />
                            </svg>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Google Reviews Link */}
          <div className="text-center mt-12">
            <a
              href="https://www.google.com/search?sca_esv=e126eb4d051b0442&hl=en-IN&sxsrf=AE3TifNr_Dtdbla7hIZPea5IYv8ZDv9R2w:1757507049932&si=AMgyJEvkVjFQtirYNBhM3ZJIRTaSJ6PxY6y1_6WZHGInbzDnMYoQmT4ohuML6aQ2PsEJljXCqJtIR5FaZP8LvlO3lHcOmmVTAnZMmofty28cA7GXa_gdxY2ompeOKMyZBQp2esPbePTO5knQp1Wfb43CWHjUKjtwXwUwiOOFEGTjDwRl6Wqtqpo%3D&q=Dr.+Joshi%27s+Care+%26+Cure+Dental+Clinic+Reviews&sa=X&ved=2ahUKEwiw7Zr7l86PAxVB2DgGHcRVO44Q0bkNegQIJhAE&biw=1478&bih=708&dpr=1.3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center  text-teal-600 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Read all 113 reviews on Google{" "}
              <ChevronRight size={20} className="ml-1" />
            </a>
          </div>
        </div>
      </section>
    );
  };

  const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (idx) => {
      setActiveIndex(activeIndex === idx ? null : idx);
    };

    if (!faqs || faqs.length === 0) return null;

    return (
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0a8583] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our dental services
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={faq.id || idx}
                className="mb-4 border-b border-teal-100"
              >
                <button
                  className="flex justify-between items-center w-full py-4 text-left font-semibold text-gray-800 hover:text-teal-600 transition-colors"
                  onClick={() => toggleFAQ(idx)}
                >
                  <span>{faq.question}</span>
                  <ChevronRight
                    className={`transform transition-transform ${
                      activeIndex === idx ? "rotate-90" : ""
                    }`}
                    size={20}
                  />
                </button>
                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-gray-600">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="homepage">
      {/* <PopupHome isOpen={showPopup} setIsOpen={setShowPopup} /> */}
      <HeroSection />
      <Stats />
      <WelcomeSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTA />
    </div>
  );
};

export default Home;
