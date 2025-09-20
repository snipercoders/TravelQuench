// src/components/ui/Card.tsx
import React from 'react';
import { cn } from '@/lib/utils/helpers';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'default' | 'lg';
}

const Card: React.FC<CardProps> = ({
  className,
  variant = 'default',
  padding = 'default',
  children,
  ...props
}) => {
  const baseClasses = 'bg-white rounded-lg';
  
  const variants = {
    default: 'shadow-custom',
    outlined: 'border border-gray-200',
    elevated: 'shadow-custom-lg',
  };
  
  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;