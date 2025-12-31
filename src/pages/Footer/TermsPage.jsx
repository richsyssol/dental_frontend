import React from "react";
import { useSEO } from "../../hooks/useSEO";

const TermsPage = () => {
  useSEO("terms-and-conditions");

  return (
    <section className="py-16 bg-[#CBFBF1] mt-22">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#00786F] mb-6">
          Terms & Conditions
        </h1>
        <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
          Welcome to{" "}
          <strong>Dr. Joshi's Care & Cure The Dental Wellness Clinic</strong>.
          By booking an appointment or using our services, you agree to the
          following Terms and Conditions. Please read them carefully.
        </p>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8 border border-[#CBFBF1]">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              1. Appointments & Scheduling
            </h2>
            <p className="text-gray-700">
              Patients are encouraged to book appointments in advance. In case
              of emergencies, we will try our best to accommodate you. Please
              arrive on time to ensure smooth treatment flow.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              2. Cancellations & Rescheduling
            </h2>
            <p className="text-gray-700">
              If you need to cancel or reschedule, please inform us at least{" "}
              <strong>24 hours in advance</strong>. Frequent no-shows or
              last-minute cancellations may result in booking restrictions.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              3. Payments & Insurance
            </h2>
            <p className="text-gray-700">
              Payment for services is required at the time of treatment unless
              prior arrangements are made. For insurance claims, you must
              provide accurate information. The clinic is not responsible for
              claim rejections by insurance providers.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              4. Treatment Consent
            </h2>
            <p className="text-gray-700">
              Before starting any treatment, we will explain the procedure,
              risks, and alternatives. By proceeding, you provide{" "}
              <strong>informed consent</strong>. You may withdraw consent at any
              time, but this may affect treatment outcomes.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              5. Patient Responsibilities
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Provide accurate medical and personal information.</li>
              <li>Follow post-treatment care instructions.</li>
              <li>Maintain good oral hygiene between visits.</li>
              <li>Respect clinic staff, doctors, and fellow patients.</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              6. Confidentiality
            </h2>
            <p className="text-gray-700">
              Your medical and personal records are kept confidential as per our{" "}
              <a
                href="/privacy-policy"
                className="text-[#00786F] underline hover:text-[#005c55]"
              >
                Privacy Policy
              </a>
              . Information will only be shared with your consent or as required
              by law.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-700">
              While we ensure high standards of care, results may vary based on
              individual cases. The clinic is not liable for complications
              arising from undisclosed medical conditions or failure to follow
              post-treatment advice.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              8. Policy Updates
            </h2>
            <p className="text-gray-700">
              These Terms & Conditions may be updated from time to time. Please
              check this page for the latest version.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              9. Contact Us
            </h2>
            <p className="text-gray-700">
              For questions regarding these Terms & Conditions, please contact
              us at:
            </p>
            <div className="mt-2 text-gray-800">
              📍 59-60, Howson Rd, near MSEB office, Deolali Camp, Nashik,
              Maharashtra 422401 <br />
              📞 +91 90212 56647 <br />
              📍 203-204, Hari Amantran, Datta Mandir Road, Near Dattamandir,
              Nashik Road, Nashik 422101 <br />
              📞 +91 81490 49104 <br />
              📧 info@drjoshidental.com
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsPage;
