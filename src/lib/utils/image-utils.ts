// lib/utils/image-utils.ts

// Image placeholder and fallback utilities
export const getImageSrc = (imagePath: string, fallback?: string): string => {
  // If no image path provided, use fallback or default placeholder
  if (!imagePath) {
    return fallback || getPlaceholderImage();
  }
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // For local images, prepend with base path
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

// Generate placeholder image URL
export const getPlaceholderImage = (width: number = 800, height: number = 600, text?: string): string => {
  const placeholderText = text || 'Travel Quench';
  return `https://via.placeholder.com/${width}x${height}/667eea/ffffff?text=${encodeURIComponent(placeholderText)}`;
};

// Travel-specific placeholder images
export const getTravelPlaceholder = (destination: string, width: number = 800, height: number = 600): string => {
  return `https://via.placeholder.com/${width}x${height}/667eea/ffffff?text=${encodeURIComponent(destination)}`;
};

// Image configuration for different sections
export const IMAGE_PLACEHOLDERS = {
  hero: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop',
  kerala: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop',
  rajasthan: 'https://images.unsplash.com/photo-1599661046827-dacde8b15bbf?w=800&h=600&fit=crop',
  himachal: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  europe: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop',
  default: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop'
};

// Get specific travel destination image
export const getDestinationImage = (destination: string): string => {
  const key = destination.toLowerCase().replace(/[^a-z]/g, '') as keyof typeof IMAGE_PLACEHOLDERS;
  return IMAGE_PLACEHOLDERS[key] || IMAGE_PLACEHOLDERS.default;
};

// Image loading error handler
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = event.currentTarget;
  if (img.src !== IMAGE_PLACEHOLDERS.default) {
    img.src = IMAGE_PLACEHOLDERS.default;
  }
};

// Optimize image URL for different screen sizes
export const getOptimizedImageUrl = (
  src: string, 
  options: { 
    width?: number; 
    height?: number; 
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}
): string => {
  const { width = 800, height = 600, quality = 80, format = 'webp' } = options;
  
  // If it's an Unsplash URL, add optimization parameters
  if (src.includes('unsplash.com')) {
    return `${src}&w=${width}&h=${height}&q=${quality}&fm=${format}`;
  }
  
  // For other URLs, return as is (could add other CDN optimizations here)
  return src;
};

// next.config.js helper
export const getNextImageConfig = () => ({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      }
    ],
  },
});

// Component helper for Image with fallback
export const ImageWithFallback: React.FC<{
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: string;
}> = ({ src, alt, width = 800, height = 600, className, fallback }) => {
  const [imageSrc, setImageSrc] = React.useState(src);
  
  const handleError = () => {
    if (imageSrc !== (fallback || IMAGE_PLACEHOLDERS.default)) {
      setImageSrc(fallback || IMAGE_PLACEHOLDERS.default);
    }
  };
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

// Update your components to use these utilities
// Example usage in components:
/*
import { getDestinationImage, ImageWithFallback } from '@/lib/utils/image-utils';

// In your component:
<ImageWithFallback
  src="/images/kerala-backwaters.jpg"
  alt="Kerala Backwaters"
  fallback={getDestinationImage('kerala')}
  className="w-full h-64 object-cover"
/>
*/