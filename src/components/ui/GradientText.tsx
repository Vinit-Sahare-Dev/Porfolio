import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  variant?: "default" | "premium" | "shine";
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p";
}

/**
 * Animated gradient text with multiple style variants
 */
export function GradientText({ 
  children, 
  variant = "default",
  className,
  as: Component = "span" 
}: GradientTextProps) {
  const variantClasses = {
    default: "gradient-text",
    premium: "gradient-text-premium",
    shine: "gradient-text-shine",
  };

  return (
    <motion.span
      className={cn("inline-block", variantClasses[variant], className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );
}
