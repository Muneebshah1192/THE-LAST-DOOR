// The Last Door V2 - Engine Automated Tests
import { describe, it, expect, beforeEach } from 'vitest';
import { memoryEngine } from '../engine/memoryEngine';
import { tensionDirector } from '../engine/tensionDirector';
import { anomalyEngine, INITIAL_ANOMALIES } from '../engine/anomalyEngine';
import { encounterDirector } from '../engine/encounterDirector';
import { creatureDirector, CREATURE_ROSTER } from '../engine/creatureDirector';
import { SCENES, ENDINGS, STORIES } from '../engine/storyData';
import { MASTER_ITEMS } from '../engine/inventoryEngine';
import { PUZZLE_REGISTRY } from '../engine/puzzleEngine';
import { 
  HORROR_ASSETS, 
  getAssetsByCategory, 
  getRandomFaceEncounter, 
  getEntityAnimation, 
  registerCustomAsset 
} from '../engine/assetRegistry';

describe('Player Memory Engine', () => {
  beforeEach(() => {
    memoryEngine.resetMemory();
  });

  it('initializes with default memory values', () => {
    const mem = memoryEngine.getMemory();
    expect(mem.totalVisits).toBe(0);
    expect(mem.theHouseRemembers).toBe(false);
    expect(mem.parlorPhotoFigureCount).toBe(3);
    expect(mem.discoveredRelics).toEqual([]);
    expect(mem.discoveredAnomalies).toEqual([]);
  });

  it('records first visit correctly with 3 figures in portrait', () => {
    const session = memoryEngine.recordSessionStart();
    expect(session.isReturnVisit).toBe(false);
    expect(session.visitNumber).toBe(1);

    const mem = memoryEngine.getMemory();
    expect(mem.totalVisits).toBe(1);
    expect(mem.theHouseRemembers).toBe(false);
    expect(mem.parlorPhotoFigureCount).toBe(3);
  });

  it('triggers "The House Remembers" and 4th figure on return visits', () => {
    // Visit 1
    memoryEngine.recordSessionStart();
    // Visit 2
    const session2 = memoryEngine.recordSessionStart();
    expect(session2.isReturnVisit).toBe(true);
    expect(session2.visitNumber).toBe(2);

    const mem = memoryEngine.getMemory();
    expect(mem.theHouseRemembers).toBe(true);
    expect(mem.parlorPhotoFigureCount).toBe(4);
  });

  it('logs discovered relics and anomalies without duplicates', () => {
    memoryEngine.recordRelicDiscovered('brass_pocket_watch');
    memoryEngine.recordRelicDiscovered('brass_pocket_watch');
    expect(memoryEngine.getMemory().discoveredRelics).toEqual(['brass_pocket_watch']);

    memoryEngine.recordAnomalyDiscovered('wallBreathing');
    memoryEngine.recordAnomalyDiscovered('wallBreathing');
    expect(memoryEngine.getMemory().discoveredAnomalies).toEqual(['wallBreathing']);
  });
});

describe('Tension Director', () => {
  beforeEach(() => {
    tensionDirector.reset();
  });

  it('clamps tension strictly within 0 and 100', () => {
    tensionDirector.setTension(-50);
    expect(tensionDirector.getTension()).toBe(0);

    tensionDirector.setTension(150);
    expect(tensionDirector.getTension()).toBe(100);
  });

  it('calculates dynamic tension profile attributes appropriately', () => {
    tensionDirector.setTension(20);
    const lowProfile = tensionDirector.getProfile();
    expect(lowProfile.label).toBe('LOW');
    expect(lowProfile.heartbeatBpm).toBeLessThan(75);

    tensionDirector.setTension(90);
    const highProfile = tensionDirector.getProfile();
    expect(['CRITICAL', 'HIGH', 'UNKNOWN']).toContain(highProfile.label);
    expect(highProfile.heartbeatBpm).toBeGreaterThan(100);
    expect(highProfile.encounterProbability).toBeGreaterThan(0.5);
  });

  it('drops tension smoothly during relief points', () => {
    tensionDirector.setTension(95);
    tensionDirector.triggerReliefDrop(30);
    tensionDirector.tick(2.0);
    expect(tensionDirector.getTension()).toBeLessThan(95);
  });
});

describe('Anomaly Engine', () => {
  beforeEach(() => {
    anomalyEngine.reset();
  });

  it('contains the 5 curated anomalies', () => {
    expect(INITIAL_ANOMALIES.length).toBe(5);
    const ids = INITIAL_ANOMALIES.map(a => a.id);
    expect(ids).toContain('photoShift');
    expect(ids).toContain('wallBreathing');
    expect(ids).toContain('clockAnomaly');
    expect(ids).toContain('shadowLag');
    expect(ids).toContain('phantomCreak');
  });

  it('guarantees photoShift activation on return visits in the parlor', () => {
    memoryEngine.resetMemory();
    memoryEngine.recordSessionStart();
    memoryEngine.recordSessionStart(); // Return visit
    
    anomalyEngine.reset();
    const activated = anomalyEngine.evaluateSceneAnomalies('house-parlor', 35);
    expect(activated).toContain('photoShift');
    expect(anomalyEngine.isAnomalyActive('photoShift')).toBe(true);
  });
});

