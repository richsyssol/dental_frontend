import React from "react";
import { motion } from "framer-motion";
import { Smile, Award } from "lucide-react";
import { clinicnashikroad11 } from "../../assets";

const teamMembers = [
  {
    name: "Dr. Pushkar Joshi",
    role: "Founder & Senior Dentist",
    image: clinicnashikroad11,
    specialty: "General Dentistry",
  },
  {
    name: "Dr. Chinmay Joshi",
    role: "Cosmetic Dentist",
    image: clinicnashikroad11,
    specialty: "Smile Design",
  },
  {
    name: "Dr. Dipti Joshi",
    role: "Orthodontist",
    image: clinicnashikroad11,
    specialty: "Braces & Aligners",
  },
  {
    name: "Dr. Nikita Joshi",
    role: "Pediatric Dentist",
    image: clinicnashikroad11,
    specialty: "Child Dental Care",
  },
];

const TeamSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-white rounded-2xl p-8 lg:p-20"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-teal-900 mb-2">
          Meet Our Expert Team
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Our highly skilled team blends experience and empathy to ensure your
          smile gets the care it deserves.
        </p>
      </div>

      {/* 1 row with 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-2xl p-6 text-center transition-all duration-300 group bg-white shadow-lg"
          >
            <div className="relative mb-4">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-teal-400 to-teal-600 p-1 group-hover:scale-110 transition-transform duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover border-4 border-white"
                />
              </div>
            </div>

            <h3 className="text-xl font-bold text-teal-900 mb-1">
              {member.name}
            </h3>
            <p className="text-teal-600 font-medium mb-2">{member.role}</p>
            <div className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm mb-3">
              <Award className="w-3 h-3" />
              {member.specialty}
            </div>
            <div className="flex justify-center mt-4">
              <Smile className="w-5 h-5 text-amber-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TeamSection;
