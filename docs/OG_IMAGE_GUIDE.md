# Open Graph Image Guide

## Overview
Open Graph (OG) images are the preview images that appear when your portfolio is shared on social media platforms like LinkedIn, Twitter, Facebook, and Slack.

## Image Specifications

### Recommended Dimensions
- **Size**: 1200 x 630 pixels
- **Aspect Ratio**: 1.91:1
- **Format**: JPG or PNG
- **File Size**: Under 1 MB (ideally under 300 KB)
- **Color Space**: RGB

### Platform-Specific Requirements

**LinkedIn:**
- Minimum: 1200 x 627 pixels
- Maximum: 5 MB
- Recommended: 1200 x 630 pixels

**Twitter:**
- Minimum: 600 x 314 pixels
- Maximum: 5 MB
- Recommended: 1200 x 675 pixels (for large card)

**Facebook:**
- Minimum: 600 x 315 pixels
- Maximum: 8 MB
- Recommended: 1200 x 630 pixels

## Design Guidelines

### Content to Include

1. **Your Name** - Large, prominent
2. **Title/Role** - "Java Full Stack Developer"
3. **Key Skills** - 3-5 main technologies
4. **Visual Elements** - Code snippets, icons, or abstract tech graphics
5. **Branding** - Consistent colors with your portfolio

### Design Tips

**Typography:**
- Use large, bold fonts (minimum 60px for main text)
- Ensure text is readable at small sizes
- High contrast between text and background
- Avoid thin fonts

**Colors:**
- Use your brand colors (emerald green from portfolio)
- High contrast for readability
- Dark background with light text works well
- Avoid pure white backgrounds (use off-white)

**Layout:**
- Keep important content in the center
- Leave margins (safe zone: 100px from edges)
- Balance text and visual elements
- Don't overcrowd the image

**Visual Elements:**
- Use icons for technologies
- Include subtle code snippets
- Add geometric shapes for interest
- Maintain professional appearance

## Creating OG Images

### Option 1: Design Tools

**Canva (Easiest):**
1. Go to Canva.com
2. Create custom size: 1200 x 630 px
3. Use templates or start from scratch
4. Add your name, title, skills
5. Download as JPG or PNG

**Figma (Professional):**
1. Create frame: 1200 x 630 px
2. Design with your brand colors
3. Add text and graphics
4. Export as PNG or JPG

**Photoshop/GIMP:**
1. New document: 1200 x 630 px, 72 DPI
2. Design your image
3. Save for web (optimized)

### Option 2: Online Generators

**OG Image Generator:**
- https://og-image.vercel.app/
- Customizable templates
- Code-based generation

**Social Image Generator:**
- https://www.bannerbear.com/
- API-based generation
- Dynamic images

### Option 3: Code-Based (Advanced)

Use libraries like:
- `@vercel/og` - Generate images with React
- `node-canvas` - Generate with Node.js
- `puppeteer` - Screenshot HTML

## Example Design

```
┌─────────────────────────────────────────────────┐
│                                                 │
│                                                 │
│         VINIT SAHARE                           │
│         Java Full Stack Developer              │
│                                                 │
│         ⚛️ React  ☕ Java  🐘 PostgreSQL       │
│         🐳 Docker  🔧 Spring Boot              │
│                                                 │
│         [Subtle code snippet or pattern]       │
│                                                 │
└─────────────────────────────────────────────────┘
```

## File Placement

Save your OG image as:
```
public/og-image.jpg
```

The SEO component will automatically use it:
```typescript
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
```

## Page-Specific OG Images

### Home Page
- Your name and title
- Main skills
- Professional photo (optional)

### Blog Posts
- Article title
- Category badge
- Reading time
- Your name

### Projects
- Project name
- Technologies used
- Screenshot or mockup

### Dynamic Generation

For blog posts, consider generating unique OG images:

```typescript
// In BlogPost component
<SEOHead
  title={article.title}
  image={`${SITE_URL}/og-images/blog/${article.slug}.jpg`}
/>
```

## Testing OG Images

### Social Media Debuggers

**LinkedIn Post Inspector:**
- https://www.linkedin.com/post-inspector/
- Paste your URL
- See preview
- Clear cache if needed

**Twitter Card Validator:**
- https://cards-dev.twitter.com/validator
- Paste your URL
- View card preview

**Facebook Sharing Debugger:**
- https://developers.facebook.com/tools/debug/
- Paste your URL
- See preview
- Scrape again to refresh

**Open Graph Check:**
- https://www.opengraph.xyz/
- Test multiple platforms at once

### Local Testing

1. **Browser DevTools:**
   - View page source
   - Check `<meta property="og:image">` tag
   - Verify image URL is correct

2. **Image Accessibility:**
   - Open image URL directly
   - Ensure it loads correctly
   - Check file size

3. **Responsive Check:**
   - View on mobile
   - Check image scales properly

## Optimization

### File Size Reduction

**Online Tools:**
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/
- ImageOptim (Mac): https://imageoptim.com/

**Command Line:**
```bash
# Using ImageMagick
convert og-image.png -quality 85 og-image.jpg

# Using cwebp
cwebp -q 85 og-image.png -o og-image.webp
```

### Best Practices

1. **Optimize before uploading**
   - Compress images
   - Remove metadata
   - Use appropriate format

2. **Use CDN**
   - Faster loading
   - Better caching
   - Global distribution

3. **Cache headers**
   - Set long cache times
   - Use versioning for updates

## Troubleshooting

### Image Not Showing

1. **Check URL**
   - Verify image path is correct
   - Ensure image is publicly accessible
   - Test URL in browser

2. **Clear Cache**
   - Use social media debuggers
   - Force re-scrape
   - Wait 24 hours for natural refresh

3. **Check Meta Tags**
   - Verify og:image tag exists
   - Check for typos
   - Ensure proper format

### Image Looks Wrong

1. **Dimensions**
   - Verify 1200 x 630 pixels
   - Check aspect ratio
   - Resize if needed

2. **File Size**
   - Ensure under 1 MB
   - Compress if too large
   - Check platform limits

3. **Format**
   - Use JPG or PNG
   - Avoid GIF for OG images
   - Check color space (RGB)

## Maintenance

### Regular Updates

**When to Update:**
- Rebranding or design changes
- New major skills added
- Title or role changes
- Significant portfolio updates

**How Often:**
- Review quarterly
- Update as needed
- Keep consistent with site design

### Version Control

Keep multiple versions:
```
public/
  og-image.jpg          # Current
  og-image-v1.jpg       # Previous version
  og-image-blog.jpg     # Blog template
  og-image-project.jpg  # Project template
```

## Resources

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Guide](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [OG Image Examples](https://www.opengraph.xyz/gallery)

---

**Status**: Guide complete
**Next Step**: Create your OG image and place in `public/og-image.jpg`
