// // // src/pages/customize.tsx

// // import React from 'react';
// // import Head from 'next/head';
// // import Link from 'next/link';
// // import Layout from '@/components/layout/Layout';
// // import CustomPackageForm from '@/components/customer/CustomPackageForm';
// // import { Sparkles, Users, Heart, Star, MapPin, CheckCircle, Phone, Mail } from 'lucide-react';
// // import { Button, Card } from '@/components/ui';

// // const CustomizePage: React.FC = () => {
// //   const handleFormSubmit = (data: any) => {
// //     const message = `Hi! I'd like to customize a travel package with the following details:

// // 🏃‍♂️ *Trip Type*: ${data.tripType}
// // 📍 *Destinations*: ${data.destinations.filter((d: string) => d.trim()).join(', ')}
// // 📅 *Travel Dates*: ${data.startDate} to ${data.endDate} (${data.duration} days)
// // 👥 *Travelers*: ${data.totalTravelers} (${data.adults} adults, ${data.children} children)
// // 🎯 *Travel Style*: ${data.travelStyle}
// // 🏨 *Accommodation*: ${data.accommodationType}
// // 💰 *Budget Range*: ${data.budgetRange}
// // ❤️ *Interests*: ${data.interests.join(', ') || 'None'}
// // 🍽️ *Meals*: ${data.meals}
// // 📝 *Special Requests*: ${data.specialRequests || 'None'}

// // *Contact*:
// // 👤 *Name*: ${data.name}
// // 📧 *Email*: ${data.email}
// // 📱 *Phone*: ${data.phone}

// // Please help me plan this perfect trip!`;

// //     const encodedMessage = encodeURIComponent(message);
// //     window.location.href = `https://wa.me/+917006377796?text=${encodedMessage}`;
// //   };

// //   const features = [
// //     {
// //       icon: Sparkles,
// //       title: 'Fully Personalized',
// //       description: 'Tailored to your unique preferences and dreams'
// //     },
// //     {
// //       icon: Users,
// //       title: 'Expert Planning',
// //       description: 'Our travel experts craft your perfect itinerary'
// //     },
// //     {
// //       icon: Heart,
// //       title: 'Flexible Options',
// //       description: 'Adjust your package to fit your vision'
// //     },
// //     {
// //       icon: Star,
// //       title: 'Premium Support',
// //       description: 'Dedicated assistance for your journey'
// //     }
// //   ];

// //   const steps = [
// //     {
// //       step: 1,
// //       title: 'Share Your Vision',
// //       description: 'Tell us your destinations and preferences',
// //       icon: MapPin
// //     },
// //     {
// //       step: 2,
// //       title: 'Expert Crafting',
// //       description: 'We design a personalized itinerary for you',
// //       icon: Users
// //     },
// //     {
// //       step: 3,
// //       title: 'Start Your Journey',
// //       description: 'Review, confirm, and embark on your adventure',
// //       icon: CheckCircle
// //     }
// //   ];

// //   const testimonials = [
// //     {
// //       name: 'Rajesh & Priya',
// //       location: 'Mumbai',
// //       rating: 5,
// //       comment: 'An unforgettable honeymoon in Europe, perfectly planned!',
// //       package: 'Custom Honeymoon'
// //     },
// //     {
// //       name: 'Amit Patel',
// //       location: 'Delhi',
// //       rating: 5,
// //       comment: 'Our family adventure was seamless and fun for all!',
// //       package: 'Family Getaway'
// //     },
// //     {
// //       name: 'Sneha Gupta',
// //       location: 'Bangalore',
// //       rating: 5,
// //       comment: 'A safe and thrilling solo trip, exactly what I wanted!',
// //       package: 'Solo Adventure'
// //     }
// //   ];

// //   return (
// //     <>
// //       <Head>
// //         <title>Design Your Dream Trip | Jai Mata Di Tour & Travels</title>
// //         <meta name="description" content="Create your perfect custom travel package with Jai Mata Di Tour & Travels. Share your vision, and we'll craft a personalized adventure." />
// //         <meta name="keywords" content="custom travel package, personalized travel, tailor-made trips, custom itinerary, travel planning" />
// //       </Head>

