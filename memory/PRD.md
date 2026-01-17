# clara. Website Redesign PRD

## Project Overview
Complete redesign of the clara. digital presence website with brutalist editorial + tech-savvy aesthetic inspired by Co-Star astrology app.

## Original Problem Statement
Improve the clara. website with:
1. Visual/UI enhancements - brutalist editorial style inspired by Co-Star
2. SEO fixes - missing meta tags, structured data
3. Performance improvements - file optimization
4. Mobile responsiveness enhancements
5. More memorable/unique aesthetic with tech-savvy feeling
6. Social proof alternative (exclusivity messaging)
7. Image modal zoom functionality
8. Fixed DEPOIS iframe proportions

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
- [x] Tech-savvy elements (terminal, glitch, grid overlays)
- [x] Social proof via exclusivity messaging
- [x] Image modal with zoom controls
- [x] GitHub Pages compatible (static HTML)

## What's Been Implemented (Jan 17, 2025)

### Design Transformation V1
- Pure black/white color scheme
- JetBrains Mono + Source Serif 4 typography
- Lowercase text throughout
- Editorial 2-column grid layout on desktop
- Smooth scroll reveal animations
- Brutalist card hover effects
- Custom scrollbar styling

### Tech-Savvy Enhancements V2
- **Grid overlay**: Subtle background grid pattern
- **sys.init indicator**: Top-right status with pulsing dot
- **Blinking cursors**: Terminal-style cursors on section titles
- **Glitch hover effects**: Subtle text glitch on interactive elements
- **Loading bar**: Animated sweep loading indicator
- **Console easter egg**: Custom console message for developers
- **Grain texture overlay**: Subtle noise for depth

### Social Proof Alternative
- **Availability badge**: "aceitamos 2 projectos por mês" with red pulsing dot
- Creates exclusivity and trust without testimonials

### Modal Improvements
- **ANTES images**: Zoom controls (+, 1:1, −) with click-to-zoom
- **Pan functionality**: Drag to pan when zoomed
- **DEPOIS iframe**: Full 100% width/height proportions
- **Fixed close button**: Always visible and clickable

### SEO Fixes
- Complete meta tags on all pages
- Open Graph tags for social sharing
- Twitter Card meta tags
- Canonical URLs
- Structured data (JSON-LD)
- robots.txt and sitemap.xml

### Pages Updated
1. `/index.html` - Homepage with availability badge
2. `/presenca-digital/index.html`
3. `/metodo/index.html`
4. `/trabalhos/index.html`
5. `/contacto/index.html`

## Tech Stack
- Static HTML/CSS/JS
- No build tools required
- GitHub Pages compatible

## Prioritized Backlog

### P0 (Done)
- [x] Brutalist design implementation
- [x] SEO meta tags
- [x] Mobile menu functionality
- [x] Tech-savvy aesthetic elements
- [x] Zoom controls on modals
- [x] Availability badge
- [x] Fixed iframe proportions
- [x] Dark mode toggle with localStorage persistence

### P1 (Future)
- [ ] Video file compression (current: 12MB + 9.5MB webm files)
- [ ] Create OG image asset for social sharing

### P2 (Nice to Have)
- [ ] Cookie consent banner
- [ ] Analytics integration
- [ ] Form submission success page
- [ ] 404 page design

## Deployment Notes
**GitHub Pages**: Site is static HTML - deploy directly from `/frontend/public/` folder or copy files to repo root.
