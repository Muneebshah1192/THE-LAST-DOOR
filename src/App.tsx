// The Last Door - Root Application Component
import React, { useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { useSessionStore } from './store/sessionStore';
import { OpeningSequence } from './components/OpeningSequence';
import { CautionScreen } from './components/CautionScreen';
import { TransitionScreen } from './components/TransitionScreen';
import { CinematicViewport } from './components/CinematicViewport';
import { EndingScreen } from './components/EndingScreen';
import { ArchiveOverlay } from './components/ArchiveOverlay';

// Graceful Error Boundary
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('The Last Door encountered an unhandled error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen bg-void flex flex-col items-center justify-center p-6 text-center text-bone font-mono">
          <p className="text-xs uppercase tracking-[0.3em] text-crimson mb-2">SIGNAL CORRUPTED</p>
          <h1 className="font-cinematic text-lg tracking-widest mb-4">THE LAST DOOR</h1>
          <p className="text-xs text-dust/70 max-w-md mb-6 leading-relaxed">
            The threshold experienced an unexpected fracture. No personal data was affected.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-cinematic px-6 py-2 text-xs uppercase tracking-widest cursor-pointer"
          >
            RE-ENTER THRESHOLD
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export const App: React.FC = () => {
  const stage = useSessionStore((state) => state.stage);
  const setReducedMotion = useSessionStore((state) => state.setReducedMotion);

  useEffect(() => {
    // Respect system prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setReducedMotion]);

  return (
    <ErrorBoundary>
      <main className="w-screen h-screen overflow-hidden bg-void text-bone relative">
        {stage === 'opening' && <OpeningSequence />}
        {stage === 'caution' && <CautionScreen />}
        {stage === 'transition' && <TransitionScreen />}
        {stage === 'cinematic' && <CinematicViewport />}
        {stage === 'ending' && <EndingScreen />}
        {stage === 'archive' && <ArchiveOverlay />}
      </main>
    </ErrorBoundary>
  );
};

export default App;
