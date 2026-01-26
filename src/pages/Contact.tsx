import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Calendar } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { ContactForm } from '@/components/forms/ContactForm';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contact"
        description={`Get in touch with ${developerInfo.name} for development projects and collaborations. ${developerInfo.availability}`}
      />
      
      <div className="min-h-screen">
        {/* Header Section */}
        <section className="py-12 md:py-16 px-6 lg:px-8 border-b border-border bg-gradient-to-b from-accent/30 to-background">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <AvailabilityBadge available={true} message="Available for opportunities" variant="compact" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-4 mb-3">Get in Touch</h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind or want to collaborate? I'd love to hear from you. 
                Let's build something amazing together!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form - Takes 2 columns */}
            <motion.div 
              className="lg:col-span-2 space-y-6" 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold">Send a Message</h2>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below and I'll get back to you within 24 hours
                </p>
              </div>
              <ContactForm />
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div 
              className="space-y-6" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Contact Information */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <p className="text-sm text-muted-foreground">Reach out directly</p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <a 
                    href={`mailto:${developerInfo.email}`}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Mail className="size-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                      <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                        {developerInfo.email}
                      </p>
                    </div>
                  </a>

                  <a 
                    href={`tel:${developerInfo.phone}`}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Phone className="size-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                      <p className="font-medium text-sm group-hover:text-primary transition-colors">
                        {developerInfo.phone}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 p-3 rounded-lg">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="size-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                      <p className="font-medium text-sm">{developerInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold">Connect With Me</h3>
                <div className="space-y-2">
                  {developerInfo.socialLinks.github && (
                    <a
                      href={developerInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                    >
                      <Github className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        GitHub
                      </span>
                    </a>
                  )}
                  {developerInfo.socialLinks.linkedin && (
                    <a
                      href={developerInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                    >
                      <Linkedin className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        LinkedIn
                      </span>
                    </a>
                  )}
                  {developerInfo.socialLinks.twitter && (
                    <a
                      href={developerInfo.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                    >
                      <Twitter className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        Twitter
                      </span>
                    </a>
                  )}
                </div>
              </div>

              {/* Quick Response Time */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-primary" />
                  <h3 className="font-semibold text-primary">Quick Response</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  I typically respond within 24 hours during business days. 
                  For urgent matters, feel free to call directly.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ or Additional Info Section */}
        <section className="py-12 px-6 lg:px-8 bg-accent/30 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <h2 className="text-2xl md:text-3xl font-bold">Let's Work Together</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Whether you need a full-stack application, backend API, or frontend interface, 
                I'm here to help bring your ideas to life with clean, scalable code.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24h</div>
                  <div className="text-xs text-muted-foreground">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-xs text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10+</div>
                  <div className="text-xs text-muted-foreground">Projects Delivered</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}