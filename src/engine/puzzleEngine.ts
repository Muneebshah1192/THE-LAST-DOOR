// The Last Door V3 - Escape & Puzzle Engine

export interface PuzzleDef {
  id: string;
  storyId: string;
  title: string;
  promptText: string;
  type: 'code_4digit' | 'item_requirement' | 'directional_sequence';
  correctCode?: string;
  requiredItemId?: string;
  correctSequence?: string[];
  rewardItemId?: string;
  unlocksSceneId?: string;
  solvedMessage: string;
  failureMessage: string;
}

export const PUZZLE_REGISTRY: Record<string, PuzzleDef> = {
  // STORY 1: THE HOUSE THAT BREATHES
  'house_mantel_cupboard': {
    id: 'house_mantel_cupboard',
    storyId: 'the-house-that-breathes',
    title: 'Locked Mantelpiece Cupboard',
    promptText: 'A heavy brass 4-digit combination padlock secures the oak cabinet. The brass dials read 0000. Clue: The time when the breath stopped.',
    type: 'code_4digit',
    correctCode: '0317', // Grandfather clock time 03:17
    rewardItemId: 'brass_key_17',
    solvedMessage: 'CLICK. The tumblers align. Inside rests a heavy brass key engraved with "17".',
    failureMessage: 'The dials resist. The combination does not match. A faint sigh resonates behind the wallpaper.'
  },
  'house_cellar_door': {
    id: 'house_cellar_door',
    storyId: 'the-house-that-breathes',
    title: 'Reinforced Cellar Door',
    promptText: 'A heavy iron lock is bolted to the oak door frame. It requires a heavy mortise key.',
    type: 'item_requirement',
    requiredItemId: 'brass_key_17',
    unlocksSceneId: 'house-impossible-room',
    solvedMessage: 'The heavy key turns with a harsh metallic scrape. The cellar threshold opens into the impossible room.',
    failureMessage: 'The deadbolt is firmly engaged. You need the brass key from the locked mantelpiece cabinet.'
  },

  // STORY 2: FLOOR 13
  'elevator_breaker_box': {
    id: 'elevator_breaker_box',
    storyId: 'floor-13',
    title: 'Maintenance Fuse Panel',
    promptText: 'The auxiliary emergency breaker has blown out. The elevator is dead on Floor 13.',
    type: 'item_requirement',
    requiredItemId: 'breaker_fuse',
    rewardItemId: 'maintenance_key',
    solvedMessage: 'The ceramic fuse clicks into the terminal clips. Emergency amber lights flicker on. You retrieve the service key!',
    failureMessage: 'The socket is empty. A 30-amp ceramic cartridge fuse is required to restore power.'
  },
  'floor13_override_panel': {
    id: 'floor13_override_panel',
    storyId: 'floor-13',
    title: 'Emergency Shaft Keyhole',
    promptText: 'A triangular service keyhole controls the emergency descent gear to return to Ground Floor.',
    type: 'item_requirement',
    requiredItemId: 'maintenance_key',
    unlocksSceneId: 'floor13-escape',
    solvedMessage: 'The triangular key turns. Mechanical cables grind overhead. The elevator accelerates downward toward freedom!',
    failureMessage: 'The manual descent mechanism is locked. You need the custodian service key.'
  },

  // STORY 3: THE EMPTY HOSPITAL
  'hospital_medicine_safe': {
    id: 'hospital_medicine_safe',
    storyId: 'the-empty-hospital',
    title: 'Narcotics & Quarantine Safe',
    promptText: 'A brushed steel digital safe on the nurse station. The keypad flashes red. (Look for the Subject ID on Patient Chart #742).',
    type: 'code_4digit',
    correctCode: '0742', // Patient ID 0742
    rewardItemId: 'surgical_scalpel',
    solvedMessage: 'BEEP. Green light illuminates. Safe door unlatches. You take the surgical scalpel!',
    failureMessage: 'ERROR: INVALID ACCESS CODE. Down the hallway, a wheelchair rolls forward on its own.'
  },
  'hospital_quarantine_barrier': {
    id: 'hospital_quarantine_barrier',
    storyId: 'the-empty-hospital',
    title: 'Reinforced Biohazard Seal',
    promptText: 'Heavy reinforced polyethylene sheeting seals the exit corridor. You need a sharp surgical instrument to slice through.',
    type: 'item_requirement',
    requiredItemId: 'surgical_scalpel',
    unlocksSceneId: 'hospital-escape',
    solvedMessage: 'The scalpel tears cleanly through the thick plastic sheeting. Fresh night air rushes in from the exterior exit!',
    failureMessage: 'The reinforced plastic cannot be torn with bare hands. You need a sharp cutting tool.'
  },

  // STORY 4: THE FOREST
  'forest_stone_altar': {
    id: 'forest_stone_altar',
    storyId: 'the-forest',
    title: 'Ancient Stone Cairn Altar',
    promptText: 'A circle of four unlit torches surrounds a weathered stone marker. Blood runes indicate the sequence: NORTH (N), EAST (E), SOUTH (S), WEST (W).',
    type: 'directional_sequence',
    correctSequence: ['N', 'E', 'S', 'W'],
    unlocksSceneId: 'forest-escape',
    solvedMessage: 'Cold blue fire ignites across the four stone pillars. The dense fog parts, revealing the highway through the trees!',
    failureMessage: 'The sparks fizzle out into the wet moss. The fog thickens. You are walking in circles again.'
  },

  // STORY 5: THE MIRROR
  'mirror_crypt_lock': {
    id: 'mirror_crypt_lock',
    storyId: 'the-mirror',
    title: 'Reversed Cipher Inscription',
    promptText: 'Written on the opposite wall in dried blood: 1366, but the glass shard reveals it in reverse. Enter the 4-digit mirrored sequence.',
    type: 'code_4digit',
    correctCode: '6631', // Reversed mirror code
    rewardItemId: 'iron_crypt_key',
    solvedMessage: 'A compartment behind the mirror frame clicks open. You retrieve the Iron Crypt Key!',
    failureMessage: 'The mechanism clinks shut. Look closely through the mirror reflection.'
  },
  'mirror_exit_door': {
    id: 'mirror_exit_door',
    storyId: 'the-mirror',
    title: 'Iron-Barred Crypt Gate',
    promptText: 'The iron gate hidden behind the shattered glass frame blocks the exit to the waking world.',
    type: 'item_requirement',
    requiredItemId: 'iron_crypt_key',
    unlocksSceneId: 'mirror-escape',
    solvedMessage: 'The iron key turns in the lock. The illusion shatters like crystal. You step out of the occult chamber!',
    failureMessage: 'The gate is barred with heavy iron. You need the iron crypt key.'
  }
};
