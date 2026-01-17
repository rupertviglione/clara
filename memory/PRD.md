# clara. Website Redesign PRD

## Project Overview
Complete redesign of the clara. digital presence website with brutalist editorial aesthetic inspired by Co-Star astrology app.

## Original Problem Statement
Improve the clara. website with:
1. Visual/UI enhancements - brutalist editorial style inspired by Co-Star
2. SEO fixes - missing meta tags, structured data
3. Performance improvements - file optimization
4. Mobile responsiveness enhancements

## User Personas
- **Primary**: Business owners in Portugal seeking clear digital presence
- **Secondary**: Design-conscious professionals looking for web services

## Core Requirements (Static)
- [x] Brutalist editorial design (black/white, stark contrast)
- [x] JetBrains Mono typography, lowercase aesthetic
- [x] Editorial grid layouts on desktop
- [x] Mobile-first responsive design
- [x] Comprehensive SEO implementation
- [x] Performance optimization

## What's Been Implemented (Jan 17, 2025)

### Design Transformation
- Pure black/white color scheme (removed cream background)
- JetBrains Mono + Source Serif 4 typography
- Lowercase text throughout
- Editorial 2-column grid layout on desktop
- Smooth scroll reveal animations
- Brutalist card hover effects (shift + shadow)
- Page loader animation
- Grayscale → color hover on images/videos
- Custom scrollbar styling
- Subtle grain texture overlay

### SEO Fixes
- Complete meta tags on all pages (description, keywords, robots)
- Open Graph tags for social sharing
- Twitter Card meta tags
- Canonical URLs
- Structured data (JSON-LD) for business and contact pages
- robots.txt file
- sitemap.xml file
- Proper aria labels and semantic HTML

### Performance
- Preconnect hints for fonts
- Lazy loading for images and videos
- IntersectionObserver for scroll animations
- Reduced motion support
- AVIF/WebP image fallbacks maintained

### Mobile Responsiveness
- Hamburger menu with smooth slide animation
- Full-screen mobile navigation
- Touch-friendly button sizes
- Proper viewport handling

### Pages Updated
1. `/index.html` - Homepage
2. `/presenca-digital/index.html` - Digital presence page
3. `/metodo/index.html` - Method page
4. `/trabalhos/index.html` - Portfolio/work page
5. `/contacto/index.html` - Contact page

## Tech Stack
- Static HTML/CSS/JS
- No build tools required
- Served via React public folder

## Prioritized Backlog

### P0 (Done)
- [x] Brutalist design implementation
- [x] SEO meta tags
- [x] Mobile menu functionality
- [x] Modal overlays fixed

### P1 (Future)
- [ ] Video file compression (current: 12MB + 9.5MB webm files)
- [ ] Create OG image asset for social sharing
- [ ] Add more portfolio work items

### P2 (Nice to Have)
- [ ] Dark mode toggle
- [ ] Cookie consent banner
- [ ] Analytics integration
- [ ] Form submission success page
- [ ] 404 page design

## Next Tasks
1. Compress video files for faster loading
2. Create proper OG image asset
3. Add Google Analytics or privacy-friendly alternative
