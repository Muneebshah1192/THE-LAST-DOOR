// The Last Door V3 - 5 Complete Interactive Horror Stories & Escape Logic
import { SceneDef, EndingDef } from './types';

export interface StoryOverview {
  id: string;
  number: number;
  title: string;
  tagline: string;
  location: string;
  primaryDevil: string;
  initialSceneId: string;
  unlockedByDefault: boolean;
}

export const STORIES: StoryOverview[] = [
  {
    id: 'the-house-that-breathes',
    number: 1,
    title: 'The House That Breathes',
    tagline: 'You were not the first person to find this room.',
    location: '1924 Craftsman Residence',
    primaryDevil: 'The Banshee & The Wall Breather',
    initialSceneId: 'house-porch',
    unlockedByDefault: true
  },
  {
    id: 'floor-13',
    number: 2,
    title: 'Floor 13',
    tagline: 'Floor 13 remembers you.',
    location: 'Old Victorian Apartment Elevator',
    primaryDevil: 'The Shadow Child & The Doorway Entity',
    initialSceneId: 'floor13-elevator',
    unlockedByDefault: false
  },
  {
    id: 'the-empty-hospital',
    number: 3,
    title: 'The Empty Hospital',
    tagline: 'Patient: You. Wrong room.',
    location: 'Abandoned St. Jude Psychiatric Ward',
    primaryDevil: 'The Crone / Hag & The Hollow Woman',
    initialSceneId: 'hospital-reception',
    unlockedByDefault: false
  },
  {
    id: 'the-forest',
    number: 4,
    title: 'The Forest',
    tagline: 'You were not walking in circles.',
    location: 'Blackwood Pine Wilderness',
    primaryDevil: 'The Wraith & The Red-Eyed Stalker',
    initialSceneId: 'forest-path',
    unlockedByDefault: false
  },
  {
    id: 'the-mirror',
    number: 5,
    title: 'The Mirror',
    tagline: 'That is not your reflection.',
    location: 'Sealed Occult Chamber',
    primaryDevil: 'The Mirror Double & The She-Devil',
    initialSceneId: 'mirror-chamber',
    unlockedByDefault: false
  }
];

