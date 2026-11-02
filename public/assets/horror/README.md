# THE LAST DOOR — Horror Visual Asset Pipeline

Welcome to the automated and extensible visual horror asset repository.

## 📁 Folder Organization

You can drop your own downloaded assets into any of the following folders:

```text
public/assets/horror/
├── creatures/           # Monsters, crawler animations, hallway runners (.webp, .webm, .gif)
├── ghosts/              # Floating apparitions, phantoms, translucent spirits
├── demons/              # Horned entities, shadow demons, towering stalkers
├── female-entities/     # Weeping brides, hags, widows, pale women
├── face-encounters/     # Sudden face reveal jumpscares, screaming visages
├── environments/        # Moving room backgrounds, Victorian hallways, rain
├── fog-smoke/           # Seamless looping mist, rolling fog, rising smoke
├── shadows/             # Moving claw shadows, wall breathing pulses
├── paranormal-effects/  # Blinking red eyes, floating objects, reflections
├── glitch-effects/      # VHS static camera noise, blood drips, CRT scanlines
├── particles/           # Flashlight dust motes, embers, floating ash
├── animations/          # Lottie JSON vector animations, sigils, pentagrams
├── textures/            # Blood splatters, peeling wallpaper, grunge overlays
└── audio/               # Custom stingers and sound effects
```

---

## 🚀 How to Add and Use Your Own Animations

1. **Download your animation** (WebM with alpha transparency, animated WebP, MP4 video loop, GIF, or Lottie JSON).
2. **Move or copy the file** into its matching folder above (e.g. `public/assets/horror/ghosts/my-new-ghost.webm`).
3. **Open `src/engine/assetRegistry.ts`** and register it in `HORROR_ASSETS`:

```typescript
'my_new_ghost': {
  id: 'my_new_ghost',
  name: 'My Custom Ghost Apparition',
  category: 'ghosts',
  path: '/assets/horror/ghosts/my-new-ghost.webm',
  type: 'video', // or 'animated-webp', 'gif', 'animated-svg', 'lottie'
  blendMode: 'screen', // 'screen', 'lighten', 'normal', 'multiply'
  defaultOpacity: 0.9,
  loop: true,
  description: 'A custom ghost added to the experience.'
}
```

The application's **Horror Media System** (`<HorrorMedia />`) will automatically handle:
- HTML5 Video looping with fallback
- True transparent overlays
- Reduced-motion accessibility checks
- Pause/resume state synchronization
- Lazy-loading and graceful error fallbacks
