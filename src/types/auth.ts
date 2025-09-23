// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface SignupData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   password: string;
//   confirmPassword: string;
// }

// export interface ForgotPasswordData {
//   email: string;
// }

// export interface ResetPasswordData {
//   token: string;
//   password: string;
//   confirmPassword: string;
// }

// export interface OTPVerificationData {
//   email: string;
//   otp: string;
// }

// export interface AuthResponse {
//   success: boolean;
//   message: string;
//   token?: string;
//   user?: User;
// }

// export interface SocialLoginData {
//   provider: 'google' | 'facebook';
//   accessToken: string;
// }








// Add this interface definition at the top of your auth.ts file
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;
  avatar?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface OTPVerificationData {
  email: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface SocialLoginData {
  provider: 'google' | 'facebook';
  accessToken: string;
}