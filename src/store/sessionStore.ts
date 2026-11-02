// The Last Door V2 - Global Session Store (Zustand)
import { create } from 'zustand';
import { HorrorIntensity, EncounterType, SceneDef } from '../engine/types';
import { SCENES } from '../engine/storyData';
import { memoryEngine } from '../engine/memoryEngine';
import { tensionDirector } from '../engine/tensionDirector';
import { anomalyEngine } from '../engine/anomalyEngine';
import { encounterDirector } from '../engine/encounterDirector';
import { creatureDirector, EntityId } from '../engine/creatureDirector';
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
  flashlightBattery: number; // 0 to 100
  flashlightFailure: boolean; // Temporary outage under extreme tension
  
  // Audio & Accessibility
  soundEnabled: boolean;
  volume: number; // 0 to 1
  reducedMotion: boolean;
  horrorIntensity: HorrorIntensity;
  isPaused: boolean;
  
  // Tension & Horror Engine dynamic values
  tensionLevel: number;
  tensionLabel: string;
  activeAnomalies: string[];
  activeEncounter: {
    type: EncounterType;
    narrativeText?: string;
    intensity: number;
  } | null;
  activeCreature: EntityId | null;
  transitionFaceEncounter: EntityId | null;

  // Player Memory
  totalVisits: number;
  theHouseRemembers: boolean;
  parlorPhotoFigureCount: number;
  discoveredRelics: string[];
  discoveredAnomalies: string[];
  discoveredEntities: string[];
  unlockedEndings: string[];
  currentEndingKey: string | null;

  // Actions
  setStage: (stage: AppStage) => void;
  proceedFromOpening: () => void;
  enterExperience: (intensity: HorrorIntensity) => void;
  exitExperience: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  setReducedMotion: (reduced: boolean) => void;
  togglePause: () => void;
  updateFlashlight: (x: number, y: number) => void;
  inspectHotspot: (hotspotId: string) => void;
  performContextAction: (actionType: 'listen' | 'touch' | 'inspect', hotspotId: string) => void;
  selectChoice: (choiceId: string, leadsToSceneId: string, tensionImpact: number) => void;
  advanceScene: (targetSceneId: string) => void;
  clearTransitionEncounter: () => void;
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
    flashlightBattery: 100,
    flashlightFailure: false,

    soundEnabled: true,
    volume: 0.8,
    reducedMotion: false,
    horrorIntensity: 'standard',
    isPaused: false,

    tensionLevel: 12,
    tensionLabel: 'LOW',
    activeAnomalies: [],
    activeEncounter: null,
    activeCreature: null,
    transitionFaceEncounter: null,

    totalVisits: initialMemory.totalVisits,
    theHouseRemembers: initialMemory.theHouseRemembers,
    parlorPhotoFigureCount: initialMemory.parlorPhotoFigureCount,
    discoveredRelics: initialMemory.discoveredRelics,
    discoveredAnomalies: initialMemory.discoveredAnomalies,
    discoveredEntities: [],
    unlockedEndings: initialMemory.unlockedEndings,
    currentEndingKey: null,

    setStage: (stage) => set({ stage }),

    proceedFromOpening: () => {
      set({ stage: 'caution' });
    },

    enterExperience: async (intensity) => {
      const { isReturnVisit, visitNumber } = memoryEngine.recordSessionStart();
      
      if (get().soundEnabled) {
        await audioDirector.unlockAudio();
      }

      tensionDirector.reset();
      anomalyEngine.reset();
      encounterDirector.resetSession();
      creatureDirector.reset();

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
        currentEndingKey: null,
        flashlightBattery: 100,
        flashlightFailure: false,
        activeCreature: null,
        transitionFaceEncounter: null
      });

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

    setVolume: (volume) => {
      audioDirector.setVolume(volume);
      set({ volume });
    },

    setReducedMotion: (reduced) => {
      set({ reducedMotion: reduced });
    },

    togglePause: () => {
      const nextPaused = !get().isPaused;
      if (nextPaused) {
        audioDirector.triggerSuddenSilence(10000);
      }
      set({ isPaused: nextPaused });
    },

    updateFlashlight: (x, y) => {
      set({ flashlightPos: { x, y } });
    },

    inspectHotspot: (hotspotId) => {
      const state = get();
      const hotspot = state.currentScene.hotspots.find(h => h.id === hotspotId);
      if (!hotspot) return;

      if (!state.revealedHotspots.includes(hotspotId)) {
        set({ revealedHotspots: [...state.revealedHotspots, hotspotId] });
      }

      // Audio cues
      if (hotspot.id === 'foyer-clock') {
        audioDirector.startClockTick();
      } else if (hotspot.id === 'porch-door') {
        audioDirector.playDoorLatch();
      } else {
        audioDirector.playFloorCreak();
      }

      if (hotspot.relicId) {
        memoryEngine.recordRelicDiscovered(hotspot.relicId);
        set({ discoveredRelics: memoryEngine.getMemory().discoveredRelics });
      }

      if (hotspot.triggersAnomalyId) {
        anomalyEngine.markDiscovered(hotspot.triggersAnomalyId);
        set({ discoveredAnomalies: memoryEngine.getMemory().discoveredAnomalies });
        tensionDirector.modifyTension(14);
      }

      if (hotspot.id === 'porch-door') {
        get().advanceScene('house-foyer');
      } else if (hotspot.id === 'foyer-parlor-arch') {
        get().advanceScene('house-parlor');
      } else if (hotspot.id === 'parlor-hallway-door') {
        get().advanceScene('house-hallway');
      }
    },

    // Contextual interaction (LISTEN FIRST, TOUCH, etc.)
    performContextAction: (actionType, hotspotId) => {
      if (actionType === 'listen') {
        audioDirector.triggerSuddenSilence(3000);
        setTimeout(() => {
          if (hotspotId === 'porch-door') {
            audioDirector.playGhostWhisper(-0.3);
          } else if (hotspotId === 'foyer-clock') {
            audioDirector.playFloorCreak(0.5);
          } else {
            audioDirector.playBansheeScream(0.2);
          }
        }, 1200);
      }
    },

    selectChoice: (choiceId, leadsToSceneId, tensionImpact) => {
      const state = get();
      memoryEngine.recordChoice(state.currentSceneId, choiceId);
      tensionDirector.modifyTension(tensionImpact);
      audioDirector.playOpeningImpact();
      get().advanceScene(leadsToSceneId);
    },

    advanceScene: (targetSceneId) => {
      const nextScene = SCENES[targetSceneId];
      if (!nextScene) return;

      const currentTension = tensionDirector.getTension();

      // Sudden Face Encounter check on transition! (Section 4)
      let faceEncounter: EntityId | null = null;
      if (currentTension > 45 && Math.random() < 0.4) {
        const scaryEntities: EntityId[] = ['banshee', 'hag', 'she-devil', 'hollow-woman'];
        faceEncounter = scaryEntities[Math.floor(Math.random() * scaryEntities.length)];
      }

      set({ 
        stage: 'transition',
        transitionFaceEncounter: faceEncounter
      });

      if (targetSceneId === 'house-foyer') {
        audioDirector.playDoorLatch();
        audioDirector.startClockTick();
      } else if (targetSceneId === 'house-hallway') {
        audioDirector.stopClockTick();
      }

      // Duration allows FaceReveal if active
      const transitionDuration = faceEncounter ? 2800 : 1800;

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
            unlockedEndings: mem.unlockedEndings,
            transitionFaceEncounter: null
          });
        } else {
          set({
            stage: 'cinematic',
            currentSceneId: targetSceneId,
            currentScene: nextScene,
            narrativeTextIndex: 0,
            revealedHotspots: [],
            transitionFaceEncounter: null
          });
        }
      }, transitionDuration);
    },

    clearTransitionEncounter: () => {
      set({ transitionFaceEncounter: null });
    },

    tickSession: (deltaSeconds) => {
      const state = get();
      if (state.stage !== 'cinematic' || state.isPaused) return;

      tensionDirector.tick(deltaSeconds);
      const profile = tensionDirector.getProfile();
      audioDirector.applyTension(profile.level);

      const activeAnoms = anomalyEngine.evaluateSceneAnomalies(state.currentSceneId, profile.level);

      // Temporary flashlight failure under extreme tension
      if (profile.level > 80 && Math.random() < 0.05 && !state.flashlightFailure) {
        audioDirector.playGlitchStatic();
        set({ flashlightFailure: true });
        setTimeout(() => {
          set({ flashlightFailure: false });
        }, 1600);
      }

      // Creature encounter director tick
      let currentCreature = state.activeCreature;
      if (!currentCreature && Math.random() < 0.1) {
        const nextCreature = creatureDirector.selectNextEntity(profile.level, state.currentSceneId);
        if (nextCreature) {
          currentCreature = nextCreature.id;
          
          // Audio signature
          if (nextCreature.audioSignature === 'banshee_scream') {
            audioDirector.playBansheeScream(0.4);
          } else if (nextCreature.audioSignature === 'weeping') {
            audioDirector.playGhostWhisper(-0.4);
          } else if (nextCreature.audioSignature === 'demonic_growl') {
            audioDirector.playDemonicGrowl(0.1);
          }

          // Auto clear creature after duration
          setTimeout(() => {
            creatureDirector.clearActiveCreature();
            set({ activeCreature: null });
          }, 4500);
        }
      }

      set({
        tensionLevel: profile.level,
        tensionLabel: profile.label,
        activeAnomalies: activeAnoms,
        activeCreature: currentCreature,
      });
    },

    openArchive: () => set({ stage: 'archive' }),
    closeArchive: () => set({ stage: get().currentEndingKey ? 'ending' : 'caution' }),

    restartExperience: () => {
      audioDirector.stopAll();
      tensionDirector.reset();
      creatureDirector.reset();
      set({
        stage: 'opening',
        currentSceneId: 'house-porch',
        currentScene: SCENES['house-porch'],
        narrativeTextIndex: 0,
        revealedHotspots: [],
        currentEndingKey: null,
        flashlightBattery: 100,
        flashlightFailure: false,
        activeCreature: null,
        transitionFaceEncounter: null
      });
    }
  };
});
