import { projects } from '@/data/projects';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { SEOHead } from '@/components/seo/SEOHead';
import { motion } from 'framer-motion';

export default function Portfolio() {
  return (
    <>
      <SEOHead 
        title="Projects"
        description="Browse my software development projects featuring full-stack applications built with Java, Spring Boot, React, and modern technologies."
      />
      
      <div className="min-h-screen">
        <section className="relative py-12 md:py-16 px-6 lg:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto text-center space-y-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Projects</h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Full-stack applications built with Java, Spring Boot, React, and modern technologies
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <PortfolioGrid projects={projects} />
          </div>
        </section>
      </div>
    </>
  );
}