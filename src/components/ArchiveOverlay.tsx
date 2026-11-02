// The Last Door - Archive Overlay ("Case File")
import React from 'react';
import { motion } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import { memoryEngine } from '../engine/memoryEngine';
import { INITIAL_ANOMALIES } from '../engine/anomalyEngine';

export const ArchiveOverlay: React.FC = () => {
  const closeArchive = useSessionStore((state) => state.closeArchive);
  const totalVisits = useSessionStore((state) => state.totalVisits);
  const discoveredRelics = useSessionStore((state) => state.discoveredRelics);
  const discoveredAnomalies = useSessionStore((state) => state.discoveredAnomalies);
  const unlockedEndings = useSessionStore((state) => state.unlockedEndings);
  const theHouseRemembers = useSessionStore((state) => state.theHouseRemembers);

  const handlePurgeMemory = () => {
    if (window.confirm('Erase all recorded visits, relics, and memories from this device?')) {
      memoryEngine.resetMemory();
      window.location.reload();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-void/90 backdrop-blur-md flex items-center justify-center p-6 z-50 select-none overflow-y-auto"
    >
      <div className="max-w-2xl w-full bg-abyss border border-dust/20 p-6 md:p-10 shadow-2xl relative my-auto">
        {/* Close Button */}
        <button
          onClick={closeArchive}
          className="absolute top-6 right-6 text-dust hover:text-bone transition-colors cursor-pointer"
          title="Close Archive"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dossier Header */}
        <div className="border-b border-dust/15 pb-4 mb-6">
          <p className="font-mono text-[10px] text-dust/60 uppercase tracking-[0.3em]">
            INVESTIGATION DOSSIER &mdash; CONFIDENTIAL
          </p>
          <h2 className="font-cinematic text-lg md:text-xl tracking-[0.25em] text-bone uppercase pt-1">
            Your Archive
          </h2>
        </div>

        {/* Status Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 font-mono">
          <div className="bg-void/50 border border-dust/10 p-3">
            <span className="text-[10px] text-dust/60 uppercase block">Total Visits</span>
            <span className="text-base text-bone font-medium">{totalVisits}</span>
          </div>
          <div className="bg-void/50 border border-dust/10 p-3">
            <span className="text-[10px] text-dust/60 uppercase block">House Memory</span>
            <span className={`text-xs font-medium block pt-1 ${theHouseRemembers ? 'text-crimson' : 'text-dust'}`}>
              {theHouseRemembers ? 'ACTIVE' : 'DORMANT'}
            </span>
          </div>
          <div className="bg-void/50 border border-dust/10 p-3">
            <span className="text-[10px] text-dust/60 uppercase block">Anomalies</span>
            <span className="text-base text-bone font-medium">{discoveredAnomalies.length} / 5</span>
          </div>
          <div className="bg-void/50 border border-dust/10 p-3">
            <span className="text-[10px] text-dust/60 uppercase block">Endings</span>
            <span className="text-base text-bone font-medium">{unlockedEndings.length} / 2</span>
          </div>
        </div>

        {/* Discovered Relics Section */}
        <div className="space-y-3 mb-8">
          <h3 className="font-mono text-xs text-dust uppercase tracking-widest">
            Discovered Artifacts & Relics
          </h3>
          {discoveredRelics.length === 0 ? (
            <p className="text-xs font-sans text-dust/50 italic py-2">
              No artifacts have been extracted from the threshold yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {discoveredRelics.map((relicId) => (
                <div key={relicId} className="border border-dust/15 bg-void/40 p-3 text-xs font-mono">
                  <span className="text-bone uppercase block">{relicId.replace(/_/g, ' ')}</span>
                  <span className="text-[10px] text-dust/60 block pt-0.5">Catalogued in Archive</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Discovered Anomalies Log */}
        <div className="space-y-3 mb-8">
          <h3 className="font-mono text-xs text-dust uppercase tracking-widest">
            Recorded Environmental Anomalies
          </h3>
          <div className="space-y-2">
            {INITIAL_ANOMALIES.map((anomaly) => {
              const found = discoveredAnomalies.includes(anomaly.id);
              return (
                <div
                  key={anomaly.id}
                  className={`p-3 border text-xs font-mono ${
                    found
                      ? 'border-dust/30 bg-void/60 text-bone/90'
                      : 'border-dust/10 bg-void/20 text-dust/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-wider">{anomaly.name}</span>
                    <span className="text-[10px]">{found ? '[CONFIRMED]' : '[UNRECORDED]'}</span>
                  </div>
                  {found && (
                    <p className="font-sans text-[11px] text-dust/70 pt-1 leading-normal">
                      {anomaly.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Purge / Clear Data Action */}
        <div className="border-t border-dust/15 pt-6 flex items-center justify-between">
          <button
            onClick={handlePurgeMemory}
            className="flex items-center space-x-1.5 text-[11px] font-mono text-dust/60 hover:text-crimson transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>PURGE ARCHIVE MEMORY</span>
          </button>

          <button
            onClick={closeArchive}
            className="btn-cinematic px-6 py-2.5 text-xs font-mono tracking-widest uppercase cursor-pointer"
          >
            CLOSE FILE
          </button>
        </div>
      </div>
    </motion.div>
  );
};
