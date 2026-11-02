// The Last Door - Horror Engine Type Definitions

export type HorrorIntensity = 'mild' | 'standard' | 'intense';

export type EncounterType = 
  | 'none'
  | 'shadow_drift'
  | 'auditory_phantom'
  | 'environmental_shift'
  | 'reflection_glance'
  | 'silhouette_distant'
  | 'wall_manifestation';

export interface AnomalyDef {
  id: string;
  name: string;
  description: string;
  minTension: number;
  requiresMemory?: boolean; // Only triggers if the house remembers the player
  triggerChance: number; // 0 to 1
  isActive: boolean;
  discovered: boolean;
}

export interface ChoiceOption {
  id: string;
  text: string;
  subtext?: string;
  leadsToSceneId: string;
  tensionImpact: number; // +/- tension change
  memoryTag?: string; // Tag logged to player memory
}

export interface InteractiveHotspot {
  id: string;
  name: string;
  xPercent: number; // 0-100% of viewport
  yPercent: number;
  radiusPercent: number;
  revealsText?: string;
  triggersAnomalyId?: string;
  triggersEncounter?: EncounterType;
  relicId?: string;
  actionText: string;
}

export interface SceneDef {
  id: string;
  title: string;
  locationName: string;
  environmentType: 'porch' | 'foyer' | 'parlor' | 'corridor' | 'impossible_room';
  narrativeText: string[];
  ambientAudioKey: string;
  initialTension: number;
  targetTension: number;
  hotspots: InteractiveHotspot[];
  choices?: ChoiceOption[];
  isEndingScene?: boolean;
  endingKey?: string;
  visualAtmosphere: {
    baseColor: string;
    fogDensity: number; // 0 to 1
    flickerIntensity: number; // 0 to 1
    flashlightIntensity: number; // 0 to 1
    dampness: number; // 0 to 1
  };
}

export interface EndingDef {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  unlocksRelic?: string;
  requiresMemory?: boolean;
}

export interface PlayerMemory {
  schemaVersion: number;
  totalVisits: number;
  completedStories: string[];
  discoveredAnomalies: string[];
  discoveredRelics: string[];
  unlockedEndings: string[];
  choiceHistory: Record<string, string>;
  lastVisitTimestamp: number;
  theHouseRemembers: boolean;
  parlorPhotoFigureCount: number; // Starts at 3, increases to 4 on return visits
}

export interface TensionProfile {
  level: number; // 0 to 100
  label: 'LOW' | 'STABLE' | 'UNSETTLED' | 'UNSTABLE' | 'HIGH' | 'CRITICAL' | 'UNKNOWN';
  cameraSwayAmount: number; // pixels/degrees
  flickerFrequency: number;
  heartbeatBpm: number;
  lowPassCutoffHz: number;
  ambientVolume: number;
  subBassVolume: number;
  anomalyProbability: number;
  encounterProbability: number;
}
