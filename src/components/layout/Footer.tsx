// // src/components/layout/Footer.tsx
// import React from 'react';
// import Link from 'next/link';
// import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
// import { APP_CONFIG, ROUTES } from '@/lib/utils/constants';

// const Footer: React.FC = () => {
//   const currentYear = new Date().getFullYear();

//   const quickLinks = [
//     { name: 'About Us', href: ROUTES.ABOUT },
//     { name: 'International Packages', href: ROUTES.INTERNATIONAL_PACKAGES },
//     { name: 'Indian Packages', href: ROUTES.INDIAN_PACKAGES },
//     { name: 'Testimonials', href: ROUTES.TESTIMONIALS },
//     { name: 'Contact Us', href: '/contact' },
//   ];

//   const services = [
//     { name: 'Custom Packages', href: ROUTES.CUSTOMIZE },
//     { name: 'Group Tours', href: '/group-tours' },
//     { name: 'Honeymoon Packages', href: '/honeymoon' },
//     { name: 'Adventure Tours', href: '/adventure' },
//     { name: 'Luxury Travel', href: '/luxury' },
//   ];

//   const destinations = [
//     { name: 'Europe Tours', href: '/destinations/europe' },
//     { name: 'Asia Packages', href: '/destinations/asia' },
//     { name: 'Kerala Tours', href: '/destinations/kerala' },
//     { name: 'Rajasthan Packages', href: '/destinations/rajasthan' },
//     { name: 'Goa Holidays', href: '/destinations/goa' },
//   ];

//   return (
//     <footer className="bg-secondary-900 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div className="space-y-4">
//             <div className="flex items-center">
//               <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
//                 <span className="text-white font-bold text-lg">TQ</span>
//               </div>
//               <span className="text-xl font-bold">Travel Quench</span>
//             </div>
//             <p className="text-gray-300 text-sm leading-relaxed">
//               Your ultimate travel companion for unforgettable journeys. We create personalized experiences that turn your travel dreams into cherished memories.
//             </p>
//             <div className="space-y-2">
//               <div className="flex items-center text-sm text-gray-300">
//                 <MapPin className="w-4 h-4 mr-2 text-primary-400" />
//                 <span>Bengaluru, Karnataka, India</span>
//               </div>
//               <div className="flex items-center text-sm text-gray-300">
//                 <Phone className="w-4 h-4 mr-2 text-primary-400" />
//                 <span>+91 {APP_CONFIG.whatsappNumber}</span>
//               </div>
//               <div className="flex items-center text-sm text-gray-300">
//                 <Mail className="w-4 h-4 mr-2 text-primary-400" />
//                 <span>{APP_CONFIG.supportEmail}</span>
//               </div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.href}
//                     className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Services */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Our Services</h3>
//             <ul className="space-y-2">
//               {services.map((service) => (
//                 <li key={service.name}>
//                   <Link
//                     href={service.href}
//                     className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
//                   >
//                     {service.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Popular Destinations */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
//             <ul className="space-y-2">
//               {destinations.map((destination) => (
//                 <li key={destination.name}>
//                   <Link
//                     href={destination.href}
//                     className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
//                   >
//                     {destination.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="border-t border-gray-700 mt-8 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="text-sm text-gray-400 mb-4 md:mb-0">
//               © {currentYear} {APP_CONFIG.name}. All rights reserved.
//             </div>
            
//             {/* Social Links */}
//             <div className="flex space-x-4">
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
//                 aria-label="Facebook"
//               >
//                 <Facebook className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
//                 aria-label="Instagram"
//               >
//                 <Instagram className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
//                 aria-label="Twitter"
//               >
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
//                 aria-label="YouTube"
//               >
//                 <Youtube className="w-5 h-5" />
//               </a>
//             </div>
//           </div>
          
//           <div className="mt-4 text-center">
//             <div className="flex flex-wrap justify-center space-x-6 text-xs text-gray-400">
//               <Link href="/privacy" className="hover:text-primary-400 transition-colors">
//                 Privacy Policy
//               </Link>
//               <Link href="/terms" className="hover:text-primary-400 transition-colors">
//                 Terms of Service
//               </Link>
//               <Link href="/cancellation" className="hover:text-primary-400 transition-colors">
//                 Cancellation Policy
//               </Link>
//               <Link href="/sitemap" className="hover:text-primary-400 transition-colors">
//                 Sitemap
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;













import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { APP_CONFIG, ROUTES } from '@/lib/utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: ROUTES.ABOUT },
    { name: 'Indian Packages', href: ROUTES.INDIAN_PACKAGES },
    { name: 'International Packages', href: ROUTES.INTERNATIONAL_PACKAGES },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
  ];

  const services = [
    { name: 'Custom Packages', href: ROUTES.CUSTOMIZE },
    { name: 'Group Tours', href: '/group-tours' },
    { name: 'Honeymoon Packages', href: '/honeymoon' },
    { name: 'Adventure Tours', href: '/adventure' },
  ];

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">TQ</span>
              </div>
              <span className="text-lg font-bold">Travel Quench</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              Crafting memorable travel experiences with personalized Indian and International packages.
            </p>
            <div className="space-y-1">
              <div className="flex items-center text-xs text-gray-300">
                <MapPin className="w-4 h-4 mr-2 text-primary-400" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
              <div className="flex items-center text-xs text-gray-300">
                <Phone className="w-4 h-4 mr-2 text-primary-400" />
                <span>+91 {APP_CONFIG.whatsappNumber}</span>
              </div>
              <div className="flex items-center text-xs text-gray-300">
                <Mail className="w-4 h-4 mr-2 text-primary-400" />
                <span>{APP_CONFIG.supportEmail}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-xs"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-semibold mb-3">Our Services</h3>
            <ul className="space-y-1">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-xs"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs text-gray-400 mb-3 md:mb-0">
              © {currentYear} {APP_CONFIG.name}. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="mt-3 text-center">
            <div className="flex flex-wrap justify-center space-x-4 text-xs text-gray-400">
              <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cancellation" className="hover:text-primary-400 transition-colors">
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;