/**
 * Application constants and configuration
 * @module utils/constants
 */

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  github: 'https://github.com/Vinit-Sahare-Dev',
  linkedin: 'https://www.linkedin.com/in/vinit-sahare/',
  twitter: 'https://twitter.com/vinit_sahare',
  email: 'vinitsahare.dev@gmail.com'
};

/**
 * Navigation links configuration
 */
export const NAV_LINKS = [
  { name: 'Home', path: '/', icon: 'home' },
  { name: 'Projects', path: '/portfolio', icon: 'briefcase' },
  { name: 'Certifications', path: '/certifications', icon: 'award' },
  { name: 'Blog', path: '/blog', icon: 'book' },
  { name: 'About', path: '/about', icon: 'user' },
  { name: 'Contact', path: '/contact', icon: 'mail' }
];

/**
 * Project categories
 */
export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'mobile', label: 'Mobile' }
];

/**
 * Skill categories with icons
 */
export const SKILL_CATEGORIES = {
  frontend: {
    name: 'Frontend',
    icon: 'code',
    color: '#61DAFB'
  },
  backend: {
    name: 'Backend',
    icon: 'server',
    color: '#68A063'
  },
  database: {
    name: 'Database',
    icon: 'database',
    color: '#336791'
  },
  devops: {
    name: 'DevOps & Tools',
    icon: 'settings',
    color: '#FF6C37'
  }
};

/**
 * Theme configuration
 */
export const THEME_CONFIG = {
  defaultTheme: 'system',
  storageKey: 'portfolio-theme',
  themes: ['light', 'dark', 'system']
};

/**
 * Animation durations (in seconds)
 */
export const ANIMATION_DURATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8
};

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  githubContributions: 'https://github-contributions-api.jogruber.de/v4',
  contact: '/api/contact'
};

/**
 * Meta information
 */
export const META_INFO = {
  title: 'Vinit Sahare | Java Full Stack Developer',
  description: 'Portfolio of Vinit Sahare - Java Full Stack Developer specializing in Spring Boot, React, and modern web technologies',
  author: 'Vinit Sahare',
  siteUrl: 'https://vinitsahare.vercel.app',
  twitterHandle: '@vinit_sahare'
};

/**
 * Contact form configuration
 */
export const CONTACT_FORM = {
  maxMessageLength: 1000,
  minMessageLength: 10,
  subjects: [
    'General Inquiry',
    'Job Opportunity',
    'Project Collaboration',
    'Freelance Work',
    'Other'
  ]
};

/**
 * GitHub username
 */
export const GITHUB_USERNAME = 'Vinit-Sahare-Dev';

/**
 * Resume file path
 */
export const RESUME_PATH = '/resume/VinitSahare_Resume.pdf';

/**
 * Image placeholders
 */
export const PLACEHOLDER_IMAGES = {
  project: '/placeholder.svg',
  profile: '/placeholder.svg',
  certificate: '/placeholder.svg'
};

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  networkError: 'Network error. Please check your connection.',
  serverError: 'Server error. Please try again later.',
  notFound: 'The requested resource was not found.',
  validationError: 'Please check your input and try again.'
};

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  contactSent: 'Your message has been sent successfully!',
  copied: 'Copied to clipboard!',
  subscribed: 'Successfully subscribed to newsletter!'
};
