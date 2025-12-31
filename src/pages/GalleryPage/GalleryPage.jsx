// pages/GalleryPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Phone,
  Home,
} from "lucide-react";
import { useSEO } from "../../hooks/useSEO";
import axios from "axios";

const GalleryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clinicSlug } = useParams();

  // Extract clinic slug from URL pathname if useParams doesn't work
  const pathname = location.pathname;
  const extractedClinicSlug = clinicSlug || pathname.split("/").pop();

  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [clinic, setClinic] = useState(null);
  const [categories, setCategories] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clinicsList, setClinicsList] = useState([]);

  // API base URL
  // const API_BASE_URL = "http://127.0.0.1:8000/api";
  const API_BASE_URL = "https://dentalcarenasik.demovoting.com/api";

  // Fetch all clinics for navigation
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/gallery/clinics`);
        if (response.data.success) {
          setClinicsList(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching clinics list:", err);
      }
    };
    fetchClinics();
  }, []);

  // Fetch gallery data from backend
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching data for clinic slug:", extractedClinicSlug);

        const response = await axios.get(
          `${API_BASE_URL}/gallery/clinic/${extractedClinicSlug}`
        );

        console.log("API Response:", response.data);

        if (response.data.success) {
          const { clinic, images, categories } = response.data.data;

          setClinic(clinic);
          setAllImages(images);
          setFilteredImages(images);

          // Use categories from API response
          const allCategories = ["All", ...categories];
          setCategories(allCategories);

          console.log("Data set successfully:", {
            clinic: clinic.name,
            totalImages: images.length,
            categories: allCategories,
          });
        } else {
          throw new Error("Failed to fetch gallery data");
        }
      } catch (err) {
        console.error("Error fetching gallery data:", err);
        setError(
          `Failed to load gallery: ${
            err.response?.data?.message || err.message
          }`
        );

        // Fallback to empty state
        setClinic({
          name: "Clinic Gallery",
          slug: extractedClinicSlug,
        });
        setAllImages([]);
        setFilteredImages([]);
        setCategories(["All"]);
      } finally {
        setLoading(false);
      }
    };

    if (extractedClinicSlug) {
      fetchGalleryData();
    } else {
      setError("No clinic specified");
      setLoading(false);
    }
  }, [extractedClinicSlug]);

  // Filter images when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredImages(allImages);
    } else {
      const filtered = allImages.filter(
        (image) => image.category === selectedCategory
      );
      setFilteredImages(filtered);
    }
  }, [selectedCategory, allImages]);

  const openLightbox = (index) => {
    setSelectedImage(filteredImages[index]);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction) => {
    let newIndex;
    if (direction === "prev") {
      newIndex =
        lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1;
    } else {
      newIndex =
        lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1;
    }
    setSelectedImage(filteredImages[newIndex]);
    setLightboxIndex(newIndex);
  };

  const handleClinicChange = (newClinicSlug) => {
    navigate(`/gallery/${newClinicSlug}`);
  };

  useSEO(clinic?.name || "Gallery");

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
            <p className="text-sm text-gray-500 mt-2">
              Loading {extractedClinicSlug} gallery
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-red-500">
            <p className="text-lg font-semibold mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-32">
      {/* Clinic Navigation Header */}

      {/* Main Content */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* Clinic Header */}
        <motion.div
          variants={fadeIn("up", "spring", 0.1, 1)}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {clinic?.name || "Clinic Gallery"}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Explore our clinic facilities and environment
          </p>
          <div className="w-24 h-1 bg-green-500 mx-auto"></div>
        </motion.div>

        {/* Category Filters */}
        {categories.length > 1 && (
          <motion.div
            variants={fadeIn("up", "spring", 0.2, 1)}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-green-500 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-sm"
                } border border-gray-200`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <motion.div
            variants={fadeIn("up", "spring", 0.3, 1)}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={fadeIn("up", "spring", index * 0.1, 1)}
                className="group relative overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 bg-white"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Image+Not+Found";
                    }}
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
                    <p className="font-semibold text-sm mb-1 truncate">
                      {image.alt}
                    </p>
                    <span className="text-xs bg-green-500 px-2 py-1 rounded-full inline-block">
                      {image.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={fadeIn("up", "spring", 0.3, 1)}
            className="text-center py-16 bg-white rounded-xl shadow-sm"
          >
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">No images found</p>
            <p className="text-gray-400 text-sm">
              {selectedCategory !== "All"
                ? `No images in "${selectedCategory}" category`
                : "No images available for this clinic"}
            </p>
          </motion.div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0  bg-opacity-95 z-50 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-green-400 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <X size={24} />
            </button>

            <button
              onClick={() => navigateLightbox("prev")}
              className="absolute left-6 text-white hover:text-green-400 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => navigateLightbox("next")}
              className="absolute right-6 text-white hover:text-green-400 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3"
            >
              <ChevronRight size={24} />
            </button>

            <div className="max-w-6xl max-h-full w-full h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center p-4">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/800x600/f3f4f6/9ca3af?text=Image+Not+Found";
                  }}
                />
              </div>

              <div className="bg-black bg-opacity-50 text-white p-4 text-center">
                <p className="text-xl font-semibold mb-1">
                  {selectedImage.alt}
                </p>
                <div className="flex justify-center items-center space-x-4 text-sm text-gray-300">
                  <span className="bg-green-500 px-3 py-1 rounded-full">
                    {selectedImage.category}
                  </span>
                  <span>
                    {lightboxIndex + 1} of {filteredImages.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GalleryPage;
