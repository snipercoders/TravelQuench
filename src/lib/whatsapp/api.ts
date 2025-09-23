// // // lib/whatsapp/api.ts

// // // WhatsApp Configuration
// // export const WHATSAPP_CONFIG = {
// //   phoneNumber: process.env.WHATSAPP_PHONE_NUMBER || '7006377796',
// //   businessName: 'Travel Quench',
// //   defaultMessages: {
// //     general: 'Hi! I\'m interested in your travel packages. Can you help me plan my trip?',
// //     booking: 'Hi! I would like to make a booking. Please assist me.',
// //     inquiry: 'Hello! I have some questions about your travel services.',
// //     support: 'Hi! I need help with my booking/inquiry.'
// //   }
// // };

// // interface WhatsAppMessageOptions {
// //   message?: string;
// //   phoneNumber?: string;
// // }

// // export const generateWhatsAppURL = (options: WhatsAppMessageOptions = {}): string => {
// //   const {
// //     message = WHATSAPP_CONFIG.defaultMessages.general,
// //     phoneNumber = WHATSAPP_CONFIG.phoneNumber
// //   } = options;

// //   // Remove any non-digit characters from phone number
// //   const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
// //   // Add country code if not present (assuming Indian number)
// //   const formattedNumber = cleanPhoneNumber.startsWith('91') 
// //     ? cleanPhoneNumber 
// //     : `91${cleanPhoneNumber}`;

// //   // Encode the message for URL
// //   const encodedMessage = encodeURIComponent(message);

// //   // Generate WhatsApp URL
// //   const whatsappURL = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

// //   return whatsappURL;
// // };

// // export const openWhatsApp = (options: WhatsAppMessageOptions = {}): void => {
// //   const url = generateWhatsAppURL(options);
  
// //   // Open WhatsApp in new tab/window
// //   if (typeof window !== 'undefined') {
// //     window.open(url, '_blank', 'noopener,noreferrer');
// //   }
// // };

// // // Predefined message templates
// // export const WHATSAPP_TEMPLATES = {
// //   packageInquiry: (packageName: string) => 
// //     `Hi! I'm interested in the "${packageName}" package. Can you provide more details and pricing?`,
  
// //   bookingRequest: (packageName: string, travelers: number, date: string) =>
// //     `Hello! I would like to book the "${packageName}" package for ${travelers} travelers on ${date}. Please help me with the booking process.`,
  
// //   generalInquiry: () =>
// //     'Hi! I would like to know more about your travel packages and services.',
  
// //   customPackage: (destination: string, duration: string) =>
// //     `Hello! I'm looking for a custom travel package to ${destination} for ${duration}. Can you help me plan this trip?`,
  
// //   support: (bookingId?: string) =>
// //     bookingId 
// //       ? `Hi! I need assistance with my booking (ID: ${bookingId}). Can you please help?`
// //       : 'Hi! I need support regarding my travel booking. Can you assist me?'
// // };

// // // Utility to get WhatsApp link with specific template
// // export const getWhatsAppLinkWithTemplate = (
// //   template: keyof typeof WHATSAPP_TEMPLATES,
// //   ...args: any[]
// // ): string => {
// //   const messageFunction = WHATSAPP_TEMPLATES[template];
// //   const message = typeof messageFunction === 'function' 
// //     ? messageFunction(...args) 
// //     : messageFunction;
  
// //   return generateWhatsAppURL({ message });
// // };

// // // Check if WhatsApp is available on device
// // export const isWhatsAppAvailable = (): boolean => {
// //   if (typeof window === 'undefined') return false;
  
// //   // Check if it's a mobile device
// //   const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
// //     navigator.userAgent
// //   );
  
// //   return isMobile;
// // };

// // // Format phone number for display
// // export const formatPhoneForDisplay = (phoneNumber: string): string => {
// //   const cleaned = phoneNumber.replace(/\D/g, '');
  
