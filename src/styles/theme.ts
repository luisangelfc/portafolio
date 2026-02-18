export const theme = {
  colors: {
  primary: '#0F172A',        // fondo principal (azul oscuro elegante)
  secondary: '#1E293B',      // superficies
  accent: '#3B82F6',         // azul principal (interacciones)
  light: '#E2E8F0',          // texto claro real (ANTES estaba mal)
  text: '#F1F5F9',
  textLight: '#E2E8F0',
  textDark: '#0F172A',

  glass: {
    background: 'rgba(148, 163, 184, 0.08)',
    border: 'rgba(148, 163, 184, 0.15)',
    card: 'rgba(59, 130, 246, 0.15)',
  },

  gradient: {
    main: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
    accent: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
    glass: 'linear-gradient(135deg, rgba(148, 163, 184, 0.12) 0%, rgba(148, 163, 184, 0.05) 100%)',
  },

  overlay: {
    light: 'rgba(148, 163, 184, 0.15)',
    dark: 'rgba(15, 23, 42, 0.6)',
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
