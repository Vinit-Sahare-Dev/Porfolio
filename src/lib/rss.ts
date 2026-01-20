/**
 * RSS Feed Generator
 * Generates RSS 2.0 feed for blog articles
 */

import { articles } from '@/data/articles';
import type { Article } from '@/data/articles';

const SITE_URL = 'https://vinitsahare.vercel.app';
const SITE_TITLE = 'Vinit Sahare - Blog';
const SITE_DESCRIPTION = 'Technical articles on web development, software architecture, and best practices';
const AUTHOR_NAME = 'Vinit Sahare';
const AUTHOR_EMAIL = 'vinitsahare.dev@gmail.com';

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
 * Convert article content to HTML
 */
function contentToHtml(content: string): string {
  const lines = content.split('\n');
  let html = '';
  let inCodeBlock = false;
  let codeLanguage = '';

  for (const line of lines) {
    const trimmed = line.trim();
    
    if (!trimmed) {
      html += '<br/>';
      continue;
    }

    // Code blocks
    if (trimmed.startsWith('```')) {
      if (!inCodeBlock) {
        codeLanguage = trimmed.slice(3).trim();
        html += `<pre><code class="language-${codeLanguage}">`;
        inCodeBlock = true;
      } else {
        html += '</code></pre>';
        inCodeBlock = false;
      }
      continue;
    }

    if (inCodeBlock) {
      html += escapeXml(line) + '\n';
      continue;
    }

    // Headers
    if (trimmed.startsWith('### ')) {
      html += `<h3>${escapeXml(trimmed.slice(4))}</h3>`;
    } else if (trimmed.startsWith('## ')) {
      html += `<h2>${escapeXml(trimmed.slice(3))}</h2>`;
    } else if (trimmed.startsWith('# ')) {
      html += `<h1>${escapeXml(trimmed.slice(2))}</h1>`;
    }
    // Lists
    else if (trimmed.startsWith('- ')) {
      html += `<li>${escapeXml(trimmed.slice(2))}</li>`;
    } else if (/^\d+\.\s/.test(trimmed)) {
      html += `<li>${escapeXml(trimmed.replace(/^\d+\.\s/, ''))}</li>`;
    }
    // Paragraphs
    else {
      html += `<p>${escapeXml(trimmed)}</p>`;
    }
  }

  return html;
}

/**
 * Generate RSS item for an article
 */
function generateRssItem(article: Article): string {
  const url = `${SITE_URL}/blog/${article.slug}`;
  const pubDate = new Date(article.publishedAt).toUTCString();
  const content = contentToHtml(article.content);

  return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(article.excerpt)}</description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
      <author>${AUTHOR_EMAIL} (${AUTHOR_NAME})</author>
      <category>${escapeXml(article.category)}</category>
      ${article.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`;
}

/**
 * Generate complete RSS feed
 */
export function generateRssFeed(): string {
  const sortedArticles = [...articles].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const lastBuildDate = sortedArticles.length > 0
    ? new Date(sortedArticles[0].publishedAt).toUTCString()
    : new Date().toUTCString();

  const items = sortedArticles.map(generateRssItem).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/favicon.svg</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${SITE_URL}/blog</link>
    </image>
    ${items}
  </channel>
</rss>`;
}

/**
 * Save RSS feed to public directory
 * Call this during build process
 */
export function saveRssFeed(): void {
  if (typeof window !== 'undefined') {
    console.warn('RSS feed generation should run at build time, not in browser');
    return;
  }

  const feed = generateRssFeed();
  console.log('RSS feed generated:', feed.length, 'bytes');
  
  // In a real build process, you would write this to public/rss.xml
  // For now, we'll just log it
  return;
}
