
// // src/lib/utils/validation.ts
// import { isValidEmail, isValidPhone, validatePasswordStrength } from '../auth/utils';

// interface SignupData {
//   firstName?: string;
//   lastName?: string;
//   name?: string;
//   email: string;
//   phone?: string;
//   password: string;
//   confirmPassword: string;
// }

// interface LoginData {
//   email: string;
//   password: string;
// }

// /**
//  * Validate signup form data
//  */
// export const validateSignupData = (data: SignupData): string[] => {
//   const errors: string[] = [];

//   // Name validation
//   if (!data.name && (!data.firstName || !data.lastName)) {
//     errors.push('Name is required');
//   }

//   if (data.name && data.name.trim().length < 2) {
//     errors.push('Name must be at least 2 characters long');
//   }

//   if (data.firstName && data.firstName.trim().length < 1) {
//     errors.push('First name must be at least 1 character long');
//   }

//   if (data.lastName && data.lastName.trim().length < 1) {
//     errors.push('Last name must be at least 1 character long');
//   }

//   // Email validation
//   if (!data.email) {
//     errors.push('Email is required');
//   } else if (!isValidEmail(data.email)) {
//     errors.push('Please enter a valid email address');
//   }

//   // Phone validation (optional)
//   if (data.phone && !isValidPhone(data.phone)) {
//     errors.push('Please enter a valid phone number');
//   }

//   // Password validation
//   if (!data.password) {
//     errors.push('Password is required');
//   } else {
//     const passwordValidation = validatePasswordStrength(data.password);
//     if (!passwordValidation.isValid) {
//       errors.push(...passwordValidation.errors);
//     }
//   }

//   // Confirm password validation
//   if (!data.confirmPassword) {
//     errors.push('Please confirm your password');
//   } else if (data.password !== data.confirmPassword) {
//     errors.push('Passwords do not match');
//   }

//   return errors;
// };

// /**
//  * Validate login form data
//  */
// export const validateLoginData = (data: LoginData): string[] => {
//   const errors: string[] = [];

//   if (!data.email) {
//     errors.push('Email is required');
//   } else if (!isValidEmail(data.email)) {
//     errors.push('Please enter a valid email address');
//   }

//   if (!data.password) {
//     errors.push('Password is required');
//   }

//   return errors;
// };

// /**
//  * Validate user update data
//  */
// export const validateUserUpdateData = (data: Partial<SignupData>): string[] => {
//   const errors: string[] = [];

//   if (data.name && data.name.trim().length < 2) {
//     errors.push('Name must be at least 2 characters long');
//   }

//   if (data.firstName && data.firstName.trim().length < 1) {
//     errors.push('First name must be at least 1 character long');
//   }

//   if (data.lastName && data.lastName.trim().length < 1) {
//     errors.push('Last name must be at least 1 character long');
//   }

//   if (data.email && !isValidEmail(data.email)) {
//     errors.push('Please enter a valid email address');
//   }

//   if (data.phone && !isValidPhone(data.phone)) {
//     errors.push('Please enter a valid phone number');
//   }

//   if (data.password) {
//     const passwordValidation = validatePasswordStrength(data.password);
//     if (!passwordValidation.isValid) {
//       errors.push(...passwordValidation.errors);
//     }
//   }

//   return errors;
// };

// /**
//  * Validate package data
//  */
// export const validatePackageData = (data: any): string[] => {
//   const errors: string[] = [];

//   if (!data.title || data.title.trim().length < 3) {
//     errors.push('Package title must be at least 3 characters long');
//   }

//   if (!data.description || data.description.trim().length < 10) {
//     errors.push('Package description must be at least 10 characters long');
//   }

//   if (!data.price || data.price <= 0) {
//     errors.push('Package price must be greater than 0');
//   }

//   if (!data.duration || data.duration <= 0) {
//     errors.push('Package duration must be greater than 0');
//   }

//   if (!data.destinations || !Array.isArray(data.destinations) || data.destinations.length === 0) {
//     errors.push('At least one destination is required');
//   }

//   return errors;
// };

// /**
//  * Validate booking data
//  */
// export const validateBookingData = (data: any): string[] => {
//   const errors: string[] = [];

