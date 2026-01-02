import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: "default" | "subtle" | "heavy";
  glow?: boolean;
  spotlight?: boolean;
}

/**
 * Premium glass morphism card with advanced effects
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", glow = false, spotlight = false, children, ...props }, ref) => {
    const glassClasses = {
      default: "glass",
      subtle: "glass-subtle",
      heavy: "glass-heavy",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative rounded-2xl p-6 overflow-hidden",
          glassClasses[variant],
          glow && "hover-glow",
          spotlight && "spotlight",
          className
        )}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
