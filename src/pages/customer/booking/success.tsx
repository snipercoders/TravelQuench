// // src/pages/customer/booking/success.tsx
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import Image from 'next/image';
// import Layout from '@/components/layout/Layout';
// import { useRequireAuth } from '@/hooks/useAuth';
// import { Button, Card } from '@/components/ui';
// import {
//   CheckCircle,
//   Download,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   Users,
//   Clock,
//   Share2,
//   MessageCircle,
//   Home,
//   Receipt,
//   CreditCard,
//   AlertCircle
// } from 'lucide-react';

// interface BookingDetails {
//   _id: string;
//   bookingId: string;
//   packageId: string;
//   packageDetails: {
//     title: string;
//     destination: string;
//     duration: number;
//     type: 'domestic' | 'international';
//   };
//   travelDate: string;
//   travelers: {
//     adults: number;
//     children: number;
//   };
//   totalAmount: number;
//   paymentId: string;
//   paymentMethod: string;
//   paymentStatus: string;
//   paidAt: string;
//   status: string;
//   customerInfo: {
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
//     emergencyContact: string;
//   };
//   package: {
//     _id: string;
//     title: string;
//     destination: string;
//     duration: number;
//     price: number;
//     thumbnail: string;
//     type: 'domestic' | 'international';
//     description?: string;
//   };
// }

// const SuccessPage: React.FC = () => {
//   const { user, isLoading } = useRequireAuth();
//   const router = useRouter();
//   const { bookingId, paymentId } = router.query;
  
//   const [booking, setBooking] = useState<BookingDetails | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string>('');

//   useEffect(() => {
//     if (bookingId && typeof bookingId === 'string') {
//       fetchBookingDetails(bookingId);
//     }
//   }, [bookingId]);

//   const fetchBookingDetails = async (id: string) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`/api/bookings/${id}`, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           // Populate the package details from the booking
//           const bookingData = {
//             ...data.booking,
//             package: {
//               _id: data.booking.packageId,
//               title: data.booking.packageDetails.title,
//               destination: data.booking.packageDetails.destination,
//               duration: data.booking.packageDetails.duration,
//               price: data.booking.totalAmount / (data.booking.travelers.adults + (data.booking.travelers.children * 0.7)),
//               thumbnail: '/images/placeholder-package.jpg', // You might want to store this in booking
//               type: data.booking.packageDetails.type
//             }
//           };
//           setBooking(bookingData);
//         } else {
//           setError('Booking not found');
//         }
//       } else {
//         setError('Failed to load booking details');
//       }
//     } catch (err) {
//       setError('Network error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadBookingPDF = async () => {
//     if (!booking) return;
    
//     try {
//       const response = await fetch(`/api/bookings/${booking._id}/pdf`, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
      
//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `booking-${booking._id.slice(-8).toUpperCase()}.pdf`;
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//       }
//     } catch (error) {
//       console.error('Failed to download PDF:', error);
//     }
//   };

//   const shareBooking = async () => {
//     if (!booking) return;
    
//     const shareData = {
//       title: `My Trip to ${booking.package.destination}`,
//       text: `I just booked an amazing ${booking.package.duration}-day trip to ${booking.package.destination} with Travel Quench!`,
//       url: window.location.origin + `/packages/${booking.package._id}`
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         console.log('Error sharing:', err);
//       }
//     } else {
//       // Fallback for browsers without Web Share API
//       const url = encodeURIComponent(shareData.url);
//       const text = encodeURIComponent(shareData.text);
//       window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
//     }
//   };

//   const sendWhatsAppMessage = () => {
//     const message = `Hi! I just booked a trip to ${booking?.packageDetails.destination} (Booking ID: ${booking?.bookingId}). Looking forward to my travel!`;
//     const encodedMessage = encodeURIComponent(message);
//     window.open(`https://wa.me/911234567890?text=${encodedMessage}`, '_blank');
//   };

//   if (isLoading || loading) {
//     return (
//       <Layout title="Loading...">
//         <div className="min-h-screen flex items-center justify-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
//         </div>
//       </Layout>
//     );
//   }

//   if (error || !booking) {
//     return (
//       <Layout title="Error">
//         <div className="min-h-screen flex items-center justify-center">
//           <div className="text-center">
//             <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
//             <p className="text-gray-600 mb-4">{error || 'The booking details could not be loaded.'}</p>
//             <Button onClick={() => router.push('/customer/bookings')}>
//               View My Bookings
//             </Button>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title="Booking Confirmed">
//       <Head>
//         <title>Booking Confirmed - {booking.package.title} - Travel Quench</title>
//         <meta name="description" content="Your booking has been confirmed successfully" />
//       </Head>

