/**
 * Email service using EmailJS
 * Handles contact form submissions
 */

import emailjs from '@emailjs/browser';

// EmailJS configuration from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Check if EmailJS is configured
export const isEmailServiceConfigured = (): boolean => {
  return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
};

// Initialize EmailJS
export const initEmailService = (): void => {
  if (!isEmailServiceConfigured()) {
    console.warn('⚠️ EmailJS not configured - contact form will use fallback');
    return;
  }

  emailjs.init(EMAILJS_PUBLIC_KEY);
  console.log('✅ EmailJS initialized');
};

// Contact form data interface
export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

// Email service response
export interface EmailServiceResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Send contact form email via EmailJS
 */
export const sendContactEmail = async (
  data: ContactFormData
): Promise<EmailServiceResponse> => {
  // Check if EmailJS is configured
  if (!isEmailServiceConfigured()) {
    return {
      success: false,
      message: 'Email service not configured',
      error: 'EMAILJS_NOT_CONFIGURED'
    };
  }

  try {
    // Prepare template parameters
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      project_type: data.projectType,
      message: data.message,
      to_name: 'Vinit Sahare',
      reply_to: data.email
    };

    // Send email via EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Email sent successfully!'
      };
    } else {
      throw new Error(`EmailJS returned status ${response.status}`);
    }
  } catch (error: any) {
    console.error('Email send error:', error);
    
    return {
      success: false,
      message: 'Failed to send email. Please try again.',
      error: error.message || 'UNKNOWN_ERROR'
    };
  }
};

/**
 * Fallback: Open email client with pre-filled data
 */
export const openEmailClient = (data: ContactFormData): void => {
  const subject = encodeURIComponent(`Project Inquiry: ${data.projectType}`);
  const body = encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\nProject Type: ${data.projectType}\n\nMessage:\n${data.message}`
  );
  
  window.location.href = `mailto:vinitsahare.dev@gmail.com?subject=${subject}&body=${body}`;
};

/**
 * Fallback: Open WhatsApp with pre-filled message
 */
export const openWhatsApp = (data: ContactFormData, phoneNumber: string): void => {
  const message = `Hi Vinit! 👋

*New Project Inquiry*

*Name:* ${data.name}
*Email:* ${data.email}
*Project Type:* ${data.projectType}

*Message:*
${data.message}`;

  const encodedMessage = encodeURIComponent(message);
  const cleanPhone = phoneNumber.replace(/[\s+]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};
