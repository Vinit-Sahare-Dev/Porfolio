import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, MessageCircle, Mail, AlertCircle, Send } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { developerInfo } from '@/data/developer';
import {
  sendContactEmail,
  openEmailClient,
  openWhatsApp,
  isEmailServiceConfigured,
  initEmailService,
  type ContactFormData
} from '@/lib/emailService';
import { analytics } from '@/lib/analytics';

// Validation schema with security best practices
const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be less than 100 characters' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email must be less than 255 characters' }),
  projectType: z.enum(['fullstack', 'frontend', 'backend', 'consultation'], {
    required_error: 'Please select a project type',
  }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Message must be less than 1000 characters' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Contact form component with EmailJS integration
 * Falls back to email client or WhatsApp if EmailJS is not configured
 * Uses react-hook-form + zod for type-safe validation
 */
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailConfigured, setEmailConfigured] = useState(false);

  useEffect(() => {
    initEmailService();
    setEmailConfigured(isEmailServiceConfigured());
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      projectType: undefined,
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setError(null);

    // Track form field focus for analytics
    analytics.contact.formFieldFocus('submit');

    try {
      if (emailConfigured) {
        // Try EmailJS first
        const result = await sendContactEmail(data as ContactFormData);

        if (result.success) {
          setIsSuccess(true);
          form.reset();
          analytics.contact.submitForm(true);

          // Reset success message after 8 seconds
          setTimeout(() => {
            setIsSuccess(false);
          }, 8000);
        } else {
          throw new Error(result.message);
        }
      } else {
        // Fallback: Open email client
        openEmailClient(data as ContactFormData);
        setIsSuccess(true);
        form.reset();
        analytics.contact.submitForm(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 8000);
      }
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to send message. Please try again.');
      analytics.contact.submitForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppFallback = () => {
    const formData = form.getValues();
    openWhatsApp(formData as ContactFormData, developerInfo.phone);
    analytics.social.clickEmail(); // Track fallback usage
  };

  // Show success message
  if (isSuccess) {
    return (
      <motion.div
        className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-8 text-center space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle2 className="size-16 mx-auto text-green-600 dark:text-green-400" />
        </motion.div>
        <h3 className="text-2xl font-semibold text-green-900 dark:text-green-100">
          Message Sent Successfully!
        </h3>
        <p className="text-green-700 dark:text-green-300 leading-relaxed">
          {emailConfigured
            ? "Thank you for reaching out! I'll get back to you as soon as possible."
            : "Your email client has been opened with the message. Please send it to complete your inquiry."}
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
          className="mt-4"
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Configuration Warning */}
      {!emailConfigured && (
        <Alert className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
          <AlertCircle className="size-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-800 dark:text-amber-200 text-sm">
            Email service not configured. Form will open your email client.
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert variant="destructive">
              <AlertCircle className="size-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your full name"
                    onFocus={() => analytics.contact.formFieldFocus('name')}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Email <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    onFocus={() => analytics.contact.formFieldFocus('email')}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Project Type Select */}
          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Project Type <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  onOpenChange={(open) => {
                    if (open) analytics.contact.formFieldFocus('projectType');
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="fullstack">
                      Full Stack Development
                    </SelectItem>
                    <SelectItem value="frontend">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="backend">
                      Backend Development
                    </SelectItem>
                    <SelectItem value="consultation">
                      Consultation
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Message Textarea */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Message <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell me about your project..."
                    className="min-h-32 resize-none"
                    onFocus={() => analytics.contact.formFieldFocus('message')}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
                <p className="text-xs text-muted-foreground">
                  {field.value.length}/1000 characters
                </p>
              </FormItem>
            )}
          />

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="submit"
              className="flex-1 py-6 text-base font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-5 animate-spin" />
                  Sending...
                </>
              ) : emailConfigured ? (
                <>
                  <Send className="mr-2 size-4" />
                  Send Message
                </>
              ) : (
                <>
                  <Mail className="mr-2 size-4" />
                  Open Email Client
                </>
              )}
            </Button>

            {/* WhatsApp Fallback Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleWhatsAppFallback}
              className="sm:w-auto py-6 text-base font-medium"
              disabled={isSubmitting}
            >
              <MessageCircle className="mr-2 size-4" />
              WhatsApp
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            By submitting this form, you agree to be contacted regarding your inquiry.
          </p>
        </form>
      </Form>
    </div>
  );
}
