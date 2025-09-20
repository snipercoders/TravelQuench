// src/pages/auth/verify-email.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const router = useRouter();
  const { email, token } = router.query;
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (email && token) {
      // Here you would typically call an API to verify the email
      // For now, we'll just show a placeholder
      setStatus('success');
      setMessage('Email verification feature is not implemented yet.');
    } else if (email) {
      setStatus('error');
      setMessage('Please check your email for verification instructions.');
    }
  }, [email, token]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Email Verification
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className={`text-center p-4 rounded-md ${
            status === 'success' 
              ? 'bg-green-50 text-green-700' 
              : status === 'error'
              ? 'bg-red-50 text-red-700'
              : 'bg-blue-50 text-blue-700'
          }`}>
            {status === 'loading' && (
              <div>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p>Verifying your email...</p>
              </div>
            )}
            
            {status === 'success' && (
              <div>
                <div className="text-green-600 text-4xl mb-4">✓</div>
                <p className="font-medium mb-2">Verification Status</p>
                <p className="text-sm">{message}</p>
              </div>
            )}
            
            {status === 'error' && (
              <div>
                <div className="text-red-600 text-4xl mb-4">✗</div>
                <p className="font-medium mb-2">Verification Required</p>
                <p className="text-sm">{message}</p>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Continue to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}