describe('Supernatural Creature Director', () => {
  beforeEach(() => {
    creatureDirector.reset();
  });

  it('registers all 21 supernatural entities', () => {
    const creatures = creatureDirector.getAllCreatures();
    expect(creatures.length).toBe(21);
    
    // Female entities
    expect(CREATURE_ROSTER['banshee']).toBeDefined();
    expect(CREATURE_ROSTER['weeping-bride']).toBeDefined();
    expect(CREATURE_ROSTER['widow']).toBeDefined();
    expect(CREATURE_ROSTER['hag']).toBeDefined();
    expect(CREATURE_ROSTER['hollow-woman']).toBeDefined();
    expect(CREATURE_ROSTER['she-devil']).toBeDefined();

    // Other entities
    expect(CREATURE_ROSTER['tall-one']).toBeDefined();
    expect(CREATURE_ROSTER['wall-breather']).toBeDefined();
    expect(CREATURE_ROSTER['wraith']).toBeDefined();
    expect(CREATURE_ROSTER['specter']).toBeDefined();
    expect(CREATURE_ROSTER['fiend']).toBeDefined();
    expect(CREATURE_ROSTER['ghoul']).toBeDefined();
  });

  it('assigns terrifying audio signatures to supernatural entities', () => {
    expect(CREATURE_ROSTER['banshee'].audioSignature).toBe('banshee_scream');
    expect(CREATURE_ROSTER['weeping-bride'].audioSignature).toBe('weeping');
    expect(CREATURE_ROSTER['she-devil'].audioSignature).toBe('demonic_growl');
  });
});

describe('Encounter Director', () => {
  beforeEach(() => {
    encounterDirector.resetSession();
  });

  it('prevents sudden creature encounters during the initial anticipation phase', () => {
    const encounter = encounterDirector.evaluateEncounter('house-hallway', 90, 1000);
    expect(encounter).toBeNull();
  });
});

describe('5 Playable Horror Stories & Universe Hub', () => {
  it('registers all 5 distinct horror story chapters', () => {
    expect(STORIES.length).toBe(5);
    const storyIds = STORIES.map(s => s.id);
    expect(storyIds).toContain('the-house-that-breathes');
    expect(storyIds).toContain('floor-13');
    expect(storyIds).toContain('the-empty-hospital');
    expect(storyIds).toContain('the-forest');
    expect(storyIds).toContain('the-mirror');
  });

  it('contains valid scenes and hotspots for all 5 stories', () => {
    const sceneKeys = Object.keys(SCENES);
    expect(sceneKeys.length).toBe(17);

    // Verify key starting scenes for each story exist
    expect(SCENES['house-porch']).toBeDefined();
    expect(SCENES['floor13-elevator']).toBeDefined();
    expect(SCENES['hospital-reception']).toBeDefined();
    expect(SCENES['forest-path']).toBeDefined();
    expect(SCENES['mirror-chamber']).toBeDefined();

    // Verify all scenes have narrative lines and hotspots
    Object.values(SCENES).forEach(scene => {
      expect(scene.id).toBeDefined();
      expect(scene.title).toBeDefined();
      expect(scene.narrativeText.length).toBeGreaterThan(0);
      expect(scene.hotspots.length).toBeGreaterThan(0);
    });
  });

  it('contains all story escape endings with taglines and summaries', () => {
    expect(ENDINGS['ending_impossible_room']).toBeDefined();
    expect(ENDINGS['ending_floor13_escape']).toBeDefined();
    expect(ENDINGS['ending_hospital_escape']).toBeDefined();
    expect(ENDINGS['ending_forest_escape']).toBeDefined();
    expect(ENDINGS['ending_mirror_escape']).toBeDefined();
    expect(ENDINGS['ending_retreat']).toBeDefined();

    expect(ENDINGS['ending_impossible_room'].tagline).toContain('The House That Breathes');
    expect(ENDINGS['ending_floor13_escape'].tagline).toContain('Floor 13');
    expect(ENDINGS['ending_hospital_escape'].tagline).toContain('Wrong room');
    expect(ENDINGS['ending_forest_escape'].tagline).toContain('stone altar');
    expect(ENDINGS['ending_mirror_escape'].tagline).toContain('reflection');
  });
});

describe('Interactive Inventory & Evidence Inspection Engine', () => {
  it('registers master escape items with inspection clues', () => {
    const itemIds = Object.keys(MASTER_ITEMS);
    expect(itemIds).toContain('brass_key_17');
    expect(itemIds).toContain('torn_journal_page');
    expect(itemIds).toContain('maintenance_key');
    expect(itemIds).toContain('breaker_fuse');
    expect(itemIds).toContain('patient_chart_742');
    expect(itemIds).toContain('surgical_scalpel');
    expect(itemIds).toContain('brass_compass');
    expect(itemIds).toContain('ritual_flint');
    expect(itemIds).toContain('glass_shard');
    expect(itemIds).toContain('iron_crypt_key');
  });

  it('provides inspectable reverse clues on items like the journal page', () => {
    const page = MASTER_ITEMS['torn_journal_page'];
    expect(page.backSideText).toBeDefined();
    expect(page.backSideText).toContain('03:17');
  });

  it('provides inspectable reverse clues on patient chart 742', () => {
    const chart = MASTER_ITEMS['patient_chart_742'];
    expect(chart.backSideText).toBeDefined();
    expect(chart.backSideText).toContain('0742');
  });
});

