// // src/pages/customize.tsx

// import React from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import Layout from '@/components/layout/Layout';
// import CustomPackageForm from '@/components/customer/CustomPackageForm';
// import { Sparkles, Users, Heart, Star, MapPin, CheckCircle, Phone, Mail } from 'lucide-react';
// import { Button, Card } from '@/components/ui';

// const CustomizePage: React.FC = () => {
//   const handleFormSubmit = (data: any) => {
//     const message = `Hi! I'd like to customize a travel package with the following details:

// 🏃‍♂️ *Trip Type*: ${data.tripType}
// 📍 *Destinations*: ${data.destinations.filter((d: string) => d.trim()).join(', ')}
// 📅 *Travel Dates*: ${data.startDate} to ${data.endDate} (${data.duration} days)
// 👥 *Travelers*: ${data.totalTravelers} (${data.adults} adults, ${data.children} children)
// 🎯 *Travel Style*: ${data.travelStyle}
// 🏨 *Accommodation*: ${data.accommodationType}
// 💰 *Budget Range*: ${data.budgetRange}
// ❤️ *Interests*: ${data.interests.join(', ') || 'None'}
// 🍽️ *Meals*: ${data.meals}
// 📝 *Special Requests*: ${data.specialRequests || 'None'}

// *Contact*:
// 👤 *Name*: ${data.name}
// 📧 *Email*: ${data.email}
// 📱 *Phone*: ${data.phone}

// Please help me plan this perfect trip!`;

//     const encodedMessage = encodeURIComponent(message);
//     window.location.href = `https://wa.me/+917006377796?text=${encodedMessage}`;
//   };

//   const features = [
//     {
//       icon: Sparkles,
//       title: 'Fully Personalized',
//       description: 'Tailored to your unique preferences and dreams'
//     },
//     {
//       icon: Users,
//       title: 'Expert Planning',
//       description: 'Our travel experts craft your perfect itinerary'
//     },
//     {
//       icon: Heart,
//       title: 'Flexible Options',
//       description: 'Adjust your package to fit your vision'
//     },
//     {
//       icon: Star,
//       title: 'Premium Support',
//       description: 'Dedicated assistance for your journey'
//     }
//   ];

//   const steps = [
//     {
//       step: 1,
//       title: 'Share Your Vision',
//       description: 'Tell us your destinations and preferences',
//       icon: MapPin
//     },
//     {
//       step: 2,
//       title: 'Expert Crafting',
//       description: 'We design a personalized itinerary for you',
//       icon: Users
//     },
//     {
//       step: 3,
//       title: 'Start Your Journey',
//       description: 'Review, confirm, and embark on your adventure',
//       icon: CheckCircle
//     }
//   ];

//   const testimonials = [
//     {
//       name: 'Rajesh & Priya',
//       location: 'Mumbai',
//       rating: 5,
//       comment: 'An unforgettable honeymoon in Europe, perfectly planned!',
//       package: 'Custom Honeymoon'
//     },
//     {
//       name: 'Amit Patel',
//       location: 'Delhi',
//       rating: 5,
//       comment: 'Our family adventure was seamless and fun for all!',
//       package: 'Family Getaway'
//     },
//     {
//       name: 'Sneha Gupta',
//       location: 'Bangalore',
//       rating: 5,
//       comment: 'A safe and thrilling solo trip, exactly what I wanted!',
//       package: 'Solo Adventure'
//     }
//   ];

//   return (
//     <>
//       <Head>
//         <title>Design Your Dream Trip | Jai Mata Di Tour & Travels</title>
//         <meta name="description" content="Create your perfect custom travel package with Jai Mata Di Tour & Travels. Share your vision, and we'll craft a personalized adventure." />
//         <meta name="keywords" content="custom travel package, personalized travel, tailor-made trips, custom itinerary, travel planning" />
//       </Head>

//       <Layout>
//         {/* Hero Section */}
//         <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden">
//           <div className="absolute inset-0 opacity-30">
//             <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-300 rounded-full animate-pulse mix-blend-screen"></div>
//             <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
//             <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
//           </div>

//           <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//               <div className="text-center lg:text-left">
//                 <div className="flex justify-center lg:justify-start mb-6">
//                   <div className="relative">
//                     <div className="bg-white bg-opacity-30 p-4 rounded-full backdrop-blur-md">
//                       <Sparkles className="h-14 w-14 text-yellow-200" />
//                     </div>
//                     <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
//                   </div>
//                 </div>

//                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
//                   Craft Your
//                   <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
//                     Dream Adventure
//                   </span>
//                 </h1>

//                 <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
//                   Your journey, your way. Let us turn your travel dreams into reality with a custom package designed just for you.
//                 </p>

//                 <Button
//                   size="lg"
//                   className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-full shadow-2xl hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
//                   onClick={() => document.getElementById('customize-form')?.scrollIntoView({ behavior: 'smooth' })}
//                 >
//                   Plan Your Trip Now
//                 </Button>
//               </div>