// //       <Layout>
// //         {/* Hero Section */}
// //         <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden">
// //           <div className="absolute inset-0 opacity-30">
// //             <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-300 rounded-full animate-pulse mix-blend-screen"></div>
// //             <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
// //             <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
// //           </div>

// //           <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
// //               <div className="text-center lg:text-left">
// //                 <div className="flex justify-center lg:justify-start mb-6">
// //                   <div className="relative">
// //                     <div className="bg-white bg-opacity-30 p-4 rounded-full backdrop-blur-md">
// //                       <Sparkles className="h-14 w-14 text-yellow-200" />
// //                     </div>
// //                     <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
// //                   </div>
// //                 </div>

// //                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
// //                   Craft Your
// //                   <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
// //                     Dream Adventure
// //                   </span>
// //                 </h1>

// //                 <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
// //                   Your journey, your way. Let us turn your travel dreams into reality with a custom package designed just for you.
// //                 </p>

// //                 <Button
// //                   size="lg"
// //                   className="bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-full shadow-2xl hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
// //                   onClick={() => document.getElementById('customize-form')?.scrollIntoView({ behavior: 'smooth' })}
// //                 >
// //                   Plan Your Trip Now
// //                 </Button>
// //               </div>

// //               <div className="relative hidden lg:block">
// //                 <div className="w-80 h-80 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full shadow-2xl mx-auto">
// //                   <div className="absolute inset-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
// //                     <div className="text-center">
// //                       <div className="text-5xl mb-3">✈️</div>
// //                       <h3 className="text-xl font-bold text-gray-800">Your Adventure Awaits</h3>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="absolute top-0 -left-6 bg-blue-400 text-white px-4 py-2 rounded-full shadow-lg animate-bounce">
// //                   <div className="flex items-center">
// //                     <MapPin className="w-5 h-5 mr-2" />
// //                     <span className="text-sm font-semibold">Explore Anywhere</span>
// //                   </div>
// //                 </div>
// //                 <div className="absolute bottom-0 -right-6 bg-pink-400 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
// //                   <div className="flex items-center">
// //                     <Heart className="w-5 h-5 mr-2" />
// //                     <span className="text-sm font-semibold">Tailored for You</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Features Section */}
// //         <section className="py-16 bg-gray-100">
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //             <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">
// //               Why Choose Our Custom Packages?
// //             </h2>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //               {features.map((feature, index) => (
// //                 <Card
// //                   key={index}
// //                   className="p-6 bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
// //                 >
// //                   <feature.icon className="w-10 h-10 text-blue-500 mb-4 mx-auto" />
// //                   <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{feature.title}</h3>
// //                   <p className="text-gray-600 text-center">{feature.description}</p>
// //                 </Card>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* Custom Form Section */}
// //         <section id="customize-form" className="py-16 bg-white">
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //             <div className="text-center mb-12">
// //               <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
// //                 Build Your Perfect Trip
// //               </h2>
// //               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
// //                 Share your travel vision, and our experts will craft a personalized package for you.
// //               </p>
// //             </div>
// //             <CustomPackageForm onSubmit={handleFormSubmit} />
// //           </div>
// //         </section>

