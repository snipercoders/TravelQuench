// // src/hooks/useWhatsApp.ts
// import { useState } from 'react';
// import { CustomPackageRequest } from '@/types';
// import { API_ROUTES } from '@/lib/utils/constants';

// interface UseWhatsAppReturn {
//   sendCustomPackageRequest: (data: CustomPackageRequest) => Promise<boolean>;
//   sendBookingInquiry: (packageTitle: string, customerName: string, customerPhone: string) => Promise<boolean>;
//   sendContactMessage: (name: string, email: string, phone: string, message: string) => Promise<boolean>;
//   openWhatsAppChat: (message?: string, phoneNumber?: string) => void;
//   loading: boolean;
// }

// export const useWhatsApp = (): UseWhatsAppReturn => {
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async (type: string, data: any): Promise<boolean> => {
//     setLoading(true);
//     try {
//       const response = await fetch(API_ROUTES.WHATSAPP_SEND, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ type, data }),
//       });

//       const result = await response.json();

//       if (result.success && result.url) {
//         window.open(result.url, '_blank');
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error('Failed to send WhatsApp message:', error);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendCustomPackageRequest = async (data: CustomPackageRequest): Promise<boolean> => {
//     return sendMessage('custom-package', data);
//   };

//   const sendBookingInquiry = async (
//     packageTitle: string, 
//     customerName: string, 
//     customerPhone: string
//   ): Promise<boolean> => {
//     return sendMessage('booking-inquiry', {
//       packageTitle,
//       customerName,
//       customerPhone,
//     });
//   };

//   const sendContactMessage = async (
//     name: string,
//     email: string,
//     phone: string,
//     message: string
//   ): Promise<boolean> => {
//     return sendMessage('contact', {
//       name,
//       email,
//       phone,
//       message,
//     });
//   };

//   const openWhatsAppChat = (message?: string, phoneNumber?: string): void => {
//     sendMessage('general', {
//       message: message || "Hi! I'm interested in your travel packages. Please help me plan my trip.",
//       phoneNumber,
//     });
//   };

//   return {
//     sendCustomPackageRequest,
//     sendBookingInquiry,
//     sendContactMessage,
//     openWhatsAppChat,
//     loading,
//   };
// };










// // src/hooks/useWhatsApp.ts
// import { useState } from 'react';
// import { CustomPackageRequest } from '@/types';
// import { API_ROUTES } from '@/lib/utils/constants';

// // Define a type for the data shapes passed to sendMessage
// type MessageData =
//   | CustomPackageRequest // For sendCustomPackageRequest
//   | { packageTitle: string; customerName: string; customerPhone: string } // For sendBookingInquiry
//   | { name: string; email: string; phone: string; message: string } // For sendContactMessage
//   | { message: string; phoneNumber?: string }; // For openWhatsAppChat

// interface UseWhatsAppReturn {
//   sendCustomPackageRequest: (data: CustomPackageRequest) => Promise<boolean>;
//   sendBookingInquiry: (packageTitle: string, customerName: string, customerPhone: string) => Promise<boolean>;
//   sendContactMessage: (name: string, email: string, phone: string, message: string) => Promise<boolean>;
//   openWhatsAppChat: (message?: string, phoneNumber?: string) => void;
//   loading: boolean;
// }

// export const useWhatsApp = (): UseWhatsAppReturn => {
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async (type: string, data: MessageData): Promise<boolean> => {
//     setLoading(true);
//     try {
//       const response = await fetch(API_ROUTES.WHATSAPP_SEND, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ type, data }),
//       });

//       const result = await response.json();

//       if (result.success && result.url) {
//         window.open(result.url, '_blank');
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error('Failed to send WhatsApp message:', error);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendCustomPackageRequest = async (data: CustomPackageRequest): Promise<boolean> => {
//     return sendMessage('custom-package', data);
//   };

//   const sendBookingInquiry = async (
//     packageTitle: string,
//     customerName: string,
//     customerPhone: string
//   ): Promise<boolean> => {
//     return sendMessage('booking-inquiry', {
//       packageTitle,
//       customerName,
//       customerPhone,
//     });
//   };

//   const sendContactMessage = async (
//     name: string,
//     email: string,
//     phone: string,
//     message: string
//   ): Promise<boolean> => {
//     return sendMessage('contact', {
//       name,
//       email,
//       phone,
//       message,
//     });
//   };

//   const openWhatsAppChat = (message?: string, phoneNumber?: string): void => {
//     sendMessage('general', {
//       message: message || "Hi! I'm interested in your travel packages. Please help me plan my trip.",
//       phoneNumber,
//     });
//   };

//   return {
//     sendCustomPackageRequest,
//     sendBookingInquiry,
//     sendContactMessage,
//     openWhatsAppChat,
//     loading,
//   };
// };








// src/hooks/useWhatsApp.ts
import { useState } from 'react';
import { API_ROUTES } from '@/lib/utils/constants';

// Define CustomPackageRequest interface locally since it doesn't exist in @/types
interface CustomPackageRequest {
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

// Define a type for the data shapes passed to sendMessage
type MessageData =
  | CustomPackageRequest // For sendCustomPackageRequest
  | { packageTitle: string; customerName: string; customerPhone: string } // For sendBookingInquiry
  | { name: string; email: string; phone: string; message: string } // For sendContactMessage
  | { message: string; phoneNumber?: string }; // For openWhatsAppChat

interface UseWhatsAppReturn {
  sendCustomPackageRequest: (data: CustomPackageRequest) => Promise<boolean>;
  sendBookingInquiry: (packageTitle: string, customerName: string, customerPhone: string) => Promise<boolean>;
  sendContactMessage: (name: string, email: string, phone: string, message: string) => Promise<boolean>;
  openWhatsAppChat: (message?: string, phoneNumber?: string) => void;
  loading: boolean;
}

export const useWhatsApp = (): UseWhatsAppReturn => {
  const [loading, setLoading] = useState(false);

  const sendMessage = async (type: string, data: MessageData): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await fetch(API_ROUTES.WHATSAPP_SEND, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, data }),
      });

      const result = await response.json();

      if (result.success && result.url) {
        window.open(result.url, '_blank');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sendCustomPackageRequest = async (data: CustomPackageRequest): Promise<boolean> => {
    return sendMessage('custom-package', data);
  };

  const sendBookingInquiry = async (
    packageTitle: string,
    customerName: string,
    customerPhone: string
  ): Promise<boolean> => {
    return sendMessage('booking-inquiry', {
      packageTitle,
      customerName,
      customerPhone,
    });
  };

  const sendContactMessage = async (
    name: string,
    email: string,
    phone: string,
    message: string
  ): Promise<boolean> => {
    return sendMessage('contact', {
      name,
      email,
      phone,
      message,
    });
  };

  const openWhatsAppChat = (message?: string, phoneNumber?: string): void => {
    sendMessage('general', {
      message: message || "Hi! I'm interested in your travel packages. Please help me plan my trip.",
      phoneNumber,
    });
  };

  return {
    sendCustomPackageRequest,
    sendBookingInquiry,
    sendContactMessage,
    openWhatsAppChat,
    loading,
  };
};

// Export the type for use in other components
export type { CustomPackageRequest };