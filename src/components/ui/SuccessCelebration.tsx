import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

interface SuccessCelebrationProps {
  message?: string;
  onComplete?: () => void;
}

export function SuccessCelebration({ 
  message = 'Success!',
  onComplete 
}: SuccessCelebrationProps) {
  
  useEffect(() => {
    // Auto complete after animation
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
        }}
      >
        {/* Success icon with pulse */}
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <CheckCircle2 className="w-24 h-24 text-green-500" strokeWidth={2} />
          
          {/* Sparkles around icon */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * Math.PI * 2) / 8) * 60,
                y: Math.sin((i * Math.PI * 2) / 8) * 60,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
          ))}
        </motion.div>

        {/* Success message */}
        <motion.p
          className="text-center mt-6 text-xl font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {message}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