// //         {/* Testimonials Section */}
// //         <section className="py-16 bg-gradient-to-r from-blue-50 to-pink-50">
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //             <div className="text-center mb-12">
// //               <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
// //                 Traveler Success Stories
// //               </h2>
// //               <p className="text-lg text-gray-600">
// //                 Hear from travelers who turned their dreams into reality
// //               </p>
// //             </div>
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //               {testimonials.map((testimonial, index) => (
// //                 <Card
// //                   key={index}
// //                   className="p-6 bg-white border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all duration-300"
// //                 >
// //                   <div className="flex justify-center mb-4">
// //                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
// //                       <span className="text-lg font-semibold text-blue-600">
// //                         {testimonial.name.split(' ')[0][0]}{testimonial.name.split(' ')[1]?.[0] || ''}
// //                       </span>
// //                     </div>
// //                   </div>
// //                   <div className="flex justify-center mb-4">
// //                     {[...Array(testimonial.rating)].map((_, i) => (
// //                       <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
// //                     ))}
// //                   </div>
// //                   <p className="text-gray-600 mb-4 italic text-center">"{testimonial.comment}"</p>
// //                   <div className="text-center">
// //                     <div className="font-semibold text-gray-900">{testimonial.name}</div>
// //                     <div className="text-sm text-gray-600">{testimonial.location}</div>
// //                     <div className="text-sm text-blue-600 mt-1">{testimonial.package}</div>
// //                   </div>
// //                 </Card>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* Contact Section */}
// //         <section className="py-16 bg-gray-100">
// //           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
// //             <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
// //               Get in Touch
// //             </h2>
// //             <p className="text-lg text-gray-600 mb-8">
// //               Have questions? Our team is here to help you plan your dream trip.
// //             </p>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// //               <Card className="p-6 bg-white border-2 border-blue-200 hover:border-blue-400 transition-all duration-300">
// //                 <Phone className="w-8 h-8 text-blue-500 mx-auto mb-3" />
// //                 <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
// //                 <p className="text-gray-600">+91-7006377796</p>
// //                 <p className="text-sm text-gray-500">Mon-Sat 9 AM - 8 PM</p>
// //               </Card>
// //               <Card className="p-6 bg-white border-2 border-pink-200 hover:border-pink-400 transition-all duration-300">
// //                 <Mail className="w-8 h-8 text-pink-500 mx-auto mb-3" />
// //                 <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
// //                 <p className="text-gray-600">custom@jaimataditravels.com</p>
// //                 <p className="text-sm text-gray-500">Response within 4 hours</p>
// //               </Card>
// //             </div>
// //             <a href="tel:+917006377796">
// //               <Button size="lg" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300">
// //                 <Phone className="w-5 h-5 mr-2" />
// //                 Contact Now
// //               </Button>
// //             </a>
// //           </div>
// //         </section>

// //       </Layout>
// //     </>
// //   );
// // };

// // export default CustomizePage;

// // src/pages/customize.tsx

// import React from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import Layout from '@/components/layout/Layout';
// import Footer from '@/components/layout/Footer';
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

//         {/* Explicitly add Footer */}
//         <Footer />
//       </Layout>
//     </>
//   );
// };

// export default CustomizePage;








// import React from "react";
// import Head from "next/head";
// import Link from "next/link";
// import Layout from "@/components/layout/Layout";
// import Footer from "@/components/layout/Footer";
// import CustomPackageForm from "@/components/customer/CustomPackageForm";
// import {
//   Sparkles,
//   Users,
//   Heart,
//   Star,
//   MapPin,
//   CheckCircle,
//   Phone,
//   Mail,
//   Award,
//   Shield,
//   Clock,
//   Compass,
// } from "lucide-react";
// import { Button, Card, Input } from "@/components/ui";

// const CustomizePage: React.FC = () => {
//   const handleFormSubmit = (data: any) => {
//     const message = `Hi! I'd like to customize a travel package with the following details:

// 🏃‍♂ Trip Type: ${data.tripType}
// 📍 Destinations: ${data.destinations.filter((d: string) => d.trim()).join(", ")}
// 📅 Travel Dates: ${data.startDate} to ${data.endDate} (${data.duration} days)
// 👥 Travelers: ${data.totalTravelers} (${data.adults} adults, ${
//       data.children
//     } children)
// 🎯 Travel Style: ${data.travelStyle}
// 🏨 Accommodation: ${data.accommodationType}
// 💰 Budget Range: ${data.budgetRange}
// ❤ Interests: ${data.interests.join(", ") || "None"}
// 🍽 Meals: ${data.meals}
// 📝 Special Requests: ${data.specialRequests || "None"}

// Contact:
// 👤 Name: ${data.name}
// 📧 Email: ${data.email}
// 📱 Phone: ${data.phone}

// Please help me plan this perfect trip!`;

//     const encodedMessage = encodeURIComponent(message);
//     window.location.href = `https://wa.me/+917006377796?text=${encodedMessage}`;
//   };

