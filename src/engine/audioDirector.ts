// The Last Door V2 - High-Fidelity Psychological Horror Audio Engine
// Web Audio API Synthesizers + Directional Spatial Panning + Supernatural Vocals
import { horrorVocalEngine } from './horrorVocalEngine';

class AudioDirector {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private masterVolume: number = 0.8;
  private isAudioUnlocked: boolean = false;

  // Synthesizer active nodes
  private subBassOsc: OscillatorNode | null = null;
  private subBassGain: GainNode | null = null;
  
  private rainNode: AudioBufferSourceNode | null = null;
  private rainGain: GainNode | null = null;

  private breathingTimer: number | null = null;
  private heartbeatTimer: number | null = null;
  private clockTimer: number | null = null;

  // Stereo Panner support for directional audio
  private pannerNode: StereoPannerNode | null = null;

  constructor() {
    // Context initializes on user gesture
  }

  public async unlockAudio(): Promise<boolean> {
    if (this.isAudioUnlocked && this.ctx && this.ctx.state === 'running') {
      return true;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) {
        console.warn('Web Audio API not supported on this device.');
        return false;
      }

      this.ctx = new AudioCtxClass();
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);

      if (this.ctx.createStereoPanner) {
        this.pannerNode = this.ctx.createStereoPanner();
        this.pannerNode.pan.setValueAtTime(0, this.ctx.currentTime);
        this.masterGain.connect(this.pannerNode);
        this.pannerNode.connect(this.ctx.destination);
      } else {
        this.masterGain.connect(this.ctx.destination);
      }