//               <div className="relative hidden lg:block">
//                 <div className="w-80 h-80 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full shadow-2xl mx-auto">
//                   <div className="absolute inset-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
//                     <div className="text-center">
//                       <div className="text-5xl mb-3">✈️</div>
//                       <h3 className="text-xl font-bold text-gray-800">Your Adventure Awaits</h3>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="absolute top-0 -left-6 bg-blue-400 text-white px-4 py-2 rounded-full shadow-lg animate-bounce">
//                   <div className="flex items-center">
//                     <MapPin className="w-5 h-5 mr-2" />
//                     <span className="text-sm font-semibold">Explore Anywhere</span>
//                   </div>
//                 </div>
//                 <div className="absolute bottom-0 -right-6 bg-pink-400 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
//                   <div className="flex items-center">
//                     <Heart className="w-5 h-5 mr-2" />
//                     <span className="text-sm font-semibold">Tailored for You</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="py-16 bg-gray-100">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">
//               Why Choose Our Custom Packages?
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {features.map((feature, index) => (
//                 <Card
//                   key={index}
//                   className="p-6 bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//                 >
//                   <feature.icon className="w-10 h-10 text-blue-500 mb-4 mx-auto" />
//                   <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{feature.title}</h3>
//                   <p className="text-gray-600 text-center">{feature.description}</p>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Custom Form Section */}
//         <section id="customize-form" className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
//                 Build Your Perfect Trip
//               </h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 Share your travel vision, and our experts will craft a personalized package for you.
//               </p>
//             </div>
//             <CustomPackageForm onSubmit={handleFormSubmit} />
//           </div>
//         </section>

//         {/* Testimonials Section */}
//         <section className="py-16 bg-gradient-to-r from-blue-50 to-pink-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
//                 Traveler Success Stories
//               </h2>
//               <p className="text-lg text-gray-600">
//                 Hear from travelers who turned their dreams into reality
//               </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {testimonials.map((testimonial, index) => (
//                 <Card
//                   key={index}
//                   className="p-6 bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all duration-300"
//                 >
//                   <div className="flex justify-center mb-4">
//                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                       <span className="text-lg font-semibold text-blue-600">
//                         {testimonial.name.split(' ')[0][0]}{testimonial.name.split(' ')[1]?.[0] || ''}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex justify-center mb-4">
//                     {[...Array(testimonial.rating)].map((_, i) => (
//                       <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                     ))}
//                   </div>
//                   <p className="text-gray-600 mb-4 italic text-center">"{testimonial.comment}"</p>
//                   <div className="text-center">
//                     <div className="font-semibold text-gray-900">{testimonial.name}</div>
//                     <div className="text-sm text-gray-600">{testimonial.location}</div>
//                     <div className="text-sm text-blue-600 mt-1">{testimonial.package}</div>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Contact Section */}
//         <section className="py-16 bg-gray-100">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
//               Get in Touch
//             </h2>
//             <p className="text-lg text-gray-600 mb-8">
//               Have questions? Our team is here to help you plan your dream trip.
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               <Card className="p-6 bg-white border-2 border-blue-200 hover:border-blue-400 transition-all duration-300">
//                 <Phone className="w-8 h-8 text-blue-500 mx-auto mb-3" />
//                 <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
//                 <p className="text-gray-600">+91-7006377796</p>
//                 <p className="text-sm text-gray-500">Mon-Sat 9 AM - 8 PM</p>
//               </Card>
//               <Card className="p-6 bg-white border-2 border-pink-200 hover:border-pink-400 transition-all duration-300">
//                 <Mail className="w-8 h-8 text-pink-500 mx-auto mb-3" />
//                 <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
//                 <p className="text-gray-600">custom@jaimataditravels.com</p>
//                 <p className="text-sm text-gray-500">Response within 4 hours</p>
//               </Card>
//             </div>
//             <a href="tel:+917006377796">
//               <Button size="lg" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300">
//                 <Phone className="w-5 h-5 mr-2" />
//                 Contact Now
//               </Button>
//             </a>
//           </div>
//         </section>

  
//       </Layout>
//     </>
//   );
// };

// export default CustomizePage;











// src/pages/customize.tsx

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Footer from '@/components/layout/Footer';
import CustomPackageForm from '@/components/customer/CustomPackageForm';
import { Sparkles, Users, Heart, Star, MapPin, CheckCircle, Phone, Mail } from 'lucide-react';
import { Button, Card } from '@/components/ui';

const CustomizePage: React.FC = () => {
  const handleFormSubmit = (data: any) => {
    const message = `Hi! I'd like to customize a travel package with the following details:

🏃‍♂️ *Trip Type*: ${data.tripType}
📍 *Destinations*: ${data.destinations.filter((d: string) => d.trim()).join(', ')}
📅 *Travel Dates*: ${data.startDate} to ${data.endDate} (${data.duration} days)
👥 *Travelers*: ${data.totalTravelers} (${data.adults} adults, ${data.children} children)
🎯 *Travel Style*: ${data.travelStyle}
🏨 *Accommodation*: ${data.accommodationType}
💰 *Budget Range*: ${data.budgetRange}
❤️ *Interests*: ${data.interests.join(', ') || 'None'}
🍽️ *Meals*: ${data.meals}
📝 *Special Requests*: ${data.specialRequests || 'None'}

*Contact*:
👤 *Name*: ${data.name}
📧 *Email*: ${data.email}
📱 *Phone*: ${data.phone}

Please help me plan this perfect trip!`;

    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/+917006377796?text=${encodedMessage}`;
  };

  const features = [
    {
      icon: Sparkles,
      title: 'Fully Personalized',
      description: 'Tailored to your unique preferences and dreams'
    },
    {
      icon: Users,
      title: 'Expert Planning',
      description: 'Our travel experts craft your perfect itinerary'
    },
    {
      icon: Heart,
      title: 'Flexible Options',
      description: 'Adjust your package to fit your vision'
    },
    {
      icon: Star,
      title: 'Premium Support',
      description: 'Dedicated assistance for your journey'
    }
  ];

  const steps = [
    {
      step: 1,
      title: 'Share Your Vision',
      description: 'Tell us your destinations and preferences',
      icon: MapPin
    },
    {
      step: 2,
      title: 'Expert Crafting',
      description: 'We design a personalized itinerary for you',
      icon: Users
    },
    {
      step: 3,
      title: 'Start Your Journey',
      description: 'Review, confirm, and embark on your adventure',
      icon: CheckCircle
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh & Priya',
      location: 'Mumbai',
      rating: 5,
      comment: 'An unforgettable honeymoon in Europe, perfectly planned!',
      package: 'Custom Honeymoon'
    },
    {
      name: 'Amit Patel',
      location: 'Delhi',
      rating: 5,
      comment: 'Our family adventure was seamless and fun for all!',
      package: 'Family Getaway'
    },
    {
      name: 'Sneha Gupta',
      location: 'Bangalore',
      rating: 5,
      comment: 'A safe and thrilling solo trip, exactly what I wanted!',
      package: 'Solo Adventure'
    }
  ];

  return (
    <>
      <Head>
        <title>Design Your Dream Trip | Jai Mata Di Tour & Travels</title>
        <meta name="description" content="Create your perfect custom travel package with Jai Mata Di Tour & Travels. Share your vision, and we'll craft a personalized adventure." />
        <meta name="keywords" content="custom travel package, personalized travel, tailor-made trips, custom itinerary, travel planning" />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-300 rounded-full animate-pulse mix-blend-screen"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="relative">
                    <div className="bg-white bg-opacity-30 p-4 rounded-full backdrop-blur-md">
                      <Sparkles className="h-14 w-14 text-yellow-200" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                  Craft Your
                  <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                    Dream Adventure
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                  Your journey, your way. Let us turn your travel dreams into reality with a custom package designed just for you.
                </p>

                <Button
                  size="lg"
                  className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-full shadow-2xl hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
                  onClick={() => document.getElementById('customize-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Plan Your Trip Now
                </Button>
              </div>

              <div className="relative hidden lg:block">
                <div className="w-80 h-80 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full shadow-2xl mx-auto">
                  <div className="absolute inset-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-3">✈️</div>
                      <h3 className="text-xl font-bold text-gray-800">Your Adventure Awaits</h3>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 -left-6 bg-blue-400 text-white px-4 py-2 rounded-full shadow-lg animate-bounce">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-sm font-semibold">Explore Anywhere</span>
                  </div>
                </div>
                <div className="absolute bottom-0 -right-6 bg-pink-400 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    <span className="text-sm font-semibold">Tailored for You</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">
              Why Choose Our Custom Packages?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <feature.icon className="w-10 h-10 text-blue-500 mb-4 mx-auto" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Form Section */}
        <section id="customize-form" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Build Your Perfect Trip
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Share your travel vision, and our experts will craft a personalized package for you.
              </p>
            </div>
            <CustomPackageForm onSubmit={handleFormSubmit} />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Traveler Success Stories
              </h2>
              <p className="text-lg text-gray-600">
                Hear from travelers who turned their dreams into reality
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="p-6 bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-blue-600">
                        {testimonial.name.split(' ')[0][0]}{testimonial.name.split(' ')[1]?.[0] || ''}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic text-center">"{testimonial.comment}"</p>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                    <div className="text-sm text-blue-600 mt-1">{testimonial.package}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions? Our team is here to help you plan your dream trip.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-white border-2 border-blue-200 hover:border-blue-400 transition-all duration-300">
                <Phone className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600">+91-7006377796</p>
                <p className="text-sm text-gray-500">Mon-Sat 9 AM - 8 PM</p>
              </Card>
              <Card className="p-6 bg-white border-2 border-pink-200 hover:border-pink-400 transition-all duration-300">
                <Mail className="w-8 h-8 text-pink-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600">custom@jaimataditravels.com</p>
                <p className="text-sm text-gray-500">Response within 4 hours</p>
              </Card>
            </div>
            <a href="tel:+917006377796">
              <Button size="lg" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300">
                <Phone className="w-5 h-5 mr-2" />
                Contact Now
              </Button>
            </a>
          </div>
        </section>

        {/* Explicitly add Footer */}
        <Footer />
      </Layout>
    </>
  );
};

export default CustomizePage;