//       <div className="bg-gray-50 min-h-screen">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Success Header */}
//           <div className="text-center mb-8">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <CheckCircle className="w-12 h-12 text-green-500" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
//             <p className="text-lg text-gray-600">
//               Your payment has been processed successfully. Get ready for an amazing trip!
//             </p>
//           </div>

//           {/* Booking Summary */}
//           <Card className="p-8 mb-6">
//             <div className="flex items-start justify-between mb-6">
//               <div>
//                 <h2 className="text-2xl font-semibold text-gray-900 mb-2">{booking.packageDetails.title}</h2>
//                 <div className="flex items-center text-gray-600 space-x-4">
//                   <div className="flex items-center">
//                     <MapPin className="w-4 h-4 mr-1" />
//                     {booking.packageDetails.destination}
//                   </div>
//                   <div className="flex items-center">
//                     <Clock className="w-4 h-4 mr-1" />
//                     {booking.packageDetails.duration} days
//                   </div>
//                   <div className="flex items-center">
//                     <Calendar className="w-4 h-4 mr-1" />
//                     {new Date(booking.travelDate).toLocaleDateString()}
//                   </div>
//                 </div>
//               </div>
//               <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
//                 <Image
//                   src={booking.package.thumbnail || '/images/placeholder-package.jpg'}
//                   alt={booking.packageDetails.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Booking Details */}
//               <div>
//                 <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Booking ID:</span>
//                     <span className="font-medium">{booking.bookingId}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Travel Date:</span>
//                     <span className="font-medium">{new Date(booking.travelDate).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Travelers:</span>
//                     <span className="font-medium">
//                       {booking.travelers.adults} Adult{booking.travelers.adults !== 1 ? 's' : ''}
//                       {booking.travelers.children > 0 && `, ${booking.travelers.children} Child${booking.travelers.children !== 1 ? 'ren' : ''}`}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Status:</span>
//                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                       Confirmed
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Payment Details */}
//               <div>
//                 <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Payment ID:</span>
//                     <span className="font-medium">{booking.paymentId}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Amount Paid:</span>
//                     <span className="font-medium">₹{booking.totalAmount.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Payment Method:</span>
//                     <span className="font-medium capitalize">{booking.paymentMethod}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Payment Date:</span>
//                     <span className="font-medium">{new Date(booking.paidAt).toLocaleDateString()}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Card>

//           {/* Contact Information */}
//           <Card className="p-6 mb-6">
//             <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-600">Name</label>
//                 <p className="font-medium">{booking.customerInfo.name}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-600">Email</label>
//                 <p className="font-medium">{booking.customerInfo.email}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-600">Phone</label>
//                 <p className="font-medium">{booking.customerInfo.phone}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
//                 <p className="font-medium">{booking.customerInfo.emergencyContact || 'Not provided'}</p>
//               </div>
//             </div>
//           </Card>

//           {/* Action Buttons */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <Button
//               onClick={downloadBookingPDF}
//               variant="outline"
//               className="flex items-center justify-center"
//             >
//               <Download className="w-4 h-4 mr-2" />
//               Download PDF
//             </Button>
//             <Button
//               onClick={shareBooking}
//               variant="outline"
//               className="flex items-center justify-center"
//             >
//               <Share2 className="w-4 h-4 mr-2" />
//               Share
//             </Button>
//             <Button
//               onClick={sendWhatsAppMessage}
//               variant="outline"
//               className="flex items-center justify-center"
//             >
//               <MessageCircle className="w-4 h-4 mr-2" />
//               WhatsApp
//             </Button>
//             <Button
//               onClick={() => router.push('/customer/bookings')}
//               className="flex items-center justify-center"
//             >
//               <Receipt className="w-4 h-4 mr-2" />
//               My Bookings
//             </Button>
//           </div>

//           {/* What's Next */}
//           <Card className="p-6 mb-6">
//             <h3 className="font-semibold text-gray-900 mb-4">What's Next?</h3>
//             <div className="space-y-4">
//               <div className="flex items-start">
//                 <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
//                 <div>
//                   <h4 className="font-medium">Confirmation Email Sent</h4>
//                   <p className="text-sm text-gray-600">Check your email for detailed booking confirmation and itinerary.</p>
//                 </div>
//               </div>
//               <div className="flex items-start">
//                 <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
//                 <div>
//                   <h4 className="font-medium">Travel Documents</h4>
//                   <p className="text-sm text-gray-600">Ensure your passport/ID and required documents are ready for travel.</p>
//                 </div>
//               </div>
//               <div className="flex items-start">
//                 <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
//                 <div>
//                   <h4 className="font-medium">Pre-Travel Contact</h4>
//                   <p className="text-sm text-gray-600">Our team will contact you 48 hours before departure with final details.</p>
//                 </div>
//               </div>
//             </div>
//           </Card>

