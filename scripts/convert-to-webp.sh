#!/bin/bash

# Image to WebP Conversion Script
# Converts all JPG, JPEG, and PNG images to WebP format
# Keeps original files for fallback

echo "🖼️  Image to WebP Converter"
echo "=========================="
echo ""

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ Error: cwebp is not installed"
    echo ""
    echo "Install instructions:"
    echo "  macOS:    brew install webp"
    echo "  Ubuntu:   sudo apt-get install webp"
    echo "  Windows:  Download from https://developers.google.com/speed/webp/download"
    echo ""
    exit 1
fi

# Default quality
QUALITY=85

# Check if directory argument is provided
if [ -z "$1" ]; then
    echo "Usage: ./convert-to-webp.sh <directory> [quality]"
    echo "Example: ./convert-to-webp.sh ./public/images 85"
    echo ""
    exit 1
fi

TARGET_DIR="$1"

# Check if quality argument is provided
if [ ! -z "$2" ]; then
    QUALITY="$2"
fi

echo "📁 Target directory: $TARGET_DIR"
echo "🎨 Quality: $QUALITY%"
echo ""

# Check if directory exists
if [ ! -d "$TARGET_DIR" ]; then
    echo "❌ Error: Directory '$TARGET_DIR' does not exist"
    exit 1
fi

# Counter for converted files
CONVERTED=0
SKIPPED=0

# Find and convert all image files
find "$TARGET_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read file; do
    # Get filename without extension
    filename="${file%.*}"
    webp_file="${filename}.webp"
    
    # Skip if WebP already exists
    if [ -f "$webp_file" ]; then
        echo "⏭️  Skipping (already exists): $(basename "$file")"
        ((SKIPPED++))
        continue
    fi
    
    echo "🔄 Converting: $(basename "$file")"
    
    # Convert to WebP
    if cwebp -q "$QUALITY" "$file" -o "$webp_file" > /dev/null 2>&1; then
        # Get file sizes
        original_size=$(du -h "$file" | cut -f1)
        webp_size=$(du -h "$webp_file" | cut -f1)
        
        echo "✅ Created: $(basename "$webp_file") ($original_size → $webp_size)"
        ((CONVERTED++))
    else
        echo "❌ Failed: $(basename "$file")"
    fi
    
    echo ""
done

echo "=========================="
echo "✨ Conversion complete!"
echo "   Converted: $CONVERTED files"
echo "   Skipped: $SKIPPED files"
echo ""
echo "💡 Tip: Keep original files for fallback support"
