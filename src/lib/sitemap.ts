/**
 * Sitemap generator for SEO
 * Generates sitemap.xml with all pages, projects, and blog posts
 */

import { articles } from '@/data/articles';
import { projects } from '@/data/projects';

const SITE_URL = 'https://vinitsahare.vercel.app';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Format date for sitemap (YYYY-MM-DD)
 */
function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

/**
 * Generate sitemap URL entry
 */
function generateUrlEntry(url: SitemapUrl): string {
  return `
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`;
}

/**
 * Get all static pages
 */
function getStaticPages(): SitemapUrl[] {
  const today = formatDate(new Date());
  
  return [
    {
      loc: SITE_URL,
      lastmod: today,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${SITE_URL}/portfolio`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${SITE_URL}/blog`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${SITE_URL}/certifications`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${SITE_URL}/about`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${SITE_URL}/contact`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.7
    }
  ];
}

/**
 * Get all project pages
 */
function getProjectPages(): SitemapUrl[] {
  return projects.map(project => ({
    loc: `${SITE_URL}/project/${project.slug}`,
    lastmod: formatDate(new Date()),
    changefreq: 'monthly' as const,
    priority: 0.8
  }));
}

/**
 * Get all blog post pages
 */
function getBlogPages(): SitemapUrl[] {
  return articles.map(article => ({
    loc: `${SITE_URL}/blog/${article.slug}`,
    lastmod: formatDate(article.publishedAt),
    changefreq: 'monthly' as const,
    priority: 0.8
  }));
}

/**
 * Generate complete sitemap XML
 */
export function generateSitemap(): string {
  const staticPages = getStaticPages();
  const projectPages = getProjectPages();
  const blogPages = getBlogPages();
  
  const allUrls = [...staticPages, ...projectPages, ...blogPages];
  const urlEntries = allUrls.map(generateUrlEntry).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${urlEntries}
</urlset>`;
}

/**
 * Get sitemap statistics
 */
export function getSitemapStats() {
  return {
    staticPages: getStaticPages().length,
    projectPages: getProjectPages().length,
    blogPages: getBlogPages().length,
    totalPages: getStaticPages().length + getProjectPages().length + getBlogPages().length
  };
}
