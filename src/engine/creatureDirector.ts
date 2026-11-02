// The Last Door V2 - Supernatural Creature Director
// Controls behavior, appearance, audio cues, and manifestations of all entities

export type EntityId =
  // Female Supernatural Entities
  | 'banshee'
  | 'weeping-bride'
  | 'widow'
  | 'hag'
  | 'hollow-woman'
  | 'she-devil'
  // Other Entities
  | 'tall-one'
  | 'wall-breather'
  | 'wraith'
  | 'specter'
  | 'fiend'
  | 'ghoul'
  | 'shadow-child'
  | 'faceless-visitor'
  | 'mirror-double'
  | 'corridor-watcher'
  | 'crawling-spirit'
  | 'red-eyed-visitor'
  | 'pale-nun'
  | 'possessed-doll'
  | 'doorway-entity';

export interface CreatureDef {
  id: EntityId;
  name: string;
  category: 'female' | 'apparition' | 'shadow' | 'demonic';
  description: string;
  minTension: number;
  audioSignature: 'banshee_scream' | 'weeping' | 'demonic_growl' | 'ghost_whisper' | 'sub_impact' | 'wood_creak';
  behavior: 'doorway_stalker' | 'reflection_only' | 'corner_creep' | 'sudden_charge' | 'whispering_observer';
  dialogueCue?: string;
  discovered: boolean;
}

export const CREATURE_ROSTER: Record<EntityId, CreatureDef> = {
  // Female Supernatural Entities
  'banshee': {
    id: 'banshee',
    name: 'The Banshee',
    category: 'female',
    description: 'Long dishevelled hair, sunken hollow eyes, and an unnaturally wide mouth emitting blood-curdling shrieks from the end of corridors.',
    minTension: 60,
    audioSignature: 'banshee_scream',
    behavior: 'sudden_charge',
    dialogueCue: 'YOU SHOULD NOT HAVE HEARD IT.',
    discovered: false
  },
  'weeping-bride': {
    id: 'weeping-bride',
    name: 'The Weeping Bride',
    category: 'female',
    description: 'Draped in a decayed 1920s lace wedding gown with an unnatural neck contortion, facing the wall while silently sobbing.',
    minTension: 45,
    audioSignature: 'weeping',
    behavior: 'corner_creep',
    dialogueCue: 'HE NEVER CAME BACK.',
    discovered: false
  },
  'widow': {
    id: 'widow',
    name: 'The Widow',
    category: 'female',
    description: 'A tall motionless silhouette in heavy mourning veil, manifesting inside family photographs and mirrors across sessions.',
    minTension: 40,
    audioSignature: 'ghost_whisper',
    behavior: 'reflection_only',
    dialogueCue: 'WHO GAVE YOU PERMISSION TO ENTER?',
    discovered: false
  },
  'hag': {
    id: 'hag',
    name: 'The Crone',
    category: 'female',
    description: 'An ancient withered face carved with deep age lines, milky dead eyes, and an unnerving ear-to-ear grin lurking behind door frames.',
    minTension: 55,
    audioSignature: 'demonic_growl',
    behavior: 'doorway_stalker',
    dialogueCue: 'STILL BREATHING?',
    discovered: false
  },
  'hollow-woman': {
    id: 'hollow-woman',
    name: 'The Hollow Woman',
    category: 'female',
    description: 'A featureless porcelain-pale visage with elongated skeletal limbs, advancing closer each time the flashlight turns away.',
    minTension: 65,
    audioSignature: 'ghost_whisper',
    behavior: 'whispering_observer',
    dialogueCue: 'TURN AROUND.',
    discovered: false
  },
  'she-devil': {
    id: 'she-devil',
    name: 'The She-Devil',
    category: 'female',
    description: 'Humanoid demonic presence with blood-red ocular glints, subtle unnatural skin vibrations, and intense spatial dread.',
    minTension: 75,
    audioSignature: 'demonic_growl',
    behavior: 'sudden_charge',
    dialogueCue: 'YOU ARE INSIDE MY CHEST.',
    discovered: false
  },

  // Other Entities
  'tall-one': {
    id: 'tall-one',
    name: 'The Tall One',
    category: 'shadow',
    description: 'An unnaturally thin 8-foot silhouette whose presence warps the perspective of hallways.',
    minTension: 35,
    audioSignature: 'sub_impact',
    behavior: 'whispering_observer',
    discovered: false
  },
  'wall-breather': {
    id: 'wall-breather',
    name: 'The Wall Breather',
    category: 'apparition',
    description: 'A living respiratory pulse inside the lath and plaster, pressing outward against vintage wallpaper.',
    minTension: 30,
    audioSignature: 'sub_impact',
    behavior: 'corner_creep',
    discovered: false
  },
  'wraith': {
    id: 'wraith',
    name: 'The Wraith',
    category: 'apparition',
    description: 'Translucent drifting mist holding the shape of an agonizing human form.',
    minTension: 50,
    audioSignature: 'ghost_whisper',
    behavior: 'whispering_observer',
    discovered: false
  },
  'specter': {
    id: 'specter',
    name: 'The Specter',
    category: 'apparition',
    description: 'A brief pale manifestation that vanishes the moment direct gaze falls upon it.',
    minTension: 35,
    audioSignature: 'ghost_whisper',
    behavior: 'corner_creep',
    discovered: false
  },
  'fiend': {
    id: 'fiend',
    name: 'The Fiend',
    category: 'demonic',
    description: 'A distorted humanoid entity with broken joints creeping along ceiling moldings.',
    minTension: 70,
    audioSignature: 'demonic_growl',
    behavior: 'sudden_charge',
    discovered: false
  },
  'ghoul': {
    id: 'ghoul',
    name: 'The Ghoul',
    category: 'demonic',
    description: 'A decayed crouched form scraping floorboards beneath the cellar stairs.',
    minTension: 60,
    audioSignature: 'wood_creak',
    behavior: 'corner_creep',
    discovered: false
  },
  'shadow-child': {
    id: 'shadow-child',
    name: 'The Shadow Child',
    category: 'shadow',
    description: 'A small silhouette darting behind furniture accompanied by distant nursery humming.',
    minTension: 40,
    audioSignature: 'weeping',
    behavior: 'doorway_stalker',
    discovered: false
  },
  'faceless-visitor': {
    id: 'faceless-visitor',
    name: 'The Faceless Visitor',
    category: 'apparition',
    description: 'A human silhouette dressed in a dark overcoat with an entirely smooth skin-colored face.',
    minTension: 50,
    audioSignature: 'sub_impact',
    behavior: 'whispering_observer',
    discovered: false
  },
  'mirror-double': {
    id: 'mirror-double',
    name: 'The Mirror Double',
    category: 'apparition',
    description: 'A reflection that hesitates for a half-second before mirroring movement, then smiles.',
    minTension: 65,
    audioSignature: 'ghost_whisper',
    behavior: 'reflection_only',
    discovered: false
  },
  'corridor-watcher': {
    id: 'corridor-watcher',
    name: 'The Corridor Watcher',
    category: 'shadow',
    description: 'A presence stationed at the far threshold of hallway perspective.',
    minTension: 45,
    audioSignature: 'wood_creak',
    behavior: 'whispering_observer',
    discovered: false
  },
  'crawling-spirit': {
    id: 'crawling-spirit',
    name: 'The Crawling Spirit',
    category: 'apparition',
    description: 'Moves rapidly across the floor beneath the beam of the flashlight.',
    minTension: 70,
    audioSignature: 'wood_creak',
    behavior: 'sudden_charge',
    discovered: false
  },
  'red-eyed-visitor': {
    id: 'red-eyed-visitor',
    name: 'The Red-Eyed Visitor',
    category: 'demonic',
    description: 'Two pinpricks of pure crimson floating in pitch-black doorways.',
    minTension: 55,
    audioSignature: 'demonic_growl',
    behavior: 'doorway_stalker',
    discovered: false
  },
  'pale-nun': {
    id: 'pale-nun',
    name: 'The Pale Nun',
    category: 'female',
    description: 'A shrouded habit and veiled face whispering Latin benedictions backwards.',
    minTension: 60,
    audioSignature: 'ghost_whisper',
    behavior: 'whispering_observer',
    discovered: false
  },
  'possessed-doll': {
    id: 'possessed-doll',
    name: 'The Porcelain Doll',
    category: 'apparition',
    description: 'A cracked porcelain doll whose head turns 90 degrees when you look away.',
    minTension: 35,
    audioSignature: 'wood_creak',
    behavior: 'corner_creep',
    discovered: false
  },
  'doorway-entity': {
    id: 'doorway-entity',
    name: 'The Threshold Entity',
    category: 'shadow',
    description: 'A hand gripping the door edge from inside pitch-black rooms.',
    minTension: 40,
    audioSignature: 'wood_creak',
    behavior: 'doorway_stalker',
    discovered: false
  }
};