// //   if (cleaned.startsWith('91') && cleaned.length === 12) {
// //     // Indian number with country code
// //     const number = cleaned.slice(2);
// //     return `+91 ${number.slice(0, 5)} ${number.slice(5)}`;
// //   } else if (cleaned.length === 10) {
// //     // Indian number without country code
// //     return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
// //   }
  
// //   return phoneNumber;
// // };





// // lib/whatsapp/api.ts

// // WhatsApp Configuration
// export const WHATSAPP_CONFIG = {
//   phoneNumber: process.env.WHATSAPP_PHONE_NUMBER || '7006377796',
//   businessName: 'Travel Quench',
//   defaultMessages: {
//     general: 'Hi! I\'m interested in your travel packages. Can you help me plan my trip?',
//     booking: 'Hi! I would like to make a booking. Please assist me.',
//     inquiry: 'Hello! I have some questions about your travel services.',
//     support: 'Hi! I need help with my booking/inquiry.'
//   }
// };

// interface WhatsAppMessageOptions {
//   message?: string;
//   phoneNumber?: string;
// }

// export const generateWhatsAppURL = (options: WhatsAppMessageOptions = {}): string => {
//   const {
//     message = WHATSAPP_CONFIG.defaultMessages.general,
//     phoneNumber = WHATSAPP_CONFIG.phoneNumber
//   } = options;

//   // Remove any non-digit characters from phone number
//   const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
//   // Add country code if not present (assuming Indian number)
//   const formattedNumber = cleanPhoneNumber.startsWith('91') 
//     ? cleanPhoneNumber 
//     : `91${cleanPhoneNumber}`;

//   // Encode the message for URL
//   const encodedMessage = encodeURIComponent(message);

//   // Generate WhatsApp URL
//   const whatsappURL = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

//   return whatsappURL;
// };

// export const openWhatsApp = (options: WhatsAppMessageOptions = {}): void => {
//   const url = generateWhatsAppURL(options);
  
//   // Open WhatsApp in new tab/window
//   if (typeof window !== 'undefined') {
//     window.open(url, '_blank', 'noopener,noreferrer');
//   }
// };

// // Define template function signatures
// type PackageInquiryTemplate = (packageName: string) => string;
// type BookingRequestTemplate = (packageName: string, travelers: number, date: string) => string;
// type GeneralInquiryTemplate = () => string;
// type CustomPackageTemplate = (destination: string, duration: string) => string;
// type SupportTemplate = (bookingId?: string) => string;

// // Predefined message templates
// export const WHATSAPP_TEMPLATES = {
//   packageInquiry: ((packageName: string) => 
//     `Hi! I'm interested in the "${packageName}" package. Can you provide more details and pricing?`) as PackageInquiryTemplate,
  
//   bookingRequest: ((packageName: string, travelers: number, date: string) =>
//     `Hello! I would like to book the "${packageName}" package for ${travelers} travelers on ${date}. Please help me with the booking process.`) as BookingRequestTemplate,
  
//   generalInquiry: (() =>
//     'Hi! I would like to know more about your travel packages and services.') as GeneralInquiryTemplate,
  
//   customPackage: ((destination: string, duration: string) =>
//     `Hello! I'm looking for a custom travel package to ${destination} for ${duration}. Can you help me plan this trip?`) as CustomPackageTemplate,
  
//   support: ((bookingId?: string) =>
//     bookingId 
//       ? `Hi! I need assistance with my booking (ID: ${bookingId}). Can you please help?`
//       : 'Hi! I need support regarding my travel booking. Can you assist me?') as SupportTemplate
// };

// // Template arguments type mapping
// type TemplateArgs = {
//   packageInquiry: [packageName: string];
//   bookingRequest: [packageName: string, travelers: number, date: string];
//   generalInquiry: [];
//   customPackage: [destination: string, duration: string];
//   support: [bookingId?: string];
// };