//   const features = [
//     {
//       icon: Sparkles,
//       title: "Fully Personalized",
//       description:
//         "Every detail crafted to match your unique travel preferences and desires",
//       color: "from-blue-500 to-blue-600",
//       bgColor: "bg-blue-50",
//       iconBg: "bg-blue-100",
//     },
//     {
//       icon: Users,
//       title: "Expert Planning",
//       description:
//         "Experienced travel consultants design your perfect itinerary",
//       color: "from-purple-500 to-purple-600",
//       bgColor: "bg-purple-50",
//       iconBg: "bg-purple-100",
//     },
//     {
//       icon: Shield,
//       title: "Secure & Safe",
//       description: "IATA certified with comprehensive travel insurance options",
//       color: "from-green-500 to-green-600",
//       bgColor: "bg-green-50",
//       iconBg: "bg-green-100",
//     },
//     {
//       icon: Award,
//       title: "24/7 Support",
//       description: "Round-the-clock assistance throughout your entire journey",
//       color: "from-orange-500 to-orange-600",
//       bgColor: "bg-orange-50",
//       iconBg: "bg-orange-100",
//     },
//   ];

//   const steps = [
//     {
//       step: 1,
//       title: "Share Your Vision",
//       description:
//         "Tell us your dream destinations, travel dates, and preferences through our detailed form",
//       icon: Compass,
//       color: "text-blue-600",
//       bgColor: "bg-blue-100",
//     },
//     {
//       step: 2,
//       title: "Expert Crafting",
//       description:
//         "Our travel specialists design a personalized itinerary tailored to your needs",
//       icon: Users,
//       color: "text-purple-600",
//       bgColor: "bg-purple-100",
//     },
//     {
//       step: 3,
//       title: "Review & Refine",
//       description:
//         "Collaborate with us to perfect every detail until it matches your vision",
//       icon: Clock,
//       color: "text-green-600",
//       bgColor: "bg-green-100",
//     },
//     {
//       step: 4,
//       title: "Begin Adventure",
//       description:
//         "Confirm your booking and embark on your perfectly planned journey",
//       icon: CheckCircle,
//       color: "text-orange-600",
//       bgColor: "bg-orange-100",
//     },
//   ];

//   const testimonials = [
//     {
//       name: "Rajesh & Priya Sharma",
//       location: "Mumbai, Maharashtra",
//       rating: 5,
//       comment:
//         "An absolutely unforgettable honeymoon in Europe. Every detail was perfectly planned and executed. The team went above and beyond our expectations!",
//       package: "Custom Honeymoon Package",
//       avatar: "RS",
//     },
//     {
//       name: "Amit Patel",
//       location: "Delhi, NCR",
//       rating: 5,
//       comment:
//         "Our family adventure to Southeast Asia was seamless and enjoyable for all ages. The itinerary perfectly balanced adventure with relaxation.",
//       package: "Family Adventure Package",
//       avatar: "AP",
//     },
//     {
//       name: "Sneha Gupta",
//       location: "Bangalore, Karnataka",
//       rating: 5,
//       comment:
//         "As a solo female traveler, I felt completely safe and supported. The destinations were incredible and the local guides were exceptional.",
//       package: "Solo Explorer Package",
//       avatar: "SG",
//     },
//   ];

//   return (
//     <>
//       <Head>
//         <title>Design Your Dream Trip | TravelQuench</title>
//         <meta
//           name="description"
//           content="Create your perfect custom travel package with Jai Mata Di Tour & Travels. Share your vision, and we'll craft a personalized adventure."
//         />
//         <meta
//           name="keywords"
//           content="custom travel package, personalized travel, tailor-made trips, custom itinerary, travel planning"
//         />
//       </Head>

//       <Layout>
//         <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16 sm:py-20 lg:py-28 overflow-hidden">
//           {/* Background Image with Overlay */}
//           <div className="absolute inset-0">
//             <div
//               className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
//               style={{
//                 backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
//               }}
//             ></div>
//             <div className="absolute inset-0 bg-black/50"></div>
//           </div>

