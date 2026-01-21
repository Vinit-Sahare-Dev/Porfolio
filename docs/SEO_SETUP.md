# SEO & Meta Tags Setup Guide

## Overview
Comprehensive SEO implementation with Open Graph images, dynamic meta tags, structured data (JSON-LD), and automatic sitemap generation.

## Features Implemented

✅ **Enhanced Meta Tags** - Dynamic per-page meta descriptions
✅ **Open Graph Tags** - Social media preview optimization
✅ **Twitter Cards** - Twitter-specific meta tags
✅ **Structured Data** - JSON-LD for rich search results
✅ **Automatic Sitemap** - Generated during build
✅ **Canonical URLs** - Prevent duplicate content
✅ **Robots.txt** - Search engine directives

## Meta Tags

### Standard Meta Tags

Every page includes:
- `<title>` - Unique page title
- `<meta name="description">` - Page description
- `<meta name="author">` - Author name
- `<meta name="robots">` - Indexing directives
- `<link rel="canonical">` - Canonical URL

### Open Graph Tags

For social media sharing:
- `og:title` - Page title
- `og:description` - Page description
- `og:type` - Content type (website, article, profile)
- `og:url` - Canonical URL
- `og:image` - Preview image (1200x630px)
- `og:image:width` - Image width
- `og:image:height` - Image height
- `og:image:alt` - Image alt text
- `og:site_name` - Site name
- `og:locale` - Language locale

### Article-Specific Tags

For blog posts:
- `article:published_time` - Publication date
- `article:modified_time` - Last modified date
- `article:author` - Author name
- `article:tag` - Article tags

### Twitter Card Tags

For Twitter sharing:
- `twitter:card` - Card type (summary_large_image)
- `twitter:site` - Site Twitter handle
- `twitter:creator` - Creator Twitter handle
- `twitter:title` - Tweet title
- `twitter:description` - Tweet description
- `twitter:image` - Preview image
- `twitter:image:alt` - Image alt text

## Structured Data (JSON-LD)

### Person Schema (Home Page)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Vinit Sahare",
  "jobTitle": "Java Full Stack Developer",
  "url": "https://vinitsahare.vercel.app",
  "email": "vinitsahare.dev@gmail.com",
  "sameAs": [
    "https://github.com/Vinit-Sahare-Dev",
    "https://linkedin.com/in/vinit-sahare"
  ]
}
```

### BlogPosting Schema (Blog Posts)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "description": "Article excerpt",
  "datePublished": "2024-01-15",
  "author": {
    "@type": "Person",
    "name": "Vinit Sahare"
  }
}
```

### CreativeWork Schema (Projects)

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Project Name",
  "description": "Project description",
  "author": {
    "@type": "Person",
    "name": "Vinit Sahare"
  }
}
```

## Sitemap Generation

### Automatic Generation

Sitemap is generated during build:

```bash
npm run generate:sitemap
```

Or as part of the full build:

```bash
npm run build
# Runs: npm run generate:seo && vite build
# Which runs: npm run generate:rss && npm run generate:sitemap
```

### Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vinitsahare.vercel.app/</loc>
    <lastmod>2024-01-23</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- More URLs... -->
</urlset>
```

### Included Pages

**Static Pages:**
- Home (/)
- Portfolio (/portfolio)
- Blog (/blog)
- Certifications (/certifications)
- About (/about)
- Contact (/contact)

**Dynamic Pages:**
- All project pages (/project/[slug])
- All blog posts (/blog/[slug])

### Priority Levels

- **1.0** - Home page
- **0.9** - Portfolio, Blog listing
- **0.8** - Projects, Blog posts, Certifications, About
- **0.7** - Contact

### Change Frequency

- **Weekly** - Home, Portfolio, Blog listing
- **Monthly** - Projects, Blog posts, Other pages

## Open Graph Images

### Default Image

Location: `public/og-image.jpg`

Specifications:
- Size: 1200 x 630 pixels
- Format: JPG or PNG
- File size: Under 1 MB

### Creating OG Images

See [OG Image Guide](./OG_IMAGE_GUIDE.md) for detailed instructions.

**Quick Steps:**
1. Use Canva or Figma
2. Create 1200 x 630 px canvas
3. Add your name, title, skills
4. Export as JPG
5. Save to `public/og-image.jpg`

### Page-Specific Images

You can create unique images for different pages:

```typescript
<SEOHead
  title="Page Title"
  image={`${SITE_URL}/og-images/custom-image.jpg`}
/>
```

## Usage in Components

### Basic Usage

```typescript
import { SEOHead } from '@/components/seo/SEOHead';

<SEOHead
  title="Page Title"
  description="Page description"
/>
```

### With Structured Data

```typescript
import { SEOHead } from '@/components/seo/SEOHead';
import { generateBlogPostingSchema } from '@/lib/structuredData';

const structuredData = generateBlogPostingSchema(article);

<SEOHead
  title={article.title}
  description={article.excerpt}
  type="article"
  article={{
    publishedTime: article.publishedAt,
    tags: article.tags
  }}
  structuredData={structuredData}
/>
```

### Article Pages

