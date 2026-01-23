import { motion } from 'framer-motion';
import { Star, Quote, Linkedin } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import type { Testimonial } from '@/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 h-full flex flex-col"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors">
        <Quote className="size-12" fill="currentColor" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Content */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow relative z-10">
        "{testimonial.content}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        <div className="relative size-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-border">
          <OptimizedImage
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full"
            objectFit="cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-foreground">{testimonial.name}</h4>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
          <p className="text-xs text-primary">{testimonial.company}</p>
        </div>
        {testimonial.linkedin && (
          <a
            href={testimonial.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={`${testimonial.name}'s LinkedIn`}
          >
            <Linkedin className="size-5" />
          </a>
        )}
      </div>

      {/* Date */}
      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">{testimonial.date}</p>
      </div>
    </motion.div>
  );
}
