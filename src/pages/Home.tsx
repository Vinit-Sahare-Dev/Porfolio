import { motion } from 'framer-motion';
import { developerInfo } from '@/data/developer';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight, Code2, Database, Server, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const skillIcons: Record<string, React.ReactNode> = {
  'Frontend': <Code2 className="size-5" />,
  'Backend': <Server className="size-5" />,
  'Database': <Database className="size-5" />,
  'DevOps & Tools': <Settings className="size-5" />
};

/**
 * Homepage with developer hero section and featured projects
 * Showcases developer's skills and best work
 */
export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <SEOHead />
      
      <div className="min-h-screen">
        {/* Hero Section - Full viewport with gradient */}
        <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
            {/* Code pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-20 left-10 font-mono text-sm text-foreground/50">
                {`const developer = {`}<br />
                {`  name: "${developerInfo.name}",`}<br />
                {`  role: "Full Stack Developer"`}<br />
                {`};`}
              </div>
              <div className="absolute bottom-32 right-16 font-mono text-sm text-foreground/50 hidden md:block">
                {`@RestController`}<br />
                {`public class Portfolio {`}<br />
                {`  @GetMapping("/skills")`}<br />
                {`  public List<Skill> getSkills()`}<br />
                {`}`}
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative h-full flex flex-col items-center justify-center px-6">
            <motion.div
              className="text-center space-y-6 max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
                  👋 Welcome to my portfolio
                </Badge>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Hi, I'm{' '}
                <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text">
                  {developerInfo.name.split(' ')[0]}
                </span>
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl font-medium tracking-wide text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                {developerInfo.tagline}
              </motion.p>

              <motion.p
                className="text-base md:text-lg font-light leading-relaxed text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                {developerInfo.heroIntroduction}
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  View My Work
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-medium hover:bg-accent transition-colors"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <ScrollIndicator />
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-accent/30">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Technical Skills
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Building robust applications with modern technologies
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {developerInfo.skills.map((skill, index) => (
                <ScrollReveal key={skill.name} delay={index * 0.1}>
                  <div className="bg-background border border-border rounded-lg p-6 hover:border-primary/50 transition-colors h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {skillIcons[skill.name]}
                      </div>
                      <h3 className="font-semibold">{skill.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-24 md:py-32 border-t border-border">
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center mb-16 space-y-4 px-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Featured Projects
              </h2>
              <p className="text-lg text-muted-foreground">
                A selection of my recent full-stack work
              </p>
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                aspectRatio="landscape"
                showCategory={true}
                index={index}
              />
            ))}
          </div>

          {/* View All Link */}
          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-16 px-6">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                <span>View All Projects</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-primary/5 border-t border-border">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center px-6 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Let's Build Something Together
              </h2>
              <p className="text-lg text-muted-foreground">
                I'm currently open to full-time opportunities and interesting projects. Let's connect!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Get in Touch
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href={developerInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-medium hover:bg-accent transition-colors"
                >
                  View GitHub
                </a>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}