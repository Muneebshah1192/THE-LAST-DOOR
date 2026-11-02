// The Last Door - Global Session Store (Zustand)
import { create } from 'zustand';
import { HorrorIntensity, EncounterType, SceneDef } from '../engine/types';
import { SCENES } from '../engine/storyData';
import { memoryEngine } from '../engine/memoryEngine';
import { tensionDirector } from '../engine/tensionDirector';
import { anomalyEngine } from '../engine/anomalyEngine';
import { encounterDirector } from '../engine/encounterDirector';
import { audioDirector } from '../engine/audioDirector';

export type AppStage = 
  | 'opening'
  | 'caution'
  | 'transition'
  | 'cinematic'
  | 'ending'
  | 'archive';

interface SessionState {
  stage: AppStage;
  currentSceneId: string;
  currentScene: SceneDef;
  narrativeTextIndex: number;
  revealedHotspots: string[];
  flashlightPos: { x: number; y: number }; // Percentage 0-100
  
  // Audio & Accessibility
  soundEnabled: boolean;
  reducedMotion: boolean;
  horrorIntensity: HorrorIntensity;
  
  // Tension & Horror Engine dynamic values
  tensionLevel: number;
  tensionLabel: string;
  activeAnomalies: string[];
  activeEncounter: {
    type: EncounterType;
    narrativeText?: string;
    intensity: number;
  } | null;

  // Player Memory
  totalVisits: number;
  theHouseRemembers: boolean;
  parlorPhotoFigureCount: number;
  discoveredRelics: string[];
  discoveredAnomalies: string[];
  unlockedEndings: string[];
  currentEndingKey: string | null;

  // Actions
  setStage: (stage: AppStage) => void;
  proceedFromOpening: () => void;
  enterExperience: (intensity: HorrorIntensity) => void;
  exitExperience: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  updateFlashlight: (x: number, y: number) => void;
  inspectHotspot: (hotspotId: string) => void;
  selectChoice: (choiceId: string, leadsToSceneId: string, tensionImpact: number) => void;
  advanceScene: (targetSceneId: string) => void;
  tickSession: (deltaSeconds: number) => void;
  openArchive: () => void;
  closeArchive: () => void;
  restartExperience: () => void;
}

