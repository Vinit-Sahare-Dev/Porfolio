/**
 * Generate sitemap.xml at build time
 * Run with: node scripts/generate-sitemap.js
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import data
const articlesModule = await import('../src/data/articles.ts');
const projectsModule = await import('../src/data/projects.ts');

const articles = articlesModule.articles;
const projects = projectsModule.projects;

const SITE_URL = 'https://vinitsahare.vercel.app';

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

function generateUrlEntry(url) {
  return `
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`;
}

function getStaticPages() {
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

function getProjectPages() {
  return projects.map(project => ({
    loc: `${SITE_URL}/project/${project.slug}`,
    lastmod: formatDate(new Date()),
    changefreq: 'monthly',
    priority: 0.8
  }));
}

function getBlogPages() {
  return articles.map(article => ({
    loc: `${SITE_URL}/blog/${article.slug}`,
    lastmod: formatDate(article.publishedAt),
    changefreq: 'monthly',
    priority: 0.8
  }));
}

function generateSitemap() {
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

// Generate and save sitemap
try {
  const sitemap = generateSitemap();
  const outputPath = join(__dirname, '../public/sitemap.xml');
  writeFileSync(outputPath, sitemap, 'utf-8');
  
  const staticCount = getStaticPages().length;
  const projectCount = getProjectPages().length;
  const blogCount = getBlogPages().length;
  const totalCount = staticCount + projectCount + blogCount;
  
  console.log('✅ Sitemap generated successfully:', outputPath);
  console.log(`📊 Pages included:`);
  console.log(`   - Static pages: ${staticCount}`);
  console.log(`   - Project pages: ${projectCount}`);
  console.log(`   - Blog pages: ${blogCount}`);
  console.log(`   - Total: ${totalCount} URLs`);
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
