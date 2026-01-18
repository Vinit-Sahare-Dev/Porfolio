import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
  resetTracking
} from '@/lib/analytics';

/**
 * Hook to automatically track page views and engagement
 */
export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname + location.search);
    resetTracking();

    // Track scroll depth
    const handleScroll = () => trackScrollDepth();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track time on page when leaving
    const handleBeforeUnload = () => trackTimeOnPage();
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      trackTimeOnPage(); // Track when component unmounts
    };
  }, [location]);
}
