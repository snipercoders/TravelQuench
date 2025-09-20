// src/components/common/BookButton.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui';
import { Calendar, ArrowRight } from 'lucide-react';

interface BookButtonProps {
  packageId: string;
  packageTitle: string;
  className?: string;
  variant?: 'primary' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const BookButton: React.FC<BookButtonProps> = ({
  packageId,
  packageTitle,
  className = '',
  variant = 'primary',
  size = 'md',
  children = 'Book Now'
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const handleBookClick = () => {
    if (!isAuthenticated) {
      // Store intended destination for redirect after login
      localStorage.setItem('redirectAfterLogin', `/customer/booking/${packageId}`);
      router.push('/auth/login');
      return;
    }

    // User is authenticated, proceed to booking page
    router.push(`/customer/booking/${packageId}`);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBookClick}
      disabled={isLoading}
      className={`flex items-center ${className}`}
    >
      <Calendar className="w-4 h-4 mr-2" />
      {children}
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  );
};

export default BookButton;