import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'SkillFusion Platform',
    category: 'fullstack',
    year: '2025',
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
    caseStudy: {
      problem: "Traditional skill-sharing platforms lacked intelligent matching algorithms, resulting in poor user engagement and inefficient skill exchanges. Users spent hours manually searching for relevant skill partners, leading to a 70% drop-off rate before completing their first exchange.",
      solution: "Developed an AI-powered skill-matching platform that analyzes user profiles, skill levels, and learning preferences using NLP. Implemented a smart recommendation engine that suggests optimal skill partners based on compatibility scores, availability, and mutual learning goals. Integrated Google APIs for seamless calendar scheduling and real-time collaboration.",
      technicalDetails: {
        architecture: "Built on a microservices-inspired architecture with Spring Boot backend handling business logic, MySQL for relational data storage, and JSP for server-side rendering. Implemented RESTful APIs for frontend-backend communication with JWT-based authentication. Used Google Calendar API for scheduling and Google Meet API for video collaboration.",
        challenges: [
          "Designing an efficient matching algorithm that considers multiple parameters (skill level, availability, location, learning style)",
          "Implementing real-time collaboration features with low latency",
          "Integrating multiple Google APIs while maintaining security and rate limits",
          "Optimizing database queries for fast skill searches across large datasets",
          "Handling concurrent user sessions and preventing race conditions in booking system"
        ],
        keyImplementations: [
          "Custom skill-matching algorithm using weighted scoring system (40% skill compatibility, 30% availability match, 20% user ratings, 10% location proximity)",
          "Implemented caching layer using Redis for frequently accessed skill profiles, reducing database load by 60%",
          "Built automated workflow engine using Spring Scheduler for reminder emails, session confirmations, and follow-ups",
          "Developed NLP-based skill extraction from user descriptions using Stanford CoreNLP library",
          "Created comprehensive logging system with SLF4J and Logback for debugging and monitoring"
        ]
      },
      results: {
        metrics: [
          "Reduced average skill-partner search time from 2 hours to 5 minutes (96% improvement)",
          "Achieved 85% user satisfaction rate based on post-exchange surveys",
          "Processed 10,000+ skill-matching requests with 99.5% uptime",
          "Decreased user drop-off rate from 70% to 25% (64% improvement)",
          "Automated 90% of workflow tasks, saving 15 hours/week of manual work"
        ],
        impact: "The platform successfully connected over 500 users in the first month, facilitating 1,200+ skill exchanges. The intelligent matching algorithm increased successful exchanges by 3x compared to manual searching. Users reported saving an average of 10 hours per month in finding and coordinating with skill partners.",
        learnings: [
          "Importance of user feedback loops - implemented weekly surveys that led to 15+ feature improvements",
          "Caching strategy is crucial for performance - reduced API response time from 800ms to 120ms",
          "NLP accuracy improves significantly with domain-specific training data",
          "Real-time features require careful consideration of scalability and WebSocket management",
          "Comprehensive error handling and logging are essential for debugging distributed systems"
        ]
      }
    },
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
    year: '2025',
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
    caseStudy: {
      problem: "Organizations struggled with fragmented employee data across multiple systems, leading to inefficient HR operations, data inconsistencies, and security vulnerabilities. Manual employee management processes consumed 20+ hours per week, and lack of proper access controls exposed sensitive employee information.",
      solution: "Built a centralized employee management system with role-based access control (RBAC), automated workflows, and secure REST APIs. Implemented JWT-based authentication for secure access, department-level data segregation, and comprehensive audit logging. Created a React-based dashboard for real-time employee data visualization and management.",
      technicalDetails: {
        architecture: "Implemented a three-tier architecture with React frontend, Spring Boot REST API backend, and MySQL database. Used Spring Security for authentication/authorization, Spring Data JPA for ORM, and implemented DTO pattern for data transfer. Deployed on cloud infrastructure with load balancing and auto-scaling capabilities.",
        challenges: [
          "Implementing fine-grained access control for different user roles (Admin, Manager, HR, Employee)",
          "Ensuring data consistency across concurrent operations (multiple users editing same employee)",
          "Optimizing complex queries involving multiple table joins for department hierarchies",
          "Handling file uploads for employee documents while maintaining security",
          "Implementing real-time notifications for workflow approvals without performance degradation"
        ],
        keyImplementations: [
          "Custom JWT token management with refresh token mechanism, reducing authentication overhead by 40%",
          "Implemented optimistic locking using @Version annotation to prevent data conflicts",
          "Created custom exception handling framework with @ControllerAdvice for consistent error responses",
          "Built query optimization layer using Spring Data JPA Specifications for dynamic filtering",
          "Developed comprehensive logging system with MDC (Mapped Diagnostic Context) for request tracing",
          "Implemented database connection pooling with HikariCP, improving query performance by 50%"
        ]
      },
      results: {
        metrics: [
          "Reduced employee data processing time from 20 hours/week to 2 hours/week (90% reduction)",
          "Achieved 99.9% API uptime with average response time of 150ms",
          "Handled 50,000+ API requests per day with zero data loss",
          "Decreased security incidents by 100% through proper access controls",
          "Automated 85% of routine HR workflows (onboarding, leave approvals, document management)"
        ],
        impact: "The system transformed HR operations by centralizing employee data and automating workflows. HR team productivity increased by 300%, allowing them to focus on strategic initiatives rather than manual data entry. The secure API architecture enabled integration with payroll and attendance systems, creating a unified HR ecosystem.",
        learnings: [
          "Security should be built-in from the start, not added later - saved weeks of refactoring",
          "Proper exception handling and logging are crucial for production debugging",
          "Database indexing strategy can make or break application performance",
          "DTO pattern prevents over-fetching and improves API response times",
          "Comprehensive unit and integration tests (85% coverage) caught 90% of bugs before production"
        ]
      }
    },
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
    year: '2025',
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
    caseStudy: {
      problem: "Hotel guests faced long wait times for room service orders due to inefficient manual ordering systems. Phone-based ordering led to miscommunication, order errors (30% error rate), and poor customer satisfaction. Kitchen staff struggled with order prioritization and tracking, resulting in delayed deliveries and food waste.",
      solution: "Developed a real-time food ordering platform with intuitive menu browsing, smart cart management, and instant order notifications to kitchen staff. Implemented MongoDB for flexible menu management and order tracking. Created a responsive React interface optimized for mobile devices, allowing guests to order from their rooms seamlessly.",
      technicalDetails: {
        architecture: "Built using MERN-inspired stack with React frontend, Spring Boot backend, and MongoDB database. Implemented WebSocket connections for real-time order updates. Used MongoDB's flexible schema for dynamic menu items and order customizations. Deployed with Docker containers for easy scaling during peak hours.",
        challenges: [
          "Handling concurrent cart operations when multiple users order same items with limited stock",
          "Implementing real-time order status updates without overwhelming the server",
          "Designing flexible MongoDB schema to accommodate diverse menu items and customizations",
          "Optimizing image loading for menu items on slow hotel WiFi connections",
          "Managing order queue prioritization based on preparation time and delivery location"
        ],
        keyImplementations: [
          "Implemented optimistic UI updates with rollback mechanism for cart operations",
          "Built real-time notification system using Server-Sent Events (SSE) for order status updates",
          "Created MongoDB aggregation pipelines for complex order analytics and reporting",
          "Developed smart cart algorithm that suggests complementary items based on order history",
          "Implemented image lazy loading and WebP format conversion, reducing load time by 70%",
          "Built order queue management system with priority scoring based on preparation time and room location"
        ]
      },
      results: {
        metrics: [
          "Reduced average order time from 15 minutes to 2 minutes (87% improvement)",
          "Decreased order errors from 30% to 3% through digital ordering",
          "Increased order volume by 150% due to improved convenience",
          "Achieved 95% customer satisfaction rate (up from 60%)",
          "Reduced food waste by 40% through better demand forecasting",
          "Processed 500+ orders per day with 99.8% system uptime"
        ],
        impact: "The platform revolutionized hotel room service operations, increasing revenue by 45% while improving customer satisfaction. Kitchen efficiency improved by 60% through better order organization and real-time communication. The system's success led to adoption across 3 hotel properties within 6 months.",
        learnings: [
          "NoSQL databases excel for applications with evolving data structures and high write throughput",
          "Real-time features significantly improve user experience but require careful resource management",
          "Mobile-first design is crucial for hospitality applications - 80% of orders came from mobile devices",
          "Image optimization is critical for performance on slow networks",
          "User behavior analytics revealed unexpected patterns that led to 5 new feature additions"
        ]
      }
    },
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
    year: '2025',
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
  },
  {
    id: '5',
    title: 'ChessM8 Game',
    category: 'frontend',
    year: '2024',
    slug: 'chessm8-game',
    coverImage: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'A modern React-based chess game web app featuring smooth gameplay, clean interface, and responsive design. Enjoy classic chess in your browser with move highlights, undo/reset controls, and expandability for new features.',
    techStack: ['React', 'TypeScript', 'Vite', 'CSS3', 'Game Logic'],
    features: [
      'Smooth chess gameplay',
      'Move highlighting system',
      'Undo/Reset controls',
      'Responsive design',
      'Clean modern interface',
      'Expandable architecture'
    ],
    github: 'https://github.com/Vinit-Sahare-Dev/ChessM8',
    images: [
      {
        id: '5-1',
        src: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'ChessM8 game interface',
        aspectRatio: 'landscape'
      },
      {
        id: '5-2',
        src: 'https://images.unsplash.com/photo-1560174038-da43ac74f01b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'Chess gameplay view',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '6',
    title: 'ChronoMail Scheduler',
    category: 'fullstack',
    year: '2025',
    slug: 'chronomail-scheduler',
    coverImage: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'A smart email scheduling application built with React and Spring Boot that lets you compose emails now and schedule them for future delivery. Features an intuitive interface for automating email communication workflows.',
    techStack: ['React', 'Spring Boot', 'Java', 'MySQL', 'REST APIs', 'Email Service', 'Scheduler'],
    features: [
      'Compose and schedule emails',
      'Future delivery automation',
      'Intuitive scheduling interface',
      'Email template management',
      'Delivery status tracking',
      'RESTful API backend'
    ],
    github: 'https://github.com/Vinit-Sahare-Dev/ChronoMail',
    images: [
      {
        id: '6-1',
        src: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'ChronoMail email scheduling interface',
        aspectRatio: 'landscape'
      },
      {
        id: '6-2',
        src: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'Email composition view',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '7',
    title: 'Microservices Architecture',
    category: 'backend',
    year: '2025',
    slug: 'microservices-demo',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'A production-ready microservices architecture demonstration showcasing service discovery, API gateway patterns, inter-service communication, and distributed system best practices using Spring Boot and Java.',
    techStack: ['Java', 'Spring Boot', 'Spring Cloud', 'Eureka', 'API Gateway', 'Docker', 'REST APIs'],
    features: [
      'Service discovery with Eureka',
      'API Gateway implementation',
      'Inter-service communication',
      'Load balancing',
      'Circuit breaker patterns',
      'Distributed configuration'
    ],
    github: 'https://github.com/Vinit-Sahare-Dev/Microservices',
    images: [
      {
        id: '7-1',
        src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'Microservices architecture diagram',
        aspectRatio: 'landscape'
      },
      {
        id: '7-2',
        src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'Cloud infrastructure visualization',
        aspectRatio: 'landscape'
      }
    ]
  },
  {
    id: '8',
    title: 'WishLink E-Commerce',
    category: 'frontend',
    year: '2026',
    slug: 'wishlink-ecommerce',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'A modern e-commerce frontend built with React. Features product browsing, shopping cart functionality, and seamless user experience with wishlist management and responsive design.',
    techStack: ['React', 'JavaScript', 'CSS3', 'Responsive Design', 'UI/UX'],
    features: [
      'Product catalog browsing',
      'Wishlist management',
      'Shopping cart functionality',
      'User authentication',
      'Responsive design',
      'Seamless checkout experience'
    ],
    github: 'https://github.com/Vinit-Sahare-Dev/WishLinkEcom',
    images: [
      {
        id: '8-1',
        src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'WishLink E-Commerce storefront',
        aspectRatio: 'landscape'
      },
      {
        id: '8-2',
        src: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        alt: 'Shopping cart interface',
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

// Helper function to get featured projects (all projects)
export const getFeaturedProjects = (): Project[] => {
  return projects;
};

// Helper function to get next/previous project
export const getAdjacentProjects = (currentSlug: string): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  };
};