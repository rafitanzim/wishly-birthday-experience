# Wishly Birthday Experience - Complete Setup Guide

## Quick Start

```bash
# Clone the repository
git clone https://github.com/rafitanzim/wishly-birthday-experience.git
cd wishly-birthday-experience

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
wishly-birthday-experience/
├── src/
│   ├── components/
│   │   ├── WishExperience.jsx          # Main container & scene manager
│   │   ├── WishExperience.css
│   │   ├── MusicController.jsx         # Audio playback controls
│   │   ├── MusicController.css
│   │   ├── AmbientParticles.jsx        # Background particle animation
│   │   ├── AmbientParticles.css
│   │   └── scenes/
│   │       ├── IntroScene.jsx          # "hey... someone made something for you"
│   │       ├── IntroScene.css
│   │       ├── EnvelopeScene.jsx       # Interactive envelope opening
│   │       ├── EnvelopeScene.css
│   │       ├── BirthdayReveal.jsx      # Hero photo + title reveal
│   │       ├── BirthdayReveal.css
│   │       ├── MemoryScene.jsx         # Photo gallery with captions
│   │       ├── MemoryScene.css
│   │       ├── LetterScene.jsx         # Line-by-line message reveal
│   │       ├── LetterScene.css
│   │       ├── SurpriseScene.jsx       # Gift/message/photo reveal
│   │       ├── SurpriseScene.css
│   │       ├── FinalScene.jsx          # Closing moment + CTA
│   │       └── FinalScene.css
│   ├── config.js                       # Experience data & color palette
│   ├── App.jsx                         # Loading screen + root component
│   ├── App.css
│   ├── index.css                       # Global styles & animations
│   └── main.jsx                        # React entry point
├── index.html                          # HTML template
├── vite.config.js                      # Vite configuration
├── package.json                        # Dependencies
├── README.md                           # Overview
├── SETUP.md                            # This file
└── .gitignore
```

## Customization Guide

### 1. Edit Experience Data

Open `src/config.js` and update the `experienceConfig` object:

```javascript
export const experienceConfig = {
  recipientName: 'Sarah',                    // Birthday person's name
  senderName: 'Alex',                        // Your name (optional)
  message: `I don't say it enough, but...

You mean the world to me.

Happy birthday! 🎉`,
  heroPhoto: 'https://images.unsplash.com/...?w=500&h=600&fit=crop',  // Main photo
  memoryPhotos: [
    'https://images.unsplash.com/...?w=500&h=600&fit=crop',
    'https://images.unsplash.com/...?w=500&h=600&fit=crop',
    'https://images.unsplash.com/...?w=500&h=600&fit=crop',
  ],
  memoryCaptions: [
    'Summer of memories',
    'Just us',
    'Always laughing',
  ],
  music: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',  // Optional
  theme: 'warm',                             // 'warm', 'cool', 'neutral'
  surpriseType: 'gift',                      // 'gift', 'message', 'photo'
  finalMessage: 'You deserve good things. ❤️',
};
```

### 2. Update Colors

Customize the color palette in `src/config.js`:

```javascript
export const colors = {
  dark: '#0a0a0a',                  // Background
  charcoal: '#1a1a1a',              // Secondary bg
  text: '#f5f5f5',                  // Primary text
  muted: '#a8a8a8',                 // Muted text
  accent: '#d4a5a5',                // Primary accent (rose)
  accentDark: '#b08888',            // Darker accent
  gold: '#c9a876',                  // Secondary accent
  subtle: 'rgba(245, 245, 245, 0.1)' // Subtle overlays
};
```

### 3. Add Your Content

#### Photos
- Use high-quality images (min 500px width)
- JPG works best for smaller file sizes
- Test on mobile before deploying
- Hero photo: ~500x600px
- Memory photos: ~500x600px or square (600x600px)

#### Message
- Keep it personal and concise
- Use line breaks for paragraphs (`\n\n`)
- Max recommended: 300-400 words
- The experience reads 1 paragraph per ~1.2 seconds

#### Music
- MP3 format recommended
- Royalty-free music suggested
- Duration: 2-4 minutes
- Loop is automatic
- Music is optional (experience works without it)

### 4. Deployment

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Visit your URL
https://wishly-birthday-experience.vercel.app
```

#### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### GitHub Pages

1. Build the project: `npm run build`
2. Push the `dist` folder to a `gh-pages` branch
3. Enable GitHub Pages in repository settings

#### Self-Hosted

```bash
# Build
npm run build

