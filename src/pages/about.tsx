// import Link from 'next/link';
// import Image from 'next/image';
// import { ArrowRight, Globe, Heart, Map } from 'lucide-react';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';

// const About: React.FC = () => {
//   return (
//     <div className="bg-gray-50">
//       {/* Navbar */}
//       <Navbar />

//       {/* Hero Section */}
//       <section className="relative h-[60vh] flex items-center justify-center">
//         {/* Background Video */}
//         <video
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="absolute inset-0 w-full h-full object-cover"
//         >
//           <source src="https://res.cloudinary.com/dzoxwk1jc/video/upload/v1758395896/main_nysgrf.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
//         <div className="relative text-center text-white px-4 sm:px-6 lg:px-8">
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">About Travel Quench</h1>
//           <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto">
//             Crafting unforgettable journeys that ignite your wanderlust and connect you with the world.
//           </p>
//         </div>
//       </section>

//       {/* Mission Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="text-center">
//           <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">Our Mission</h2>
//           <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
//             At Travel Quench, we believe travel is more than just visiting places—it's about creating stories, embracing cultures, and finding yourself in the journey. Our mission is to curate transformative travel experiences that inspire adventure, foster connections, and leave a positive impact on the world.
//           </p>
//         </div>
//       </section>

//       {/* Yatra Partnership Section */}
//       <section className="py-16 bg-gray-50 relative overflow-hidden">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             {/* Left Side - Yatra Logo */}
//             <div className="flex justify-center">
//               <img
//                 src="https://res.cloudinary.com/dzoxwk1jc/image/upload/v1758397948/WhatsApp_Image_2025-09-20_at_15.59.55_bbf90ef7_jx7tnf.jpg"
//                 alt="Yatra Store Logo"
//                 className="max-h-48 object-contain"
//               />
//             </div>

//             {/* Right Side - Partnership Content */}
//             <div className="space-y-6">
//               <h3 className="text-2xl font-bold text-gray-900">Our Proud Partnership with Yatra.com</h3>
//               <p className="text-gray-600 leading-relaxed">
//                 TravelQuench is thrilled to be the official partnership agency of Yatra.com, India's leading travel platform. This collaboration brings together TravelQuench's personalized travel expertise with Yatra.com's extensive network and innovative booking solutions, offering our clients an unparalleled travel experience.
//               </p>
//               <p className="text-gray-600 leading-relaxed">
//                 Together, we aim to redefine travel by providing seamless itineraries, exclusive deals, and 24/7 support, ensuring every journey is memorable and hassle-free.
//               </p>
//               <p className="text-gray-600 leading-relaxed">
//                 With this partnership, TravelQuench continues to uphold its commitment to excellence, serving over 15,000 happy travelers since its inception in 2020.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Ranjith Profile Section */}
//       <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
//         {/* Subtle background pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div 
//             className="absolute inset-0" 
//             style={{
//               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//             }}
//           ></div>
//         </div>
        
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Section Header */}
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center px-4 py-2 bg-yellow-400 text-gray-900 text-sm font-semibold rounded-full mb-6">
//               Meet Our Leader
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Ranjith Gaikwad
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Manager & Visionary behind TravelQuench - Official Partnership Agency of Yatra.com
//             </p>
//           </div>

//           {/* Profile Card */}
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             {/* Profile Image */}
//             <div className="relative group">
//               <div className="relative rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
//                 <div className="aspect-[4/5] bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
//                   {/* Animated background elements */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                   <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 group-hover:opacity-30 transition-all duration-500 -rotate-45"></div>
                  
//                   {/* Placeholder for profile image - replace with actual image */}
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="w-48 h-48 bg-gradient-to-br from-white/20 to-transparent rounded-full flex items-center justify-center backdrop-blur-sm">
//                       <div className="text-6xl">👨‍💼</div> {/* Replace with actual image */}
//                     </div>
//                   </div>
                  
//                   {/* Profile overlay info */}
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
//                     <div className="flex items-center space-x-3 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                       <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
//                       <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
//                       <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-50"></div>
//                     </div>
//                     <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
//                       12+ Years in Travel Excellence
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Profile Content */}
//             <div className="space-y-6">
//               {/* Title & Role */}
//               <div>
//                 <h3 className="text-3xl font-bold text-gray-900 mb-2">Ranjith Gaikwad</h3>
//                 <p className="text-2xl font-semibold text-yellow-600 mb-4">Manager, TravelQuench</p>
//                 <div className="flex items-center text-gray-600 mb-4">
//                   <span>Mumbai, India</span>
//                 </div>
//               </div>

//               {/* Bio */}
//               <div className="space-y-4">
//                 <p className="text-gray-700 leading-relaxed">
//                   Ranjith Gaikwad is the driving force behind TravelQuench, bringing over 12 years of unparalleled expertise in the travel industry to create exceptional journeys for wanderers worldwide. As the official partnership agency of Yatra.com, TravelQuench combines Ranjith's visionary leadership with cutting-edge booking technology to deliver seamless, personalized travel experiences.
//                 </p>
                
