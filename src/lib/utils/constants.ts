// // lib/utils/constants.ts

// // App Configuration
// export const APP_CONFIG = {
//   name: 'Travel Quench',
//   description: 'Your ultimate travel companion for incredible destinations',
//   tagline: 'Making Travel Dreams Come True',
//   url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
//   email: process.env.SMTP_USER || 'anshjamwal10102003@gmail.com',
//   phone: process.env.WHATSAPP_PHONE_NUMBER || '7006377796',
//   address: {
//     street: 'Travel Quench HQ',
//     city: 'Bengaluru',
//     state: 'Karnataka',
//     country: 'India',
//     pincode: '560001'
//   },
//   social: {
//     facebook: 'https://facebook.com/travelquench',
//     instagram: 'https://instagram.com/travelquench',
//     twitter: 'https://twitter.com/travelquench',
//     youtube: 'https://youtube.com/travelquench'
//   },
//   whatsapp: {
//     number: process.env.WHATSAPP_PHONE_NUMBER || '7006377796',
//     defaultMessage: 'Hi! I\'m interested in your travel packages. Can you help me plan my trip?'
//   }
// };

// // Business Hours
// export const BUSINESS_HOURS = {
//   weekdays: '9:00 AM - 8:00 PM',
//   weekends: '10:00 AM - 6:00 PM',
//   timezone: 'IST (UTC+5:30)'
// };

// export const ROUTES = {
//   HOME: '/',
//   LOGIN: '/auth/login',
//   SIGNUP: '/auth/signup',
//   FORGOT_PASSWORD: '/auth/forgot-password',
//   RESET_PASSWORD: '/auth/reset-password',
//   VERIFY_EMAIL: '/auth/verify-email',
//   PROFILE: '/customer/profile',
//   ADMIN_DASHBOARD: '/admin/dashboard',
//   PACKAGES: '/packages',
//   INTERNATIONAL_PACKAGES: '/packages/international',
//   INDIAN_PACKAGES: '/packages/indian',
//   BOOKINGS: '/customer/bookings',
//   WISHLIST: '/customer/wishlist',
//   CUSTOMIZE: '/customize',
//   ABOUT: '/about',
//   TESTIMONIALS: '/testimonials',
//   CONTACT: '/contact',
//   TERMS: '/terms',
//   PRIVACY: '/privacy',
// };

// export const API_ROUTES = {
//   // Auth endpoints
//   SIGNUP: '/api/auth/signup',
//   LOGIN: '/api/auth/login',
//   LOGOUT: '/api/auth/logout',
//   ME: '/api/auth/me',
//   FORGOT_PASSWORD: '/api/auth/forgot-password',
//   RESET_PASSWORD: '/api/auth/reset-password',
//   VERIFY_EMAIL: '/api/auth/verify-email',
  
//   // User endpoints
//   USERS: '/api/users',
//   USER_PROFILE: '/api/users/profile',
  
//   // Package endpoints
//   PACKAGES: '/api/packages',
//   PACKAGES_CREATE: '/api/packages/create',
//   PACKAGES_UPDATE: '/api/packages/update',
//   PACKAGES_DELETE: '/api/packages/delete',
  
//   // Booking endpoints
//   BOOKINGS: '/api/bookings',
//   BOOKINGS_CREATE: '/api/bookings/create',
//   BOOKINGS_UPDATE: '/api/bookings/update',
  
//   // Upload endpoints
//   UPLOAD_IMAGE: '/api/upload/cloudinary',
  
//   // Communication endpoints
//   WHATSAPP: '/api/whatsapp/send-message',
//   EMAIL: '/api/email/send-confirmation',
//   CONTACT: '/api/contact',
// };

// export const AUTH_CONSTANTS = {
//   TOKEN_EXPIRY: '2d', // 2 days
//   COOKIE_NAME: 'auth-token',
//   EMAIL_VERIFICATION_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
//   PASSWORD_RESET_EXPIRY: 60 * 60 * 1000, // 1 hour
//   MIN_PASSWORD_LENGTH: 6,
//   MAX_PASSWORD_LENGTH: 128,
//   MAX_NAME_LENGTH: 25,
//   MIN_NAME_LENGTH: 2,
// };

