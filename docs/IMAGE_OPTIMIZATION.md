# Image Optimization Guide

## Overview
This portfolio now uses optimized image loading with:
- ✅ Lazy loading for below-the-fold images
- ✅ Blur placeholders during load
- ✅ WebP format with automatic fallback
- ✅ Preloading for critical images
- ✅ Responsive image loading

## Converting Images to WebP

### Using Online Tools
1. **Squoosh** (https://squoosh.app/)
   - Drag and drop your images
   - Select WebP format
   - Adjust quality (80-85% recommended)
   - Download optimized images

2. **CloudConvert** (https://cloudconvert.com/jpg-to-webp)
   - Batch convert multiple images
   - Free for up to 25 conversions/day

### Using Command Line

#### Install cwebp (WebP encoder)
```bash
# macOS
brew install webp

# Ubuntu/Debian
sudo apt-get install webp

# Windows
# Download from: https://developers.google.com/speed/webp/download
```

#### Convert Single Image
```bash
cwebp -q 85 input.jpg -o output.webp
```

#### Batch Convert All Images
```bash
# Convert all JPG/PNG in current directory
for file in *.{jpg,jpeg,png}; do
  cwebp -q 85 "$file" -o "${file%.*}.webp"
done
```

## Image Naming Convention

Keep both formats for automatic fallback:
```
profile-photo.jpg       # Original
profile-photo.webp      # WebP version

project-cover.png       # Original
project-cover.webp      # WebP version
```

The `OptimizedImage` component will automatically try WebP first and fallback to the original.

## Recommended Image Sizes

### Profile Images
- Desktop: 800x800px
- Mobile: 400x400px
- Quality: 85%

### Project Covers
- Desktop: 1200x800px (3:2 ratio)
- Tablet: 800x533px
- Mobile: 600x400px
- Quality: 80%

### Thumbnails
- Size: 400x300px
- Quality: 75%

## Performance Tips

1. **Compress before converting to WebP**
   - Use TinyPNG or ImageOptim first
   - Then convert to WebP

2. **Use appropriate quality settings**
   - Photos: 80-85%
   - Graphics/Screenshots: 85-90%
   - Icons: 90-95%

3. **Lazy load non-critical images**
   - Only set `priority={true}` for above-the-fold images
   - Profile photo and first 4 project cards are prioritized

4. **Generate blur placeholders**
   - Use dominant color from image
   - Or use the `generateBlurDataURL()` utility

## Usage in Components

```tsx
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { generateBlurDataURL } from '@/utils/imageOptimization';

<OptimizedImage
  src="/images/project.jpg"
  alt="Project screenshot"
  className="w-full h-64"
  blurDataURL={generateBlurDataURL('#6366f1')}
  priority={false}
  objectFit="cover"
/>
```

## Measuring Performance

### Before Optimization
- Check Lighthouse score
- Note "Largest Contentful Paint" (LCP)
- Check "Total Blocking Time" (TBT)

### After Optimization
- Run Lighthouse again
- LCP should improve by 20-40%
- Overall performance score should increase

### Tools
- Chrome DevTools > Lighthouse
- PageSpeed Insights: https://pagespeed.web.dev/
- WebPageTest: https://www.webpagetest.org/

## Expected Improvements

- **File Size**: 25-35% smaller with WebP
- **Load Time**: 30-50% faster initial load
- **LCP**: Improved by 0.5-1.5 seconds
- **User Experience**: Smooth loading with blur placeholders
