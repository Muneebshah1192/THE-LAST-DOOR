// The Last Door - Tension Director Engine
import { TensionProfile } from './types';

class TensionDirector {
  private tension: number = 10; // Starts at calm (10)
  private targetTension: number = 10;

  constructor() {
    this.tension = 10;
    this.targetTension = 10;
  }

  public getTension(): number {
    return Math.round(this.tension);
  }

  public setTension(value: number): void {
    this.tension = Math.max(0, Math.min(100, value));
    this.targetTension = this.tension;
  }

  public setTargetTension(target: number): void {
    this.targetTension = Math.max(0, Math.min(100, target));
  }

  public modifyTension(delta: number): void {
    this.setTension(this.tension + delta);
  }

  // Smooth interpolation toward target tension
  public tick(deltaTimeSeconds: number): void {
    const diff = this.targetTension - this.tension;
    if (Math.abs(diff) > 0.1) {
      const step = diff * Math.min(1, deltaTimeSeconds * 0.8);
      this.tension += step;
    } else {
      this.tension = this.targetTension;
    }
  }

  public triggerReliefDrop(dropTo: number = 28): void {
    this.targetTension = dropTo;
  }

  public getProfile(): TensionProfile {
    const t = this.tension;

    let label: TensionProfile['label'] = 'LOW';
    if (t >= 88) label = 'CRITICAL';
    else if (t >= 75) label = 'HIGH';
    else if (t >= 60) label = 'UNSTABLE';
    else if (t >= 45) label = 'UNSETTLED';
    else if (t >= 25) label = 'STABLE';
    else label = 'LOW';

    // 0.5% chance at high tension to display 'UNKNOWN'
    if (t > 70 && Math.random() < 0.08) {
      label = 'UNKNOWN';
    }

    // Dynamic calculations based on tension curve
    const cameraSwayAmount = 0.5 + (t / 100) * 2.5; // 0.5px to 3.0px
    const flickerFrequency = t < 30 ? 0.05 : t < 65 ? 0.25 : 0.65;
    const heartbeatBpm = Math.round(58 + (t / 100) * 62); // 58 to 120 bpm
    
    // Auditory exclusion: muffled lowpass filter at extreme tension
    const lowPassCutoffHz = t > 80 ? Math.round(1800 - ((t - 80) / 20) * 1100) : 18000;
    
    const ambientVolume = Math.min(1.0, 0.35 + (t / 100) * 0.45);
    const subBassVolume = t < 25 ? 0 : ((t - 25) / 75) * 0.85;

    const anomalyProbability = t < 15 ? 0.05 : Math.min(0.85, 0.15 + (t / 100) * 0.7);
    const encounterProbability = t < 55 ? 0 : Math.min(0.9, ((t - 55) / 45) * 0.9);

    return {
      level: Math.round(t),
      label,
      cameraSwayAmount,
      flickerFrequency,
      heartbeatBpm,
      lowPassCutoffHz,
      ambientVolume,
      subBassVolume,
      anomalyProbability,
      encounterProbability
    };
  }

  public reset(): void {
    this.tension = 10;
    this.targetTension = 10;
  }
}

export const tensionDirector = new TensionDirector();
