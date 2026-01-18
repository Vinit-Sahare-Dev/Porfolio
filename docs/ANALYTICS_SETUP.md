# Analytics Setup Guide

## Overview
This portfolio includes comprehensive analytics tracking with Google Analytics 4 (GA4) to monitor visitor behavior, engagement, and conversions.

## Features

✅ **Automatic Page View Tracking**
✅ **Custom Event Tracking** (button clicks, downloads, etc.)
✅ **Scroll Depth Tracking** (25%, 50%, 75%, 100%)
✅ **Time on Page Tracking**
✅ **Project View Tracking**
✅ **Download Tracking** (Resume downloads)
✅ **Social Media Click Tracking**
✅ **Contact Form Interaction Tracking**

## Setup Instructions

### 1. Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon)
3. Click **Create Property**
4. Enter property details:
   - Property name: "Portfolio - Vinit Sahare"
   - Time zone: Your timezone
   - Currency: Your currency
5. Click **Next** and complete setup
6. Click **Web** under "Choose a platform"
7. Enter website details:
   - Website URL: `https://vinitsahare.vercel.app`
   - Stream name: "Portfolio Website"
8. Click **Create stream**
9. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variables

1. Create `.env` file in project root:
   ```bash
   cp .env.example .env
   ```

2. Add your Measurement ID:
   ```env
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. For production (Vercel):
   - Go to Vercel Dashboard > Your Project > Settings > Environment Variables
   - Add: `VITE_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`
   - Redeploy your site

### 3. Verify Installation

1. **Local Testing:**
   ```bash
   npm run dev
   ```
   - Open browser console
   - Look for: "✅ Analytics initialized"
   - Navigate pages and check for: "📊 Page view tracked: /path"

2. **Production Testing:**
   - Visit your deployed site
   - Open Chrome DevTools > Network tab
   - Filter by "gtag" or "google-analytics"
   - You should see requests to `www.google-analytics.com`

3. **Real-time Reports:**
   - Go to Google Analytics
   - Click **Reports** > **Realtime**
   - Visit your site in another tab
   - You should see yourself in real-time view

## Tracked Events

### Navigation Events
- `click_link` - Internal navigation clicks
- `view_section` - Section visibility tracking

### Project Events
- `view_project` - Project detail page views
- `click_github` - GitHub repository clicks
- `click_live_demo` - Live demo clicks

### Download Events
- `download_resume` - Resume download clicks

### Social Media Events
- `click_github_profile` - GitHub profile clicks
- `click_linkedin_profile` - LinkedIn profile clicks
- `click_twitter_profile` - Twitter profile clicks
- `click_email` - Email link clicks

### Contact Events
- `click_contact_button` - Contact button clicks
- `form_submit_success` - Successful form submissions
- `form_submit_error` - Failed form submissions
- `form_field_focus` - Form field interactions

### Engagement Events
- `scroll_depth` - Scroll milestones (25%, 50%, 75%, 100%)
- `time_on_page` - Time spent on page (tracked on exit)
- `click_cta` - Call-to-action button clicks

## Custom Event Tracking

### In Your Components

```tsx
import { analytics } from '@/lib/analytics';

// Track button click
<button onClick={() => analytics.engagement.clickCTA('Button Name', 'Location')}>
  Click Me
</button>

// Track download
<a 
  href="/file.pdf" 
  download
  onClick={() => analytics.download.resume()}
>
  Download
</a>

// Track social media click
<a 
  href="https://github.com/username"
  onClick={() => analytics.social.clickGithub()}
>
  GitHub
</a>

// Track project view
<Link 
  to="/project/slug"
  onClick={() => analytics.project.view('Project Name')}
>
  View Project
</Link>
```

### Custom Events

```tsx
import { trackEvent, EventCategory } from '@/lib/analytics';

