// The Last Door - Audio Director (Web Audio API Synthesizer + Howler Audio Engine)
// Howler is available for external assets if provided; Web Audio API handles procedural audio.

class AudioDirector {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private isAudioUnlocked: boolean = false;

  // Synthesizer active nodes
  private subBassOsc: OscillatorNode | null = null;
  private subBassGain: GainNode | null = null;
  
  private rainNode: AudioBufferSourceNode | null = null;
  private rainGain: GainNode | null = null;

  private breathingTimer: number | null = null;
  private heartbeatTimer: number | null = null;
  private clockTimer: number | null = null;

  constructor() {
    // AudioContext is initialized on user interaction
  }

  public async unlockAudio(): Promise<boolean> {
    if (this.isAudioUnlocked && this.ctx && this.ctx.state === 'running') {
      return true;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) {
        console.warn('Web Audio API not supported on this platform.');
        return false;
      }

      this.ctx = new AudioCtxClass();
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.isAudioUnlocked = true;
      this.startAmbientGenerators();
      return true;
    } catch (e) {
      console.error('Failed to unlock Web Audio context:', e);
      return false;
    }
  }

  public setMute(muted: boolean): void {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.8, this.ctx.currentTime);
    }
  }

  public isMute(): boolean {
    return this.isMuted;
  }

  // Starts ambient procedural synthesis (rain + sub-bass drone)
  private startAmbientGenerators(): void {
    if (!this.ctx || !this.masterGain) return;

    // 1. Sub-bass Drone (42Hz)
    try {
      this.subBassOsc = this.ctx.createOscillator();
      this.subBassOsc.type = 'sine';
      this.subBassOsc.frequency.setValueAtTime(42, this.ctx.currentTime);

      this.subBassGain = this.ctx.createGain();
      this.subBassGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

      this.subBassOsc.connect(this.subBassGain);
      this.subBassGain.connect(this.masterGain);
      this.subBassOsc.start();
    } catch (e) {
      console.warn('Sub-bass synthesizer failed to start:', e);
    }

    // 2. Procedural Rain (Filtered Noise)
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = 'bandpass';
      rainFilter.frequency.setValueAtTime(800, this.ctx.currentTime);
      rainFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      whiteNoise.connect(rainFilter);
      rainFilter.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);
      whiteNoise.start();
      this.rainNode = whiteNoise;
    } catch (e) {
      console.warn('Rain synthesizer failed to start:', e);
    }

    // 3. Start rhythmic breathing loop
    this.startBreathingCycle();
  }

  // Periodic breathing cycle (swells every 6.5s)
  private startBreathingCycle(): void {
    if (!this.ctx || !this.masterGain) return;

    const performBreath = () => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      try {
        const now = this.ctx.currentTime;
        const breathOsc = this.ctx.createOscillator();
        breathOsc.type = 'triangle';
        breathOsc.frequency.setValueAtTime(75, now);
        breathOsc.frequency.exponentialRampToValueAtTime(55, now + 3.0);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, now);
        filter.frequency.linearRampToValueAtTime(380, now + 1.5);
        filter.frequency.linearRampToValueAtTime(180, now + 3.2);

        const breathGain = this.ctx.createGain();
        breathGain.gain.setValueAtTime(0.001, now);
        breathGain.gain.linearRampToValueAtTime(0.14, now + 1.4);
        breathGain.gain.linearRampToValueAtTime(0.001, now + 3.5);

        breathOsc.connect(filter);
        filter.connect(breathGain);
        breathGain.connect(this.masterGain);

        breathOsc.start(now);
        breathOsc.stop(now + 3.6);
      } catch (err) {
        console.warn('Breath cycle note failed:', err);
      }
    };

    // Run breath cycle
    this.breathingTimer = window.setInterval(performBreath, 6500);
  }

  // Clock ticking transient generator (resonant wood click at 1.0s interval)
  public startClockTick(): void {
    if (this.clockTimer) return;

    this.clockTimer = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      try {
        const now = this.ctx.currentTime;
        const tickOsc = this.ctx.createOscillator();
        tickOsc.type = 'sine';
        tickOsc.frequency.setValueAtTime(1200, now);
        tickOsc.frequency.exponentialRampToValueAtTime(180, now + 0.04);

        const tickGain = this.ctx.createGain();
        tickGain.gain.setValueAtTime(0.08, now);
        tickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

        tickOsc.connect(tickGain);
        tickGain.connect(this.masterGain);

        tickOsc.start(now);
        tickOsc.stop(now + 0.06);
      } catch {
        // Safe skip
      }
    }, 1000);
  }

  public stopClockTick(): void {
    if (this.clockTimer) {
      clearInterval(this.clockTimer);
      this.clockTimer = null;
    }
  }

  // Door click / latch sound (metallic transient)
  public playDoorLatch(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // Safe skip
    }
  }

  // Spatial Floor Creak (resonant wood stress)
  public playFloorCreak(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.35);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(420, now);
      filter.Q.setValueAtTime(4.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // Safe skip
    }
  }

  // Deep Sub-Thud / Anomaly Impact
  public playSubThud(intensity: number = 0.5): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 0.8);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4 * intensity, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.0);
    } catch {
      // Safe skip
    }
  }

  // Dynamic tension adjustment
  public applyTension(tensionLevel: number): void {
    if (!this.ctx) return;

    // Sub-bass volume scales with tension
    if (this.subBassGain) {
      const targetSubVol = (tensionLevel / 100) * 0.45;
      this.subBassGain.gain.setTargetAtTime(targetSubVol, this.ctx.currentTime, 1.0);
    }

    // Rain intensity deepens slightly
    if (this.rainGain) {
      const targetRainVol = 0.06 + (tensionLevel / 100) * 0.06;
      this.rainGain.gain.setTargetAtTime(targetRainVol, this.ctx.currentTime, 1.0);
    }
  }

  // Safety mute / total halt
  public stopAll(): void {
    if (this.breathingTimer) {
      clearInterval(this.breathingTimer);
      this.breathingTimer = null;
    }
    if (this.clockTimer) {
      clearInterval(this.clockTimer);
      this.clockTimer = null;
    }
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    if (this.subBassOsc) {
      try { this.subBassOsc.stop(); } catch { /* noop */ }
      this.subBassOsc = null;
    }
    if (this.rainNode) {
      try { this.rainNode.stop(); } catch { /* noop */ }
      this.rainNode = null;
    }
    if (this.ctx) {
      try { this.ctx.close(); } catch { /* noop */ }
      this.ctx = null;
    }
    this.isAudioUnlocked = false;
  }
}

export const audioDirector = new AudioDirector();
