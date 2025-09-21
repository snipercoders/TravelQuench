import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";



const Sitemap: React.FC = () => {
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
            Sitemap
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p className="text-xl leading-relaxed">
              Welcome to the sitemap of TravelQuench Experiences Private Limited. Below is an overview of the main pages on our website to help you navigate our services and information.
            </p>

            <section id="main-pages">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Main Pages</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <Link href="/" className="text-blue-600 hover:text-blue-500 font-medium">
                    Home
                  </Link> - Discover our travel offerings and featured destinations.
                </li>
                <li>
                  <Link href="/tours" className="text-blue-600 hover:text-blue-500 font-medium">
                    Tours
                  </Link> - Explore our range of trips and travel packages.
                </li>
                <li>
                  <Link href="/bookings" className="text-blue-600 hover:text-blue-500 font-medium">
                    Bookings
                  </Link> - Manage your travel bookings and reservations.
                </li>
                <li>
                  <Link href="/contact" className="text-blue-600 hover:text-blue-500 font-medium">
                    Contact
                  </Link> - Get in touch with us or visit our office location below.
                </li>
              </ul>
            </section>

            <section id="policies">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Policies and Legal</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-500 font-medium">
                    Privacy Policy
                  </Link> - Details on how we handle your personal data.
                </li>
                <li>
                  <Link href="/terms-and-conditions" className="text-blue-600 hover:text-blue-500 font-medium">
                    Terms and Conditions
                  </Link> - General terms governing your use of our services.
                </li>
                <li>
                  <Link href="/cancellation-policy" className="text-blue-600 hover:text-blue-500 font-medium">
                    Cancellation Policy
                  </Link> - Information on cancellations and refunds.
                </li>
                <li>
                  <Link href="/disclaimer" className="text-blue-600 hover:text-blue-500 font-medium">
                    Disclaimer
                  </Link> - Limitations of liability and user responsibilities.
                </li>
              </ul>
            </section>

            <section id="additional">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Additional Resources</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <Link href="/faq" className="text-blue-600 hover:text-blue-500 font-medium">
                    FAQ
                  </Link> - Frequently asked questions about our services.
                </li>
                <li>
                  <Link href="/blog" className="text-blue-600 hover:text-blue-500 font-medium">
                    Blog
                  </Link> - Travel tips, stories, and updates.
                </li>
              </ul>
            </section>

            <section id="contact-map">
              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Office Location</h2>
              <p className="mb-4">Visit us at our office location:</p>
              <div className="w-full h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.123456!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjAiTiA3N8KwMzYnMDQuMiJF!5e0!3m2!1sen!2sin!4v1695329048!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TravelQuench Office Location"
                ></iframe>
                <p className="mt-2 text-sm text-gray-600">
                  *Note: This is a placeholder map. Replace the iframe src with the actual embed URL from{' '}
                  <a href="https://share.google.com/qvuXKOj1kV2V41bT1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
                    this location link
                  </a>.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 border-t pt-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">For further assistance, please contact us at:</p>
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

export default Sitemap;