//           {/* Animated Background Elements */}
//           <div className="absolute inset-0 opacity-20">
//             <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
//             <div
//               className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-purple-600 rounded-full blur-3xl animate-pulse"
//               style={{ animationDelay: "1.2s" }}
//             ></div>
//             <div
//               className="absolute top-3/4 left-3/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-teal-500 rounded-full blur-3xl animate-pulse"
//               style={{ animationDelay: "2s" }}
//             ></div>
//           </div>

//           <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center max-w-4xl mx-auto">
//               <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 mt-16 sm:mt-20 lg:mt-24 mb-6 sm:mb-8 transform hover:scale-105 transition-transform duration-300">
//                 <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 mr-2 sm:mr-3 animate-pulse" />
//                 <span className="text-sm sm:text-base font-semibold text-white">
//                   Trusted by 12,000+ Travelers
//                 </span>
//               </div>

//               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6 sm:mb-8 tracking-tight">
//                 Craft Your
//                 <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent mt-2 sm:mt-3">
//                   Unforgettable Journey
//                 </span>
//               </h1>

//               <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto font-light px-4">
//                 Turn your travel dreams into reality with bespoke, handcrafted
//                 travel experiences tailored just for you.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
//                 <Button
//                   size="lg"
//                   className="w-full sm:w-auto bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white font-semibold px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-2xl hover:shadow-pink-500/40 hover:scale-105 transition-all duration-500 text-base sm:text-lg group"
//                   onClick={() =>
//                     document
//                       .getElementById("customize-form")
//                       ?.scrollIntoView({ behavior: "smooth" })
//                   }
//                 >
//                   Plan Your Adventure
//                   <Compass className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 group-hover:rotate-45 transition-transform duration-300" />
//                 </Button>

//                 <a
//                   href="tel:+917006377796"
//                   className="flex items-center text-slate-200 hover:text-yellow-300 transition-colors duration-300 group"
//                 >
//                   <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:animate-bounce" />
//                   <span className="font-semibold text-base sm:text-lg">
//                     +91-7006377796
//                   </span>
//                 </a>
//               </div>

//               {/* Enhanced Stats with Animation - Responsive Grid */}
//               <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 mt-12 sm:mt-16 max-w-3xl mx-auto">
//                 <div className="text-center transform hover:scale-110 transition-transform duration-300">
//                   <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-yellow-400 mb-1 sm:mb-2">
//                     12K+
//                   </div>
//                   <div className="text-xs sm:text-sm text-slate-300 font-medium">
//                     Happy Travelers
//                   </div>
//                 </div>
//                 <div className="text-center transform hover:scale-110 transition-transform duration-300">
//                   <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-400 mb-1 sm:mb-2">
//                     60+
//                   </div>
//                   <div className="text-xs sm:text-sm text-slate-300 font-medium">
//                     Destinations
//                   </div>
//                 </div>
//                 <div className="text-center transform hover:scale-110 transition-transform duration-300">
//                   <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-400 mb-1 sm:mb-2">
//                     18+
//                   </div>
//                   <div className="text-xs sm:text-sm text-slate-300 font-medium">
//                     Years Experience
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* How It Works Section - Responsive */}
//         <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-12 sm:mb-16">
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
//                 How It Works
//               </h2>
//               <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
//                 Our streamlined process ensures your dream trip comes together
//                 seamlessly, from initial consultation to final departure.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//               {steps.map((step, index) => (
//                 <div key={index} className="relative">
//                   {/* Connection Line - Only show on large screens */}
//                   {index < steps.length - 1 && (
//                     <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent z-0"></div>
//                   )}
//                   <div className="relative z-10 text-center">
//                     <div
//                       className={`w-20 h-20 sm:w-24 sm:h-24 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg`}
//                     >
//                       <step.icon
//                         className={`w-8 h-8 sm:w-10 sm:h-10 ${step.color}`}
//                       />
//                     </div>
//                     <div
//                       className={`inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 ${step.bgColor} ${step.color} rounded-full text-sm font-bold mb-3 sm:mb-4`}
//                     >
//                       {step.step}
//                     </div>
//                     <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 px-2">
//                       {step.title}
//                     </h3>
//                     <p className="text-sm sm:text-base text-slate-600 leading-relaxed px-2">
//                       {step.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Custom Form Section - Responsive */}
//         <section
//           id="customize-form"
//           className="py-12 sm:py-16 lg:py-20 bg-white"
//         >
//           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-12 sm:mb-16">
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
//                 Design Your Perfect Journey
//               </h2>
//               <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
//                 Share your travel vision with us, and our expert team will craft
//                 a personalized itinerary that exceeds your expectations.
//               </p>
//             </div>
//             <div className="bg-slate-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-xl border border-slate-200">
//               <CustomPackageForm onSubmit={handleFormSubmit} />
//             </div>
//           </div>
//         </section>

