// The Last Door V3 - Player Inventory & Inspection Engine

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  loreText?: string;
  backSideText?: string; // Revealed when inspecting the item!
  iconSvgType: 'key' | 'paper' | 'fuse' | 'scalpel' | 'compass' | 'shard' | 'flint' | 'watch';
  storyId: string;
}

export const MASTER_ITEMS: Record<string, InventoryItem> = {
  // Story 1: The House That Breathes
  'brass_key_17': {
    id: 'brass_key_17',
    name: 'Heavy Brass Key',
    description: 'A tarnished brass mortise key found inside the locked mantel cabinet.',
    backSideText: 'Engraved with a deep Roman numeral: XVII (17). The metal feels unusually cold.',
    iconSvgType: 'key',
    storyId: 'the-house-that-breathes'
  },
  'torn_journal_page': {
    id: 'torn_journal_page',
    name: 'Torn Journal Entry',
    description: 'A water-damaged diary page dated October 14, 1924.',
    backSideText: '"We heard the plaster inhale. At 03:17 the pendulum froze. The key was locked inside the cabinet to prevent her from reaching the cellar."',
    iconSvgType: 'paper',
    storyId: 'the-house-that-breathes'
  },

  // Story 2: Floor 13
  'maintenance_key': {
    id: 'maintenance_key',
    name: 'Elevator Service Key',
    description: 'A triangular service key dropped by the building custodian.',
    backSideText: 'Stamped: "FOR EMERGENCY SERVICE ACCESS ON MECHANICAL FLOORS ONLY."',
    iconSvgType: 'key',
    storyId: 'floor-13'
  },
  'breaker_fuse': {
    id: 'breaker_fuse',
    name: '30-Amp Cartridge Fuse',
    description: 'A heavy ceramic fuse salvaged from the maintenance corridor.',
    backSideText: 'Burn marks around the contacts. Still conducts current.',
    iconSvgType: 'fuse',
    storyId: 'floor-13'
  },

  // Story 3: The Empty Hospital
  'patient_chart_742': {
    id: 'patient_chart_742',
    name: 'Medical File #742',
    description: 'A clipboard stained with dark iodine and dried blood.',
    backSideText: 'SUBJECT: UNKNOWN. DIAGNOSIS: TERMINAL ISOLATION. DISPENSARY SAFE CODE: 0742.',
    iconSvgType: 'paper',
    storyId: 'the-empty-hospital'
  },
  'surgical_scalpel': {
    id: 'surgical_scalpel',
    name: 'Rusted Scalpel',
    description: 'An old surgical tool from the psychiatric quarantine ward.',
    backSideText: 'Sharp enough to slice through heavy bio-hazard adhesive seals.',
    iconSvgType: 'scalpel',
    storyId: 'the-empty-hospital'
  },

  // Story 4: The Forest
  'brass_compass': {
    id: 'brass_compass',
    name: 'Erratic Compass',
    description: 'A pocket compass whose needle spins towards supernatural anomalies.',
    backSideText: 'The glass lens is cracked. The needle points SOUTH-EAST towards the altar.',
    iconSvgType: 'compass',
    storyId: 'the-forest'
  },
  'ritual_flint': {
    id: 'ritual_flint',
    name: 'Blackened Flint & Steel',
    description: 'Found inside a hollowed oak stump surrounded by animal bones.',
    backSideText: 'Sparks emit a faint sulfur smell and cold blue sparks.',
    iconSvgType: 'flint',
    storyId: 'the-forest'
  },

  // Story 5: The Mirror
  'glass_shard': {
    id: 'glass_shard',
    name: 'Silvered Mirror Shard',
    description: 'A jagged piece of the shattered occult mirror.',
    backSideText: 'Looking through the shard reveals hidden blood-red symbols written in reverse on the walls.',
    iconSvgType: 'shard',
    storyId: 'the-mirror'
  },
  'iron_crypt_key': {
    id: 'iron_crypt_key',
    name: 'Iron Crypt Key',
    description: 'Revealed inside the hollow space behind the mirror frame.',
    backSideText: 'The bow of the key is shaped like an ouroboros serpent.',
    iconSvgType: 'key',
    storyId: 'the-mirror'
  }
};
