# THE LAST DOOR (V2 — EXTREME CINEMATIC PSYCHOLOGICAL HORROR)
> **You can leave whenever you want. But something may remember that you were here.**

An adaptive, cinematic psychological-horror web experience designed as an interactive horror film running inside a browser.

---

## 🩸 What's New in Version 2

### 1. New Blood-Red Visual Horror Identity
- **Restrained Blood-Red Palette**: Deep Black (`#050505`), Charcoal (`#101010`), Blood Red (`#760909`), Dark Crimson (`#A20D19`), Dried Blood (`#430609`), Pale Ghost White (`#D8D6D2`), Cold Grey (`#777777`), and Faint Supernatural Red (`#B51F2B`).
- **Occult Markings & Distortions**: Blood-red scratches, wall breathing pulse, dynamic corrupted runes, and peripheral blood vignette rims.

### 2. Completely Redesigned 7-Scene Opening
1. **Complete Darkness**: 2s silence, distant breathing, tiny expanding blood-red dot.
2. **First Warning**: Blood-red flickering text: *"YOU SHOULD NOT HAVE OPENED THIS."*
3. **Second Message**: *"IT KNOWS YOU ARE HERE."* with a shadow passing behind the text and heavy audio impact.
4. **Third Message**: *"DO NOT TRUST WHAT YOU SEE."* with a 0.38s horrifying jump-scare visage flash!
5. **Corrupted Signal**: `ARCHIVE RECOVERED`, `UNKNOWN PRESENCE DETECTED`, and backward-jittering timestamp `03:17:42`.
6. **The Final Warning**: *"IT HAS BEEN WAITING."*, towering female silhouette, and choices `ENTER THE HOUSE` vs `LEAVE`.
7. **Transition**: Screen black, heavy wooden door latch, flashlight slowly illuminating the porch.
- **Skip Intro Option**: Accessible via discreet `[SKIP INTRO]` button.

### 3. Expanded Supernatural Entity System (21 Entities)
- **Female Supernatural Entities**:
  - *The Banshee*: Dishevelled hair, sunken hollow eyes, screeching corridor manifestations.
  - *The Weeping Bride*: Decayed 1920s lace wedding gown, unnatural neck angle, corner sobbing.
  - *The Widow*: Tall motionless black mourning gown, manifests in portrait frames and reflections.
  - *The Crone / Hag*: Ancient withered visage with milky dead eyes and a sinister ear-to-ear grin.
  - *The Hollow Woman*: Skeletal porcelain-pale figure advancing when flashlight looks away.
  - *The She-Devil*: Dark humanoid demon with burning crimson ocular glints.
- **Other Documented Supernatural Entities**:
  - *The Tall One*, *The Wall Breather*, *The Wraith*, *The Specter*, *The Fiend*, *The Ghoul*, *The Shadow Child*, *The Faceless Visitor*, *The Mirror Double*, *The Corridor Watcher*, *The Crawling Spirit*, *The Red-Eyed Visitor*, *The Pale Nun*, *The Possessed Doll*, and *The Doorway Entity*.

### 4. Sudden Face Encounters (Transition Encounters)
- Unpredictable threshold encounters: approaching doorways occasionally triggers an extreme close-up face reveal for 0.5s accompanied by sharp audio stingers, cutting immediately to black.

### 5. Overhauled Psychological Audio Engine
- **Web Audio API Synthesizers**: Procedural 40Hz sub-bass, binaural respiration, rain simulator, door latch transients, resonant 1.0s clock ticks, heavy sub impacts, and glitch bursts.
- **Directional Spatial Audio**: Banshee screams, ghost whispers, and demonic growls pan across headphones from left, right, or behind.
- **Psychoacoustic Silence Dropouts**: Sudden cut of all ambient noise to build suffocating anticipation before supernatural events.
- **Functional Master Controls**: Working volume slider, instant mute, and pause/resume modal.

### 6. Hostile Environment & Reactive Visuals
- **Stalker Mouse Behavior**: Figures in the Parlor's family portrait subtly track cursor coordinates with their eyes.
- **Peripheral Vision Anomalies**: Shadows lurking in screen corners that immediately vanish when flashlight points toward them.
- **Dynamic Text Corruption**: Subtitles and inscriptions occasionally flicker into corrupted occult glyphs.
- **Flashlight Vulnerability**: Temporary flashlight flickering and blackout outages under peak tension.

---

## 🛠️ Development & Production

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run automated Vitest test suite
npm run test

# Compile TypeScript and build production bundle
npm run build
```

---

## ⚡ Deployment
Configured for instant zero-config deployment to **Vercel** (`vercel.json`), **Netlify**, or any static host.
- Production bundle size: **~115 kB gzipped**
- 100% self-contained Web Audio synthesis & procedural SVG rendering
