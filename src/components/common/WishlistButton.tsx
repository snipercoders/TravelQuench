// src/components/common/WishlistButton.tsx
import React, { useState } from 'react';
import { Heart, HeartOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';
import { useRouter } from 'next/router';

interface WishlistButtonProps {
  packageId: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'button';
  className?: string;
  showText?: boolean;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  packageId,
  size = 'md',
  variant = 'icon',
  className = '',
  showText = false
}) => {
  const { user, isAuthenticated } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist, loading } = useWishlist();
  const router = useRouter();
  const [message, setMessage] = useState('');

  const isInWishlistState = isInWishlist(packageId);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated || !user) {
      setMessage('Please login to manage your wishlist');
      setTimeout(() => setMessage(''), 3000);
      router.push('/auth/login');
      return;
    }

    try {
      if (isInWishlistState) {
        await removeFromWishlist(packageId);
        setMessage('Removed from wishlist');
      } else {
        await addToWishlist(packageId);
        setMessage('Added to wishlist');
      }
      setTimeout(() => setMessage(''), 2000);
    } catch (error: any) {
      console.error('Wishlist operation failed:', error);
      setMessage(error.message || 'Failed to update wishlist');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return variant === 'icon' ? 'w-8 h-8' : 'px-2 py-1 text-xs';
      case 'lg':
        return variant === 'icon' ? 'w-12 h-12' : 'px-6 py-3 text-base';
      default:
        return variant === 'icon' ? 'w-10 h-10' : 'px-4 py-2 text-sm';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'h-4 w-4';
      case 'lg': return 'h-6 w-6';
      default: return 'h-5 w-5';
    }
  };

  const baseClasses = `
    relative transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
    ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
    ${getSizeClasses()}
    ${className}
  `;

  if (variant === 'icon') {
    return (
      <div className="relative">
        <button
          onClick={handleWishlistToggle}
          disabled={loading}
          className={`
            ${baseClasses}
            rounded-full flex items-center justify-center
            ${isInWishlistState
              ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
              : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20 hover:text-red-400'
            }
          `}
          title={isInWishlistState ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {loading ? (
            <div className={`animate-spin rounded-full border-b-2 border-current ${getIconSize()}`}></div>
          ) : isInWishlistState ? (
            <Heart className={`${getIconSize()} fill-current`} />
          ) : (
            <HeartOff className={getIconSize()} />
          )}
        </button>

        {/* Message Tooltip */}
        {message && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50">
            {message}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleWishlistToggle}
        disabled={loading}
        className={`
          ${baseClasses}
          rounded-lg flex items-center justify-center
          ${isInWishlistState
            ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
            : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20'
          }
        `}
      >
        {loading ? (
          <div className={`animate-spin rounded-full border-b-2 border-current ${getIconSize()} mr-2`}></div>
        ) : isInWishlistState ? (
          <Heart className={`${getIconSize()} fill-current ${showText ? 'mr-2' : ''}`} />
        ) : (
          <HeartOff className={`${getIconSize()} ${showText ? 'mr-2' : ''}`} />
        )}
        
        {showText && (
          <span className="font-medium">
            {loading ? 'Updating...' : isInWishlistState ? 'In Wishlist' : 'Add to Wishlist'}
          </span>
        )}
      </button>

      {/* Message Tooltip */}
      {message && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50">
          {message}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default WishlistButton;

// src/components/packages/PackageCard.tsx - Updated with WishlistButton
import React from 'react';
import { useRouter } from 'next/router';
import { MapPin, Calendar, Users, IndianRupee, Star } from 'lucide-react';
import WishlistButton from '@/components/common/WishlistButton';

interface Package {
  id: string;
  title: string;
  destination: string;
  duration: number;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  category: string;
  type: 'domestic' | 'international';
  rating?: number;
  reviewCount?: number;
  highlights?: string[];
}

interface PackageCardProps {
  package: Package;
  onViewDetails?: (packageId: string) => void;
  onBookNow?: (packageId: string) => void;
  className?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({
  package: pkg,
  onViewDetails,
  onBookNow,
  className = ''
}) => {
  const router = useRouter();

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(pkg.id);
    } else {
      router.push(`/packages/${pkg.id}`);
    }
  };

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(pkg.id);
    } else {
      router.push(`/customer/booking/${pkg.id}`);
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })}`;
  };

  const calculateDiscount = () => {
    if (!pkg.originalPrice || pkg.originalPrice <= pkg.price) return null;
    return Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);
  };

  const discount = calculateDiscount();

  return (
    <div
      className={`
        bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden 
        hover:border-orange-500/50 transition-all duration-300 group cursor-pointer
        ${className}
      `}
      onClick={handleViewDetails}
    >
      {/* Package Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={pkg.thumbnail}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder-package.jpg';
          }}
        />
        
        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium z-10">
            {discount}% OFF
          </div>
        )}

        {/* Package Type Badge */}
        <div className={`absolute top-3 right-12 px-2 py-1 rounded-full text-xs font-medium z-10 ${
          pkg.type === 'international' 
            ? 'bg-blue-500/80 text-white' 
            : 'bg-green-500/80 text-white'
        }`}>
          {pkg.type === 'international' ? 'International' : 'Domestic'}
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 z-20">
          <WishlistButton 
            packageId={pkg.id} 
            size="sm" 
            variant="icon"
          />
        </div>

        {/* Rating */}
        {pkg.rating && (
          <div className="absolute bottom-3 left-3 flex items-center bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
            <span className="text-white text-sm font-medium">{pkg.rating.toFixed(1)}</span>
            {pkg.reviewCount && (
              <span className="text-gray-300 text-xs ml-1">({pkg.reviewCount})</span>
            )}
          </div>
        )}
      </div>

      {/* Package Details */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
            {pkg.title}
          </h3>
          
          <div className="flex items-center text-gray-400 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {pkg.destination}
          </div>

          <div className="flex items-center justify-between text-gray-400 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {pkg.duration} days
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {pkg.category}
            </div>
          </div>
        </div>

        {/* Highlights */}
        {pkg.highlights && pkg.highlights.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-gray-400 mb-1">Highlights:</div>
            <div className="text-sm text-gray-300">
              {pkg.highlights.slice(0, 2).join(' • ')}
              {pkg.highlights.length > 2 && '...'}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white">
              {formatCurrency(pkg.price)}
            </span>
            {pkg.originalPrice && pkg.originalPrice > pkg.price && (
              <span className="text-sm text-gray-400 line-through">
                {formatCurrency(pkg.originalPrice)}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-400">per person</div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors text-sm font-medium"
          >
            View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleBookNow();
            }}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 text-sm font-medium"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;