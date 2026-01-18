/**
 * Analytics tracking utilities
 * Supports Google Analytics 4 (GA4) with custom event tracking
 */

// Analytics configuration
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Check if analytics is enabled
export const isAnalyticsEnabled = (): boolean => {
  return !!GA_MEASUREMENT_ID && typeof window !== 'undefined';
};

// Initialize Google Analytics
export const initAnalytics = (): void => {
  if (!isAnalyticsEnabled()) {
    console.log('Analytics disabled - no measurement ID provided');
    return;
  }

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true
  });

  console.log('✅ Analytics initialized');
};

// Track page views
export const trackPageView = (url: string, title?: string): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag?.('event', 'page_view', {
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href
  });

  console.log('📊 Page view tracked:', url);
};

// Event categories
export enum EventCategory {
  NAVIGATION = 'navigation',
  ENGAGEMENT = 'engagement',
  DOWNLOAD = 'download',
  SOCIAL = 'social',
  CONTACT = 'contact',
  PROJECT = 'project',
  CERTIFICATION = 'certification'
}

// Event tracking interface
interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
}

// Track custom events
export const trackEvent = ({ category, action, label, value }: AnalyticsEvent): void => {
  if (!isAnalyticsEnabled()) {
    console.log('📊 Event (disabled):', { category, action, label, value });
    return;
  }

  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });

  console.log('📊 Event tracked:', { category, action, label, value });
};

// Predefined event trackers
export const analytics = {
  // Navigation events
  navigation: {
    clickLink: (destination: string) => {
      trackEvent({
        category: EventCategory.NAVIGATION,
        action: 'click_link',
        label: destination
      });
    },
    viewSection: (section: string) => {
      trackEvent({
        category: EventCategory.NAVIGATION,
        action: 'view_section',
        label: section
      });
    }
  },

  // Project events
  project: {
    view: (projectName: string) => {
      trackEvent({
        category: EventCategory.PROJECT,
        action: 'view_project',
        label: projectName
      });
    },
    clickGithub: (projectName: string) => {
      trackEvent({
        category: EventCategory.PROJECT,
        action: 'click_github',
        label: projectName
      });
    },
    clickLiveDemo: (projectName: string) => {
      trackEvent({
        category: EventCategory.PROJECT,
        action: 'click_live_demo',
        label: projectName
      });
    }
  },

  // Download events
  download: {
    resume: () => {
      trackEvent({
        category: EventCategory.DOWNLOAD,
        action: 'download_resume',
        label: 'VinitSahare_Resume.pdf'
      });
    }
  },

  // Social media events
  social: {
    clickGithub: () => {
      trackEvent({
        category: EventCategory.SOCIAL,
        action: 'click_github_profile',
        label: 'GitHub'
      });
    },
    clickLinkedIn: () => {
      trackEvent({
        category: EventCategory.SOCIAL,
        action: 'click_linkedin_profile',
        label: 'LinkedIn'
      });
    },
    clickTwitter: () => {
      trackEvent({
        category: EventCategory.SOCIAL,
        action: 'click_twitter_profile',
        label: 'Twitter'
      });
    },
    clickEmail: () => {
      trackEvent({
        category: EventCategory.SOCIAL,
        action: 'click_email',
        label: 'Email'
      });
    }
  },

  // Contact events
  contact: {
    clickContactButton: (location: string) => {
      trackEvent({
        category: EventCategory.CONTACT,
        action: 'click_contact_button',
        label: location
      });
    },
    submitForm: (success: boolean) => {
      trackEvent({
        category: EventCategory.CONTACT,
        action: success ? 'form_submit_success' : 'form_submit_error',
        label: 'Contact Form'
      });
    },
    formFieldFocus: (fieldName: string) => {
      trackEvent({
        category: EventCategory.CONTACT,
        action: 'form_field_focus',
        label: fieldName
      });
    }
  },

  // Certification events
  certification: {
    view: (certName: string) => {
      trackEvent({
        category: EventCategory.CERTIFICATION,
        action: 'view_certification',
        label: certName
      });
    },
    clickCredential: (certName: string) => {
      trackEvent({
        category: EventCategory.CERTIFICATION,
        action: 'click_credential',
        label: certName
      });
    }
  },

  // Engagement events
  engagement: {
    scrollDepth: (percentage: number) => {
      trackEvent({
        category: EventCategory.ENGAGEMENT,
        action: 'scroll_depth',
        label: `${percentage}%`,
        value: percentage
      });
    },
    timeOnPage: (seconds: number) => {
      trackEvent({
        category: EventCategory.ENGAGEMENT,
        action: 'time_on_page',
        value: seconds
      });
    },
    clickCTA: (ctaName: string, location: string) => {
      trackEvent({
        category: EventCategory.ENGAGEMENT,
        action: 'click_cta',
        label: `${ctaName} - ${location}`
      });
    }
  }
};

// Scroll depth tracking
let scrollDepthTracked = new Set<number>();

export const trackScrollDepth = (): void => {
  if (!isAnalyticsEnabled()) return;

  const scrollPercentage = Math.round(
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  );

  // Track at 25%, 50%, 75%, 100%
  const milestones = [25, 50, 75, 100];
  milestones.forEach(milestone => {
    if (scrollPercentage >= milestone && !scrollDepthTracked.has(milestone)) {
      scrollDepthTracked.add(milestone);
      analytics.engagement.scrollDepth(milestone);
    }
  });
};

// Time on page tracking
let pageStartTime = Date.now();

export const trackTimeOnPage = (): void => {
  if (!isAnalyticsEnabled()) return;

  const timeSpent = Math.round((Date.now() - pageStartTime) / 1000);
  analytics.engagement.timeOnPage(timeSpent);
};

// Reset tracking on page change
export const resetTracking = (): void => {
  scrollDepthTracked.clear();
  pageStartTime = Date.now();
};

// Type declarations for window.gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}
