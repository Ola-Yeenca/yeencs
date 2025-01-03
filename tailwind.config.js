/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        light: {
          bg: '#ffffff',
          text: '#1a202c',
          accent: '#2d3748',
        },
        dark: {
          bg: '#0a192f',
          text: '#e2e8f0',
          accent: '#cbd5e0',
          secondary: '#112240',
        },
        'japanese-kurocha': '#965A3E', // Dark brown
        'japanese-shiro': '#FCFAF2',   // Off-white
        'japanese-kinari': '#F9F3DC',  // Light beige
        'japanese-shironezu': '#DCDCDC', // Light gray
        'japanese-karakurenai': '#D0104C', // Deep red
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1a1a1a',
            a: {
              color: '#D0104C',
              '&:hover': {
                color: '#965A3E',
              },
            },
          },
        },
        dark: {
          css: {
            color: '#FCFAF2',
            a: {
              color: '#D0104C',
              '&:hover': {
                color: '#FCFAF2',
              },
            },
            h1: { color: '#FCFAF2' },
            h2: { color: '#FCFAF2' },
            h3: { color: '#FCFAF2' },
            h4: { color: '#FCFAF2' },
            strong: { color: '#FCFAF2' },
            code: { color: '#FCFAF2' },
            blockquote: { color: '#FCFAF2' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
