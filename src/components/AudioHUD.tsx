// The Last Door V2 - Audio, Volume & Safety HUD
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Eye, LogOut, Pause, Play } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';

export const AudioHUD: React.FC = () => {
  const soundEnabled = useSessionStore((state) => state.soundEnabled);
  const setSoundEnabled = useSessionStore((state) => state.setSoundEnabled);
  const volume = useSessionStore((state) => state.volume);
  const setVolume = useSessionStore((state) => state.setVolume);
  const reducedMotion = useSessionStore((state) => state.reducedMotion);
  const setReducedMotion = useSessionStore((state) => state.setReducedMotion);
  const isPaused = useSessionStore((state) => state.isPaused);
  const togglePause = useSessionStore((state) => state.togglePause);
  const exitExperience = useSessionStore((state) => state.exitExperience);
  const tensionLabel = useSessionStore((state) => state.tensionLabel);

  const [isVisible, setIsVisible] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Auto-hide HUD on idle
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleActivity = () => {
      setIsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsVisible(false);
        setShowVolumeSlider(false);
      }, 4000);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center space-x-2.5 transition-opacity duration-700 select-none ${
        isVisible ? 'opacity-95' : 'opacity-25 hover:opacity-95'
      }`}
    >
      {/* Danger / Tension Narrative Indicator */}
      <div className="bg-void/85 border border-dust/20 px-3 py-1 font-mono text-[10px] tracking-widest text-dust backdrop-blur-sm shadow-lg">
        STATUS: <span className="text-blood-light font-bold">{tensionLabel}</span>
      </div>

      {/* Volume Slider Popout */}
      {showVolumeSlider && (
        <div className="bg-void/90 border border-dust/20 px-3 py-1.5 backdrop-blur-sm flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={soundEnabled ? volume : 0}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setVolume(val);
              if (val > 0 && !soundEnabled) setSoundEnabled(true);
            }}
            className="w-16 h-1 accent-blood cursor-pointer bg-charcoal"
            title="Master Volume"
          />
          <span className="font-mono text-[9px] text-dust">{Math.round(volume * 100)}%</span>
        </div>
      )}

      {/* Audio Mute & Volume Trigger Button */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowVolumeSlider(!showVolumeSlider);
        }}
        className="p-2 bg-void/85 border border-dust/25 hover:border-bone text-dust hover:text-bone transition-all backdrop-blur-sm cursor-pointer shadow-lg"
        title={soundEnabled ? 'Click to Mute / Right-click for Volume' : 'Click to Unmute'}
      >
        {soundEnabled ? (
          <Volume2 className="w-3.5 h-3.5 text-bone" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-blood-light" />
        )}
      </button>

      {/* Pause / Resume Button */}
      <button
        onClick={togglePause}
        className="p-2 bg-void/85 border border-dust/25 hover:border-bone text-dust hover:text-bone transition-all backdrop-blur-sm cursor-pointer shadow-lg"
        title={isPaused ? 'Resume Experience' : 'Pause Experience'}
      >
        {isPaused ? <Play className="w-3.5 h-3.5 text-blood-light" /> : <Pause className="w-3.5 h-3.5" />}
      </button>

      {/* Motion Reduction Toggle */}
      <button
        onClick={() => setReducedMotion(!reducedMotion)}
        className={`p-2 bg-void/85 border transition-all backdrop-blur-sm cursor-pointer shadow-lg ${
          reducedMotion ? 'border-bone text-bone' : 'border-dust/25 text-dust hover:text-bone'
        }`}
        title="Toggle Reduced Motion"
      >
        <Eye className="w-3.5 h-3.5" />
      </button>

      {/* Immediate Safe Exit */}
      <button
        onClick={exitExperience}
        className="p-2 bg-void/85 border border-dust/25 hover:border-blood text-dust hover:text-blood-light transition-all backdrop-blur-sm cursor-pointer shadow-lg"
        title="Emergency Exit to Google"
      >
        <LogOut className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
