// // src/lib/utils/helpers.ts
// import { format, parseISO } from 'date-fns';

// export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
//   const formatter = new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency,
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   });
//   return formatter.format(amount);
// };

// export const formatDate = (date: string | Date, formatString: string = 'dd MMM yyyy'): string => {
//   const dateObj = typeof date === 'string' ? parseISO(date) : date;
//   return format(dateObj, formatString);
// };

// export const calculateDaysDifference = (startDate: string | Date, endDate: string | Date): number => {
//   const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
//   const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
//   const timeDifference = end.getTime() - start.getTime();
//   return Math.ceil(timeDifference / (1000 * 3600 * 24));
// };

// export const generateBookingId = (): string => {
//   const timestamp = Date.now().toString();
//   const random = Math.random().toString(36).substring(2, 8).toUpperCase();
//   return `TQ${timestamp.slice(-6)}${random}`;
// };

// export const slugify = (text: string): string => {
//   return text
//     .toLowerCase()
//     .replace(/[^\w ]+/g, '')
//     .replace(/ +/g, '-');
// };

// export const truncateText = (text: string, maxLength: number): string => {
//   if (text.length <= maxLength) return text;
//   return text.substring(0, maxLength).trim() + '...';
// };

// export const getInitials = (firstName: string, lastName: string): string => {
//   return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
// };

// export const validateEmail = (email: string): boolean => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// export const validatePhone = (phone: string): boolean => {
//   const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
//   return phoneRegex.test(phone.replace(/\s+/g, ''));
// };

// export const formatPhoneNumber = (phone: string): string => {
//   const cleaned = phone.replace(/\D/g, '');
//   if (cleaned.length === 10) {
//     return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
//   }
//   return phone;
// };

// export const calculateAge = (birthDate: string | Date): number => {
//   const today = new Date();
//   const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
//   let age = today.getFullYear() - birth.getFullYear();
//   const monthDiff = today.getMonth() - birth.getMonth();
  
//   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
//     age--;
//   }
  
//   return age;
// };

// export const getFileExtension = (filename: string): string => {
//   return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
// };

// export const isValidImageType = (type: string): boolean => {
//   const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//   return allowedTypes.includes(type);
// };

// export const isValidVideoType = (type: string): boolean => {
//   const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
//   return allowedTypes.includes(type);
// };

// export const generateWhatsAppURL = (phoneNumber: string, message: string): string => {
//   const encodedMessage = encodeURIComponent(message);
//   return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
// };

// export const debounce = <T extends (...args: any[]) => any>(
//   func: T,
//   wait: number
// ): ((...args: Parameters<T>) => void) => {
//   let timeout: NodeJS.Timeout;
//   return (...args: Parameters<T>) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(null, args), wait);
//   };
// };

// export const throttle = <T extends (...args: any[]) => any>(
//   func: T,
//   limit: number
// ): ((...args: Parameters<T>) => void) => {
//   let inThrottle: boolean;
//   return (...args: Parameters<T>) => {
//     if (!inThrottle) {
//       func.apply(null, args);
//       inThrottle = true;
//       setTimeout(() => (inThrottle = false), limit);
//     }
//   };
// };

// // Utility function for combining class names (used in UI components)
// export function cn(...classes: (string | undefined | null | false)[]): string {
//   return classes.filter(Boolean).join(' ');
// }











// src/lib/utils/helpers.ts
import { format, parseISO } from 'date-fns';

export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
};

export const formatDate = (date: string | Date, formatString: string = 'dd MMM yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatString);
};

export const calculateDaysDifference = (startDate: string | Date, endDate: string | Date): number => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  const timeDifference = end.getTime() - start.getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
};

export const generateBookingId = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TQ${timestamp.slice(-6)}${random}`;
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

export const calculateAge = (birthDate: string | Date): number => {
  const today = new Date();
  const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

export const isValidImageType = (type: string): boolean => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return allowedTypes.includes(type);
};

export const isValidVideoType = (type: string): boolean => {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  return allowedTypes.includes(type);
};

export const generateWhatsAppURL = (phoneNumber: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Utility function for combining class names (used in UI components)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}