export const SCENES: Record<string, SceneDef> = {
  // ==========================================
  // STORY 1: THE HOUSE THAT BREATHES
  // ==========================================
  'house-porch': {
    id: 'house-porch',
    title: 'The Porch',
    locationName: 'STORY 01 &mdash; THE PORCH',
    environmentType: 'porch',
    narrativeText: [
      'RAIN HAMMERS THE ROTTED CEDAR.',
      'THE FRONT DOOR RESTS OPEN TEN CENTIMETERS.',
      'SOMEONE LEFT IT OPEN.'
    ],
    ambientAudioKey: 'rain_porch',
    initialTension: 15,
    targetTension: 25,
    visualAtmosphere: {
      baseColor: '#050505',
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
    locationName: 'STORY 01 &mdash; THE FROZEN FOYER',
    environmentType: 'foyer',
    narrativeText: [
      'THE DOOR CLICKED SHUT BEHIND YOU.',
      'SILENCE.',
      'THE GRANDFATHER CLOCK IS STOPPED AT 03:17.'
    ],
    ambientAudioKey: 'foyer_hum',
    initialTension: 28,
    targetTension: 45,
    visualAtmosphere: {
      baseColor: '#060608',
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
        actionText: 'INSPECT CLOCK (03:17)',
        revealsText: 'THE PENDULUM IS FROZEN AT EXACTLY 03:17. REMEMBER THIS TIME.',
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
      },
      {
        id: 'foyer-back-porch',
        name: 'Front Entry Doorway',
        xPercent: 10,
        yPercent: 55,
        radiusPercent: 14,
        actionText: 'STEP BACK OUT TO PORCH',
        revealsText: 'THE COLD RAIN STILL BEATS AGAINST THE CEDAR PORCH.'
      }
    ]
  },

  'house-parlor': {
    id: 'house-parlor',
    title: 'The Parlor',
    locationName: 'STORY 01 &mdash; THE PARLOR & MANTEL',
    environmentType: 'parlor',
    narrativeText: [
      'DUST PARTICLES DRIFT THROUGH THE BEAM.',
      'A FAMILY PORTRAIT RESTS ABOVE A LOCKED CABINET.',
      'TORN JOURNAL PAGES ARE STAINED ON THE RUG.'
    ],
    ambientAudioKey: 'parlor_drone',
    initialTension: 48,
    targetTension: 65,
    visualAtmosphere: {
      baseColor: '#070605',
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
        yPercent: 36,
        radiusPercent: 14,
        actionText: 'EXAMINE PHOTOGRAPH',
        revealsText: 'THE EYES OF THE FAMILY FOLLOW YOUR FLASHLIGHT BEAM.',
        relicId: 'family_photograph_1924',
        triggersAnomalyId: 'photoShift'
      },
      {
        id: 'parlor-cupboard',
        name: 'Locked Mantel Cabinet',
        xPercent: 48,
        yPercent: 58,
        radiusPercent: 16,
        actionText: 'OPEN 4-DIGIT COMBINATION LOCK',
        revealsText: 'ENTER THE 4-DIGIT CODE CORRESPONDING TO THE CLOCK TIME.'
      },
      {
        id: 'parlor-hallway-door',
        name: 'Corridor Passage',
        xPercent: 82,
        yPercent: 50,
        radiusPercent: 16,
        actionText: 'PROCEED TO CORRIDOR',
        revealsText: 'THE AIR GROWS CHOKINGLY HEAVY.'
      },
      {
        id: 'parlor-back-foyer',
        name: 'Foyer Doorway',
        xPercent: 10,
        yPercent: 55,
        radiusPercent: 14,
        actionText: 'RETURN TO FOYER & GRANDFATHER CLOCK',
        revealsText: 'RETURNING TO THE FROZEN GRANDFATHER CLOCK.'
      }
    ]
  },

  'house-hallway': {
    id: 'house-hallway',
    title: 'The Breathing Corridor',
    locationName: 'STORY 01 &mdash; THE BREATHING HALLWAY',
    environmentType: 'corridor',
    narrativeText: [
      'THE WALLPAPER IS LIFTING FROM THE PLASTER.',
      'IN AND OUT. A HORRIFIC RESPIRATION.',
      'THE CELLAR DOOR AT THE REAR IS LOCKED SHUT (NEEDS KEY 17).'
    ],
    ambientAudioKey: 'hallway_breath',
    initialTension: 68,
    targetTension: 85,
    visualAtmosphere: {
      baseColor: '#070505',
      fogDensity: 0.5,
      flickerIntensity: 0.55,
      flashlightIntensity: 0.75,
      dampness: 0.6
    },
    hotspots: [
      {
        id: 'hallway-wall',
        name: 'The Bulging Plaster',
        xPercent: 36,
        yPercent: 46,
        radiusPercent: 20,
        actionText: 'TOUCH WALLPAPER',
        revealsText: 'A FAINT PULSE. WARM BLOOD BENEATH LIME PLASTER.',
        triggersAnomalyId: 'wallBreathing'
      },
      {
        id: 'hallway-cellar-door',
        name: 'Reinforced Cellar Door',
        xPercent: 68,
        yPercent: 52,
        radiusPercent: 18,
        actionText: 'UNLOCK CELLAR WITH KEY 17',
        revealsText: 'USE THE BRASS KEY FROM THE MANTEL CUPBOARD TO ESCAPE.'
      },
      {
        id: 'hallway-back-parlor',
        name: 'Parlor Entrance Doorway',
        xPercent: 10,
        yPercent: 55,
        radiusPercent: 14,
        actionText: 'RETURN TO PARLOR & MANTEL',
        revealsText: 'STEPPING BACK INTO THE PARLOR TO SOLVE THE MANTEL LOCK.'
      }
    ]
  },

  'house-impossible-room': {
    id: 'house-impossible-room',
    title: 'The Impossible Room',
    locationName: 'STORY 01 &mdash; ESCAPE THRESHOLD',
    environmentType: 'impossible_room',
    narrativeText: [
      'YOU UNLOCKED THE CELLAR AND BROKE THROUGH THE REAR WALL.',
      'A ROOM WITH NO EXTERIOR WINDOWS.',
      'WRITTEN IN BLOOD: "YOU ARE NOT THE FIRST."'
    ],
    ambientAudioKey: 'void_drone',
    initialTension: 88,
    targetTension: 100,
    isEndingScene: true,
    endingKey: 'ending_impossible_room',
    visualAtmosphere: {
      baseColor: '#030204',
      fogDensity: 0.75,
      flickerIntensity: 0.7,
      flashlightIntensity: 0.6,
      dampness: 0.95
    },
    hotspots: [
      {
        id: 'impossible-threshold',
        name: 'The Escape Latch',
        xPercent: 50,
        yPercent: 50,
        radiusPercent: 25,
        actionText: 'ESCAPE THE HOUSE',
        revealsText: 'YOU BURST THROUGH THE STORM DOOR INTO THE NIGHT!',
        relicId: 'house_inscription'
      }
    ]
  },

  // ==========================================
  // STORY 2: FLOOR 13
  // ==========================================
  'floor13-elevator': {
    id: 'floor13-elevator',
    title: 'The Elevator',
    locationName: 'STORY 02 &mdash; ELEVATOR CABIN',
    environmentType: 'foyer',
    narrativeText: [
      'THE ELEVATOR DISPLAY FLICKERED FROM 12 TO 13.',
      'THE DOORS OPENED INTO COMPLETE DARKNESS.',
      'A DISTANT CHILDLIKE HUMMING SOUND ECHOES OUTSIDE.'
    ],
    ambientAudioKey: 'elevator_hum',
    initialTension: 35,
    targetTension: 55,
    visualAtmosphere: {
      baseColor: '#08080a',
      fogDensity: 0.5,
      flickerIntensity: 0.4,
      flashlightIntensity: 0.8,
      dampness: 0.3
    },
    hotspots: [
      {
        id: 'elevator-button-panel',
        name: 'Elevator Control Panel',
        xPercent: 32,
        yPercent: 48,
        radiusPercent: 16,
        actionText: 'INSPECT PANEL',
        revealsText: 'BUTTON 13 IS EMBOSSED IN DRIED CRIMSON. THE BREAKER HAS BLOWN.'
      },
      {
        id: 'elevator-doorway',
        name: 'Floor 13 Threshold',
        xPercent: 65,
        yPercent: 50,
        radiusPercent: 20,
        actionText: 'STEP INTO HALLWAY',
        revealsText: 'COLD AIR CUTS ACROSS YOUR FACE. THERE ARE NO APARTMENTS HERE.'
      }
    ]
  },

  'floor13-hallway': {
    id: 'floor13-hallway',
    title: 'Floor 13 Maintenance Corridor',
    locationName: 'STORY 02 &mdash; PITCH BLACK CORRIDOR',
    environmentType: 'corridor',
    narrativeText: [
      'CONCRETE WALLS DRIPPING MOISTURE.',
      'A DISTANT SILHOUETTE STANDS AT THE FAR END.',
      'EVERY TIME YOU LOOK AWAY, IT IS CLOSER.'
    ],
    ambientAudioKey: 'hallway_breath',
    initialTension: 58,
    targetTension: 78,
    visualAtmosphere: {
      baseColor: '#050507',
      fogDensity: 0.65,
      flickerIntensity: 0.6,
      flashlightIntensity: 0.7,
      dampness: 0.8
    },
    hotspots: [
      {
        id: 'floor13-breaker-box',
        name: 'Blown Breaker Box',
        xPercent: 35,
        yPercent: 45,
        radiusPercent: 18,
        actionText: 'INSTALL 30A CARTRIDGE FUSE',
        revealsText: 'THE CERAMIC FUSE RESEATS. POWER RESTORES TO THE EMERGENCY SHAFT!'
      },
      {
        id: 'floor13-custodian-corpse',
        name: 'Custodian Toolbox',
        xPercent: 70,
        yPercent: 60,
        radiusPercent: 16,
        actionText: 'SEARCH TOOLBOX',
        revealsText: 'YOU FOUND A 30A FUSE AND THE TRIANGULAR ELEVATOR SERVICE KEY!',
        relicId: 'breaker_fuse'
      },
      {
        id: 'floor13-back-elevator',
        name: 'Elevator Doors',
        xPercent: 10,
        yPercent: 55,
        radiusPercent: 14,
        actionText: 'STEP BACK INTO ELEVATOR',
        revealsText: 'RETREATING BACK INTO THE ELEVATOR CAB.'
      }
    ]
  },

  'floor13-escape': {
    id: 'floor13-escape',
    title: 'Emergency Shaft Escape',
    locationName: 'STORY 02 &mdash; GROUND FLOOR ESCAPE',
    environmentType: 'impossible_room',
    narrativeText: [
      'THE MANUAL SERVICE KEY ENGAGES THE DESCENT GEARS.',
      'THE CABIN PLUMMETS PAST FLOORS 12, 11, 10...',
      'THE DOORS OPEN ONTO GROUND FLOOR. YOU ARE FREE.'
    ],
    ambientAudioKey: 'elevator_hum',
    initialTension: 75,
    targetTension: 95,
    isEndingScene: true,
    endingKey: 'ending_floor13_escape',
    visualAtmosphere: {
      baseColor: '#0a0a0d',
      fogDensity: 0.3,
      flickerIntensity: 0.2,
      flashlightIntensity: 0.9,
      dampness: 0.2
    },
    hotspots: [
      {
        id: 'floor13-exit-doors',
        name: 'Lobby Exit',
        xPercent: 50,
        yPercent: 50,
        radiusPercent: 22,
        actionText: 'BURST INTO LOBBY',
        revealsText: 'FLOOR 13 REMEMBERS YOU. BUT TONIGHT YOU SURVIVED.',
        relicId: 'elevator_key'
      }
    ]
  },

  // ==========================================
  // STORY 3: THE EMPTY HOSPITAL
  // ==========================================
  'hospital-reception': {
    id: 'hospital-reception',
    title: 'Psychiatric Reception',
    locationName: 'STORY 03 &mdash; ST. JUDE WARD',
    environmentType: 'foyer',
    narrativeText: [
      'FLICKERING GREEN FLUORESCENT TUBES.',
      'A WHEELCHAIR DRIFTS TWO FEET FORWARD ON ITS OWN.',
      'PATIENT CLIPBOARD #742 RESTS ON THE COUNTER.'
    ],
    ambientAudioKey: 'hospital_drone',
    initialTension: 38,
    targetTension: 58,
    visualAtmosphere: {
      baseColor: '#060a08',
      fogDensity: 0.45,
      flickerIntensity: 0.4,
      flashlightIntensity: 0.8,
      dampness: 0.5
    },
    hotspots: [
      {
        id: 'hospital-clipboard',
        name: 'Patient File #742',
        xPercent: 36,
        yPercent: 52,
        radiusPercent: 16,
        actionText: 'READ PATIENT FILE (CODE 0742)',
        revealsText: 'SUBJECT DIAGNOSIS: UNKNOWN. DISPENSARY SAFE CODE: 0742.',
        relicId: 'patient_chart_742'
      },
      {
        id: 'hospital-ward-door',
        name: 'Ward Hallway Door',
        xPercent: 75,
        yPercent: 48,
        radiusPercent: 18,
        actionText: 'ENTER QUARANTINE HALLWAY',
        revealsText: 'AN IRREGULAR MONITOR BEEP ECHOES DOWN THE CORRIDOR.'
      }
    ]
  },

  'hospital-hallway': {
    id: 'hospital-hallway',
    title: 'Ward Hallway & Safe',
    locationName: 'STORY 03 &mdash; QUARANTINE CORRIDOR',
    environmentType: 'corridor',
    narrativeText: [
      'ROOM 204 MONITORS BEEP: "PATIENT: YOU."',
      'THE DISPENSARY SAFE FLASHES A RED 4-DIGIT KEYPAD.',
      'THE REAR CORRIDOR IS TAPED WITH HEAVY BIOHAZARD POLYETHYLENE.'
    ],
    ambientAudioKey: 'heartbeat_monitor',
    initialTension: 60,
    targetTension: 80,
    visualAtmosphere: {
      baseColor: '#070b07',
      fogDensity: 0.55,
      flickerIntensity: 0.6,
      flashlightIntensity: 0.75,
      dampness: 0.7
    },
    hotspots: [
      {
        id: 'hospital-safe',
        name: 'Dispensary Safe',
        xPercent: 34,
        yPercent: 46,
        radiusPercent: 18,
        actionText: 'ENTER 4-DIGIT SAFE CODE (0742)',
        revealsText: 'BEEP! SAFE UNLATCHES. YOU ACQUIRE THE SURGICAL SCALPEL!'
      },
      {
        id: 'hospital-biohazard-sheet',
        name: 'Biohazard Polyethylene Seal',
        xPercent: 72,
        yPercent: 52,
        radiusPercent: 20,
        actionText: 'CUT PLASTIC SEAL WITH SCALPEL',
        revealsText: 'USE THE SURGICAL SCALPEL FROM THE DISPENSARY SAFE TO ESCAPE.'
      },
      {
        id: 'hospital-back-reception',
        name: 'Reception Corridor Doors',
        xPercent: 10,
        yPercent: 55,
        radiusPercent: 14,
        actionText: 'RETURN TO RECEPTION & DISPENSARY SAFE',
        revealsText: 'RETURNING TO NURSE STATION AND DISPENSARY SAFE.'
      }
    ]
  },

  'hospital-escape': {
    id: 'hospital-escape',
    title: 'Morgue Exterior Escape',
    locationName: 'STORY 03 &mdash; REAR FIRE EXIT',
    environmentType: 'impossible_room',
    narrativeText: [
      'THE SCALPEL SLICES THROUGH THE HEAVY PLASTIC.',
      'A VOICE WHISPERS FROM ROOM 204: "WRONG ROOM."',
      'YOU SPRINT THROUGH THE FIRE EXIT INTO THE RAIN!'
    ],
    ambientAudioKey: 'hospital_drone',
    initialTension: 80,
    targetTension: 98,
    isEndingScene: true,
    endingKey: 'ending_hospital_escape',
    visualAtmosphere: {
      baseColor: '#050705',
      fogDensity: 0.4,
      flickerIntensity: 0.2,
      flashlightIntensity: 0.9,
      dampness: 0.8
    },
    hotspots: [
      {
        id: 'hospital-fire-exit',
        name: 'Emergency Exit Door',
        xPercent: 50,
        yPercent: 50,
        radiusPercent: 22,
        actionText: 'BURST INTO FREEDOM',
        revealsText: 'YOU ESCAPED ST. JUDE WARD. PATIENT RECORD CLOSED.',
        relicId: 'hospital_id_band'
      }
    ]
  },

  // ==========================================
  // STORY 4: THE FOREST
  // ==========================================
  'forest-path': {
    id: 'forest-path',
    title: 'The Fog Trail',
    locationName: 'STORY 04 &mdash; BLACKWOOD PINES',
    environmentType: 'porch',
    narrativeText: [
      'MOONLIGHT BARELY PENETRATES THE FOG.',
      'A LONE LANTERN FLOATS 30 METERS AHEAD.',
      'NO ONE IS HOLDING IT.'
    ],
    ambientAudioKey: 'wind_forest',
    initialTension: 35,
    targetTension: 55,
    visualAtmosphere: {
      baseColor: '#040608',
      fogDensity: 0.8,
      flickerIntensity: 0.2,
      flashlightIntensity: 0.8,
      dampness: 0.9
    },
    hotspots: [
      {
        id: 'forest-lantern',
        name: 'Moving Lantern',
        xPercent: 48,
        yPercent: 44,
        radiusPercent: 16,
        actionText: 'FOLLOW LANTERN',
        revealsText: 'THE LANTERN GLIDES BETWEEN TWO WEATHERED OAK TREES.'
      },
      {
        id: 'forest-cabin',
        name: 'Rotted Trapper Cabin',
        xPercent: 78,
        yPercent: 50,
        radiusPercent: 18,
        actionText: 'SEARCH CABIN',
        revealsText: 'INSIDE AN OLD TACK BOX YOU DISCOVER A BRASS COMPASS AND FLINT!',
        relicId: 'brass_compass'
      }
    ]
  },

  'forest-altar': {
    id: 'forest-altar',
    title: 'The Stone Cairn Altar',
    locationName: 'STORY 04 &mdash; THE STONE CIRCLE',
    environmentType: 'corridor',
    narrativeText: [
      'YOU REALIZE YOU HAVE BEEN WALKING IN AN UNNATURAL CIRCLE.',
      'FOUR STONE PILLARS STAND MARKED WITH RUNES: N, E, S, W.',
      'USE FLINT & COMPASS TO IGNITE THE CARDINAL TORCHES.'
    ],
    ambientAudioKey: 'wind_forest',
    initialTension: 65,
    targetTension: 85,
    visualAtmosphere: {
      baseColor: '#040507',
      fogDensity: 0.7,
      flickerIntensity: 0.5,
      flashlightIntensity: 0.7,
      dampness: 0.85
    },
    hotspots: [
      {
        id: 'forest-stone-circle',
        name: 'Runic Cairn Pillars',
        xPercent: 50,
        yPercent: 48,
        radiusPercent: 22,
        actionText: 'IGNITE RUNES (N -> E -> S -> W)',
        revealsText: 'COLD FLAMES ROAR TO LIFE! THE FOG SHATTERS TO THE EAST.'
      },
      {
        id: 'forest-back-path',
        name: 'Pine Fog Trail',
        xPercent: 10,
        yPercent: 55,
        radiusPercent: 14,
        actionText: 'RETREAT TO MISTY PINE TRAIL',
        revealsText: 'FOLLOWING THE TRACKS BACK INTO THE FOG.'
      }
    ]
  },

  'forest-escape': {
    id: 'forest-escape',
    title: 'The Highway Crossing',
    locationName: 'STORY 04 &mdash; FOREST ROAD EXIT',
    environmentType: 'impossible_room',
    narrativeText: [
      'THE CURSE OF THE LOOP BROKEN.',
      'DISTANT HEADLIGHTS CUT THROUGH THE RAIN-SOAKED ASPHALT.',
      'A FINAL VOICE FROM THE TREES: "YOU WERE NOT WALKING IN CIRCLES."'
    ],
    ambientAudioKey: 'wind_forest',
    initialTension: 75,
    targetTension: 95,
    isEndingScene: true,
    endingKey: 'ending_forest_escape',
    visualAtmosphere: {
      baseColor: '#030406',
      fogDensity: 0.35,
      flickerIntensity: 0.15,
      flashlightIntensity: 0.9,
      dampness: 0.7
    },
    hotspots: [
      {
        id: 'forest-road-exit',
        name: 'The Asphalt Road',
        xPercent: 50,
        yPercent: 50,
        radiusPercent: 25,
        actionText: 'STEP ONTO THE ROAD',
        revealsText: 'YOU ESCAPED BLACKWOOD WILDERNESS. THE FOREST REMAINS BEHIND.',
        relicId: 'pine_needle_cluster'
      }
    ]
  },

  // ==========================================
  // STORY 5: THE MIRROR
  // ==========================================
  'mirror-chamber': {
    id: 'mirror-chamber',
    title: 'Occult Antechamber',
    locationName: 'STORY 05 &mdash; THE MIRROR ROOM',
    environmentType: 'parlor',
    narrativeText: [
      'A SINGLE MAHOGANY CHAIR FACES A FULL-LENGTH GOTHIC MIRROR.',
      'YOUR REFLECTION MOVES IN STEP WITH YOU.',
      'THEN: THE REFLECTION STOPS MOVING.'
    ],
    ambientAudioKey: 'mirror_hum',
    initialTension: 40,
    targetTension: 60,
    visualAtmosphere: {
      baseColor: '#070507',
      fogDensity: 0.3,
      flickerIntensity: 0.35,
      flashlightIntensity: 0.85,
      dampness: 0.2
    },
    hotspots: [
      {
        id: 'mirror-shard-floor',
        name: 'Shattered Mirror Shards',
        xPercent: 32,
        yPercent: 62,
        radiusPercent: 15,
        actionText: 'PICK UP MIRROR SHARD',
        revealsText: 'YOU RETRIEVE A SILVERED SHARD. LOOKING THROUGH IT INVERTS PERSPECTIVE!',
        relicId: 'glass_shard'
      },
      {
        id: 'mirror-great-glass',
        name: 'The Great Gothic Mirror',
        xPercent: 60,
        yPercent: 42,
        radiusPercent: 20,
        actionText: 'CONFRONT REFLECTION',
        revealsText: 'THE REFLECTION TURNS ITS HEAD SLOWLY TOWARDS YOU AND SMILES.'
      }
    ]
  },

  'mirror-reversed': {
    id: 'mirror-reversed',
    title: 'Reversed Chamber',
    locationName: 'STORY 05 &mdash; BEHIND THE GLASS',
    environmentType: 'corridor',
    narrativeText: [
      'YOU STEPPED INTO THE MIRROR CORRIDOR.',
      'EVERY OBJECT IN THE ROOM IS REVERSED.',
      'A DRIED BLOOD CIPHER READS: 1366. INVERTED IS 6631.'
    ],
    ambientAudioKey: 'mirror_hum',
    initialTension: 65,
    targetTension: 85,
    visualAtmosphere: {
      baseColor: '#080406',
      fogDensity: 0.45,
      flickerIntensity: 0.55,
      flashlightIntensity: 0.75,
      dampness: 0.4
    },
    hotspots: [
      {
        id: 'mirror-cipher-box',
        name: 'Reversed Cipher Box',
        xPercent: 38,
        yPercent: 48,
        radiusPercent: 18,
        actionText: 'ENTER 4-DIGIT MIRROR CODE (6631)',
        revealsText: 'CLICK! SECRET COMPARTMENT OPENS. YOU RETRIEVE THE IRON CRYPT KEY!'
      },
      {
        id: 'mirror-crypt-gate',
        name: 'Iron Crypt Gate',
        xPercent: 72,
        yPercent: 50,
        radiusPercent: 20,
        actionText: 'UNLOCK GATE WITH IRON KEY',
        revealsText: 'USE THE IRON CRYPT KEY TO SHATTER THE ILLUSION AND ESCAPE.'
      },
      {
        id: 'mirror-back-chamber',
        name: 'Shattered Mirror Frame',
        xPercent: 10,
        yPercent: 55,
        radiusPercent: 14,
        actionText: 'STEP BACK INTO MIRROR CHAMBER',
        revealsText: 'STEPPING BACK THROUGH THE SILVERED GLASS REFLECTION.'
      }
    ]
  },

  'mirror-escape': {
    id: 'mirror-escape',
    title: 'Shattered Reality Escape',
    locationName: 'STORY 05 &mdash; WAKING REALITY',
    environmentType: 'impossible_room',
    narrativeText: [
      'THE IRON KEY TURNS IN THE FRAME LOCK.',
      'THE MIRROR SHATTERS INTO TEN THOUSAND PIECES.',
      'YOU STEP INTO SUNLIGHT. BUT YOUR REFLECTION IS GONE.'
    ],
    ambientAudioKey: 'void_drone',
    initialTension: 80,
    targetTension: 100,
    isEndingScene: true,
    endingKey: 'ending_mirror_escape',
    visualAtmosphere: {
      baseColor: '#050305',
      fogDensity: 0.25,
      flickerIntensity: 0.1,
      flashlightIntensity: 0.95,
      dampness: 0.1
    },
    hotspots: [
      {
        id: 'mirror-reality-exit',
        name: 'The Real World Threshold',
        xPercent: 50,
        yPercent: 50,
        radiusPercent: 25,
        actionText: 'STEP INTO REALITY',
        revealsText: 'THE LAST DOOR HAS BEEN CLOSED. YOU SURVIVED ALL 5 UNIVERSES.',
        relicId: 'shattered_glass_relic'
      }
    ]
  }
};

