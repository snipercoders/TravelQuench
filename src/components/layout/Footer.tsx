// // // // // src/components/layout/Footer.tsx

// import React from "react";
// import Link from "next/link";
// import {
  
//   Shield,
//   Award,
//   Clock,
//   Phone,
//   Mail,
//   MapPin,
//   CheckCircle,
//   Star,
//   Instagram,
//   Twitter,
//   Youtube,
//   Linkedin,
//   Facebook,
//   CreditCard,
//   Smartphone,
// } from "lucide-react";
// import { APP_CONFIG, ROUTES } from "@/lib/utils/constants";
// import { Button, Input } from "@/components/ui";
// import Image from "next/image";

// const Footer: React.FC = () => {
//   const currentYear = new Date().getFullYear();

//   const quickLinks = [
//     { name: "About Us", href: ROUTES.ABOUT },
//     { name: "Customer Reviews", href: "/reviews" },
    
//     { name: "Help & FAQ", href: "/faqs" },
//   ];

//   const services = [
//     { name: "Custom Packages" },
//     { name: "Group Tours" },
//     { name: "Honeymoon Packages" },
//     { name: "Adventure Tours" },
//   ];

//   const socialLinks = [
//     { name: "Facebook", icon: Facebook, link: "#" },
//     { name: "Instagram", icon: Instagram, link: "#" },
//     { name: "Twitter", icon: Twitter, link: "#" },
//     { name: "YouTube", icon: Youtube, link: "#" },
//     { name: "LinkedIn", icon: Linkedin, link: "#" },
//   ];

//   const paymentMethods = [
//     { name: "Visa", logo: "VISA" },
//     { name: "Mastercard", logo: "MC" },
//     { name: "American Express", logo: "AMEX" },
//     { name: "UPI", logo: "UPI" },
//     { name: "RuPay", logo: "RUPAY" },
//     { name: "Paytm", logo: "PAYTM" },
//     { name: "PhonePe", logo: "PHONEPE" },
//     { name: "Google Pay", logo: "GPAY" },
//     { name: "Net Banking", logo: "NETBANK" },
//     { name: "HDFC Bank", logo: "HDFC" },
//     { name: "Wallet", logo: "WALLET" },
//   ];

//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
//           <div className="lg:col-span-2">
//             <div className="flex items-center mb-6">
//               <div className="flex items-center gap-3">
//                 <Image
//                   src="/images/logo.png"
//                   alt="Company Logo"
//                   width={120}
//                   height={40}
//                   className="h-10 w-auto transition-transform hover:scale-105 rounded"
//                   priority
//                 />
//                 <span className="text-2xl font-bold">{APP_CONFIG.name}</span>
//               </div>
//             </div>
//             <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
//               Your ultimate travel companion for discovering extraordinary
//               destinations. We craft personalized adventures that create
//               memories lasting a lifetime.
//             </p>

//             <div className="space-y-3 mb-8">
//               <div className="flex items-center text-sm">
//                 <Shield className="w-4 h-4 mr-2 text-green-400" />
//                 <span className="text-gray-300">100% Secure Booking</span>
//               </div>
//               <div className="flex items-center text-sm">
//                 <Award className="w-4 h-4 mr-2 text-yellow-400" />
//                 <span className="text-gray-300">Best Price Guarantee</span>
//               </div>
//               <div className="flex items-center text-sm">
//                 <Clock className="w-4 h-4 mr-2 text-blue-400" />
//                 <span className="text-gray-300">24/7 Customer Support</span>
//               </div>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4 text-lg">Follow Our Journey</h4>
//               <div className="flex space-x-4">
//                 {socialLinks.map((social) => (
//                   <a
//                     key={social.name}
//                     href={social.link}
//                     className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
//                     aria-label={social.name}
//                   >
//                     <social.icon className="w-5 h-5" />
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-6 text-lg">Popular Destinations</h4>
//             <ul className="space-y-3">
//               {[
//                 { name: "Dubai Tours" },
//                 { name: "Thailand Packages" },
//                 { name: "Europe Tours" },
//                 { name: "Maldives Packages" },
//                 { name: "Japan Tours" },
//                 { name: "Leh Ladakh" },
//                 { name: "Kerala Backwaters" },
              
//               ].map((destination) => (
//                 <li key={destination.name} className="text-gray-300">
//                   {destination.name}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-6 text-lg">Our Services</h4>
//             <ul className="space-y-3">
//               {services.map((service) => (
//                 <li key={service.name} className="text-gray-300">
//                   {service.name}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
//             <ul className="space-y-3 mb-8">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link href={link.href}>
//                     <span className="text-gray-100 hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
//                       {link.name}
//                     </span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>

