import { cn } from "@/lib/utils";
import { motion, useInView, Variants } from "framer-motion";
import { ReactNode, useRef } from "react";

interface AnimatedTextProps {
  children: string;
  className?: string;
  variant?: "word" | "character" | "line";
  delay?: number;
  staggerDelay?: number;
}

/**
 * Text with staggered animation per word/character
 */
export function AnimatedText({ 
  children, 
  className,
  variant = "word",
  delay = 0,
  staggerDelay = 0.05
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(8px)",
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const getElements = () => {
    if (variant === "character") {
      return children.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ));
    }
    
    return children.split(" ").map((word, i) => (
      <motion.span key={i} variants={itemVariants} className="inline-block mr-[0.25em]">
        {word}
      </motion.span>
    ));
  };

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {getElements()}
    </motion.span>
  );
}

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

/**
 * Animated counting number
 */
export function CountUp({ 
  end, 
  duration = 2,
  className,
  prefix = "",
  suffix = ""
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
      >
        {isInView && (
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <CountUpNumber end={end} duration={duration} />
          </motion.span>
        )}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

function CountUpNumber({ end, duration }: { end: number; duration: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  return (
    <motion.span
      ref={nodeRef}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      onAnimationStart={() => {
        if (!nodeRef.current) return;
        const startTime = performance.now();
        const updateNumber = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / (duration * 1000), 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(easeOut * end);
          if (nodeRef.current) {
            nodeRef.current.textContent = current.toString();
          }
          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          }
        };
        requestAnimationFrame(updateNumber);
      }}
    >
      0
    </motion.span>
  );
}

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
}

/**
 * Typewriter text effect
 */
export function Typewriter({ 
  text, 
  className,
  speed = 50,
  delay = 0,
  cursor = true
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {isInView && (
        <>
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ 
              duration: text.length * speed / 1000, 
              ease: "linear",
              delay: delay / 1000 
            }}
            className="inline-block overflow-hidden whitespace-nowrap"
          >
            {text}
          </motion.span>
          {cursor && (
            <motion.span
              className="inline-block w-[2px] h-[1em] bg-current ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </>
      )}
    </span>
  );
}
