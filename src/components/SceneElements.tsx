// The Last Door V3 - Multi-Story Environments, Puzzles & Devil Encounters
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { SceneDef } from '../engine/types';
import { CreatureEncounter } from './CreatureEncounter';
import { GlitchText } from './GlitchText';
import { KeypadModal } from './KeypadModal';
import { PUZZLE_REGISTRY } from '../engine/puzzleEngine';
import { MASTER_ITEMS } from '../engine/inventoryEngine';
import { audioDirector } from '../engine/audioDirector';

interface SceneElementsProps {
  scene: SceneDef;
  onInspectHotspot: (hotspotId: string) => void;
}

export const SceneElements: React.FC<SceneElementsProps> = ({ scene, onInspectHotspot }) => {
  const flashlightPos = useSessionStore((state) => state.flashlightPos);
  const activeAnomalies = useSessionStore((state) => state.activeAnomalies);
  const parlorPhotoFigureCount = useSessionStore((state) => state.parlorPhotoFigureCount);
  const activeCreature = useSessionStore((state) => state.activeCreature);
  const tensionLevel = useSessionStore((state) => state.tensionLevel);
  const revealedHotspots = useSessionStore((state) => state.revealedHotspots);
  const performContextAction = useSessionStore((state) => state.performContextAction);
  const inventory = useSessionStore((state) => state.inventory);
  const addItemToInventory = useSessionStore((state) => state.addItemToInventory);
  const advanceScene = useSessionStore((state) => state.advanceScene);
  const currentStoryId = useSessionStore((state) => state.currentStoryId);

  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [selectedHotspotForContext, setSelectedHotspotForContext] = useState<string | null>(null);
  const [activeKeypadPuzzleId, setActiveKeypadPuzzleId] = useState<string | null>(null);

  // Check if flashlight beam is hovering near a hotspot
  const isHotspotLit = (xPct: number, yPct: number, radiusPct: number) => {
    const dx = flashlightPos.x - xPct;
    const dy = flashlightPos.y - yPct;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < radiusPct + 10;
  };

  // Stalker eye offset for portrait in parlor
  const eyeDx = Math.max(-2, Math.min(2, (flashlightPos.x - 48) * 0.1));
  const eyeDy = Math.max(-1.5, Math.min(1.5, (flashlightPos.y - 44) * 0.08));

  const showToast = (msg: string, duration: number = 4000) => {
    setActiveMessage(msg);
    setTimeout(() => setActiveMessage(null), duration);
  };

  const handleHotspotClick = (hotspotId: string, revealsText?: string) => {
    // -------------------------------------------------------------
    // STORY 1: PUZZLE INTERACTIONS
    // -------------------------------------------------------------
    if (hotspotId === 'parlor-cupboard') {
      const hasKey = inventory.some((i) => i.id === 'brass_key_17');
      if (hasKey) {
        showToast('THE MANTEL CABINET IS ALREADY UNLOCKED. YOU HOLD KEY 17.');
        return;
      }
      setActiveKeypadPuzzleId('house_mantel_cupboard');
      return;
    }

    if (hotspotId === 'hallway-cellar-door') {
      const hasKey = inventory.some((i) => i.id === 'brass_key_17');
      if (hasKey) {
        audioDirector.playDoorLatch();
        showToast('YOU TURN BRASS KEY 17 IN THE LOCK. THE CELLAR OPENS!');
        setTimeout(() => advanceScene('house-impossible-room'), 1500);
      } else {
        audioDirector.playFloorCreak(-0.2);
        showToast('LOCKED! THE DEADBOLT REQUIRES KEY 17 (INSIDE THE MANTEL CABINET).');
      }
      return;
    }

    if (hotspotId === 'impossible-threshold') {
      audioDirector.playDoorLatch();
      audioDirector.playOpeningImpact();
      showToast('YOU ESCAPE THE HOUSE THAT BREATHES!');
      setTimeout(() => advanceScene('house-impossible-room'), 600);
      return;
    }

    // -------------------------------------------------------------
    // STORY 2: FLOOR 13 PUZZLE INTERACTIONS
    // -------------------------------------------------------------
    if (hotspotId === 'floor13-custodian-corpse') {
      if (!inventory.some((i) => i.id === 'breaker_fuse')) {
        addItemToInventory(MASTER_ITEMS['breaker_fuse']);
        addItemToInventory(MASTER_ITEMS['maintenance_key']);
        audioDirector.playOpeningImpact();
        showToast('COLLECTED: 30A CARTRIDGE FUSE & ELEVATOR SERVICE KEY!');
      } else {
        showToast('TOOLBOX IS EMPTY. YOU ALREADY HOLD THE FUSE AND KEY.');
      }
      return;
    }

    if (hotspotId === 'floor13-breaker-box') {
      const hasFuse = inventory.some((i) => i.id === 'breaker_fuse');
      if (hasFuse) {
        audioDirector.playGlitchStatic();
        showToast('FUSE INSERTED! POWER RESTORED TO EMERGENCY DESCENT GEARS.');
        setTimeout(() => advanceScene('floor13-escape'), 1600);
      } else {
        showToast('BREAKER BLOWN! YOU NEED A 30A FUSE (SEARCH CUSTODIAN TOOLBOX).');
      }
      return;
    }

    if (hotspotId === 'floor13-exit-doors') {
      audioDirector.playDoorLatch();
      showToast('YOU BURST THROUGH THE GROUND FLOOR LOBBY! FLOOR 13 ESCAPED!');
      setTimeout(() => advanceScene('floor13-escape'), 500);
      return;
    }

    // -------------------------------------------------------------
    // STORY 3: THE EMPTY HOSPITAL PUZZLE INTERACTIONS
    // -------------------------------------------------------------
    if (hotspotId === 'hospital-clipboard') {
      if (!inventory.some((i) => i.id === 'patient_chart_742')) {
        addItemToInventory(MASTER_ITEMS['patient_chart_742']);
        showToast('COLLECTED: PATIENT FILE #742 (DISPENSARY SAFE CODE: 0742)');
      } else {
        showToast('FILE #742: SUBJECT UNKNOWN. SAFE CODE: 0742.');
      }
      return;
    }

    if (hotspotId === 'hospital-safe') {
      const hasScalpel = inventory.some((i) => i.id === 'surgical_scalpel');
      if (hasScalpel) {
        showToast('THE DISPENSARY SAFE IS OPEN. YOU HOLD THE SCALPEL.');
        return;
      }
      setActiveKeypadPuzzleId('hospital_medicine_safe');
      return;
    }

    if (hotspotId === 'hospital-biohazard-sheet') {
      const hasScalpel = inventory.some((i) => i.id === 'surgical_scalpel');
      if (hasScalpel) {
        audioDirector.playOpeningImpact();
        showToast('YOU SLICE THROUGH THE BIOHAZARD POLYETHYLENE TO FREEDOM!');
        setTimeout(() => advanceScene('hospital-escape'), 1600);
      } else {
        showToast('REINFORCED PLASTIC! CANNOT TEAR WITH BARE HANDS (NEED SCALPEL).');
      }
      return;
    }

    if (hotspotId === 'hospital-fire-exit') {
      audioDirector.playDoorLatch();
      showToast('YOU BURST INTO THE NIGHT AIR! HOSPITAL ESCAPED!');
      setTimeout(() => advanceScene('hospital-escape'), 500);
      return;
    }

    // -------------------------------------------------------------
    // STORY 4: THE FOREST PUZZLE INTERACTIONS
    // -------------------------------------------------------------
    if (hotspotId === 'forest-cabin') {
      if (!inventory.some((i) => i.id === 'brass_compass')) {
        addItemToInventory(MASTER_ITEMS['brass_compass']);
        addItemToInventory(MASTER_ITEMS['ritual_flint']);
        audioDirector.playFloorCreak(-0.3);
        showToast('COLLECTED: BRASS COMPASS & BLACKENED RITUAL FLINT!');
      } else {
        showToast('CABIN IS EMPTY. YOU HOLD THE COMPASS AND FLINT.');
      }
      return;
    }

    if (hotspotId === 'forest-lantern') {
      advanceScene('forest-altar');
      return;
    }

    if (hotspotId === 'forest-stone-circle') {
      const hasTools = inventory.some((i) => i.id === 'ritual_flint');
      if (hasTools) {
        audioDirector.playOpeningImpact();
        showToast('COLD BLUE FIRE IGNITES ACROSS THE FOUR PILLARS! THE FOG PARTS!');
        setTimeout(() => advanceScene('forest-escape'), 1800);
      } else {
        showToast('THE RUNIC ALTAR REQUIRES RITUAL FLINT TO IGNITE (SEARCH CABIN).');
      }
      return;
    }

    if (hotspotId === 'forest-road-exit') {
      audioDirector.playDoorLatch();
      showToast('YOU REACH THE HIGHWAY! THE BLACKWOOD FOREST IS BROKEN!');
      setTimeout(() => advanceScene('forest-escape'), 500);
      return;
    }

    // -------------------------------------------------------------
    // STORY 5: THE MIRROR PUZZLE INTERACTIONS
    // -------------------------------------------------------------
    if (hotspotId === 'mirror-shard-floor') {
      if (!inventory.some((i) => i.id === 'glass_shard')) {
        addItemToInventory(MASTER_ITEMS['glass_shard']);
        showToast('COLLECTED: SILVERED MIRROR SHARD (INVERTS CIPHERS)');
      } else {
        showToast('LOOKING THROUGH THE SHARD REVERSES 1366 INTO 6631.');
      }
      return;
    }

    if (hotspotId === 'mirror-great-glass') {
      advanceScene('mirror-reversed');
      return;
    }

    if (hotspotId === 'mirror-cipher-box') {
      const hasKey = inventory.some((i) => i.id === 'iron_crypt_key');
      if (hasKey) {
        showToast('CIPHER BOX IS OPEN. YOU HOLD THE IRON CRYPT KEY.');
        return;
      }
      setActiveKeypadPuzzleId('mirror_crypt_lock');
      return;
    }

    if (hotspotId === 'mirror-crypt-gate') {
      const hasKey = inventory.some((i) => i.id === 'iron_crypt_key');
      if (hasKey) {
        audioDirector.playDoorLatch();
        showToast('IRON KEY UNLOCKS THE GATE! THE MIRROR SHATTERS!');
        setTimeout(() => advanceScene('mirror-escape'), 1600);
      } else {
        showToast('BARRED BY HEAVY IRON! REQUIRES IRON CRYPT KEY (SOLVE CIPHER).');
      }
      return;
    }

    if (hotspotId === 'mirror-reality-exit') {
      audioDirector.playOpeningImpact();
      showToast('YOU SHATTERED THE OCCULT MIRROR AND ESCAPED TO REALITY!');
      setTimeout(() => advanceScene('mirror-escape'), 500);
      return;
    }

    // Default inspection
    if (revealsText) {
      showToast(revealsText);
    }
    onInspectHotspot(hotspotId);
  };

  const handleKeypadSolve = (code: string): boolean => {
    if (!activeKeypadPuzzleId) return false;
    const puzzle = PUZZLE_REGISTRY[activeKeypadPuzzleId];
    if (!puzzle) return false;

    if (code === puzzle.correctCode) {
      if (puzzle.rewardItemId && MASTER_ITEMS[puzzle.rewardItemId]) {
        addItemToInventory(MASTER_ITEMS[puzzle.rewardItemId]);
      }
      showToast(puzzle.solvedMessage, 4500);
      return true;
    } else {
      showToast(puzzle.failureMessage, 4000);
      return false;
    }
  };

  const handleContextListen = (hotspotId: string) => {
    performContextAction('listen', hotspotId);
    showToast('YOU PRESS YOUR EAR TO THE SURFACE... SOMETHING IS BREATHING INSIDE.');
    setSelectedHotspotForContext(null);
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Dynamic Dread Vignette pulsed by tensionLevel */}
      {tensionLevel >= 2 && (
        <div
          className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-1000 ${
            tensionLevel >= 4
              ? 'opacity-35 bg-radial-[circle_at_center,_transparent_40%,_rgba(162,13,25,0.45)_100%]'
              : 'opacity-20 bg-radial-[circle_at_center,_transparent_60%,_rgba(162,13,25,0.25)_100%]'
          }`}
        />
      )}

      {/* Dynamic In-Scene Creature Encounter */}
      {activeCreature && (
        <CreatureEncounter
          entityId={activeCreature}
          sceneId={scene.id}
          isFlashlightFocused={flashlightPos.x > 35 && flashlightPos.x < 65}
        />
      )}

      {/* ============================================================= */}
      {/* STORY 1 VISUALS: THE HOUSE THAT BREATHES                      */}
      {/* ============================================================= */}
      {currentStoryId === 'the-house-that-breathes' && scene.id === 'house-porch' && (
        <div className="absolute inset-0 bg-[#050505] flex items-center justify-center">
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <polygon points="0,0 1000,0 900,120 100,120" fill="#08080a" />
            <polygon points="100,440 900,440 1000,600 0,600" fill="#0d0e11" />
            <rect x="100" y="120" width="800" height="320" fill="#101216" />
            <rect x="440" y="170" width="160" height="270" fill="#040405" stroke="#16181d" strokeWidth="4" />
            <polygon points="445,175 570,185 570,435 445,435" fill="#14161a" stroke="#08090b" strokeWidth="2" />
            <polygon points="570,185 600,185 600,435 570,435" fill="#020203" />
            
            {/* DEVIL IN DOORWAY: The Doorway Entity peeking from inside the crack */}
            <g className="opacity-80">
              <ellipse cx="585" cy="270" rx="6" ry="10" fill="#A20D19" />
              <circle cx="584" cy="268" r="1.5" fill="#ffffff" />
              {/* Claws gripping door edge */}
              <line x1="570" y1="280" x2="562" y2="280" stroke="#777777" strokeWidth="2" />
              <line x1="570" y1="285" x2="560" y2="285" stroke="#777777" strokeWidth="2" />
              <line x1="570" y1="290" x2="562" y2="290" stroke="#777777" strokeWidth="2" />
            </g>
          </svg>
        </div>
      )}

      {currentStoryId === 'the-house-that-breathes' && scene.id === 'house-foyer' && (
        <div className="absolute inset-0 bg-[#060608] flex items-center justify-center">
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <polygon points="200,80 800,80 1000,600 0,600" fill="#0e1014" />
            <rect x="440" y="160" width="120" height="260" fill="#050608" stroke="#16181e" strokeWidth="3" />
            
            {/* Grandfather Clock at (250, 160) showing 03:17 */}
            <g transform="translate(250, 160)">
              <rect x="0" y="0" width="70" height="260" fill="#100d0a" stroke="#241d16" strokeWidth="2" />
              <polygon points="0,0 35,-25 70,0" fill="#17120e" stroke="#241d16" strokeWidth="2" />
              <circle cx="35" cy="45" r="26" fill="#080604" stroke="#4d4032" strokeWidth="2" />
              <circle cx="35" cy="45" r="22" fill="#d2cbbe" opacity="0.8" />
              <line x1="35" y1="45" x2="48" y2="45" stroke="#100e0b" strokeWidth="2.5" />
              <line x1="35" y1="45" x2="45" y2="55" stroke="#100e0b" strokeWidth="1.5" />
              <rect x="15" y="85" width="40" height="150" fill="#050403" stroke="#292119" strokeWidth="1.5" />
              <circle cx="35" cy="180" r="12" fill="#7a674f" />
            </g>

            {/* Parlor Archway on Right */}
            <path d="M 680,420 L 680,180 Q 750,130 820,180 L 820,420 Z" fill="#030304" stroke="#1a1c22" strokeWidth="3" />
          </svg>
        </div>
      )}

      {currentStoryId === 'the-house-that-breathes' && scene.id === 'house-parlor' && (
        <div className="absolute inset-0 bg-[#070605] flex items-center justify-center">
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <rect x="250" y="320" width="500" height="280" fill="#100e0b" stroke="#1f1a15" strokeWidth="4" />
            <rect x="370" y="410" width="260" height="190" fill="#040302" />
            <rect x="220" y="300" width="560" height="30" fill="#1a1511" stroke="#2e251d" strokeWidth="3" />

            {/* Locked Mantel Cupboard (Under Mantel at 480, 360) */}
            <g transform="translate(425, 345)">
              <rect x="0" y="0" width="150" height="55" fill="#140f0c" stroke="#4a0e0e" strokeWidth="2" />
              <circle cx="75" cy="28" r="8" fill="#760909" />
              <text x="75" y="31" textAnchor="middle" fill="#D8D6D2" fontSize="9" fontFamily="JetBrains Mono">KEYPAD</text>
            </g>

            {/* Family Photograph on Mantel */}
            <g transform="translate(430, 160)">
              <rect x="0" y="0" width="140" height="135" fill="#14110e" stroke="#756959" strokeWidth="4" rx="2" />
              <rect x="8" y="8" width="124" height="119" fill="#beb6a5" />
              <rect x="28" y="42" width="24" height="42" fill="#24201a" rx="3" />
              <circle cx="40" cy="32" r="9" fill="#9e9482" />
              <circle cx={38 + eyeDx} cy={31 + eyeDy} r="1.2" fill="#430609" />
              <circle cx={42 + eyeDx} cy={31 + eyeDy} r="1.2" fill="#430609" />

              <rect x="60" y="48" width="26" height="38" fill="#2d2822" rx="4" />
              <circle cx="73" cy="38" r="8" fill="#a69c8a" />
              <circle cx={71 + eyeDx} cy={37 + eyeDy} r="1.2" fill="#430609" />
              <circle cx={75 + eyeDx} cy={37 + eyeDy} r="1.2" fill="#430609" />

              <rect x="48" y="65" width="18" height="32" fill="#3f372e" rx="2" />
              <circle cx="57" cy="58" r="6.5" fill="#b0a08c" />

              {/* FIGURE 4: THE MEMORY MECHANIC */}
              {parlorPhotoFigureCount >= 4 && (
                <g className="transition-opacity duration-1000 opacity-95">
                  <rect x="90" y="24" width="22" height="65" fill="#060505" rx="2" />
                  <circle cx="101" cy="18" r="7" fill="#0d0b0a" />
                  <circle cx={99 + eyeDx} cy={18 + eyeDy} r="1.2" fill="#A20D19" />
                  <circle cx={103 + eyeDx} cy={18 + eyeDy} r="1.2" fill="#A20D19" />
                </g>
              )}
            </g>

            {/* DEVIL IN PARLOR CORNER: The Weeping Bride facing the left wall */}
            <g transform="translate(140, 310)" className="opacity-80">
              <path d="M 40 40 Q 15 110 10 180 Q 50 190 90 180 Q 80 110 60 40 Z" fill="#d2cec4" opacity="0.4" stroke="#777777" strokeWidth="1" />
              <ellipse cx="50" cy="28" rx="12" ry="15" fill="#999285" />
              <path d="M 38 18 Q 28 55 35 95" stroke="#101010" strokeWidth="3" fill="none" />
              <path d="M 62 18 Q 72 55 65 95" stroke="#101010" strokeWidth="3" fill="none" />
            </g>

            <rect x="790" y="180" width="130" height="340" fill="#050608" stroke="#16181f" strokeWidth="3" />
          </svg>
        </div>
      )}

      {currentStoryId === 'the-house-that-breathes' && scene.id === 'house-hallway' && (
        <div className={`absolute inset-0 bg-[#070505] flex items-center justify-center ${activeAnomalies.includes('wallBreathing') ? 'anomaly-wall-breathing' : ''}`}>
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <polygon points="0,0 1000,0 580,270 420,270" fill="#060505" />
            <polygon points="0,600 1000,600 580,360 420,360" fill="#0c0a09" />
            <polygon points="0,0 420,270 420,360 0,600" fill="#150d0d" stroke="#241414" strokeWidth="2" />
            <ellipse cx="260" cy="300" rx="90" ry="70" fill="#1f1010" opacity="0.8" />

            {/* Reinforced Locked Cellar Door at (680, 310) */}
            <g transform="translate(630, 240)">
              <rect x="0" y="0" width="90" height="150" fill="#100808" stroke="#760909" strokeWidth="3" />
              <circle cx="75" cy="75" r="5" fill="#5c4530" />
              <text x="45" y="80" textAnchor="middle" fill="#D8D6D2" fontSize="10" fontFamily="JetBrains Mono">KEY 17</text>
            </g>

            {/* DEVIL IN HALLWAY: The Banshee apparition looming at the corridor end */}
            <g className="opacity-90">
              <path d="M 490 275 Q 470 320 460 360 Q 500 365 540 360 Q 530 320 510 275 Z" fill="#050505" />
              <ellipse cx="500" cy="265" rx="8" ry="12" fill="#c7c3ba" stroke="#760909" strokeWidth="1" />
              <ellipse cx="500" cy="270" rx="3" ry="5" fill="#430609" />
            </g>
          </svg>
        </div>
      )}

      {currentStoryId === 'the-house-that-breathes' && scene.id === 'house-impossible-room' && (
        <div className="absolute inset-0 bg-[#030204] flex items-center justify-center">
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <polygon points="80,40 920,80 840,540 160,560" fill="#0a080d" stroke="#1b1423" strokeWidth="4" />
            <polygon points="220,120 780,140 720,460 280,480" fill="#050407" stroke="#120e17" strokeWidth="2" />
            <g transform="translate(500, 290)">
              <text x="0" y="0" textAnchor="middle" fill="#A20D19" fontFamily="Cinzel, serif" fontSize="22" letterSpacing="0.25em">
                YOU ARE NOT THE FIRST.
              </text>
              <line x1="-180" y1="14" x2="180" y2="14" stroke="#760909" strokeWidth="2" />
            </g>
          </svg>
        </div>
      )}

      {/* ============================================================= */}
      {/* STORY 2 VISUALS: FLOOR 13                                     */}
      {/* ============================================================= */}
      {currentStoryId === 'floor-13' && (
        <div className="absolute inset-0 bg-[#060608] flex items-center justify-center">
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            {/* Elevator shaft & concrete corridor */}
            <rect x="150" y="80" width="700" height="440" fill="#090a0d" stroke="#1a1c24" strokeWidth="4" />
            <line x1="150" y1="80" x2="350" y2="200" stroke="#101217" strokeWidth="2" />
            <line x1="850" y1="80" x2="650" y2="200" stroke="#101217" strokeWidth="2" />
            
            {/* DEVIL IN FLOOR 13: The Shadow Child with glowing crimson eyes */}
            <g transform="translate(580, 280)" className="opacity-90">
              <ellipse cx="30" cy="20" rx="10" ry="14" fill="#000000" />
              <path d="M 20 34 Q 10 70 8 110 Q 30 115 52 110 Q 50 70 40 34 Z" fill="#030304" />
              <circle cx="27" cy="18" r="2" fill="#A20D19" />
              <circle cx="33" cy="18" r="2" fill="#A20D19" />
            </g>
          </svg>
        </div>
      )}

      {/* ============================================================= */}
      {/* STORY 3 VISUALS: THE EMPTY HOSPITAL                           */}
      {/* ============================================================= */}
      {currentStoryId === 'the-empty-hospital' && (
        <div className="absolute inset-0 bg-[#040806] flex items-center justify-center">
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <polygon points="100,50 900,50 820,550 180,550" fill="#080e0a" stroke="#15241b" strokeWidth="3" />
            {/* Hospital Beds / Wheelchair */}
            <g transform="translate(240, 320)">
              <circle cx="40" cy="80" r="30" fill="none" stroke="#25352c" strokeWidth="4" />
              <rect x="25" y="30" width="30" height="50" fill="#142019" />
            </g>
            {/* DEVIL IN HOSPITAL: The Crone / Hag peeking from doorway */}
            <g transform="translate(680, 220)" className="opacity-85">
              <ellipse cx="40" cy="40" rx="18" ry="24" fill="#999285" stroke="#430609" strokeWidth="2" />
              <circle cx="35" cy="35" r="3.5" fill="#ffffff" />
              <circle cx="48" cy="35" r="3.5" fill="#ffffff" />
              <path d="M 32 50 Q 42 62 52 50" stroke="#760909" strokeWidth="2.5" fill="none" />
            </g>
          </svg>
        </div>
      )}

      {/* ============================================================= */}
      {/* STORY 4 VISUALS: THE FOREST                                   */}
      {/* ============================================================= */}
      {currentStoryId === 'the-forest' && (
        <div className="absolute inset-0 bg-[#030507] flex items-center justify-center">
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            {/* Pine Trees Silhouette */}
            {[...Array(12)].map((_, i) => (
              <polygon
                key={i}
                points={`${i * 90 + 20},100 ${i * 90 - 20},550 ${i * 90 + 60},550`}
                fill="#070a0e"
              />
            ))}
            {/* DEVIL IN FOREST: The Wraith hovering between pines */}
            <g transform="translate(480, 240)" className="opacity-80">
              <path d="M 40 20 Q 20 80 15 150 Q 50 155 85 150 Q 80 80 60 20 Z" fill="#080e14" opacity="0.6" />
              <ellipse cx="50" cy="25" rx="10" ry="14" fill="#b0c0d0" opacity="0.5" />
              <circle cx="47" cy="22" r="2" fill="#A20D19" />
              <circle cx="53" cy="22" r="2" fill="#A20D19" />
            </g>
          </svg>
        </div>
      )}

      {/* ============================================================= */}
      {/* STORY 5 VISUALS: THE MIRROR                                   */}
      {/* ============================================================= */}
      {currentStoryId === 'the-mirror' && (
        <div className="absolute inset-0 bg-[#060406] flex items-center justify-center">
          <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            {/* Gothic Arch Mirror Frame */}
            <path d="M 400,500 L 400,200 Q 500,100 600,200 L 600,500 Z" fill="#0b080b" stroke="#760909" strokeWidth="4" />
            <path d="M 415,490 L 415,210 Q 500,120 585,210 L 585,490 Z" fill="#141014" />
            {/* DEVIL IN MIRROR: The Mirror Double smiling demon */}
            <g transform="translate(465, 230)" className="opacity-85">
              <ellipse cx="35" cy="40" rx="18" ry="26" fill="#c7c3ba" stroke="#430609" strokeWidth="2" />
              <circle cx="28" cy="36" r="3" fill="#A20D19" />
              <circle cx="42" cy="36" r="3" fill="#A20D19" />
              <path d="M 26 52 Q 35 66 44 52" stroke="#760909" strokeWidth="3" fill="none" />
            </g>
          </svg>
        </div>
      )}

      {/* Interactive Hotspot Targets */}
      {scene.hotspots.map((hotspot) => {
        const lit = isHotspotLit(hotspot.xPercent, hotspot.yPercent, hotspot.radiusPercent);
        const explored = revealedHotspots.includes(hotspot.id);
        const isContextOpen = selectedHotspotForContext === hotspot.id;

        return (
          <div
            key={hotspot.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300"
            style={{
              left: `${hotspot.xPercent}%`,
              top: `${hotspot.yPercent}%`,
            }}
          >
            <div className="relative flex items-center justify-center">
              <button
                onClick={() => setSelectedHotspotForContext(isContextOpen ? null : hotspot.id)}
                className={`group relative flex items-center justify-center p-3.5 rounded-full cursor-pointer transition-all duration-500 ${
                  lit ? 'opacity-100 scale-100' : 'opacity-25 scale-75'
                }`}
                title={hotspot.name}
              >
                <div className="absolute inset-0 rounded-full border border-bone/30 group-hover:border-blood group-hover:scale-125 transition-all duration-300" />
                <div className={`w-3 h-3 rounded-full ${explored ? 'bg-dust/60' : 'bg-bone'} shadow-[0_0_10px_rgba(216,214,210,0.8)]`} />
              </button>

              {/* Contextual Action Flyout Menu */}
              {(lit || isContextOpen) && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-12 whitespace-nowrap bg-void/95 border border-dust/30 p-1 flex flex-col gap-1 backdrop-blur-md shadow-2xl z-40"
                >
                  <button
                    onClick={() => handleHotspotClick(hotspot.id, hotspot.revealsText)}
                    className="px-3 py-1.5 text-[11px] font-mono tracking-widest uppercase text-bone hover:bg-blood/20 hover:text-white text-left transition-colors cursor-pointer"
                  >
                    {hotspot.actionText}
                  </button>

                  <button
                    onClick={() => handleContextListen(hotspot.id)}
                    className="px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase text-dust hover:bg-blood/20 hover:text-blood-light text-left transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>LISTEN FIRST</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        );
      })}

      {/* Subtitle Toast */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 max-w-lg w-full text-center px-4 z-40 pointer-events-none"
          >
            <div className="bg-void/95 border-t border-b border-blood/40 py-2.5 px-6 backdrop-blur-md shadow-[0_0_20px_rgba(118,9,9,0.3)]">
              <p className="font-mono text-xs md:text-sm tracking-widest text-bone">
                <GlitchText text={activeMessage} corruptChance={0.06} />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keypad Modal Popup (For Clock Code 0317, Hospital 0742, Mirror 6631) */}
      {activeKeypadPuzzleId && (
        <KeypadModal
          title={PUZZLE_REGISTRY[activeKeypadPuzzleId]?.title || 'COMBINATION LOCK'}
          promptText={PUZZLE_REGISTRY[activeKeypadPuzzleId]?.promptText || 'ENTER 4-DIGIT CODE'}
          onSolve={handleKeypadSolve}
          onClose={() => setActiveKeypadPuzzleId(null)}
        />
      )}
    </div>
  );
};
