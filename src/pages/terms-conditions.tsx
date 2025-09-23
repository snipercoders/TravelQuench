// import React from 'react';
// import Link from 'next/link';
// import { useRouter } from "next/router";
// import { ArrowLeft } from "lucide-react";



// const TermsAndConditions: React.FC = () => {
//           const router = useRouter();
//           const handleBackClick = () => {
//             router.back();
//           };
          
//   return (
//     <div
//       className="relative min-h-screen w-full bg-gray-100"
//       style={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <div className="absolute inset-0 bg-white/80 backdrop-blur-md"></div>
      

//            {/* Back Button */}
//                   <div className="relative z-20 pt-4 pl-4 sm:pt-6 sm:pl-6 lg:pt-8 lg:pl-8">
//                     <button
//                       onClick={handleBackClick}
//                       className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-gray-700 bg-white/90 border border-gray-300 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 backdrop-blur-sm"
//                     >
//                       <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
//                       Back
//                     </button>
//                   </div>
//       <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="bg-white/95 p-8 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
//           <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
//             Terms and Conditions
//           </h1>
          
//           <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
//             <p className="text-xl leading-relaxed">
//               Welcome to TravelQuench Experiences Private Limited ("TravelQuench", "we", "us", or "our"). These Terms and Conditions ("Terms") govern your use of our website, mobile application, and services related to travel bookings, tours, and experiences. By booking with us or using our services, you agree to be bound by these Terms. Please read them carefully.
//             </p>

//             <section id="scope">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">1. Scope and Acceptance</h2>
//               <p>These Terms apply to all bookings, services, and interactions with TravelQuench, including but not limited to trips, tours, events, and related services. By making a booking or using our services, you confirm that you are at least 18 years old, have the legal capacity to enter into a contract, and accept these Terms on behalf of yourself and any party included in your booking.</p>
//             </section>

//             <section id="booking">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">2. Booking and Confirmation</h2>
//               <p>All bookings are subject to availability and confirmation by TravelQuench. A booking is considered confirmed only upon receipt of a deposit or full payment and issuance of a confirmation invoice. You must provide accurate information, including passport details and contact information, to complete your booking.</p>
//             </section>

//             <section id="payment">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">3. Payment Terms</h2>
//               <p>A non-refundable deposit of 25% of the total trip cost is required to secure your booking, with the balance due 45 days prior to departure. Payments can be made via secure online gateways or bank transfer. Late payments may result in cancellation of your booking, and additional fees may apply.</p>
//             </section>

//             <section id="cancellations">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">4. Cancellations and Refunds</h2>
//               <p>Cancellations must be made in writing. Refunds are subject to the following schedule: 100% refund if cancelled more than 60 days before departure (minus the deposit); 50% refund if cancelled 30-60 days before departure; no refund if cancelled less than 30 days before departure. Travel insurance is recommended to cover cancellations.</p>
//             </section>

//             <section id="changes">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">5. Changes and Amendments</h2>
//               <p>TravelQuench reserves the right to modify itineraries, accommodations, or services due to unforeseen circumstances (e.g., weather, political instability). We will notify you of significant changes and offer alternatives where possible. Additional costs for changes requested by you may apply.</p>
//             </section>

//             <section id="liability">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">6. Liability</h2>
//               <p>TravelQuench acts as an intermediary and is not liable for losses, injuries, delays, or damages caused by third-party providers (e.g., airlines, hotels) or unforeseen events beyond our control. Participants are responsible for their own travel insurance and compliance with local laws and health requirements.</p>
//             </section>

//             <section id="conduct">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">7. Participant Conduct</h2>
//               <p>Participants must follow the instructions of TravelQuench guides and respect local customs and laws. Disruptive behavior may result in removal from the trip without refund. TravelQuench is not responsible for any consequences arising from such conduct.</p>
//             </section>

//             <section id="force-majeure">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">8. Force Majeure</h2>
//               <p>TravelQuench shall not be liable for failure to perform obligations due to events beyond our control, including natural disasters, war, strikes, or government actions. In such cases, we will work to reschedule or refund where feasible, subject to third-party policies.</p>
//             </section>

//             <section id="governing-law">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">9. Governing Law</h2>
//               <p>These Terms are governed by the laws of India. Any disputes will be resolved in the courts of [City, State], India. You agree to submit to the exclusive jurisdiction of these courts.</p>
//             </section>

//             <section id="changes-to-terms">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">10. Changes to These Terms</h2>
//               <p>We may update these Terms periodically to reflect changes in our services or legal requirements. Updates will be posted on our website with the "Last Updated" date revised. Continued use of our services after changes constitutes acceptance of the new Terms.</p>
//             </section>
//           </div>

