// The Last Door V3 - Tactile Numerical Keypad & Combination Lock Modal
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Delete, Check } from 'lucide-react';
import { audioDirector } from '../engine/audioDirector';

interface KeypadModalProps {
  title: string;
  promptText: string;
  onSolve: (code: string) => boolean; // returns true if correct
  onClose: () => void;
}

export const KeypadModal: React.FC<KeypadModalProps> = ({
  title,
  promptText,
  onSolve,
  onClose,
}) => {
  const [digits, setDigits] = useState<string>('');
  const [errorStatus, setErrorStatus] = useState<boolean>(false);
  const [successStatus, setSuccessStatus] = useState<boolean>(false);

  const handlePress = (num: string) => {
    if (digits.length < 4 && !successStatus) {
      audioDirector.playGlitchStatic();
      setDigits((prev) => prev + num);
      setErrorStatus(false);
    }
  };

  const handleDelete = () => {
    setDigits((prev) => prev.slice(0, -1));
    setErrorStatus(false);
  };

  const handleEnter = () => {
    if (digits.length === 4) {
      const isCorrect = onSolve(digits);
      if (isCorrect) {
        audioDirector.playDoorLatch();
        setSuccessStatus(true);
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        audioDirector.playDemonicGrowl(0);
        setErrorStatus(true);
        setTimeout(() => {
          setDigits('');
          setErrorStatus(false);
        }, 1400);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-md p-4 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="max-w-sm w-full bg-abyss border border-dust/20 p-6 md:p-8 shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-dust hover:text-bone transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-cinematic text-sm md:text-base tracking-[0.25em] text-bone uppercase mb-2">
          {title}
        </h3>
        <p className="font-sans text-[11px] text-dust/80 leading-relaxed mb-6">
          {promptText}
        </p>

        {/* Digital LED Display */}
        <div className={`border p-4 text-center font-mono text-2xl tracking-[0.4em] mb-6 transition-all ${
          successStatus
            ? 'border-green-800 bg-green-950/40 text-green-400'
            : errorStatus
            ? 'border-blood bg-blood-dried/40 text-blood-light animate-pulse'
            : 'border-dust/30 bg-void/80 text-bone'
        }`}>
          {digits.padEnd(4, '•')}
        </div>

        {/* 10-Key Pad */}
        <div className="grid grid-cols-3 gap-2.5 font-mono text-sm">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handlePress(digit)}
              className="btn-cinematic py-3.5 text-center text-bone font-medium hover:text-white cursor-pointer"
            >
              {digit}
            </button>
          ))}
          <button
            onClick={handleDelete}
            className="btn-cinematic py-3.5 flex items-center justify-center text-dust hover:text-bone cursor-pointer"
            title="Delete"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            onClick={() => handlePress('0')}
            className="btn-cinematic py-3.5 text-center text-bone font-medium hover:text-white cursor-pointer"
          >
            0
          </button>
          <button
            onClick={handleEnter}
            disabled={digits.length !== 4}
            className={`py-3.5 flex items-center justify-center transition-all cursor-pointer ${
              digits.length === 4
                ? 'bg-blood hover:bg-blood-crimson text-white font-bold shadow-[0_0_15px_rgba(162,13,25,0.6)]'
                : 'bg-void/40 border border-dust/10 text-dust/30 cursor-not-allowed'
            }`}
            title="Submit Code"
          >
            <Check className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
