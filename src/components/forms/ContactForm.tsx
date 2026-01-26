import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
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
import { developerInfo } from '@/data/developer';
import { analytics } from '@/lib/analytics';

// Validation schema
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

const projectTypeLabels: Record<string, string> = {
  fullstack: 'Full Stack Development',
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  consultation: 'Consultation',
};

/**
 * Contact form component that redirects to WhatsApp
 * Simple and direct communication via WhatsApp
 */
export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      projectType: undefined,
      message: '',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    // Track form submission
    analytics.contact.formFieldFocus('submit');
    analytics.contact.submitForm(true);

    // Format message for WhatsApp
    const projectTypeLabel = projectTypeLabels[data.projectType] || data.projectType;
    const whatsappMessage = `Hi! I'm ${data.name}

📧 Email: ${data.email}
💼 Project Type: ${projectTypeLabel}

Message:
${data.message}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Remove any spaces or special characters from phone number
    const cleanPhone = developerInfo.phone.replace(/\D/g, '');
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    // Reset form
    form.reset();
  };

  return (
    <div className="space-y-6">
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-6 text-base font-medium bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            <MessageCircle className="mr-2 size-5" />
            Continue to WhatsApp
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Clicking the button will open WhatsApp with your message pre-filled
          </p>
        </form>
      </Form>
    </div>
  );
}