// // Utility to get WhatsApp link with specific template
// export const getWhatsAppLinkWithTemplate = <T extends keyof typeof WHATSAPP_TEMPLATES>(
//   template: T,
//   ...args: TemplateArgs[T]
// ): string => {
//   const messageFunction = WHATSAPP_TEMPLATES[template];
//   const message = typeof messageFunction === 'function' 
//     ? (messageFunction as (...args: TemplateArgs[T]) => string)(...args)
//     : messageFunction;
  
//   return generateWhatsAppURL({ message });
// };

// // Check if WhatsApp is available on device
// export const isWhatsAppAvailable = (): boolean => {
//   if (typeof window === 'undefined') return false;
  
//   // Check if it's a mobile device
//   const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//     navigator.userAgent
//   );
  
//   return isMobile;
// };

// // Format phone number for display
// export const formatPhoneForDisplay = (phoneNumber: string): string => {
//   const cleaned = phoneNumber.replace(/\D/g, '');
  
//   if (cleaned.startsWith('91') && cleaned.length === 12) {
//     // Indian number with country code
//     const number = cleaned.slice(2);
//     return `+91 ${number.slice(0, 5)} ${number.slice(5)}`;
//   } else if (cleaned.length === 10) {
//     // Indian number without country code
//     return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
//   }
  
//   return phoneNumber;
// };











// Type definitions for message data
interface CustomPackageData {
  destination?: string;
  startDate?: string;
  endDate?: string;
  travelers?: number | string;
  budget?: string;
  accommodation?: string;
  transportation?: string;
  mealPreference?: string;
  requirements?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
}

interface WhatsAppMessageOptions {
  message?: string;
  phoneNumber?: string;
}

// WhatsApp Configuration
export const WHATSAPP_CONFIG = {
  phoneNumber: process.env.WHATSAPP_PHONE_NUMBER || '7006377796',
  businessName: 'Travel Quench',
  defaultMessages: {
    general: 'Hi! I\'m interested in your travel packages. Can you help me plan my trip?',
    booking: 'Hi! I would like to make a booking. Please assist me.',
    inquiry: 'Hello! I have some questions about your travel services.',
    support: 'Hi! I need help with my booking/inquiry.'
  }
};

export const generateWhatsAppURL = (phoneNumber: string, message: string): string => {
  // Remove any non-digit characters from phone number
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Add country code if not present (assuming Indian number)
  const formattedNumber = cleanPhoneNumber.startsWith('91') 
    ? cleanPhoneNumber 
    : `91${cleanPhoneNumber}`;

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);

  // Generate WhatsApp URL
  const whatsappURL = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

  return whatsappURL;
};

// Overloaded version for backward compatibility
export const generateWhatsAppURLWithOptions = (options: WhatsAppMessageOptions = {}): string => {
  const {
    message = WHATSAPP_CONFIG.defaultMessages.general,
    phoneNumber = WHATSAPP_CONFIG.phoneNumber
  } = options;

  return generateWhatsAppURL(phoneNumber, message);
};

