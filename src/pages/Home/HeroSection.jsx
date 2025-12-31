import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Phone,
  Play,
  Pause,
} from "lucide-react";
import axiosInstance, { fileBaseURL } from "../../services/api";

const HeroSection = () => {
  const [heroContent, setHeroContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axiosInstance.get("/hero-section");
        if (response.data.success) {
          setHeroContent(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching hero sections:", error);
      }
    };
    fetchHeroData();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || heroContent.length <= 1) return;
    const interval = setInterval(() => nextSlide(), 50000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, heroContent]);

  const nextSlide = () => {
    if (heroContent.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % heroContent.length);
    setIsVideoPlaying(true);
  };

  const prevSlide = () => {
    if (heroContent.length <= 1) return;
    setCurrentIndex(
      (prev) => (prev - 1 + heroContent.length) % heroContent.length
    );
    setIsVideoPlaying(true);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsVideoPlaying(true);
  };

  const toggleVideoPlayback = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const getVideoSource = (item) => {
    if (item.video_file) {
      return `${fileBaseURL}${item.video_file}`;
    }
    return item.video_url;
  };

  const currentItem = heroContent[currentIndex] || {};

  if (heroContent.length === 0) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center text-gray-500">
        Loading hero section...
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden mt-20">
      <div
        className="relative w-full h-[90vh] flex items-center"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Video Background */}
            <video
              autoPlay={isVideoPlaying}
              muted
              loop
              playsInline
              className="h-full w-full object-cover object-center"
            >
              <source src={getVideoSource(currentItem)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Play/Pause Button */}
            <button
              onClick={toggleVideoPlayback}
              className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 backdrop-blur-sm transition-all"
            >
              {isVideoPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div
          className="relative z-10 container mx-auto px-4 md:px-6"
          style={{ marginBottom: isMobile ? "-100px" : "-148px" }}
        >
          <div
            className="max-w-2xl"
            style={{ marginLeft: isMobile ? "20px" : "60px" }}
          >
            {currentItem.cta_highlight && (
              <motion.div
                className="inline-flex items-center bg-teal-600 text-white px-4 py-2 rounded-full mb-4 text-sm font-medium"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentItem.cta_highlight}
              </motion.div>
            )}

            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentItem.title}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-teal-50 mb-6 md:mb-8 max-w-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentItem.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href={currentItem.appointment_link}
                className="bg-white text-teal-700 hover:bg-teal-50 px-6 py-3 rounded-full font-semibold flex items-center justify-center transition-all shadow-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </a>
              <a
                href="tel:+918149049104"
                className="bg-teal-700 text-white hover:bg-teal-800 px-6 py-3 rounded-full font-semibold flex items-center justify-center transition-all shadow-lg border border-teal-600"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </motion.div>
            {/* Key Services Highlights */}
            <motion.div
              className="hidden md:flex gap-6 mt-8 text-teal-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                <span>Braces & Aligners</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                <span>Dental Implants</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                <span>Teeth Whitening</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {heroContent.length > 1 && !isMobile && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-teal-700/80 hover:bg-teal-800 p-4 rounded-full z-10 backdrop-blur-sm transition-all"
            >
              <ChevronLeft className="text-white w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-teal-700/80 hover:bg-teal-800 p-4 rounded-full z-10 backdrop-blur-sm transition-all"
            >
              <ChevronRight className="text-white w-6 h-6" />
            </button>
          </>
        )}
        {/* Emergency Badge */}
        <div className="absolute top-20 right-4 md:right-8 bg-amber-500 text-white px-4 py-2  rounded-full backdrop-blur-sm z-10 font-medium">
          Dental Emergencies Welcome
        </div>


      </div>
    </div>
  );
};

export default HeroSection;
