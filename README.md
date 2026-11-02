# THE LAST DOOR (V3 — ESCAPE-PUZZLE PSYCHOLOGICAL HORROR CINEMATIC)
> **You can leave whenever you want. But something may remember that you were here.**

An adaptive, cinematic psychological-horror web experience designed as an interactive horror film running inside a modern browser. 

---

## 🎬 Animated Visual Assets & Video Loops System (NEW)

We have transitioned from static imagery to full **animated horror visual assets, transparent creature overlays, ambient video loops, and dynamic jumpscares**:

### 1. Centralized Asset Encounter Library (`src/engine/assetRegistry.ts`)
- **Organized Horror Asset Directory**:
  ```text
  public/assets/horror/
  ├── creatures/           # Corridor runner silhouettes, crawling spirits (.webp)
  ├── ghosts/              # Floating transparent banshee loops, slumped hallucinations (.svg, .webp)
  ├── demons/              # The She-Devil, The Tall One stalker (.svg)
  ├── female-entities/     # Weeping Bride with trembling shoulders & tears (.svg)
  ├── face-encounters/     # Screaming demon jumpscares, ghoul emerges (.webp)
  ├── environments/        # Moving ambient Victorian hallway loops (.mp4)
  ├── fog-smoke/           # Seamless looping creeping volumetric fog (.mp4)
  ├── shadows/             # Clawed shadows stretching on walls, breathing plaster (.svg)
  ├── paranormal-effects/  # Blinking crimson horror eyes in darkness (.svg)
  ├── glitch-effects/      # VHS CRT camera static, dripping blood on glass (.webp, .svg)
  ├── particles/           # Flashlight dust motes drifting in air (.svg)
  ├── animations/          # Rotating demonic occult seal (Lottie JSON)
  └── textures/            # Blood splatters and grunge maps
  ```
- **Extensible Drop-In Pipeline**: Simply drop any downloaded `.webm`, `.mp4`, `.webp`, `.gif`, or `.json` file into its appropriate folder, register it in `HORROR_ASSETS`, and the Horror Director will seamlessly utilize it across scenes!

### 2. Reusable Media & Player Components
- **`<HorrorMedia />`**: Reusable universal player supporting MP4/WebM video loops, animated WebP/GIF, animated SVGs, and Lottie animations with transparent alpha blending, auto-play error recovery, and lazy loading.
- **`<AnimatedEntityOverlay />`**: Connects directly to the creature director to manifest moving, floating, breathing entities.
- **Accessibility & Performance Aware**: Automatically pauses video loops and animations when the game is paused (`ESC`) or when **Reduced Motion** is enabled in the Caution screen.

---

## 🩸 5 Distinct Playable Horror Universes & Chapter Hub

Experience 5 full story campaigns, each set in an unsettling environment with its own primary devil, environmental puzzles, clues, and escape conditions:
1. **Story 01: The House That Breathes** *(1924 Craftsman Residence)*
   - *Primary Devil:* The Banshee & The Wall Breather
   - *Escape Puzzle:* Inspect the grandfather clock stopped at `03:17`. Deduce the 4-digit code `0317` to unlock the locked mantelpiece cabinet. Retrieve **Heavy Brass Key XVII** to unlock the cellar door threshold to freedom.
2. **Story 02: Floor 13** *(Victorian Apartment Mechanical Shaft)*
   - *Primary Devil:* The Shadow Child & The Doorway Entity
   - *Escape Puzzle:* The elevator is stuck between floors in darkness. Retrieve the **30-Amp Cartridge Fuse** from the service corridor, slot it into the auxiliary panel, collect the **Custodian Service Key**, and unlock the manual descent gear to return to the Ground Floor.
3. **Story 03: The Empty Hospital** *(St. Jude Psychiatric Quarantine Ward)*
   - *Primary Devil:* The Crone / Hag & The Hollow Woman
   - *Escape Puzzle:* Discover **Medical File #742** on the examination desk. Flip the chart to reveal the dispensary safe code `0742`. Enter `0742` on the digital safe keypad to obtain the **Surgical Scalpel**, and slice through the reinforced polyethylene biohazard seal to escape.
4. **Story 04: The Forest** *(Blackwood Pine Labyrinth)*
   - *Primary Devil:* The Tall One & The Corridor Watcher
   - *Escape Puzzle:* Find the **Brass Compass** and **Ritual Flint**. Ignite the four weathered cardinal stone pillars in sequence: `NORTH (N) → EAST (E) → SOUTH (S) → WEST (W)`. Cold blue fire disperses the supernatural fog, revealing the escape highway.
5. **Story 05: The Mirror** *(Occult Reflection Chamber)*
   - *Primary Devil:* The She-Devil & The Mirror Double
   - *Escape Puzzle:* Pick up the **Silvered Mirror Shard**. Inspect the dried blood inscription `1366` on the stone wall. Looking through the shard inverts the numerals into `6631`. Enter `6631` on the crypt keypad to retrieve the **Iron Crypt Key**, unlock the iron-barred gate, and break through to waking reality!

---

## 🎒 Interactive Evidence Dock & Keypad System
- **Floating Evidence Dock**: Bottom HUD displays all collected keys, documents, tools, and relics with glowing selection badges.
- **3D-Style Evidence Inspection Modal**: Double-click or inspect any evidence item. Read its lore and click **"FLIP & EXAMINE REVERSE"** to uncover hidden handwritten combinations, diagrams, and occult inscriptions.
- **Tactile 4-Digit Keypad**: Hardware keypad modal with tactile 0–9 buttons, real-time code display, mechanical audio clicks, and error/success feedback.

---

## 🛠️ Development & Local Testing

```bash
# Install dependencies
npm install

# Run development server (runs at http://localhost:3000)
npm run dev

# Run automated Vitest test suite (28 tests passing)
npm run test

# Compile TypeScript and build production bundle
npm run build
```

---

## ⚡ Deployment
Configured for zero-config deployment to **Vercel** (`vercel.json`), **Netlify**, or any static hosting platform.
- Total production bundle size: **~125 kB gzipped**.
