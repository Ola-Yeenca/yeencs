export const theme = {
  colors: {
    japanese: {
      gofun: '#FFFFFC',    // Primary background (light)
      soshoku: '#EAE5E3',  // Secondary text (light)
      kinari: '#FBFAF5',   // Accent text (light)
      shironezu: '#DCDDDD', // Borders (light)
      sakura: '#FFB7C5',   // Highlights
      matcha: '#C8D5B9',   // Success states
      kurocha: '#443742',  // Secondary elements
      asagi: '#7DB9DE',    // Links and interactions
    },
    dark: {
      oxford: '#212A37',    // Primary background (dark)
      smoky: '#101720',     // Secondary background (dark)
      obsidian: '#0B1215',  // Text (dark)
      coffee: '#1B1B1B',    // Headers (dark)
      slate: '#2C3E50',     // Accent dark
      navy: '#1A2634',      // Secondary dark
      charcoal: '#364049',  // Lighter dark
      ink: '#151E29',       // Deepest dark
    }
  },
  typography: {
    fontFamily: {
      proto: ['0xProto', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1.16' }],
    },
  },
};
