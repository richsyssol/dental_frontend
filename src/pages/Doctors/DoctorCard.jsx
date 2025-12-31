// components/DoctorCard.jsx
import React, { useState } from "react";
import { Calendar, MessageCircle, Phone, X } from "lucide-react";

const DoctorCard = ({ doctor, onBookAppointment }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative h-64 overflow-hidden">
          <img
            src={doctor.image}
            alt={doctor.alt}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
            <p className="text-blue-200 text-sm">{doctor.title}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
              {doctor.experience}
            </div>
          </div>

          <p className="text-gray-600 mb-4">{doctor.description}</p>

          <div className="mb-4">
            <h4 className="font-semibold text-blue-800 mb-2">
              Specialization:
            </h4>
            <p className="text-gray-700">{doctor.specialization}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {doctor.achievements.slice(0, 2).map((achievement, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {achievement}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={toggleModal}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <MessageCircle size={16} className="mr-2" />
              View Profile
            </button>
            <button
              onClick={() => onBookAppointment(doctor)}
              className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <Calendar size={16} className="mr-2" />
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Doctor Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-blue-800">
                {doctor.name} - Full Profile
              </h3>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="md:w-1/3">
                  <img
                    src={doctor.image}
                    alt={doctor.alt}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">
                    {doctor.title}
                  </h4>
                  <p className="text-gray-600 mb-4">{doctor.experience}</p>
                  <p className="text-gray-700 mb-4">{doctor.description}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        toggleModal();
                        onBookAppointment(doctor);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                    >
                      <Calendar size={16} className="mr-2" />
                      Book Appointment
                    </button>
                    <a
                      href={`tel:${doctor.phone}`}
                      className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                    >
                      <Phone size={16} className="mr-2" />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">
                  Specialization
                </h4>
                <p className="text-gray-700">{doctor.specialization}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">
                  Key Achievements
                </h4>
                <ul className="space-y-2">
                  {doctor.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-blue-800 mb-3">
                  Key Services
                </h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.seoKeywords.split(", ").map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorCard;
