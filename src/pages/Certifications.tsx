import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, BadgeCheck, Linkedin } from 'lucide-react';
import { certifications } from '@/data/certifications';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const LINKEDIN_CERTIFICATIONS_URL = 'https://www.linkedin.com/in/vinit-sahare/details/certifications/';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

export default function Certifications() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Minimal */}
      <section className="relative py-12 md:py-16 px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Certifications</h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and credentials validating expertise in modern technologies
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={cardVariants}
                className="group relative"
              >
                <div className="relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5">
                  {/* Certificate Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    
                    {/* Featured Badge */}
                    {cert.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground shadow-lg">
                          <BadgeCheck className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    
                    {/* Issuer Logo Circle */}
                    <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-xl bg-background border-2 border-border shadow-xl flex items-center justify-center">
                      <Award className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-10">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-display text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {cert.title}
                      </h3>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {cert.issuer}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Issued {cert.issueDate}</span>
                      {cert.credentialId && (
                        <>
                          <span className="text-border">•</span>
                          <span className="font-mono">{cert.credentialId}</span>
                        </>
                      )}
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary" 
                          className="text-xs px-2 py-0.5 bg-secondary/50"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {cert.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5">
                          +{cert.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* View Credential Link */}
                    <a
                      href={LINKEDIN_CERTIFICATIONS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                    >
                      <span>View Credential</span>
                      <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Credentials Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <a href={LINKEDIN_CERTIFICATIONS_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">
                <Linkedin className="size-4" />
                View Credentials
                <ExternalLink className="size-3.5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-8"
          >
            {[
              { value: '15+', label: 'Certifications' },
              { value: '300+', label: 'Hours of Learning' },
              { value: certifications.filter(c => c.featured).length, label: 'Featured' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