//         {/* Features Section - Responsive */}
//         <section className="py-12 sm:py-16 lg:py-20 bg-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-12 sm:mb-16">
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
//                 Why Choose Our Custom Packages?
//               </h2>
//               <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
//                 Experience the difference with our personalized approach to
//                 travel planning, backed by years of expertise and unwavering
//                 commitment to excellence.
//               </p>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//               {features.map((feature, index) => (
//                 <div
//                   key={index}
//                   className={`group relative p-6 sm:p-8 rounded-2xl ${feature.bgColor} border border-slate-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
//                 >
//                   <div
//                     className={`w-12 h-12 sm:w-16 sm:h-16 ${feature.iconBg} rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
//                   >
//                     <feature.icon
//                       className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
//                     />
//                   </div>
//                   <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
//                     {feature.title}
//                   </h3>
//                   <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
//                     {feature.description}
//                   </p>
//                   <div
//                     className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
//                   ></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Contact Section - Responsive */}
//         <section className="py-12 sm:py-16 lg:py-20 bg-white">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-12 sm:mb-16">
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
//                 Ready to Start Planning?
//               </h2>
//               <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
//                 Get in touch with our travel experts today. We're here to answer
//                 your questions and help bring your dream trip to life.
//               </p>
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-200 hover:shadow-xl transition-all duration-300">
//                 <div className="text-center">
//                   <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
//                     <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
//                   </div>
//                   <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
//                     Call Our Experts
//                   </h3>
//                   <p className="text-base sm:text-lg font-semibold text-blue-600 mb-2">
//                     +91-7006377796
//                   </p>
//                   <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
//                     Monday - Saturday: 9:00 AM - 8:00 PM
//                   </p>
//                   <a href="tel:+917006377796">
//                     <Button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300">
//                       Call Now
//                     </Button>
//                   </a>
//                 </div>
//               </div>
//               <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 border border-purple-200 hover:shadow-xl transition-all duration-300">
//                 <div className="text-center">
//                   <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
//                     <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
//                   </div>
//                   <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
//                     Email Us
//                   </h3>
//                   <p className="text-base sm:text-lg font-semibold text-purple-600 mb-2">
//                     custom@jaimataditravels.com
//                   </p>
//                   <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
//                     We respond within 4 hours
//                   </p>
//                   <a href="mailto:custom@jaimataditravels.com">
//                     <Button className="w-full sm:w-auto bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-all duration-300">
//                       Send Email
//                     </Button>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <Footer />
//       </Layout>
//     </>
//   );
// };

// export default CustomizePage;














