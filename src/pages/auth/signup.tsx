// pages/auth/signup.tsx
import React from 'react';
import Head from 'next/head';
import { useGuestOnly } from '@/hooks/useAuth';
import SignupForm from '@/components/auth/SignupForm';

const SignupPage: React.FC = () => {
  const { isLoading } = useGuestOnly('/');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Create Account - Travel Quench</title>
        <meta name="description" content="Join Travel Quench and start exploring incredible travel destinations with our expertly curated packages." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <SignupForm />
        </div>
      </div>
    </>
  );
};

export default SignupPage;
