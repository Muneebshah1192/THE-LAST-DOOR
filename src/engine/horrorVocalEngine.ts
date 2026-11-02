// The Last Door - Horror Vocal & Speech Engine
// Combines synthesized 16-bit heavy horror audio with real-time deep vocal formant speech synthesis

class HorrorVocalEngine {
  private audioCache: Record<string, HTMLAudioElement> = {};
  private isSpeaking = false;

  constructor() {
    this.preloadAudio();
  }

  private preloadAudio() {
    if (typeof window === 'undefined') return;

    const files = [
      '/assets/horror/audio/scream_bloodcurdling.wav',
      '/assets/horror/audio/shriek_supernatural.wav',
      '/assets/horror/audio/yell_guttural.wav',
      '/assets/horror/audio/screech_metallic.wav',
      '/assets/horror/audio/chief_voice_locked.wav',
      '/assets/horror/audio/chief_voice_escape.wav',
      '/assets/horror/audio/chief_voice_behind.wav',
    ];

    files.forEach((path) => {
      try {
        const audio = new Audio(path);
        audio.preload = 'auto';
        this.audioCache[path] = audio;
      } catch {
        // audio element fallback
      }
    });
  }

  /**
   * Play heavy horror sound effect with dynamic volume and panning
   */
  public playHorrorEffect(effect: 'scream' | 'shriek' | 'yell' | 'screech' | 'chief_locked' | 'chief_escape' | 'chief_behind', volume = 0.9) {
    let filename = '/assets/horror/audio/scream_bloodcurdling.wav';
    switch (effect) {
      case 'scream':
        filename = '/assets/horror/audio/scream_bloodcurdling.wav';
        break;
      case 'shriek':
        filename = '/assets/horror/audio/shriek_supernatural.wav';
        break;
      case 'yell':
        filename = '/assets/horror/audio/yell_guttural.wav';
        break;
      case 'screech':
        filename = '/assets/horror/audio/screech_metallic.wav';
        break;
      case 'chief_locked':
        filename = '/assets/horror/audio/chief_voice_locked.wav';
        break;
      case 'chief_escape':
        filename = '/assets/horror/audio/chief_voice_escape.wav';
        break;
      case 'chief_behind':
        filename = '/assets/horror/audio/chief_voice_behind.wav';
        break;
    }

    try {
      let audio = this.audioCache[filename];
      if (!audio) {
        audio = new Audio(filename);
        this.audioCache[filename] = audio;
      }
      audio.currentTime = 0;
      audio.volume = Math.max(0, Math.min(1, volume));
      audio.play().catch(() => {
        // audio play policy handled gracefully
      });
    } catch {
      // ignore
    }
  }

  /**
   * Horror Vocals: Speaks words with deep pitch-shifted demonic or whisper formants
   */
  public speakEntityVoice(
    text: string, 
    style: 'demonic' | 'demon_chief' | 'whisper' | 'banshee' = 'demon_chief',
    onComplete?: () => void
  ) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      if (onComplete) onComplete();
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop overlapping speech

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Select best voice (prefer male/deep for demon, female for banshee/whisper)
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        if (style === 'banshee') {
          const female = voices.find(v => v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('samantha'));
          if (female) utterance.voice = female;
        } else {
          const male = voices.find(v => v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('mark'));
          if (male) utterance.voice = male;
        }
      }

      if (style === 'demon_chief' || style === 'demonic') {
        utterance.pitch = 0.15; // Extremely deep, guttural demonic entity pitch!
        utterance.rate = 0.72;  // Slow, ominous cadence
        utterance.volume = 0.95;
      } else if (style === 'whisper') {
        utterance.pitch = 0.4;
        utterance.rate = 0.8;
        utterance.volume = 0.6;
      } else if (style === 'banshee') {
        utterance.pitch = 1.6;  // Shrill, unsettling banshee pitch
        utterance.rate = 0.95;
        utterance.volume = 0.9;
      }

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onComplete) onComplete();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        if (onComplete) onComplete();
      };

      this.isSpeaking = true;
      window.speechSynthesis.speak(utterance);
    } catch {
      if (onComplete) onComplete();
    }
  }

  public get speaking(): boolean {
    return this.isSpeaking;
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  }
}

export const horrorVocalEngine = new HorrorVocalEngine();
