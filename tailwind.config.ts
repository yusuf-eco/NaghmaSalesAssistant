import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#050505',
          800: '#101010',
          700: '#1b1b1b',
          gold: '#c9a56d'
        }
      },
      boxShadow: {
        glow: '0 0 40px rgba(201, 165, 109, 0.16)'
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
