// pages/Treatments/RootCanal.jsx
import React from "react";
import { motion } from "framer-motion";
import { useSEO } from "../../hooks/useSEO";
import ClinicInfo from "../../components/ClinicInfo";
import FAQ from "../../components/FAQ";

const RootCanal = () => {
  useSEO("rootCanal");

  const faqs = [
    {
      question: "Is root canal treatment painful?",
      answer:
        "Not at all. With advanced anesthesia and rotary technology, the procedure is almost completely painless. Most patients report feeling only mild pressure during the treatment.",
    },
    {
      question: "How long does a root canal procedure take?",
      answer:
        "In many cases, a root canal can be completed in a single visit of 45–90 minutes. Complex cases or infected teeth may require 2 visits.",
    },
    {
      question: "Do I need a crown after root canal?",
      answer:
        "In most cases, yes. A crown is placed to protect the treated tooth from fractures and restore full function.",
    },
    {
      question: "How much does a root canal cost in Nashik?",
      answer:
        "The cost depends on the tooth's position (front or molar), the extent of infection, and whether a crown is required. We provide complete clarity and affordability in all our treatments.",
    },
  ];

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-blue-800 mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Painless Root Canal Treatment in Nashik – Save Your Natural Tooth
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        If you're suffering from persistent tooth pain, swelling, or sensitivity
        to hot and cold, you might need a root canal treatment. At Dr. Joshi's
        Care & Cure Dental, we specialize in painless root canal treatment in
        Nashik, using the latest tools and techniques to eliminate infection,
        preserve your natural tooth, and restore your comfort — all in just 1 or
        2 visits. Our experienced endodontists provide advanced care using
        rotary endodontics, digital X-rays, and single-visit root canal methods
        for quick recovery and lasting results.
      </motion.p>

      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <section>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            What Is a Root Canal Treatment?
          </h2>
          <p className="text-gray-700 mb-4">
            A root canal is a dental procedure used to treat infection or
            inflammation in the pulp (inner nerve) of a tooth. The goal is to
            clean the infected area, disinfect the root canals, and seal the
            tooth to prevent reinfection — helping you keep your natural tooth
            instead of removing it.
          </p>
          <p className="text-gray-700 font-semibold">
            Root canal is required when you experience:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2 ml-4">
            <li>Severe toothache while chewing or at night</li>
            <li>Sensitivity to hot or cold foods</li>
            <li>Swelling or tenderness in nearby gums</li>
            <li>A cracked or decayed tooth</li>
            <li>Darkening of the tooth</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Benefits of Root Canal Treatment at Our Nashik Clinic
          </h2>
          <ul className="grid md:grid-cols-2 gap-3">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✅</span>
              <span>Pain relief from infected or damaged teeth</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✅</span>
              <span>Prevents spread of infection</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✅</span>
              <span>Saves your natural tooth</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✅</span>
              <span>Affordable and long-lasting solution</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✅</span>
              <span>Faster healing with rotary tools</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✅</span>
              <span>Single-visit treatment in many cases</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            How We Perform Root Canal Treatment
          </h2>
          <p className="text-gray-700 mb-4">
            At Dr. Joshi's Care & Cure Dental, your comfort is our top priority.
            Our root canal process includes:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li className="font-semibold">Digital Diagnosis</li>
            <p className="text-gray-600 ml-6 mb-3">
              Painless X-rays and scans to locate the infection
            </p>

            <li className="font-semibold">Local Anesthesia</li>
            <p className="text-gray-600 ml-6 mb-3">
              Ensures completely pain-free treatment
            </p>

            <li className="font-semibold">Pulp Removal</li>
            <p className="text-gray-600 ml-6 mb-3">
              Cleaning out infected pulp and nerves using rotary tools
            </p>

            <li className="font-semibold">Disinfection</li>
            <p className="text-gray-600 ml-6 mb-3">
              Sealing the canals with biocompatible materials
            </p>

            <li className="font-semibold">Restoration</li>
            <p className="text-gray-600 ml-6">
              Placing a crown or filling to strengthen the tooth
            </p>
          </ol>
          <p className="text-gray-700 mt-4">
            Depending on the condition, it may be done in one or two visits.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Why Choose Us for Root Canal Treatment in Nashik?
          </h2>
          <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
            <li>Over 4,000 successful root canal cases</li>
            <li>Expert endodontists with 19+ years of experience</li>
            <li>Use of rotary endodontic for precision and speed</li>
            <li>Digital X-rays for accurate and low-radiation diagnosis</li>
            <li>Single-visit options available</li>
            <li>Minimal pain and fast recovery</li>
            <li>Personalized care in a hygienic, comfortable setup</li>
          </ul>
        </section>
      </motion.div>

      <FAQ faqs={faqs} />
      <ClinicInfo />
    </motion.div>
  );
};

export default RootCanal;
