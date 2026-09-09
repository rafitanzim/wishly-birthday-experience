# Wishly - Premium Interactive Birthday Experience

A beautifully designed, emotionally immersive mobile-first interactive birthday experience website.

When someone sends you a Wishly link, you open it and experience a cinematic sequence of scenes that tell a personalized story—memories, a heartfelt message, and a surprise—all crafted specifically for you.

## Features

✨ **7 Cinematic Scenes**
- The Mystery (intro)
- The Envelope (interactive reveal)
- Birthday Reveal (with hero photo)
- Memory Gallery (swipeable photo sequence)
- Personalized Letter (line-by-line reveal)
- Hidden Surprise (gift box, message, or photo)
- Final Moment (emotional closing)

🎧 **Audio Support**
- Optional background music with fade transitions
- Volume control and mute toggle
- Non-intrusive music UI

📱 **Mobile-First Design**
- Optimized for 390×844 viewport (iPhone/Android)
- Works beautifully on all screen sizes
- Touch-optimized interactions
- Respects `prefers-reduced-motion`

🎨 **Premium Aesthetics**
- Minimal, elegant dark theme
- Warm accent colors (rose/gold)
- Smooth animations and transitions
- Tactile, immersive interactions

⚡ **Performance Focused**
- Fast loading
- Smooth animations on mid-range devices
- Optimized images and assets
- Lightweight dependencies

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

```bash
git clone https://github.com/rafitanzim/wishly-birthday-experience.git
cd wishly-birthday-experience
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Customization

Edit the experience data in `src/config.js`:

```javascript
export const experienceConfig = {
  recipientName: 'Ayesha',
  senderName: 'Tanzim',
  message: 'Your personalized message here...',
  heroPhoto: 'https://...',
  memoryPhotos: [
    'https://...',
    'https://...',
    // ... more photos
  ],
  memoryCaptions: [
    'Caption 1',
    'Caption 2',
    // ... more captions
  ],
  music: 'https://...',
  theme: 'warm',
  surpriseType: 'gift', // 'gift', 'message', or 'photo'
  finalMessage: 'You deserve good things. ❤️'
}
```

## Architecture

```
src/
├── components/
│   ├── WishExperience.jsx       # Main orchestrator
│   ├── MusicController.jsx       # Audio management
│   ├── AmbientParticles.jsx      # Background animation
│   └── scenes/
│       ├── IntroScene.jsx
│       ├── EnvelopeScene.jsx
│       ├── BirthdayReveal.jsx
│       ├── MemoryScene.jsx
│       ├── LetterScene.jsx
│       ├── SurpriseScene.jsx
│       └── FinalScene.jsx
├── config.js                     # Configuration & data
├── App.jsx                       # Entry point
└── index.css                     # Global styles
```

## Keyboard Navigation (Dev Mode)

- `→` Next scene
- `←` Previous scene

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Tips

- Optimize images (compress, use appropriate dimensions)
- Keep message text concise for better pacing
- Use a single audio track (loop)
- Test on actual devices before sharing

## Accessibility

- Respects `prefers-reduced-motion` media query
- Keyboard navigation support
- Semantic HTML
- Sufficient color contrast
- Touch targets ≥ 44px

## License

MIT

## Author

Created with ❤️ for Wishly

---

**Make something like this for someone special today.**
