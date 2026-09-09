# Component API Reference

## WishExperience

Main container component that orchestrates all scenes and manages state.

### Props
None (uses config from `config.js`)

### State
- `currentScene` (number): 0-6, current scene index
- `audioEnabled` (boolean): whether audio playback has started
- `audioContext` (AudioContext): Web Audio API context
- `isPlaying` (boolean): whether music is currently playing
- `volume` (number): 0-1 volume level

### Methods
- `goToNextScene()`: Advance to next scene
- `goToPreviousScene()`: Go back to previous scene
- `handleAudioRequest()`: Initialize audio context

---

## Scene Components

### IntroScene
The opening scene with text sequence and headphones prompt.

**Props:**
```javascript
{
  config: experienceConfig,
  onNext: () => void,
  onAudioRequest: () => void,
  audioEnabled: boolean
}
```

**Stages:**
1. "hey..." appears (500ms delay)
2. "someone made something for you." fades in (2000ms)
3. "but first..." appears (3500ms)
4. Headphones prompt shows (4000ms)
5. "I'm ready" button triggers audio and next scene

---

### EnvelopeScene
Interactive envelope opening animation.

**Props:**
```javascript
{
  config: experienceConfig,
  onNext: () => void
}
```

**Interactions:**
- Click/tap envelope to open
- Envelope flips and fades
- Letter rises from inside
- Auto-advances after 2.5s of envelope open

---

### BirthdayReveal
Hero photo reveal with title and subtext.

**Props:**
```javascript
{
  config: experienceConfig,
  onNext: () => void
}
```

**Features:**
- Title slides down (300ms delay)
- Photo fades in with blur effect (1500ms)
- Blur animates to focus (3000ms)
- Subtext reveals (4500ms)
- Button appears (6000ms)

---

### MemoryScene
Photo gallery with navigation and captions.

**Props:**
```javascript
{
  config: experienceConfig,
  onNext: () => void
}
```

**Features:**
- Swipeable or button-based navigation
- Photo counter (1/4, etc.)
- Optional captions
- Last photo has continue button instead of next
- Fallback for missing photos

**Controls:**
- Left button: Previous photo
- Right button: Next photo or continue
- Counter: Current progress

---

### LetterScene
Line-by-line or paragraph-by-paragraph message reveal.

**Props:**
```javascript
{
  config: experienceConfig,
  onNext: () => void
}
```

**Features:**
- Paragraphs separated by `\n\n` in config message
- Each paragraph reveals sequentially
- Fade-in and slide-up animation
- Scrollable if message is long
- Button appears after all text reveals

**Timing:**
- First paragraph: 800ms
- Subsequent paragraphs: 1200ms between each

---

### SurpriseScene
Hidden surprise reveal (gift, message, or photo).

**Props:**
```javascript
{
  config: experienceConfig,
  onNext: () => void
}
```

**Stages:**
1. "Wait..." appears (500ms)
2. "I almost forgot one thing." fades in (2000ms)
3. Surprise element appears based on `surpriseType`

**SurpriseTypes:**

**gift:**
- Minimal gift box with ribbon
- Click to trigger particle explosion
- Auto-advances to final scene

**message:**
- Heart emoji floats
- "One last secret" text
- "Reveal →" button
- Shows custom message on click

**photo:**
- First memory photo appears
- "This one." caption
- Click to advance

---

### FinalScene
Emotional closing moment with branding and CTA.

**Props:**
```javascript
{
  config: experienceConfig,
  onNext: () => void
}
```

**Stages:**
1. "Happy Birthday, [NAME]." (500ms)
2. "I hope you remember this year." (2500ms)
3. Final message from config (4500ms)
4. "made with wishly" branding (7000ms)
5. CTA button appears

**CTA:**
- Links to Wishly creator (configurable)
- Subtle styling
- Encourages viral sharing

---

## Utility Components

### MusicController
Audio playback controls.

