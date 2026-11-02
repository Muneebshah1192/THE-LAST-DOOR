// The Last Door V2 - Engine Automated Tests
import { describe, it, expect, beforeEach } from 'vitest';
import { memoryEngine } from '../engine/memoryEngine';
import { tensionDirector } from '../engine/tensionDirector';
import { anomalyEngine, INITIAL_ANOMALIES } from '../engine/anomalyEngine';
import { encounterDirector } from '../engine/encounterDirector';
import { creatureDirector, CREATURE_ROSTER } from '../engine/creatureDirector';
import { SCENES, ENDINGS } from '../engine/storyData';

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

describe('Story & Scene Data Integrity', () => {
  it('contains all 5 planned scenes', () => {
    const sceneKeys = Object.keys(SCENES);
    expect(sceneKeys).toEqual([
      'house-porch',
      'house-foyer',
      'house-parlor',
      'house-hallway',
      'house-impossible-room'
    ]);
  });

  it('ensures hallway choices lead to valid target scenes', () => {
    const hallway = SCENES['house-hallway'];
    expect(hallway.choices).toBeDefined();
    expect(hallway.choices?.length).toBe(2);

    hallway.choices?.forEach((choice) => {
      expect(SCENES[choice.leadsToSceneId]).toBeDefined();
    });
  });

  it('contains both planned endings with full taglines and summaries', () => {
    expect(ENDINGS['ending_impossible_room']).toBeDefined();
    expect(ENDINGS['ending_retreat']).toBeDefined();

    expect(ENDINGS['ending_impossible_room'].tagline).toContain('You were not the first person to find this room.');
    expect(ENDINGS['ending_retreat'].tagline).toContain('The door closed. Something stayed behind with you.');
  });
});
