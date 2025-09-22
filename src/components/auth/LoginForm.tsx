// // components/auth/LoginForm.tsx
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useAuth } from '@/hooks/useAuth';
// import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';

// interface LoginFormProps {
//   onSuccess?: () => void;
//   redirectTo?: string;
// }

// const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, redirectTo = '/' }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false,
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { login } = useAuth();
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));

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

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     try {
//       const result = await login(formData.email, formData.password, formData.rememberMe);

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
//       setErrors({ general: 'An unexpected error occurred. Please try again.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="bg-white p-8 rounded-lg shadow-lg">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
//           <p className="text-gray-600">Sign in to your Travel Quench account</p>
//         </div>

//         {errors.general && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-red-600 text-sm">{errors.general}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
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
//                 className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.email ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter your email"
//                 autoComplete="email"
//               />
//             </div>
//             {errors.email && (
//               <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password
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
//                 className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                   errors.password ? 'border-red-300' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter your password"
//                 autoComplete="current-password"
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
//             {errors.password && (
//               <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//             )}
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="rememberMe"
//                 name="rememberMe"
//                 type="checkbox"
//                 checked={formData.rememberMe}
//                 onChange={handleChange}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
//                 Keep me signed in (2 days)
//               </label>
//             </div>

//             <Link 
//               href="/auth/forgot-password" 
//               className="text-sm text-blue-600 hover:text-blue-500"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Signing In...
//               </>
//             ) : (
//               <>
//                 <LogIn className="h-5 w-5 mr-2" />
//                 Sign In
//               </>
//             )}
//           </button>
//         </form>

//         <div className="mt-8 text-center">
//           <p className="text-gray-600">
//             Don't have an account?{' '}
//             <Link 
//               href="/auth/signup" 
//               className="text-blue-600 hover:text-blue-500 font-medium"
//             >
//               Create account
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;











// components/auth/LoginForm.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle, X } from 'lucide-react';

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, redirectTo = '/' }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'error' | 'warning'>('error');

  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error and alert when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setAlertMessage(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showAlert = (message: string, type: 'error' | 'warning' = 'error') => {
    setAlertMessage(message);
    setAlertType(type);
    
    // Auto-dismiss alert after 5 seconds
    setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setAlertMessage(null);
    setErrors({});

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Show success message briefly before redirect
        showAlert('Login successful! Redirecting...', 'warning');
        
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          } else {
            router.replace(redirectTo);
          }
        }, 500);
      } else {
        console.log('Login failed with message:', result.message);
        
        // Handle different types of login failures
        if (result.message.includes('Invalid email or password')) {
          showAlert('The credentials you entered are incorrect. Please double-check your email and password and try again.');
        } else if (result.message.includes('Account is deactivated')) {
          showAlert('Your account has been deactivated. Please contact support for assistance.');
        } else if (result.message.includes('Email and password are required')) {
          showAlert('Please fill in all required fields.');
        } else if (result.message.includes('User not found') || result.message.includes('email')) {
          showAlert('No account found with this email address. Please check your email or create a new account.');
        } else {
          // Generic error message
          showAlert(result.message || 'Login failed. Please try again.');
        }
        
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      showAlert('Unable to connect to the server. Please check your internet connection and try again.');
      setIsSubmitting(false);
    }
  };

  const dismissAlert = () => {
    setAlertMessage(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your Travel Quench account</p>
        </div>

        {/* Alert Message */}
        {alertMessage && (
          <div
            className={`mb-6 p-4 rounded-lg border-l-4 flex items-start justify-between animate-fadeIn ${
              alertType === 'error' 
                ? 'bg-red-50 border-red-400' 
                : 'bg-green-50 border-green-400'
            }`}
            role="alert"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertCircle 
                  className={`h-5 w-5 ${
                    alertType === 'error' ? 'text-red-400' : 'text-green-400'
                  }`} 
                />
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  alertType === 'error' ? 'text-red-800' : 'text-green-800'
                }`}>
                  {alertType === 'error' ? 'Login Failed' : 'Success'}
                </p>
                <p className={`text-sm ${
                  alertType === 'error' ? 'text-red-700' : 'text-green-700'
                }`}>
                  {alertMessage}
                </p>
              </div>
            </div>
            <button
              onClick={dismissAlert}
              className={`flex-shrink-0 ml-4 p-1 rounded-full hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                alertType === 'error' 
                  ? 'text-red-700 hover:bg-red-200 focus:ring-red-500' 
                  : 'text-green-700 hover:bg-green-200 focus:ring-green-500'
              }`}
              aria-label="Dismiss alert"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
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
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
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
                  errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                disabled={isSubmitting}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                disabled={isSubmitting}
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                Keep me signed in
              </label>
            </div>

            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing In...
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5 mr-2" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;