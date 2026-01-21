import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { developerInfo } from '@/data/developer';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
  structuredData?: object;
}

const SITE_URL = 'https://vinitsahare.vercel.app';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * SEO component for managing page meta tags and structured data
 * Handles title, description, Open Graph, Twitter Cards, and JSON-LD
 */
export function SEOHead({ 
  title, 
  description, 
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  article,
  structuredData
}: SEOHeadProps) {
  const location = useLocation();
  
  const fullTitle = title 
    ? `${title} | ${developerInfo.name}` 
    : `${developerInfo.name} - ${developerInfo.tagline}`;
  
  const defaultDescription = developerInfo.heroIntroduction;
  const fullDescription = description || defaultDescription;
  
  const fullUrl = `${SITE_URL}${location.pathname}`;
  const canonicalUrl = fullUrl.replace(/\/$/, ''); // Remove trailing slash

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update or create link tags
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      
      element.setAttribute('href', href);
    };

    // Standard meta tags
    updateMetaTag('description', fullDescription);
    updateMetaTag('author', developerInfo.name);
    
    // Canonical URL
    updateLinkTag('canonical', canonicalUrl);
    
    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', fullDescription, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', fullTitle, true);
    updateMetaTag('og:site_name', developerInfo.name, true);
    updateMetaTag('og:locale', 'en_US', true);
    
    // Article-specific OG tags
    if (type === 'article' && article) {
      if (article.publishedTime) {
        updateMetaTag('article:published_time', article.publishedTime, true);
      }
      if (article.modifiedTime) {
        updateMetaTag('article:modified_time', article.modifiedTime, true);
      }
      if (article.author) {
        updateMetaTag('article:author', article.author, true);
      }
      if (article.tags) {
        article.tags.forEach((tag, index) => {
          updateMetaTag(`article:tag:${index}`, tag, true);
        });
      }
    }
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@vinit_sahare');
    updateMetaTag('twitter:creator', '@vinit_sahare');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', fullDescription);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:image:alt', fullTitle);

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('googlebot', 'index, follow');
    
    // Structured Data (JSON-LD)
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    
    if (structuredData) {
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(structuredDataScript);
      }
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else if (structuredDataScript) {
      structuredDataScript.remove();
    }

  }, [fullTitle, fullDescription, canonicalUrl, image, type, article, structuredData]);

  return null;
}