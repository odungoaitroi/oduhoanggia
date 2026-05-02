import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1d4ed8',
          dark: '#0f172a',
          orange: '#f97316'
        }
      }
    }
  },
  plugins: []
};

export default config;
