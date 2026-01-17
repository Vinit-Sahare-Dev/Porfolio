import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  blurDataURL?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
}

/**
 * Optimized Image component with lazy loading and blur placeholder
 * Automatically tries WebP format with fallback to original
 */
export function OptimizedImage({
  src,
  alt,
  className = '',
  blurDataURL,
  priority = false,
  objectFit = 'cover',
  onLoad
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [hasError, setHasError] = useState(false);

  // Try WebP format first, fallback to original
  useEffect(() => {
    if (src.match(/\.(jpg|jpeg|png)$/i)) {
      const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      // Check if WebP version exists
      const img = new Image();
      img.onload = () => setImageSrc(webpSrc);
      img.onerror = () => setImageSrc(src);
      img.src = webpSrc;
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    // Fallback to original if WebP fails
    if (imageSrc !== src) {
      setImageSrc(src);
      setHasError(false);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {!isLoaded && blurDataURL && (
        <motion.img
          src={blurDataURL}
          alt=""
          className={`absolute inset-0 w-full h-full object-${objectFit} blur-xl scale-110`}
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Loading skeleton */}
      {!isLoaded && !blurDataURL && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      {/* Main image */}
      <motion.img
        src={imageSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`w-full h-full object-${objectFit} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-muted-foreground text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}