# Upload the dist/ folder to your server
# Serve with any static hosting (nginx, Apache, etc.)
```

## Scene-by-Scene Breakdown

### Scene 1: The Mystery (IntroScene)
**What happens:**
- Subtle particles in background
- Text reveals in sequence: "hey..." → "someone made something for you." → "but first..."
- Headphones emoji prompt
- "I'm ready →" button triggers audio and advances scene

**Duration:** ~5-7 seconds

**Key Props:**
- `config.recipientName`
- Audio playback begins here

---

### Scene 2: The Envelope (EnvelopeScene)
**What happens:**
- Beautiful minimal envelope appears
- Text: "For [NAME]" and "Open me"
- Click to open → envelope flips and fades
- Glowing letter inside rises up
- Auto-advances after envelope fully opens

**Duration:** ~7-9 seconds

**Key Props:**
- `config.recipientName`

---

### Scene 3: Birthday Reveal (BirthdayReveal)
**What happens:**
- Large centered headline: "Happy Birthday, [NAME]"
- Hero photo fades in with blur-to-focus effect
- Subtext: "Today is yours."
- "Keep going →" button to continue

**Duration:** ~8-10 seconds

**Key Props:**
- `config.recipientName`
- `config.heroPhoto` (required for best effect)

---

### Scene 4: Memory Gallery (MemoryScene)
**What happens:**
- First memory photo appears
- Caption displays (optional)
- Left/right buttons for navigation
- Photo counter shows progress (1/4, etc.)
- Last photo → "→" becomes continue button
- Click advances to next scene

**Duration:** ~8-15 seconds (depends on photos)

**Key Props:**
- `config.memoryPhotos[]`
- `config.memoryCaptions[]`

**Fallback:**
- If no photos: shows "No memories shared" and auto-advances

---

### Scene 5: The Letter (LetterScene)
**What happens:**
- Heading: "Something I wanted to tell you"
- Message reveals paragraph by paragraph
- Each paragraph fades in and slides up
- Button appears after all text is revealed
- User scrolls if message is long

**Duration:** ~10-20 seconds (depends on message)

**Key Props:**
- `config.message`

**Tips:**
- Use `\n\n` to separate paragraphs
- Short paragraphs load faster
- Minimum 10-15 second read time recommended

---

### Scene 6: Hidden Surprise (SurpriseScene)
**What happens:**

**If `surpriseType: 'gift'`:**
- Text: "Wait..." → "I almost forgot one thing."
- Beautiful minimal gift box appears
- Click box to reveal
- Particle explosion animation
- Advances to final scene

**If `surpriseType: 'message'`:**
- Heart emoji floats
- "One last secret" text
- "Reveal →" button
- Shows hidden message on click

**If `surpriseType: 'photo'`:**
- Final photo from memory gallery appears
- "This one." caption
- Click to advance

**Duration:** ~5-8 seconds

**Key Props:**
- `config.surpriseType`
- `config.memoryPhotos[0]` (if photo type)

---

### Scene 7: Final Moment (FinalScene)
**What happens:**
- "Happy Birthday, [NAME]." text
- "I hope you remember this year." fades in
- Final custom message reveals
- Subtle "made with wishly" branding
- "Make something like this for someone →" CTA
- Beautiful, minimal closing

**Duration:** ~5-8 seconds

**Key Props:**
- `config.recipientName`
- `config.finalMessage`

---

## Animation & Timing Details

### Transition Timings

| Transition | Duration | Easing |
|---|---|---|
| Scene to scene fade | 0.6s | ease-out |
| Text reveal | 0.8s | ease-out |
| Photo fade in | 0.4s | ease-out |
| Envelope open | 0.6s | ease-out |
| Button hover | 0.3s | ease |
| Particle float | 2-3s | ease-in-out |

### Scene Flow Timing

```
Total Experience: 45-90 seconds

