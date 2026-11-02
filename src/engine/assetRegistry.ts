// The Last Door - Centralized Horror Asset Registry & Encounter Library
// Supports: Animated WebP, MP4/WebM video loops, Animated SVGs, GIFs, and Lottie JSON

export type HorrorAssetType = 
  | 'video' 
  | 'animated-webp' 
  | 'gif' 
  | 'animated-svg' 
  | 'lottie' 
  | 'static-image';

export type HorrorAssetCategory = 
  | 'ghosts' 
  | 'demons' 
  | 'female-entities' 
  | 'face-encounters' 
  | 'fog-smoke' 
  | 'shadows' 
  | 'paranormal-effects' 
  | 'glitch-effects' 
  | 'particles' 
  | 'environments' 
  | 'creatures';

export interface HorrorAsset {
  id: string;
  name: string;
  category: HorrorAssetCategory;
  path: string;
  type: HorrorAssetType;
  fallbackPath?: string;
  blendMode?: 'screen' | 'lighten' | 'normal' | 'multiply' | 'color-dodge';
  defaultOpacity?: number;
  loop?: boolean;
  description: string;
}

// -------------------------------------------------------------
// CENTRALIZED HORROR ASSET MANIFEST
// Add new files dropped into public/assets/horror/ here!
// -------------------------------------------------------------
export const HORROR_ASSETS: Record<string, HorrorAsset> = {
  // 1. Fog, Smoke & Atmosphere
  'fog_creeping_loop': {
    id: 'fog_creeping_loop',
    name: 'Creeping Volumetric Fog Video',
    category: 'fog-smoke',
    path: '/assets/horror/fog-smoke/creeping-fog-loop.mp4',
    type: 'video',
    fallbackPath: '/assets/horror/fog-smoke/creeping-wall-shadows.svg',
    blendMode: 'screen',
    defaultOpacity: 0.35,
    loop: true,
    description: 'A continuous atmospheric mist loop providing depth and organic motion to environments.'
  },

  // 2. Ambient Environments
  'env_dark_ambient_loop': {
    id: 'env_dark_ambient_loop',
    name: 'Dark Ambient Corridor Video',
    category: 'environments',
    path: '/assets/horror/environments/dark-ambient-loop.mp4',
    type: 'video',
    blendMode: 'screen',
    defaultOpacity: 0.25,
    loop: true,
    description: 'Subtle light shift and atmospheric dust in abandoned halls.'
  },

  // 3. Glitch Effects & Static
  'glitch_vhs_static_cam': {
    id: 'glitch_vhs_static_cam',
    name: 'VHS CRT Camera Static',
    category: 'glitch-effects',
    path: '/assets/horror/glitch-effects/vhs-static-cam.webp',
    type: 'animated-webp',
    blendMode: 'screen',
    defaultOpacity: 0.45,
    loop: true,
    description: 'Corrupted analog surveillance feed with horizontal tracking distortion.'
  },
  'glitch_blood_drip': {
    id: 'glitch_blood_drip',
    name: 'Blood Drips on Pane',
    category: 'glitch-effects',
    path: '/assets/horror/glitch-effects/blood-drip-loop.svg',
    type: 'animated-svg',
    blendMode: 'screen',
    defaultOpacity: 0.65,
    loop: true,
    description: 'Viscous crimson droplets slowly trickling down the player viewport glass.'
  },

  // 4. Face Encounters (Sudden Doorway / Jump Scares)
  'face_demon_jumpscare': {
    id: 'face_demon_jumpscare',
    name: 'Sudden Screaming Demon Visage',
    category: 'face-encounters',
    path: '/assets/horror/face-encounters/sudden-demon-jumpscare.webp',
    type: 'animated-webp',
    fallbackPath: '/assets/horror/creatures/banshee/banshee.jpg',
    blendMode: 'normal',
    defaultOpacity: 1.0,
    loop: true,
    description: 'Violent 0.5s flash of a disfigured supernatural demon leaping from blackness.'
  },
  'face_ghoul_reveal': {
    id: 'face_ghoul_reveal',
    name: 'Ghoul Wide-Eyed Emerge',
    category: 'face-encounters',
    path: '/assets/horror/face-encounters/ghoul-face-reveal.webp',
    type: 'animated-webp',
    fallbackPath: '/assets/horror/creatures/banshee/banshee.jpg',
    blendMode: 'normal',
    defaultOpacity: 1.0,
    loop: true,
    description: 'An entity thrusting its pale face forward with dilated unblinking pupils.'
  },

  // 5. Creatures & Hallway Monsters
  'creature_shadow_runner': {
    id: 'creature_shadow_runner',
    name: 'Corridor Shadow Runner',
    category: 'creatures',
    path: '/assets/horror/creatures/shadow-corridor-runner.webp',
    type: 'animated-webp',
    blendMode: 'lighten',
    defaultOpacity: 0.85,
    loop: true,
    description: 'A contorted silhouette sprinting across distant doorway openings.'
  },

  // 6. Ghosts & Phantoms
  'ghost_banshee_float': {
    id: 'ghost_banshee_float',
    name: 'Floating Banshee Apparition',
    category: 'ghosts',
    path: '/assets/horror/ghosts/banshee-loop.svg',
    type: 'animated-svg',
    fallbackPath: '/assets/horror/creatures/banshee/banshee.jpg',
    blendMode: 'screen',
    defaultOpacity: 0.9,
    loop: true,
    description: 'Transparent hovering female phantom with undulating hair and hollow eyes.'
  },
  'ghost_slumped_phantom': {
    id: 'ghost_slumped_phantom',
    name: 'Slumped Corner Hallucination',
    category: 'ghosts',
    path: '/assets/horror/ghosts/slumped-apparition.webp',
    type: 'animated-webp',
    blendMode: 'lighten',
    defaultOpacity: 0.8,
    loop: true,
    description: 'A lifeless spirit slumped motionless in a corner that twitches when observed.'
  },

  // 7. Female Entities
  'female_weeping_bride': {
    id: 'female_weeping_bride',
    name: 'Weeping Bride in Decayed Lace',
    category: 'female-entities',
    path: '/assets/horror/female-entities/weeping-bride-loop.svg',
    type: 'animated-svg',
    blendMode: 'screen',
    defaultOpacity: 0.85,
    loop: true,
    description: 'A weeping bride in torn 1920s veil with twitching shoulders and weeping tears.'
  },

  // 8. Demons
  'demon_she_devil': {
    id: 'demon_she_devil',
    name: 'The She-Devil Horned Apparition',
    category: 'demons',
    path: '/assets/horror/demons/she-devil-apparition.svg',
    type: 'animated-svg',
    blendMode: 'screen',
    defaultOpacity: 0.9,
    loop: true,
    description: 'Dark horned demon with glowing red slit eyes and breathing chest pulse.'
  },
  'demon_tall_one': {
    id: 'demon_tall_one',
    name: 'The Tall One Stalker',
    category: 'demons',
    path: '/assets/horror/demons/tall-one-walk.svg',
    type: 'animated-svg',
    blendMode: 'screen',
    defaultOpacity: 0.9,
    loop: true,
    description: '8-foot slender silhouette with spider-like arms stalking between doorways.'
  },

  // 9. Shadows
  'shadow_creeping_wall': {
    id: 'shadow_creeping_wall',
    name: 'Creeping Wall Shadow',
    category: 'shadows',
    path: '/assets/horror/shadows/creeping-wall-shadows.svg',
    type: 'animated-svg',
    blendMode: 'multiply',
    defaultOpacity: 0.75,
    loop: true,
    description: 'A dark clawed shadow stretching slowly along the room wallpaper.'
  },
  'shadow_wall_breather': {
    id: 'shadow_wall_breather',
    name: 'Wall Breather Plaster Inhale',
    category: 'shadows',
    path: '/assets/horror/shadows/wall-breather-pulse.svg',
    type: 'animated-svg',
    blendMode: 'screen',
    defaultOpacity: 0.7,
    loop: true,
    description: 'Rhythmically bulging wall plaster mimicking breathing human lungs.'
  },

  // 10. Paranormal Effects
  'paranormal_blinking_eyes': {
    id: 'paranormal_blinking_eyes',
    name: 'Blinking Crimson Horror Eyes',
    category: 'paranormal-effects',
    path: '/assets/horror/paranormal-effects/blinking-red-eyes.svg',
    type: 'animated-svg',
    blendMode: 'screen',
    defaultOpacity: 0.95,
    loop: true,
    description: 'Luminous red eyes materializing in pitch blackness, blinking, and fading.'
  },

  // 11. Particles
  'particles_dust_motes': {
    id: 'particles_dust_motes',
    name: 'Floating Flashlight Dust Motes',
    category: 'particles',
    path: '/assets/horror/particles/floating-dust-motes.svg',
    type: 'animated-svg',
    blendMode: 'screen',
    defaultOpacity: 0.4,
    loop: true,
    description: 'Suspended specks of decay drifting slowly through the flashlight beam.'
  },

  // 12. Occult Animations & UI
  'anim_occult_seal': {
    id: 'anim_occult_seal',
    name: 'Rotating Demon Sigil (Lottie)',
    category: 'glitch-effects',
    path: '/assets/horror/animations/occult-seal-spin.json',
    type: 'lottie',
    blendMode: 'screen',
    defaultOpacity: 0.8,
    loop: true,
    description: 'Rotating occult alchemical pentagram seal with glowing demonic inscriptions.'
  }
};

