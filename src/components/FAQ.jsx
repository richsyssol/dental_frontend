// components/FAQ.jsx
import React from "react";
import { motion } from "framer-motion";

const FAQ = ({ faqs }) => {
  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <h3 className="font-semibold text-blue-700 mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQ;
