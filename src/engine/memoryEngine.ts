// The Last Door - Player Memory Engine
import { PlayerMemory } from './types';

const STORAGE_KEY = 'the_last_door_player_memory_v1';
const CURRENT_SCHEMA_VERSION = 1;

export const DEFAULT_PLAYER_MEMORY: PlayerMemory = {
  schemaVersion: CURRENT_SCHEMA_VERSION,
  totalVisits: 0,
  completedStories: [],
  discoveredAnomalies: [],
  discoveredRelics: [],
  unlockedEndings: [],
  choiceHistory: {},
  lastVisitTimestamp: 0,
  theHouseRemembers: false,
  parlorPhotoFigureCount: 3,
};

class MemoryEngine {
  private memory: PlayerMemory;
  private isStorageAvailable: boolean;

  constructor() {
    this.isStorageAvailable = this.checkStorageAvailability();
    this.memory = this.loadMemory();
  }

  private checkStorageAvailability(): boolean {
    try {
      const testKey = '__tld_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      console.warn('LocalStorage unavailable. Operating in in-memory session mode.');
      return false;
    }
  }

  public loadMemory(): PlayerMemory {
    if (!this.isStorageAvailable) {
      return { ...DEFAULT_PLAYER_MEMORY };
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { ...DEFAULT_PLAYER_MEMORY };
      }

      const parsed = JSON.parse(raw) as Partial<PlayerMemory>;
      
      // Schema migration if version mismatch
      if (!parsed.schemaVersion || parsed.schemaVersion < CURRENT_SCHEMA_VERSION) {
        console.info('Migrating player memory to schema version', CURRENT_SCHEMA_VERSION);
      }

      const merged: PlayerMemory = {
        ...DEFAULT_PLAYER_MEMORY,
        ...parsed,
        totalVisits: typeof parsed.totalVisits === 'number' ? parsed.totalVisits : 0,
        theHouseRemembers: (parsed.totalVisits ?? 0) > 0,
        parlorPhotoFigureCount: (parsed.totalVisits ?? 0) > 0 ? 4 : 3,
      };

      return merged;
    } catch (e) {
      console.error('Failed to parse player memory from localStorage:', e);
      return { ...DEFAULT_PLAYER_MEMORY };
    }
  }

  public saveMemory(): void {
    if (!this.isStorageAvailable) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.memory));
    } catch (e) {
      console.error('Failed to persist player memory:', e);
    }
  }

  public recordSessionStart(): { isReturnVisit: boolean; visitNumber: number } {
    const isReturn = this.memory.totalVisits > 0;
    const currentVisits = this.memory.totalVisits + 1;

    this.memory.totalVisits = currentVisits;
    this.memory.lastVisitTimestamp = Date.now();
    this.memory.theHouseRemembers = isReturn;
    // On return visits, the family portrait now contains a 4th person: the player
    this.memory.parlorPhotoFigureCount = isReturn ? 4 : 3;

    this.saveMemory();

    return {
      isReturnVisit: isReturn,
      visitNumber: currentVisits
    };
  }

  public recordStoryCompleted(storyId: string, endingId: string): void {
    if (!this.memory.completedStories.includes(storyId)) {
      this.memory.completedStories.push(storyId);
    }
    if (!this.memory.unlockedEndings.includes(endingId)) {
      this.memory.unlockedEndings.push(endingId);
    }
    this.saveMemory();
  }

  public recordAnomalyDiscovered(anomalyId: string): void {
    if (!this.memory.discoveredAnomalies.includes(anomalyId)) {
      this.memory.discoveredAnomalies.push(anomalyId);
      this.saveMemory();
    }
  }

  public recordRelicDiscovered(relicId: string): void {
    if (!this.memory.discoveredRelics.includes(relicId)) {
      this.memory.discoveredRelics.push(relicId);
      this.saveMemory();
    }
  }

  public recordChoice(sceneId: string, choiceId: string): void {
    this.memory.choiceHistory[sceneId] = choiceId;
    this.saveMemory();
  }

  public getMemory(): Readonly<PlayerMemory> {
    return this.memory;
  }

  public resetMemory(): void {
    this.memory = { ...DEFAULT_PLAYER_MEMORY };
    if (this.isStorageAvailable) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }
}

export const memoryEngine = new MemoryEngine();
