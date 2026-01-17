/**
 * Image optimization utilities
 */

/**
 * Generate a tiny blur placeholder data URL
 * This is a simple base64 encoded 1x1 pixel image
 */
export function generateBlurDataURL(color: string = '#e5e7eb'): string {
  // Create a simple SVG blur placeholder
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <filter id="blur">
        <feGaussianBlur stdDeviation="20"/>
      </filter>
      <rect width="400" height="400" fill="${color}" filter="url(#blur)"/>
    </svg>
  `;
  
  const base64 = btoa(svg);
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Get WebP source with fallback
 */
export function getOptimizedImageSrc(src: string): { webp: string; fallback: string } {
  const webp = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  return {
    webp,
    fallback: src
  };
}

/**
 * Preload critical images
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Check if browser supports WebP
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
    const img = new Image();
    img.onload = () => resolve(img.width === 1);
    img.onerror = () => resolve(false);
    img.src = webP;
  });
}

/**
 * Get responsive image sources
 */
export function getResponsiveImageSources(baseSrc: string) {
  const ext = baseSrc.match(/\.(jpg|jpeg|png)$/i)?.[0] || '.jpg';
  const baseWithoutExt = baseSrc.replace(/\.(jpg|jpeg|png)$/i, '');
  
  return {
    mobile: `${baseWithoutExt}-mobile${ext}`,
    tablet: `${baseWithoutExt}-tablet${ext}`,
    desktop: baseSrc,
    webp: {
      mobile: `${baseWithoutExt}-mobile.webp`,
      tablet: `${baseWithoutExt}-tablet.webp`,
      desktop: `${baseWithoutExt}.webp`
    }
  };
}
