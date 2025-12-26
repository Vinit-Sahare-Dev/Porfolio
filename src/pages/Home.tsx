import { motion } from 'framer-motion';
import { developerInfo } from '@/data/developer';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight, Code2, Database, Server, Settings, Briefcase, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { GitHubActivity } from '@/components/github/GitHubActivity';

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
        <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Dynamic gradient orbs */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-primary/15 to-transparent rounded-full blur-3xl"
              animate={{ 
                scale: [1, 0.8, 1],
                x: [0, -40, 0],
                y: [0, 40, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div 
              className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl"
              animate={{ 
                scale: [0.9, 1.1, 0.9],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            {/* Code pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-20 left-10 font-mono text-sm text-foreground/50 hidden lg:block">
                {`const developer = {`}<br />
                {`  name: "${developerInfo.name}",`}<br />
                {`  role: "Full Stack Developer"`}<br />
                {`};`}
              </div>
              <div className="absolute bottom-32 right-16 font-mono text-sm text-foreground/50 hidden lg:block">
                {`@RestController`}<br />
                {`public class Portfolio {`}<br />
                {`  @GetMapping("/skills")`}<br />
                {`  public List<Skill> getSkills()`}<br />
                {`}`}
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-6xl w-full">
              {/* Profile Photo with Dynamic Background */}
              <motion.div
                className="relative flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="relative">
                  {/* Animated gradient background behind photo */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary via-primary/60 to-primary/30 rounded-full blur-xl opacity-70 scale-110"
                    animate={{ 
                      scale: [1.1, 1.2, 1.1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* Secondary glow */}
                  <motion.div 
                    className="absolute -inset-8 sm:-inset-12 bg-gradient-to-tr from-primary/40 to-transparent rounded-full blur-2xl"
                    animate={{ 
                      opacity: [0.5, 0.8, 0.5],
                      scale: [0.95, 1.15, 0.95]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                  {/* Photo container - circular with gradient backdrop */}
                  <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                    {/* Inner gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
                    <motion.img
                      src={developerInfo.profileImage}
                      alt={developerInfo.name}
                      className="relative w-full h-full object-cover object-top drop-shadow-2xl"
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  {/* Decorative floating elements */}
                  <motion.div 
                    className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full shadow-lg"
                    animate={{ y: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute -bottom-4 -left-4 w-3 h-3 bg-primary/60 rounded-full shadow-md"
                    animate={{ y: [5, -5, 5], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div 
                    className="absolute top-1/2 -right-6 w-2 h-2 bg-primary/40 rounded-full"
                    animate={{ x: [-3, 3, -3], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  {/* Decorative ring */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-primary/30 scale-110"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                className="text-center lg:text-left space-y-4 sm:space-y-6 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Badge variant="secondary" className="mb-2 sm:mb-4 text-xs sm:text-sm px-3 sm:px-4 py-1">
                    👋 Welcome to my portfolio
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  Hi, I'm{' '}
                  <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text">
                    {developerInfo.name.split(' ')[0]}
                  </span>
                </motion.h1>
                
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl font-medium tracking-wide text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {developerInfo.tagline}
                </motion.p>

                <motion.p
                  className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  {developerInfo.heroIntroduction}
                </motion.p>

                <motion.div
                  className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base"
                  >
                    View My Work
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 border border-border px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-accent transition-colors text-sm sm:text-base"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-8 sm:bottom-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <ScrollIndicator />
            </motion.div>
          </div>
        </section>

        {/* GitHub Activity Section - FIRST */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0d1117]">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-8 sm:mb-12 space-y-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                  Open Source Activity
                </h2>
                <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                  Real-time contribution data from GitHub
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <GitHubActivity />
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Projects Section - SECOND */}
        <section className="py-16 sm:py-24 md:py-32 border-t border-border bg-accent/30">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4 px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Featured Projects
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                A selection of my recent full-stack work
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 max-w-7xl mx-auto">
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

          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-12 sm:mt-16 px-4 sm:px-6">
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 text-base sm:text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                <span>View All Projects</span>
                <ArrowRight className="size-4 sm:size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Skills Section - THIRD */}
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  Technical Skills
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Building robust applications with modern technologies
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {developerInfo.skills.map((skill, index) => (
                <ScrollReveal key={skill.name} delay={index * 0.1}>
                  <div className="bg-background border border-border rounded-lg p-5 sm:p-6 hover:border-primary/50 transition-colors h-full">
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {skillIcons[skill.name]}
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base">{skill.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
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

        {/* Experience/Internships Section - FOURTH */}
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-accent/30 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  Professional Experience
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Hands-on internship experience with industry leaders
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {developerInfo.experience.map((exp, index) => (
                <ScrollReveal key={exp.company} delay={index * 0.1}>
                  <div className="bg-background border border-border rounded-lg p-5 sm:p-6 hover:border-primary/50 transition-all hover:shadow-lg h-full">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                        <Briefcase className="size-5 sm:size-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg text-foreground">{exp.title}</h3>
                        <p className="text-primary font-medium text-sm sm:text-base">{exp.company}</p>
                        <div className="flex items-center gap-2 mt-1 text-muted-foreground text-xs sm:text-sm">
                          <Calendar className="size-3 sm:size-4" />
                          <span>{exp.period}</span>
                        </div>
                        <p className="mt-2 sm:mt-3 text-muted-foreground text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 md:py-32 bg-primary/5 border-t border-border">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Let's Build Something Together
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                I'm currently open to full-time opportunities and interesting projects. Let's connect!
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base"
                >
                  Get in Touch
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href={developerInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-accent transition-colors text-sm sm:text-base"
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