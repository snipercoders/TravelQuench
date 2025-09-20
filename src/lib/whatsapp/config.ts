// lib/whatsapp/config.ts
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
