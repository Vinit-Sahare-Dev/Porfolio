import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  parallax?: boolean;
  parallaxSpeed?: number;
}

/**
 * Reusable scroll-triggered animation component
 * Reveals content with fade and slide on scroll
 * Optional parallax effect for depth
 */
export function ScrollReveal({ 
  children, 
  delay = 0, 
  className,
  parallax = false,
  parallaxSpeed = 0.1
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [50 * parallaxSpeed, -50 * parallaxSpeed]
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.98 }}
      style={parallax ? { y } : undefined}
      transition={{ 
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