// export const PACKAGE_TYPES = {
//   INTERNATIONAL: 'international',
//   DOMESTIC: 'domestic',
//   ADVENTURE: 'adventure',
//   LUXURY: 'luxury',
//   BUDGET: 'budget',
//   FAMILY: 'family',
//   HONEYMOON: 'honeymoon',
//   PILGRIMAGE: 'pilgrimage',
// };

// export const BOOKING_STATUS = {
//   PENDING: 'pending',
//   CONFIRMED: 'confirmed',
//   CANCELLED: 'cancelled',
//   COMPLETED: 'completed',
// };

// export const USER_ROLES = {
//   CUSTOMER: 'customer',
//   ADMIN: 'admin',
// };

// export const COUNTRIES = [
//   'India',
//   'United States',
//   'United Kingdom',
//   'Canada',
//   'Australia',
//   'Singapore',
//   'Thailand',
//   'Malaysia',
//   'Indonesia',
//   'Japan',
//   'South Korea',
//   'France',
//   'Germany',
//   'Italy',
//   'Spain',
//   'Switzerland',
//   'Netherlands',
//   'Dubai',
//   'Turkey',
//   'Egypt',
//   'South Africa',
//   'Brazil',
//   'Argentina',
//   'Mexico',
//   'New Zealand',
// ];

// export const INDIAN_STATES = [
//   'Andhra Pradesh',
//   'Arunachal Pradesh',
//   'Assam',
//   'Bihar',
//   'Chhattisgarh',
//   'Goa',
//   'Gujarat',
//   'Haryana',
//   'Himachal Pradesh',
//   'Jammu and Kashmir',
//   'Jharkhand',
//   'Karnataka',
//   'Kerala',
//   'Madhya Pradesh',
//   'Maharashtra',
//   'Manipur',
//   'Meghalaya',
//   'Mizoram',
//   'Nagaland',
//   'Odisha',
//   'Punjab',
//   'Rajasthan',
//   'Sikkim',
//   'Tamil Nadu',
//   'Telangana',
//   'Tripura',
//   'Uttar Pradesh',
//   'Uttarakhand',
//   'West Bengal',
//   'Delhi',
//   'Puducherry',
// ];








// src/lib/utils/constants.ts

// App Configuration
export const APP_CONFIG = {
  name: 'Travel Quench',
  description: 'Your ultimate travel companion for incredible destinations',
  tagline: 'Making Travel Dreams Come True',
  url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  email: process.env.SMTP_USER || 'info@travelquench.com',
  phone: process.env.WHATSAPP_PHONE_NUMBER || '+91-7006377796',
  address: {
    street: 'Travel Quench HQ',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    pincode: '560001',
  },
  social: {
    facebook: 'https://facebook.com/travelquench',
    instagram: 'https://instagram.com/travelquench',
    twitter: 'https://twitter.com/travelquench',
    youtube: 'https://youtube.com/travelquench',
  },
  whatsapp: {
    number: process.env.WHATSAPP_PHONE_NUMBER || '+91-7006377796',
    defaultMessage: "Hi! I'm interested in your travel packages. Can you help me plan my trip?",
  },
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  // File upload limits
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
};

// Business Hours
export const BUSINESS_HOURS = {
  weekdays: '9:00 AM - 8:00 PM',
  weekends: '10:00 AM - 6:00 PM',
  timezone: 'IST (UTC+5:30)',
};

// Route Constants
export const ROUTES = {
  // Public routes
  HOME: '/',
  ABOUT: '/about',
  TESTIMONIALS: '/testimonials',
  CONTACT: '/contact',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  CUSTOMIZE: '/customize',
  // Package routes
  PACKAGES: '/packages',
  INTERNATIONAL_PACKAGES: '/packages/international',
  INDIAN_PACKAGES: '/packages/indian',
  PACKAGE_DETAILS: (id: string) => `/packages/${id}`,
  // Auth routes
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  // Customer routes
  PROFILE: '/customer/profile',
  BOOKINGS: '/customer/bookings',
  WISHLIST: '/customer/wishlist',
  BOOKING_CHECKOUT: (packageId: string) => `/customer/booking/${packageId}`,
  CHECKOUT: '/customer/booking/checkout',
  // Admin routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PACKAGES: '/admin/packages',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_USERS: '/admin/users',
};

