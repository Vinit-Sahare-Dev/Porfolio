export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  date: string;
  linkedin?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Senior Software Engineer',
    company: 'Tech Solutions Inc.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    content: 'Vinit is an exceptional developer with strong problem-solving skills. His work on the SkillFusion platform demonstrated excellent understanding of full-stack development and system architecture. He consistently delivers high-quality code and is a great team player.',
    rating: 5,
    date: 'January 2025',
    linkedin: 'https://linkedin.com'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Tech Lead',
    company: 'Digital Innovations',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    content: 'Working with Vinit was a pleasure. His expertise in Spring Boot and React helped us deliver our project ahead of schedule. He has a keen eye for detail and always ensures best practices are followed. Highly recommended!',
    rating: 5,
    date: 'December 2024',
    linkedin: 'https://linkedin.com'
  },
  {
    id: '3',
    name: 'Amit Patel',
    role: 'Project Manager',
    company: 'CloudTech Systems',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    content: 'Vinit\'s technical skills are impressive, but what stands out is his ability to understand business requirements and translate them into effective solutions. His work on the EmpSync system was outstanding.',
    rating: 5,
    date: 'November 2024',
    linkedin: 'https://linkedin.com'
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    role: 'Full Stack Developer',
    company: 'StartupHub',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    content: 'Vinit is a talented developer who brings fresh ideas to the table. His knowledge of modern web technologies and microservices architecture is commendable. Great to collaborate with!',
    rating: 5,
    date: 'October 2024',
    linkedin: 'https://linkedin.com'
  }
];