//   if (!data.packageId) {
//     errors.push('Package ID is required');
//   }

//   if (!data.travelers || data.travelers <= 0) {
//     errors.push('Number of travelers must be greater than 0');
//   }

//   if (!data.travelDate) {
//     errors.push('Travel date is required');
//   } else {
//     const travelDate = new Date(data.travelDate);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     if (travelDate < today) {
//       errors.push('Travel date cannot be in the past');
//     }
//   }

//   if (!data.contactName || data.contactName.trim().length < 2) {
//     errors.push('Contact name must be at least 2 characters long');
//   }

//   if (!data.contactEmail || !isValidEmail(data.contactEmail)) {
//     errors.push('Valid contact email is required');
//   }

//   if (!data.contactPhone || !isValidPhone(data.contactPhone)) {
//     errors.push('Valid contact phone number is required');
//   }

//   return errors;
// };

// /**
//  * Sanitize and validate file upload
//  */
// export const validateFileUpload = (file: any, allowedTypes: string[] = [], maxSize: number = 5 * 1024 * 1024): string[] => {
//   const errors: string[] = [];

//   if (!file) {
//     errors.push('File is required');
//     return errors;
//   }

//   if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
//     errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
//   }

//   if (file.size > maxSize) {
//     errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
//   }

//   return errors;
// };

// /**
//  * Validate contact form data
//  */
// export const validateContactData = (data: any): string[] => {
//   const errors: string[] = [];

//   if (!data.name || data.name.trim().length < 2) {
//     errors.push('Name must be at least 2 characters long');
//   }

//   if (!data.email || !isValidEmail(data.email)) {
//     errors.push('Valid email address is required');
//   }

//   if (!data.subject || data.subject.trim().length < 3) {
//     errors.push('Subject must be at least 3 characters long');
//   }

//   if (!data.message || data.message.trim().length < 10) {
//     errors.push('Message must be at least 10 characters long');
//   }

//   if (data.phone && !isValidPhone(data.phone)) {
//     errors.push('Please enter a valid phone number');
//   }

//   return errors;
// };










// // // src/lib/utils/validation.ts

// import { getPasswordStrength } from '../auth/utils';

// interface SignupData {
//   name: string;
//   email: string;
//   phone?: string;
//   password: string;
//   confirmPassword: string;
// }

// interface LoginData {
//   email: string;
//   password: string;
// }

// /**
//  * Validate email format
//  */
// export const isValidEmail = (email: string): boolean => {
//   return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
// };

// /**
//  * Validate phone format (Indian 10-digit number starting with 6-9)
//  */
// export const isValidPhone = (phone: string): boolean => {
//   return /^[6-9]\d{9}$/.test(phone);
// };

// /**
//  * Validate signup form data
//  */
// export const validateSignupData = (data: SignupData): string[] => {
//   const errors: string[] = [];

//   // Name validation
//   if (!data.name) {
//     errors.push('Name is required');
//   } else if (data.name.trim().length < 2) {
//     errors.push('Name must be at least 2 characters long');
//   } else if (!/^[a-zA-Z\s'-]+$/.test(data.name)) {
//     errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
//   }

//   // Email validation
//   if (!data.email) {
//     errors.push('Email is required');
//   } else if (!isValidEmail(data.email)) {
//     errors.push('Please enter a valid email address');
//   }

//   // Phone validation (optional)
//   if (data.phone && !isValidPhone(data.phone)) {
//     errors.push('Please enter a valid phone number');
//   }

//   // Password validation
//   if (!data.password) {
//     errors.push('Password is required');
//   } else {
//     const passwordValidation = getPasswordStrength(data.password);
//     if (!passwordValidation.isValid) {
//       errors.push(...passwordValidation.feedback);
//     }
//   }

//   // Confirm password validation
//   if (!data.confirmPassword) {
//     errors.push('Please confirm your password');
//   } else if (data.password !== data.confirmPassword) {
//     errors.push('Passwords do not match');
//   }

//   return errors;
// };

// /**
//  * Validate login form data
//  */
// export const validateLoginData = (data: LoginData): string[] => {
//   const errors: string[] = [];

//   if (!data.email) {
//     errors.push('Email is required');
//   } else if (!isValidEmail(data.email)) {
//     errors.push('Please enter a valid email address');
//   }

