import { useEffect } from 'react';
import { initAnalytics } from '@/lib/analytics';
import { useAnalytics } from '@/hooks/useAnalytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

/**
 * Analytics Provider - Initializes analytics and tracks page views
 */
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  // Initialize analytics on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track page views and engagement
  useAnalytics();

  return <>{children}</>;
}
