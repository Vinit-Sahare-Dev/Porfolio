import type { Certification } from '@/types';

export const certifications: Certification[] = [
  {
    id: '1',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    issueDate: '2024',
    credentialId: 'AWS-SAA-123456',
    credentialUrl: 'https://aws.amazon.com/verification',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    skills: ['Cloud Architecture', 'AWS Services', 'System Design'],
    featured: true
  },
  {
    id: '2',
    title: 'Spring Professional Certification',
    issuer: 'VMware',
    issueDate: '2024',
    credentialId: 'SPRING-PRO-789012',
    credentialUrl: 'https://spring.io/certification',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    skills: ['Spring Boot', 'Spring Framework', 'Microservices'],
    featured: true
  },
  {
    id: '3',
    title: 'Oracle Certified Java Developer',
    issuer: 'Oracle',
    issueDate: '2023',
    credentialId: 'OCJD-345678',
    credentialUrl: 'https://education.oracle.com',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    skills: ['Java 17', 'OOP', 'Collections', 'Streams API'],
    featured: true
  },
  {
    id: '4',
    title: 'React Developer Certification',
    issuer: 'Meta',
    issueDate: '2024',
    credentialId: 'META-REACT-901234',
    credentialUrl: 'https://www.coursera.org/professional-certificates/meta-react-native',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    skills: ['React', 'Redux', 'Hooks', 'TypeScript'],
    featured: false
  },
  {
    id: '5',
    title: 'Docker Certified Associate',
    issuer: 'Docker Inc.',
    issueDate: '2024',
    credentialId: 'DCA-567890',
    credentialUrl: 'https://training.mirantis.com',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    skills: ['Docker', 'Containerization', 'Kubernetes'],
    featured: false
  },
  {
    id: '6',
    title: 'MongoDB Developer Certification',
    issuer: 'MongoDB University',
    issueDate: '2023',
    credentialId: 'MDB-DEV-234567',
    credentialUrl: 'https://university.mongodb.com',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    skills: ['MongoDB', 'NoSQL', 'Aggregation', 'Indexing'],
    featured: false
  }
];

export const getFeaturedCertifications = (): Certification[] => {
  return certifications.filter(cert => cert.featured);
};

export const getCertificationsByIssuer = (issuer: string): Certification[] => {
  return certifications.filter(cert => cert.issuer === issuer);
};
