import type { DeveloperInfo } from '@/types';
import profilePhoto from '@/assets/profile-photo.jpeg';

export const developerInfo: DeveloperInfo = {
  name: 'Vinit Sahare',
  tagline: 'Java Full Stack Developer',
  heroIntroduction: 'Building scalable web applications with Java, Spring Boot, React, and modern DevOps practices.',
  professionalSummary: `Full Stack Developer proficient in Java, Spring Boot, React.js, and SQL. I possess a strong foundation in object-oriented design, data structures, and the full software development lifecycle. My focus is on building scalable and effective web applications that solve real-world problems.

With hands-on experience from internships at Octal Net Services, Walmart Global Tech, and TCS, I've developed expertise in both frontend and backend technologies. I'm passionate about clean code, microservices architecture, and leveraging modern DevOps tools to deliver high-quality software.`,
  profileImage: profilePhoto,
  skills: [
    {
      name: 'Frontend',
      items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap'],
      icon: 'layout'
    },
    {
      name: 'Backend',
      items: ['Java', 'Spring Boot', 'Data JPA', 'REST APIs', 'Hibernate', 'Microservices'],
      icon: 'server'
    },
    {
      name: 'Database',
      items: ['MySQL', 'MongoDB'],
      icon: 'database'
    },
    {
      name: 'DevOps & Tools',
      items: ['Docker', 'Kubernetes', 'Jira', 'Maven', 'Git/GitHub', 'Postman', 'Swagger'],
      icon: 'settings'
    }
  ],
  experience: [
    {
      title: 'Web Development Intern',
      company: 'Octal Net Services Pvt Ltd.',
      period: 'Jun - Aug 2023',
      description: 'Completed a 2-month intensive internship in full-stack development, applied Java, Spring Boot and front-end technologies in practical projects, and gained hands-on experience in building and maintaining web applications.'
    },
    {
      title: 'Advanced Software Engineering & Data Visualization Intern',
      company: 'Walmart Global Tech & TCS',
      period: 'May 2024',
      description: 'Completed virtual internships applying software architecture, application design, and data structures, while transforming complex data into actionable insights and reports using business research and data visualization.'
    }
  ],
  education: [
    {
      degree: 'Bachelor of Engineering (BE) in Information Technology',
      institution: 'Prof Ram Meghe College of Engineering and Management (SGBAU)',
      period: 'Dec 2021 – Jun 2025',
      grade: 'CGPA: 8.3'
    },
    {
      degree: 'HSC (Science PCMB)',
      institution: 'Maharashtra State Board',
      period: '',
      grade: '78.5%'
    },
    {
      degree: 'SSC',
      institution: 'Maharashtra State Board',
      period: '',
      grade: '78.6%'
    }
  ],
  achievements: [
    'Published patent for Skill Fusion community skill-exchange platform (Indian Patent Office)',
    'Winner: Inter-College Tech-Mania 2024 Coding Quiz Competition',
    'The Complete 2023 Web Development Bootcamp | Udemy',
    'Career Essentials in Generative AI by Microsoft and LinkedIn',
    'Career Essentials in Software Development by Microsoft and LinkedIn',
    'C and Java Programming Certificates | CCIT',
    'Completed virtual internships at Walmart & TATA (via Forage)'
  ],
  location: 'India',
  email: 'vinit.sahare.dev@gmail.com',
  phone: '+91 9921349614',
  availability: 'Open to full-time opportunities',
  socialLinks: {
    github: 'https://github.com/Vinit-Sahare-Dev',
    linkedin: 'https://www.linkedin.com/in/vinit-sahare'
  }
};