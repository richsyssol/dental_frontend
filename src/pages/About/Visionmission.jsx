import React from "react";
import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

const MissionVisionSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className=""
    >
      {/* Mission */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="relative bg-gradient-to-br from-teal-100 via-white to-teal-50 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-300 opacity-10 rounded-full blur-3xl"></div>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-teal-600 text-white rounded-full shadow-lg">
            <Target className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-bold text-teal-900 tracking-tight">
            Our Mission
          </h2>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our mission is to provide{" "}
          <span className="text-teal-700 font-semibold">
            compassionate, comprehensive, and advanced dental care
          </span>{" "}
          for every patient. We believe in crafting smiles that inspire
          confidence and enhance overall wellness, using the latest technologies
          and a gentle touch.
        </p>
      </motion.div>

      {/* Vision */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="relative bg-gradient-to-br from-teal-100 via-white to-teal-50 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-400 opacity-10 rounded-full blur-3xl"></div>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-teal-600 text-white rounded-full shadow-lg">
            <Eye className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-bold text-teal-900 tracking-tight">
            Our Vision
          </h2>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          We envision a community that smiles with confidence — built on trust,
          care, and innovation. Our goal is to be recognized as Nashik’s most
          trusted dental wellness center, delivering excellence that goes beyond
          treatment — creating lasting relationships and healthy smiles for
          life.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MissionVisionSection;