//           {/* Support Information */}
//           <Card className="p-6 bg-blue-50 border-blue-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="font-semibold text-blue-900 mb-2">Need Assistance?</h3>
//                 <p className="text-blue-700 mb-4">Our 24/7 customer support team is here to help you.</p>
//                 <div className="flex items-center space-x-6">
//                   <div className="flex items-center text-blue-700">
//                     <Phone className="w-4 h-4 mr-2" />
//                     <span className="font-medium">+91 12345 67890</span>
//                   </div>
//                   <div className="flex items-center text-blue-700">
//                     <Mail className="w-4 h-4 mr-2" />
//                     <span className="font-medium">support@travelquench.com</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex space-x-3">
//                 <Button
//                   onClick={() => router.push('/')}
//                   variant="outline"
//                   className="border-blue-300 text-blue-700 hover:bg-blue-100"
//                 >
//                   <Home className="w-4 h-4 mr-2" />
//                   Home
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default SuccessPage;













// src/pages/customer/booking/success.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { useRequireAuth } from '@/hooks/useAuth';
import { Button, Card } from '@/components/ui';
import {
  CheckCircle,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Share2,
  MessageCircle,
  Home,
  Receipt,
  AlertCircle
} from 'lucide-react';

interface BookingDetails {
  _id: string;
  bookingId: string;
  packageId: string;
  packageDetails: {
    title: string;
    destination: string;
    duration: number;
    type: 'domestic' | 'international';
  };
  travelDate: string;
  travelers: {
    adults: number;
    children: number;
  };
  totalAmount: number;
  paymentId: string;
  paymentMethod: string;
  paymentStatus: string;
  paidAt: string;
  status: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    emergencyContact: string;
  };
  package: {
    _id: string;
    title: string;
    destination: string;
    duration: number;
    price: number;
    thumbnail: string;
    type: 'domestic' | 'international';
    description?: string;
  };
}