export const useSessionStore = create<SessionState>((set, get) => {
  const initialMemory = memoryEngine.getMemory();

  return {
    stage: 'opening',
    currentSceneId: 'house-porch',
    currentScene: SCENES['house-porch'],
    narrativeTextIndex: 0,
    revealedHotspots: [],
    flashlightPos: { x: 50, y: 50 },

    soundEnabled: true,
    reducedMotion: false,
    horrorIntensity: 'standard',

    tensionLevel: 10,
    tensionLabel: 'LOW',
    activeAnomalies: [],
    activeEncounter: null,

    totalVisits: initialMemory.totalVisits,
    theHouseRemembers: initialMemory.theHouseRemembers,
    parlorPhotoFigureCount: initialMemory.parlorPhotoFigureCount,
    discoveredRelics: initialMemory.discoveredRelics,
    discoveredAnomalies: initialMemory.discoveredAnomalies,
    unlockedEndings: initialMemory.unlockedEndings,
    currentEndingKey: null,

    setStage: (stage) => set({ stage }),

    proceedFromOpening: () => {
      set({ stage: 'caution' });
    },

    enterExperience: async (intensity) => {
      // Record session in persistent memory
      const { isReturnVisit, visitNumber } = memoryEngine.recordSessionStart();
      
      // Initialize audio
      if (get().soundEnabled) {
        await audioDirector.unlockAudio();
      }

      // Reset directors
      tensionDirector.reset();
      anomalyEngine.reset();
      encounterDirector.resetSession();

      const memory = memoryEngine.getMemory();

      set({
        stage: 'transition',
        horrorIntensity: intensity,
        totalVisits: visitNumber,
        theHouseRemembers: isReturnVisit,
        parlorPhotoFigureCount: memory.parlorPhotoFigureCount,
        currentSceneId: 'house-porch',
        currentScene: SCENES['house-porch'],
        narrativeTextIndex: 0,
        revealedHotspots: [],
        currentEndingKey: null
      });

      // Brief transition delay before entering porch
      setTimeout(() => {
        set({ stage: 'cinematic' });
      }, 2200);
    },

    exitExperience: () => {
      audioDirector.stopAll();
      window.location.href = 'https://www.google.com';
    },

    setSoundEnabled: (enabled) => {
      audioDirector.setMute(!enabled);
      set({ soundEnabled: enabled });
    },

    setReducedMotion: (reduced) => {
      set({ reducedMotion: reduced });
    },

    updateFlashlight: (x, y) => {
      set({ flashlightPos: { x, y } });
    },

    inspectHotspot: (hotspotId) => {
      const state = get();
      const hotspot = state.currentScene.hotspots.find(h => h.id === hotspotId);
      if (!hotspot) return;

      // Add to revealed
      if (!state.revealedHotspots.includes(hotspotId)) {
        set({ revealedHotspots: [...state.revealedHotspots, hotspotId] });
      }

      // Hotspot audio feedback
      if (hotspot.id === 'foyer-clock') {
        audioDirector.startClockTick();
      } else if (hotspot.id === 'porch-door') {
        audioDirector.playDoorLatch();
      } else {
        audioDirector.playFloorCreak();
      }

      // Record relic if present
      if (hotspot.relicId) {
        memoryEngine.recordRelicDiscovered(hotspot.relicId);
        set({ discoveredRelics: memoryEngine.getMemory().discoveredRelics });
      }

      // Anomaly trigger
      if (hotspot.triggersAnomalyId) {
        anomalyEngine.markDiscovered(hotspot.triggersAnomalyId);
        set({ discoveredAnomalies: memoryEngine.getMemory().discoveredAnomalies });
        tensionDirector.modifyTension(12);
      }

      // Hotspot progression logic
      if (hotspot.id === 'porch-door') {
        get().advanceScene('house-foyer');
      } else if (hotspot.id === 'foyer-parlor-arch') {
        get().advanceScene('house-parlor');
      } else if (hotspot.id === 'parlor-hallway-door') {
        get().advanceScene('house-hallway');
      }
    },

    selectChoice: (choiceId, leadsToSceneId, tensionImpact) => {
      const state = get();
      memoryEngine.recordChoice(state.currentSceneId, choiceId);
      tensionDirector.modifyTension(tensionImpact);
      audioDirector.playSubThud(0.8);
      get().advanceScene(leadsToSceneId);
    },

    advanceScene: (targetSceneId) => {
      const nextScene = SCENES[targetSceneId];
      if (!nextScene) return;

      set({ stage: 'transition' });

      // Audio scene transition
      if (targetSceneId === 'house-foyer') {
        audioDirector.playDoorLatch();
        audioDirector.startClockTick();
      } else if (targetSceneId === 'house-hallway') {
        audioDirector.stopClockTick();
      }

      setTimeout(() => {
        tensionDirector.setTargetTension(nextScene.targetTension);

        if (nextScene.isEndingScene) {
          memoryEngine.recordStoryCompleted('the-house-that-breathes', nextScene.endingKey || 'ending_impossible_room');
          const mem = memoryEngine.getMemory();
          set({
            stage: 'cinematic',
            currentSceneId: targetSceneId,
            currentScene: nextScene,
            narrativeTextIndex: 0,
            revealedHotspots: [],
            currentEndingKey: nextScene.endingKey || 'ending_impossible_room',
            unlockedEndings: mem.unlockedEndings
          });
        } else {
          set({
            stage: 'cinematic',
            currentSceneId: targetSceneId,
            currentScene: nextScene,
            narrativeTextIndex: 0,
            revealedHotspots: []
          });
        }
      }, 1800);
    },

    tickSession: (deltaSeconds) => {
      const state = get();
      if (state.stage !== 'cinematic') return;

      // Update tension
      tensionDirector.tick(deltaSeconds);
      const profile = tensionDirector.getProfile();
      audioDirector.applyTension(profile.level);

      // Evaluate scene anomalies
      const activeAnoms = anomalyEngine.evaluateSceneAnomalies(state.currentSceneId, profile.level);

      // Evaluate encounter
      const encounter = encounterDirector.evaluateEncounter(
        state.currentSceneId,
        profile.level,
        deltaSeconds * 1000
      );

      if (encounter) {
        if (encounter.audioCue === 'deep_breathing') {
          audioDirector.playSubThud(0.7);
        } else if (encounter.audioCue === 'latch_click') {
          audioDirector.playDoorLatch();
        } else if (encounter.audioCue === 'wood_creak') {
          audioDirector.playFloorCreak();
        }
      }

      set({
        tensionLevel: profile.level,
        tensionLabel: profile.label,
        activeAnomalies: activeAnoms,
        activeEncounter: encounter ? {
          type: encounter.type,
          narrativeText: encounter.narrativeText,
          intensity: encounter.intensity
        } : null
      });
    },

    openArchive: () => set({ stage: 'archive' }),
    closeArchive: () => set({ stage: get().currentEndingKey ? 'ending' : 'caution' }),

    restartExperience: () => {
      audioDirector.stopAll();
      tensionDirector.reset();
      set({
        stage: 'opening',
        currentSceneId: 'house-porch',
        currentScene: SCENES['house-porch'],
        narrativeTextIndex: 0,
        revealedHotspots: [],
        currentEndingKey: null
      });
    }
  };
});
