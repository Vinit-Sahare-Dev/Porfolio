import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { generateBlurDataURL } from '@/utils/imageOptimization';
import { analytics } from '@/lib/analytics';

interface ProjectCardProps {
  project: Project;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  showCategory?: boolean;
  index?: number;
}

/**
 * Project card component with image, hover overlay, and smooth animations
 * Used in homepage featured projects and portfolio grid
 */
export function ProjectCard({ 
  project, 
  aspectRatio, 
  showCategory = true,
  index = 0 
}: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const ratio = aspectRatio || 'landscape';
  
  const aspectRatioClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[3/2]',
    square: 'aspect-square'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        rotateX: 2,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
    >
      <Link
        to={`/project/${project.slug}`}
        onClick={() => analytics.project.view(project.title)}
        className="group block relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500"
      >
        {/* Image Container */}
        <div className={cn('relative overflow-hidden bg-muted', aspectRatioClasses[ratio])}>
          <OptimizedImage
            src={project.coverImage}
            alt={project.title}
            className="absolute inset-0 w-full h-full group-hover:scale-110 transition-transform duration-700"
            objectFit="cover"
            blurDataURL={generateBlurDataURL('#6366f1')}
            priority={index < 4}
            onLoad={() => setIsLoaded(true)}
          />
          
          {/* Overlay with gradient and text */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
            initial={{ opacity: 1 }}
            whileHover={{ opacity: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 space-y-1.5 sm:space-y-2">
              <motion.h3 
                className="text-white text-base sm:text-xl md:text-2xl font-medium tracking-wide line-clamp-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {project.title}
              </motion.h3>
              {showCategory && (
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/80 font-light tracking-wide">
                  <span className="capitalize">{project.category}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Animated border effect */}
          <motion.div 
            className="absolute inset-0 border-2 border-primary/0 rounded-lg"
            whileHover={{ 
              borderColor: "rgba(99, 102, 241, 0.5)",
              transition: { duration: 0.3 }
            }}
          />
          
          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: "-100%", opacity: 0 }}
            whileHover={{ 
              x: "100%", 
              opacity: 1,
              transition: { duration: 0.6, ease: "easeInOut" }
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
