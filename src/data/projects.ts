import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'SkillFusion Platform',
    category: 'fullstack',
    year: '2024',
    slug: 'skillfusion-platform',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'A comprehensive skill-exchange platform enabling smart skill-matching, real-time collaboration, and fully automated workflows. Features Google API integrations and advanced NLP capabilities for seamless user engagement.',
    techStack: ['Java 17', 'Spring Boot', 'JSP', 'HTML/CSS/JS', 'REST APIs', 'MySQL', 'Google APIs', 'NLP'],
    features: [
      'Smart skill-matching algorithm',
      'Real-time collaboration tools',
      'Automated workflow management',
      'Google API integrations',
      'Advanced NLP features',
      'User engagement analytics'
    ],
    github: 'https://github.com/Vinit-Sahare-Dev',
    images: [
      {
        id: '1-1',
        src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'SkillFusion collaboration interface',
        aspectRatio: 'landscape'
      },
      {
        id: '1-2',
        src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'Team collaboration dashboard',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '2',
    title: 'EmpSync Management System',
    category: 'fullstack',
    year: '2024',
    slug: 'empsync-management',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'A robust employee management system featuring secure REST APIs, highly optimized data handling, and department-level operations with workflow automation, comprehensive logging, and robust exception handling.',
    techStack: ['React', 'Spring Boot', 'Java', 'MySQL', 'REST APIs', 'JWT Authentication'],
    features: [
      'Secure REST API architecture',
      'Department-level operations',
      'Workflow automation',
      'Comprehensive logging system',
      'Robust exception handling',
      'Optimized data handling'
    ],
    github: 'https://github.com/Vinit-Sahare-Dev',
    images: [
      {
        id: '2-1',
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'EmpSync dashboard',
        aspectRatio: 'landscape'
      },
      {
        id: '2-2',
        src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'Employee management interface',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '3',
    title: 'FreshCart Food Ordering',
    category: 'fullstack',
    year: '2024',
    slug: 'freshcart-ordering',
    coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'A full-stack hotel food-ordering application supporting menu browsing, cart workflows, and real-time order processing with secure REST APIs and optimized NoSQL data models.',
    techStack: ['React', 'Spring Boot', 'Java', 'MongoDB', 'REST APIs', 'Real-time Processing'],
    features: [
      'Interactive menu browsing',
      'Smart cart management',
      'Real-time order processing',
      'Secure payment integration',
      'Optimized NoSQL models',
      'Mobile-responsive design'
    ],
    github: 'https://github.com/Vinit-Sahare-Dev',
    images: [
      {
        id: '3-1',
        src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'FreshCart food ordering interface',
        aspectRatio: 'landscape'
      },
      {
        id: '3-2',
        src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'Menu browsing experience',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '4',
    title: 'Veridia Hiring Platform',
    category: 'fullstack',
    year: '2024',
    slug: 'veridia-hiring-platform',
    coverImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'A minimal full-stack MVP that streamlines recruitment, featuring a React + Vite frontend and Spring Boot backend. Supports candidate registration, application submission, and admin management.',
    techStack: ['React', 'Vite', 'Spring Boot', 'Java', 'MySQL', 'REST APIs', 'Vercel'],
    features: [
      'Candidate registration system',
      'Application submission workflow',
      'Admin management dashboard',
      'RESTful API architecture',
      'Responsive React frontend',
      'Production-ready deployment'
    ],
    github: 'https://github.com/Vinit-Sahare-Dev/Veridiahiringplatform',
    liveUrl: 'https://veridiahiringplatform-fayw.vercel.app',
    images: [
      {
        id: '4-1',
        src: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'Veridia Hiring Platform dashboard',
        aspectRatio: 'landscape'
      },
      {
        id: '4-2',
        src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'Recruitment management interface',
        aspectRatio: 'landscape'
      }
    ]
  }
];

// Helper function to get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

// Helper function to get featured projects (first 4)
export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

// Helper function to get next/previous project
export const getAdjacentProjects = (currentSlug: string): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  };
};