//           <div className="mt-12 border-t pt-8">
//             <div className="text-center text-gray-600">
//               <p className="mb-2">For any questions about these Terms and Conditions, please contact us at:</p>
//               <p><a href="mailto:support@travelquench.com" className="text-blue-600 hover:text-blue-500">support@travelquench.com</a></p>
//               <p className="mt-4">
//                 Return to{' '}
//                 <Link href="/" className="text-blue-600 hover:text-blue-500 font-medium">
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

// export default TermsAndConditions;









import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";



const TermsAndConditions: React.FC = () => {
          const router = useRouter();
          const handleBackClick = () => {
            router.back();
          };
          
  return (
    <div
      className="relative min-h-screen w-full bg-gray-100"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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
            Terms and Conditions
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p className="text-xl leading-relaxed">
              Welcome to TravelQuench Experiences Private Limited (&ldquo;TravelQuench&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of our website, mobile application, and services related to travel bookings, tours, and experiences. By booking with us or using our services, you agree to be bound by these Terms. Please read them carefully.
            </p>

            <section id="scope">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">1. Scope and Acceptance</h2>
              <p>These Terms apply to all bookings, services, and interactions with TravelQuench, including but not limited to trips, tours, events, and related services. By making a booking or using our services, you confirm that you are at least 18 years old, have the legal capacity to enter into a contract, and accept these Terms on behalf of yourself and any party included in your booking.</p>
            </section>

            <section id="booking">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">2. Booking and Confirmation</h2>
              <p>All bookings are subject to availability and confirmation by TravelQuench. A booking is considered confirmed only upon receipt of a deposit or full payment and issuance of a confirmation invoice. You must provide accurate information, including passport details and contact information, to complete your booking.</p>
            </section>

            <section id="payment">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">3. Payment Terms</h2>
              <p>A non-refundable deposit of 25% of the total trip cost is required to secure your booking, with the balance due 45 days prior to departure. Payments can be made via secure online gateways or bank transfer. Late payments may result in cancellation of your booking, and additional fees may apply.</p>
            </section>

            <section id="cancellations">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">4. Cancellations and Refunds</h2>
              <p>Cancellations must be made in writing. Refunds are subject to the following schedule: 100% refund if cancelled more than 60 days before departure (minus the deposit); 50% refund if cancelled 30-60 days before departure; no refund if cancelled less than 30 days before departure. Travel insurance is recommended to cover cancellations.</p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">5. Changes and Amendments</h2>
              <p>TravelQuench reserves the right to modify itineraries, accommodations, or services due to unforeseen circumstances (e.g., weather, political instability). We will notify you of significant changes and offer alternatives where possible. Additional costs for changes requested by you may apply.</p>
            </section>

            <section id="liability">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">6. Liability</h2>
              <p>TravelQuench acts as an intermediary and is not liable for losses, injuries, delays, or damages caused by third-party providers (e.g., airlines, hotels) or unforeseen events beyond our control. Participants are responsible for their own travel insurance and compliance with local laws and health requirements.</p>
            </section>

            <section id="conduct">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">7. Participant Conduct</h2>
              <p>Participants must follow the instructions of TravelQuench guides and respect local customs and laws. Disruptive behavior may result in removal from the trip without refund. TravelQuench is not responsible for any consequences arising from such conduct.</p>
            </section>

            <section id="force-majeure">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">8. Force Majeure</h2>
              <p>TravelQuench shall not be liable for failure to perform obligations due to events beyond our control, including natural disasters, war, strikes, or government actions. In such cases, we will work to reschedule or refund where feasible, subject to third-party policies.</p>
            </section>

            <section id="governing-law">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">9. Governing Law</h2>
              <p>These Terms are governed by the laws of India. Any disputes will be resolved in the courts of [City, State], India. You agree to submit to the exclusive jurisdiction of these courts.</p>
            </section>

            <section id="changes-to-terms">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">10. Changes to These Terms</h2>
              <p>We may update these Terms periodically to reflect changes in our services or legal requirements. Updates will be posted on our website with the &ldquo;Last Updated&rdquo; date revised. Continued use of our services after changes constitutes acceptance of the new Terms.</p>
            </section>
          </div>

          <div className="mt-12 border-t pt-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">For any questions about these Terms and Conditions, please contact us at:</p>
              <p><a href="mailto:support@travelquench.com" className="text-blue-600 hover:text-blue-500">support@travelquench.com</a></p>
              <p className="mt-4">
                Return to{' '}
                <Link href="/" className="text-blue-600 hover:text-blue-500 font-medium">
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

export default TermsAndConditions;
