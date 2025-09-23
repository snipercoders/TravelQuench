// import React from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { ArrowLeft } from "lucide-react";

// const PrivacyPolicy: React.FC = () => {
//   const router = useRouter();
//   const handleBackClick = () => {
//     router.back();
//   };

//   return (
//     <div
//       className="relative min-h-screen w-full bg-gray-100"
//       style={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="absolute inset-0 bg-white/80 backdrop-blur-md"></div>
//       {/* Back Button */}
//       <div className="relative z-20 pt-4 pl-4 sm:pt-6 sm:pl-6 lg:pt-8 lg:pl-8">
//         <button
//           onClick={handleBackClick}
//           className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-gray-700 bg-white/90 border border-gray-300 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 backdrop-blur-sm"
//         >
//           <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
//           Back
//         </button>
//       </div>

//       <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="bg-white/95 p-8 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
//           <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
//             Privacy Policy
//           </h1>

//           <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
//             <p className="text-xl leading-relaxed">
//               TravelQuench Experiences Private Limited ("TravelQuench",
//               "Company", "we", "us", "our") values the trust you place in us
//               when you choose our services. This Privacy Policy ("Policy")
//               explains in detail how we collect, use, store, share, and protect
//               your personal data when you engage with our website, mobile
//               application, booking channels (including WhatsApp and email), or
//               otherwise interact with us. This Policy also outlines your rights
//               and choices with respect to your personal data.
//             </p>

//             <section id="scope">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
//                 Scope of this Policy
//               </h2>
//               <p>This Policy applies to:</p>
//               <ul className="list-disc pl-6 space-y-3">
//                 <li>
//                   All customers and travellers, both within India and overseas,
//                   including foreign nationals who book or participate in any
//                   trip, tour, event, or service organised or facilitated by
//                   TravelQuench, whether as individuals, groups, corporate
//                   clients, or otherwise.
//                 </li>
//                 <li>
//                   Website visitors and users who access or interact with our
//                   website, mobile platforms, booking forms, WhatsApp groups,
//                   email communication channels, or any other digital or offline
//                   medium operated by TravelQuench.
//                 </li>
//                 <li>
//                   Prospective clients and leads who provide their data during
//                   enquiries, promotional campaigns, or marketing interactions,
//                   even if no booking is ultimately made.
//                 </li>
//                 <li>
//                   Any other individuals whose personal data is received or
//                   processed by TravelQuench in connection with its services,
//                   including guardians/parents providing information for minors
//                   or nominees providing emergency contact details.
//                 </li>
//               </ul>
//               <p>
//                 By using our services, you acknowledge that you have read and
//                 understood this Policy and consent to the practices described
//                 herein.
//               </p>
//             </section>

//             <section id="definitions">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
//                 1. Definitions
//               </h2>
//               <p>For ease of reference in this Policy:</p>
//               <ul className="list-disc pl-6 space-y-3">
//                 <li>
//                   <strong>"Personal Data"</strong> means any information
//                   relating to an identified or identifiable natural person,
//                   including name, contact details, government identification, or
//                   online identifiers.
//                 </li>
//                 <li>
//                   <strong>"Sensitive Personal Data"</strong> includes
//                   information such as passport numbers, health details,
//                   financial information, or information relating to minors.
//                 </li>
//                 <li>
//                   <strong>"Processing"</strong> means any operation performed on
//                   personal data, including collection, storage, use, disclosure,
//                   or deletion.
//                 </li>
//                 <li>
//                   <strong>"Cookies"</strong> means small text files stored on
//                   your device to recognise repeat users and enhance
//                   functionality.
//                 </li>
//                 <li>
//                   <strong>"Minor"</strong> means an individual under 18 years of
//                   age.
//                 </li>
//               </ul>
//             </section>