// API Routes
export const API_ROUTES = {
  // Auth APIs
  AUTH_SIGNUP: '/api/auth/signup',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_ME: '/api/auth/me',
  AUTH_FORGOT_PASSWORD: '/api/auth/forgot-password',
  AUTH_RESET_PASSWORD: '/api/auth/reset-password',
  AUTH_VERIFY_EMAIL: '/api/auth/verify-email',
  AUTH_VERIFY_OTP: '/api/auth/verify-otp',
  AUTH_SOCIAL_LOGIN: '/api/auth/social-login',
  // User APIs
  USERS: '/api/users',
  USER_PROFILE: '/api/users/profile',
  // Package APIs
  PACKAGES: '/api/packages',
  PACKAGE_BY_ID: (id: string) => `/api/packages/${id}`,
  PACKAGES_CREATE: '/api/packages/create',
  PACKAGES_UPDATE: '/api/packages/update',
  PACKAGES_DELETE: '/api/packages/delete',
  // Booking APIs
  BOOKINGS: '/api/bookings',
  USER_BOOKINGS: '/api/bookings/user',
  BOOKING_BY_ID: (id: string) => `/api/bookings/${id}`,
  BOOKINGS_CREATE: '/api/bookings/create',
  BOOKINGS_UPDATE: '/api/bookings/update',
  // Admin APIs
  ADMIN_STATS: '/api/admin/stats',
  ADMIN_RECENT_BOOKINGS: '/api/admin/recent-bookings',
  // Upload APIs
  UPLOAD_CLOUDINARY: '/api/upload/cloudinary',
  // Communication APIs
  WHATSAPP_SEND: '/api/whatsapp/send-message',
  EMAIL_SEND: '/api/email/send-confirmation',
  CONTACT: '/api/contact',
};

// Authentication Constants
export const AUTH_CONSTANTS = {
  TOKEN_EXPIRY: '2d', // 2 days
  COOKIE_NAME: 'auth-token',
  EMAIL_VERIFICATION_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
  PASSWORD_RESET_EXPIRY: 60 * 60 * 1000, // 1 hour
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 25,
};

// Booking Status Constants
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Payment Status Constants
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
} as const;

// Package Types
export const PACKAGE_TYPES = {
  INTERNATIONAL: 'international',
  DOMESTIC: 'domestic',
  ADVENTURE: 'adventure',
  LUXURY: 'luxury',
  BUDGET: 'budget',
  FAMILY: 'family',
  HONEYMOON: 'honeymoon',
  PILGRIMAGE: 'pilgrimage',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  // Auth errors
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_EXISTS: 'Email already registered',
  TOKEN_EXPIRED: 'Token has expired',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  // Validation errors
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  // Server errors
  SERVER_ERROR: 'Internal server error',
  DATABASE_ERROR: 'Database connection error',
  NETWORK_ERROR: 'Network connection failed',
  // Booking errors
  BOOKING_NOT_FOUND: 'Booking not found',
  PACKAGE_NOT_AVAILABLE: 'Package is no longer available',
  INSUFFICIENT_PAYMENT: 'Payment amount is insufficient',
  BOOKING_ALREADY_CANCELLED: 'Booking is already cancelled',
  // File upload errors
  FILE_TOO_LARGE: 'File size exceeds maximum limit',
  INVALID_FILE_TYPE: 'Invalid file type',
  UPLOAD_FAILED: 'File upload failed',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  // Auth success
  LOGIN_SUCCESS: 'Login successful',
  SIGNUP_SUCCESS: 'Account created successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PASSWORD_RESET_SENT: 'Password reset email sent',
  // Booking success
  BOOKING_CREATED: 'Booking created successfully',
  BOOKING_UPDATED: 'Booking updated successfully',
  BOOKING_CANCELLED: 'Booking cancelled successfully',
  PAYMENT_SUCCESSFUL: 'Payment completed successfully',
  // General success
  SAVE_SUCCESS: 'Changes saved successfully',
  DELETE_SUCCESS: 'Deleted successfully',
  UPDATE_SUCCESS: 'Updated successfully',
};

// Countries
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

// Indian States
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