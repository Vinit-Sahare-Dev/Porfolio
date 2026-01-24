import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AvailabilityBadgeProps {
  available?: boolean;
  message?: string;
  variant?: 'default' | 'compact';
}

export function AvailabilityBadge({ 
  available = true, 
  message = 'Open to opportunities',
  variant = 'default'
}: AvailabilityBadgeProps) {
  if (!available) return null;

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="size-2 bg-green-500 rounded-full"
        />
        <span className="text-xs font-medium text-green-600 dark:text-green-400">
          {message}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl shadow-sm"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative"
      >
        <div className="size-3 bg-green-500 rounded-full" />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-green-500 rounded-full"
        />
      </motion.div>
      <div className="flex items-center gap-2">
        <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />
        <span className="text-sm font-semibold text-green-700 dark:text-green-300">
          {message}
        </span>
      </div>
    </motion.div>
  );
}
