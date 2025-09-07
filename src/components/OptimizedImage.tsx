import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width = 400,
  height = 300,
  priority = false,
  quality = 80,
  placeholder = 'blur',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized image URL
  const getOptimizedSrc = (originalSrc: string) => {
    // For Unsplash images, add optimization parameters
    if (originalSrc.includes('unsplash.com')) {
      const url = new URL(originalSrc);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('h', height.toString());
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      return url.toString();
    }
    
    // For local images, return as is
    return originalSrc;
  };

  // Generate WebP version
  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const url = new URL(originalSrc);
      url.searchParams.set('fm', 'webp');
      url.searchParams.set('w', width.toString());
      url.searchParams.set('h', height.toString());
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      return url.toString();
    }
    return originalSrc;
  };

  // Generate blur placeholder
  const getBlurDataURL = () => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#333"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#666" font-family="Arial">Loading...</text>
      </svg>
    `)}`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (!priority) observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: priority ? '0px' : '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    if (isInView && src) {
      // Preload WebP version
      const webpSrc = getWebPSrc(src);
      const fallbackSrc = getOptimizedSrc(src);

      // Check WebP support
      const webpSupported = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      };

      const loadImage = (imageSrc: string) => {
        const img = new Image();
        img.onload = () => {
          setImageSrc(imageSrc);
          setIsLoaded(true);
        };
        img.onerror = () => {
          if (imageSrc === webpSrc) {
            // Fallback to regular format
            loadImage(fallbackSrc);
          } else {
            setHasError(true);
          }
        };
        img.src = imageSrc;
      };

      if (webpSupported()) {
        loadImage(webpSrc);
      } else {
        loadImage(fallbackSrc);
      }
    }
  }, [isInView, src, width, height, quality]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={isLoaded ? imageSrc : getBlurDataURL()}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={`transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-50 scale-105 blur-sm'
        } ${hasError ? 'opacity-30' : ''}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/80">
          <div className="text-center text-gray-400">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm">Image failed to load</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
