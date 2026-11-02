// The Last Door V2 - Dynamic Text Corruption & Glitch Component
import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  corruptChance?: number;
}

const CORRUPT_GLYPHS = ['†', '§', 'Ψ', 'Ø', 'Ж', '0', '3', '1', '7', 'X', '‡'];

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = '',
  corruptChance = 0.12,
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isCorrupted, setIsCorrupted] = useState<boolean>(false);

  useEffect(() => {
    setDisplayText(text);

    const interval = setInterval(() => {
      if (Math.random() < corruptChance) {
        setIsCorrupted(true);
        // Replace random characters with corrupted glyphs
        const chars = text.split('');
        const numToCorrupt = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numToCorrupt; i++) {
          const idx = Math.floor(Math.random() * chars.length);
          if (chars[idx] !== ' ') {
            chars[idx] = CORRUPT_GLYPHS[Math.floor(Math.random() * CORRUPT_GLYPHS.length)];
          }
        }
        setDisplayText(chars.join(''));

        setTimeout(() => {
          setDisplayText(text);
          setIsCorrupted(false);
        }, 220);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [text, corruptChance]);

  return (
    <span
      className={`${className} ${
        isCorrupted ? 'text-blood-distortion transition-none' : 'transition-colors duration-300'
      }`}
    >
      {displayText}
    </span>
  );
};
