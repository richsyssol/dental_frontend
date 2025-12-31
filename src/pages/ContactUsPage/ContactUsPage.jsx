import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  ArrowLeft,
  CheckCircle,
  Loader,
} from "lucide-react";
import { useSEO } from "../../hooks/useSEO";
import axiosInstance from "../../services/api";

// Service options - Can also be dynamic if you have services API
const serviceOptions = [
  "Dental Implants",
  "Cosmetic Dentistry",
  "Root Canal Treatment",
  "Paediatric Dentistry",
  "Teeth Whitening",
  "Periodontics (Gum Treatment)",
  "General Checkup",
  "Emergency Dental Care",
];

const ContactUsPage = () => {
  useSEO("contact");
  const { clinicSlug } = useParams();
  const navigate = useNavigate();

  // State management
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    preferred_service: "",
    preferred_date: "",
    preferred_clinic: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [servicesLoading, setServicesLoading] = useState(false);

  // Fetch clinics and services from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch clinics data
        const clinicsResponse = await axiosInstance.get("/contact-information");

        if (clinicsResponse.data && clinicsResponse.data.length > 0) {
          const clinicsData = clinicsResponse.data;
          setClinics(clinicsData);

          // Initialize selected clinic
          let clinicToSelect = clinicsData[0];

          // Check if clinic was selected from navbar and stored in sessionStorage
          const storedClinic = sessionStorage.getItem("selectedClinic");
          if (storedClinic) {
            try {
              const parsedClinic = JSON.parse(storedClinic);
              const matchedClinic = clinicsData.find(
                (clinic) =>
                  clinic.id === parsedClinic.id ||
                  clinic.slug === parsedClinic.slug ||
                  clinic.name === parsedClinic.name
              );
              if (matchedClinic) {
                clinicToSelect = matchedClinic;
                // Clear the stored selection after using it
                sessionStorage.removeItem("selectedClinic");
              }
            } catch (error) {
              console.error("Error parsing stored clinic:", error);
            }
          }
          // Check URL parameter
          else if (clinicSlug) {
            const clinicBySlug = clinicsData.find(
              (clinic) =>
                clinic.slug === clinicSlug ||
                clinic.id.toString() === clinicSlug
            );
            if (clinicBySlug) {
              clinicToSelect = clinicBySlug;
            }
          }

          setSelectedClinic(clinicToSelect);
          setFormData((prev) => ({
            ...prev,
            preferred_clinic: clinicToSelect.name,
            preferred_service: serviceOptions[0], // Set default service
          }));
        } else {
          throw new Error("No clinics found");
        }

        // Fetch services if you have a separate services API
        await fetchServices();
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load clinics information. Please try again later.");

        // Set default service even if clinics fail to load
        setFormData((prev) => ({
          ...prev,
          preferred_service: serviceOptions[0],
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clinicSlug]);

  // Fetch services from API (if you have a services endpoint)
  const fetchServices = async () => {
    try {
      setServicesLoading(true);

      // For now, using static service options
      setServices(serviceOptions);
    } catch (error) {
      console.error("Error fetching services:", error);
      // Fallback to static service options
      setServices(serviceOptions);
    } finally {
      setServicesLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("sending");
    setError(null);

    // Validate form data
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError("Please fill in all required fields.");
      setSubmitStatus("error");
      return;
    }

    // Phone number validation
    const phoneRegex = /^[0-9+\-\s()]{10,}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      setError("Please enter a valid phone number.");
      setSubmitStatus("error");
      return;
    }

    try {
      const appointmentData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        preferred_service: formData.preferred_service,
        preferred_date: formData.preferred_date,
        preferred_clinic: formData.preferred_clinic,
        message: formData.message.trim(),
        submitted_at: new Date().toISOString(),
        source: "website_contact_form",
      };

      const response = await axiosInstance.post(
        "/book-appointment",
        appointmentData
      );

      if (response.status === 201 || response.status === 200) {
        setSubmitStatus("success");

        // Reset form after successful submission
        setFormData({
          name: "",
          phone: "",
          preferred_service: services[0] || serviceOptions[0],
          preferred_date: "",
          preferred_clinic: selectedClinic?.name || "",
          message: "",
        });

        // Auto reset success status after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        throw new Error("Failed to submit appointment");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");

      if (error.response) {
        if (error.response.status === 422) {
          setError("Please check your form inputs and try again.");
        } else if (error.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("Failed to submit appointment. Please try again.");
        }
      } else if (error.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Handle clinic selection from selector
  const handleClinicSelect = (clinic) => {
    setSelectedClinic(clinic);
    setFormData((prev) => ({
      ...prev,
      preferred_clinic: clinic.name,
    }));
    // Update URL without page reload
    if (clinic.slug) {
      navigate(`/contact/${clinic.slug}`, { replace: true });
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Get minimum date for appointment (today or later)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  if (error && !selectedClinic) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-lg font-semibold mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!selectedClinic && clinics.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No clinics found.</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-4">
      <div className="max-w-6xl mx-auto pt-4 md:pt-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-teal-600 hover:text-teal-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div className="flex items-center">
              <div className="text-red-700 text-sm font-medium">{error}</div>
            </div>
          </motion.div>
        )}

        {/* Clinic Selector */}
        {clinics.length > 0 && selectedClinic && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-white rounded-lg shadow-md p-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Select a Clinic:
            </h2>
            <div className="flex flex-wrap gap-3">
              {clinics.map((clinic) => (
                <button
                  key={clinic.id}
                  onClick={() => handleClinicSelect(clinic)}
                  className={`px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                    selectedClinic.id === clinic.id
                      ? "bg-teal-600 text-white shadow-lg transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-800 hover:shadow-md"
                  }`}
                >
                  {clinic.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Clinic Information */}
          {selectedClinic && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-teal-800 mb-6">
                {selectedClinic.name}
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start">
                  <MapPin
                    className="text-teal-600 mt-1 mr-4 flex-shrink-0"
                    size={22}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">
                      Address
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedClinic.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <Phone
                    className="text-teal-600 mr-4 mt-1 flex-shrink-0"
                    size={22}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">
                      Phone
                    </h3>
                    <div className="text-gray-600 space-y-1">
                      <a
                        href={`tel:${selectedClinic.phone?.replace(/\s/g, "")}`}
                        className="hover:text-teal-600 transition-colors block"
                      >
                        {selectedClinic.phone}
                      </a>
                      {selectedClinic.secondary_phone && (
                        <a
                          href={`tel:${selectedClinic.secondary_phone?.replace(
                            /\s/g,
                            ""
                          )}`}
                          className="hover:text-teal-600 transition-colors block"
                        >
                          {selectedClinic.secondary_phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <Mail
                    className="text-teal-600 mr-4 mt-1 flex-shrink-0"
                    size={22}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">
                      Email
                    </h3>
                    <a
                      href={`mailto:${selectedClinic.email}`}
                      className="text-gray-600 hover:text-teal-600 transition-colors"
                    >
                      {selectedClinic.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start">
                  <Clock
                    className="text-teal-600 mr-4 mt-1 flex-shrink-0"
                    size={22}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">
                      Hours
                    </h3>
                    <p className="text-gray-600">{selectedClinic.hours}</p>
                    {selectedClinic.emergency_hours && (
                      <p className="text-gray-600 text-sm mt-1">
                        Emergency: {selectedClinic.emergency_hours}
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                {selectedClinic.additional_info && (
                  <div className="bg-teal-50 rounded-lg p-4 mt-4">
                    <h3 className="font-semibold text-teal-800 mb-2">
                      Additional Information
                    </h3>
                    <p className="text-teal-700 text-sm">
                      {selectedClinic.additional_info}
                    </p>
                  </div>
                )}
              </div>

              {/* Map */}
              {selectedClinic.map_embed && (
                <div className="mt-8 rounded-lg overflow-hidden border border-gray-200">
                  <iframe
                    src={selectedClinic.map_embed}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Location of ${selectedClinic.name}`}
                    className="w-full"
                  ></iframe>
                </div>
              )}
            </motion.div>
          )}

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-teal-800 mb-6">
              Book an Appointment
            </h2>

            {/* Success Message */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4"
              >
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={24} />
                  <div>
                    <span className="text-green-700 font-semibold block">
                      Appointment request submitted successfully!
                    </span>
                    <span className="text-green-600 text-sm block mt-1">
                      We'll contact you shortly to confirm your appointment.
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  placeholder="Enter your full name"
                  disabled={submitStatus === "sending"}
                />
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  placeholder="Enter your phone number"
                  disabled={submitStatus === "sending"}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Service Selection */}
                <div>
                  <label
                    htmlFor="preferred_service"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Preferred Service
                  </label>
                  <select
                    id="preferred_service"
                    name="preferred_service"
                    value={formData.preferred_service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    disabled={submitStatus === "sending" || servicesLoading}
                  >
                    {servicesLoading ? (
                      <option>Loading services...</option>
                    ) : (
                      services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* Date Selection */}
                <div>
                  <label
                    htmlFor="preferred_date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    id="preferred_date"
                    name="preferred_date"
                    value={formData.preferred_date}
                    onChange={handleChange}
                    min={getMinDate()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    disabled={submitStatus === "sending"}
                  />
                </div>
              </div>

              {/* Clinic Selection in Form */}
              <div>
                <label
                  htmlFor="preferred_clinic"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Preferred Clinic
                </label>
                <select
                  id="preferred_clinic"
                  name="preferred_clinic"
                  value={formData.preferred_clinic}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  disabled={submitStatus === "sending"}
                >
                  <option value="">Select a clinic</option>
                  {clinics.map((clinic) => (
                    <option key={clinic.id} value={clinic.name}>
                      {clinic.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any specific concerns or additional information..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all resize-vertical"
                  disabled={submitStatus === "sending"}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitStatus === "sending"}
                className="w-full bg-teal-600 text-white py-4 px-6 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {submitStatus === "sending" ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 mr-3" />
                    Submitting...
                  </>
                ) : submitStatus === "success" ? (
                  <>
                    <CheckCircle size={20} className="mr-3" />
                    Submitted Successfully
                  </>
                ) : (
                  <>
                    <Calendar size={20} className="mr-3" />
                    Book Appointment
                  </>
                )}
              </button>
            </form>

            {/* Emergency Notice */}
            {selectedClinic && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="font-semibold text-amber-800 mb-2 text-lg">
                  Dental Emergency?
                </h3>
                <p className="text-amber-700 text-sm">
                  For urgent dental issues, please call us directly at{" "}
                  <a
                    href={`tel:${selectedClinic.phone?.replace(/\s/g, "")}`}
                    className="font-semibold hover:text-amber-900 underline"
                  >
                    {selectedClinic.phone}
                  </a>{" "}
                  for immediate assistance.
                  {selectedClinic.emergency_contact && (
                    <span>
                      {" "}
                      Or call our emergency line:{" "}
                      <a
                        href={`tel:${selectedClinic.emergency_contact.replace(
                          /\s/g,
                          ""
                        )}`}
                        className="font-semibold hover:text-amber-900 underline"
                      >
                        {selectedClinic.emergency_contact}
                      </a>
                    </span>
                  )}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Both Clinics Overview */}
        {clinics.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-teal-800 mb-6 text-center">
              Our Clinics
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {clinics.map((clinic) => (
                <div
                  key={clinic.id}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-teal-800 mb-3">
                    {clinic.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{clinic.address}</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center bg-teal-100 text-teal-800 px-3 py-2 rounded-full text-sm hover:bg-teal-200 transition-colors"
                    >
                      <Phone size={14} className="mr-1" />
                      {clinic.phone}
                    </a>
                    <button
                      onClick={() => handleClinicSelect(clinic)}
                      className="inline-flex items-center bg-teal-600 text-white px-3 py-2 rounded-full text-sm hover:bg-teal-700 transition-colors"
                    >
                      <Calendar size={14} className="mr-1" />
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContactUsPage;
