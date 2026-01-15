/**
 * Animation utility functions and configurations
 * @module utils/animations
 */

/**
 * Fade in animation variants for Framer Motion
 */
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

/**
 * Slide up animation variants
 */
export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

/**
 * Slide in from left animation variants
 */
export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
};

/**
 * Slide in from right animation variants
 */
export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
};

/**
 * Scale animation variants
 */
export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
};

/**
 * Stagger children animation configuration
 * @param {number} staggerTime - Time between each child animation
 * @returns {Object} Animation variants
 */
export function staggerContainer(staggerTime = 0.1) {
  return {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerTime
      }
    }
  };
}

/**
 * Create custom spring animation
 * @param {number} stiffness - Spring stiffness
 * @param {number} damping - Spring damping
 * @returns {Object} Spring configuration
 */
export function createSpring(stiffness = 300, damping = 30) {
  return {
    type: 'spring',
    stiffness,
    damping
  };
}

/**
 * Page transition variants
 */
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

/**
 * Hover scale effect
 */
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

/**
 * Tap scale effect
 */
export const tapScale = {
  scale: 0.95
};

/**
 * Floating animation for decorative elements
 */
export const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

/**
 * Pulse animation
 */
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [0.7, 1, 0.7],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

/**
 * Rotate animation
 */
export const rotateAnimation = {
  rotate: 360,
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'linear'
  }
};

/**
 * Text reveal animation for headings
 */
export const textReveal = {
  initial: { opacity: 0, y: 50 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

/**
 * Card hover animation
 */
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -5,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

/**
 * Image zoom on hover
 */
export const imageZoom = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.1,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};
