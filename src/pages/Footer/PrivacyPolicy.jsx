import React from "react";
import { useSEO } from "../../hooks/useSEO";

const PrivacyPolicy = () => {
  useSEO("privacy-policy");

  return (
    <section className="py-16 bg-[#CBFBF1] mt-22">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#00786F] mb-6">
          Privacy Policy
        </h1>
        <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
          At <strong>Dr. Joshi's Care & Cure The Dental Wellness Clinic</strong>
          , we value your trust and are committed to safeguarding your personal
          information. This Privacy Policy explains how we collect, use, and
          protect your data.
        </p>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8 border border-[#CBFBF1]">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Personal Information:</strong> Name, contact details,
                date of birth, address.
              </li>
              <li>
                <strong>Health Information:</strong> Medical history, dental
                records, treatment details.
              </li>
              <li>
                <strong>Payment Information:</strong> Billing, insurance, and
                transactions.
              </li>
              <li>
                <strong>Website Data:</strong> Browser type, IP address, and
                cookies.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-2">
              We use your information to provide safe and effective dental care:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Schedule appointments and treatments.</li>
              <li>Maintain accurate dental and health records.</li>
              <li>Send reminders and educational updates (if opted in).</li>
              <li>Process billing and insurance claims.</li>
              <li>Improve our services and website experience.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              3. Data Protection
            </h2>
            <p className="text-gray-700">
              We implement strong safeguards including secure systems,
              restricted access, and trained staff to protect your data against
              unauthorized access or misuse.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              4. Sharing of Information
            </h2>
            <p className="text-gray-700 mb-2">
              Your data will never be sold or rented. We may share information
              only when:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Required by law or government authorities.</li>
              <li>
                Necessary for insurance claims or medical referrals (with your
                consent).
              </li>
              <li>
                Shared with service providers bound by confidentiality
                agreements.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              5. Your Rights
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Request access to your personal data.</li>
              <li>Ask for corrections to inaccurate information.</li>
              <li>Withdraw consent for marketing communication.</li>
              <li>
                Request deletion of your records (where legally possible).
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              6. Website & Cookies
            </h2>
            <p className="text-gray-700">
              Our website may use cookies to enhance your experience. You may
              disable cookies in your browser, but some features may not work
              properly.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              7. Updates to This Policy
            </h2>
            <p className="text-gray-700">
              This Privacy Policy may be updated periodically. Changes will be
              posted on this page with the revised date.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#00786F] mb-3">
              8. Contact Us
            </h2>
            <p className="text-gray-700">
              For questions or concerns, please reach us at:
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

export default PrivacyPolicy;
