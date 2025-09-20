// src/components/auth/OTPVerification.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ROUTES, API_ROUTES } from '@/lib/utils/constants';
import { Button, Card } from '@/components/ui';
import toast from 'react-hot-toast';

interface OTPVerificationProps {
  email: string;
  onVerified: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ email, onVerified }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6 && /^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      toast.error('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(API_ROUTES.VERIFY_OTP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otpString }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('Email verified successfully!');
        onVerified();
      } else {
        toast.error(result.message || 'Invalid OTP');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      const response = await fetch(API_ROUTES.EMAIL_CONFIRMATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          firstName: 'User', // You might want to pass the actual name
          otp: Math.floor(100000 + Math.random() * 900000).toString()
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('New OTP sent to your email');
        setTimeLeft(300);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        toast.error('Failed to resend OTP');
      }
    } catch (error) {
      toast.error('Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a 6-digit code to <span className="font-medium">{email}</span>
          </p>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enter verification code
              </label>
              <div className="flex space-x-3 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={isLoading}
              disabled={isLoading || otp.join('').length !== 6}
            >
              Verify Email
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            {timeLeft > 0 ? (
              <p className="text-sm text-gray-600">
                Resend code in <span className="font-medium text-primary-600">{formatTime(timeLeft)}</span>
              </p>
            ) : (
              <button
                onClick={handleResendOTP}
                disabled={resendLoading}
                className="text-sm text-primary-600 hover:text-primary-500 font-medium"
              >
                {resendLoading ? 'Sending...' : 'Resend code'}
              </button>
            )}
            
            <div>
              <Link
                href={ROUTES.LOGIN}
                className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to login
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OTPVerification;