//   if (!data.password) {
//     errors.push('Password is required');
//   }

//   return errors;
// };

// /**
//  * Validate user update data
//  */
// export const validateUserUpdateData = (data: Partial<SignupData>): string[] => {
//   const errors: string[] = [];

//   if (data.name && data.name.trim().length < 2) {
//     errors.push('Name must be at least 2 characters long');
//   } else if (data.name && !/^[a-zA-Z\s'-]+$/.test(data.name)) {
//     errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
//   }

//   if (data.email && !isValidEmail(data.email)) {
//     errors.push('Please enter a valid email address');
//   }

//   if (data.phone && !isValidPhone(data.phone)) {
//     errors.push('Please enter a valid phone number');
//   }

//   if (data.password) {
//     const passwordValidation = getPasswordStrength(data.password);
//     if (!passwordValidation.isValid) {
//       errors.push(...passwordValidation.feedback);
//     }
//   }

//   return errors;
// };

// /**
//  * Validate package data
//  */
// export const validatePackageData = (data: any): string[] => {
//   const errors: string[] = [];

//   if (!data.title || data.title.trim().length < 3) {
//     errors.push('Package title must be at least 3 characters long');
//   }

//   if (!data.description || data.description.trim().length < 10) {
//     errors.push('Package description must be at least 10 characters long');
//   }

//   if (!data.price || data.price <= 0) {
//     errors.push('Package price must be greater than 0');
//   }

//   if (!data.duration || data.duration <= 0) {
//     errors.push('Package duration must be greater than 0');
//   }

//   if (!data.destinations || !Array.isArray(data.destinations) || data.destinations.length === 0) {
//     errors.push('At least one destination is required');
//   }

//   return errors;
// };

// /**
//  * Validate booking data
//  */
// export const validateBookingData = (data: any): string[] => {
//   const errors: string[] = [];

//   if (!data.packageId) {
//     errors.push('Package ID is required');
//   }

//   if (!data.travelers || data.travelers <= 0) {
//     errors.push('Number of travelers must be greater than 0');
//   }

//   if (!data.travelDate) {
//     errors.push('Travel date is required');
//   } else {
//     const travelDate = new Date(data.travelDate);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     if (travelDate < today) {
//       errors.push('Travel date cannot be in the past');
//     }
//   }

//   if (!data.contactName || data.contactName.trim().length < 2) {
//     errors.push('Contact name must be at least 2 characters long');
//   }

//   if (!data.contactEmail || !isValidEmail(data.contactEmail)) {
//     errors.push('Valid contact email is required');
//   }

//   if (!data.contactPhone || !isValidPhone(data.contactPhone)) {
//     errors.push('Valid contact phone number is required');
//   }

//   return errors;
// };

// /**
//  * Sanitize and validate file upload
//  */
// export const validateFileUpload = (file: any, allowedTypes: string[] = [], maxSize: number = 5 * 1024 * 1024): string[] => {
//   const errors: string[] = [];

//   if (!file) {
//     errors.push('File is required');
//     return errors;
//   }

//   if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
//     errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
//   }

//   if (file.size > maxSize) {
//     errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
//   }

//   return errors;
// };

// /**
//  * Validate contact form data
//  */
// export const validateContactData = (data: any): string[] => {
//   const errors: string[] = [];

//   if (!data.name || data.name.trim().length < 2) {
//     errors.push('Name must be at least 2 characters long');
//   }

//   if (!data.email || !isValidEmail(data.email)) {
//     errors.push('Valid email address is required');
//   }

//   if (!data.subject || data.subject.trim().length < 3) {
//     errors.push('Subject must be at least 3 characters long');
//   }

//   if (!data.message || data.message.trim().length < 10) {
//     errors.push('Message must be at least 10 characters long');
//   }

//   if (data.phone && !isValidPhone(data.phone)) {
//     errors.push('Please enter a valid phone number');
//   }

//   return errors;
// };










// src/lib/utils/validation.ts
import { getPasswordStrength } from '../auth/utils';

interface SignupData {
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

/**
 * Validate phone format (Indian 10-digit number starting with 6-9)
 */
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(cleaned);
};

