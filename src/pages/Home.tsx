import { motion } from 'framer-motion';
import { developerInfo } from '@/data/developer';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { generateBlurDataURL } from '@/utils/imageOptimization';
import { analytics } from '@/lib/analytics';
import { generateProfilePageSchema } from '@/lib/structuredData';
import { SkillsVisualization } from '@/components/skills/SkillsVisualization';
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge';
import { ArrowRight, Briefcase, Calendar, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { GitHubActivity } from '@/components/github/GitHubActivity';





export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const structuredData = generateProfilePageSchema();

  return (
    <>
      <SEOHead 
        structuredData={structuredData}
        type="profile"
      />
      
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
                    <motion.div
                      className="relative w-full h-full"
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <OptimizedImage
                        src={developerInfo.profileImage}
                        alt={developerInfo.name}
                        className="w-full h-full"
                        objectFit="cover"
                        blurDataURL={generateBlurDataURL('#10b981')}
                        priority={true}
                      />
                    </motion.div>
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
                {/* Availability Badge */}
                <motion.div
                  className="flex justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <AvailabilityBadge available={true} message="Open to opportunities" />
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
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/portfolio"
                      onClick={() => analytics.engagement.clickCTA('View My Work', 'Hero')}
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-sm sm:text-base"
                    >
                      View My Work
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/contact"
                      onClick={() => analytics.contact.clickContactButton('Hero')}
                      className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border-2 border-border px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 text-sm sm:text-base"
                    >
                      Get in Touch
                    </Link>
                  </motion.div>
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
                <Badge variant="secondary" className="mb-2">
                  💻 Tech Stack
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  Technical Skills
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Building robust applications with modern technologies
                </p>
              </div>
            </ScrollReveal>

            <SkillsVisualization />
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
                  <motion.div 
                    className="group bg-background border border-border rounded-xl p-5 sm:p-6 hover:border-primary/50 transition-all duration-300 h-full relative overflow-hidden"
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative flex items-start gap-3 sm:gap-4">
                      <div className="p-2.5 sm:p-3 bg-primary/10 rounded-xl text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <Briefcase className="size-5 sm:size-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg text-foreground">{exp.title}</h3>
                        <p className="text-primary font-medium text-sm sm:text-base">{exp.company}</p>
                        <div className="flex items-center gap-2 mt-1.5 text-muted-foreground text-xs sm:text-sm">
                          <Calendar className="size-3 sm:size-4" />
                          <span>{exp.period}</span>
                        </div>
                        <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-primary/5 via-primary/10 to-background border-t border-border relative overflow-hidden">
          {/* Subtle animated background */}
          <motion.div 
            className="absolute inset-0 opacity-30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/15 rounded-full blur-2xl" />
          </motion.div>
          
          <ScrollReveal>
            <div className="relative max-w-3xl mx-auto text-center px-4 sm:px-6 space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  Let's Build Something Together
                </h2>
              </motion.div>
              <motion.p
                className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                I'm currently open to full-time opportunities and interesting projects. Let's connect!
              </motion.p>
              <motion.div 
                className="flex flex-wrap justify-center gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact"
                    onClick={() => analytics.contact.clickContactButton('CTA Section')}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-sm sm:text-base"
                  >
                    Get in Touch
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
                
                <motion.a
                  href="/resume/VinitSahare_Resume.pdf"
                  download="VinitSahare_Resume.pdf"
                  onClick={() => analytics.download.resume()}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 text-sm sm:text-base"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="size-4" />
                  Download Resume
                </motion.a>
                
                <motion.a
                  href={developerInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.social.clickGithub()}
                  className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm border-2 border-border px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 text-sm sm:text-base"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View GitHub
                </motion.a>
              </motion.div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}