

// // src/pages/customer/booking/checkout.tsx
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import Image from 'next/image';
// import Layout from '@/components/layout/Layout';
// import { useRequireAuth } from '@/hooks/useAuth';
// import { Button, Card } from '@/components/ui';
// import {
//   MapPin,
//   Calendar,
//   Clock,
//   Shield,
//   CheckCircle,
//   ArrowLeft,
//   AlertCircle,
//   Lock,
//   Receipt,
//   Phone,
//   Mail,
//   CreditCard
// } from 'lucide-react';

// // Declare Razorpay type for TypeScript
// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// interface Booking {
//   _id: string;
//   bookingId: string;
//   packageId: string;
//   userId: string;
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
//   specialRequests: string;
//   customerInfo: {
//     name: string;
//     email: string;
//     phone: string;
//     address: string;
//     emergencyContact: string;
//   };
//   status: 'pending' | 'confirmed' | 'cancelled';
//   paymentStatus: 'pending' | 'completed' | 'failed';
//   package: {
//     _id: string;
//     title: string;
//     destination: string;
//     duration: number;
//     price: number;
//     thumbnail: string;
//     type: 'domestic' | 'international';
//   };
// }

// const CheckoutPage: React.FC = () => {
//   const { user, isLoading } = useRequireAuth();
//   const router = useRouter();
//   const { bookingId } = router.query;
  
//   const [booking, setBooking] = useState<Booking | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string>('');
//   const [processing, setProcessing] = useState(false);
//   const [razorpayLoaded, setRazorpayLoaded] = useState(false);

