# Contact Form Setup Guide

## Overview
The contact form uses **EmailJS** to send emails directly from the frontend without a backend server. It includes form validation, success/error states, and fallback options.

## Features

✅ **Email Integration** - EmailJS for direct email sending
✅ **Form Validation** - Zod schema validation with real-time feedback
✅ **Success/Error States** - Visual feedback for form submission
✅ **Character Counter** - Live character count for message field
✅ **Analytics Tracking** - Track form interactions and submissions
✅ **Fallback Options** - Email client and WhatsApp fallbacks
✅ **Responsive Design** - Works on all devices
✅ **Accessibility** - ARIA labels and keyboard navigation

## Setup Instructions

### 1. Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month free)
3. Verify your email address

### 2. Add Email Service

1. Go to **Email Services** in EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook**
   - **Yahoo**
   - Or any SMTP service
4. Follow the connection instructions
5. Copy your **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

```html
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Project Type: {{project_type}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

4. **Template Settings:**
   - Template Name: "Contact Form"
   - From Name: `{{from_name}}`
   - From Email: Your verified email
   - Subject: `New Contact Form Submission from {{from_name}}`
   - Reply To: `{{reply_to}}`

5. Copy your **Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key

1. Go to **Account** > **General**
2. Find your **Public Key** (e.g., `abc123XYZ`)
3. This is used to initialize EmailJS

### 5. Configure Environment Variables

**Local Development:**

Create `.env` file in project root:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abc123XYZ
```

**Production (Vercel):**

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** > **Environment Variables**
4. Add these variables:
   - `VITE_EMAILJS_SERVICE_ID` = `service_abc123`
   - `VITE_EMAILJS_TEMPLATE_ID` = `template_xyz789`
   - `VITE_EMAILJS_PUBLIC_KEY` = `abc123XYZ`
5. Redeploy your site

### 6. Test the Form

**Local Testing:**

```bash
npm run dev
```

1. Navigate to `/contact`
2. Fill out the form
3. Submit
4. Check your email inbox
5. Verify email received

**Production Testing:**

1. Deploy to production
2. Visit contact page
3. Submit test form
4. Check email delivery

## Form Validation Rules

### Name Field
- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 100 characters
- **Validation**: Trimmed whitespace

### Email Field
- **Required**: Yes
- **Format**: Valid email address
- **Max Length**: 255 characters
- **Validation**: RFC 5322 compliant

### Project Type
- **Required**: Yes
- **Options**:
  - Full Stack Development
  - Frontend Development
  - Backend Development
  - Consultation

### Message Field
- **Required**: Yes
- **Min Length**: 10 characters
- **Max Length**: 1000 characters
- **Features**: Character counter, auto-resize

## Fallback Options

### Email Client Fallback

If EmailJS is not configured, the form will:
1. Show a warning message
2. Open the user's default email client
3. Pre-fill subject and body with form data

### WhatsApp Fallback

Users can also click the "WhatsApp" button to:
1. Open WhatsApp Web/App
2. Send message directly to your phone
3. Pre-filled with form data

## Customization

### Change Email Template

Edit `src/lib/emailService.ts`:

```typescript
const templateParams = {
  from_name: data.name,
  from_email: data.email,
  project_type: data.projectType,
  message: data.message,
  to_name: 'Your Name',
  reply_to: data.email,
  // Add custom fields here
  custom_field: 'value'
};
```

### Add Custom Fields

1. Update validation schema in `ContactForm.tsx`:

```typescript
const contactFormSchema = z.object({
  // ... existing fields
  company: z.string().optional(),
  budget: z.string().optional(),
});
```

2. Add form field:

```tsx
<FormField
  control={form.control}
  name="company"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Company (Optional)</FormLabel>
      <FormControl>
        <Input placeholder="Your company" {...field} />
      </FormControl>
    </FormItem>
  )}
/>
```

3. Update EmailJS template to include new field

### Change Success Message

Edit `ContactForm.tsx`:

```tsx
<h3 className="text-2xl font-semibold">
  Custom Success Message!
</h3>
<p className="text-green-700">
  Custom description text
</p>
```

### Modify Validation Rules

Edit validation schema in `ContactForm.tsx`:

```typescript
const contactFormSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters') // Change min length
    .max(50, 'Name must be less than 50 characters'), // Change max length
  // ... other fields
});
```

## Analytics Tracking

The form automatically tracks:

- **Form Field Focus**: When users interact with fields
- **Form Submission**: Success or failure
- **Fallback Usage**: Email client or WhatsApp clicks

View analytics in Google Analytics:
- Reports > Engagement > Events
- Filter by `contact` category

## Troubleshooting

### Emails Not Sending

1. **Check Environment Variables**
   ```bash
   echo $VITE_EMAILJS_SERVICE_ID
   echo $VITE_EMAILJS_TEMPLATE_ID
   echo $VITE_EMAILJS_PUBLIC_KEY
   ```

2. **Verify EmailJS Dashboard**
   - Check service is connected
   - Verify template exists
   - Check email quota (200/month free)

3. **Check Browser Console**
   - Look for EmailJS errors
   - Verify initialization message

4. **Test EmailJS Directly**
   ```javascript
   // In browser console
   emailjs.send('service_id', 'template_id', {
     from_name: 'Test',
     from_email: 'test@example.com',
     message: 'Test message'
   });
   ```

### Form Validation Errors

1. **Check Field Requirements**
   - All required fields filled
   - Email format correct
   - Message length within limits

2. **Clear Browser Cache**
   - Hard refresh (Ctrl+Shift+R)
   - Clear local storage

3. **Check Console for Errors**
   - Validation error messages
   - Network errors

### Fallback Not Working

1. **Email Client**
   - Check default email client is set
   - Try different browser

2. **WhatsApp**
   - Verify phone number format
   - Check WhatsApp is installed

## Security Best Practices

✅ **Input Sanitization** - All inputs are validated and sanitized
✅ **Rate Limiting** - EmailJS provides built-in rate limiting
✅ **No Sensitive Data** - Never send passwords or sensitive info
✅ **HTTPS Only** - Always use HTTPS in production
✅ **Environment Variables** - Never commit API keys to git

## EmailJS Limits

### Free Plan
- **200 emails/month**
- **2 email services**
- **2 email templates**
- **50 KB attachment size**

### Paid Plans
- **More emails** - Up to 100,000/month
- **More services** - Unlimited
- **More templates** - Unlimited
- **Larger attachments** - Up to 5 MB

## Alternative Services

### Formspree

```typescript
// Install
npm install @formspree/react

// Usage
import { useForm } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("your-form-id");
  
  if (state.succeeded) {
    return <p>Thanks for your submission!</p>;
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### Netlify Forms

```html
<!-- Add to form tag -->
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- form fields -->
</form>
```

### Web3Forms

```typescript
// No installation needed
const response = await fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    access_key: 'YOUR_ACCESS_KEY',
    name: data.name,
    email: data.email,
    message: data.message
  })
});
```

## Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Guide](https://www.emailjs.com/docs/examples/reactjs/)
- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

---

**Status**: ✅ Contact form ready
**Next Step**: Add your EmailJS credentials to start receiving emails