//             <section id="collection">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
//                 2. Collection of Personal Data
//               </h2>
//               <p>
//                 We collect personal information that you voluntarily provide
//                 when booking or enquiring about our trips. This may include your
//                 name, email address, phone number, postal address, date of
//                 birth, passport details, visa information, ID proofs, travel
//                 history, payment information, health or medical details (for
//                 adventure trips or travel suitability), dietary preferences, and
//                 emergency contact details.
//               </p>
//               <p>
//                 Data may be collected through various modes, including our
//                 website enquiry forms, Google forms, WhatsApp chats, emails,
//                 phone calls, or through our authorised sales representatives.
//                 For group bookings, we may also collect information about your
//                 co-travellers.
//               </p>
//               <p>
//                 In addition to information directly provided by you, we
//                 automatically collect certain technical data when you browse our
//                 website or digital platforms. This includes your IP address,
//                 browser type, operating system, geolocation (approximate),
//                 device identifiers, session IDs, referral URLs, cookies, and
//                 similar tracking technologies. We deploy tools such as Google
//                 Analytics, Facebook Pixel, Mixpanel, and Google Tag Manager to
//                 understand usage patterns, measure campaign effectiveness, and
//                 improve user experience.
//               </p>
//               <p>
//                 We do not purchase or collect data from third-party brokers or
//                 affiliates. However, leads generated through our enquiry forms
//                 or advertisements may be routed into our CRM systems.
//               </p>
//               <p>
//                 We also acknowledge that while booking international tours, we
//                 may be required to collect sensitive personal data (such as
//                 passport details, visa forms, or health fitness certificates).
//                 Such data shall only be collected where strictly necessary and
//                 with your explicit consent.
//               </p>
//             </section>

//             <section id="categories">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
//                 3. Categories of Data Collected
//               </h2>
//               <p>
//                 While providing travel services, TravelQuench may collect and
//                 process the following categories of personal information from
//                 its clients and website users:
//               </p>
//               <ul className="list-disc pl-6 space-y-3">
//                 <li>
//                   <strong>Contact Information</strong>: including full name,
//                   email address, mobile number, and emergency contact details.
//                 </li>
//                 <li>
//                   <strong>Identity Information</strong>: such as passport
//                   details, government-issued identification, nationality, date
//                   of birth, and gender as required for bookings and regulatory
//                   compliance.
//                 </li>
//                 <li>
//                   <strong>Financial Information</strong>: including billing
//                   address, limited payment details (processed via secure
//                   third-party gateways), and tax-related details where mandated
//                   by law.
//                 </li>
//                 <li>
//                   <strong>Travel & Booking Information</strong>: such as chosen
//                   destination(s), travel preferences, accommodation details,
//                   flight schedules, dietary preferences, co-traveller
//                   information, and booking history.
//                 </li>
//                 <li>
//                   <strong>Health & Medical Information</strong>: limited to
//                   disclosures voluntarily made by clients for the purpose of
//                   facilitating travel, including pre-existing medical
//                   conditions, allergies, and fitness declarations (particularly
//                   in the context of adventure or high-altitude activities).
//                 </li>
//                 <li>
//                   <strong>Children's Information</strong>: in cases where minors
//                   are part of a booking, TravelQuench may collect limited
//                   information (such as name, age, and identity proof) strictly
//                   for booking purposes and always under verified
//                   parental/guardian consent.
//                 </li>
//                 <li>
//                   <strong>Technical & Usage Information</strong>: such as IP
//                   address, device type, browser, cookies, and online identifiers
//                   collected through our website or communication platforms to
//                   improve user experience and enhance security.
//                 </li>
//               </ul>
//               <p>
//                 <strong>Disclaimer</strong>: The categories of personal data
//                 listed above reflect TravelQuench's current data collection
//                 practices. These categories may evolve over time in line with
//                 operational needs, regulatory requirements, or technology
//                 upgrades. Any material changes to the scope of data collected
//                 will be updated in this Privacy Policy and, where legally
//                 required, notified to users.
//               </p>
//             </section>

//             <section id="cookies">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
//                 4. Use of Cookies and Session Data
//               </h2>
//               <p>
//                 TravelQuench's website and digital platforms use cookies,
//                 pixels, tags, and other tracking technologies ("Cookies") to
//                 improve user experience, analyse traffic, personalise content,
//                 and measure the effectiveness of our marketing campaigns.
//                 Cookies are small text files that are placed on your device when
//                 you visit our platforms and enable us to recognise your browser
//                 or device over time.
//               </p>
//               <p>
//                 We use essential cookies that are required for the basic
//                 functionality of our website and booking platform, such as
//                 remembering your session, securing login details, and processing
//                 payments. Performance and analytics cookies, including tools
//                 like Google Analytics and Facebook Pixel, help us measure
//                 website traffic, understand user behaviour, and generate
//                 aggregate reports. Functional cookies allow us to remember user
//                 preferences, such as language settings or saved itineraries,
//                 while marketing and advertising cookies enable us to deliver
//                 relevant promotions and limit the number of times you see a
//                 particular advertisement.
//               </p>
//               <p>
//                 You can manage or disable Cookies through your browser settings;
//                 however, disabling certain Cookies may limit the functionality
//                 and features available on our platforms. By continuing to use
//                 our website without disabling Cookies, you consent to our use of
//                 Cookies in accordance with this Policy.
//               </p>
//               <p>
//                 We may also automatically collect technical details when you
//                 interact with our platforms, including IP address, device
//                 identifiers, operating system, referral URLs, session duration,
//                 clickstream data, and log information. This information is
//                 primarily used for analytics, fraud detection, enhancing website
//                 functionality, and ensuring security of our systems.
//               </p>
//             </section>

