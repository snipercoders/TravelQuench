
// // src/components/auth/SignupForm.tsx
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useAuth } from '@/hooks/useAuth';
// import { Eye, EyeOff, Mail, Lock, User, Phone, UserPlus, Check, AlertCircle } from 'lucide-react';

// interface SignupFormProps {
//   onSuccess?: () => void;
//   redirectTo?: string;
// }

// const SignupForm: React.FC<SignupFormProps> = ({ onSuccess, redirectTo = '/' }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState(0);

//   const { signup } = useAuth();
//   const router = useRouter();

//   const checkPasswordStrength = (password: string) => {
//     let strength = 0;
//     if (password.length >= 6) strength++;
//     if (password.match(/[a-z]/)) strength++;
//     if (password.match(/[A-Z]/)) strength++;
//     if (password.match(/[0-9]/)) strength++;
//     if (password.match(/[^a-zA-Z0-9]/)) strength++;
//     return strength;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Check password strength
//     if (name === 'password') {
//       setPasswordStrength(checkPasswordStrength(value));
//     }

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     // Name validation
//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     } else if (formData.name.trim().length < 2) {
//       newErrors.name = 'Name must be at least 2 characters';
//     } else if (formData.name.trim().length > 100) {
//       newErrors.name = 'Name cannot exceed 100 characters';
//     } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name)) {
//       newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
//     }

//     // Email validation
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     // Phone validation (optional but if provided must be valid)
//     if (formData.phone && formData.phone.trim()) {
//       const cleanPhone = formData.phone.replace(/\D/g, '');
//       if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
//         newErrors.phone = 'Please enter a valid 10-digit phone number starting with 6-9';
//       }
//     }

//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     } else if (formData.password.length > 128) {
//       newErrors.password = 'Password must be less than 128 characters';
//     } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
//       newErrors.password = 'Password must contain at least one letter and one number';
//     }

//     // Confirm password validation
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     setErrors({}); // Clear any previous errors

//     try {
//       const result = await signup(formData);

//       if (result.success) {
//         if (onSuccess) {
//           onSuccess();
//         } else {
//           router.push(redirectTo);
//         }
//       } else {
//         setErrors({ general: result.message });
//       }
//     } catch (error) {
//       console.error('Signup error:', error);
//       setErrors({ general: 'An unexpected error occurred. Please try again.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getPasswordStrengthColor = () => {
//     if (passwordStrength < 2) return 'bg-red-400';
//     if (passwordStrength < 4) return 'bg-yellow-400';
//     return 'bg-green-400';
//   };

//   const getPasswordStrengthText = () => {
//     if (passwordStrength < 2) return 'Weak';
//     if (passwordStrength < 4) return 'Medium';
//     return 'Strong';
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="bg-white p-8 rounded-lg shadow-lg">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Travel Quench</h2>
//           <p className="text-gray-600">Create your account and start exploring amazing destinations</p>
//         </div>

//         {errors.general && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
//             <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
//             <p className="text-red-600 text-sm">{errors.general}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//               Full Name *
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <User className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                   errors.name ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter your full name"
//                 autoComplete="name"
//                 maxLength={100}
//               />
//             </div>
//             {errors.name && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <AlertCircle className="h-4 w-4 mr-1" />
//                 {errors.name}
//               </p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address *
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Mail className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                   errors.email ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter your email"
//                 autoComplete="email"
//               />
//             </div>
//             {errors.email && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <AlertCircle className="h-4 w-4 mr-1" />
//                 {errors.email}
//               </p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//               Phone Number (Optional)
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Phone className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                   errors.phone ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter 10-digit phone number"
//                 autoComplete="tel"
//                 maxLength={10}
//               />
//             </div>
//             {errors.phone && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <AlertCircle className="h-4 w-4 mr-1" />
//                 {errors.phone}
//               </p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password *
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                   errors.password ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="Create a password"
//                 autoComplete="new-password"
//                 maxLength={128}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                 )}
//               </button>
//             </div>
//             {formData.password && (
//               <div className="mt-2">
//                 <div className="flex items-center space-x-2">
//                   <div className="flex-1 bg-gray-200 rounded-full h-2">
//                     <div
//                       className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
//                       style={{ width: `${(passwordStrength / 5) * 100}%` }}
//                     ></div>
//                   </div>
//                   <span className={`text-xs font-medium ${
//                     passwordStrength < 2 ? 'text-red-600' : 
//                     passwordStrength < 4 ? 'text-yellow-600' : 'text-green-600'
//                   }`}>
//                     {getPasswordStrengthText()}
//                   </span>
//                 </div>
//               </div>
//             )}
//             {errors.password && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <AlertCircle className="h-4 w-4 mr-1" />
//                 {errors.password}
//               </p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//               Confirm Password *
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
//                   errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="Confirm your password"
//                 autoComplete="new-password"
//                 maxLength={128}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               >
//                 {showConfirmPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                 )}
//               </button>
//             </div>
//             {formData.confirmPassword && formData.password === formData.confirmPassword && (
//               <div className="mt-1 flex items-center text-green-600">
//                 <Check className="h-4 w-4 mr-1" />
//                 <span className="text-sm">Passwords match</span>
//               </div>
//             )}
//             {errors.confirmPassword && (
//               <p className="mt-1 text-sm text-red-600 flex items-center">
//                 <AlertCircle className="h-4 w-4 mr-1" />
//                 {errors.confirmPassword}
//               </p>
//             )}
//           </div>

