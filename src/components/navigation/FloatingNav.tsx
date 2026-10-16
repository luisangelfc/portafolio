import styled from '@emotion/styled';
import { motion, useScroll, useSpring } from 'framer-motion';
import { theme } from '../../styles/theme';
import { useEffect } from 'react';

const sections = [
  { id: 'hero', name: 'Inicio' },
  { id: 'projects', name: 'Proyectos' },
  { id: 'skills', name: 'Habilidades' },
  { id: 'contact', name: 'Contacto' }
];

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    ${theme.colors.accent},
    ${theme.colors.accent}dd
  );
  transform-origin: 0%;
  z-index: 1000;
  box-shadow: 0 0 10px ${theme.colors.accent}80;

  @media print {
    display: none;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    height: 2px;
  }
`;

export const FloatingNav = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Announce the current section to screen readers
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      sections.forEach(({ id, name }) => {
        const element = document.getElementById(id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= windowHeight / 2 && bottom >= windowHeight / 2) {
            const liveRegion = document.getElementById('section-announcer');
            if (liveRegion) {
              liveRegion.textContent = `Current section: ${name}`;
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ProgressBar
        style={{ scaleX }}
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollYProgress.get() * 100)}
      />
      <div
        id="section-announcer"
        className="sr-only"
        role="status"
        aria-live="polite"
      />
    </>
  );
};