// The Last Door - Story Definition: The House That Breathes
import { SceneDef, EndingDef } from './types';

export const STORY_ID = 'the-house-that-breathes';
export const STORY_TITLE = 'The House That Breathes';

export const SCENES: Record<string, SceneDef> = {
  'house-porch': {
    id: 'house-porch',
    title: 'The Porch',
    locationName: 'THE THRESHOLD',
    environmentType: 'porch',
    narrativeText: [
      'RAIN HAMMERS THE ROTTED CEDAR.',
      'THE FRONT DOOR RESTS OPEN TEN CENTIMETERS.',
      'SOMEONE LEFT IT OPEN.'
    ],
    ambientAudioKey: 'rain_porch',
    initialTension: 12,
    targetTension: 22,
    visualAtmosphere: {
      baseColor: '#0a0b0e',
      fogDensity: 0.6,
      flickerIntensity: 0.1,
      flashlightIntensity: 0.9,
      dampness: 0.85
    },
    hotspots: [
      {
        id: 'porch-door',
        name: 'The Open Door',
        xPercent: 52,
        yPercent: 48,
        radiusPercent: 18,
        actionText: 'STEP INSIDE',
        revealsText: 'THE FLOOR CREAKS UNDER YOUR WEIGHT.'
      }
    ]
  },

  'house-foyer': {
    id: 'house-foyer',
    title: 'The Foyer',
    locationName: 'THE FROZEN FOYER',
    environmentType: 'foyer',
    narrativeText: [
      'THE DOOR CLICKED SHUT BEHIND YOU.',
      'SILENCE.',
      'THE GRANDFATHER CLOCK IS STOPPED AT 03:17.'
    ],
    ambientAudioKey: 'foyer_hum',
    initialTension: 28,
    targetTension: 42,
    visualAtmosphere: {
      baseColor: '#08090b',
      fogDensity: 0.4,
      flickerIntensity: 0.25,
      flashlightIntensity: 0.85,
      dampness: 0.4
    },
    hotspots: [
      {
        id: 'foyer-clock',
        name: 'Grandfather Clock',
        xPercent: 30,
        yPercent: 50,
        radiusPercent: 14,
        actionText: 'INSPECT CLOCK',
        revealsText: 'FROZEN AT 03:17. THE SECOND HAND HAS NO GEARS.',
        relicId: 'brass_pocket_watch',
        triggersAnomalyId: 'clockAnomaly'
      },
      {
        id: 'foyer-parlor-arch',
        name: 'Parlor Archway',
        xPercent: 72,
        yPercent: 52,
        radiusPercent: 18,
        actionText: 'ENTER PARLOR',
        revealsText: 'A FAINT WARMTH EMANATES FROM THE HEARTH.'
      }
    ]
  },

  'house-parlor': {
    id: 'house-parlor',
    title: 'The Parlor',
    locationName: 'THE PARLOR & THE PORTRAIT',
    environmentType: 'parlor',
    narrativeText: [
      'DUST PARTICLES DRIFT THROUGH THE BEAM.',
      'ON THE MANTEL: A SILVER FRAME.',
      'A FAMILY PORTRAIT DATED OCTOBER 1924.'
    ],
    ambientAudioKey: 'parlor_drone',
    initialTension: 45,
    targetTension: 62,
    visualAtmosphere: {
      baseColor: '#0b0908',
      fogDensity: 0.35,
      flickerIntensity: 0.3,
      flashlightIntensity: 0.8,
      dampness: 0.3
    },
    hotspots: [
      {
        id: 'parlor-photo',
        name: 'Family Photograph',
        xPercent: 48,
        yPercent: 44,
        radiusPercent: 15,
        actionText: 'EXAMINE PHOTOGRAPH',
        revealsText: 'THREE PEOPLE. MAN, WOMAN, CHILD. UNBLINKING.',
        relicId: 'family_photograph_1924',
        triggersAnomalyId: 'photoShift'
      },
      {
        id: 'parlor-hallway-door',
        name: 'Corridor Passage',
        xPercent: 82,
        yPercent: 50,
        radiusPercent: 16,
        actionText: 'PROCEED TO CORRIDOR',
        revealsText: 'THE AIR GROWS HEAVIER.'
      }
    ]
  },

  'house-hallway': {
    id: 'house-hallway',
    title: 'The Breathing Corridor',
    locationName: 'THE BREATHING HALLWAY',
    environmentType: 'corridor',
    narrativeText: [
      'THE WALLPAPER IS LIFTING FROM THE PLASTER.',
      'IN AND OUT.',
      'SYNCHRONIZED WITH YOUR OWN BREATH.'
    ],
    ambientAudioKey: 'hallway_breath',
    initialTension: 65,
    targetTension: 84,
    visualAtmosphere: {
      baseColor: '#0c0707',
      fogDensity: 0.5,
      flickerIntensity: 0.55,
      flashlightIntensity: 0.75,
      dampness: 0.6
    },
    hotspots: [
      {
        id: 'hallway-wall',
        name: 'The Bulging Plaster',
        xPercent: 42,
        yPercent: 46,
        radiusPercent: 20,
        actionText: 'TOUCH WALLPAPER',
        revealsText: 'A FAINT PULSE. WARM BLOOD BENEATH LIME PLASTER.',
        triggersAnomalyId: 'wallBreathing'
      }
    ],
    choices: [
      {
        id: 'choice-cellar',
        text: 'DESCEND TO CELLAR STAIRS',
        subtext: 'The wooden steps lead into pitch darkness.',
        leadsToSceneId: 'house-impossible-room',
        tensionImpact: 15,
        memoryTag: 'chose_cellar'
      },
      {
        id: 'choice-upper',
        text: 'FORCE OPEN UPPER PASSAGE',
        subtext: 'The frame resists before giving way.',
        leadsToSceneId: 'house-impossible-room',
        tensionImpact: 10,
        memoryTag: 'chose_upper'
      }
    ]
  },

  'house-impossible-room': {
    id: 'house-impossible-room',
    title: 'The Impossible Room',
    locationName: 'THE ROOM THAT SHOULD NOT BE',
    environmentType: 'impossible_room',
    narrativeText: [
      'A ROOM WITH NO EXTERIOR WINDOWS.',
      'ITS DIMENSIONS EXCEED THE FOOTPRINT OF THE HOUSE.',
      'THE DOOR BEHIND YOU HAS NO HANDLE.'
    ],
    ambientAudioKey: 'void_drone',
    initialTension: 85,
    targetTension: 98,
    isEndingScene: true,
    endingKey: 'ending_impossible_room',
    visualAtmosphere: {
      baseColor: '#050406',
      fogDensity: 0.75,
      flickerIntensity: 0.7,
      flashlightIntensity: 0.6,
      dampness: 0.95
    },
    hotspots: [
      {
        id: 'impossible-threshold',
        name: 'The Inscription',
        xPercent: 50,
        yPercent: 50,
        radiusPercent: 25,
        actionText: 'APPROACH WALL',
        revealsText: 'CARVED INTO DRY MORTAR: "YOU ARE NOT THE FIRST."',
        relicId: 'house_inscription'
      }
    ]
  }
};

export const ENDINGS: Record<string, EndingDef> = {
  'ending_impossible_room': {
    id: 'ending_impossible_room',
    title: 'THE DISCOVERY',
    tagline: 'You were not the first person to find this room.',
    summary: 'The house accommodated your curiosity. Its walls expanded to receive you, sealing the perimeter behind your footsteps. The room exists nowhere on city blueprints.',
    unlocksRelic: 'carved_door_splinter'
  },
  'ending_retreat': {
    id: 'ending_retreat',
    title: 'THE CLOSURE',
    tagline: 'The door closed. Something stayed behind with you.',
    summary: 'You reached the porch before the latch permanently settled. The rain was cold, real, and indifferent. But in quiet rooms, you will still hear the rhythm inside the walls.',
    unlocksRelic: 'damp_cedar_scrap'
  }
};
