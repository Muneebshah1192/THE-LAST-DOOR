// The Last Door V3 - Atmospheric Opening Hook & Prologue
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionStore } from '../store/sessionStore';
import { audioDirector } from '../engine/audioDirector';
import { HorrorMedia } from './HorrorMedia';
import { HORROR_ASSETS } from '../engine/assetRegistry';

export const OpeningSequence: React.FC = () => {
  const proceed = useSessionStore((state) => state.proceedFromOpening);
  const totalVisits = useSessionStore((state) => state.totalVisits);
  const exitExperience = useSessionStore((state) => state.exitExperience);
  const openStoryHub = useSessionStore((state) => state.openStoryHub);

  // Immediate Audio & Horror Hook state
  const [hasStartedAudioHook, setHasStartedAudioHook] = useState<boolean>(false);

  // Scenes 1 to 6
  const [sceneIndex, setSceneIndex] = useState<number>(1);
  const [showFaceFlash, setShowFaceFlash] = useState<boolean>(false);
  const [showSilhouette, setShowSilhouette] = useState<boolean>(false);
  const [corruptedTimestamp, setCorruptedTimestamp] = useState<string>('03:17:42');

  // Trigger audio hook & music effects on first click
  const handleStartAudioHook = async () => {
    setHasStartedAudioHook(true);
    await audioDirector.unlockAudio();
    audioDirector.playOpeningImpact();
    audioDirector.speakHorrorVoice('You should not have opened this. But it has been waiting for you.', 'demon_chief');
  };

  useEffect(() => {
    if (!hasStartedAudioHook) return;

    const timers: NodeJS.Timeout[] = [];

    // Scene 1: 0 - 2400ms (Darkness, breathing, blood red dot)
    timers.push(setTimeout(() => {
      setSceneIndex(2); // Scene 2: "YOU SHOULD NOT HAVE OPENED THIS."
    }, 2400));

    // Scene 2 -> Scene 3: at 6200ms
    timers.push(setTimeout(() => {
      audioDirector.playOpeningImpact();
      setSceneIndex(3); // Scene 3: "IT KNOWS YOU ARE HERE."
    }, 6200));

    // Scene 3 -> Scene 4: at 10000ms
    timers.push(setTimeout(() => {
      setSceneIndex(4); // Scene 4: "DO NOT TRUST WHAT YOU SEE."
    }, 10000));

    // Face flash in Scene 4 at 11200ms
    timers.push(setTimeout(() => {
      setShowFaceFlash(true);
      audioDirector.playFaceStinger();
      setTimeout(() => setShowFaceFlash(false), 380); // Brief 0.38s horrifying glimpse!
    }, 11200));

    // Scene 4 -> Scene 5: at 13800ms
    timers.push(setTimeout(() => {
      audioDirector.playGlitchStatic();
      setSceneIndex(5); // Scene 5: Unknown Signal & Corrupted 03:17:42 timestamp
    }, 13800));

    // Corrupted timestamp jitter effect
    const stampInterval = setInterval(() => {
      if (Math.random() < 0.25) {
        const jitter = Math.random() < 0.5 ? '03:17:41' : '03:17:19';
        setCorruptedTimestamp(jitter);
        setTimeout(() => setCorruptedTimestamp('03:17:42'), 180);
      }
    }, 900);

    // Scene 5 -> Scene 6: at 18000ms
    timers.push(setTimeout(() => {
      setSceneIndex(6); // Scene 6: "IT HAS BEEN WAITING." + Female silhouette
      setShowSilhouette(true);
      setTimeout(() => setShowSilhouette(false), 2400);
      audioDirector.playGhostWhisper(0.2);
    }, 18000));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(stampInterval);
    };
  }, [hasStartedAudioHook]);

  const handleEnterClick = () => {
    audioDirector.playDoorLatch();
    audioDirector.playOpeningImpact();
    proceed();
  };

  return (
    <div 
      className="relative w-screen h-screen bg-void flex flex-col items-center justify-center overflow-hidden z-50 select-none"
    >
      {/* Cinematic Overlays */}
      <div className="cinematic-vignette-blood" />
      <div className="film-grain" />

      {/* INITIAL INTERACTIVE HOOK SCREEN (Immediate Music & Horror Hook) */}
      {!hasStartedAudioHook ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-lg w-full text-center px-6 z-50 space-y-6"
        >
          {/* Pulsing Occult Red Eye / Threshold Keyhole */}
          <div className="flex justify-center mb-4">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-blood/20 animate-ping absolute" />
              <div className="w-10 h-10 rounded-full border border-blood bg-void flex items-center justify-center shadow-[0_0_30px_#A20D19]">
                <div className="w-3 h-3 rounded-full bg-blood animate-pulse" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="font-cinematic text-2xl md:text-3xl tracking-[0.35em] uppercase text-bone drop-shadow-[0_0_20px_rgba(162,13,25,0.7)]">
              THE LAST DOOR
            </h1>
            <p className="font-mono text-xs md:text-sm text-dust/90 tracking-[0.2em] leading-relaxed">
              &ldquo;You can leave whenever you want. But something may remember that you were here.&rdquo;
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <button
              onClick={handleStartAudioHook}
              className="btn-blood-enter w-full py-4 text-xs md:text-sm font-mono tracking-[0.3em] uppercase font-bold cursor-pointer shadow-[0_0_30px_rgba(162,13,25,0.6)] flex items-center justify-center space-x-2"
            >
              <span>🎧 PUT ON HEADPHONES & UNLOCK SOUND</span>
            </button>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  handleStartAudioHook();
                  setTimeout(handleEnterClick, 250);
                }}
                className="flex-1 py-2.5 text-[11px] font-mono tracking-widest uppercase text-bone/80 hover:text-white border border-dust/30 hover:border-blood/60 bg-abyss/80 transition-colors cursor-pointer"
              >
                🚪 ENTER DIRECTLY
              </button>

              <button
                onClick={() => {
                  audioDirector.unlockAudio();
                  openStoryHub();
                }}
                className="py-2.5 px-4 text-[11px] font-mono tracking-widest uppercase text-blood-light hover:text-white border border-blood/30 hover:border-blood/60 bg-abyss/80 transition-colors cursor-pointer"
              >
                CHAPTERS (5)
              </button>
            </div>
          </div>

          <p className="text-[10px] font-mono text-dust/40 tracking-[0.25em]">
            CLICK TO UNSEAL AUDIO ENGINE & ATMOSPHERIC DRONE
          </p>
        </motion.div>
      ) : (
        <>
          {/* Skip Intro Button */}
          <button
            onClick={proceed}
            className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-[0.25em] text-dust/40 hover:text-bone hover:border-b hover:border-dust/40 transition-all z-50 cursor-pointer"
          >
            [SKIP INTRO → ENTER]
          </button>

          {/* SCENE 1: Darkness & Blood-Red Dot */}
          {sceneIndex === 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: [0, 1, 0.8, 0], scale: [0.2, 1.8, 3, 0] }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
              className="w-2.5 h-2.5 rounded-full bg-blood shadow-[0_0_20px_#A20D19]"
            />
          )}

          {/* SCENE 2: "YOU SHOULD NOT HAVE OPENED THIS." */}
          <AnimatePresence>
            {sceneIndex === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: [0.1, 0.95, 0.85, 0.95], scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 1.4 }}
                className="text-center px-6 max-w-xl z-20"
              >
                <h1 className="font-cinematic text-lg md:text-2xl text-blood-distortion tracking-[0.3em] uppercase animate-glitch">
                  YOU SHOULD NOT HAVE OPENED THIS.
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SCENE 3: "IT KNOWS YOU ARE HERE." + Shadow Pass */}
          <AnimatePresence>
            {sceneIndex === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1.2 }}
                className="relative text-center px-6 max-w-xl z-20"
              >
                <motion.div
                  initial={{ x: -250, opacity: 0 }}
                  animate={{ x: 250, opacity: [0, 0.7, 0] }}
                  transition={{ duration: 2.5, ease: 'easeInOut' }}
                  className="absolute -top-12 left-1/2 w-48 h-48 bg-void/90 rounded-full blur-2xl pointer-events-none"
                />
                <h1 className="font-cinematic text-lg md:text-2xl text-bone tracking-[0.3em] uppercase drop-shadow-[0_0_12px_rgba(162,13,25,0.7)]">
                  IT KNOWS YOU ARE HERE.
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SCENE 4: "DO NOT TRUST WHAT YOU SEE." + Face Glimpse */}
          <AnimatePresence>
            {sceneIndex === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0 }}
                className="relative text-center px-6 max-w-xl z-20"
              >
                {showFaceFlash && (
                  <motion.div
                    initial={{ opacity: 0, scale: 1.25 }}
                    animate={{ opacity: 0.95, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 -top-16 flex items-center justify-center pointer-events-none z-10"
                  >
                    <div className="w-96 h-96 drop-shadow-[0_0_60px_#A20D19]">
                      <HorrorMedia
                        asset={HORROR_ASSETS['face_demon_jumpscare']}
                        className="w-full h-full object-contain filter contrast-125"
                      />
                    </div>
                  </motion.div>
                )}

                <h1 className="font-cinematic text-lg md:text-2xl text-bone tracking-[0.25em] uppercase relative z-30">
                  DO NOT TRUST WHAT YOU SEE.
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SCENE 5: Unknown Signal & Corrupted 03:17:42 Timestamp */}
          <AnimatePresence>
            {sceneIndex === 5 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0 }}
                className="relative text-center font-mono space-y-3 px-6 max-w-md z-20 tracking-widest text-xs"
              >
                <div className="absolute inset-0 -inset-x-20 pointer-events-none opacity-25 mix-blend-screen">
                  <HorrorMedia
                    asset={HORROR_ASSETS['glitch_vhs_static_cam']}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-dust/80 relative z-10">SIGNAL DETECTED &mdash; ARCHIVE RECOVERED</p>
                <p className="text-blood font-semibold tracking-[0.2em] animate-pulse relative z-10">
                  UNKNOWN PRESENCE DETECTED
                </p>
                <div className="border border-dust/20 bg-abyss/80 py-3 px-6 mt-4 relative z-10">
                  <p className="text-dust/60 text-[10px]">CORRUPTED RECORDING TIMESTAMP</p>
                  <p className="font-mono text-base md:text-lg text-blood-distortion font-bold pt-1">
                    {corruptedTimestamp}
                  </p>
                </div>
                <p className="text-dust/70 text-[11px] pt-2 relative z-10">LAST KNOWN LOCATION: UNKNOWN</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SCENE 6: "IT HAS BEEN WAITING." + Apparition + Decision */}
          <AnimatePresence>
            {sceneIndex === 6 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4 }}
                className="relative text-center px-6 max-w-lg z-20 space-y-6"
              >
                {showSilhouette && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: [0, 0.75, 0.25] }}
                    transition={{ duration: 2.2 }}
                    className="absolute inset-0 -top-24 flex items-center justify-center pointer-events-none z-0"
                  >
                    <div className="w-80 h-96 opacity-60">
                      <HorrorMedia
                        asset={HORROR_ASSETS['ghost_banshee_float']}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                )}

                <div className="relative z-10 space-y-2">
                  <p className="font-cinematic text-sm md:text-base text-dust tracking-[0.25em] uppercase">
                    IT HAS BEEN WAITING.
                  </p>
                  <h2 className="font-cinematic text-lg md:text-2xl text-bone tracking-[0.25em] uppercase drop-shadow-[0_0_15px_rgba(162,13,25,0.8)]">
                    DO YOU STILL WANT TO ENTER?
                  </h2>
                </div>

                {/* Decision Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 relative z-20">
                  <button
                    onClick={handleEnterClick}
                    className="btn-blood-enter flex-1 py-4 text-xs md:text-sm font-mono tracking-[0.3em] uppercase font-bold cursor-pointer"
                  >
                    ENTER THE HOUSE
                  </button>

                  <button
                    onClick={exitExperience}
                    className="px-6 py-4 text-xs font-mono tracking-[0.2em] uppercase text-dust hover:text-bone border border-dust/20 hover:border-dust/40 transition-colors cursor-pointer"
                  >
                    LEAVE
                  </button>
                </div>

                {totalVisits > 0 && (
                  <p className="text-[10px] font-mono text-blood-light tracking-widest pt-2">
                    [VISIT #{totalVisits + 1} &mdash; THE HOUSE HAS NOT FORGOTTEN]
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Footnote */}
      <div className="absolute bottom-6 text-[10px] text-dust/30 font-mono tracking-widest">
        THE LAST DOOR &mdash; PSYCHOLOGICAL HORROR CINEMA
      </div>
    </div>
  );
};