class CreatureDirector {
  private lastEncounterTime: number = 0;
  private minEncounterIntervalMs: number = 22000; // Minimum 22s between major creature events
  private activeCreature: CreatureDef | null = null;
  private encounterHistory: EntityId[] = [];

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.lastEncounterTime = Date.now();
    this.activeCreature = null;
    this.encounterHistory = [];
  }

  public selectNextEntity(currentTension: number, currentSceneId: string): CreatureDef | null {
    const now = Date.now();

    // Respect pacing cooldown
    if (now - this.lastEncounterTime < this.minEncounterIntervalMs) {
      return null;
    }

    // Filter eligible entities by tension and avoid immediate repeats
    const eligible = Object.values(CREATURE_ROSTER).filter((c) => {
      if (currentTension < c.minTension) return false;
      if (this.encounterHistory.slice(-2).includes(c.id)) return false; // Anti-repetition

      // Scene affinities
      if (currentSceneId === 'house-porch' && (c.id === 'doorway-entity' || c.id === 'tall-one' || c.id === 'specter')) return true;
      if (currentSceneId === 'house-foyer' && (c.id === 'shadow-child' || c.id === 'hag' || c.id === 'possessed-doll')) return true;
      if (currentSceneId === 'house-parlor' && (c.id === 'widow' || c.id === 'mirror-double' || c.id === 'weeping-bride')) return true;
      if (currentSceneId === 'house-hallway' && (c.id === 'banshee' || c.id === 'corridor-watcher' || c.id === 'hollow-woman' || c.id === 'crawling-spirit')) return true;
      if (currentSceneId === 'house-impossible-room' && (c.id === 'she-devil' || c.id === 'fiend' || c.id === 'red-eyed-visitor')) return true;

      return Math.random() < 0.35;
    });

    if (eligible.length === 0) return null;

    // Pick random eligible creature
    const picked = eligible[Math.floor(Math.random() * eligible.length)];
    this.lastEncounterTime = now;
    this.activeCreature = picked;
    this.encounterHistory.push(picked.id);

    return picked;
  }

  public getActiveCreature(): CreatureDef | null {
    return this.activeCreature;
  }

  public clearActiveCreature(): void {
    this.activeCreature = null;
  }

  public getAllCreatures(): CreatureDef[] {
    return Object.values(CREATURE_ROSTER);
  }
}

export const creatureDirector = new CreatureDirector();
