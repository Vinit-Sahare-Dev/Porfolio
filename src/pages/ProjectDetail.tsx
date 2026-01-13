import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Code2, ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { getProjectBySlug } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/**
 * Project detail page with hero image, tech stack, features, and gallery
 * Updated for developer portfolio showcase
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  // 404 if project not found
  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <SEOHead
        title={project.title}
        description={project.description}
        image={project.coverImage}
        type="article"
      />
      
      <div className="min-h-screen">
        {/* Hero Image - 60vh */}
        <motion.div
          className="relative w-full h-[60vh] overflow-hidden bg-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          
          {/* Back button */}
          <div className="absolute top-24 left-6 lg:left-8">
            <Link to="/portfolio">
              <Button variant="secondary" size="sm" className="gap-2">
                <ArrowLeft className="size-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Project Info Section */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16 -mt-32 relative z-10">
          <motion.div
            className="space-y-8 bg-background/95 backdrop-blur-sm rounded-lg p-8 border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Title and Category */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="capitalize">
                  {project.category}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="size-3" />
                  {project.year}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                {project.title}
              </h1>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg font-light leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-foreground">
                <Code2 className="size-4" />
                <span>Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Key Features</h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-1">▹</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Github className="size-4" />
                    View on GitHub
                  </Button>
                </a>
              )}
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="size-4" />
                    Live Demo
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}