/**
 * Validate signup form data (simplified to match your current needs)
 */
export const validateSignupData = (data: SignupData): string[] => {
  const errors: string[] = [];

  // Name validation - simplified to work with single name field
  const nameToValidate = data.name || (data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : '');
  
  if (!nameToValidate.trim()) {
    errors.push('Name is required');
  } else if (nameToValidate.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (nameToValidate.trim().length > 100) {
    errors.push('Name cannot exceed 100 characters');
  } else if (!/^[a-zA-Z\s'-]+$/.test(nameToValidate.trim())) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
  }

  // Email validation
  if (!data.email) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }

  // Phone validation (optional)
  if (data.phone && data.phone.trim()) {
    if (!isValidPhone(data.phone)) {
      errors.push('Please enter a valid 10-digit phone number starting with 6-9');
    }
  }

  // Password validation
  if (!data.password) {
    errors.push('Password is required');
  } else {
    const passwordValidation = getPasswordStrength(data.password);
    if (!passwordValidation.isValid) {
      errors.push(...passwordValidation.feedback);
    }
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.push('Please confirm your password');
  } else if (data.password !== data.confirmPassword) {
    errors.push('Passwords do not match');
  }

  return errors;
};

/**
 * Validate login form data
 */
export const validateLoginData = (data: LoginData): string[] => {
  const errors: string[] = [];

  if (!data.email) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!data.password) {
    errors.push('Password is required');
  }

  return errors;
};

/**
 * Validate user update data (for admin user management)
 */
export const validateUserUpdateData = (data: Partial<SignupData>): string[] => {
  const errors: string[] = [];

  if (data.name && data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (data.name && !/^[a-zA-Z\s'-]+$/.test(data.name)) {
    errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
  }

  if (data.firstName && data.firstName.trim().length < 1) {
    errors.push('First name must be at least 1 character long');
  }

  if (data.lastName && data.lastName.trim().length < 1) {
    errors.push('Last name must be at least 1 character long');
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Please enter a valid phone number');
  }

  if (data.password) {
    const passwordValidation = getPasswordStrength(data.password);
    if (!passwordValidation.isValid) {
      errors.push(...passwordValidation.feedback);
    }
  }

  return errors;
};

/**
 * Validate package data
 */
export const validatePackageData = (data: any): string[] => {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length < 3) {
    errors.push('Package title must be at least 3 characters long');
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push('Package description must be at least 10 characters long');
  }

  if (!data.price || data.price <= 0) {
    errors.push('Package price must be greater than 0');
  }

  if (!data.duration || data.duration <= 0) {
    errors.push('Package duration must be greater than 0');
  }

  if (!data.destinations || !Array.isArray(data.destinations) || data.destinations.length === 0) {
    errors.push('At least one destination is required');
  }

  return errors;
};

/**
 * Validate booking data
 */
export const validateBookingData = (data: any): string[] => {
  const errors: string[] = [];

  if (!data.packageId) {
    errors.push('Package ID is required');
  }

  if (!data.travelers || data.travelers <= 0) {
    errors.push('Number of travelers must be greater than 0');
  }

  if (!data.travelDate) {
    errors.push('Travel date is required');
  } else {
    const travelDate = new Date(data.travelDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (travelDate < today) {
      errors.push('Travel date cannot be in the past');
    }
  }

  if (!data.contactName || data.contactName.trim().length < 2) {
    errors.push('Contact name must be at least 2 characters long');
  }

  if (!data.contactEmail || !isValidEmail(data.contactEmail)) {
    errors.push('Valid contact email is required');
  }

  if (!data.contactPhone || !isValidPhone(data.contactPhone)) {
    errors.push('Valid contact phone number is required');
  }

  return errors;
};

/**
 * Validate file upload
 */
export const validateFileUpload = (file: any, allowedTypes: string[] = [], maxSize: number = 5 * 1024 * 1024): string[] => {
  const errors: string[] = [];

  if (!file) {
    errors.push('File is required');
    return errors;
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
  }

  if (file.size > maxSize) {
    errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
  }

  return errors;
};

/**
 * Validate contact form data
 */
export const validateContactData = (data: any): string[] => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email address is required');
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters long');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Please enter a valid phone number');
  }

  return errors;
};