      this.isAudioUnlocked = true;
      this.startAmbientGenerators();
      return true;
    } catch (e) {
      console.error('Failed to initialize Web Audio context:', e);
      return false;
    }
  }

  public setVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.masterVolume;
  }

  public setMute(muted: boolean): void {
    this.isMuted = muted;
    if (muted) {
      horrorVocalEngine.stopSpeaking();
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.masterVolume, this.ctx.currentTime);
    }
  }

  public isMute(): boolean {
    return this.isMuted;
  }

  // 1. Procedural Ambience (Rain + Sub-Bass Drone)
  private startAmbientGenerators(): void {
    if (!this.ctx || !this.masterGain) return;

    // Sub-bass Drone (40Hz deep dread)
    try {
      this.subBassOsc = this.ctx.createOscillator();
      this.subBassOsc.type = 'sine';
      this.subBassOsc.frequency.setValueAtTime(40, this.ctx.currentTime);

      this.subBassGain = this.ctx.createGain();
      this.subBassGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

      this.subBassOsc.connect(this.subBassGain);
      this.subBassGain.connect(this.masterGain);
      this.subBassOsc.start();
    } catch (e) {
      console.warn('Sub-bass synthesizer failed to start:', e);
    }

    // Rain Simulation (Filtered Pink/White Noise)
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
      rainFilter.frequency.setValueAtTime(750, this.ctx.currentTime);
      rainFilter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(0.09, this.ctx.currentTime);

      whiteNoise.connect(rainFilter);
      rainFilter.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);
      whiteNoise.start();
      this.rainNode = whiteNoise;
    } catch (e) {
      console.warn('Rain synthesizer failed to start:', e);
    }

    this.startBreathingCycle();
  }

  // 2. Rhythmic Binaural Respiration (Swells every 6 seconds)
  public startBreathingCycle(): void {
    if (!this.ctx || !this.masterGain || this.breathingTimer) return;

    const performBreath = () => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      try {
        const now = this.ctx.currentTime;
        const breathOsc = this.ctx.createOscillator();
        breathOsc.type = 'triangle';
        breathOsc.frequency.setValueAtTime(70, now);
        breathOsc.frequency.exponentialRampToValueAtTime(50, now + 2.8);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, now);
        filter.frequency.linearRampToValueAtTime(360, now + 1.4);
        filter.frequency.linearRampToValueAtTime(160, now + 3.0);

        const breathGain = this.ctx.createGain();
        breathGain.gain.setValueAtTime(0.001, now);
        breathGain.gain.linearRampToValueAtTime(0.16, now + 1.2);
        breathGain.gain.linearRampToValueAtTime(0.001, now + 3.2);

        breathOsc.connect(filter);
        filter.connect(breathGain);
        breathGain.connect(this.masterGain);

        breathOsc.start(now);
        breathOsc.stop(now + 3.3);
      } catch {
        // Safe skip
      }
    };

    performBreath();
    this.breathingTimer = window.setInterval(performBreath, 6200);
  }

  // 3. Opening Impact Sound (Heavy cinematic sub-bass strike with metallic crunch)
  public playOpeningImpact(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      
      // Low impact body
      const sub = this.ctx.createOscillator();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(80, now);
      sub.frequency.exponentialRampToValueAtTime(25, now + 1.2);

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.55, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      sub.connect(subGain);
      subGain.connect(this.masterGain);
      sub.start(now);
      sub.stop(now + 1.5);

      // Metallic abrasive crunch
      const metal = this.ctx.createOscillator();
      metal.type = 'sawtooth';
      metal.frequency.setValueAtTime(240, now);
      metal.frequency.exponentialRampToValueAtTime(30, now + 0.3);

      const metalFilter = this.ctx.createBiquadFilter();
      metalFilter.type = 'bandpass';
      metalFilter.frequency.setValueAtTime(600, now);
      metalFilter.Q.setValueAtTime(3.5, now);

      const metalGain = this.ctx.createGain();
      metalGain.gain.setValueAtTime(0.2, now);
      metalGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      metal.connect(metalFilter);
      metalFilter.connect(metalGain);
      metalGain.connect(this.masterGain);
      metal.start(now);
      metal.stop(now + 0.45);
    } catch (e) {
      console.warn('Opening impact failed:', e);
    }
  }

  // 4. Glitch / Signal Distortion Burst
  public playGlitchStatic(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.15, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * (i % 2 === 0 ? 1 : -0.7);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      noise.connect(gain);
      gain.connect(this.masterGain);
      noise.start(now);
    } catch {
      // Safe skip
    }
  }

  // 5. Sudden Face Encounter Stinger (Terrifying sharp screech + sub impact)
  public playFaceStinger(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;

      // High dissonant screech
      const screech1 = this.ctx.createOscillator();
      screech1.type = 'sawtooth';
      screech1.frequency.setValueAtTime(1400, now);
      screech1.frequency.exponentialRampToValueAtTime(420, now + 0.6);

      const screech2 = this.ctx.createOscillator();
      screech2.type = 'square';
      screech2.frequency.setValueAtTime(1520, now);
      screech2.frequency.exponentialRampToValueAtTime(390, now + 0.6);

      const screechGain = this.ctx.createGain();
      screechGain.gain.setValueAtTime(0.35, now);
      screechGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      screech1.connect(screechGain);
      screech2.connect(screechGain);
      screechGain.connect(this.masterGain);

      screech1.start(now);
      screech2.start(now);
      screech1.stop(now + 0.7);
      screech2.stop(now + 0.7);

      // Deep chest thud
      this.playOpeningImpact();
    } catch {
      // Safe skip
    }
  }

  // 6. Supernatural Female Vocal (The Banshee / Weeping Bride)
  public playBansheeScream(panX: number = 0): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.linearRampToValueAtTime(1760, now + 0.4);
      osc.frequency.exponentialRampToValueAtTime(320, now + 1.2);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(4, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

      // Directional spatial pan
      if (this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner();
        panner.pan.setValueAtTime(Math.max(-1, Math.min(1, panX)), now);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(panner);
        panner.connect(this.masterGain);
      } else {
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
      }

      osc.start(now);
      osc.stop(now + 1.35);
    } catch {
      // Safe skip
    }
  }

  // 7. Male Demonic Vocal Effect (Distorted formant growl)
  public playDemonicGrowl(panX: number = 0): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.linearRampToValueAtTime(45, now + 1.5);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.Q.setValueAtTime(6.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.32, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      if (this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner();
        panner.pan.setValueAtTime(panX, now);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(panner);
        panner.connect(this.masterGain);
      } else {
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
      }

      osc.start(now);
      osc.stop(now + 1.9);
    } catch {
      // Safe skip
    }
  }

  // 8. Ghost Whisper (Filtered hiss with spectral resonance)
  public playGhostWhisper(panX: number = 0.4): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 1.2, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, now);
      filter.Q.setValueAtTime(5.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

      if (this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner();
        panner.pan.setValueAtTime(panX, now);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(panner);
        panner.connect(this.masterGain);
      } else {
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
      }

      noise.start(now);
      noise.stop(now + 1.2);
    } catch {
      // Safe skip
    }
  }

  // 9. Sudden Psychoacoustic Silence Dropout (cuts rain/clock/drone for tension)
  public triggerSuddenSilence(durationMs: number = 2500): void {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    if (this.rainGain) {
      this.rainGain.gain.setValueAtTime(0, now);
    }
    if (this.subBassGain) {
      this.subBassGain.gain.setValueAtTime(0, now);
    }

    setTimeout(() => {
      if (this.ctx && !this.isMuted) {
        const resumeTime = this.ctx.currentTime;
        if (this.rainGain) this.rainGain.gain.setTargetAtTime(0.09, resumeTime, 0.8);
        if (this.subBassGain) this.subBassGain.gain.setTargetAtTime(0.25, resumeTime, 0.8);
      }
    }, durationMs);
  }

  // 10. Clock Ticking at 1.0s interval
  public startClockTick(): void {
    if (this.clockTimer) return;

    this.clockTimer = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || this.isMuted) return;
      try {
        const now = this.ctx.currentTime;
        const tickOsc = this.ctx.createOscillator();
        tickOsc.type = 'sine';
        tickOsc.frequency.setValueAtTime(1180, now);
        tickOsc.frequency.exponentialRampToValueAtTime(170, now + 0.04);

        const tickGain = this.ctx.createGain();
        tickGain.gain.setValueAtTime(0.09, now);
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

  // 11. Heavy Door Latch / Wooden Creak
  public playDoorLatch(): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // Safe skip
    }
  }

  public playFloorCreak(panX: number = 0): void {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.4);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.Q.setValueAtTime(4.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.09);
      gain.gain.linearRampToValueAtTime(0.0001, now + 0.45);

      if (this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner();
        panner.pan.setValueAtTime(panX, now);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(panner);
        panner.connect(this.masterGain);
      } else {
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
      }

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // Safe skip
    }
  }

  // 12. Heavy Horror Effects: Scream, Shriek, Yell, Screech & Chief Demonic Voices
  public playBloodcurdlingScream(): void {
    if (this.isMuted) return;
    this.playOpeningImpact();
    horrorVocalEngine.playHorrorEffect('scream', 0.95);
  }

  public playPiercingShriek(): void {
    if (this.isMuted) return;
    this.playGlitchStatic();
    horrorVocalEngine.playHorrorEffect('shriek', 0.9);
  }

  public playGutturalYell(): void {
    if (this.isMuted) return;
    this.playOpeningImpact();
    horrorVocalEngine.playHorrorEffect('yell', 0.95);
  }

  public playSupernaturalScreech(): void {
    if (this.isMuted) return;
    horrorVocalEngine.playHorrorEffect('screech', 0.9);
  }

  public playChiefVoice(type: 'locked' | 'escape' | 'behind' = 'locked'): void {
    if (this.isMuted) return;
    horrorVocalEngine.playHorrorEffect(`chief_${type}` as any, 0.95);
  }

  public speakHorrorVoice(text: string, style: 'demonic' | 'demon_chief' | 'whisper' | 'banshee' = 'demon_chief'): void {
    if (this.isMuted) return;
    horrorVocalEngine.speakEntityVoice(text, style);
  }

  public playSubThud(_intensity: number = 0.5): void {
    this.playOpeningImpact();
  }

  public applyTension(tensionLevel: number): void {
    if (!this.ctx) return;

    if (this.subBassGain) {
      const targetSubVol = (tensionLevel / 100) * 0.5;
      this.subBassGain.gain.setTargetAtTime(targetSubVol, this.ctx.currentTime, 0.8);
    }

    if (this.rainGain) {
      const targetRainVol = 0.06 + (tensionLevel / 100) * 0.07;
      this.rainGain.gain.setTargetAtTime(targetRainVol, this.ctx.currentTime, 0.8);
    }
  }

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
