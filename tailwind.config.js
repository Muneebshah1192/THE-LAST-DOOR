/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        abyss: '#08080a',
        charcoal: '#101010',
        fossil: '#1f2124',
        bone: '#D8D6D2',
        ghost: '#D8D6D2',
        dust: '#777777',
        blood: {
          light: '#B51F2B',
          DEFAULT: '#760909',
          crimson: '#A20D19',
          dried: '#430609',
          faint: 'rgba(118, 9, 9, 0.25)',
          glow: 'rgba(162, 13, 25, 0.45)'
        },
        crimson: {
          deep: '#430609',
          DEFAULT: '#760909',
          bright: '#A20D19',
          faint: 'rgba(118, 9, 9, 0.25)'
        },
        decay: {
          green: '#141d16',
          blue: '#0d1520'
        }
      },
      fontFamily: {
        cinematic: ['Cinzel', 'Trajan Pro', 'Didot', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      animation: {
        'flicker': 'flicker 3s infinite',
        'flicker-intense': 'flickerIntense 0.8s infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'breathe': 'breathe 6.5s ease-in-out infinite',
        'sway': 'sway 10s ease-in-out infinite',
        'dust': 'dustFloat 18s linear infinite',
        'blood-pulse': 'bloodPulse 2.8s ease-in-out infinite',
        'glitch': 'glitchText 0.4s steps(2) infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '0.99' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.35' },
        },
        flickerIntense: {
          '0%, 10%, 15%, 26%, 40%, 45%, 70%, 100%': { opacity: '1' },
          '11%, 14%, 25%, 39%, 46%, 69%': { opacity: '0.1' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', filter: 'brightness(0.92)' },
          '50%': { transform: 'scale(1.03)', filter: 'brightness(1.08)' },
        },
        bloodPulse: {
          '0%, 100%': { borderColor: 'rgba(118, 9, 9, 0.3)', boxShadow: '0 0 10px rgba(118, 9, 9, 0.2)' },
          '50%': { borderColor: 'rgba(162, 13, 25, 0.85)', boxShadow: '0 0 25px rgba(162, 13, 25, 0.65)' },
        },
        glitchText: {
          '0%': { transform: 'translate(0, 0)', opacity: '1' },
          '25%': { transform: 'translate(-2px, 1px)', opacity: '0.85' },
          '50%': { transform: 'translate(2px, -1px)', opacity: '0.95' },
          '75%': { transform: 'translate(-1px, -1px)', opacity: '0.8' },
          '100%': { transform: 'translate(0, 0)', opacity: '1' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(0deg) translate(0px, 0px)' },
          '25%': { transform: 'rotate(0.35deg) translate(3px, 4px)' },
          '50%': { transform: 'rotate(-0.25deg) translate(-3px, 2px)' },
          '75%': { transform: 'rotate(0.2deg) translate(2px, -3px)' },
        },
        dustFloat: {
          '0%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-35px) translateX(18px)' },
          '100%': { transform: 'translateY(0px) translateX(0px)' },
        }
      }
    },
  },
  plugins: [],
}
