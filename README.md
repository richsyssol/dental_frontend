import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Calendar, ArrowLeft } from "lucide-react";
import { useSEO } from "../../hooks/useSEO";
import axiosInstance from "../../services/api";

// Service options
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
const [clinics, setClinics] = useState([]);
const [selectedClinic, setSelectedClinic] = useState(null);
const [formData, setFormData] = useState({
name: "",
phone: "",
preferred_service: "Dental Implants",
preferred_date: "",
preferred_clinic: "",
message: "",
});
const [submitStatus, setSubmitStatus] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Fetch clinics from API
useEffect(() => {
const fetchClinics = async () => {
try {
setLoading(true);
setError(null);

        const response = await axiosInstance.get("/contact-information");
        const data = response.data;

        setClinics(data);

        // Set initial selected clinic
        if (clinicSlug) {
          const clinic = data.find((c) => c.slug === clinicSlug);
          if (clinic) {
            setSelectedClinic(clinic);
            setFormData((prev) => ({ ...prev, preferred_clinic: clinic.name }));
          } else if (data.length > 0) {
            // Fallback to first clinic if slug not found
            setSelectedClinic(data[0]);
            setFormData((prev) => ({
              ...prev,
              preferred_clinic: data[0].name,
            }));
          }
        } else if (data.length > 0) {
          setSelectedClinic(data[0]);
          setFormData((prev) => ({ ...prev, preferred_clinic: data[0].name }));
        }
      } catch (error) {
        console.error("Error fetching clinics:", error);
        setError("Failed to load clinics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();

}, [clinicSlug]);

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();
setSubmitStatus("sending");
setError(null);

    try {
      // Validate required fields
      if (
        !formData.name.trim() ||
        !formData.phone.trim() ||
        !formData.preferred_clinic.trim()
      ) {
        throw new Error("Please fill in all required fields");
      }

      const response = await axiosInstance.post("/book-appointment", formData);

      if (response.status === 201) {
        setSubmitStatus("success");
        // Reset form but keep selected clinic
        setFormData({
          name: "",
          phone: "",
          preferred_service: "Dental Implants",
          preferred_date: "",
          preferred_clinic: selectedClinic?.name || "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");

      if (error.response) {
        // Server responded with error status
        if (error.response.status === 419) {
          setError("Session expired. Please refresh the page and try again.");
        } else if (error.response.status === 422) {
          const errors = error.response.data.errors;
          const errorMessage = Object.values(errors).flat().join(", ");
          setError(`Please check your form: ${errorMessage}`);
        } else if (error.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("Failed to submit appointment. Please try again.");
        }
      } else if (error.request) {
        // Request was made but no response received
        setError("Network error. Please check your connection and try again.");
      } else {
        // Something else happened
        setError(
          error.message || "An unexpected error occurred. Please try again."
        );
      }
    }

};

// Get today's date in YYYY-MM-DD format for min date
const getTodayDate = () => {
const today = new Date();
return today.toISOString().split("T")[0];
};

if (loading) {
return (

<div className="min-h-screen pt-32 pb-16 px-4 flex items-center justify-center">
<div className="text-center">
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
<p className="mt-4 text-gray-600">Loading clinics...</p>
</div>
</div>
);
}

if (error && !selectedClinic) {
return (

<div className="min-h-screen pt-32 pb-16 px-4 flex items-center justify-center">
<div className="text-center max-w-md">
<div className="text-red-500 text-lg font-semibold mb-4">{error}</div>
<button
onClick={() => window.location.reload()}
className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors" >
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
<p className="text-gray-600">No clinics found.</p>
</div>
</div>
);
}

return (

<div className="min-h-screen pt-32 pb-16 px-4">
<div className="max-w-6xl mx-auto pt-4 md:pt-10">
{/_ Back Button _/}
<button
onClick={() => navigate(-1)}
className="flex items-center text-teal-600 hover:text-teal-800 mb-6" >
<ArrowLeft size={20} className="mr-2" />
Back
</button>

        {/* Error Alert */}
        {error && submitStatus !== "sending" && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-red-600 font-semibold">{error}</div>
            </div>
          </div>
        )}

        {/* Clinic Selector - Only show if we have clinics and a selected clinic */}
        {clinics.length > 0 && selectedClinic && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Select a Clinic:
            </h2>
            <div className="flex flex-wrap gap-3">
              {clinics.map((clinic) => (
                <button
                  key={clinic.id}
                  onClick={() => {
                    navigate(`/contact/${clinic.slug}`);
                    setSelectedClinic(clinic);
                    setFormData((prev) => ({
                      ...prev,
                      preferred_clinic: clinic.name,
                    }));
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
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
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Clinic Information - Only show if we have a selected clinic */}
          {selectedClinic && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-teal-800 mb-4">
                {selectedClinic.name}
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin
                    className="text-teal-600 mt-1 mr-3 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600">{selectedClinic.address}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="text-teal-600 mr-3" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <div className="text-gray-600">
                      <a
                        href={`tel:${selectedClinic.phone?.replace(/\s/g, "")}`}
                        className="hover:text-teal-600"
                      >
                        {selectedClinic.phone}
                      </a>
                      {selectedClinic.secondary_phone && (
                        <>
                          <span className="mx-2">/</span>
                          <a
                            href={`tel:${selectedClinic.secondary_phone?.replace(
                              /\s/g,
                              ""
                            )}`}
                            className="hover:text-teal-600"
                          >
                            {selectedClinic.secondary_phone}
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="text-teal-600 mr-3" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a
                      href={`mailto:${selectedClinic.email}`}
                      className="text-gray-600 hover:text-teal-600"
                    >
                      {selectedClinic.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="text-teal-600 mr-3" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-800">Hours</h3>
                    <p className="text-gray-600">{selectedClinic.hours}</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-6 rounded-lg overflow-hidden">
                <iframe
                  src={selectedClinic.map_embed}
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Location of ${selectedClinic.name}`}
                ></iframe>
              </div>
            </motion.div>
          )}

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-2xl font-bold text-teal-800 mb-4">
              Book an Appointment
            </h2>

            {submitStatus === "success" ? (
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                <div className="text-teal-600 font-semibold mb-2">
                  Thank you for your appointment request!
                </div>
                <p className="text-teal-700">
                  We'll get back to you as soon as possible to confirm your
                  appointment.
                </p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="preferred_service"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Preferred Service
                    </label>
                    <select
                      id="preferred_service"
                      name="preferred_service"
                      value={formData.preferred_service}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      {serviceOptions.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="preferred_date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="preferred_date"
                      name="preferred_date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      min={getTodayDate()}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="preferred_clinic"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Preferred Clinic *
                  </label>
                  <select
                    id="preferred_clinic"
                    name="preferred_clinic"
                    value={formData.preferred_clinic}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">Select a clinic</option>
                    {clinics.map((clinic) => (
                      <option key={clinic.id} value={clinic.name}>
                        {clinic.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === "sending"}
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitStatus === "sending" ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Calendar size={18} className="mr-2" />
                      Book Appointment
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Emergency Notice */}
            {selectedClinic && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h3 className="font-semibold text-amber-800 mb-2">
                  Dental Emergency?
                </h3>
                <p className="text-amber-700 text-sm">
                  For urgent dental issues, please call us directly at{" "}
                  <a
                    href={`tel:${selectedClinic.phone?.replace(/\s/g, "")}`}
                    className="font-semibold hover:text-amber-900"
                  >
                    {selectedClinic.phone}
                  </a>{" "}
                  for immediate assistance.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Both Clinics Overview */}
        {clinics.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-teal-800 mb-6 text-center">
              Our Clinics
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {clinics.map((clinic) => (
                <div
                  key={clinic.id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h3 className="text-xl font-semibold text-teal-800 mb-3">
                    {clinic.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{clinic.address}</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm hover:bg-teal-200 transition-colors"
                    >
                      <Phone size={14} className="mr-1" />
                      {clinic.phone}
                    </a>
                    <button
                      onClick={() => {
                        navigate(`/contact/${clinic.slug}`);
                        setSelectedClinic(clinic);
                        setFormData((prev) => ({
                          ...prev,
                          preferred_clinic: clinic.name,
                        }));
                      }}
                      className="inline-flex items-center bg-teal-600 text-white px-3 py-1 rounded-full text-sm hover:bg-teal-700 transition-colors"
                    >
                      <Calendar size={14} className="mr-1" />
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

);
};

export default ContactUsPage;
#   d e n t a l _ f r o n t e n d  
 