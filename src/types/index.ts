/**
 * Core TypeScript interfaces for Developer Portfolio
 * Updated for Java Full Stack Developer showcase
 */

export type ProjectCategory = 'fullstack' | 'backend' | 'frontend' | 'microservices' | 'devops';

export type TechStack = string[];

export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  coverImage: string;
  images: ProjectImage[];
  description: string;
  techStack: TechStack;
  features: string[];
  github?: string;
  liveDemo?: string;
  liveUrl?: string;
  slug: string;
}

export interface Skill {
  name: string;
  items: string[];
  icon?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface DeveloperInfo {
  name: string;
  tagline: string;
  heroIntroduction: string;
  professionalSummary: string;
  skills: Skill[];
  experience: Experience[];
  education: {
    degree: string;
    institution: string;
    period: string;
    grade: string;
  }[];
  achievements: string[];
  location: string;
  email: string;
  phone: string;
  availability: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  profileImage: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  projectType: 'fullstack' | 'backend' | 'frontend' | 'consulting';
  message: string;
  timestamp: Date;
}