//             <div className="space-y-3">
//               <div className="flex items-center text-sm">
//                 <Phone className="w-4 h-4 mr-2 text-green-400" />
//                 <span className="text-gray-300">
//                   +91 {APP_CONFIG.whatsappNumber}
//                 </span>
//               </div>
//               <div className="flex items-center text-sm">
//                 <Mail className="w-4 h-4 mr-2 text-blue-400" />
//                 <span className="text-gray-300">{APP_CONFIG.supportEmail}</span>
//               </div>
//               <div className="flex items-start text-sm">
//                 <MapPin className="w-4 h-4 mr-2 text-red-400 mt-0.5" />
//                 <span className="text-gray-300">
//                   Bengaluru, Karnataka, India
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//             <div>
//               <h3 className="text-2xl font-bold mb-2">
//                 Stay Updated with Travel Deals
//               </h3>
//               <p className="text-gray-300 text-lg">
//                 Get exclusive offers, travel tips, and destination insights
//                 delivered to your inbox.
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Input
//                 placeholder="Enter your email address"
//                 className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-xl h-12"
//               />
//               <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-xl whitespace-nowrap">
//                 Subscribe Now
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Payment Methods Section */}
//       <div className="border-t border-gray-800 bg-gray-950">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="text-center">
//             <h4 className="text-lg font-semibold mb-4 flex items-center justify-center">
//               <CreditCard className="w-5 h-5 mr-2" />
//               We Accept Payments Through
//             </h4>
//             <p className="text-gray-400 text-sm mb-6">
//               Powered by Razorpay & HDFC Bank - Secure & Trusted Payment Gateway
//             </p>
            
//             {/* Payment Icons Grid */}
//             <div className="flex flex-wrap justify-center items-center gap-3 max-w-4xl mx-auto mb-6">
//               {paymentMethods.map((method) => (
//                 <div
//                   key={method.name}
//                   className="bg-white rounded-lg px-3 py-2 min-w-[60px] flex items-center justify-center shadow-sm"
//                   title={method.name}
//                 >
//                   <span className="text-gray-800 font-bold text-xs">
//                     {method.logo}
//                   </span>
//                 </div>
//               ))}
//             </div>
            
//             {/* Additional Payment Info */}
//             <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
//               <span className="flex items-center">
//                 <CreditCard className="w-4 h-4 mr-1" />
//                 Credit/Debit Cards
//               </span>
//               <span className="flex items-center">
//                 <Smartphone className="w-4 h-4 mr-1" />
//                 UPI & Digital Wallets
//               </span>
//               <span>Net Banking</span>
//               <span>EMI Available</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-gray-800 bg-gray-950">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="text-center md:text-left mb-6 md:mb-0">
//               <h4 className="text-lg font-semibold mb-4">Trusted & Secure</h4>
//               <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
//                 <div className="flex items-center">
//                   <Shield className="w-6 h-6 text-green-400 mr-2" />
//                   <span className="text-sm text-gray-300">SSL Secured</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Award className="w-6 h-6 text-yellow-400 mr-2" />
//                   <span className="text-sm text-gray-300">
//                     Travel Awards 2024
//                   </span>
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle className="w-6 h-6 text-blue-400 mr-2" />
//                   <span className="text-sm text-gray-300">IATA Certified</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Star className="w-6 h-6 text-yellow-400 mr-2" />
//                   <span className="text-sm text-gray-300">4.9/5 Rating</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-gray-800 bg-gray-950">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="text-gray-400 text-sm mb-4 md:mb-0">
//               © {currentYear} {APP_CONFIG.name}. All rights reserved. | Making
//               travel dreams come true since 2016.
//             </div>
//             <div className="flex flex-wrap items-center gap-6 text-sm">
//               <Link href="/privacy">
//                 <span className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
//                   Privacy Policy
//                 </span>
//               </Link>
//               <Link href="/terms-conditions">
//                 <span className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
//                   Terms & Conditions
//                 </span>
//               </Link>
//               <Link href="/cancellation-policy">
//                 <span className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
//                   Cancellation Policy
//                 </span>
//               </Link>
//               <Link href="/disclaimer">
//                 <span className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
//                   Disclaimer
//                 </span>
//               </Link>
//               <Link href="/sitemap">
//                 <span className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
//                   Sitemap
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-gray-950">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
//           <p className="text-gray-400 text-sm">
//             Website crafted by SniperCoders. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;











// src/components/layout/Footer.tsx

