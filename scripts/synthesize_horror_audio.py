# Pure Python Horror Audio Synthesizer (Standard Library only)
# Generates 16-bit 44.1kHz heavy horror effects: screams, shrieks, yells, metallic screeches, and demonic vocal formants
import wave
import struct
import math
import random
import os

os.makedirs('public/assets/horror/audio', exist_ok=True)
SAMPLE_RATE = 44100

def write_wav(filename, samples):
    with wave.open(filename, 'w') as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(SAMPLE_RATE)
        data = bytearray()
        for s in samples:
            clamped = max(-32767, min(32767, int(s * 32767)))
            data += struct.pack('<h', clamped)
        wav.writeframes(data)
    print(f"Synthesized: {filename} ({len(samples)} samples)")

# 1. Bloodcurdling Scream (Violent human/demon scream with vocal agony, harmonic clipping, and terrifying tremolo)
def generate_scream():
    duration = 2.4
    n = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        # Envelope: explosive attack, sustained agony, fadeout
        if t < 0.08:
            env = t / 0.08
        elif t < 1.6:
            env = 1.0 - 0.25 * ((t - 0.08) / 1.52)
        else:
            env = 0.75 * (1.0 - (t - 1.6) / 0.8)
        
        # Base vocal pitch descending with chaotic vibrato
        base_f = 950 - 250 * (t / duration) + 65 * math.sin(28 * math.pi * t)
        jitter = (random.random() - 0.5) * 35
        f = max(200, base_f + jitter)
        
        # Harmonic overtones (formants of screaming vocal tract)
        s1 = math.sin(2 * math.pi * f * t)
        s2 = 0.65 * math.sin(4 * math.pi * f * t * 1.01)
        s3 = 0.45 * math.sin(6 * math.pi * f * t * 0.99)
        s4 = 0.3 * math.sin(8 * math.pi * f * t)
        # Visceral vocal roughness / subharmonic growl
        rough = 0.4 * math.sin(math.pi * f * t) * (1 if math.sin(40 * math.pi * t) > 0 else -1)
        # Noise rasp
        noise = (random.random() - 0.5) * 0.25
        
        raw = (s1 + s2 + s3 + s4 + rough + noise) * env * 0.85
        # Soft saturation / tube clipping distortion
        clipped = math.tanh(raw * 1.8) * 0.88
        samples.append(clipped)
    return samples

# 2. Piercing Supernatural Shriek (High-frequency dissonant banshee terror)
def generate_shriek():
    duration = 1.8
    n = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        env = math.exp(-1.8 * t) if t > 0.05 else t / 0.05
        # Dual piercing dissonant tones (1800Hz and 1885Hz creating sickening beat frequency)
        f1 = 1850 + 400 * math.sin(16 * math.pi * t)
        f2 = 1920 - 300 * math.cos(14 * math.pi * t)
        f3 = 3400 + 150 * math.sin(30 * math.pi * t)
        
        tone = 0.5 * math.sin(2 * math.pi * f1 * t) + 0.45 * math.sin(2 * math.pi * f2 * t) + 0.25 * math.sin(2 * math.pi * f3 * t)
        raw = tone * env
        samples.append(math.tanh(raw * 1.6) * 0.85)
    return samples

# 3. Guttural Demonic Yell (Heavy 55Hz sub-bass roar with throat vibration)
def generate_guttural_yell():
    duration = 2.6
    n = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        env = (t / 0.15) if t < 0.15 else math.exp(-0.9 * (t - 0.15))
        # Deep demonic throat pitch (68Hz to 45Hz)
        pitch = 72 - 25 * (t / duration)
        throat = math.sin(2 * math.pi * pitch * t)
        sub = 0.8 * math.sin(math.pi * pitch * t) # sub-octave rumble
        f_mid = 0.45 * math.sin(6 * math.pi * pitch * t)
        # Chest rattle
        rattle = 0.3 * (1.0 if math.sin(32 * math.pi * t) > 0 else -1.0) * math.sin(4 * math.pi * pitch * t)
        
        raw = (throat + sub + f_mid + rattle) * env
        samples.append(math.tanh(raw * 2.2) * 0.9)
    return samples

# 4. Metallic Screech (Bone-scraping fingernails on iron / ritual crypt horror)
def generate_screech():
    duration = 2.1
    n = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        env = (t / 0.04) if t < 0.04 else math.exp(-1.4 * (t - 0.04))
        # Screeching resonant modes
        f1 = 2800 + 600 * math.sin(45 * t * t)
        f2 = 4200 + 400 * math.cos(35 * t)
        f3 = 1100 + 800 * math.sin(12 * t)
        
        screech = 0.4 * math.sin(2 * math.pi * f1 * t) + 0.35 * math.sin(2 * math.pi * f2 * t) + 0.3 * math.sin(2 * math.pi * f3 * t)
        metal_ring = 0.25 * math.sin(2 * math.pi * 5600 * t) * math.exp(-2.5 * t)
        noise = (random.random() - 0.5) * 0.15
        
        raw = (screech + metal_ring + noise) * env
        samples.append(math.tanh(raw * 1.5) * 0.85)
    return samples

# 5. Demonic Chief Voices (Guttural entity vocal formants synthesized)
def generate_chief_voice(phrase_type):
    duration = 2.8
    n = int(SAMPLE_RATE * duration)
    samples = []
    # Pitch contour based on phrase
    base_carrier = 55.0 if phrase_type == 'locked' else 48.0
    
    for i in range(n):
        t = i / SAMPLE_RATE
        # Multi-syllable envelope (mimicking spoken cadence)
        syl_env = (
            math.sin(3.5 * math.pi * t) ** 2 * (1.0 - t / duration)
            if t < duration else 0
        )
        # Vocal tract formants: F1 ~ 300Hz, F2 ~ 850Hz, F3 ~ 2200Hz
        carrier = math.sin(2 * math.pi * base_carrier * t)
        sub_carrier = 0.7 * math.sin(math.pi * base_carrier * t)
        formant1 = 0.5 * math.sin(2 * math.pi * 320 * t)
        formant2 = 0.35 * math.sin(2 * math.pi * 840 * t)
        formant3 = 0.2 * math.sin(2 * math.pi * 2250 * t)
        # Demonic whisper air rasp
        air = (random.random() - 0.5) * 0.28 * syl_env
        
        voice = (carrier + sub_carrier) * (formant1 + formant2 + formant3) * 1.5 + air
        raw = voice * syl_env
        samples.append(math.tanh(raw * 2.0) * 0.88)
    return samples

if __name__ == '__main__':
    write_wav('public/assets/horror/audio/scream_bloodcurdling.wav', generate_scream())
    write_wav('public/assets/horror/audio/shriek_supernatural.wav', generate_shriek())
    write_wav('public/assets/horror/audio/yell_guttural.wav', generate_guttural_yell())
    write_wav('public/assets/horror/audio/screech_metallic.wav', generate_screech())
    write_wav('public/assets/horror/audio/chief_voice_locked.wav', generate_chief_voice('locked'))
    write_wav('public/assets/horror/audio/chief_voice_escape.wav', generate_chief_voice('escape'))
    write_wav('public/assets/horror/audio/chief_voice_behind.wav', generate_chief_voice('behind'))
    print("ALL HEAVY HORROR AUDIO EFFECT WAVS GENERATED!")