//           <div className="bg-blue-50 p-4 rounded-lg">
//             <h4 className="text-sm font-medium text-blue-800 mb-2">Password Requirements:</h4>
//             <ul className="text-xs text-blue-700 space-y-1">
//               <li className="flex items-center">
//                 <Check className={`h-3 w-3 mr-2 ${formData.password.length >= 6 ? 'text-green-600' : 'text-gray-400'}`} />
//                 At least 6 characters long
//               </li>
//               <li className="flex items-center">
//                 <Check className={`h-3 w-3 mr-2 ${/[a-zA-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`} />
//                 Contains at least one letter
//               </li>
//               <li className="flex items-center">
//                 <Check className={`h-3 w-3 mr-2 ${/\d/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`} />
//                 Contains at least one number
//               </li>
//             </ul>
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Creating Account...
//               </>
//             ) : (
//               <>
//                 <UserPlus className="h-5 w-5 mr-2" />
//                 Create Account
//               </>
//             )}
//           </button>
//         </form>

//         <div className="mt-8 text-center">
//           <p className="text-gray-600">
//             Already have an account?{' '}
//             <Link 
//               href="/auth/login" 
//               className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>

//         <div className="mt-6 text-center">
//           <p className="text-xs text-gray-500">
//             By creating an account, you agree to our{' '}
//             <Link href="/terms" className="text-blue-600 hover:text-blue-500">
//               Terms of Service
//             </Link>{' '}
//             and{' '}
//             <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
//               Privacy Policy
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;
















import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff, Mail, Lock, User, Phone, UserPlus, Check, AlertCircle } from 'lucide-react';

interface SignupFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess, redirectTo = '/auth/login' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string | string[]>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { signup } = useAuth();
  const router = useRouter();

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    const feedback: string[] = [];

    if (password.length >= 6) strength++;
    else feedback.push('At least 6 characters long');
    if (password.match(/[a-z]/)) strength++;
    else feedback.push('Contains at least one lowercase letter');
    if (password.match(/[A-Z]/)) strength++;
    else feedback.push('Contains at least one uppercase letter');
    if (password.match(/[0-9]/)) strength++;
    else feedback.push('Contains at least one number');
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    else feedback.push('Contains at least one special character');

    return {
      score: strength,
      feedback,
      isValid: strength >= 3 && password.length >= 6,
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Check password strength
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value).score);
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name cannot exceed 100 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name)) {
      newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but if provided must be valid)
    if (formData.phone && formData.phone.trim()) {
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number starting with 6-9';
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = checkPasswordStrength(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.feedback.join(', ');
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({}); // Clear any previous errors

    try {
      const result = await signup(formData);

      if (result.success) {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push('http://localhost:3000/auth/login');
        }
      } else {
        console.error('Signup error:', result);
        if (result.errors && Array.isArray(result.errors)) {
          // Handle validation errors from backend
          setErrors({
            general: result.message,
            backendErrors: result.errors,
          });
        } else {
          setErrors({ general: result.message });
        }
      }
    } catch (error) {
      console.error('Unexpected signup error:', error);
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 2) return 'bg-red-400';
    if (passwordStrength < 4) return 'bg-yellow-400';
    return 'bg-green-400';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 2) return 'Weak';
    if (passwordStrength < 4) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Travel Quench</h2>
          <p className="text-gray-600">Create your account and start exploring amazing destinations</p>
        </div>

        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-red-600 text-sm">{errors.general}</p>
              {errors.backendErrors && Array.isArray(errors.backendErrors) && (
                <ul className="mt-2 text-sm text-red-600 list-disc list-inside">
                  {errors.backendErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
                autoComplete="name"
                maxLength={100}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter 10-digit phone number"
                autoComplete="tel"
                maxLength={10}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Create a password"
                autoComplete="new-password"
                maxLength={128}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      passwordStrength < 2
                        ? 'text-red-600'
                        : passwordStrength < 4
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`}
                  >
                    {getPasswordStrengthText()}
                  </span>
                </div>
              </div>
            )}
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Confirm your password"
                autoComplete="new-password"
                maxLength={128}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <div className="mt-1 flex items-center text-green-600">
                <Check className="h-4 w-4 mr-1" />
                <span className="text-sm">Passwords match</span>
              </div>
            )}
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Password Requirements:</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li className="flex items-center">
                <Check
                  className={`h-3 w-3 mr-2 ${formData.password.length >= 6 ? 'text-green-600' : 'text-gray-400'}`}
                />
                At least 6 characters long
              </li>
              <li className="flex items-center">
                <Check
                  className={`h-3 w-3 mr-2 ${/[a-zA-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}
                />
                Contains at least one letter
              </li>
              <li className="flex items-center">
                <Check
                  className={`h-3 w-3 mr-2 ${/\d/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}
                />
                Contains at least one number
              </li>
              <li className="flex items-center">
                <Check
                  className={`h-3 w-3 mr-2 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}
                />
                Contains at least one uppercase letter
              </li>
              <li className="flex items-center">
                <Check
                  className={`h-3 w-3 mr-2 ${/[^a-zA-Z0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`}
                />
                Contains at least one special character
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5 mr-2" />
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;