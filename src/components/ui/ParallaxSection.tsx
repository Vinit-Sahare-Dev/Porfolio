import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // Parallax speed multiplier (0.1 = slow, 0.5 = medium, 1 = fast)
  direction?: 'up' | 'down';
}

/**
 * Parallax section wrapper
 * Creates smooth parallax scrolling effect on children
 */
export function ParallaxSection({ 
  children, 
  className = '', 
  speed = 0.3,
  direction = 'up' 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed * multiplier, -100 * speed * multiplier]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

interface ParallaxBackgroundProps {
  className?: string;
  speed?: number;
}

/**
 * Parallax background layer
 * Creates depth effect with slower-moving background
 */
export function ParallaxBackground({ className = '', speed = 0.2 }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.8, 0.8, 0.3]);

  return (
    <motion.div
      ref={ref}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ y, opacity }}
    >
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-primary/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
    </motion.div>
  );
}