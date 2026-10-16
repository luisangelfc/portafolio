import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { theme } from '../../styles/theme';
import { FloatingNav } from '../navigation/FloatingNav';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { FaGithub, FaLinkedin, FaEnvelope, FaTimes, FaArrowUp } from 'react-icons/fa';

interface LayoutProps {
  children: ReactNode;
}

const LayoutWrapper = styled.div`
  @media print {
    background: white !important;
    color: black !important;
    
    * {
      color: black !important;
      text-shadow: none !important;
      box-shadow: none !important;
    }

    section {
      min-height: auto !important;
      padding: 2rem 0 !important;
      page-break-inside: avoid;
    }

    a[href]:after {
      content: " (" attr(href) ")";
      font-size: 0.8em;
    }
  }

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
  isolation: isolate;
  background: ${theme.colors.gradient.main};

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      radial-gradient(1.2px 1.2px at 24px 38px, rgba(219, 234, 254, 0.78) 98%, transparent),
      radial-gradient(1px 1px at 116px 92px, rgba(147, 197, 253, 0.7) 98%, transparent),
      radial-gradient(1.4px 1.4px at 205px 170px, rgba(255, 255, 255, 0.7) 98%, transparent),
      radial-gradient(1px 1px at 74px 236px, rgba(96, 165, 250, 0.72) 98%, transparent),
      radial-gradient(1.2px 1.2px at 278px 54px, rgba(191, 219, 254, 0.66) 98%, transparent);
    background-size: 320px 320px;
    opacity: 0.48;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse at 14% 18%, rgba(37, 99, 235, 0.14), transparent 38%),
      radial-gradient(ellipse at 86% 68%, rgba(29, 78, 216, 0.1), transparent 42%);
    pointer-events: none;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

const Header = styled.header`
  background: rgba(3, 7, 18, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  padding: 0.85rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(96, 165, 250, 0.15);

  @media print {
    display: none;
  }
`;

const Nav = styled.nav`
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.25rem;
    max-width: 1380px;
    margin: 0 auto;
    width: 95%;

    @media (min-width: ${theme.breakpoints.sm}) {
      width: 93%;
    }
  }
`;

const Logo = styled(motion.a)`
  color: #ffffff;
  font-family: ${theme.fonts.heading};
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
  text-decoration: none;

  span.dot-code {
    color: #60a5fa;
  }

  &:hover {
    color: #93c5fd;
  }
`;

/* Enlaces de Escritorio */
const DesktopNavLinks = styled.div`
  display: none;
  align-items: center;
  gap: 1.25rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavItemLink = styled.a<{ $isActive?: boolean }>`
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#cbd5e1')};
  background-color: ${({ $isActive }) => ($isActive ? 'rgba(37, 99, 235, 0.22)' : 'transparent')};
  border: 1px solid ${({ $isActive }) => ($isActive ? 'rgba(96, 165, 250, 0.4)' : 'transparent')};
  transition: all ${theme.transitions.default};
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '500')};
  font-size: 0.92rem;
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 0 14px rgba(79, 140, 255, 0.25)' : 'none')};

  &:hover {
    color: #ffffff;
    background-color: rgba(37, 99, 235, 0.25);
    border-color: rgba(96, 165, 250, 0.5);
  }
`;

const HeaderCta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 1rem;
  border-radius: 10px;
  background: rgba(37, 99, 235, 0.2);
  border: 1px solid rgba(96, 165, 250, 0.35);
  color: #93c5fd;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all ${theme.transitions.default};
  margin-left: 0.5rem;

  &:hover {
    background: ${theme.colors.accent};
    color: #ffffff;
    box-shadow: 0 0 16px rgba(79, 140, 255, 0.4);
    transform: translateY(-1px);
  }