//                 <p className="text-gray-700 leading-relaxed">
//                   A passionate explorer himself, Ranjith has traversed more than 45 countries and led over 500 successful group expeditions. His philosophy of "Travel with Purpose" emphasizes sustainable tourism, cultural immersion, and creating meaningful connections that last a lifetime. Under his guidance, TravelQuench has earned a stellar 4.9/5 rating across 10,000+ customer reviews.
//                 </p>
//               </div>

//               {/* Key Achievements */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                 <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
//                   <div className="text-3xl font-bold text-yellow-600 mb-2">500+</div>
//                   <div className="text-gray-600 font-medium">Group Expeditions Led</div>
//                 </div>
//                 <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
//                   <div className="text-3xl font-bold text-yellow-600 mb-2">45+</div>
//                   <div className="text-gray-600 font-medium">Countries Explored</div>
//                 </div>
//                 <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
//                   <div className="text-3xl font-bold text-yellow-600 mb-2">4.9/5</div>
//                   <div className="text-gray-600 font-medium">Customer Rating</div>
//                 </div>
//                 <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
//                   <div className="text-3xl font-bold text-yellow-600 mb-2">10K+</div>
//                   <div className="text-gray-600 font-medium">Happy Travelers</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 text-center">Our Values</h2>
//           <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div className="text-center">
//               <Globe className="h-12 w-12 text-blue-600 mx-auto" />
//               <h3 className="mt-4 text-xl font-medium text-gray-900">Global Exploration</h3>
//               <p className="mt-2 text-gray-600">
//                 We design journeys that take you to the heart of every destination, from hidden gems to iconic landmarks.
//               </p>
//             </div>
//             <div className="text-center">
//               <Heart className="h-12 w-12 text-red-600 mx-auto" />
//               <h3 className="mt-4 text-xl font-medium text-gray-900">Passion for Travel</h3>
//               <p className="mt-2 text-gray-600">
//                 Our love for travel drives us to create authentic, immersive experiences that resonate with every traveler.
//               </p>
//             </div>
//             <div className="text-center">
//               <Map className="h-12 w-12 text-green-600 mx-auto" />
//               <h3 className="mt-4 text-xl font-medium text-gray-900">Sustainable Adventures</h3>
//               <p className="mt-2 text-gray-600">
//                 We prioritize eco-friendly travel, supporting local communities and preserving the planet for future explorers.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Our Story Section */}
//       <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">Our Story</h2>
//             <p className="mt-4 text-lg text-gray-600">
//               Founded in 2020, Travel Quench was born from a shared passion for adventure and discovery. Our founders, a group of avid travelers, saw a need for personalized, meaningful travel experiences that go beyond the ordinary. Today, we're proud to have helped thousands of explorers quench their thirst for adventure across the globe, from the peaks of the Himalayas to the savannas of Africa.
//             </p>
//             <p className="mt-4 text-lg text-gray-600">
//               Every trip we design is a step toward bringing people closer to the world and each other. Join us, and let's write your next travel story together.
//             </p>
           
//           </div>
//           <div className="relative h-64 sm:h-80 lg:h-96">
//             <Image
//               src="/images/our-story.jpg"
//               alt="Travel Quench team exploring"
//               layout="fill"
//               objectFit="cover"
//               className="rounded-lg shadow-lg"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-16 bg-blue-600 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl sm:text-4xl font-semibold">Ready to Quench Your Wanderlust?</h2>
//           <p className="mt-4 text-lg max-w-2xl mx-auto">
//             Join the Travel Quench community and embark on journeys that inspire, connect, and transform.
//           </p>
//           <Link
//             href="/contact"
//             className="mt-6 inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors duration-200"
//           >
//             Get in Touch
//             <ArrowRight className="ml-2 h-5 w-5" />
//           </Link>
//         </div>
//       </section>

//       <Footer/>
//     </div>
//   );
// };

// export default About;











