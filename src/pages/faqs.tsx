// import React from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { ArrowLeft } from 'lucide-react';

// const FAQ: React.FC = () => {
//   const router = useRouter();

//   const handleBackClick = () => {
//     router.back();
//   };

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
      
//       <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
//         <div className="bg-white/95 p-4 sm:p-6 lg:p-8 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
//           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
//             Frequently Asked Questions
//           </h1>
          
//           <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-700 space-y-6 sm:space-y-8">
//             <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
//               Welcome to the FAQ page of TravelQuench Experiences Private Limited. Below are answers to some of the most common questions our customers ask. If you need further assistance, please contact us.
//             </p>

//             <section id="general">
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 sm:mt-10 mb-3 sm:mb-4">General Questions</h2>
//               <div className="space-y-4 sm:space-y-6">
//                 <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
//                   <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">What types of trips does TravelQuench offer?</summary>
//                   <p className="mt-2 text-sm sm:text-base text-gray-600">TravelQuench offers a variety of trips, including adventure tours, cultural experiences, family vacations, and customized group travel. Check our Tours page for the latest offerings.</p>
//                 </details>
//                 <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
//                   <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">How do I know if a trip is suitable for me?</summary>
//                   <p className="mt-2 text-sm sm:text-base text-gray-600">Each trip includes a difficulty level and requirements (e.g., fitness, age restrictions). Review the trip details on our website or contact us for personalized advice.</p>
//                 </details>
//               </div>
//             </section>

//             <section id="booking">
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 sm:mt-10 mb-3 sm:mb-4">Booking and Reservations</h2>
//               <div className="space-y-4 sm:space-y-6">
//                 <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
//                   <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">How do I book a trip with TravelQuench?</summary>
//                   <p className="mt-2 text-sm sm:text-base text-gray-600">You can book online via our Bookings page, call our support team, or email us at <a href="mailto:support@travelquench.com" className="text-blue-600 hover:text-blue-500 break-all">support@travelquench.com</a>. A deposit is required to secure your spot.</p>
//                 </details>
//                 <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
//                   <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">Can I book for a group?</summary>
//                   <p className="mt-2 text-sm sm:text-base text-gray-600">Yes, we offer group booking options. Contact us directly with your group size and preferences, and we'll create a tailored package for you.</p>
//                 </details>
//               </div>
//             </section>

//             <section id="payment">
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 sm:mt-10 mb-3 sm:mb-4">Payments</h2>
//               <div className="space-y-4 sm:space-y-6">
//                 <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
//                   <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">What payment methods do you accept?</summary>
//                   <p className="mt-2 text-sm sm:text-base text-gray-600">We accept credit/debit cards, bank transfers, and secure online payment gateways. Full payment details are provided during the booking process.</p>
//                 </details>
//                 <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
//                   <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">When do I need to pay the balance?</summary>
//                   <p className="mt-2 text-sm sm:text-base text-gray-600">The balance is due 45 days before departure. Late payments may result in cancellation, subject to our Cancellation Policy.</p>
//                 </details>
//               </div>
//             </section>

//             <section id="cancellation">
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 sm:mt-10 mb-3 sm:mb-4">Cancellations and Refunds</h2>
//               <div className="space-y-4 sm:space-y-6">
//                 <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
//                   <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">Can I cancel my booking?</summary>
//                   <p className="mt-2 text-sm sm:text-base text-gray-600">Yes, cancellations are allowed but subject to our Cancellation Policy. Submit a written request to <a href="mailto:support@travelquench.com" className="text-blue-600 hover:text-blue-500 break-all">support@travelquench.com</a> for processing.</p>
//                 </details>
//                 <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
//                   <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">What is the refund policy?</summary>
//                   <p className="mt-2 text-sm sm:text-base text-gray-600">Refunds depend on the cancellation timing: 75% if cancelled more than 60 days before departure, 50% between 30-60 days, and no refund within 30 days. See our Cancellation Policy for details.</p>
//                 </details>
//               </div>
//             </section>

//             <section id="travel">
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 sm:mt-10 mb-3 sm:mb-4">Travel Requirements</h2>
//               <div className="space-y-4 sm:space-y-6">
//                 <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
//                   <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">Do I need a visa for my trip?</summary>
//                   <p className="mt-2 text-sm sm:text-base text-gray-600">Visa requirements vary by destination. Check the trip details or consult our team for assistance with visa information.</p>
//                 </details>
//                 <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
//                   <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">What should I pack for a trip?</summary>
//                   <p className="mt-2 text-sm sm:text-base text-gray-600">Packing lists are provided in your trip confirmation email, tailored to the destination and activities. Essentials include valid ID, travel insurance, and weather-appropriate clothing.</p>
//                 </details>
//               </div>
//             </section>

//             <section id="support">
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 sm:mt-10 mb-3 sm:mb-4">Customer Support</h2>
//               <div className="space-y-4 sm:space-y-6">
//                 <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
//                   <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">How can I contact customer support?</summary>
//                   <p className="mt-2 text-sm sm:text-base text-gray-600">Reach us via email at <a href="mailto:support@travelquench.com" className="text-blue-600 hover:text-blue-500 break-all">support@travelquench.com</a> or through our Contact page. We're available Monday to Friday, 9 AM to 6 PM IST.</p>
//                 </details>
//                 <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
//                   <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">What if I have an issue during my trip?</summary>
//                   <p className="mt-2 text-sm sm:text-base text-gray-600">Contact our on-trip support team using the emergency number provided in your travel documents. We'll assist you promptly.</p>
//                 </details>
//               </div>
//             </section>
//           </div>

