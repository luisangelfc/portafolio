export const theme = {
  colors: {
  primary: '#030712',        // fondo midnight
  secondary: '#0B1223',      // superficies elevadas
  accent: '#4F8CFF',         // azul principal (interacciones)
  light: '#E2E8F0',          // texto claro real (ANTES estaba mal)
  text: '#F1F5F9',
  textLight: '#E2E8F0',
  textDark: '#0F172A',

  glass: {
    background: 'rgba(8, 15, 30, 0.72)',
    border: 'rgba(96, 165, 250, 0.18)',
    card: 'rgba(37, 99, 235, 0.16)',
  },

  gradient: {
    main: 'linear-gradient(135deg, #02040A 0%, #050B18 52%, #030712 100%)',
    accent: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
    glass: 'linear-gradient(135deg, rgba(37, 99, 235, 0.16) 0%, rgba(15, 23, 42, 0.52) 100%)',
  },

  overlay: {
    light: 'rgba(96, 165, 250, 0.18)',
    dark: 'rgba(2, 4, 10, 0.72)',
  }
  },
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Poppins', sans-serif",
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
  },
  transitions: {
    default: '0.3s ease',
  },
};

export type Theme = typeof theme;
