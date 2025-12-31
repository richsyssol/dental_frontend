import React, { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Calendar, CheckCircle } from "lucide-react";
import axiosInstance from "../../services/api";

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

const CTASection = () => {
  const [ctaData, setCtaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    preferred_service: "Dental Implants",
    preferred_date: "",
    preferred_clinic: "",
    message: "",
  });

  // Fetch CTA Data
  useEffect(() => {
    const fetchCtaData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/cta");

        if (response.data.success && response.data.data) {
          const data = Array.isArray(response.data.data)
            ? response.data.data[0]
            : response.data.data;
          setCtaData(data);
          setFormData((prev) => ({
            ...prev,
            preferred_clinic: data.clinic1_name || "Deolali Camp Clinic",
          }));
        } else {
          throw new Error(response.data.message || "Failed to load CTA data");
        }
      } catch (err) {
        console.error("❌ Error fetching CTA data:", err);
        setError(err.message || "Error fetching CTA data");
      } finally {
        setLoading(false);
      }
    };

    fetchCtaData();
  }, []);

  // Format phone
  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10)
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
    return phone;
  };

  // Get today's date
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("sending");
    setError(null);

    try {
      if (!formData.name.trim() || !formData.phone.trim()) {
        throw new Error("Please fill in all required fields");
      }

      const response = await axiosInstance.post("/book-appointment", formData);

      if (response.status === 201 || response.status === 200) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          phone: "",
          preferred_service: "Dental Implants",
          preferred_date: "",
          preferred_clinic: ctaData?.clinic1_name || "Deolali Camp Clinic",
          message: "",
        });

        // Auto reset success status after 3 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 3000);
      } else {
        throw new Error("Failed to book appointment");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");

      if (error.response?.status === 419) {
        setError("Session expired. Please refresh the page.");
      } else if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        const msg = Object.values(errors).flat().join(", ");
        setError(`Please check your form: ${msg}`);
      } else {
        setError(error.message || "An error occurred while submitting.");
      }
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-200 animate-pulse px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-lg text-gray-600">Loading contact info...</h3>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-red-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-red-700 mb-4">
            Failed to load data
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!ctaData) {
    return (
      <section className="py-16 bg-gray-100 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p>No contact information available right now.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`py-16 ${ctaData.background_color} ${ctaData.text_color} px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Left Info Section */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-3xl font-bold mb-6">{ctaData.title}</h2>
          <p className="text-xl mb-6">{ctaData.description}</p>

          {/* Deolali Camp Clinic */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Deolali Camp Clinic</h3>
            <div className="flex items-start mb-3">
              <MapPin className="mr-3 mt-1 flex-shrink-0" size={20} />
              <p>{ctaData.clinic1_address}</p>
            </div>
            <div className="flex items-center mb-3">
              <Phone className="mr-3" size={20} />
              <div className="flex items-center space-x-2">
                <a
                  href={`tel:${ctaData.clinic1_phone1}`}
                  className="hover:underline"
                >
                  {formatPhoneNumber(ctaData.clinic1_phone1)}
                </a>
                {ctaData.clinic1_phone2 && (
                  <>
                    <span>–</span>
                    <a
                      href={`tel:${ctaData.clinic1_phone2}`}
                      className="hover:underline"
                    >
                      {formatPhoneNumber(ctaData.clinic1_phone2)}
                    </a>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="mr-3" size={20} />
              <p>{ctaData.clinic1_hours}</p>
            </div>
          </div>

          {/* Nashik Road Clinic */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Nashik Road Clinic</h3>
            <div className="flex items-start mb-3">
              <MapPin className="mr-3 mt-1 flex-shrink-0" size={20} />
              <p>{ctaData.clinic2_address}</p>
            </div>
            <div className="flex items-center mb-3">
              <Phone className="mr-3" size={20} />
              <div className="flex items-center space-x-2">
                <a
                  href={`tel:${ctaData.clinic2_phone1}`}
                  className="hover:underline"
                >
                  {formatPhoneNumber(ctaData.clinic2_phone1)}
                </a>
                {ctaData.clinic2_phone2 && (
                  <>
                    <span>–</span>
                    <a
                      href={`tel:${ctaData.clinic2_phone2}`}
                      className="hover:underline"
                    >
                      {formatPhoneNumber(ctaData.clinic2_phone2)}
                    </a>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="mr-3" size={20} />
              <p>{ctaData.clinic2_hours}</p>
            </div>
          </div>
        </div>

        {/* Right Appointment Form */}
        <div className="md:w-1/2 md:pl-10">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-teal-800 mb-6">
              Book an Appointment
            </h3>

            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span className="text-green-700 font-semibold">
                    Appointment request submitted successfully!
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 text-gray-700 border border-gray-300 rounded-md"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 text-gray-700 border border-gray-300 rounded-md"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Preferred Service
                </label>
                <select
                  name="preferred_service"
                  value={formData.preferred_service}
                  onChange={handleChange}
                  className="w-full p-3 text-gray-700 border border-gray-300 rounded-md"
                >
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="preferred_date"
                  value={formData.preferred_date}
                  onChange={handleChange}
                  min={getTodayDate()}
                  className="w-full p-3 text-gray-700 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Preferred Clinic
                </label>
                <select
                  name="preferred_clinic"
                  value={formData.preferred_clinic}
                  onChange={handleChange}
                  className="w-full p-3 border text-gray-700 border-gray-300 rounded-md"
                >
                  <option value="Deolali Camp Clinic">
                    Deolali Camp Clinic
                  </option>
                  <option value="Nashik Road Clinic">Nashik Road Clinic</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Any specific concerns..."
                  className="w-full p-3 text-gray-700 border border-gray-300 rounded-md"
                ></textarea>
              </div>

              {error && (
                <p className="text-red-600 text-sm font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitStatus === "sending"}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition flex justify-center items-center disabled:opacity-70"
              >
                {submitStatus === "sending" ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : submitStatus === "success" ? (
                  <>
                    <CheckCircle size={18} className="mr-2" />
                    Submitted Successfully
                  </>
                ) : (
                  <>
                    <Calendar size={18} className="mr-2" />
                    Book Appointment
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