//           <div className="mt-8 sm:mt-12 border-t pt-6 sm:pt-8">
//             <div className="text-center text-gray-600">
//               <p className="mb-2 text-sm sm:text-base">For further assistance, please contact us at:</p>
//               <p className="text-sm sm:text-base"><a href="mailto:support@travelquench.com" className="text-blue-600 hover:text-blue-500 break-all">support@travelquench.com</a></p>
//               <p className="mt-4 text-sm sm:text-base">
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

// export default FAQ;






import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';

const FAQ: React.FC = () => {
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
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="bg-white/95 p-4 sm:p-6 lg:p-8 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Frequently Asked Questions
          </h1>
          
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-700 space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
              Welcome to the FAQ page of TravelQuench Experiences Private Limited. Below are answers to some of the most common questions our customers ask. If you need further assistance, please contact us.
            </p>

            <section id="general">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 sm:mt-10 mb-3 sm:mb-4">General Questions</h2>
              <div className="space-y-4 sm:space-y-6">
                <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">What types of trips does TravelQuench offer?</summary>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">TravelQuench offers a variety of trips, including adventure tours, cultural experiences, family vacations, and customized group travel. Check our Tours page for the latest offerings.</p>
                </details>
                <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">How do I know if a trip is suitable for me?</summary>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">Each trip includes a difficulty level and requirements (e.g., fitness, age restrictions). Review the trip details on our website or contact us for personalized advice.</p>
                </details>
              </div>
            </section>

            <section id="booking">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 sm:mt-10 mb-3 sm:mb-4">Booking and Reservations</h2>
              <div className="space-y-4 sm:space-y-6">
                <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">How do I book a trip with TravelQuench?</summary>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">You can book online via our Bookings page, call our support team, or email us at <a href="mailto:support@travelquench.com" className="text-blue-600 hover:text-blue-500 break-all">support@travelquench.com</a>. A deposit is required to secure your spot.</p>
                </details>
                <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">Can I book for a group?</summary>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">Yes, we offer group booking options. Contact us directly with your group size and preferences, and we&apos;ll create a tailored package for you.</p>
                </details>
              </div>
            </section>

            <section id="payment">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 sm:mt-10 mb-3 sm:mb-4">Payments</h2>
              <div className="space-y-4 sm:space-y-6">
                <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">What payment methods do you accept?</summary>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">We accept credit/debit cards, bank transfers, and secure online payment gateways. Full payment details are provided during the booking process.</p>
                </details>
                <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">When do I need to pay the balance?</summary>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">The balance is due 45 days before departure. Late payments may result in cancellation, subject to our Cancellation Policy.</p>
                </details>
              </div>
            </section>

            <section id="cancellation">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 sm:mt-10 mb-3 sm:mb-4">Cancellations and Refunds</h2>
              <div className="space-y-4 sm:space-y-6">
                <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">Can I cancel my booking?</summary>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">Yes, cancellations are allowed but subject to our Cancellation Policy. Submit a written request to <a href="mailto:support@travelquench.com" className="text-blue-600 hover:text-blue-500 break-all">support@travelquench.com</a> for processing.</p>
                </details>
                <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">What is the refund policy?</summary>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">Refunds depend on the cancellation timing: 75% if cancelled more than 60 days before departure, 50% between 30-60 days, and no refund within 30 days. See our Cancellation Policy for details.</p>
                </details>
              </div>
            </section>

            <section id="travel">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 sm:mt-10 mb-3 sm:mb-4">Travel Requirements</h2>
              <div className="space-y-4 sm:space-y-6">
                <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">Do I need a visa for my trip?</summary>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">Visa requirements vary by destination. Check the trip details or consult our team for assistance with visa information.</p>
                </details>
                <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">What should I pack for a trip?</summary>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">Packing lists are provided in your trip confirmation email, tailored to the destination and activities. Essentials include valid ID, travel insurance, and weather-appropriate clothing.</p>
                </details>
              </div>
            </section>

            <section id="support">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-8 sm:mt-10 mb-3 sm:mb-4">Customer Support</h2>
              <div className="space-y-4 sm:space-y-6">
                <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">How can I contact customer support?</summary>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">Reach us via email at <a href="mailto:support@travelquench.com" className="text-blue-600 hover:text-blue-500 break-all">support@travelquench.com</a> or through our Contact page. We&apos;re available Monday to Friday, 9 AM to 6 PM IST.</p>
                </details>
                <details className="border-l-4 border-blue-600 bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <summary className="font-medium text-base sm:text-lg text-gray-900 cursor-pointer">What if I have an issue during my trip?</summary>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">Contact our on-trip support team using the emergency number provided in your travel documents. We&apos;ll assist you promptly.</p>
                </details>
              </div>
            </section>
          </div>

          <div className="mt-8 sm:mt-12 border-t pt-6 sm:pt-8">
            <div className="text-center text-gray-600">
              <p className="mb-2 text-sm sm:text-base">For further assistance, please contact us at:</p>
              <p className="text-sm sm:text-base"><a href="mailto:support@travelquench.com" className="text-blue-600 hover:text-blue-500 break-all">support@travelquench.com</a></p>
              <p className="mt-4 text-sm sm:text-base">
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

export default FAQ;
