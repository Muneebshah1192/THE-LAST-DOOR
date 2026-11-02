# THE LAST DOOR (V3 — ESCAPE-PUZZLE PSYCHOLOGICAL HORROR CINEMATIC)
> **You can leave whenever you want. But something may remember that you were here.**

An adaptive, cinematic psychological-horror web experience designed as an interactive horror film running inside a modern browser. 

---

## 🩸 What's New in Version 3

### 1. Five Distinct Playable Horror Universes & Chapter Hub
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

### 2. Interactive Inventory & Evidence Inspection Dock
- **Floating Evidence Dock**: Bottom HUD displays all collected keys, documents, tools, and relics with glowing selection badges.
- **3D-Style Evidence Inspection Modal**: Double-click or inspect any evidence item. Read its lore, inspect details, and click **"FLIP & EXAMINE REVERSE"** to uncover hidden handwritten combinations, diagrams, and occult inscriptions.

---

### 3. Tactile 4-Digit Keypad & Lock Combination System
- Interactive hardware keypad modal with tactile 0–9 buttons, real-time code display, clear/enter actions, audio mechanical clicks, and instant audio-visual error/success feedback.

---

### 4. Terrifying Devil Visuals & Manifestations
- High-resolution photorealistic and layered SVG supernatural devil apparitions embedded into scene geometry, peeking through cracked doors, lurking behind frosted elevator glass, staring from psychiatric ward corners, watching between pine trees, and emerging in mirror reflections.
- Unpredictable threshold encounters: sudden doorway transitions occasionally trigger an extreme close-up face reveal with sharp orchestral audio stingers before cutting to black.

---

### 5. Story Selection Hub & Non-Blocking Progression
- **Story Select Hub**: Accessible at any time via the `CHAPTERS (5)` button. Browse chapters, view completion status, primary entity dossiers, and start any unlocked chapter.
- **Escape Ending Screen Fixed**: Escaping a story now offers immediate options:
  - `[ADVANCE TO STORY 0N]`: Seamlessly load the next unlocked horror chapter.
  - `[CHAPTERS HUB]`: Open the chapter selection grid.
  - `[REPLAY CHAPTER]`: Re-enter with persistent memory adjustments.
  - `[OCCULT ARCHIVE]`: View collected relics and discovered anomalies.

---

### 6. Overhauled Web Audio Synthesizer
- Procedural 40Hz sub-bass, binaural respiration, rain simulator, door latch transients, resonant 1.0s clock ticks, heavy sub impacts, and glitch bursts.
- **Directional Spatial Audio**: Banshee screams, ghost whispers, and demonic growls pan dynamically across headphones.
- Working master volume slider and mute toggle in both the Caution screen and in-game pause HUD (`ESC` key).

---

## 🛠️ Development & Local Testing

```bash
# Install dependencies
npm install

# Run development server (runs at http://localhost:3000)
npm run dev

# Run automated Vitest test suite (23 tests passing)
npm run test

# Compile TypeScript and build production bundle
npm run build
```

---

## ⚡ Deployment
Configured for zero-config deployment to **Vercel** (`vercel.json`), **Netlify**, or any static hosting platform.
- Zero external image/asset API dependencies: all audio is procedurally synthesized via Web Audio API, and graphics are self-contained.
- Total production bundle size: **~120 kB gzipped**.
