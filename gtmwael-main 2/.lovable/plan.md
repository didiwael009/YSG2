

## Replace Hero Portrait with Optimized WebP Image

The uploaded image is your hero portrait photo in WebP format (already optimized and lighter than the current PNG). This will fix both the missing hero image and the performance issue.

### Steps

1. Copy the uploaded WebP file to `src/assets/waelceo.png` (replacing the current broken/oversized version)
2. No code changes needed -- the existing `HeroSection.tsx` already imports from `@/assets/waelceo.png`

### Technical Notes
- The WebP format is significantly smaller than PNG, which directly addresses the 943KB LCP bottleneck flagged by PageSpeed
- The file will be copied over the existing asset path so all existing imports continue to work

