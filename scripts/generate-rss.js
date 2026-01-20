/**
 * Generate RSS feed at build time
 * Run with: node scripts/generate-rss.js
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import articles data
const articlesModule = await import('../src/data/articles.ts');
const articles = articlesModule.articles;

const SITE_URL = 'https://vinitsahare.vercel.app';
const SITE_TITLE = 'Vinit Sahare - Blog';
const SITE_DESCRIPTION = 'Technical articles on web development, software architecture, and best practices';
const AUTHOR_NAME = 'Vinit Sahare';
const AUTHOR_EMAIL = 'vinitsahare.dev@gmail.com';

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function contentToHtml(content) {
  const lines = content.split('\n');
  let html = '';
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    
    if (!trimmed) {
      html += '<br/>';
      continue;
    }

    if (trimmed.startsWith('```')) {
      if (!inCodeBlock) {
        html += '<pre><code>';
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

    if (trimmed.startsWith('### ')) {
      html += `<h3>${escapeXml(trimmed.slice(4))}</h3>`;
    } else if (trimmed.startsWith('## ')) {
      html += `<h2>${escapeXml(trimmed.slice(3))}</h2>`;
    } else if (trimmed.startsWith('# ')) {
      html += `<h1>${escapeXml(trimmed.slice(2))}</h1>`;
    } else if (trimmed.startsWith('- ')) {
      html += `<li>${escapeXml(trimmed.slice(2))}</li>`;
    } else {
      html += `<p>${escapeXml(trimmed)}</p>`;
    }
  }

  return html;
}

function generateRssItem(article) {
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

function generateRssFeed() {
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

// Generate and save RSS feed
try {
  const feed = generateRssFeed();
  const outputPath = join(__dirname, '../public/rss.xml');
  writeFileSync(outputPath, feed, 'utf-8');
  console.log('✅ RSS feed generated successfully:', outputPath);
  console.log(`📊 ${articles.length} articles included`);
} catch (error) {
  console.error('❌ Error generating RSS feed:', error);
  process.exit(1);
}
