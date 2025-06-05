/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-matter': {
          900: '#0f0f0f',
          800: '#141414',
          700: '#1a1a1a',
          600: '#222222',
        },
        'electric-blue': '#00CFFF',
        'vivid-purple': '#A020F0',
        'blood-red': '#FF1744',
        'neon-green': '#00E676',
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'monospace'],
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00CFFF, 0 0 10px #00CFFF',
        'neon-purple': '0 0 5px #A020F0, 0 0 10px #A020F0',
        'neon-red': '0 0 5px #FF1744, 0 0 10px #FF1744',
        'neon-green': '0 0 5px #00E676, 0 0 10px #00E676',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.3)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};