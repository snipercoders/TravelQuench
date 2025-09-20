// lib/whatsapp/api.ts

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

interface WhatsAppMessageOptions {
  message?: string;
  phoneNumber?: string;
}

export const generateWhatsAppURL = (options: WhatsAppMessageOptions = {}): string => {
  const {
    message = WHATSAPP_CONFIG.defaultMessages.general,
    phoneNumber = WHATSAPP_CONFIG.phoneNumber
  } = options;

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

export const openWhatsApp = (options: WhatsAppMessageOptions = {}): void => {
  const url = generateWhatsAppURL(options);
  
  // Open WhatsApp in new tab/window
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

// Predefined message templates
export const WHATSAPP_TEMPLATES = {
  packageInquiry: (packageName: string) => 
    `Hi! I'm interested in the "${packageName}" package. Can you provide more details and pricing?`,
  
  bookingRequest: (packageName: string, travelers: number, date: string) =>
    `Hello! I would like to book the "${packageName}" package for ${travelers} travelers on ${date}. Please help me with the booking process.`,
  
  generalInquiry: () =>
    'Hi! I would like to know more about your travel packages and services.',
  
  customPackage: (destination: string, duration: string) =>
    `Hello! I'm looking for a custom travel package to ${destination} for ${duration}. Can you help me plan this trip?`,
  
  support: (bookingId?: string) =>
    bookingId 
      ? `Hi! I need assistance with my booking (ID: ${bookingId}). Can you please help?`
      : 'Hi! I need support regarding my travel booking. Can you assist me?'
};

// Utility to get WhatsApp link with specific template
export const getWhatsAppLinkWithTemplate = (
  template: keyof typeof WHATSAPP_TEMPLATES,
  ...args: any[]
): string => {
  const messageFunction = WHATSAPP_TEMPLATES[template];
  const message = typeof messageFunction === 'function' 
    ? messageFunction(...args) 
    : messageFunction;
  
  return generateWhatsAppURL({ message });
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