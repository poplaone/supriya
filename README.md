# Supriya - Creative Portfolio Website

A stunning, performance-optimized React portfolio website featuring video backgrounds, photo galleries, and smooth animations.

## ✨ Features

- **Hero Section** - Full-screen video grid with clip-path effects
- **Photo Gallery** - Masonry grid, sliding carousel, and artistic layouts
- **About Space** - Elegant content presentation with music theme
- **Smooth Animations** - GSAP, Framer Motion, and Lenis scroll
- **Audio Experience** - Ambient background music with page-specific tracks
- **SEO Optimized** - React Helmet for meta tags and social sharing

## 🚀 Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.js          # Homepage hero with video grid
│   ├── PhotoPage.js     # Photo gallery with multiple layouts
│   ├── AboutSpace.js    # About page with music theme
│   ├── FeaturedProjects.js # Video showcase sections
│   ├── VideoSmart.jsx   # Optimized video component
│   ├── Navbar.js        # Navigation with mobile menu
│   ├── AudioContext.js  # Audio management
│   └── SEO.js           # Meta tag management
├── App.js               # Main app with routing
└── App.css              # Global styles
```

## ⚡ Performance Optimizations

### Video Loading
- **Lazy loading** for off-screen videos using Intersection Observer
- **Immediate loading** for hero section videos
- **GPU acceleration** for smooth playback

### Image Optimization
- Native `loading="lazy"` for all gallery images
- WebP format for smaller file sizes

### CSS Performance
- `content-visibility: auto` for off-screen sections
- `will-change` hints for animated elements
- `dvh` viewport units for mobile compatibility

### Core Web Vitals
- Preconnect hints for Google Fonts
- Optimized font loading with `display=swap`
- Smooth scroll behavior

## 🎥 VideoSmart Component

Optimized video component with lazy loading support:

```jsx
import VideoSmart from './components/VideoSmart';

// Immediate loading (for hero/above-fold)
<VideoSmart
  src="/assets/videos/hero.mp4"
  muted={true}
  loop={true}
/>

// Lazy loading (for below-fold content)
<VideoSmart
  src="/assets/videos/project.mp4"
  lazy={true}
  rootMargin="300px"
  muted={true}
  loop={true}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | required | Video file path |
| poster | string | - | Poster image path |
| lazy | boolean | false | Enable lazy loading |
| rootMargin | string | "200px" | Intersection observer margin |
| muted | boolean | true | Mute video |
| loop | boolean | true | Loop video |
| controls | boolean | false | Show controls |

## 🎨 Video Encoding Guidelines

For optimal performance:

- **Format**: H.264/AAC MP4
- **Frame Rate**: 24-30 fps
- **Resolution**: 720p for backgrounds, 1080p for features
- **Bitrate**: 1-3 Mbps
- **Duration**: 2-6 seconds for loops
- **Enable**: MP4 faststart for quick poster display

## 📱 Responsive Design

- Desktop: Full video grid with clip-path effects
- Tablet: Simplified grid layout
- Mobile: Single video with dynamic viewport height (`dvh`)

## 🛠️ Tech Stack

- **React 19** - UI framework
- **React Router 7** - Client-side routing
- **Framer Motion** - Animations
- **GSAP** - Advanced animations
- **Lenis** - Smooth scroll
- **React Helmet Async** - SEO management

## 📄 License

Private project.
