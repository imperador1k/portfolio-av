/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        deepSpace: '#030014',
        cosmicPurple: '#0F0728',
        starWhite: '#FFFFFF',
        nebulaPink: '#FF61D8',
        cosmicBlue: '#4CC9F0',
      },
      animation: {
        'meteor': 'meteor 1s linear forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(to bottom, #030014, #0F0728)',
        'hero-pattern': "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2070')",
        'experience-bg': "url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80&w=2025')",
      },
    },
  },
  plugins: [],
};