//             <section id="purpose">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
//                 5. Purpose and Use of Data
//               </h2>
//               <p>
//                 Your personal data is primarily used to facilitate and manage
//                 your travel bookings, including hotel reservations, airline
//                 tickets, ground transfers, insurance arrangements, and visa
//                 processing. It also enables us to communicate with you regarding
//                 your trip, provide pre-departure assistance, and ensure
//                 operational support during travel.
//               </p>
//               <p>
//                 We further use your data for customer service, after-sales
//                 support, resolving disputes, handling grievances, complying with
//                 legal obligations (such as tax reporting, TCS declarations, and
//                 remittance under RBI's Liberalized Remittance Scheme), and for
//                 internal analytics to improve our offerings.
//               </p>
//               <p>
//                 The lawful bases on which we process your data include: (i) your
//                 consent, (ii) necessity for the performance of a contract with
//                 you, (iii) compliance with legal obligations, and (iv)
//                 legitimate interests such as fraud prevention, service
//                 enhancement, and security of our systems.
//               </p>
//               <p>
//                 With your consent, we may also use your data to send
//                 newsletters, promotional content, personalised trip
//                 recommendations, and marketing communications via email,
//                 WhatsApp, or SMS. You may opt out of such marketing at any time.
//               </p>
//               <p>
//                 We may aggregate and anonymise personal data to analyse trends,
//                 conduct surveys, and develop new services. Such anonymised data
//                 shall not identify you individually.
//               </p>
//             </section>

//             <section id="sharing">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
//                 6. Sharing and Disclosure of Data
//               </h2>
//               <p>
//                 To provide end-to-end travel services, your personal data may be
//                 shared with third-party vendors, including but not limited to:
//                 airlines, hotels, transport operators, insurance providers, visa
//                 consultants, local guides, and destination management companies.
//                 These vendors may be located both within India and
//                 internationally, depending on the destination of your trip.
//               </p>
//               <p>
//                 We ensure that such third parties are bound by confidentiality
//                 obligations and process your data only to the extent required to
//                 deliver their services. However, TravelQuench shall not be
//                 responsible for the misuse or breach of data directly
//                 attributable to third-party vendors.
//               </p>
//               <p>
//                 Where personal data is transferred across borders, TravelQuench
//                 ensures that appropriate safeguards are in place, including
//                 contractual undertakings and compliance with GDPR principles
//                 where applicable, to protect your data in line with
//                 international standards.
//               </p>
//               <p>
//                 We do not sell or rent your data to advertisers or marketing
//                 agencies. Retargeting and campaign analytics are undertaken only
//                 via aggregated and anonymised tracking through Google Ads,
//                 Facebook Pixel, and other ad platforms without directly
//                 disclosing identifiable customer data.
//               </p>
//               <p>
//                 We may disclose your personal information where required by law,
//                 pursuant to valid legal process, to comply with regulatory
//                 authorities, or to protect the safety and integrity of our
//                 operations.
//               </p>
//             </section>