export const ENDINGS: Record<string, EndingDef> = {
  'ending_impossible_room': {
    id: 'ending_impossible_room',
    title: 'STORY 01 ESCAPED &mdash; THE DISCOVERY',
    tagline: 'You solved the frozen clock, unlocked the cellar, and escaped The House That Breathes.',
    summary: 'You used the 03:17 clock combination to unlock the mantel cabinet, took Key 17, and unlatched the cellar passage. Story 02: Floor 13 is now unlocked!',
    unlocksRelic: 'brass_key_17'
  },
  'ending_retreat': {
    id: 'ending_retreat',
    title: 'STORY 01 &mdash; THE CLOSURE',
    tagline: 'The door closed. Something stayed behind with you.',
    summary: 'You escaped the cedar porch before the latch permanently sealed your presence.',
    unlocksRelic: 'damp_cedar_scrap'
  },
  'ending_floor13_escape': {
    id: 'ending_floor13_escape',
    title: 'STORY 02 ESCAPED &mdash; THE RETURN TO GROUND',
    tagline: 'Floor 13 remembers you. But you overrode the descent.',
    summary: 'By replacing the 30-amp ceramic cartridge fuse and engaging the emergency custodian triangular key, you forced the elevator back to the ground floor. Story 03: The Empty Hospital is now unlocked!',
    unlocksRelic: 'elevator_key'
  },
  'ending_hospital_escape': {
    id: 'ending_hospital_escape',
    title: 'STORY 03 ESCAPED &mdash; DISCHARGED',
    tagline: 'Patient: You. Wrong room. You severed the seal.',
    summary: 'Using Patient Chart #742 to crack the digital narcotics safe, you obtained the surgical scalpel and sliced through the biohazard quarantine barrier. Story 04: The Forest is now unlocked!',
    unlocksRelic: 'hospital_id_band'
  },
  'ending_forest_escape': {
    id: 'ending_forest_escape',
    title: 'STORY 04 ESCAPED &mdash; THE BROKEN LOOP',
    tagline: 'You were not walking in circles. You lit the stone altar.',
    summary: 'Using the erratic brass compass and blackened ritual flint, you ignited the four cardinal stone pillars in sequence. The fog parted, revealing the highway. Story 05: The Mirror is now unlocked!',
    unlocksRelic: 'pine_needle_cluster'
  },
  'ending_mirror_escape': {
    id: 'ending_mirror_escape',
    title: 'STORY 05 ESCAPED &mdash; SHATTERED ETERNITY',
    tagline: 'That was not your reflection. The mirror has been broken.',
    summary: 'By reading the inverted dried blood cipher 6631 through the silvered glass shard, you unlatched the crypt gate and escaped back into waking reality. All 5 stories conquered!',
    unlocksRelic: 'shattered_glass_relic'
  }
};