```typescript
<SEOHead
  title="Article Title"
  description="Article excerpt"
  type="article"
  article={{
    publishedTime: "2024-01-15",
    modifiedTime: "2024-01-20",
    author: "Vinit Sahare",
    tags: ["React", "TypeScript"]
  }}
  structuredData={generateBlogPostingSchema(article)}
/>
```

## Testing SEO

### Meta Tags

1. **View Page Source:**
   - Right-click > View Page Source
   - Search for `<meta` tags
   - Verify all tags present

2. **Browser DevTools:**
   - Inspect > Head section
   - Check meta tags
   - Verify values correct

### Open Graph

**LinkedIn Post Inspector:**
```
https://www.linkedin.com/post-inspector/
```
- Paste your URL
- See preview
- Clear cache if needed

**Twitter Card Validator:**
```
https://cards-dev.twitter.com/validator
```
- Paste your URL
- View card preview
- Check image loads

**Facebook Sharing Debugger:**
```
https://developers.facebook.com/tools/debug/
```
- Paste your URL
- See preview
- Scrape again to refresh

**Open Graph Check:**
```
https://www.opengraph.xyz/
```
- Test multiple platforms
- See all OG tags
- Verify image

### Structured Data

**Google Rich Results Test:**
```
https://search.google.com/test/rich-results
```
- Paste URL or code
- See detected schema
- Fix any errors

**Schema Markup Validator:**
```
https://validator.schema.org/
```
- Validate JSON-LD
- Check for errors
- Verify structure

### Sitemap

**Google Search Console:**
1. Add property
2. Submit sitemap URL
3. Check coverage
4. Monitor errors

**XML Sitemap Validator:**
```
https://www.xml-sitemaps.com/validate-xml-sitemap.html
```
- Paste sitemap URL
- Validate format
- Check for errors

## Google Search Console Setup

### 1. Verify Ownership

**HTML File Method:**
1. Download verification file
2. Place in `public/` folder
3. Deploy
4. Click verify

**Meta Tag Method:**
1. Get verification meta tag
2. Add to `index.html` head
3. Deploy
4. Click verify

### 2. Submit Sitemap

1. Go to Sitemaps section
2. Enter: `sitemap.xml`
3. Click Submit
4. Wait for processing

### 3. Monitor Performance

- **Performance** - Search queries, clicks, impressions
- **Coverage** - Indexed pages, errors
- **Enhancements** - Structured data status
- **Mobile Usability** - Mobile issues

## SEO Best Practices

### Title Tags

- **Length**: 50-60 characters
- **Format**: `Page Title | Vinit Sahare`
- **Unique**: Every page different
- **Keywords**: Include relevant keywords
- **Branding**: Include your name

### Meta Descriptions

- **Length**: 150-160 characters
- **Compelling**: Encourage clicks
- **Unique**: Every page different
- **Keywords**: Include naturally
- **Call-to-action**: When appropriate

### Headings

- **H1**: One per page, main topic
- **H2-H6**: Hierarchical structure
- **Keywords**: Include naturally
- **Descriptive**: Clear and specific

### Images

- **Alt Text**: Descriptive, keyword-rich
- **File Names**: Descriptive, hyphenated
- **Optimization**: Compressed, WebP
- **Lazy Loading**: Below fold images

### Internal Linking

- **Descriptive Anchors**: Clear link text
- **Relevant Links**: Related content
- **Breadcrumbs**: Navigation trail
- **Footer Links**: Important pages

### Performance

- **Page Speed**: Fast loading times
- **Core Web Vitals**: LCP, FID, CLS
- **Mobile-Friendly**: Responsive design
- **HTTPS**: Secure connection

## Monitoring & Maintenance

### Weekly Tasks

- Check Google Search Console
- Monitor search rankings
- Review click-through rates
- Check for errors

### Monthly Tasks

- Update meta descriptions
- Refresh old content
- Add new structured data
- Check broken links

### Quarterly Tasks

- Audit all pages
- Update OG images
- Review keyword strategy
- Analyze competitors

## Troubleshooting

### Meta Tags Not Showing

1. **Check Implementation:**
   - View page source
   - Verify tags exist
   - Check for typos

2. **Clear Cache:**
   - Hard refresh browser
   - Clear CDN cache
   - Wait for propagation

3. **Validate HTML:**
   - Use W3C validator
   - Fix any errors
   - Redeploy

### OG Images Not Loading

1. **Check Image URL:**
   - Open directly in browser
   - Verify publicly accessible
   - Check file size

2. **Clear Social Cache:**
   - Use platform debuggers
   - Force re-scrape
   - Wait 24 hours

3. **Check Dimensions:**
   - Verify 1200 x 630 px
   - Check file format
   - Optimize if needed

### Structured Data Errors

1. **Validate JSON-LD:**
   - Use schema validator
   - Check syntax
   - Fix required fields

2. **Test in Google:**
   - Rich Results Test
   - Fix warnings
   - Resubmit

3. **Monitor Console:**
   - Check for errors
   - Review enhancements
   - Fix issues

## Resources

- [Google Search Central](https://developers.google.com/search)
- [Open Graph Protocol](https://ogp.me/)
- [Schema.org](https://schema.org/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)
- [Moz SEO Guide](https://moz.com/beginners-guide-to-seo)

---

**Status**: ✅ SEO system complete
**Next Step**: Create OG image and monitor Search Console