//             <section id="storage">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
//                 7. Storage, Retention, and Security
//               </h2>
//               <p>
//                 Your data is stored securely in cloud-based servers and CRM
//                 systems managed by our technical team. Access to such data is
//                 strictly limited to authorised personnel from the marketing,
//                 technology, and operations teams, each of whom is bound by
//                 internal confidentiality undertakings.
//               </p>
//               <p>
//                 We implement technical and organisational safeguards, such as
//                 password-protected systems, role-based access controls,
//                 encryption protocols, session tracking, intrusion monitoring,
//                 and secure API logging.
//               </p>
//               <p>
//                 We retain personal data for as long as is necessary to fulfil
//                 the purposes for which it was collected or longer if required
//                 under applicable laws. Typically, data may be retained from the
//                 date of booking until the conclusion of the client relationship
//                 and, in some cases, for statutory record-keeping or audit
//                 purposes.
//               </p>
//               <p>
//                 While we take all reasonable precautions to secure your data, no
//                 system is entirely immune from cyber threats. In the event of a
//                 data breach, TravelQuench shall promptly investigate, mitigate,
//                 and notify affected individuals and regulatory authorities in
//                 accordance with applicable laws, including the Digital Personal
//                 Data Protection Act, 2023, and GDPR where applicable.
//               </p>
//             </section>

//             <section id="rights">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
//                 8. User Rights and Choices
//               </h2>
//               <p>
//                 You have the right to review, correct, or request deletion of
//                 your personal data maintained by us. Requests may be made via
//                 our official support channels, and we will process them subject
//                 to reasonable verification of your identity.
//               </p>
//               <p>
//                 You may withdraw your consent for marketing communications by
//                 clicking "unsubscribe" in our emails or by writing to us.
//                 However, you may continue to receive essential service
//                 communications regarding your bookings.
//               </p>
//               <p>
//                 In addition, where GDPR applies, you have the right to: (i)
//                 restrict processing of your personal data, (ii) request
//                 portability of your data in a machine-readable format, and (iii)
//                 object to automated decision-making that has a significant
//                 impact on you.
//               </p>
//               <p>
//                 If you wish to restrict or object to the processing of your data
//                 in certain circumstances (for example, in respect of sensitive
//                 health information), TravelQuench will review such requests in
//                 line with operational feasibility and legal obligations.
//               </p>
//               <p>
//                 We do not knowingly collect personal data from children below
//                 the age of 18 without parental/guardian consent. For minors,
//                 parental consent is verified, and such data is subject to
//                 stricter access controls. If you are a parent or guardian and
//                 believe that your child has provided personal data without your
//                 consent, please contact us so that we may take corrective
//                 measures.
//               </p>
//             </section>

//             <section id="overseas">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
//                 9. Protection of Data of Overseas Clients
//               </h2>
//               <p>
//                 TravelQuench values the trust of its overseas clients and is
//                 committed to safeguarding their personal data in accordance with
//                 applicable laws. As an Indian entity, TravelQuench primarily
//                 complies with the provisions of the Digital Personal Data
//                 Protection Act, 2023. However, where our services are availed by
//                 individuals residing outside India, TravelQuench shall extend
//                 equivalent safeguards consistent with international best
//                 practices, including principles of transparency, purpose
//                 limitation, and data minimisation.
//               </p>
//               <p>
//                 Personal information of overseas users shall be collected and
//                 processed solely for the purpose of providing travel services
//                 and shall not be disclosed to third parties except where
//                 necessary for fulfilling bookings (such as to airlines, hotels,
//                 ground handlers, or insurers) or where disclosure is mandated by
//                 law. Where stricter data protection standards, such as the
//                 European Union's General Data Protection Regulation (GDPR), are
//                 applicable, TravelQuench shall adopt measures in line with such
//                 frameworks, including enhanced rights for users relating to
//                 access, rectification, and deletion of their personal data.
//               </p>
//             </section>

//             <section id="media">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
//                 10. Use of Images, Testimonials, and Media
//               </h2>
//               <p>
//                 During our trips, photographs or videos may be captured by
//                 TravelQuench's team or authorised representatives for
//                 operational or promotional purposes. By participating in our
//                 trips, you consent to the reasonable use of such media by
//                 TravelQuench for marketing, website display, or social media
//                 purposes.
//               </p>
//               <p>
//                 Should you wish to opt out of having your identifiable images
//                 used, you may notify us in writing prior to the commencement of
//                 travel.
//               </p>
//             </section>

//             <section id="compliance">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
//                 11. Compliance with Law
//               </h2>
//               <p>
//                 TravelQuench complies with applicable data protection and
//                 privacy laws in India, including but not limited to the Digital
//                 Personal Data Protection Act, 2023, and the Information
//                 Technology Act, 2000, along with the rules made thereunder.
//               </p>
//               <p>
//                 By engaging our services, you consent to your data being
//                 processed in accordance with these legal frameworks and this
//                 Privacy Policy. For overseas users, TravelQuench also complies
//                 with GDPR to the extent applicable.
//               </p>
//             </section>

