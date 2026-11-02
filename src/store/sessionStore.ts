// The Last Door V3 - Global Session Store with 5 Stories & Inventory
import { create } from 'zustand';
import { HorrorIntensity, EncounterType, SceneDef } from '../engine/types';
import { SCENES, STORIES } from '../engine/storyData';
import { memoryEngine } from '../engine/memoryEngine';
import { tensionDirector } from '../engine/tensionDirector';
import { anomalyEngine } from '../engine/anomalyEngine';
import { encounterDirector } from '../engine/encounterDirector';
import { creatureDirector, EntityId } from '../engine/creatureDirector';
import { audioDirector } from '../engine/audioDirector';
import { InventoryItem, MASTER_ITEMS } from '../engine/inventoryEngine';

export type AppStage = 
  | 'opening'
  | 'caution'
  | 'story-hub'
  | 'transition'
  | 'cinematic'
  | 'ending'
  | 'archive';

interface SessionState {
  stage: AppStage;
  currentStoryId: string;
  currentSceneId: string;
  currentScene: SceneDef;
  narrativeTextIndex: number;
  revealedHotspots: string[];
  flashlightPos: { x: number; y: number };
  flashlightBattery: number;
  flashlightFailure: boolean;
  
  // Inventory & Evidence
  inventory: InventoryItem[];
  selectedItemId: string | null;

  // Audio & Accessibility
  soundEnabled: boolean;
  volume: number;
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
  
  // Inventory actions
  addItemToInventory: (item: InventoryItem) => void;
  removeItemFromInventory: (itemId: string) => void;
  setSelectedItemId: (itemId: string | null) => void;

  // Story & Scene actions
  inspectHotspot: (hotspotId: string) => void;
  performContextAction: (actionType: 'listen' | 'touch' | 'inspect', hotspotId: string) => void;
  selectChoice: (choiceId: string, leadsToSceneId: string, tensionImpact: number) => void;
  advanceScene: (targetSceneId: string) => void;
  switchStory: (storyId: string) => void;
  clearTransitionEncounter: () => void;
  tickSession: (deltaSeconds: number) => void;
  openArchive: () => void;
  closeArchive: () => void;
  openStoryHub: () => void;
  restartExperience: () => void;
}

