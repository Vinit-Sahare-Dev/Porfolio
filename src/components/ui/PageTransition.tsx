import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Page content with fade and slide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>

      {/* Animated overlay curtain */}
      <motion.div
        className="fixed inset-0 bg-background z-50 pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ originY: 0 }}
      />
      
      <motion.div
        className="fixed inset-0 bg-background z-50 pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1,
        }}
        style={{ originY: 1 }}
      />
    </>
  );
}