//   useEffect(() => {
//     // Load Razorpay script
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => setRazorpayLoaded(true);
//     script.onerror = () => setError('Failed to load payment gateway');
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   useEffect(() => {
//     if (bookingId && typeof bookingId === 'string') {
//       fetchBooking(bookingId);
//     }
//   }, [bookingId]);

//   const fetchBooking = async (id: string) => {
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
//           console.log('Raw booking data:', data.booking); // Debug log
          
//           // Transform the booking data to match expected structure
//           const bookingData = {
//             ...data.booking,
//             // Handle travelers structure
//             travelers: data.booking.travelersCount || {
//               adults: data.booking.travelers || 1,
//               children: 0
//             },
//             // Handle package details
//             packageDetails: data.booking.packageDetails || {
//               title: 'Travel Package',
//               destination: 'Unknown',
//               duration: 1,
//               type: 'domestic'
//             },
//             // Create package object for price calculations
//             package: {
//               _id: data.booking.packageId,
//               title: data.booking.packageDetails?.title || 'Travel Package',
//               destination: data.booking.packageDetails?.destination || 'Unknown',
//               duration: data.booking.packageDetails?.duration || 1,
//               price: data.booking.totalAmount / ((data.booking.travelersCount?.adults || data.booking.travelers || 1) + ((data.booking.travelersCount?.children || 0) * 0.7)),
//               thumbnail: '/images/placeholder-package.jpg',
//               type: data.booking.packageDetails?.type || 'domestic'
//             },
//             // Ensure booking ID exists
//             bookingId: data.booking.bookingId || data.booking.bookingReference || data.booking._id,
//             // Handle travel date
//             travelDate: data.booking.travelDate || data.booking.startDate
//           };
          
//           console.log('Transformed booking data:', bookingData); // Debug log
//           setBooking(bookingData);
//         } else {
//           setError('Booking not found');
//         }
//       } else {
//         setError('Failed to load booking details');
//       }
//     } catch (err) {
//       console.error('Fetch booking error:', err);
//       setError('Network error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePayment = async () => {
//     if (!booking || !user || !razorpayLoaded) return;

//     setProcessing(true);
//     setError('');

//     try {
//       // Create Razorpay order
//       const response = await fetch('/api/payments/process', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({
//           bookingId: booking._id,
//           amount: booking.totalAmount,
//           currency: 'INR'
//         })
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || 'Failed to create payment order');
//       }

//       // Initialize Razorpay payment
//       const options = {
//         key: data.key,
//         amount: data.amount,
//         currency: data.currency,
//         name: 'Travel Quench',
//         description: `Booking for ${booking.packageDetails.title}`,
//         order_id: data.orderId,
//         prefill: {
//           name: booking.customerInfo.name,
//           email: booking.customerInfo.email,
//           contact: booking.customerInfo.phone
//         },
//         theme: {
//           color: '#3B82F6'
//         },
//         handler: async function (response: any) {
//           // Payment successful, verify on backend
//           try {
//             const verifyResponse = await fetch('/api/payments/verify', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 bookingId: booking._id
//               })
//             });

//             const verifyData = await verifyResponse.json();

//             if (verifyResponse.ok && verifyData.success) {
//               // Redirect to success page
//               router.push(`/customer/booking/success?bookingId=${booking._id}&paymentId=${response.razorpay_payment_id}`);
//             } else {
//               setError(verifyData.message || 'Payment verification failed');
//             }
//           } catch (verifyError) {
//             setError('Payment verification failed');
//           } finally {
//             setProcessing(false);
//           }
//         },
//         modal: {
//           ondismiss: function() {
//             setProcessing(false);
//             setError('Payment was cancelled');
//           }
//         }
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();

//     } catch (err: any) {
//       setError(err.message || 'Payment processing failed');
//       setProcessing(false);
//     }
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
//             <p className="text-gray-600 mb-4">{error || 'The booking you\'re looking for doesn\'t exist.'}</p>
//             <Button onClick={() => router.push('/customer/bookings')}>
//               View My Bookings
//             </Button>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title={`Payment - ${booking?.packageDetails?.title || 'Travel Package'}`}>
//       <Head>
//         <title>Payment - {booking?.packageDetails?.title || 'Travel Package'} - Travel Quench</title>
//         <meta name="description" content="Secure payment for your travel booking" />
//       </Head>

//       <div className="bg-gray-50 min-h-screen">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Back Button */}
//           <div className="mb-6">
//             <Button
//               variant="outline"
//               onClick={() => router.back()}
//               className="flex items-center"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Booking
//             </Button>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Payment Information */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Payment Method */}
//               <Card className="p-6">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                
//                 <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <CreditCard className="w-8 h-8 text-blue-600 mr-4" />
//                       <div>
//                         <h3 className="font-semibold text-blue-900">Razorpay Secure Payment</h3>
//                         <p className="text-sm text-blue-700 mt-1">
//                           Pay securely using Credit/Debit Card, UPI, Net Banking, or Wallet
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-2xl font-bold text-blue-900">
//                         ₹{booking?.totalAmount?.toLocaleString() || '0'}
//                       </div>
//                       <div className="text-sm text-blue-600">Total Amount</div>
//                     </div>
//                   </div>
//                 </div>

//                 {error && (
//                   <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
//                     <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
//                     <span className="text-red-700 text-sm">{error}</span>
//                   </div>
//                 )}

//                 <div className="mt-6">
//                   <Button
//                     onClick={handlePayment}
//                     disabled={processing || !razorpayLoaded}
//                     className="w-full bg-primary-600 hover:bg-primary-700 py-4 text-lg"
//                   >
//                     {processing ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
//                         Processing Payment...
//                       </>
//                     ) : (
//                       <>
//                         <Lock className="w-5 h-5 mr-3" />
//                         Pay Securely ₹{booking?.totalAmount?.toLocaleString() || '0'}
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               </Card>

//               {/* Payment Features */}
//               <Card className="p-6">
//                 <h3 className="font-semibold text-gray-900 mb-4">Why Choose Our Payment?</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex items-center">
//                     <Shield className="w-5 h-5 text-green-500 mr-3" />
//                     <span className="text-sm">256-bit SSL Encryption</span>
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
//                     <span className="text-sm">Instant Confirmation</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Shield className="w-5 h-5 text-green-500 mr-3" />
//                     <span className="text-sm">PCI DSS Compliant</span>
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
//                     <span className="text-sm">24/7 Support</span>
//                   </div>
//                 </div>
//               </Card>

//               {/* Security Notice */}
//               <Card className="p-4 bg-green-50 border-green-200">
//                 <div className="flex items-center">
//                   <Shield className="w-6 h-6 text-green-500 mr-3" />
//                   <div>
//                     <h4 className="font-medium text-green-900">100% Secure Payment</h4>
//                     <p className="text-sm text-green-700 mt-1">
//                       Your payment information is encrypted and secure. We do not store your card details.
//                     </p>
//                   </div>
//                 </div>
//               </Card>
//             </div>

//             {/* Booking Summary */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-8 space-y-6">
//                 <Card className="p-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//                     <Receipt className="w-5 h-5 mr-2" />
//                     Booking Summary
//                   </h3>
                  
//                   {/* Package Info */}
//                   <div className="flex items-start space-x-3 mb-4">
//                     <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
//                       <Image
//                         src={booking?.package?.thumbnail || '/images/placeholder-package.jpg'}
//                         alt={booking?.packageDetails?.title || 'Travel Package'}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="font-medium text-gray-900">{booking?.packageDetails?.title || 'Travel Package'}</h4>
//                       <div className="flex items-center text-sm text-gray-600 mt-1">
//                         <MapPin className="w-3 h-3 mr-1" />
//                         {booking?.packageDetails?.destination || 'Unknown'}
//                       </div>
//                       <div className="flex items-center text-sm text-gray-600">
//                         <Clock className="w-3 h-3 mr-1" />
//                         {booking?.packageDetails?.duration || 1} days
//                       </div>
//                     </div>
//                   </div>

//                   <hr className="my-4" />

//                   {/* Booking Details */}
//                   <div className="space-y-3">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Travel Date:</span>
//                       <span className="font-medium">
//                         {booking?.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'Not set'}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Travelers:</span>
//                       <span className="font-medium">
//                         {booking?.travelers?.adults || 1} Adult{(booking?.travelers?.adults || 1) !== 1 ? 's' : ''}
//                         {(booking?.travelers?.children || 0) > 0 && `, ${booking.travelers.children} Child${booking.travelers.children !== 1 ? 'ren' : ''}`}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Booking ID:</span>
//                       <span className="font-medium text-sm">{booking?.bookingId || 'N/A'}</span>
//                     </div>
//                   </div>

//                   <hr className="my-4" />

//                   {/* Price Breakdown */}
//                   <div className="space-y-2">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Adults ({booking?.travelers?.adults || 1} × ₹{Math.round(booking?.package?.price || 0).toLocaleString()})</span>
//                       <span className="font-medium">₹{Math.round((booking?.package?.price || 0) * (booking?.travelers?.adults || 1)).toLocaleString()}</span>
//                     </div>
//                     {(booking?.travelers?.children || 0) > 0 && (
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Children ({booking.travelers.children} × ₹{Math.round((booking?.package?.price || 0) * 0.7).toLocaleString()})</span>
//                         <span className="font-medium">₹{Math.round((booking?.package?.price || 0) * 0.7 * booking.travelers.children).toLocaleString()}</span>
//                       </div>
//                     )}
//                     <div className="flex justify-between text-sm text-gray-600">
//                       <span>Taxes & Fees</span>
//                       <span>Included</span>
//                     </div>
//                   </div>

//                   <hr className="my-4" />

//                   <div className="flex justify-between items-center">
//                     <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
//                     <span className="text-2xl font-bold text-primary-600">₹{booking?.totalAmount?.toLocaleString() || '0'}</span>
//                   </div>
//                 </Card>

//                 {/* Support */}
//                 <Card className="p-4">
//                   <div className="text-center">
//                     <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
//                     <p className="text-sm text-gray-600 mb-3">
//                       Our customer support team is available 24/7
//                     </p>
//                     <div className="space-y-2">
//                       <div className="flex items-center justify-center text-sm">
//                         <Phone className="w-4 h-4 mr-2" />
//                         +91 12345 67890
//                       </div>
//                       <div className="flex items-center justify-center text-sm">
//                         <Mail className="w-4 h-4 mr-2" />
//                         support@travelquench.com
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CheckoutPage;














// src/pages/customer/booking/checkout.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { useRequireAuth } from '@/hooks/useAuth';
import { Button, Card } from '@/components/ui';
import {
  MapPin,
  Calendar,
  Clock,
  Shield,
  CheckCircle,
  ArrowLeft,
  AlertCircle,
  Lock,
  Receipt,
  Phone,
  Mail,
  CreditCard
} from 'lucide-react';

// Declare Razorpay type for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Booking {
  _id: string;
  bookingId: string;
  packageId: string;
  userId: string;
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
  specialRequests: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    emergencyContact: string;
  };
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  package: {
    _id: string;
    title: string;
    destination: string;
    duration: number;
    price: number;
    thumbnail: string;
    type: 'domestic' | 'international';
  };
}

