// components/FAQ.jsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        FAQs About Our Doctors
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="flex justify-between items-center w-full p-4 text-left font-semibold text-blue-800 bg-blue-50 hover:bg-blue-100 transition-colors"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              {activeIndex === index ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {activeIndex === index && (
              <div className="p-4 bg-white text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
