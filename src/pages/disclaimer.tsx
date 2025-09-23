// import React from 'react';
// import Link from 'next/link';
// import { useRouter } from "next/router";
// import { ArrowLeft } from "lucide-react";

// const Disclaimer: React.FC = () => {
//       const router = useRouter();
//       const handleBackClick = () => {
//         router.back();
//       };
      
//   return (
//     <div
//       className="relative min-h-screen w-full bg-gray-100"
//       style={{
//         backgroundImage:` url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <div className="absolute inset-0 bg-white/80 backdrop-blur-md"></div>
      
//         {/* Back Button */}
//             <div className="relative z-20 pt-4 pl-4 sm:pt-6 sm:pl-6 lg:pt-8 lg:pl-8">
//               <button
//                 onClick={handleBackClick}
//                 className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-gray-700 bg-white/90 border border-gray-300 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-200 backdrop-blur-sm"
//               >
//                 <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
//                 Back
//               </button>
//             </div>
            
//       <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="bg-white/95 p-8 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
//           <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
//             Disclaimer
//           </h1>
          
//           <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
//             <p className="text-xl leading-relaxed">
//               TravelQuench Experiences Private Limited ("TravelQuench", "we", "us", or "our") provides travel-related services, including tours, bookings, and information, with the following disclaimers. This Disclaimer outlines the limitations of our liability and responsibilities. By using our website, mobile application, or services, you agree to the terms set forth herein.
//             </p>

//             <section id="scope">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">1. Scope and Applicability</h2>
//               <p>This Disclaimer applies to all interactions with TravelQuench, including website usage, bookings, and participation in our trips or events. It is intended to inform you of the limitations and conditions under which our services are provided.</p>
//             </section>

//             <section id="information-accuracy">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">2. Accuracy of Information</h2>
//               <p>While we strive to provide accurate and up-to-date information on our website and marketing materials, TravelQuench does not guarantee the completeness, reliability, or accuracy of such content. Details regarding itineraries, pricing, availability, and third-party services may change, and we are not liable for any errors or omissions.</p>
//             </section>

//             <section id="liability-limitation">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">3. Limitation of Liability</h2>
//               <p>TravelQuench is not responsible for any direct, indirect, incidental, or consequential damages arising from the use of our services, including but not limited to injuries, losses, delays, or cancellations caused by third-party providers (e.g., airlines, hotels, transport operators) or unforeseen events beyond our control. Our liability is limited to the amount paid for the affected service, where legally permissible.</p>
//             </section>

//             <section id="third-party-services">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">4. Third-Party Services</h2>
//               <p>We act as an intermediary for third-party providers and are not liable for their performance, safety standards, or compliance with local laws. Any issues with third-party services should be addressed directly with the respective provider, and TravelQuench will assist where possible.</p>
//             </section>

//             <section id="user-responsibility">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">5. User Responsibility</h2>
//               <p>You are responsible for ensuring your fitness to travel, obtaining necessary visas, passports, and vaccinations, and complying with local laws and health regulations. TravelQuench is not liable for any penalties, fines, or consequences resulting from your failure to meet these requirements.</p>
//             </section>

//             <section id="force-majeure">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">6. Force Majeure</h2>
//               <p>TravelQuench is not liable for any failure to perform our obligations due to events beyond our control, such as natural disasters, war, strikes, or government actions. In such cases, we will make reasonable efforts to reschedule or provide alternatives, but no additional compensation will be offered.</p>
//             </section>

//             <section id="changes">
//               <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">7. Changes to This Disclaimer</h2>
//               <p>We may update this Disclaimer from time to time to reflect changes in our services or legal requirements. Updates will be posted on our website with the "Last Updated" date revised. Continued use of our services after changes constitutes acceptance of the new Disclaimer.</p>
//             </section>
//           </div>

//           <div className="mt-12 border-t pt-8">
//             <div className="text-center text-gray-600">
//               <p className="mb-2">For any questions about this Disclaimer, please contact us at:</p>
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

// export default Disclaimer;







import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";

const Disclaimer: React.FC = () => {
      const router = useRouter();
      const handleBackClick = () => {
        router.back();
      };
      
  return (
    <div
      className="relative min-h-screen w-full bg-gray-100"
      style={{
        backgroundImage:` url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
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
            Disclaimer
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p className="text-xl leading-relaxed">
              TravelQuench Experiences Private Limited (&ldquo;TravelQuench&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) provides travel-related services, including tours, bookings, and information, with the following disclaimers. This Disclaimer outlines the limitations of our liability and responsibilities. By using our website, mobile application, or services, you agree to the terms set forth herein.
            </p>

            <section id="scope">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">1. Scope and Applicability</h2>
              <p>This Disclaimer applies to all interactions with TravelQuench, including website usage, bookings, and participation in our trips or events. It is intended to inform you of the limitations and conditions under which our services are provided.</p>
            </section>

            <section id="information-accuracy">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">2. Accuracy of Information</h2>
              <p>While we strive to provide accurate and up-to-date information on our website and marketing materials, TravelQuench does not guarantee the completeness, reliability, or accuracy of such content. Details regarding itineraries, pricing, availability, and third-party services may change, and we are not liable for any errors or omissions.</p>
            </section>

            <section id="liability-limitation">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">3. Limitation of Liability</h2>
              <p>TravelQuench is not responsible for any direct, indirect, incidental, or consequential damages arising from the use of our services, including but not limited to injuries, losses, delays, or cancellations caused by third-party providers (e.g., airlines, hotels, transport operators) or unforeseen events beyond our control. Our liability is limited to the amount paid for the affected service, where legally permissible.</p>
            </section>

            <section id="third-party-services">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">4. Third-Party Services</h2>
              <p>We act as an intermediary for third-party providers and are not liable for their performance, safety standards, or compliance with local laws. Any issues with third-party services should be addressed directly with the respective provider, and TravelQuench will assist where possible.</p>
            </section>

            <section id="user-responsibility">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">5. User Responsibility</h2>
              <p>You are responsible for ensuring your fitness to travel, obtaining necessary visas, passports, and vaccinations, and complying with local laws and health regulations. TravelQuench is not liable for any penalties, fines, or consequences resulting from your failure to meet these requirements.</p>
            </section>

            <section id="force-majeure">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">6. Force Majeure</h2>
              <p>TravelQuench is not liable for any failure to perform our obligations due to events beyond our control, such as natural disasters, war, strikes, or government actions. In such cases, we will make reasonable efforts to reschedule or provide alternatives, but no additional compensation will be offered.</p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">7. Changes to This Disclaimer</h2>
              <p>We may update this Disclaimer from time to time to reflect changes in our services or legal requirements. Updates will be posted on our website with the &ldquo;Last Updated&rdquo; date revised. Continued use of our services after changes constitutes acceptance of the new Disclaimer.</p>
            </section>
          </div>

          <div className="mt-12 border-t pt-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">For any questions about this Disclaimer, please contact us at:</p>
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

export default Disclaimer;