Scene 1: 3-5s  (intro)
Scene 2: 5-8s  (envelope)
Scene 3: 5-8s  (birthday reveal)
Scene 4: 8-15s (memories)
Scene 5: 10-20s (letter) ← longest
Scene 6: 5-10s (surprise)
Scene 7: 5-8s  (final)
```

## Mobile Optimization

### Viewport Target
- Primary: 390 × 844 (iPhone 12-13 size)
- Secondary: Any mobile (320-480px width)
- Desktop: Centered mobile-frame or wider cinematic

### Touch Targets
- All buttons: minimum 44×44px
- Safe area padding: 20px on sides
- No accidental scrolling (overflow hidden)

### Performance
- Image lazy-loading on memory photos
- Hero photo preload
- CSS animations preferred over JS
- No heavy frameworks (React + Vite only)
- ~50-100KB total JS

## Accessibility

### Features
- Respects `prefers-reduced-motion` (disables animations)
- Keyboard navigation (Arrow keys to move between scenes)
- Focus-visible states on all interactive elements
- ARIA labels on buttons
- Semantic HTML structure
- Sufficient color contrast (WCAG AA)

### Testing
- Test with screen readers (VoiceOver, NVDA)
- Test keyboard-only navigation
- Test with reduced motion enabled
- Test on various devices and browsers

## Troubleshooting

### Audio not playing
- Ensure music URL is accessible and CORS-enabled
- Check browser autoplay policy (requires user interaction first)
- Verify audio file format (MP3 recommended)

### Photos not loading
- Check image URLs (must be HTTPS in production)
- Verify CORS headers allow cross-origin access
- Test image sizes in browser dev tools

### Animations stuttering
- Close other browser tabs
- Reduce particle count in AmbientParticles.jsx
- Test on actual device (dev tools can be misleading)
- Check for heavy background processes

### Scenes not advancing
- Check browser console for errors
- Verify config.js has all required data
- Ensure onClick handlers are properly bound

### Layout issues on specific phone
- Test with exact device in dev tools
- Check safe area (notch/island) with `env(safe-area-inset-*)`
- Verify viewport meta tag is set correctly

## Sharing Your Experience

### Best Practices

1. **Test Thoroughly**
   - Test on actual iPhone and Android
   - Check all photos load
   - Verify message reads well
   - Test audio on both devices

2. **Timing**
   - Send at a meaningful moment
   - Consider time zones if recipient is abroad
   - Avoid during work hours unless appropriate

3. **Sharing**
   - Send via:
     - WhatsApp
     - Instagram DM
     - Email
     - Text message
   - Use a short URL (bit.ly, etc.)
   - Add a brief note: "Open this 💝"

4. **Recovery**
   - Share multiple delivery methods
   - Check it opens on their device
   - Have backup link ready

### Analytics

Optional: Add tracking (Google Analytics, Mixpanel):

```javascript
// In App.jsx
import { useEffect } from 'react'

useEffect(() => {
  window.gtag?.('config', 'G-XXXXXXXXXX')
}, [])
```

## Advanced Customization

### Change Accent Color

Edit `src/config.js`:

```javascript
export const colors = {
  // ...
  accent: '#7b68ee',     // Change to purple
  accentDark: '#6a5acd',
  // ...
}
```

### Modify Particle Behavior

Edit `src/components/AmbientParticles.jsx`:

```javascript
// Change particle count (line ~35)
for (let i = 0; i < 30; i++) {  // was 20
  particles.push(new Particle())
}

// Change particle size
this.size = Math.random() * 2 + 0.8  // was 1.5 + 0.5
```

### Add Custom Fonts

Edit `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;600;700&display=swap" rel="stylesheet">
```

Then update `src/index.css`:

```css
body {
  font-family: 'YourFont', sans-serif;
}
```

## Environment Variables

Create `.env.local`:

```
VITE_RECIPIENT_NAME=Sarah
VITE_SENDER_NAME=Alex
```

Access in config.js:

```javascript
recipientName: import.meta.env.VITE_RECIPIENT_NAME || 'there'
```

## Performance Metrics

Target metrics:
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 3s
- **Cumulative Layout Shift:** < 0.1
- **Time to Interactive:** < 3s

Measure with:
```bash
npm run build
npm run preview
# Then use Google Lighthouse in Chrome DevTools
```

## Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full support |
| Firefox | 88+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Edge | 90+ | ✅ Full support |
| Chrome Android | 90+ | ✅ Full support |
| Safari iOS | 14+ | ✅ Full support |

## Support & Issues

For bugs or feature requests:
1. Check existing GitHub issues
2. Provide:
   - Device/browser info
   - Steps to reproduce
   - Screenshots/video if possible
   - Config data (sanitized)

## License

MIT - Feel free to modify and share!

---

**Made with ❤️ for Wishly. Now go make someone's birthday unforgettable.**
