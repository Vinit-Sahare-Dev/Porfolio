import type { Certification } from '@/types';

export const certifications: Certification[] = [
  {
    id: '1',
    title: 'The Complete 2023 Web Development Bootcamp',
    issuer: 'Udemy',
    issueDate: '2023',
    credentialUrl: 'https://www.udemy.com',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
    featured: true
  },
  {
    id: '2',
    title: 'Career Essentials in Generative AI',
    issuer: 'Microsoft and LinkedIn',
    issueDate: '2024',
    credentialUrl: 'https://www.linkedin.com/learning',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    skills: ['Generative AI', 'AI Fundamentals', 'Prompt Engineering'],
    featured: true
  },
  {
    id: '3',
    title: 'Career Essentials in Software Development',
    issuer: 'Microsoft and LinkedIn',
    issueDate: '2024',
    credentialUrl: 'https://www.linkedin.com/learning',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    skills: ['Software Development', 'Programming Fundamentals', 'Best Practices'],
    featured: true
  },
  {
    id: '4',
    title: 'Winner: Inter-College Tech-Mania 2024 Coding Quiz Competition',
    issuer: 'Tech-Mania 2024',
    issueDate: '2024',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    skills: ['Problem Solving', 'Competitive Programming', 'Quick Thinking'],
    featured: true
  },
  {
    id: '5',
    title: 'C and Java Programming Certificates',
    issuer: 'CCIT',
    issueDate: '2023',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    skills: ['C Programming', 'Java', 'OOP', 'Data Structures'],
    featured: false
  },
  {
    id: '6',
    title: 'Advanced Software Engineering Job Simulation',
    issuer: 'Walmart',
    issueDate: '2024',
    credentialUrl: 'https://www.theforage.com',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    skills: ['Software Engineering', 'System Design', 'Data Structures', 'Algorithms'],
    featured: true
  }
];

export const getFeaturedCertifications = (): Certification[] => {
  return certifications.filter(cert => cert.featured);
};

export const getCertificationsByIssuer = (issuer: string): Certification[] => {
  return certifications.filter(cert => cert.issuer === issuer);
};
