import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { generateBlurDataURL } from '@/utils/imageOptimization';

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
    >
      <Link
        to={`/project/${project.slug}`}
        className="group block relative overflow-hidden rounded-sm"
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
          
          {/* Overlay with gradient and text - always visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 space-y-1.5 sm:space-y-2">
              <h3 className="text-white text-base sm:text-xl md:text-2xl font-medium tracking-wide line-clamp-2">
                {project.title}
              </h3>
              {showCategory && (
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/80 font-light tracking-wide">
                  <span className="capitalize">{project.category}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>
              )}
            </div>
          </div>

          {/* Subtle hover border effect */}
          <div className="absolute inset-0 border-2 border-white/10 group-hover:border-white/20 transition-colors duration-500 rounded-sm" />
        </div>
      </Link>
    </motion.div>
  );
}
