// The Last Door - Encounter Director
import { EncounterType } from './types';

interface EncounterEvent {
  type: EncounterType;
  entityId?: 'tall-one' | 'wall-breather';
  durationMs: number;
  intensity: number; // 0 to 1
  audioCue?: string;
  narrativeText?: string;
}

class EncounterDirector {
  private lastEncounterTime: number = 0;
  private sessionStartTime: number = 0;
  private activeEncounter: EncounterEvent | null = null;
  private minEncounterCooldownMs: number = 18000; // Minimum 18 seconds between events

  constructor() {
    this.sessionStartTime = Date.now();
  }

  public resetSession(): void {
    this.sessionStartTime = Date.now();
    this.lastEncounterTime = Date.now();
    this.activeEncounter = null;
  }

  public evaluateEncounter(
    sceneId: string, 
    currentTension: number, 
    _elapsedSceneTimeMs: number
  ): EncounterEvent | null {
    const now = Date.now();
    const elapsedSessionSeconds = (now - this.sessionStartTime) / 1000;

    // Rule: First 90 seconds are strictly atmospheric anticipation. No sudden manifestations.
    if (elapsedSessionSeconds < 75) {
      return null;
    }

    // Cooldown check
    if (now - this.lastEncounterTime < this.minEncounterCooldownMs) {
      return null;
    }

    // Tension threshold check
    if (currentTension < 50) {
      return null;
    }

    // Probability roll based on tension
    const roll = Math.random();
    const triggerThreshold = (currentTension - 50) / 75; // 0.0 at 50, 0.66 at 100

    if (roll > triggerThreshold) {
      return null; // Nothing happens - silence is intentional!
    }

    // Determine appropriate encounter for scene
    let event: EncounterEvent | null = null;

    if (sceneId === 'house-foyer') {
      if (Math.random() < 0.6) {
        event = {
          type: 'auditory_phantom',
          durationMs: 2500,
          intensity: 0.5,
          audioCue: 'latch_click',
          narrativeText: 'DID YOU HEAR THAT?'
        };
      } else {
        event = {
          type: 'shadow_drift',
          durationMs: 1400,
          intensity: 0.6,
          audioCue: 'wood_creak',
          narrativeText: 'SOMETHING MOVED.'
        };
      }
    } else if (sceneId === 'house-parlor') {
      event = {
        type: 'environmental_shift',
        durationMs: 3000,
        intensity: 0.7,
        narrativeText: 'THE PHOTO IS DIFFERENT.'
      };
    } else if (sceneId === 'house-hallway') {
      if (currentTension > 75) {
        event = {
          type: 'wall_manifestation',
          entityId: 'wall-breather',
          durationMs: 3500,
          intensity: 0.85,
          audioCue: 'deep_breathing',
          narrativeText: 'IT IS INSIDE THE WALL.'
        };
      } else {
        event = {
          type: 'silhouette_distant',
          entityId: 'tall-one',
          durationMs: 1800,
          intensity: 0.7,
          audioCue: 'sub_thud',
          narrativeText: "DON'T LOOK AWAY."
        };
      }
    } else if (sceneId === 'house-impossible-room') {
      event = {
        type: 'wall_manifestation',
        entityId: 'wall-breather',
        durationMs: 4000,
        intensity: 1.0,
        audioCue: 'room_pulse',
        narrativeText: 'YOU WERE NOT THE FIRST.'
      };
    }

    if (event) {
      this.lastEncounterTime = now;
      this.activeEncounter = event;
    }

    return event;
  }

  public getActiveEncounter(): EncounterEvent | null {
    return this.activeEncounter;
  }

  public clearActiveEncounter(): void {
    this.activeEncounter = null;
  }
}

export const encounterDirector = new EncounterDirector();