import React from "react";
import Link from "next/link";
import {
  Shield,
  Award,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Star,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Facebook,
  CreditCard,
  Smartphone,
} from "lucide-react";
import { APP_CONFIG, ROUTES } from "@/lib/utils/constants";
import { Button, Input } from "@/components/ui";
import Image from "next/image";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: ROUTES.ABOUT },
    { name: "Customer Reviews", href: "/reviews" },
    { name: "Help & FAQ", href: "/faqs" },
  ];

  const services = [
    { name: "Custom Packages" },
    { name: "Group Tours" },
    { name: "Honeymoon Packages" },
    { name: "Adventure Tours" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, link: "#" },
    { name: "Instagram", icon: Instagram, link: "#" },
    { name: "Twitter", icon: Twitter, link: "#" },
    { name: "YouTube", icon: Youtube, link: "#" },
    { name: "LinkedIn", icon: Linkedin, link: "#" },
  ];

  const paymentMethods = [
    { name: "Visa", logo: "VISA" },
    { name: "Mastercard", logo: "MC" },
    { name: "American Express", logo: "AMEX" },
    { name: "UPI", logo: "UPI" },
    { name: "RuPay", logo: "RUPAY" },
    { name: "Paytm", logo: "PAYTM" },
    { name: "PhonePe", logo: "PHONEPE" },
    { name: "Google Pay", logo: "GPAY" },
    { name: "Net Banking", logo: "NETBANK" },
    { name: "HDFC Bank", logo: "HDFC" },
    { name: "Wallet", logo: "WALLET" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo.png"
                  alt="Company Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto transition-transform hover:scale-105 rounded"
                  priority
                />
                <span className="text-2xl font-bold">{APP_CONFIG.name}</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
              Your ultimate travel companion for discovering extraordinary
              destinations. We craft personalized adventures that create
              memories lasting a lifetime.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center text-sm">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                <span className="text-gray-300">100% Secure Booking</span>
              </div>
              <div className="flex items-center text-sm">
                <Award className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-gray-300">Best Price Guarantee</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-gray-300">24/7 Customer Support</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">Follow Our Journey</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">Popular Destinations</h4>
            <ul className="space-y-3">
              {[
                { name: "Dubai Tours" },
                { name: "Thailand Packages" },
                { name: "Europe Tours" },
                { name: "Maldives Packages" },
                { name: "Japan Tours" },
                { name: "Leh Ladakh" },
                { name: "Kerala Backwaters" },
              ].map((destination) => (
                <li key={destination.name} className="text-gray-300">
                  {destination.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name} className="text-gray-300">
                  {service.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3 mb-8">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-gray-100 hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2 text-green-400" />
                <span className="text-gray-300">
                  {APP_CONFIG.phone || '+91-7006377796'}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-gray-300">{APP_CONFIG.email || 'support@travelquench.com'}</span>
              </div>
              <div className="flex items-start text-sm">
                <MapPin className="w-4 h-4 mr-2 text-red-400 mt-0.5" />
                <span className="text-gray-300">
                  Bengaluru, Karnataka, India
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Stay Updated with Travel Deals
              </h3>
              <p className="text-gray-300 text-lg">
                Get exclusive offers, travel tips, and destination insights
                delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Enter your email address"
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-xl h-12"
              />
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-xl whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 flex items-center justify-center">
              <CreditCard className="w-5 h-5 mr-2" />
              We Accept Payments Through
            </h4>
            <p className="text-gray-400 text-sm mb-6">
              Powered by Razorpay & HDFC Bank - Secure & Trusted Payment Gateway
            </p>
            
            {/* Payment Icons Grid */}
            <div className="flex flex-wrap justify-center items-center gap-3 max-w-4xl mx-auto mb-6">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className="bg-white rounded-lg px-3 py-2 min-w-[60px] flex items-center justify-center shadow-sm"
                  title={method.name}
                >
                  <span className="text-gray-800 font-bold text-xs">
                    {method.logo}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Additional Payment Info */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center">
                <CreditCard className="w-4 h-4 mr-1" />
                Credit/Debit Cards
              </span>
              <span className="flex items-center">
                <Smartphone className="w-4 h-4 mr-1" />
                UPI & Digital Wallets
              </span>
              <span>Net Banking</span>
              <span>EMI Available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Trusted & Secure</h4>
              <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-green-400 mr-2" />
                  <span className="text-sm text-gray-300">SSL Secured</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-yellow-400 mr-2" />
                  <span className="text-sm text-gray-300">
                    Travel Awards 2024
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-blue-400 mr-2" />
                  <span className="text-sm text-gray-300">IATA Certified</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-yellow-400 mr-2" />
                  <span className="text-sm text-gray-300">4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} {APP_CONFIG.name}. All rights reserved. | Making
              travel dreams come true since 2016.
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link href="/privacy">
                <span className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms-conditions">
                <span className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
                  Terms & Conditions
                </span>
              </Link>
              <Link href="/cancellation-policy">
                <span className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
                  Cancellation Policy
                </span>
              </Link>
              <Link href="/disclaimer">
                <span className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
                  Disclaimer
                </span>
              </Link>
              <Link href="/sitemap">
                <span className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
                  Sitemap
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-gray-400 text-sm">
            Website crafted by SniperCoders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

