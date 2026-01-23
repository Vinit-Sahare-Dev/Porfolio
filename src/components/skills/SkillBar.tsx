import { motion } from 'framer-motion';
import { useState } from 'react';

interface SkillBarProps {
  name: string;
  level: number; // 0-100
  color?: string;
  index?: number;
}

/**
 * Animated skill proficiency bar
 */
export function SkillBar({ name, level, color = 'bg-primary', index = 0 }: SkillBarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <motion.span
          className="text-xs font-semibold text-primary"
          animate={{ scale: isHovered ? 1.1 : 1 }}
        >
          {level}%
        </motion.span>
      </div>
      
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full relative`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
