// pages/Treatments/DentalImplants.jsx
import React from "react";
import { motion } from "framer-motion";
import { useSEO } from "../../hooks/useSEO";
import ClinicInfo from "../../components/ClinicInfo";
import FAQ from "../../components/FAQ";

const DentalImplants = () => {
  useSEO("dentalImplants");

  const faqs = [
    {
      question: "Are dental implants painful?",
      answer:
        "No. The procedure is done under local anesthesia, and most patients report minimal discomfort. Mild soreness post-surgery is normal and manageable with medication.",
    },
    {
      question: "How long do dental implants last?",
      answer:
        "With good oral hygiene and regular checkups, dental implants can last 20+ years or even a lifetime.",
    },
    {
      question: "What is the cost of dental implants in Nashik?",
      answer:
        "The cost varies based on the number of implants, type of restoration, and bone health. We provide a detailed quote after your consultation.",
    },
    {
      question: "Can anyone get dental implants?",
      answer:
        "Most healthy adults are candidates. We'll assess your jawbone density and overall health during your initial visit.",
    },
  ];

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section with Image */}
      <motion.div
        className="relative mb-8 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <img
          src="/images/treatments/dental-implants-hero.jpg"
          alt="Dental implants at Dr. Joshi's Care & Cure Dental in Nashik"
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <motion.h1
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Dental Implants in Nashik – Permanent, Natural-Looking Tooth
              Replacement
            </motion.h1>
          </div>
        </div>
      </motion.div>

      <motion.p
        className="text-lg text-gray-700 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Are you missing one or more teeth? At Dr. Joshi's Care & Cure Dental, we
        offer high-quality dental implants in Nashik that restore both function
        and aesthetics — just like natural teeth. With 22+ years of experience
        and over 7,500+ successful implant procedures, we are proud to be one of
        the most trusted choices for tooth replacement in Nashik. Whether you're
        dealing with a single missing tooth or need full-mouth rehabilitation,
        our dental implant specialists provide safe, durable, and pain-free
        solutions tailored to your needs.
      </motion.p>

      <motion.div
        className="space-y-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* What Are Dental Implants Section */}
        <section className="bg-blue-50 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/3">
              <img
                src="/images/treatments/implant-diagram.jpg"
                alt="Diagram showing dental implant structure with crown, abutment and post"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                What Are Dental Implants?
              </h2>
              <p className="text-gray-700 mb-4">
                A dental implant is a titanium screw that acts as an artificial
                tooth root, placed into the jawbone to support a crown, bridge,
                or denture. It fuses with your bone (osseointegration) to
                provide a stable and long-lasting solution. :cite[1]:cite[5]
              </p>
              <p className="text-gray-700 font-semibold">
                Dental implants are ideal for patients who:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 ml-4">
                <li>Have one or more missing teeth :cite[1]</li>
                <li>Have a jawbone that's reached full growth :cite[1]</li>
                <li>Want to avoid removable dentures :cite[1]</li>
                <li>Desire a permanent, natural-feeling restoration</li>
                <li>Have healthy oral tissues :cite[1]</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section>
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Benefits of Choosing Dental Implants at Our Nashik Clinic
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
              <img
                src="/images/treatments/natural-smile.jpg"
                alt="Patient showing natural-looking dental implant smile"
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <div className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✅</span>
                <span>
                  Look, feel, and function like natural teeth :cite[5]
                </span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
              <img
                src="/images/treatments/bone-preservation.jpg"
                alt="X-ray showing jawbone preservation with dental implants"
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <div className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✅</span>
                <span>Prevent bone loss and facial sagging :cite[10]</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
              <img
                src="/images/treatments/healthy-teeth.jpg"
                alt="Close-up of dental implant without affecting adjacent teeth"
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <div className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✅</span>
                <span>No impact on neighboring teeth :cite[5]</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
              <img
                src="/images/treatments/long-lasting.jpg"
                alt="Senior patient with healthy dental implants"
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <div className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✅</span>
                <span>
                  Long-lasting (often 20+ years with proper care) :cite[5]
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Dental Implants */}
        <section>
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Types of Dental Implants We Offer in Nashik
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border border-blue-200">
              <img
                src="/images/treatments/single-implant.jpg"
                alt="Single tooth dental implant replacement"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                Single Tooth Implants
              </h3>
              <p className="text-gray-700">
                Perfect for replacing a single missing tooth without affecting
                surrounding teeth. The titanium post serves as an artificial
                tooth root. :cite[6]
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border border-blue-200">
              <img
                src="/images/treatments/all-on-4-implants.jpg"
                alt="All-on-4 full arch dental implants"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                All-on-4 / All-on-6 Implants
              </h3>
              <p className="text-gray-700">
                Full arch replacement using just 4 or 6 strategically placed
                implants. Ideal for patients missing most or all teeth. :cite[6]
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border border-blue-200">
              <img
                src="/images/treatments/implant-dentures.jpg"
                alt="Implant-supported dentures and bridges"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                Implant-Supported Bridges & Dentures
              </h3>
              <p className="text-gray-700">
                Stable and comfortable alternative to traditional removable
                dentures. Provides better chewing function and bone
                preservation. :cite[1]
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border border-blue-200">
              <img
                src="/images/treatments/same-day-implants.jpg"
                alt="Same day dental implant procedure"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                Immediate Load / Same-Day Implants
              </h3>
              <p className="text-gray-700">
                In select cases, we can place a temporary crown on the implant
                the same day. Get your smile back faster with advanced
                technology. :cite[6]
              </p>
            </div>
          </div>
        </section>

        {/* Procedure Timeline */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Our Dental Implant Procedure – Step-by-Step
          </h2>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform md:-translate-x-1/2"></div>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-blue-700">
                    Consultation & 3D Scanning
                  </h3>
                  <p className="text-gray-600">
                    Bone assessment and smile planning
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center z-10">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                  <img
                    src="/images/treatments/consultation-scan.jpg"
                    alt="Dental consultation and 3D scanning process"
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0 order-3 md:order-1">
                  <img
                    src="/images/treatments/implant-placement.jpg"
                    alt="Dental implant placement procedure"
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center z-10 order-2">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0 order-1 md:order-3">
                  <h3 className="text-xl font-semibold text-blue-700">
                    Implant Placement
                  </h3>
                  <p className="text-gray-600">
                    Performed under local anesthesia with minimal discomfort
                    :cite[5]
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-blue-700">
                    Healing & Osseointegration
                  </h3>
                  <p className="text-gray-600">
                    Typically 3–6 months for bone fusion :cite[1]:cite[9]
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center z-10">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                  <img
                    src="/images/treatments/healing-process.jpg"
                    alt="Osseointegration healing process diagram"
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 md:text-right mb-4 md:mb-0 order-3 md:order-1">
                  <img
                    src="/images/treatments/final-crown.jpg"
                    alt="Final crown placement on dental implant"
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center z-10 order-2">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0 order-1 md:order-3">
                  <h3 className="text-xl font-semibold text-blue-700">
                    Crown Placement
                  </h3>
                  <p className="text-gray-600">
                    A custom-designed crown, bridge, or denture is placed
                    :cite[1]
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mt-6 text-center">
            We use advanced imaging, guided surgery, and biocompatible materials
            for the best results. The entire process typically takes 3-9 months
            depending on individual healing. :cite[9]
          </p>
        </section>

        {/* Why Choose Us Section */}
        <section>
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Why Patients Choose Dr. Joshi's Care & Cure Dental for Dental
            Implants in Nashik
          </h2>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="/images/treatments/clinic-environment.jpg"
              alt="Modern dental clinic environment at Dr. Joshi's Care & Cure Dental"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-3">⭐</span>
                  <span>22+ years of experience in implant dentistry</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-3">⭐</span>
                  <span>7,500+ implants successfully placed</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-3">⭐</span>
                  <span>
                    Use of top implant brands (Nobel Biocare, Straumann, etc.)
                    :cite[2]
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-3">⭐</span>
                  <span>Minimal pain, faster healing techniques :cite[6]</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-3">⭐</span>
                  <span>Personalized treatment plans</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-3">⭐</span>
                  <span>Full transparency on cost, time, and care</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </motion.div>

      <FAQ faqs={faqs} />
      <ClinicInfo />
    </motion.div>
  );
};

export default DentalImplants;
