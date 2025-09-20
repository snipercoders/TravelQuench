// lib/utils/constants.ts

// App Configuration
export const APP_CONFIG = {
  name: 'Travel Quench',
  description: 'Your ultimate travel companion for incredible destinations',
  tagline: 'Making Travel Dreams Come True',
  url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  email: process.env.SMTP_USER || 'anshjamwal10102003@gmail.com',
  phone: process.env.WHATSAPP_PHONE_NUMBER || '7006377796',
  address: {
    street: 'Travel Quench HQ',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    pincode: '560001'
  },
  social: {
    facebook: 'https://facebook.com/travelquench',
    instagram: 'https://instagram.com/travelquench',
    twitter: 'https://twitter.com/travelquench',
    youtube: 'https://youtube.com/travelquench'
  },
  whatsapp: {
    number: process.env.WHATSAPP_PHONE_NUMBER || '7006377796',
    defaultMessage: 'Hi! I\'m interested in your travel packages. Can you help me plan my trip?'
  }
};

// Business Hours
export const BUSINESS_HOURS = {
  weekdays: '9:00 AM - 8:00 PM',
  weekends: '10:00 AM - 6:00 PM',
  timezone: 'IST (UTC+5:30)'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  PROFILE: '/customer/profile',
  ADMIN_DASHBOARD: '/admin/dashboard',
  PACKAGES: '/packages',
  INTERNATIONAL_PACKAGES: '/packages/international',
  INDIAN_PACKAGES: '/packages/indian',
  BOOKINGS: '/customer/bookings',
  WISHLIST: '/customer/wishlist',
  CUSTOMIZE: '/customize',
  ABOUT: '/about',
  TESTIMONIALS: '/testimonials',
  CONTACT: '/contact',
  TERMS: '/terms',
  PRIVACY: '/privacy',
};

export const API_ROUTES = {
  // Auth endpoints
  SIGNUP: '/api/auth/signup',
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  ME: '/api/auth/me',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  VERIFY_EMAIL: '/api/auth/verify-email',
  
  // User endpoints
  USERS: '/api/users',
  USER_PROFILE: '/api/users/profile',
  
  // Package endpoints
  PACKAGES: '/api/packages',
  PACKAGES_CREATE: '/api/packages/create',
  PACKAGES_UPDATE: '/api/packages/update',
  PACKAGES_DELETE: '/api/packages/delete',
  
  // Booking endpoints
  BOOKINGS: '/api/bookings',
  BOOKINGS_CREATE: '/api/bookings/create',
  BOOKINGS_UPDATE: '/api/bookings/update',
  
  // Upload endpoints
  UPLOAD_IMAGE: '/api/upload/cloudinary',
  
  // Communication endpoints
  WHATSAPP: '/api/whatsapp/send-message',
  EMAIL: '/api/email/send-confirmation',
  CONTACT: '/api/contact',
};

export const AUTH_CONSTANTS = {
  TOKEN_EXPIRY: '2d', // 2 days
  COOKIE_NAME: 'auth-token',
  EMAIL_VERIFICATION_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
  PASSWORD_RESET_EXPIRY: 60 * 60 * 1000, // 1 hour
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 128,
  MAX_NAME_LENGTH: 25,
  MIN_NAME_LENGTH: 2,
};

export const PACKAGE_TYPES = {
  INTERNATIONAL: 'international',
  DOMESTIC: 'domestic',
  ADVENTURE: 'adventure',
  LUXURY: 'luxury',
  BUDGET: 'budget',
  FAMILY: 'family',
  HONEYMOON: 'honeymoon',
  PILGRIMAGE: 'pilgrimage',
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
};

export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
};

export const COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Singapore',
  'Thailand',
  'Malaysia',
  'Indonesia',
  'Japan',
  'South Korea',
  'France',
  'Germany',
  'Italy',
  'Spain',
  'Switzerland',
  'Netherlands',
  'Dubai',
  'Turkey',
  'Egypt',
  'South Africa',
  'Brazil',
  'Argentina',
  'Mexico',
  'New Zealand',
];

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Puducherry',
];