// -------------------------------------------------------------
// HELPER LOOKUP & CUSTOM REGISTRATION SYSTEM
// -------------------------------------------------------------

/**
 * Register a new custom asset that the user downloaded and dropped into a folder.
 */
export function registerCustomAsset(asset: HorrorAsset): void {
  HORROR_ASSETS[asset.id] = asset;
}

/**
 * Get all assets belonging to a specific category.
 */
export function getAssetsByCategory(category: HorrorAssetCategory): HorrorAsset[] {
  return Object.values(HORROR_ASSETS).filter((a) => a.category === category);
}

/**
 * Get a random face encounter asset for threshold jump-scare reveals.
 */
export function getRandomFaceEncounter(): HorrorAsset {
  const encounters = getAssetsByCategory('face-encounters');
  if (encounters.length === 0) return HORROR_ASSETS['face_demon_jumpscare'];
  const index = Math.floor(Math.random() * encounters.length);
  return encounters[index];
}

/**
 * Map an entity ID from creatureDirector to its preferred animated asset.
 */
export function getEntityAnimation(entityId: string): HorrorAsset | null {
  switch (entityId) {
    case 'banshee':
      return HORROR_ASSETS['ghost_banshee_float'];
    case 'she-devil':
      return HORROR_ASSETS['demon_she_devil'];
    case 'tall-one':
      return HORROR_ASSETS['demon_tall_one'];
    case 'weeping-bride':
      return HORROR_ASSETS['female_weeping_bride'];
    case 'wall-breather':
      return HORROR_ASSETS['shadow_wall_breather'];
    case 'shadow-child':
    case 'corridor-watcher':
    case 'crawling-spirit':
      return HORROR_ASSETS['creature_shadow_runner'];
    case 'specter':
    case 'wraith':
      return HORROR_ASSETS['ghost_slumped_phantom'];
    default:
      return null;
  }
}
