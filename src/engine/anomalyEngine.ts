// The Last Door - Anomaly Engine
import { AnomalyDef } from './types';
import { memoryEngine } from './memoryEngine';

export const INITIAL_ANOMALIES: AnomalyDef[] = [
  {
    id: 'photoShift',
    name: 'The Four-Person Portrait',
    description: 'The vintage photograph on the mantel originally contained three individuals. A fourth shadow now stands behind them.',
    minTension: 30,
    requiresMemory: false,
    triggerChance: 0.8,
    isActive: false,
    discovered: false,
  },
  {
    id: 'wallBreathing',
    name: 'Plaster Respiration',
    description: 'The hallway wallpaper subtly expands and contracts in rhythm with an unseen lung behind the lath.',
    minTension: 45,
    requiresMemory: false,
    triggerChance: 0.9,
    isActive: false,
    discovered: false,
  },
  {
    id: 'clockAnomaly',
    name: 'The Frozen 3:17',
    description: 'The pendulum clock is stopped at 03:17. When attention wanders, the minute hand twitches counter-clockwise.',
    minTension: 20,
    requiresMemory: false,
    triggerChance: 0.75,
    isActive: false,
    discovered: false,
  },
  {
    id: 'shadowLag',
    name: 'Asynchronous Cast Shadow',
    description: 'The flashlight beam moves instantly, but the shadow cast by the doorway threshold delays by a fraction of a second.',
    minTension: 55,
    requiresMemory: false,
    triggerChance: 0.65,
    isActive: false,
    discovered: false,
  },
  {
    id: 'phantomCreak',
    name: 'Proximate Floorboard Depression',
    description: 'A heavy wooden creak resonates from two feet directly behind the observer during absolute stillness.',
    minTension: 40,
    requiresMemory: false,
    triggerChance: 0.7,
    isActive: false,
    discovered: false,
  }
];

class AnomalyEngine {
  private anomalies: Map<string, AnomalyDef> = new Map();

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.anomalies.clear();
    const memory = memoryEngine.getMemory();
    
    INITIAL_ANOMALIES.forEach(a => {
      const isDiscovered = memory.discoveredAnomalies.includes(a.id);
      this.anomalies.set(a.id, {
        ...a,
        isActive: false,
        discovered: isDiscovered
      });
    });
  }

  public evaluateSceneAnomalies(sceneId: string, currentTension: number): string[] {
    const memory = memoryEngine.getMemory();
    const activated: string[] = [];

    this.anomalies.forEach((anomaly) => {
      // Scene-specific suitability
      let isSceneRelevant = false;
      if (sceneId === 'house-parlor' && anomaly.id === 'photoShift') isSceneRelevant = true;
      if (sceneId === 'house-foyer' && (anomaly.id === 'clockAnomaly' || anomaly.id === 'shadowLag')) isSceneRelevant = true;
      if (sceneId === 'house-hallway' && (anomaly.id === 'wallBreathing' || anomaly.id === 'phantomCreak')) isSceneRelevant = true;
      if (sceneId === 'house-impossible-room' && (anomaly.id === 'wallBreathing' || anomaly.id === 'shadowLag')) isSceneRelevant = true;

      if (!isSceneRelevant) {
        anomaly.isActive = false;
        return;
      }

      // Memory rule: If return visit, photoShift is ALWAYS active in parlor
      if (anomaly.id === 'photoShift' && memory.theHouseRemembers && sceneId === 'house-parlor') {
        anomaly.isActive = true;
        activated.push(anomaly.id);
        return;
      }

      // Tension qualification
      if (currentTension >= anomaly.minTension) {
        if (!anomaly.isActive && Math.random() < anomaly.triggerChance) {
          anomaly.isActive = true;
          activated.push(anomaly.id);
        }
      } else {
        // Tension dropped below threshold
        anomaly.isActive = false;
      }
    });

    return activated;
  }

  public markDiscovered(anomalyId: string): void {
    const anomaly = this.anomalies.get(anomalyId);
    if (anomaly && !anomaly.discovered) {
      anomaly.discovered = true;
      memoryEngine.recordAnomalyDiscovered(anomalyId);
    }
  }

  public isAnomalyActive(anomalyId: string): boolean {
    return this.anomalies.get(anomalyId)?.isActive ?? false;
  }

  public getAnomaly(anomalyId: string): AnomalyDef | undefined {
    return this.anomalies.get(anomalyId);
  }

  public getAllAnomalies(): AnomalyDef[] {
    return Array.from(this.anomalies.values());
  }
}

export const anomalyEngine = new AnomalyEngine();