export const useSessionStore = create<SessionState>((set, get) => {
  const initialMemory = memoryEngine.getMemory();

  return {
    stage: 'opening',
    currentStoryId: 'the-house-that-breathes',
    currentSceneId: 'house-porch',
    currentScene: SCENES['house-porch'],
    narrativeTextIndex: 0,
    revealedHotspots: [],
    flashlightPos: { x: 50, y: 50 },
    flashlightBattery: 100,
    flashlightFailure: false,

    inventory: [MASTER_ITEMS['torn_journal_page']], // Initial journal entry clue
    selectedItemId: null,

    soundEnabled: true,
    volume: 0.8,
    reducedMotion: false,
    horrorIntensity: 'standard',
    isPaused: false,

    tensionLevel: 15,
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
      const storyId = get().currentStoryId;
      const initialSceneKey = STORIES.find(s => s.id === storyId)?.initialSceneId || 'house-porch';

      set({
        stage: 'transition',
        horrorIntensity: intensity,
        totalVisits: visitNumber,
        theHouseRemembers: isReturnVisit,
        parlorPhotoFigureCount: memory.parlorPhotoFigureCount,
        currentSceneId: initialSceneKey,
        currentScene: SCENES[initialSceneKey],
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
      }, 2000);
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

    addItemToInventory: (item) => {
      const current = get().inventory;
      if (!current.some((i) => i.id === item.id)) {
        set({ inventory: [...current, item] });
      }
    },

    removeItemFromInventory: (itemId) => {
      set({
        inventory: get().inventory.filter((i) => i.id !== itemId),
        selectedItemId: get().selectedItemId === itemId ? null : get().selectedItemId
      });
    },

    setSelectedItemId: (itemId) => {
      set({ selectedItemId: itemId });
    },

    inspectHotspot: (hotspotId) => {
      const state = get();
      const hotspot = state.currentScene.hotspots.find(h => h.id === hotspotId);
      if (!hotspot) return;

      if (!state.revealedHotspots.includes(hotspotId)) {
        set({ revealedHotspots: [...state.revealedHotspots, hotspotId] });
      }

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
      } else if (hotspot.id === 'elevator-doorway') {
        get().advanceScene('floor13-hallway');
      } else if (hotspot.id === 'hospital-ward-door') {
        get().advanceScene('hospital-hallway');
      }
    },

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
        }, 1000);
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

      // Sudden Face Encounter check
      let faceEncounter: EntityId | null = null;
      if (currentTension > 45 && Math.random() < 0.45) {
        const scaryEntities: EntityId[] = ['banshee', 'hag', 'she-devil', 'hollow-woman'];
        faceEncounter = scaryEntities[Math.floor(Math.random() * scaryEntities.length)];
      }

      set({ 
        stage: 'transition',
        transitionFaceEncounter: faceEncounter
      });

      if (targetSceneId.includes('foyer') || targetSceneId.includes('elevator')) {
        audioDirector.playDoorLatch();
        audioDirector.startClockTick();
      } else {
        audioDirector.stopClockTick();
      }

      const transitionDuration = faceEncounter ? 2800 : 1600;

      setTimeout(() => {
        tensionDirector.setTargetTension(nextScene.targetTension);

        if (nextScene.isEndingScene) {
          const endingKey = nextScene.endingKey || 'ending_impossible_room';
          memoryEngine.recordStoryCompleted(get().currentStoryId, endingKey);
          const mem = memoryEngine.getMemory();
          set({
            stage: 'ending',
            currentSceneId: targetSceneId,
            currentScene: nextScene,
            narrativeTextIndex: 0,
            revealedHotspots: [],
            currentEndingKey: endingKey,
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

    switchStory: (storyId) => {
      const story = STORIES.find(s => s.id === storyId) || STORIES[0];
      const initialScene = SCENES[story.initialSceneId];

      audioDirector.playOpeningImpact();

      set({
        currentStoryId: story.id,
        currentSceneId: story.initialSceneId,
        currentScene: initialScene,
        stage: 'transition',
        narrativeTextIndex: 0,
        revealedHotspots: [],
        currentEndingKey: null,
        inventory: story.id === 'the-house-that-breathes' ? [MASTER_ITEMS['torn_journal_page']] : []
      });

      setTimeout(() => {
        set({ stage: 'cinematic' });
      }, 1800);
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

      // Flashlight glitch
      if (profile.level > 80 && Math.random() < 0.05 && !state.flashlightFailure) {
        audioDirector.playGlitchStatic();
        set({ flashlightFailure: true });
        setTimeout(() => {
          set({ flashlightFailure: false });
        }, 1600);
      }

      // Creature encounter director tick
      let currentCreature = state.activeCreature;
      if (!currentCreature && Math.random() < 0.12) {
        const nextCreature = creatureDirector.selectNextEntity(profile.level, state.currentSceneId);
        if (nextCreature) {
          currentCreature = nextCreature.id;
          
          if (nextCreature.audioSignature === 'banshee_scream') {
            audioDirector.playBansheeScream(0.4);
          } else if (nextCreature.audioSignature === 'weeping') {
            audioDirector.playGhostWhisper(-0.4);
          } else if (nextCreature.audioSignature === 'demonic_growl') {
            audioDirector.playDemonicGrowl(0.1);
          }

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
    openStoryHub: () => set({ stage: 'story-hub' }),

    restartExperience: () => {
      audioDirector.stopAll();
      tensionDirector.reset();
      creatureDirector.reset();
      const storyId = get().currentStoryId;
      const initialSceneKey = STORIES.find(s => s.id === storyId)?.initialSceneId || 'house-porch';

      set({
        stage: 'caution',
        currentSceneId: initialSceneKey,
        currentScene: SCENES[initialSceneKey],
        narrativeTextIndex: 0,
        revealedHotspots: [],
        currentEndingKey: null,
        flashlightBattery: 100,
        flashlightFailure: false,
        activeCreature: null,
        transitionFaceEncounter: null,
        inventory: storyId === 'the-house-that-breathes' ? [MASTER_ITEMS['torn_journal_page']] : []
      });
    }
  };
});