describe('Interactive Puzzle Engine', () => {
  it('registers all story puzzles and combination locks', () => {
    expect(PUZZLE_REGISTRY['house_mantel_cupboard']).toBeDefined();
    expect(PUZZLE_REGISTRY['elevator_breaker_box']).toBeDefined();
    expect(PUZZLE_REGISTRY['hospital_medicine_safe']).toBeDefined();
    expect(PUZZLE_REGISTRY['mirror_crypt_lock']).toBeDefined();
  });

  it('validates Story 1 mantel lock code tied to the frozen clock (03:17 -> 0317)', () => {
    const puzzle = PUZZLE_REGISTRY['house_mantel_cupboard'];
    expect(puzzle.correctCode).toBe('0317');
    expect(puzzle.rewardItemId).toBe('brass_key_17');
  });

  it('validates Story 2 breaker box requires breaker_fuse', () => {
    const puzzle = PUZZLE_REGISTRY['elevator_breaker_box'];
    expect(puzzle.requiredItemId).toBe('breaker_fuse');
    expect(puzzle.rewardItemId).toBe('maintenance_key');
  });

  it('validates Story 3 hospital safe code (Patient #742 -> 0742)', () => {
    const puzzle = PUZZLE_REGISTRY['hospital_medicine_safe'];
    expect(puzzle.correctCode).toBe('0742');
    expect(puzzle.rewardItemId).toBe('surgical_scalpel');
  });

  it('validates Story 5 mirror cipher (1366 inverted through shard -> 6631)', () => {
    const puzzle = PUZZLE_REGISTRY['mirror_crypt_lock'];
    expect(puzzle.correctCode).toBe('6631');
    expect(puzzle.rewardItemId).toBe('iron_crypt_key');
  });
});

describe('Horror Asset Encounter & Animation Pipeline', () => {
  it('contains registered animated assets across key horror categories', () => {
    const assetKeys = Object.keys(HORROR_ASSETS);
    expect(assetKeys.length).toBeGreaterThanOrEqual(10);

    expect(HORROR_ASSETS['fog_creeping_loop']).toBeDefined();
    expect(HORROR_ASSETS['glitch_vhs_static_cam']).toBeDefined();
    expect(HORROR_ASSETS['face_demon_jumpscare']).toBeDefined();
    expect(HORROR_ASSETS['ghost_banshee_float']).toBeDefined();
    expect(HORROR_ASSETS['demon_she_devil']).toBeDefined();
    expect(HORROR_ASSETS['demon_tall_one']).toBeDefined();
    expect(HORROR_ASSETS['female_weeping_bride']).toBeDefined();
    expect(HORROR_ASSETS['paranormal_blinking_eyes']).toBeDefined();
  });

  it('filters assets correctly by category', () => {
    const ghosts = getAssetsByCategory('ghosts');
    expect(ghosts.length).toBeGreaterThanOrEqual(1);
    expect(ghosts.every(g => g.category === 'ghosts')).toBe(true);

    const faceEncounters = getAssetsByCategory('face-encounters');
    expect(faceEncounters.length).toBeGreaterThanOrEqual(2);
    expect(faceEncounters.every(f => f.category === 'face-encounters')).toBe(true);
  });

  it('selects a valid random face encounter', () => {
    const encounter = getRandomFaceEncounter();
    expect(encounter).toBeDefined();
    expect(encounter.category).toBe('face-encounters');
    expect(encounter.path).toBeDefined();
  });

  it('maps entity IDs to dedicated animated assets', () => {
    const banshee = getEntityAnimation('banshee');
    expect(banshee).toBeDefined();
    expect(banshee?.id).toBe('ghost_banshee_float');

    const sheDevil = getEntityAnimation('she-devil');
    expect(sheDevil).toBeDefined();
    expect(sheDevil?.id).toBe('demon_she_devil');

    const tallOne = getEntityAnimation('tall-one');
    expect(tallOne).toBeDefined();
    expect(tallOne?.id).toBe('demon_tall_one');

    const weepingBride = getEntityAnimation('weeping-bride');
    expect(weepingBride).toBeDefined();
    expect(weepingBride?.id).toBe('female_weeping_bride');
  });

  it('allows dynamic registration of user-dropped custom assets', () => {
    registerCustomAsset({
      id: 'custom_phantom_loop',
      name: 'Custom User Phantom',
      category: 'ghosts',
      path: '/assets/horror/ghosts/custom-phantom.webm',
      type: 'video',
      loop: true,
      description: 'A custom user-added phantom loop.'
    });

    expect(HORROR_ASSETS['custom_phantom_loop']).toBeDefined();
    expect(HORROR_ASSETS['custom_phantom_loop'].name).toBe('Custom User Phantom');
  });
});
