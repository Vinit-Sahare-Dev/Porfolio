import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface MorphBlobProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * Animated morphing blob for decorative backgrounds
 */
export function MorphBlob({ 
  className,
  color = "hsla(var(--primary) / 0.15)",
  size = "md"
}: MorphBlobProps) {
  const sizes = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
    xl: "w-[32rem] h-[32rem]",
  };

  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-3xl animate-morph",
        sizes[size],
        className
      )}
      style={{ background: color }}
      animate={{
        scale: [1, 1.1, 0.95, 1.05, 1],
        x: [0, 30, -20, 15, 0],
        y: [0, -20, 30, -10, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

/**
 * Element with smooth floating animation
 */
export function FloatingElement({ 
  children, 
  className,
  delay = 0,
  duration = 6
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-8, 8, -8],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

/**
 * Container with scroll-based parallax effect
 */
export function ParallaxContainer({ 
  children, 
  className,
  speed = 0.5 
}: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

interface MeshGradientBackgroundProps {
  className?: string;
  animated?: boolean;
}

/**
 * Premium mesh gradient background
 */
export function MeshGradientBackground({ 
  className,
  animated = true 
}: MeshGradientBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Base mesh gradient */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      
      {/* Animated orbs */}
      {animated && (
        <>
          <MorphBlob 
            size="xl" 
            color="hsla(270 76% 58% / 0.08)" 
            className="top-0 left-1/4" 
          />
          <MorphBlob 
            size="lg" 
            color="hsla(172 66% 50% / 0.06)" 
            className="bottom-1/4 right-1/4" 
          />
          <MorphBlob 
            size="md" 
            color="hsla(346 77% 49% / 0.05)" 
            className="top-1/2 right-1/3" 
          />
        </>
      )}
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-texture" />
    </div>
  );
}