const CheckoutPage: React.FC = () => {
  const { user, isLoading } = useRequireAuth();
  const router = useRouter();
  const { bookingId } = router.query;
  
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => setError('Failed to load payment gateway');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (bookingId && typeof bookingId === 'string') {
      fetchBooking(bookingId);
    }
  }, [bookingId]);

  const fetchBooking = async (id: string) => {
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
          console.log('Raw booking data:', data.booking); // Debug log
          
          // Transform the booking data to match expected structure
          const bookingData = {
            ...data.booking,
            // Handle travelers structure
            travelers: data.booking.travelersCount || {
              adults: data.booking.travelers || 1,
              children: 0
            },
            // Handle package details
            packageDetails: data.booking.packageDetails || {
              title: 'Travel Package',
              destination: 'Unknown',
              duration: 1,
              type: 'domestic'
            },
            // Create package object for price calculations
            package: {
              _id: data.booking.packageId,
              title: data.booking.packageDetails?.title || 'Travel Package',
              destination: data.booking.packageDetails?.destination || 'Unknown',
              duration: data.booking.packageDetails?.duration || 1,
              price: data.booking.totalAmount / ((data.booking.travelersCount?.adults || data.booking.travelers || 1) + ((data.booking.travelersCount?.children || 0) * 0.7)),
              thumbnail: '/images/placeholder-package.jpg',
              type: data.booking.packageDetails?.type || 'domestic'
            },
            // Ensure booking ID exists
            bookingId: data.booking.bookingId || data.booking.bookingReference || data.booking._id,
            // Handle travel date
            travelDate: data.booking.travelDate || data.booking.startDate
          };
          
          console.log('Transformed booking data:', bookingData); // Debug log
          setBooking(bookingData);
        } else {
          setError('Booking not found');
        }
      } else {
        setError('Failed to load booking details');
      }
    } catch (err) {
      console.error('Fetch booking error:', err);
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!booking || !user || !razorpayLoaded) return;

    setProcessing(true);
    setError('');

    try {
      // Create Razorpay order
      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          bookingId: booking._id,
          amount: booking.totalAmount,
          currency: 'INR'
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to create payment order');
      }

      // Initialize Razorpay payment
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'Travel Quench',
        description: `Booking for ${booking.packageDetails.title}`,
        order_id: data.orderId,
        prefill: {
          name: booking.customerInfo.name,
          email: booking.customerInfo.email,
          contact: booking.customerInfo.phone
        },
        theme: {
          color: '#3B82F6'
        },
        handler: async function (response: any) {
          // Payment successful, verify on backend
          try {
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: booking._id
              })
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok && verifyData.success) {
              // Redirect to success page
              router.push(`/customer/booking/success?bookingId=${booking._id}&paymentId=${response.razorpay_payment_id}`);
            } else {
              setError(verifyData.message || 'Payment verification failed');
            }
          } catch (verifyError) {
            setError('Payment verification failed');
          } finally {
            setProcessing(false);
          }
        },
        modal: {
          ondismiss: function() {
            setProcessing(false);
            setError('Payment was cancelled');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err: any) {
      setError(err.message || 'Payment processing failed');
      setProcessing(false);
    }
  };

  if (isLoading || loading) {
    return (
      <Layout title="Loading...">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </Layout>
    );
  }

  if (error || !booking) {
    return (
      <Layout title="Error">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
            <p className="text-gray-600 mb-4">{error || 'The booking you\'re looking for doesn\'t exist.'}</p>
            <Button onClick={() => router.push('/customer/bookings')}>
              View My Bookings
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Payment - ${booking?.packageDetails?.title || 'Travel Package'}`}>
      <Head>
        <title>Payment - {booking?.packageDetails?.title || 'Travel Package'} - Travel Quench</title>
        <meta name="description" content="Secure payment for your travel booking" />
      </Head>

      <div className="bg-gray-50 min-h-screen pt-10 md:pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <div className="mb-8">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Booking
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Payment Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Method */}
              <Card className="p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center">
                      <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-4" />
                      <div>
                        <h3 className="font-semibold text-blue-900">Razorpay Secure Payment</h3>
                        <p className="text-sm text-blue-700 mt-1">
                          Pay securely using Credit/Debit Card, UPI, Net Banking, or Wallet
                        </p>
                      </div>
                    </div>
                    <div className="text-right w-full sm:w-auto">
                      <div className="text-xl sm:text-2xl font-bold text-blue-900">
                        ₹{booking?.totalAmount?.toLocaleString() || '0'}
                      </div>
                      <div className="text-sm text-blue-600">Total Amount</div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                )}

                <div className="mt-6">
                  <Button
                    onClick={handlePayment}
                    disabled={processing || !razorpayLoaded}
                    className="w-full bg-primary-600 hover:bg-primary-700 py-3 sm:py-4 text-base sm:text-lg"
                  >
                    {processing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-3" />
                        Pay Securely ₹{booking?.totalAmount?.toLocaleString() || '0'}
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              {/* Payment Features */}
              <Card className="p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Why Choose Our Payment?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Instant Confirmation</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">PCI DSS Compliant</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">24/7 Support</span>
                  </div>
                </div>
              </Card>

              {/* Security Notice */}
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-green-500 mr-3" />
                  <div>
                    <h4 className="font-medium text-green-900">100% Secure Payment</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your payment information is encrypted and secure. We do not store your card details.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Receipt className="w-5 h-5 mr-2" />
                    Booking Summary
                  </h3>
                  
                  {/* Package Info */}
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={booking?.package?.thumbnail || '/images/placeholder-package.jpg'}
                        alt={booking?.packageDetails?.title || 'Travel Package'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{booking?.packageDetails?.title || 'Travel Package'}</h4>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {booking?.packageDetails?.destination || 'Unknown'}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-3 h-3 mr-1" />
                        {booking?.packageDetails?.duration || 1} days
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Booking Details */}
                  <div className="space-y-3 text-sm sm:text-base">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Travel Date:</span>
                      <span className="font-medium">
                        {booking?.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'Not set'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Travelers:</span>
                      <span className="font-medium">
                        {booking?.travelers?.adults || 1} Adult{(booking?.travelers?.adults || 1) !== 1 ? 's' : ''}
                        {(booking?.travelers?.children || 0) > 0 && `, ${booking.travelers.children} Child${booking.travelers.children !== 1 ? 'ren' : ''}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking ID:</span>
                      <span className="font-medium text-sm">{booking?.bookingId || 'N/A'}</span>
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm sm:text-base">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Adults ({booking?.travelers?.adults || 1} × ₹{Math.round(booking?.package?.price || 0).toLocaleString()})</span>
                      <span className="font-medium">₹{Math.round((booking?.package?.price || 0) * (booking?.travelers?.adults || 1)).toLocaleString()}</span>
                    </div>
                    {(booking?.travelers?.children || 0) > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Children ({booking.travelers.children} × ₹{Math.round((booking?.package?.price || 0) * 0.7).toLocaleString()})</span>
                        <span className="font-medium">₹{Math.round((booking?.package?.price || 0) * 0.7 * booking.travelers.children).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Taxes & Fees</span>
                      <span>Included</span>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                    <span className="text-xl sm:text-2xl font-bold text-primary-600">₹{booking?.totalAmount?.toLocaleString() || '0'}</span>
                  </div>
                </Card>

                {/* Support */}
                <Card className="p-4">
                  <div className="text-center">
                    <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Our customer support team is available 24/7
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center">
                        <Phone className="w-4 h-4 mr-2" />
                        +91 12345 67890
                      </div>
                      <div className="flex items-center justify-center">
                        <Mail className="w-4 h-4 mr-2" />
                        support@travelquench.com
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;