import React from "react";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import Footer from "@/components/layout/Footer";
import CustomPackageForm from "@/components/customer/CustomPackageForm";
import {
  Sparkles,
  Users,
  CheckCircle,
  Phone,
  Mail,
  Award,
  Shield,
  Clock,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui";

// Define proper types for form data - matching CustomPackageForm's interface
interface CustomPackageData {
  tripType: 'domestic' | 'international';
  destinations: { city: string; days: number; budget: string }[];
  startDate: string;
  endDate: string;
  duration: number;
  flexibility: string;
  adults: number;
  children: number;
  infants: number;
  totalTravelers: number;
  specialNeeds: string[];
  totalBudget: string;
  budgetBreakdown: {
    accommodation: string;
    transport: string;
    food: string;
    activities: string;
    shopping: string;
    miscellaneous: string;
  };
  budgetFlexibility: string;
  transportMode: string[];
  flightClass: string;
  localTransport: string[];
  selfDrive: boolean;
  accommodationType: string[];
  roomType: string;
  amenities: string[];
  locationPreference: string;
  interests: string[];
  activityLevel: string;
  mustDoActivities: string;
  avoidActivities: string;
  mealPreferences: string[];
  dietaryRestrictions: string[];
  diningStyle: string[];
  localCuisine: boolean;
  travelStyle: string;
  pacePreference: string;
  groupDynamic: string;
  itineraryStyle: string;
  freeTimeRatio: string;
  culturalImmersion: string;
  photographyFocus: boolean;
  bookingPreference: string;
  guidePreference: string;
  languageSupport: string[];
  travelInsurance: boolean;
  visaSupport: boolean;
  occasion: string;
  specialRequests: string;
  name: string;
  email: string;
  phone: string;
  preferredContact: string;
  additionalNotes: string;
}

const CustomizePage: React.FC = () => {
  const handleFormSubmit = (data: CustomPackageData) => {
    const destinations = data.destinations
      .filter(d => d.city.trim())
      .map(d => `${d.city} (${d.days} days)`)
      .join(", ") || "Not specified";

    const message = `Hi! I'd like to customize a travel package with the following details:

🏃‍♂ Trip Type: ${data.tripType.charAt(0).toUpperCase() + data.tripType.slice(1)}
📍 Destinations: ${destinations}
📅 Travel Dates: ${data.startDate || 'TBD'} to ${data.endDate || 'TBD'} (${data.duration} days)
👥 Travelers: ${data.totalTravelers} (${data.adults} adults, ${data.children} children, ${data.infants} infants)
🎯 Travel Style: ${data.travelStyle || 'TBD'}
🏨 Accommodation: ${data.accommodationType.join(", ") || 'TBD'}
💰 Budget Range: ${data.totalBudget || 'TBD'}
❤ Interests: ${data.interests.join(", ") || "Open to suggestions"}
🍽 Meals: ${data.mealPreferences.join(", ") || "No specific preferences"}
📝 Special Requests: ${data.specialRequests || "None"}

Contact:
👤 Name: ${data.name || 'Not provided'}
📧 Email: ${data.email || 'Not provided'}
📱 Phone: ${data.phone || 'Not provided'}

Please help me plan this perfect trip!`;

    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/+917006377796?text=${encodedMessage}`;
  };

  const features = [
    {
      icon: Sparkles,
      title: "Fully Personalized",
      description:
        "Every detail crafted to match your unique travel preferences and desires",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
    },
    {
      icon: Users,
      title: "Expert Planning",
      description:
        "Experienced travel consultants design your perfect itinerary",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "IATA certified with comprehensive travel insurance options",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      icon: Award,
      title: "24/7 Support",
      description: "Round-the-clock assistance throughout your entire journey",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
    },
  ];

  const steps = [
    {
      step: 1,
      title: "Share Your Vision",
      description:
        "Tell us your dream destinations, travel dates, and preferences through our detailed form",
      icon: Compass,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      step: 2,
      title: "Expert Crafting",
      description:
        "Our travel specialists design a personalized itinerary tailored to your needs",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      step: 3,
      title: "Review & Refine",
      description:
        "Collaborate with us to perfect every detail until it matches your vision",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      step: 4,
      title: "Begin Adventure",
      description:
        "Confirm your booking and embark on your perfectly planned journey",
      icon: CheckCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <>
      <Head>
        <title>Design Your Dream Trip | TravelQuench</title>
        <meta
          name="description"
          content="Create your perfect custom travel package with Jai Mata Di Tour & Travels. Share your vision, and we&apos;ll craft a personalized adventure."
        />
        <meta
          name="keywords"
          content="custom travel package, personalized travel, tailor-made trips, custom itinerary, travel planning"
        />
      </Head>

      <Layout>
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16 sm:py-20 lg:py-28 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-purple-600 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1.2s" }}
            ></div>
            <div
              className="absolute top-3/4 left-3/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-teal-500 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/15 backdrop-blur-lg border border-white/30 mt-16 sm:mt-20 lg:mt-24 mb-6 sm:mb-8 transform hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 mr-2 sm:mr-3 animate-pulse" />
                <span className="text-sm sm:text-base font-semibold text-white">
                  Trusted by 12,000+ Travelers
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6 sm:mb-8 tracking-tight">
                Craft Your
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent mt-2 sm:mt-3">
                  Unforgettable Journey
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto font-light px-4">
                Turn your travel dreams into reality with bespoke, handcrafted
                travel experiences tailored just for you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white font-semibold px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-2xl hover:shadow-pink-500/40 hover:scale-105 transition-all duration-500 text-base sm:text-lg group"
                  onClick={() =>
                    document
                      .getElementById("customize-form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Plan Your Adventure
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 group-hover:rotate-45 transition-transform duration-300" />
                </Button>

                <a
                  href="tel:+917006377796"
                  className="flex items-center text-slate-200 hover:text-yellow-300 transition-colors duration-300 group"
                >
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:animate-bounce" />
                  <span className="font-semibold text-base sm:text-lg">
                    +91-7006377796
                  </span>
                </a>
              </div>

              {/* Enhanced Stats with Animation - Responsive Grid */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12 mt-12 sm:mt-16 max-w-3xl mx-auto">
                <div className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-yellow-400 mb-1 sm:mb-2">
                    12K+
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium">
                    Happy Travelers
                  </div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-400 mb-1 sm:mb-2">
                    60+
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium">
                    Destinations
                  </div>
                </div>
                <div className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-400 mb-1 sm:mb-2">
                    18+
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium">
                    Years Experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section - Responsive */}
        <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                How It Works
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
                Our streamlined process ensures your dream trip comes together
                seamlessly, from initial consultation to final departure.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connection Line - Only show on large screens */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent z-0"></div>
                  )}
                  <div className="relative z-10 text-center">
                    <div
                      className={`w-20 h-20 sm:w-24 sm:h-24 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg`}
                    >
                      <step.icon
                        className={`w-8 h-8 sm:w-10 sm:h-10 ${step.color}`}
                      />
                    </div>
                    <div
                      className={`inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 ${step.bgColor} ${step.color} rounded-full text-sm font-bold mb-3 sm:mb-4`}
                    >
                      {step.step}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 px-2">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed px-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Form Section - Responsive */}
        <section
          id="customize-form"
          className="py-12 sm:py-16 lg:py-20 bg-white"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                Design Your Perfect Journey
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
                Share your travel vision with us, and our expert team will craft
                a personalized itinerary that exceeds your expectations.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-xl border border-slate-200">
              <CustomPackageForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        </section>

        {/* Features Section - Responsive */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                Why Choose Our Custom Packages?
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
                Experience the difference with our personalized approach to
                travel planning, backed by years of expertise and unwavering
                commitment to excellence.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative p-6 sm:p-8 rounded-2xl ${feature.bgColor} border border-slate-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
                >
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 ${feature.iconBg} rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon
                      className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - Responsive */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                Ready to Start Planning?
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto px-4">
                Get in touch with our travel experts today. We&apos;re here to answer
                your questions and help bring your dream trip to life.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-200 hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
                    Call Our Experts
                  </h3>
                  <p className="text-base sm:text-lg font-semibold text-blue-600 mb-2">
                    +91-7006377796
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
                    Monday - Saturday: 9:00 AM - 8:00 PM
                  </p>
                  <a href="tel:+917006377796">
                    <Button className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300">
                      Call Now
                    </Button>
                  </a>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 border border-purple-200 hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
                    Email Us
                  </h3>
                  <p className="text-base sm:text-lg font-semibold text-purple-600 mb-2">
                    custom@jaimataditravels.com
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
                    We respond within 4 hours
                  </p>
                  <a href="mailto:custom@jaimataditravels.com">
                    <Button className="w-full sm:w-auto bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-all duration-300">
                      Send Email
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </Layout>
    </>
  );
};

export default CustomizePage;