**Props:**
```javascript
{
  musicUrl: string,
  isPlaying: boolean,
  onPlayPause: () => void,
  volume: number,          // 0-1
  onVolumeChange: (v: number) => void
}
```

**Features:**
- Top-right fixed position
- Play/pause button
- Volume slider (hidden by default)
- Mute toggle
- Auto-loop on end

---

### AmbientParticles
Background particle animation.

**Props:**
```javascript
{
  theme: string  // 'warm', 'cool', 'neutral'
}
```

**Features:**
- Canvas-based particle system
- ~20 particles
- Subtle opacity pulsing
- Wraps around screen edges
- Performance optimized

---

## Config Object

```javascript
{
  recipientName: string,           // Person receiving the gift
  senderName: string,              // (optional) Your name
  message: string,                 // Main personal message
  heroPhoto: string,               // URL to main photo (~500x600px)
  memoryPhotos: string[],          // Array of photo URLs
  memoryCaptions: string[],        // Optional captions for photos
  music: string,                   // URL to background music (optional)
  theme: 'warm' | 'cool' | 'neutral',  // Color theme
  surpriseType: 'gift' | 'message' | 'photo',  // Type of surprise
  finalMessage: string             // Closing message
}
```

## Color Palette

```javascript
{
  dark: '#0a0a0a',                 // Main background
  charcoal: '#1a1a1a',             // Secondary background
  text: '#f5f5f5',                 // Primary text
  muted: '#a8a8a8',                // Secondary text
  accent: '#d4a5a5',               // Primary accent (rose)
  accentDark: '#b08888',           // Darker accent
  gold: '#c9a876',                 // Secondary accent
  subtle: 'rgba(245, 245, 245, 0.1)' // Subtle overlays
}
```

---

## Hook Usage

### useEffect for Timing

```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    setShowText(true)
  }, 1500)
  return () => clearTimeout(timer)
}, [])
```

### useRef for DOM Access

```javascript
const audioRef = useRef(null)

const play = () => {
  audioRef.current?.play()
}
```

---

## Animation Classes

Global animations defined in `src/index.css`:

- `fadeIn` - 0-100% opacity over 0.8s
- `fadeOut` - 100-0% opacity over 0.6s
- `slideUp` - Translate up + fade in
- `slideDown` - Translate down + fade in
- `scale` - Scale from 0.95 to 1 + fade in
- `floatParticle` - Subtle Y translation + opacity pulse
- `subtleGlow` - Opacity pulse 0.3-0.6
- `rotateSlow` - 360° rotation over 2s

Usage:
```css
.element {
  animation: fadeIn 0.6s ease-out;
}
```

---

## Media Queries

Responsive breakpoints:

```css
/* Desktop (default) */
/* ... */

/* Tablet */
@media (max-width: 768px) {
  /* Adjust layouts */
}

/* Mobile */
@media (max-width: 480px) {
  /* Compact layouts */
  /* Larger touch targets */
  /* Smaller text sizes */
}
```

Primary target: **390px width** (iPhone 12-13)

---

## Accessibility Features

### Keyboard Navigation

```javascript
useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key === 'ArrowRight') goToNextScene()
    if (e.key === 'ArrowLeft') goToPreviousScene()
  }
  window.addEventListener('keydown', handleKeyPress)
  return () => window.removeEventListener('keydown', handleKeyPress)
}, [])
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### ARIA Labels

```jsx
<button
  onClick={handleNext}
  aria-label="Next photo"
>
  →
</button>
```

---

## Performance Tips

1. **Image Optimization**
   - Use JPEG for photos (better compression)
   - Resize to max 600px width
   - Use image CDN (Cloudinary, Imgix)
   - Lazy-load memory photos

2. **Animation Optimization**
   - Prefer CSS over JavaScript
   - Use `will-change: transform`
   - Avoid animating expensive properties (width, height)
   - Test on actual devices

3. **Asset Optimization**
   - Minify CSS and JavaScript
   - Compress audio (MP3 at 128kbps)
   - Lazy-load non-critical assets
   - Use service workers for caching

---

**Last updated:** 2024