export const openWhatsApp = (options: WhatsAppMessageOptions = {}): void => {
  const url = generateWhatsAppURLWithOptions(options);
  
  // Open WhatsApp in new tab/window
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

// Type definitions for message data
interface CustomPackageData {
  destination?: string;
  startDate?: string;
  endDate?: string;
  travelers?: number | string;
  budget?: string;
  accommodation?: string;
  transportation?: string;
  mealPreference?: string;
  requirements?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
}

// Message formatting functions (these were missing)
export const formatCustomPackageMessage = (data: CustomPackageData): string => {
  return `🌟 *Custom Package Inquiry* 🌟

📍 *Destination:* ${data.destination || 'Not specified'}
📅 *Travel Dates:* ${data.startDate || 'Not specified'} to ${data.endDate || 'Not specified'}
👥 *Number of Travelers:* ${data.travelers || 'Not specified'}
💰 *Budget Range:* ${data.budget || 'Not specified'}
🏨 *Accommodation Preference:* ${data.accommodation || 'Not specified'}
🚗 *Transportation:* ${data.transportation || 'Not specified'}
🍽️ *Meal Preference:* ${data.mealPreference || 'Not specified'}
📝 *Special Requirements:* ${data.requirements || 'None'}

*Contact Details:*
👤 Name: ${data.customerName || 'Not provided'}
📞 Phone: ${data.customerPhone || 'Not provided'}
📧 Email: ${data.customerEmail || 'Not provided'}

Please provide a customized quote for this package. Thank you!`;
};

export const formatBookingInquiry = (packageTitle: string, customerName: string, customerPhone: string): string => {
  return `🎯 *Booking Inquiry* 🎯

📦 *Package:* ${packageTitle}
👤 *Customer Name:* ${customerName}
📞 *Phone Number:* ${customerPhone}

I'm interested in booking this package. Please provide:
✅ Available dates
✅ Pricing details
✅ Booking process
✅ Payment options

Looking forward to your response!`;
};

export const formatContactMessage = (name: string, email: string, phone: string, message: string): string => {
  return `📞 *Contact Form Submission* 📞

👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Phone:* ${phone}

💬 *Message:*
${message}

---
This message was sent through the Travel Quench contact form.`;
};

// Define template function signatures
type PackageInquiryTemplate = (packageName: string) => string;
type BookingRequestTemplate = (packageName: string, travelers: number, date: string) => string;
type GeneralInquiryTemplate = () => string;
type CustomPackageTemplate = (destination: string, duration: string) => string;
type SupportTemplate = (bookingId?: string) => string;

// Predefined message templates
export const WHATSAPP_TEMPLATES = {
  packageInquiry: ((packageName: string) => 
    `Hi! I'm interested in the "${packageName}" package. Can you provide more details and pricing?`) as PackageInquiryTemplate,
  
  bookingRequest: ((packageName: string, travelers: number, date: string) =>
    `Hello! I would like to book the "${packageName}" package for ${travelers} travelers on ${date}. Please help me with the booking process.`) as BookingRequestTemplate,
  
  generalInquiry: (() =>
    'Hi! I would like to know more about your travel packages and services.') as GeneralInquiryTemplate,
  
  customPackage: ((destination: string, duration: string) =>
    `Hello! I'm looking for a custom travel package to ${destination} for ${duration}. Can you help me plan this trip?`) as CustomPackageTemplate,
  
  support: ((bookingId?: string) =>
    bookingId 
      ? `Hi! I need assistance with my booking (ID: ${bookingId}). Can you please help?`
      : 'Hi! I need support regarding my travel booking. Can you assist me?') as SupportTemplate
};

// Template arguments type mapping
type TemplateArgs = {
  packageInquiry: [packageName: string];
  bookingRequest: [packageName: string, travelers: number, date: string];
  generalInquiry: [];
  customPackage: [destination: string, duration: string];
  support: [bookingId?: string];
};

// Utility to get WhatsApp link with specific template
export const getWhatsAppLinkWithTemplate = <T extends keyof typeof WHATSAPP_TEMPLATES>(
  template: T,
  ...args: TemplateArgs[T]
): string => {
  const messageFunction = WHATSAPP_TEMPLATES[template];
  const message = typeof messageFunction === 'function' 
    ? (messageFunction as (...args: TemplateArgs[T]) => string)(...args)
    : messageFunction;
  
  return generateWhatsAppURL(WHATSAPP_CONFIG.phoneNumber, message);
};

// Check if WhatsApp is available on device
export const isWhatsAppAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check if it's a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  return isMobile;
};

// Format phone number for display
export const formatPhoneForDisplay = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    // Indian number with country code
    const number = cleaned.slice(2);
    return `+91 ${number.slice(0, 5)} ${number.slice(5)}`;
  } else if (cleaned.length === 10) {
    // Indian number without country code
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  
  return phoneNumber;
};