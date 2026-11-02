// The Last Door - Audio & Safety HUD
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Eye, LogOut } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';

export const AudioHUD: React.FC = () => {
  const soundEnabled = useSessionStore((state) => state.soundEnabled);
  const setSoundEnabled = useSessionStore((state) => state.setSoundEnabled);
  const reducedMotion = useSessionStore((state) => state.reducedMotion);
  const setReducedMotion = useSessionStore((state) => state.setReducedMotion);
  const exitExperience = useSessionStore((state) => state.exitExperience);
  const tensionLabel = useSessionStore((state) => state.tensionLabel);

  const [isVisible, setIsVisible] = useState(false);

  // Auto-hide HUD on idle
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleActivity = () => {
      setIsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3500);
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
      className={`fixed bottom-4 right-4 z-50 flex items-center space-x-3 transition-opacity duration-700 select-none ${
        isVisible ? 'opacity-90' : 'opacity-20 hover:opacity-90'
      }`}
    >
      {/* Danger / Tension Narrative Indicator */}
      <div className="bg-void/80 border border-dust/15 px-3 py-1 font-mono text-[10px] tracking-widest text-dust backdrop-blur-sm">
        STATUS: <span className="text-bone font-medium">{tensionLabel}</span>
      </div>

      {/* Audio Mute Button */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="p-2 bg-void/80 border border-dust/20 hover:border-bone text-dust hover:text-bone transition-all backdrop-blur-sm cursor-pointer"
        title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
      >
        {soundEnabled ? (
          <Volume2 className="w-3.5 h-3.5" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-crimson" />
        )}
      </button>

      {/* Motion Reduction Toggle */}
      <button
        onClick={() => setReducedMotion(!reducedMotion)}
        className={`p-2 bg-void/80 border transition-all backdrop-blur-sm cursor-pointer ${
          reducedMotion ? 'border-bone text-bone' : 'border-dust/20 text-dust hover:text-bone'
        }`}
        title="Toggle Reduced Motion"
      >
        <Eye className="w-3.5 h-3.5" />
      </button>

      {/* Immediate Safe Exit */}
      <button
        onClick={exitExperience}
        className="p-2 bg-void/80 border border-dust/20 hover:border-crimson text-dust hover:text-crimson transition-all backdrop-blur-sm cursor-pointer"
        title="Emergency Exit to Google"
      >
        <LogOut className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