//             <section id="changes">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
//                 12. Changes to this Policy
//               </h2>
//               <p>
//                 We may update or amend this Policy from time to time to reflect
//                 changes in technology, business operations, or legal
//                 requirements. All updates will be published on our website with
//                 the "Last Updated" date revised accordingly. We encourage you to
//                 review this Policy periodically.
//               </p>
//             </section>
//           </div>

//           <div className="mt-12 border-t pt-8">
//             <div className="text-center text-gray-600">
//               <p className="mb-2">
//                 For any questions about this Privacy Policy, please contact us
//                 at:
//               </p>
//               <p>
//                 <a
//                   href="mailto:support@travelquench.com"
//                   className="text-blue-600 hover:text-blue-500"
//                 >
//                   support@travelquench.com
//                 </a>
//               </p>
//               <p className="mt-4">
//                 Return to{" "}
//                 <Link
//                   href="/"
//                   className="text-blue-600 hover:text-blue-500 font-medium"
//                 >
//                   Home
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrivacyPolicy;







import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy: React.FC = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  return (
    <div
      className="relative min-h-screen w-full bg-gray-100"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md"></div>
      {/* Back Button */}
      <div className="relative z-20 pt-4 pl-4 sm:pt-6 sm:pl-6 lg:pt-8 lg:pl-8">
        <button
          onClick={handleBackClick}
          className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-gray-700 bg-white/90 border border-gray-300 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          Back
        </button>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/95 p-8 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p className="text-xl leading-relaxed">
              TravelQuench Experiences Private Limited (&ldquo;TravelQuench&rdquo;,
              &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) values the trust you place in us
              when you choose our services. This Privacy Policy (&ldquo;Policy&rdquo;)
              explains in detail how we collect, use, store, share, and protect
              your personal data when you engage with our website, mobile
              application, booking channels (including WhatsApp and email), or
              otherwise interact with us. This Policy also outlines your rights
              and choices with respect to your personal data.
            </p>

            <section id="scope">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                Scope of this Policy
              </h2>
              <p>This Policy applies to:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  All customers and travellers, both within India and overseas,
                  including foreign nationals who book or participate in any
                  trip, tour, event, or service organised or facilitated by
                  TravelQuench, whether as individuals, groups, corporate
                  clients, or otherwise.
                </li>
                <li>
                  Website visitors and users who access or interact with our
                  website, mobile platforms, booking forms, WhatsApp groups,
                  email communication channels, or any other digital or offline
                  medium operated by TravelQuench.
                </li>
                <li>
                  Prospective clients and leads who provide their data during
                  enquiries, promotional campaigns, or marketing interactions,
                  even if no booking is ultimately made.
                </li>
                <li>
                  Any other individuals whose personal data is received or
                  processed by TravelQuench in connection with its services,
                  including guardians/parents providing information for minors
                  or nominees providing emergency contact details.
                </li>
              </ul>
              <p>
                By using our services, you acknowledge that you have read and
                understood this Policy and consent to the practices described
                herein.
              </p>
            </section>

            <section id="definitions">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                1. Definitions
              </h2>
              <p>For ease of reference in this Policy:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>&ldquo;Personal Data&rdquo;</strong> means any information
                  relating to an identified or identifiable natural person,
                  including name, contact details, government identification, or
                  online identifiers.
                </li>
                <li>
                  <strong>&ldquo;Sensitive Personal Data&rdquo;</strong> includes
                  information such as passport numbers, health details,
                  financial information, or information relating to minors.
                </li>
                <li>
                  <strong>&ldquo;Processing&rdquo;</strong> means any operation performed on
                  personal data, including collection, storage, use, disclosure,
                  or deletion.
                </li>
                <li>
                  <strong>&ldquo;Cookies&rdquo;</strong> means small text files stored on
                  your device to recognise repeat users and enhance
                  functionality.
                </li>
                <li>
                  <strong>&ldquo;Minor&rdquo;</strong> means an individual under 18 years of
                  age.
                </li>
              </ul>
            </section>

            <section id="collection">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                2. Collection of Personal Data
              </h2>
              <p>
                We collect personal information that you voluntarily provide
                when booking or enquiring about our trips. This may include your
                name, email address, phone number, postal address, date of
                birth, passport details, visa information, ID proofs, travel
                history, payment information, health or medical details (for
                adventure trips or travel suitability), dietary preferences, and
                emergency contact details.
              </p>
              <p>
                Data may be collected through various modes, including our
                website enquiry forms, Google forms, WhatsApp chats, emails,
                phone calls, or through our authorised sales representatives.
                For group bookings, we may also collect information about your
                co-travellers.
              </p>
              <p>
                In addition to information directly provided by you, we
                automatically collect certain technical data when you browse our
                website or digital platforms. This includes your IP address,
                browser type, operating system, geolocation (approximate),
                device identifiers, session IDs, referral URLs, cookies, and
                similar tracking technologies. We deploy tools such as Google
                Analytics, Facebook Pixel, Mixpanel, and Google Tag Manager to
                understand usage patterns, measure campaign effectiveness, and
                improve user experience.
              </p>
              <p>
                We do not purchase or collect data from third-party brokers or
                affiliates. However, leads generated through our enquiry forms
                or advertisements may be routed into our CRM systems.
              </p>
              <p>
                We also acknowledge that while booking international tours, we
                may be required to collect sensitive personal data (such as
                passport details, visa forms, or health fitness certificates).
                Such data shall only be collected where strictly necessary and
                with your explicit consent.
              </p>
            </section>

            <section id="categories">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                3. Categories of Data Collected
              </h2>
              <p>
                While providing travel services, TravelQuench may collect and
                process the following categories of personal information from
                its clients and website users:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>Contact Information</strong>: including full name,
                  email address, mobile number, and emergency contact details.
                </li>
                <li>
                  <strong>Identity Information</strong>: such as passport
                  details, government-issued identification, nationality, date
                  of birth, and gender as required for bookings and regulatory
                  compliance.
                </li>
                <li>
                  <strong>Financial Information</strong>: including billing
                  address, limited payment details (processed via secure
                  third-party gateways), and tax-related details where mandated
                  by law.
                </li>
                <li>
                  <strong>Travel & Booking Information</strong>: such as chosen
                  destination(s), travel preferences, accommodation details,
                  flight schedules, dietary preferences, co-traveller
                  information, and booking history.
                </li>
                <li>
                  <strong>Health & Medical Information</strong>: limited to
                  disclosures voluntarily made by clients for the purpose of
                  facilitating travel, including pre-existing medical
                  conditions, allergies, and fitness declarations (particularly
                  in the context of adventure or high-altitude activities).
                </li>
                <li>
                  <strong>Children&rsquo;s Information</strong>: in cases where minors
                  are part of a booking, TravelQuench may collect limited
                  information (such as name, age, and identity proof) strictly
                  for booking purposes and always under verified
                  parental/guardian consent.
                </li>
                <li>
                  <strong>Technical & Usage Information</strong>: such as IP
                  address, device type, browser, cookies, and online identifiers
                  collected through our website or communication platforms to
                  improve user experience and enhance security.
                </li>
              </ul>
              <p>
                <strong>Disclaimer</strong>: The categories of personal data
                listed above reflect TravelQuench&rsquo;s current data collection
                practices. These categories may evolve over time in line with
                operational needs, regulatory requirements, or technology
                upgrades. Any material changes to the scope of data collected
                will be updated in this Privacy Policy and, where legally
                required, notified to users.
              </p>
            </section>

            <section id="cookies">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                4. Use of Cookies and Session Data
              </h2>
              <p>
                TravelQuench&rsquo;s website and digital platforms use cookies,
                pixels, tags, and other tracking technologies (&ldquo;Cookies&rdquo;) to
                improve user experience, analyse traffic, personalise content,
                and measure the effectiveness of our marketing campaigns.
                Cookies are small text files that are placed on your device when
                you visit our platforms and enable us to recognise your browser
                or device over time.
              </p>
              <p>
                We use essential cookies that are required for the basic
                functionality of our website and booking platform, such as
                remembering your session, securing login details, and processing
                payments. Performance and analytics cookies, including tools
                like Google Analytics and Facebook Pixel, help us measure
                website traffic, understand user behaviour, and generate
                aggregate reports. Functional cookies allow us to remember user
                preferences, such as language settings or saved itineraries,
                while marketing and advertising cookies enable us to deliver
                relevant promotions and limit the number of times you see a
                particular advertisement.
              </p>
              <p>
                You can manage or disable Cookies through your browser settings;
                however, disabling certain Cookies may limit the functionality
                and features available on our platforms. By continuing to use
                our website without disabling Cookies, you consent to our use of
                Cookies in accordance with this Policy.
              </p>
              <p>
                We may also automatically collect technical details when you
                interact with our platforms, including IP address, device
                identifiers, operating system, referral URLs, session duration,
                clickstream data, and log information. This information is
                primarily used for analytics, fraud detection, enhancing website
                functionality, and ensuring security of our systems.
              </p>
            </section>

            <section id="purpose">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                5. Purpose and Use of Data
              </h2>
              <p>
                Your personal data is primarily used to facilitate and manage
                your travel bookings, including hotel reservations, airline
                tickets, ground transfers, insurance arrangements, and visa
                processing. It also enables us to communicate with you regarding
                your trip, provide pre-departure assistance, and ensure
                operational support during travel.
              </p>
              <p>
                We further use your data for customer service, after-sales
                support, resolving disputes, handling grievances, complying with
                legal obligations (such as tax reporting, TCS declarations, and
                remittance under RBI&rsquo;s Liberalized Remittance Scheme), and for
                internal analytics to improve our offerings.
              </p>
              <p>
                The lawful bases on which we process your data include: (i) your
                consent, (ii) necessity for the performance of a contract with
                you, (iii) compliance with legal obligations, and (iv)
                legitimate interests such as fraud prevention, service
                enhancement, and security of our systems.
              </p>
              <p>
                With your consent, we may also use your data to send
                newsletters, promotional content, personalised trip
                recommendations, and marketing communications via email,
                WhatsApp, or SMS. You may opt out of such marketing at any time.
              </p>
              <p>
                We may aggregate and anonymise personal data to analyse trends,
                conduct surveys, and develop new services. Such anonymised data
                shall not identify you individually.
              </p>
            </section>

            <section id="sharing">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                6. Sharing and Disclosure of Data
              </h2>
              <p>
                To provide end-to-end travel services, your personal data may be
                shared with third-party vendors, including but not limited to:
                airlines, hotels, transport operators, insurance providers, visa
                consultants, local guides, and destination management companies.
                These vendors may be located both within India and
                internationally, depending on the destination of your trip.
              </p>
              <p>
                We ensure that such third parties are bound by confidentiality
                obligations and process your data only to the extent required to
                deliver their services. However, TravelQuench shall not be
                responsible for the misuse or breach of data directly
                attributable to third-party vendors.
              </p>
              <p>
                Where personal data is transferred across borders, TravelQuench
                ensures that appropriate safeguards are in place, including
                contractual undertakings and compliance with GDPR principles
                where applicable, to protect your data in line with
                international standards.
              </p>
              <p>
                We do not sell or rent your data to advertisers or marketing
                agencies. Retargeting and campaign analytics are undertaken only
                via aggregated and anonymised tracking through Google Ads,
                Facebook Pixel, and other ad platforms without directly
                disclosing identifiable customer data.
              </p>
              <p>
                We may disclose your personal information where required by law,
                pursuant to valid legal process, to comply with regulatory
                authorities, or to protect the safety and integrity of our
                operations.
              </p>
            </section>

            <section id="storage">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                7. Storage, Retention, and Security
              </h2>
              <p>
                Your data is stored securely in cloud-based servers and CRM
                systems managed by our technical team. Access to such data is
                strictly limited to authorised personnel from the marketing,
                technology, and operations teams, each of whom is bound by
                internal confidentiality undertakings.
              </p>
              <p>
                We implement technical and organisational safeguards, such as
                password-protected systems, role-based access controls,
                encryption protocols, session tracking, intrusion monitoring,
                and secure API logging.
              </p>
              <p>
                We retain personal data for as long as is necessary to fulfil
                the purposes for which it was collected or longer if required
                under applicable laws. Typically, data may be retained from the
                date of booking until the conclusion of the client relationship
                and, in some cases, for statutory record-keeping or audit
                purposes.
              </p>
              <p>
                While we take all reasonable precautions to secure your data, no
                system is entirely immune from cyber threats. In the event of a
                data breach, TravelQuench shall promptly investigate, mitigate,
                and notify affected individuals and regulatory authorities in
                accordance with applicable laws, including the Digital Personal
                Data Protection Act, 2023, and GDPR where applicable.
              </p>
            </section>

            <section id="rights">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                8. User Rights and Choices
              </h2>
              <p>
                You have the right to review, correct, or request deletion of
                your personal data maintained by us. Requests may be made via
                our official support channels, and we will process them subject
                to reasonable verification of your identity.
              </p>
              <p>
                You may withdraw your consent for marketing communications by
                clicking &ldquo;unsubscribe&rdquo; in our emails or by writing to us.
                However, you may continue to receive essential service
                communications regarding your bookings.
              </p>
              <p>
                In addition, where GDPR applies, you have the right to: (i)
                restrict processing of your personal data, (ii) request
                portability of your data in a machine-readable format, and (iii)
                object to automated decision-making that has a significant
                impact on you.
              </p>
              <p>
                If you wish to restrict or object to the processing of your data
                in certain circumstances (for example, in respect of sensitive
                health information), TravelQuench will review such requests in
                line with operational feasibility and legal obligations.
              </p>
              <p>
                We do not knowingly collect personal data from children below
                the age of 18 without parental/guardian consent. For minors,
                parental consent is verified, and such data is subject to
                stricter access controls. If you are a parent or guardian and
                believe that your child has provided personal data without your
                consent, please contact us so that we may take corrective
                measures.
              </p>
            </section>

            <section id="overseas">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                9. Protection of Data of Overseas Clients
              </h2>
              <p>
                TravelQuench values the trust of its overseas clients and is
                committed to safeguarding their personal data in accordance with
                applicable laws. As an Indian entity, TravelQuench primarily
                complies with the provisions of the Digital Personal Data
                Protection Act, 2023. However, where our services are availed by
                individuals residing outside India, TravelQuench shall extend
                equivalent safeguards consistent with international best
                practices, including principles of transparency, purpose
                limitation, and data minimisation.
              </p>
              <p>
                Personal information of overseas users shall be collected and
                processed solely for the purpose of providing travel services
                and shall not be disclosed to third parties except where
                necessary for fulfilling bookings (such as to airlines, hotels,
                ground handlers, or insurers) or where disclosure is mandated by
                law. Where stricter data protection standards, such as the
                European Union&rsquo;s General Data Protection Regulation (GDPR), are
                applicable, TravelQuench shall adopt measures in line with such
                frameworks, including enhanced rights for users relating to
                access, rectification, and deletion of their personal data.
              </p>
            </section>

            <section id="media">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                10. Use of Images, Testimonials, and Media
              </h2>
              <p>
                During our trips, photographs or videos may be captured by
                TravelQuench&rsquo;s team or authorised representatives for
                operational or promotional purposes. By participating in our
                trips, you consent to the reasonable use of such media by
                TravelQuench for marketing, website display, or social media
                purposes.
              </p>
              <p>
                Should you wish to opt out of having your identifiable images
                used, you may notify us in writing prior to the commencement of
                travel.
              </p>
            </section>

            <section id="compliance">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                11. Compliance with Law
              </h2>
              <p>
                TravelQuench complies with applicable data protection and
                privacy laws in India, including but not limited to the Digital
                Personal Data Protection Act, 2023, and the Information
                Technology Act, 2000, along with the rules made thereunder.
              </p>
              <p>
                By engaging our services, you consent to your data being
                processed in accordance with these legal frameworks and this
                Privacy Policy. For overseas users, TravelQuench also complies
                with GDPR to the extent applicable.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                12. Changes to this Policy
              </h2>
              <p>
                We may update or amend this Policy from time to time to reflect
                changes in technology, business operations, or legal
                requirements. All updates will be published on our website with
                the &ldquo;Last Updated&rdquo; date revised accordingly. We encourage you to
                review this Policy periodically.
              </p>
            </section>
          </div>

          <div className="mt-12 border-t pt-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">
                For any questions about this Privacy Policy, please contact us
                at:
              </p>
              <p>
                <a
                  href="mailto:support@travelquench.com"
                  className="text-blue-600 hover:text-blue-500"
                >
                  support@travelquench.com
                </a>
              </p>
              <p className="mt-4">
                Return to{" "}
                <Link
                  href="/"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Home
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;