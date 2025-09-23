// // src/components/auth/ForgotPasswordForm.tsx
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Mail, ArrowLeft } from 'lucide-react';
// import Link from 'next/link';
// import { forgotPasswordSchema } from '@/lib/utils/validation';
// import { ROUTES, API_ROUTES } from '@/lib/utils/constants';
// import { ForgotPasswordData } from '@/types';
// import { Button, Input, Card } from '@/components/ui';
// import toast from 'react-hot-toast';

// const ForgotPasswordForm: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     getValues,
//   } = useForm<ForgotPasswordData>({
//     resolver: yupResolver(forgotPasswordSchema),
//   });

//   const onSubmit = async (data: ForgotPasswordData) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(API_ROUTES.FORGOT_PASSWORD, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();
      
//       if (result.success) {
//         setIsSubmitted(true);
//         toast.success('Password reset link sent to your email');
//       } else {
//         toast.error(result.message || 'Failed to send reset link');
//       }
//     } catch (error) {
//       toast.error('An unexpected error occurred');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//           <Card padding="lg" className="text-center">
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Mail className="w-8 h-8 text-green-500" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Check your email
//             </h2>
//             <p className="text-gray-600 mb-6">
//               We've sent a password reset link to <strong>{getValues('email')}</strong>
//             </p>
//             <p className="text-sm text-gray-500 mb-6">
//               Didn't receive the email? Check your spam folder or try again.
//             </p>
//             <div className="space-y-3">
//               <Button
//                 onClick={() => setIsSubmitted(false)}
//                 variant="outline"
//                 className="w-full"
//               >
//                 Try again
//               </Button>
//               <Link href={ROUTES.LOGIN}>
//                 <Button variant="ghost" className="w-full">
//                   Back to login
//                 </Button>
//               </Link>
//             </div>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <div className="flex justify-center">
//             <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
//               <span className="text-white font-bold text-2xl">TQ</span>
//             </div>
//           </div>
//           <h2 className="mt-6 text-3xl font-bold text-gray-900">
//             Forgot Password?
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Enter your email address and we'll send you a link to reset your password
//           </p>
//         </div>

//         <Card padding="lg">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <Input
//               label="Email Address"
//               type="email"
//               placeholder="Enter your email"
//               leftIcon={<Mail />}
//               error={errors.email?.message}
//               {...register('email')}
//             />

//             <Button
//               type="submit"
//               className="w-full"
//               loading={isLoading}
//               disabled={isLoading}
//             >
//               Send Reset Link
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <Link
//               href={ROUTES.LOGIN}
//               className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to login
//             </Link>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordForm;

















// // // src/components/auth/ForgotPasswordForm.tsx

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Mail, ArrowLeft } from 'lucide-react';
// import Link from 'next/link';
// import { forgotPasswordSchema } from '@/lib/utils/validation';
// import { ROUTES, API_ROUTES } from '@/lib/utils/constants';
// import { ForgotPasswordData } from '@/types';
// import { Button, Input, Card } from '@/components/ui';
// import toast from 'react-hot-toast';

// const ForgotPasswordForm: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     getValues,
//   } = useForm<ForgotPasswordData>({
//     resolver: yupResolver(forgotPasswordSchema),
//   });

//   const onSubmit = async (data: ForgotPasswordData) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(API_ROUTES.FORGOT_PASSWORD, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();
      
//       if (result.success) {
//         setIsSubmitted(true);
//         toast.success('Password reset link sent to your email');
//       } else {
//         toast.error(result.message || 'Failed to send reset link');
//       }
//     } catch {
//       toast.error('An unexpected error occurred');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//           <Card padding="lg" className="text-center">
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Mail className="w-8 h-8 text-green-500" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Check your email
//             </h2>
//             <p className="text-gray-600 mb-6">
//               We&apos;ve sent a password reset link to <strong>{getValues('email')}</strong>
//             </p>
//             <p className="text-sm text-gray-500 mb-6">
//               Didn&apos;t receive the email? Check your spam folder or try again.
//             </p>
//             <div className="space-y-3">
//               <Button
//                 onClick={() => setIsSubmitted(false)}
//                 variant="outline"
//                 className="w-full"
//               >
//                 Try again
//               </Button>
//               <Link href={ROUTES.LOGIN}>
//                 <Button variant="ghost" className="w-full">
//                   Back to login
//                 </Button>
//               </Link>
//             </div>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <div className="flex justify-center">
//             <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
//               <span className="text-white font-bold text-2xl">TQ</span>
//             </div>
//           </div>
//           <h2 className="mt-6 text-3xl font-bold text-gray-900">
//             Forgot Password?
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Enter your email address and we&apos;ll send you a link to reset your password
//           </p>
//         </div>

//         <Card padding="lg">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <Input
//               label="Email Address"
//               type="email"
//               placeholder="Enter your email"
//               leftIcon={<Mail />}
//               error={errors.email?.message}
//               {...register('email')}
//             />

//             <Button
//               type="submit"
//               className="w-full"
//               loading={isLoading}
//               disabled={isLoading}
//             >
//               Send Reset Link
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <Link
//               href={ROUTES.LOGIN}
//               className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to login
//             </Link>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordForm;






// src/components/auth/ForgotPasswordForm.tsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { forgotPasswordSchema } from '@/lib/utils/validation';
import { ROUTES, API_ROUTES } from '@/lib/utils/constants';
import { ForgotPasswordData } from '@/types';
import { Button, Input, Card } from '@/components/ui';
import toast from 'react-hot-toast';

const ForgotPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordData>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    try {
      const response = await fetch(API_ROUTES.AUTH_FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        toast.success('Password reset link sent to your email');
      } else {
        toast.error(result.message || 'Failed to send reset link');
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Check your email
            </h2>
            <p className="text-gray-600 mb-6">
              We&apos;ve sent a password reset link to <strong>{getValues('email')}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Didn&apos;t receive the email? Check your spam folder or try again.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full"
              >
                Try again
              </Button>
              <Link href={ROUTES.LOGIN}>
                <Button variant="ghost" className="w-full">
                  Back to login
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">TQ</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Forgot Password?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              leftIcon={<Mail />}
              error={errors.email?.message}
              {...register('email')}
            />

            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
              disabled={isLoading}
            >
              Send Reset Link
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href={ROUTES.LOGIN}
              className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;