trackEvent({
  category: EventCategory.ENGAGEMENT,
  action: 'custom_action',
  label: 'Custom Label',
  value: 100
});
```

## Viewing Analytics Data

### Google Analytics Dashboard

1. **Realtime Reports**
   - Reports > Realtime
   - See current visitors and their activity

2. **Engagement Reports**
   - Reports > Engagement > Events
   - See all tracked events
   - Filter by event name

3. **User Acquisition**
   - Reports > Acquisition > User acquisition
   - See where visitors come from

4. **Popular Pages**
   - Reports > Engagement > Pages and screens
   - See most visited pages

5. **Custom Reports**
   - Explore > Create custom report
   - Combine metrics and dimensions

### Key Metrics to Monitor

1. **Traffic Metrics**
   - Total users
   - New vs returning users
   - Sessions
   - Page views

2. **Engagement Metrics**
   - Average session duration
   - Pages per session
   - Bounce rate
   - Scroll depth

3. **Conversion Metrics**
   - Resume downloads
   - Contact form submissions
   - GitHub profile clicks
   - Project views

4. **Popular Content**
   - Most viewed projects
   - Most visited pages
   - Most clicked CTAs

## Privacy & GDPR Compliance

### Current Implementation
- ✅ No cookies stored without consent
- ✅ IP anonymization enabled
- ✅ No personally identifiable information (PII) tracked
- ✅ Respects Do Not Track (DNT) browser setting

### Adding Cookie Consent (Optional)

If you want to add a cookie consent banner:

```tsx
// Install cookie consent library
npm install react-cookie-consent

// Add to App.tsx
import CookieConsent from "react-cookie-consent";

<CookieConsent
  location="bottom"
  buttonText="Accept"
  declineButtonText="Decline"
  enableDeclineButton
  onAccept={() => {
    initAnalytics();
  }}
>
  This website uses cookies to enhance the user experience.
</CookieConsent>
```

## Troubleshooting

### Analytics Not Working

1. **Check Environment Variable**
   ```bash
   echo $VITE_GA_MEASUREMENT_ID
   ```
   Should output your Measurement ID

2. **Check Browser Console**
   - Look for "Analytics initialized" message
   - Check for any error messages

3. **Check Network Tab**
   - Filter by "google-analytics" or "gtag"
   - Verify requests are being sent

4. **Ad Blockers**
   - Disable ad blockers for testing
   - Analytics may be blocked by privacy extensions

5. **Verify Measurement ID**
   - Format should be: `G-XXXXXXXXXX`
   - Check for typos

### Events Not Showing in GA4

1. **Wait 24-48 hours**
   - GA4 can take time to process events
   - Check Realtime reports for immediate feedback

2. **Check Event Names**
   - Event names are case-sensitive
   - Use underscore_case (not camelCase or kebab-case)

3. **Verify Event Parameters**
   - Check that parameters are being sent correctly
   - Use browser console to see tracked events

## Alternative Analytics Services

### Plausible Analytics (Privacy-focused)

```tsx
// Add to index.html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>

// Update analytics.ts
const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN;

export const trackEvent = (eventName: string, props?: object) => {
  if (window.plausible) {
    window.plausible(eventName, { props });
  }
};
```

### Umami Analytics (Self-hosted)

```tsx
// Add to index.html
<script async defer 
  data-website-id="your-website-id" 
  src="https://umami.yourdomain.com/umami.js">
</script>

// Track events
window.umami?.track('event-name', { property: 'value' });
```

## Best Practices

1. **Don't Over-Track**
   - Track meaningful interactions only
   - Avoid tracking every single click

2. **Use Descriptive Names**
   - Event names should be clear and consistent
   - Use categories to organize events

3. **Test Before Deploying**
   - Always test analytics in development
   - Verify events in GA4 Realtime reports

4. **Monitor Regularly**
   - Check analytics weekly
   - Look for trends and patterns
   - Adjust strategy based on data

5. **Respect Privacy**
   - Don't track sensitive information
   - Provide opt-out options
   - Be transparent about tracking

## Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 Event Tracking Guide](https://support.google.com/analytics/answer/9322688)
- [GA4 Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)
- [Privacy & GDPR Compliance](https://support.google.com/analytics/answer/9019185)

---

**Status**: ✅ Analytics system ready
**Next Step**: Add your GA4 Measurement ID to start tracking
