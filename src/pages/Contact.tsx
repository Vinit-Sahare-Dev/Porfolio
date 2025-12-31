import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { ContactForm } from '@/components/forms/ContactForm';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contact"
        description={`Get in touch with ${developerInfo.name} for development projects and collaborations. ${developerInfo.availability}`}
      />
      
      <div className="min-h-screen">
        <section className="py-12 md:py-16 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <motion.div initial={{ opacity: 0.8, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Get in Touch</h1>
              <p className="text-sm md:text-base text-muted-foreground">Let's discuss your next project</p>
            </motion.div>
          </div>
        </section>

        <section className="py-10 md:py-14 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-12">
            <motion.div className="space-y-5" initial={{ opacity: 0.8, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-semibold">Send a Message</h2>
                <p className="text-sm text-muted-foreground">{developerInfo.availability}</p>
              </div>
              <ContactForm />
            </motion.div>

            <motion.div className="space-y-6" initial={{ opacity: 0.8, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-semibold">Contact Info</h2>
                <p className="text-sm text-muted-foreground">Reach out directly</p>
              </div>
              <Separator />
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent"><Mail className="size-5 text-muted-foreground" /></div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${developerInfo.email}`} className="font-medium hover:text-primary transition-colors">{developerInfo.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent"><Phone className="size-5 text-muted-foreground" /></div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href={`tel:${developerInfo.phone}`} className="font-medium hover:text-primary transition-colors">{developerInfo.phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent"><MapPin className="size-5 text-muted-foreground" /></div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{developerInfo.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}