import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe, Heart, Map } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const About: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/dzoxwk1jc/video/upload/v1758395896/main_nysgrf.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">About Travel Quench</h1>
          <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto">
            Crafting unforgettable journeys that ignite your wanderlust and connect you with the world.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            At Travel Quench, we believe travel is more than just visiting places&mdash;it&apos;s about creating stories, embracing cultures, and finding yourself in the journey. Our mission is to curate transformative travel experiences that inspire adventure, foster connections, and leave a positive impact on the world.
          </p>
        </div>
      </section>

      {/* Yatra Partnership Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Yatra Logo */}
            <div className="flex justify-center">
              <Image
                src="https://res.cloudinary.com/dzoxwk1jc/image/upload/v1758397948/WhatsApp_Image_2025-09-20_at_15.59.55_bbf90ef7_jx7tnf.jpg"
                alt="Yatra Store Logo"
                width={400}
                height={192}
                className="max-h-48 object-contain"
              />
            </div>

            {/* Right Side - Partnership Content */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Our Proud Partnership with Yatra.com</h3>
              <p className="text-gray-600 leading-relaxed">
                TravelQuench is thrilled to be the official partnership agency of Yatra.com, India&apos;s leading travel platform. This collaboration brings together TravelQuench&apos;s personalized travel expertise with Yatra.com&apos;s extensive network and innovative booking solutions, offering our clients an unparalleled travel experience.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Together, we aim to redefine travel by providing seamless itineraries, exclusive deals, and 24/7 support, ensuring every journey is memorable and hassle-free.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With this partnership, TravelQuench continues to uphold its commitment to excellence, serving over 15,000 happy travelers since its inception in 2020.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ranjith Profile Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-400 text-gray-900 text-sm font-semibold rounded-full mb-6">
              Meet Our Leader
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ranjith Gaikwad
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manager & Visionary behind TravelQuench - Official Partnership Agency of Yatra.com
            </p>
          </div>

          {/* Profile Card */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="relative group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <div className="aspect-[4/5] bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
                  {/* Animated background elements */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 group-hover:opacity-30 transition-all duration-500 -rotate-45"></div>
                  
                  {/* Placeholder for profile image - replace with actual image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-white/20 to-transparent rounded-full flex items-center justify-center backdrop-blur-sm">
                      <div className="text-6xl">👨‍💼</div> {/* Replace with actual image */}
                    </div>
                  </div>
                  
                  {/* Profile overlay info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <div className="flex items-center space-x-3 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-50"></div>
                    </div>
                    <p className="text-white/90 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                      12+ Years in Travel Excellence
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="space-y-6">
              {/* Title & Role */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Ranjith Gaikwad</h3>
                <p className="text-2xl font-semibold text-yellow-600 mb-4">Manager, TravelQuench</p>
                <div className="flex items-center text-gray-600 mb-4">
                  <span>Mumbai, India</span>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Ranjith Gaikwad is the driving force behind TravelQuench, bringing over 12 years of unparalleled expertise in the travel industry to create exceptional journeys for wanderers worldwide. As the official partnership agency of Yatra.com, TravelQuench combines Ranjith&apos;s visionary leadership with cutting-edge booking technology to deliver seamless, personalized travel experiences.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  A passionate explorer himself, Ranjith has traversed more than 45 countries and led over 500 successful group expeditions. His philosophy of &ldquo;Travel with Purpose&rdquo; emphasizes sustainable tourism, cultural immersion, and creating meaningful connections that last a lifetime. Under his guidance, TravelQuench has earned a stellar 4.9/5 rating across 10,000+ customer reviews.
                </p>
              </div>

              {/* Key Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">500+</div>
                  <div className="text-gray-600 font-medium">Group Expeditions Led</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">45+</div>
                  <div className="text-gray-600 font-medium">Countries Explored</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">4.9/5</div>
                  <div className="text-gray-600 font-medium">Customer Rating</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">10K+</div>
                  <div className="text-gray-600 font-medium">Happy Travelers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 text-center">Our Values</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Globe className="h-12 w-12 text-blue-600 mx-auto" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">Global Exploration</h3>
              <p className="mt-2 text-gray-600">
                We design journeys that take you to the heart of every destination, from hidden gems to iconic landmarks.
              </p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 text-red-600 mx-auto" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">Passion for Travel</h3>
              <p className="mt-2 text-gray-600">
                Our love for travel drives us to create authentic, immersive experiences that resonate with every traveler.
              </p>
            </div>
            <div className="text-center">
              <Map className="h-12 w-12 text-green-600 mx-auto" />
              <h3 className="mt-4 text-xl font-medium text-gray-900">Sustainable Adventures</h3>
              <p className="mt-2 text-gray-600">
                We prioritize eco-friendly travel, supporting local communities and preserving the planet for future explorers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">Our Story</h2>
            <p className="mt-4 text-lg text-gray-600">
              Founded in 2020, Travel Quench was born from a shared passion for adventure and discovery. Our founders, a group of avid travelers, saw a need for personalized, meaningful travel experiences that go beyond the ordinary. Today, we&apos;re proud to have helped thousands of explorers quench their thirst for adventure across the globe, from the peaks of the Himalayas to the savannas of Africa.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Every trip we design is a step toward bringing people closer to the world and each other. Join us, and let&apos;s write your next travel story together.
            </p>
           
          </div>
          <div className="relative h-64 sm:h-80 lg:h-96">
            <Image
              src="/images/our-story.jpg"
              alt="Travel Quench team exploring"
              fill
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold">Ready to Quench Your Wanderlust?</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Join the Travel Quench community and embark on journeys that inspire, connect, and transform.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            Get in Touch
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default About;