`;

/* Botón Hamburguesa Animado (Solo en móvil) */
const HamburgerButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40px;
  height: 40px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(96, 165, 250, 0.25);
  border-radius: 10px;
  cursor: pointer;
  padding: 9px 8px;
  z-index: 1002;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    display: none;
  }

  span {
    width: 22px;
    height: 2px;
    background: #ffffff;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    transform-origin: 1px;

    &:first-of-type {
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg) translate(2px, -1px)' : 'rotate(0)')};
      background: ${({ $isOpen }) => ($isOpen ? '#60a5fa' : '#ffffff')};
    }

    &:nth-of-type(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
      transform: ${({ $isOpen }) => ($isOpen ? 'translateX(10px)' : 'translateX(0)')};
    }

    &:nth-of-type(3) {
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-45deg) translate(2px, 1px)' : 'rotate(0)')};
      background: ${({ $isOpen }) => ($isOpen ? '#60a5fa' : '#ffffff')};
    }
  }

  &:hover {
    border-color: rgba(96, 165, 250, 0.5);
    background: rgba(37, 99, 235, 0.2);
  }
`;

/* Menú Desplegable Móvil (Drawer / Overlay) */
const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(3, 7, 18, 0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileHeaderBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.85rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(96, 165, 250, 0.15);
  background: rgba(3, 7, 18, 0.85);
`;

const CloseMenuButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(96, 165, 250, 0.35);
  color: #ffffff;
  font-size: 1.15rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover, &:active {
    background: rgba(239, 68, 68, 0.25);
    border-color: rgba(239, 68, 68, 0.6);
    color: #f87171;
    transform: rotate(90deg);
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  max-width: 320px;
  text-align: center;
`;

const MobileNavLinkItem = styled.a<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  font-size: 1.35rem;
  font-weight: 700;
  color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#cbd5e1')};
  padding: 0.75rem 1.5rem;
  border-radius: 14px;
  width: 100%;
  transition: all 0.25s ease;
  border: 1px solid ${({ $isActive }) => ($isActive ? 'rgba(96, 165, 250, 0.4)' : 'transparent')};
  background: ${({ $isActive }) => ($isActive ? 'rgba(37, 99, 235, 0.22)' : 'transparent')};
  box-shadow: ${({ $isActive }) => ($isActive ? '0 0 20px rgba(79, 140, 255, 0.25)' : 'none')};

  span.num {
    font-size: 0.85rem;
    color: ${({ $isActive }) => ($isActive ? '#93c5fd' : '#60a5fa')};
    font-family: monospace;
    font-weight: 500;
  }

  &:hover, &:active {
    color: #ffffff;
    background: rgba(37, 99, 235, 0.25);
    border-color: rgba(96, 165, 250, 0.5);
    transform: scale(1.03);
  }
`;

const MobileSocials = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;

  a {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(96, 165, 250, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #93c5fd;
    font-size: 1.25rem;
    transition: all 0.25s ease;

    &:hover {
      background: ${theme.colors.accent};
      color: white;
      transform: translateY(-2px);
    }
  }
`;

/* Botón Flotante Volver Arriba */
const ScrollToTopBtn = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(8, 15, 30, 0.92);
  border: 1.5px solid rgba(96, 165, 250, 0.45);
  color: #ffffff;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 990;
  box-shadow: 
    0 10px 28px rgba(0, 0, 0, 0.7),
    0 0 20px rgba(79, 140, 255, 0.3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 640px) {
    bottom: 1.25rem;
    right: 1.25rem;
    width: 44px;
    height: 44px;
    font-size: 1rem;
  }

  &:hover {
    background: ${theme.colors.accent};
    border-color: #93c5fd;
    transform: translateY(-4px) scale(1.08);
    box-shadow: 0 0 28px rgba(79, 140, 255, 0.65);
    color: white;
  }
`;

const Main = styled.main`
  flex: 1;
  margin-top: 4.5rem;
  width: 100%;
  overflow-x: hidden;
`;

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: ${theme.colors.accent};
  color: ${theme.colors.textDark};
  padding: ${theme.spacing.sm};
  z-index: 9999;
  transition: top 0.2s;

  &:focus {
    top: 0;
  }
`;

const Footer = styled.footer`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(8px);
  color: ${theme.colors.textLight};
  padding: ${theme.spacing.lg} 0;
  text-align: center;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to top, ${theme.colors.glass.background}, transparent);
  }
`;

export const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);
  useKeyboardNavigation();

  useEffect(() => {
    // Add keyboard navigation instructions to console
    console.info(
      'Keyboard Navigation:\n',
      '- Arrow Up/Down or PageUp/PageDown: Navigate between sections\n',
      '- Home: Go to top\n',
      '- End: Go to bottom'
    );
  }, []);

  // Bloquear scroll de la página y escuchar tecla Escape cuando el menú móvil está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  // Listener para rastrear la sección activa y visibilidad del botón volver arriba
  useEffect(() => {
    const sections = ['hero', 'projects', 'skills', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 400);

      const scrollPosition = scrollY + 220;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', href: '#hero', id: 'hero', num: '01' },
    { label: 'Proyectos', href: '#projects', id: 'projects', num: '02' },
    { label: 'Skills', href: '#skills', id: 'skills', num: '03' },
    { label: 'Contacto', href: '#contact', id: 'contact', num: '04' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LayoutWrapper>
      <SkipLink href="#main-content">
        Skip to main content
      </SkipLink>

      <Header role="banner">
        <Nav role="navigation" aria-label="Navegación principal">
          <div className="container">
            <Logo
              href="#hero"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              aria-label="Ir al inicio"
            >
              Angel<span className="dot-code">.dev</span>
            </Logo>

            {/* Enlaces de Escritorio con estado activo */}
            <DesktopNavLinks role="list">
              {navItems.map((item) => (
                <NavItemLink 
                  key={item.href} 
                  href={item.href} 
                  role="listitem"
                  $isActive={activeSection === item.id}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </NavItemLink>
              ))}
              <HeaderCta href="#contact">
                <span>Escríbeme</span>
              </HeaderCta>
            </DesktopNavLinks>

            {/* Botón Hamburguesa Móvil */}
            <HamburgerButton
              type="button"
              $isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isMenuOpen}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </HamburgerButton>
          </div>
        </Nav>
      </Header>

      {/* Menú Desplegable Móvil con AnimatePresence */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenuOverlay
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Barra superior del menú móvil con Logo y Botón X de Cierre */}
            <MobileHeaderBar>
              <Logo
                href="#hero"
                onClick={handleLinkClick}
                aria-label="Ir al inicio"
              >
                Angel<span className="dot-code">.dev</span>
              </Logo>
              <CloseMenuButton
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Cerrar menú de navegación"
              >
                <FaTimes aria-hidden="true" />
              </CloseMenuButton>
            </MobileHeaderBar>

            <MobileNavLinks role="list" aria-label="Menú móvil">
              {navItems.map((item) => (
                <MobileNavLinkItem
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  role="listitem"
                  $isActive={activeSection === item.id}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <span className="num">{item.num}.</span>
                  <span>{item.label}</span>
                </MobileNavLinkItem>
              ))}
            </MobileNavLinks>

            <MobileSocials aria-label="Redes en menú móvil">
              <a
                href="https://github.com/luisangelfc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/luisangelhm04"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={handleLinkClick}
                aria-label="Contacto"
              >
                <FaEnvelope aria-hidden="true" />
              </a>
            </MobileSocials>
          </MobileMenuOverlay>
        )}
      </AnimatePresence>

      <Main id="main-content" role="main" tabIndex={-1}>
        {children}
      </Main>
      <FloatingNav />

      {/* Botón Flotante Volver Arriba */}
      <AnimatePresence>
        {showScrollTop && (
          <ScrollToTopBtn
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ duration: 0.25 }}
            aria-label="Volver arriba de la página"
            title="Volver arriba"
          >
            <FaArrowUp aria-hidden="true" />
          </ScrollToTopBtn>
        )}
      </AnimatePresence>

      <Footer role="contentinfo">
        <div className="container">
          <p>© {new Date().getFullYear()} Luis Angel Hernández Martínez.</p>
        </div>
      </Footer>
    </LayoutWrapper>
  );
};
