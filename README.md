# THE LAST DOOR (V1)
> **You can leave whenever you want. But something may remember that you were here.**

An adaptive, cinematic psychological-horror web experience designed as an interactive film running inside a browser.

---

## 🚪 Core Experience
- **Cinematic Opening**: Black screen, binaural breathing, signal scanline, `ARCHIVE RECOVERED`, real-time timestamp, `DO YOU WANT TO CONTINUE?`.
- **Restrained Caution Screen**: Minimal charcoal aesthetic, non-cookie design, intensity toggle (Mild / Standard / Intense), audio control, and immediate functional exit.
- **Flagship Story**: *The House That Breathes*
  1. *The Porch*: Rotted cedar planks, falling rain streaks, front door ajar 10cm revealing pitch black interior.
  2. *The Frozen Foyer*: Door clicks shut behind you, grandfather clock stopped at 03:17 with twitching second hand.
  3. *The Parlor & The Shifting Portrait*: Antique fireplace hearth and a 1924 silver-framed family portrait.
     - **The Memory Mechanic**: 3 people on Visit 1; on return visits, a 4th tall silhouette is standing behind them in the frame.
  4. *The Breathing Corridor*: Floral peeling wallpaper physically pulsating in sync with binaural breathing audio; silhouette of The Tall One in the distant doorframe.
     - **The Fork**: Meaningful choice between the Cellar stairs and the Upper Passage.
  5. *The Impossible Room*: Non-Euclidean geometry exceeding house blueprints; mortar inscribed "YOU ARE NOT THE FIRST."
- **Chilling Endings**: "THE DISCOVERY" & "THE CLOSURE", cataloguing relics and footprints into the persistent player archive.

---

## 🧠 Modular Horror Engines
- **Tension Director (`src/engine/tensionDirector.ts`)**: Dynamically controls lighting flickers, camera sway, heartbeat pacing (58–120 bpm), auditory exclusion, and encounter probabilities.
- **Anomaly Engine (`src/engine/anomalyEngine.ts`)**: Governs 5 curated psychological anomalies (`photoShift`, `wallBreathing`, `clockAnomaly`, `shadowLag`, `phantomCreak`).
- **Encounter Director (`src/engine/encounterDirector.ts`)**: Enforces anticipation (minimum 75s quiet threshold before encounters) and cooldowns between manifestations of *The Wall Breather* and *The Tall One*.
- **Player Memory Engine (`src/engine/memoryEngine.ts`)**: Versioned `localStorage` with fallback, recording visit counts, past choices, discovered relics, and environmental changes.
- **Audio Director (`src/engine/audioDirector.ts`)**: Built-in procedural Web Audio API synthesizers for 42Hz sub-bass, binaural respiration, rain, door latches, and clock ticks—with zero external media dependencies required.

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
- Production bundle size: **~102 kB gzipped**
- Sub-50ms initial paint
- Zero external network dependencies for audio or visuals
