import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/api";
import { useSEO } from "../../hooks/useSEO";

const iconComponents = {
  sterilization: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#0E7C7B"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  ),
  "infection-control": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#0E7C7B"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m4 4h4a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm6-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
      />
    </svg>
  ),
  "safe-environment": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#0E7C7B"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
  "quality-materials": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#0E7C7B"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  "trained-staff": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#0E7C7B"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
  "peace-of-mind": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#0E7C7B"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

const PatientSafetyPage = () => {
  useSEO("patientSafety");
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/patient-safety")
      .then((res) => setSections(res.data))
      .catch((err) =>
        console.error("Error fetching patient safety data:", err)
      );
  }, []);

  // Split sections into first row (3 items) and second row (remaining items)
  const firstRowSections = sections.slice(0, 3);
  const secondRowSections = sections.slice(3);

  return (
    <div className="container mx-auto px-4  mb-30 pt-44">
      <h1 className="text-4xl font-extrabold text-center text-[#0a8583]">
        Patient Safety
      </h1>

      <div className="max-w-8xl mx-auto bg-white rounded-lg  p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          Our Commitment to Your Safety
        </h2>

        <p className="text-lg mb-8 text-gray-700 text-center">
          At Dr. Joshi&apos;s Dental Clinic,{" "}
          <strong>your health and well-being are our highest priority</strong>.
          We follow international standards of sterilization,
          <br /> hygiene, and patient care to ensure every visit is safe,
          comfortable, and stress-free.
        </p>

        {/* First Row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {firstRowSections.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-lg justify-center border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
            >
              {/* Icon Section */}
              <div className="rounded-t-lg flex justify-center">
                <div className="p-4 rounded-full">
                  {iconComponents[item.icon_name] || (
                    <span className="text-gray-400">No Icon</span>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-3 text-[#0E7C7B] text-center">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-center flex-grow">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - 2 cards centered */}
        {secondRowSections.length > 0 && (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {secondRowSections.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg justify-center border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
                >
                  {/* Icon Section */}
                  <div className="rounded-t-lg flex justify-center">
                    <div className="p-4 rounded-full">
                      {iconComponents[item.icon_name] || (
                        <span className="text-gray-400">No Icon</span>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-3 text-[#0E7C7B] text-center">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 text-center flex-grow">
                      {item.description}
                    </p>
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

export default PatientSafetyPage;
