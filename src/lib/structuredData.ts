/**
 * Structured Data (JSON-LD) generators for SEO
 * Generates schema.org markup for better search results
 */

import { developerInfo } from '@/data/developer';
import type { Article } from '@/data/articles';
import type { Project } from '@/types';

const SITE_URL = 'https://vinitsahare.vercel.app';

/**
 * Generate Person schema for the developer
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: developerInfo.name,
    url: SITE_URL,
    image: `${SITE_URL}/profile-photo.jpg`,
    jobTitle: 'Java Full Stack Developer',
    description: developerInfo.heroIntroduction,
    email: developerInfo.email,
    telephone: developerInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: developerInfo.location
    },
    sameAs: [
      developerInfo.socialLinks.github,
      developerInfo.socialLinks.linkedin,
      developerInfo.socialLinks.twitter
    ],
    knowsAbout: [
      'Java',
      'Spring Boot',
      'React',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Docker',
      'Full Stack Development'
    ]
  };
}

/**
 * Generate WebSite schema for the portfolio
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${developerInfo.name} - Portfolio`,
    url: SITE_URL,
    description: developerInfo.heroIntroduction,
    author: {
      '@type': 'Person',
      name: developerInfo.name
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Generate ProfilePage schema
 */
export function generateProfilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: generatePersonSchema(),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL
        }
      ]
    }
  };
}

/**
 * Generate BlogPosting schema for articles
 */
export function generateBlogPostingSchema(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: `${SITE_URL}/og-image.jpg`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Person',
      name: developerInfo.name,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Person',
      name: developerInfo.name,
      url: SITE_URL
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.slug}`
    },
    keywords: article.tags.join(', '),
    articleSection: article.category,
    wordCount: article.content.split(/\s+/).length,
    timeRequired: article.readTime,
    inLanguage: 'en-US'
  };
}

/**
 * Generate Blog schema for blog listing page
 */
export function generateBlogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${developerInfo.name} - Blog`,
    description: 'Technical articles on web development, software architecture, and best practices',
    url: `${SITE_URL}/blog`,
    author: {
      '@type': 'Person',
      name: developerInfo.name
    },
    publisher: {
      '@type': 'Person',
      name: developerInfo.name
    },
    inLanguage: 'en-US'
  };
}

/**
 * Generate CreativeWork schema for projects
 */
export function generateCreativeWorkSchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.coverImage,
    url: `${SITE_URL}/project/${project.slug}`,
    author: {
      '@type': 'Person',
      name: developerInfo.name
    },
    dateCreated: project.year,
    keywords: project.technologies.join(', '),
    genre: project.category,
    ...(project.githubUrl && {
      codeRepository: project.githubUrl
    }),
    ...(project.liveUrl && {
      url: project.liveUrl
    })
  };
}

/**
 * Generate ItemList schema for portfolio page
 */
export function generatePortfolioSchema(projects: Project[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Portfolio Projects',
    description: 'Collection of full-stack development projects',
    url: `${SITE_URL}/portfolio`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        url: `${SITE_URL}/project/${project.slug}`,
        image: project.coverImage
      }
    }))
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Generate ContactPage schema
 */
export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact',
    description: `Get in touch with ${developerInfo.name}`,
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Person',
      name: developerInfo.name,
      email: developerInfo.email,
      telephone: developerInfo.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: developerInfo.location
      }
    }
  };
}

/**
 * Generate Organization schema (if applicable)
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: developerInfo.name,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    sameAs: [
      developerInfo.socialLinks.github,
      developerInfo.socialLinks.linkedin,
      developerInfo.socialLinks.twitter
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: developerInfo.email,
      contactType: 'Professional Inquiry',
      availableLanguage: ['English']
    }
  };
}
