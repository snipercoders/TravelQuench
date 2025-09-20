// src/components/ui/Button.tsx
import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/helpers';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'default' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'default',
    loading = false,
    icon,
    iconPosition = 'left',
    children,
    disabled,
    ...props
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500',
      secondary: 'bg-secondary-100 hover:bg-secondary-200 text-secondary-900 focus:ring-secondary-500',
      outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500',
      ghost: 'text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
      destructive: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    };
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      default: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
      xl: 'h-14 px-8 text-lg',
    };

    const iconClasses = 'w-4 h-4';
    const iconSpacing = children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : '';

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <Loader2 className={cn(iconClasses, children ? 'mr-2' : '', 'animate-spin')} />
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className={cn(iconClasses, iconSpacing)}>{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span className={cn(iconClasses, iconSpacing)}>{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;