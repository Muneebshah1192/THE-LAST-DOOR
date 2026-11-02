/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#030304',
        abyss: '#08080a',
        charcoal: '#111215',
        fossil: '#1b1d22',
        bone: '#d4cebe',
        dust: '#8e8a82',
        crimson: {
          deep: '#4a0e0e',
          DEFAULT: '#7a1b1b',
          faint: 'rgba(122, 27, 27, 0.25)'
        },
        decay: {
          green: '#1a291f',
          blue: '#131e2c'
        }
      },
      fontFamily: {
        cinematic: ['Cinzel', 'Trajan Pro', 'Didot', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      animation: {
        'flicker': 'flicker 4s infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'breathe': 'breathe 8s ease-in-out infinite',
        'sway': 'sway 12s ease-in-out infinite',
        'dust': 'dustFloat 20s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
          },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', filter: 'brightness(0.95)' },
          '50%': { transform: 'scale(1.025)', filter: 'brightness(1.05)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(0deg) translate(0px, 0px)' },
          '25%': { transform: 'rotate(0.3deg) translate(2px, 3px)' },
          '50%': { transform: 'rotate(-0.2deg) translate(-2px, 1px)' },
          '75%': { transform: 'rotate(0.15deg) translate(1px, -2px)' },
        },
        dustFloat: {
          '0%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-30px) translateX(15px)' },
          '100%': { transform: 'translateY(0px) translateX(0px)' },
        }
      }
    },
  },
  plugins: [],
}
