/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        crimson: {
          50:  '#fdf2f2',
          100: '#fce4e4',
          200: '#f9c0c0',
          300: '#f48a8a',
          400: '#ec4c4c',
          500: '#de2626',
          600: '#bc1a1a',
          700: '#9b1515',
          800: '#7c1212',
          900: '#6b1010',
          950: '#3d0606',
        },
        neutral: {
          50:  '#f8f8f8',
          100: '#efefef',
          200: '#dcdcdc',
          300: '#bdbdbd',
          400: '#989898',
          500: '#7c7c7c',
          600: '#656565',
          700: '#525252',
          800: '#3d3d3d',
          850: '#2a2a2a',
          900: '#1a1a1a',
          950: '#0f0f0f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.07), 0 4px 16px 0 rgba(0,0,0,0.06)',
        'card-hover': '0 4px 8px 0 rgba(0,0,0,0.1), 0 12px 32px 0 rgba(0,0,0,0.1)',
        'card-dark': '0 1px 3px 0 rgba(0,0,0,0.3), 0 4px 16px 0 rgba(0,0,0,0.25)',
        'card-dark-hover': '0 4px 8px 0 rgba(0,0,0,0.4), 0 12px 32px 0 rgba(0,0,0,0.35)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
