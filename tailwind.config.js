/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#0F1B2F', // Amazon Prime dark blue
        secondary: '#232F3E', // Amazon secondary blue
        accent: '#00A8E1', // Amazon Prime blue accent
        'accent-light': '#14C6FF', // Lighter blue accent
        'accent-orange': '#FF9900', // Amazon orange
        'amazon-yellow': '#FFD814', // Amazon yellow for buttons
        dark: {
          100: '#131921', // Amazon header dark
          200: '#0F1B2F', // Primary background
          300: '#0A1526', // Darker background
        },
        light: {
          100: '#FFFFFF',
          200: '#EAEDED', // Amazon light gray background
          300: '#CCCCCC', // Amazon border gray
        }
      },
      fontFamily: {
        sans: ['Amazon Ember', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-premium': 'linear-gradient(135deg, #00A8E1 0%, #14C6FF 100%)', // Prime blue gradient
        'gradient-amazon': 'linear-gradient(135deg, #00A8E1 0%, #FF9900 100%)', // Blue to orange gradient
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};