const SuccessPage: React.FC = () => {
  const { isLoading } = useRequireAuth();
  const router = useRouter();
  const { bookingId } = router.query;
  
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (bookingId && typeof bookingId === 'string') {
      fetchBookingDetails(bookingId);
    }
  }, [bookingId]);

  const fetchBookingDetails = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/bookings/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const bookingData = {
            ...data.booking,
            package: {
              _id: data.booking.packageId,
              title: data.booking.packageDetails.title,
              destination: data.booking.packageDetails.destination,
              duration: data.booking.packageDetails.duration,
              price: data.booking.totalAmount / (data.booking.travelers.adults + (data.booking.travelers.children * 0.7)),
              thumbnail: '/images/placeholder-package.jpg',
              type: data.booking.packageDetails.type
            }
          };
          setBooking(bookingData);
        } else {
          setError('Booking not found');
        }
      } else {
        setError('Failed to load booking details');
      }
    } catch {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const downloadBookingPDF = async () => {
    if (!booking) return;
    
    try {
      const response = await fetch(`/api/bookings/${booking._id}/pdf`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `booking-${booking._id.slice(-8).toUpperCase()}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Failed to download PDF:', error);
    }
  };

  const shareBooking = async () => {
    if (!booking) return;
    
    const shareData = {
      title: `My Trip to ${booking.package.destination}`,
      text: `I just booked an amazing ${booking.package.duration}-day trip to ${booking.package.destination} with Travel Quench!`,
      url: window.location.origin + `/packages/${booking.package._id}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Silently handle error
      }
    } else {
      const url = encodeURIComponent(shareData.url);
      const text = encodeURIComponent(shareData.text);
      window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
    }
  };

  const sendWhatsAppMessage = () => {
    const message = `Hi! I&apos;m just booked a trip to ${booking?.packageDetails.destination} (Booking ID: ${booking?.bookingId}). Looking forward to my travel!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/911234567890?text=${encodedMessage}`, '_blank');
  };

  if (isLoading || loading) {
    return (
      <Layout title="Loading...">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-primary-500"></div>
        </div>
      </Layout>
    );
  }

  if (error || !booking) {
    return (
      <Layout title="Error">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-red-500 mx-auto mb-3" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">{error || 'The booking details could not be loaded.'}</p>
            <Button onClick={() => router.push('/customer/bookings')} className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3">
              View My Bookings
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Booking Confirmed">
      <Head>
        <title>Booking Confirmed - {booking.package.title} - Travel Quench</title>
        <meta name="description" content="Your booking has been confirmed successfully" />
      </Head>

      <div className="bg-gray-50 min-h-screen pt-6 sm:pt-8 md:pt-12">
        <div className="max-w-full sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Success Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="mt-8 sm:mt-4 md:mt-6 w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
            </div>
            <h1 className="mt-4 sm:mt-0 text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Your payment has been processed successfully. Get ready for an amazing trip!
            </p>
          </div>

          {/* Booking Summary */}
          <Card className="p-3 sm:p-4 mb-3 sm:mb-4">
            <div className="flex flex-col sm:items-start sm:justify-between mb-3 sm:mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">{booking.packageDetails.title}</h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {booking.packageDetails.destination}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {booking.packageDetails.duration} days
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {new Date(booking.travelDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="relative w-full h-40 sm:h-20 sm:w-20 rounded-lg overflow-hidden flex-shrink-0 mt-3 sm:mt-0">
                <Image
                  src={booking.package.thumbnail || '/images/placeholder-package.jpg'}
                  alt={booking.packageDetails.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 80px"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Booking Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Booking Details</h3>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-medium">{booking.bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Travel Date:</span>
                    <span className="font-medium">{new Date(booking.travelDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Travelers:</span>
                    <span className="font-medium">
                      {booking.travelers.adults} Adult{booking.travelers.adults !== 1 ? 's' : ''}
                      {booking.travelers.children > 0 && `, ${booking.travelers.children} Child${booking.travelers.children !== 1 ? 'ren' : ''}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Payment Details</h3>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment ID:</span>
                    <span className="font-medium">{booking.paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="font-medium">₹{booking.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium capitalize">{booking.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Date:</span>
                    <span className="font-medium">{new Date(booking.paidAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-3 sm:p-4 mb-3 sm:mb-4">
            <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Contact Information</h3>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600">Name</label>
                <p className="font-medium text-xs sm:text-sm">{booking.customerInfo.name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Email</label>
                <p className="font-medium text-xs sm:text-sm">{booking.customerInfo.email}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Phone</label>
                <p className="font-medium text-xs sm:text-sm">{booking.customerInfo.phone}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Emergency Contact</label>
                <p className="font-medium text-xs sm:text-sm">{booking.customerInfo.emergencyContact || 'Not provided'}</p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Button
              onClick={downloadBookingPDF}
              variant="outline"
              className="w-full flex items-center justify-center text-xs sm:text-sm py-2 sm:py-2.5"
              aria-label="Download booking PDF"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Download PDF
            </Button>
            <Button
              onClick={shareBooking}
              variant="outline"
              className="w-full flex items-center justify-center text-xs sm:text-sm py-2 sm:py-2.5"
              aria-label="Share booking"
            >
              <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Share
            </Button>
            <Button
              onClick={sendWhatsAppMessage}
              variant="outline"
              className="w-full flex items-center justify-center text-xs sm:text-sm py-2 sm:py-2.5"
              aria-label="Send WhatsApp message"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              WhatsApp
            </Button>
            <Button
              onClick={() => router.push('/customer/bookings')}
              className="w-full flex items-center justify-center text-xs sm:text-sm py-2 sm:py-2.5"
              aria-label="View my bookings"
            >
              <Receipt className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              My Bookings
            </Button>
          </div>

          {/* What's Next */}
          <Card className="p-3 sm:p-4 mb-3 sm:mb-4">
            <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">What&apos;s Next?</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 sm:mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-xs sm:text-sm">Confirmation Email Sent</h4>
                  <p className="text-xs text-gray-600">Check your email for detailed booking confirmation and itinerary.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 sm:mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-xs sm:text-sm">Travel Documents</h4>
                  <p className="text-xs text-gray-600">Ensure your passport/ID and required documents are ready for travel.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 sm:mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-xs sm:text-sm">Pre-Travel Contact</h4>
                  <p className="text-xs text-gray-600">Our team will contact you 48 hours before departure with final details.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Support Information */}
          <Card className="p-3 sm:p-4 bg-blue-50 border-blue-200">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div>
                <h3 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-sm sm:text-base">Need Assistance?</h3>
                <p className="text-blue-700 mb-2 sm:mb-3 text-xs sm:text-sm">Our 24/7 customer support team is here to help you.</p>
                <div className="flex flex-col gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="flex items-center text-blue-700">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="font-medium">+91 12345 67890</span>
                  </div>
                  <div className="flex items-center text-blue-700">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="font-medium">support@travelquench.com</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center sm:justify-end">
                <Button
                  onClick={() => router.push('/')}
                  variant="outline"
                  className="w-full sm:w-auto border-blue-300 text-blue-700 hover:bg-blue-100 flex items-center text-xs sm:text-sm py-2 sm:py-2.5"
                  aria-label="Go to home page"
                >
                  <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Home
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessPage;