import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { theme } from '../../styles/theme';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import kesologoImg from '../../assets/kesologo.png';
import carminImg from '../../assets/carmin.webp';
import edatImg from '../../assets/edat.jpeg';

const ProjectsSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: clamp(3rem, 6vh, 6rem) 0;

  .container {
    max-width: 1380px;
    margin: 0 auto;
    width: 95%;

    @media (min-width: ${theme.breakpoints.sm}) {
      width: 93%;
    }
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
  position: relative;
`;

const SectionPretitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.accent};
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 0.5rem;
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(96, 165, 250, 0.25);
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.2rem, 4.5vw, 3.4rem);
  color: ${theme.colors.light};
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;

  .highlight {
    background: linear-gradient(135deg, #FFFFFF 20%, #93C5FD 70%, #3B82F6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const CarouselShell = styled.div`
  position: relative;
  width: 100%;
`;

const ProjectGrid = styled.div`
  --carousel-gap: 1.25rem;
  display: flex;
  gap: var(--carousel-gap);
  width: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  padding: 1rem 0.5rem 1.75rem 0.5rem;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    --carousel-gap: 1.75rem;
  }
`;

/* Tarjeta con Estilo "App Window Mockup" */
const ProjectCard = styled(motion.div)`
  flex: 0 0 85%;
  min-width: 0;
  scroll-snap-align: center;
  background: rgba(8, 15, 30, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 20px;
  border: 1px solid rgba(96, 165, 250, 0.2);
  overflow: hidden;
  color: ${theme.colors.textLight};
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);

  @media (min-width: 680px) {
    flex-basis: clamp(320px, calc((100% - 2rem) / 2), 440px);
    scroll-snap-align: start;
  }

  @media (min-width: 1080px) {
    flex-basis: clamp(340px, calc((100% - 3.5rem) / 3), 430px);
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(96, 165, 250, 0.45);
    box-shadow: 
      0 24px 60px -10px rgba(0, 0, 0, 0.75),
      0 0 40px rgba(79, 140, 255, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.16);
  }
`;

/* Barra de Ventana de Aplicación (Mac/Browser style) */
const WindowBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.95rem;
  background: rgba(15, 23, 42, 0.75);
  border-bottom: 1px solid rgba(96, 165, 250, 0.12);
`;

const WindowButtons = styled.div`
  display: flex;
  gap: 0.35rem;

  .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    display: inline-block;
  }

  .red {
    background: rgba(239, 68, 68, 0.75);
  }

  .yellow {
    background: rgba(245, 158, 11, 0.75);
  }

  .green {
    background: rgba(34, 197, 94, 0.75);
  }
`;

const WindowAddress = styled.div`
  font-size: 0.72rem;
  color: #94a3b8;
  font-family: monospace;
  background: rgba(2, 6, 23, 0.6);
  padding: 0.18rem 0.65rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  max-width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const WindowBadge = styled.span`
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: rgba(59, 130, 246, 0.15);
  color: #93c5fd;
  border: 1px solid rgba(96, 165, 250, 0.25);
`;

/* Contenedor de Imagen de Proyecto */
const ProjectImageContainer = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: clamp(170px, 20vw, 210px);
  background-image: ${({ imageUrl }) => imageUrl
    ? `linear-gradient(to bottom, rgba(3, 7, 18, 0.1), rgba(3, 7, 18, 0.75)), url(${imageUrl})`
    : 'radial-gradient(circle at 50% 40%, rgba(79, 140, 255, 0.25), transparent 45%), linear-gradient(145deg, #0b1223, #030712)'};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(96, 165, 250, 0.12);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(8, 15, 30, 0.9) 0%, transparent 40%);
  }
`;

const ProjectPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: ${theme.colors.light};
  font-family: ${theme.fonts.heading};
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-shadow: 0 0 32px rgba(79, 140, 255, 0.6);
`;

const ProjectContent = styled.div`
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 1.5rem;
  }
`;

const ProjectCategory = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  color: #60a5fa;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.35rem;
  display: block;
`;

const ProjectTitle = styled.h3`
  font-size: clamp(1.2rem, 2vw, 1.45rem);
  margin-bottom: 0.5rem;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

const ProjectDescription = styled.p`
  color: #cbd5e1;
  margin-bottom: 1.25rem;
  font-size: 0.92rem;
  line-height: 1.6;
  flex: 1;
  opacity: 0.88;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
`;

const TechTag = styled.span`
  background: rgba(15, 23, 42, 0.7);
  color: #93c5fd;
  border: 1px solid rgba(96, 165, 250, 0.22);
  padding: 0.25rem 0.65rem;
  border-radius: 8px;
  font-size: 0.76rem;
  font-weight: 500;
  transition: all ${theme.transitions.default};

  &:hover {
    background: rgba(37, 99, 235, 0.25);
    border-color: rgba(96, 165, 250, 0.5);
    color: white;
    transform: translateY(-1px);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(96, 165, 250, 0.12);

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: #93c5fd;
    font-size: 0.88rem;
    font-weight: 500;
    transition: all ${theme.transitions.default};
    padding: 0.35rem 0.75rem;
    border-radius: 8px;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(96, 165, 250, 0.16);

    &:hover {
      color: white;
      background: ${theme.colors.accent};
      border-color: ${theme.colors.accent};
      transform: translateY(-2px);
      box-shadow: 0 4px 14px rgba(79, 140, 255, 0.3);
    }
  }
`;

/* Barra de Paginación por Puntos (Centrada) */
const CarouselControlsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.75rem;
  padding: 0 0.5rem;
`;

const PaginationDots = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PaginationDot = styled.button<{ $active: boolean }>`
  height: 8px;
  width: ${({ $active }) => ($active ? '28px' : '8px')};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? '#60A5FA' : 'rgba(96, 165, 250, 0.25)')};
  box-shadow: ${({ $active }) => ($active ? '0 0 12px rgba(96, 165, 250, 0.75)' : 'none')};
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0;
  cursor: pointer;

  &:hover {
    background: ${({ $active }) => ($active ? '#60A5FA' : 'rgba(96, 165, 250, 0.45)')};
  }
`;

/* Flechas a Altura Media de las Cards */
const SideArrow = styled.button<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 46%;
  transform: translateY(-50%);
  ${({ $direction }) => ($direction === 'prev' ? 'left: 0.15rem;' : 'right: 0.15rem;')}
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(8, 15, 30, 0.94);
  border: 1.5px solid rgba(96, 165, 250, 0.45);
  color: #ffffff;
  font-size: 1rem;
  box-shadow: 
    0 10px 28px rgba(0, 0, 0, 0.75),
    0 0 20px rgba(79, 140, 255, 0.3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.1rem;
    ${({ $direction }) => ($direction === 'prev' ? 'left: -1.25rem;' : 'right: -1.25rem;')}
  }

  @media (min-width: 1200px) {
    width: 54px;
    height: 54px;
    font-size: 1.2rem;
    ${({ $direction }) => ($direction === 'prev' ? 'left: -1.85rem;' : 'right: -1.85rem;')}
  }

  &:hover:not(:disabled) {
    background: ${theme.colors.accent};
    border-color: #93c5fd;
    transform: translateY(-50%) scale(1.08);
    box-shadow: 0 0 28px rgba(79, 140, 255, 0.65);
    color: white;
  }

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
    box-shadow: none;
    pointer-events: none;
  }
`;

type Project = {
  id: number;
  title: string;
  categoryTag?: string;
  badgeText?: string;
  badgeColor?: string;
  description: string;
  image?: string;
  placeholder?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Keso Pastelería",
    categoryTag: "Proyecto Integrador • Bootcamp Generation",
    badgeText: "Backend Java",
    badgeColor: "#F97316",
    description: "Plataforma e-commerce desarrollada en equipo. Diseñé la arquitectura backend en capas con Spring Boot: desarrollo de endpoints RESTful para clientes, productos, catálogos y flujo de compra; autenticación segura con Spring Security y JWT; persistencia relacional con Spring Data JPA, Hibernate y MySQL; y validaciones de negocio para garantizar la integridad de los datos.",
    image: kesologoImg,
    techStack: ["Java 17", "Spring Boot", "Spring Security", "JWT", "Spring Data JPA", "Hibernate", "MySQL"],
    githubUrl: "https://github.com/aggressxve/keso-relleno",
  },
  {
    id: 2,
    title: "Salón Carmín",
    categoryTag: "Freelance • Producción",
    badgeText: "Producción",
    badgeColor: "#22C55E",
    description: "Sitio web en producción para un salón de eventos sociales. Gestioné el ciclo completo de forma independiente: levantamiento de requerimientos con el cliente, diseño responsivo e implementación en HTML5, CSS3 y JavaScript. Optimizado para captación de clientes y solicitudes directas de cotización.",
    image: carminImg,
    techStack: ["HTML5", "CSS3", "JavaScript", "Diseño UI", "Producción"],
    githubUrl: "https://github.com/luisangelfc/salon-carmin",
    liveUrl: "https://saloncarmin.com",
  },
  {
    id: 3,
    title: "EDAT (Gestión de Reclutamiento)",
    categoryTag: "Hackatón LiverHack • Liverpool",
    badgeText: "Hackatón",
    badgeColor: "#C084FC",
    description: "Prototipo web desarrollado en equipo durante el Hackatón LiverHack de Liverpool para centralizar el proceso de selección y reclutamiento. Estructuré el flujo de candidaturas e integré un dashboard de seguimiento, tablas comparativas de fortalezas/oportunidades y métricas de evaluación. Presentado y defendido ante directivos de Liverpool.",
    image: edatImg,
    techStack: ["HTML5", "CSS3", "JavaScript", "Git / GitHub", "Prototipado Web"],
    githubUrl: "https://github.com/luisangelfc/EDAT",
    liveUrl: "https://luisangelfc.github.io/EDAT/",
  },
  {
    id: 4,
    title: "PokeAPI Pagination",
    categoryTag: "Consumo de API REST",
    badgeText: "Online",
    badgeColor: "#38BDF8",
    description: "Aplicación web que consume la API pública de Pokémon para renderizar resultados paginados en tiempo real. Implementa consumo asíncrono con Fetch API, renderizado dinámico en el DOM, navegación eficiente entre páginas y control de estado en el cliente con JavaScript vanilla.",
    image: "https://cdn.pixabay.com/photo/2016/07/23/13/21/pokemon-1536855_1280.png",
    techStack: ["JavaScript Vanilla", "Fetch API", "HTML5", "CSS3", "PokeAPI"],
    githubUrl: "https://github.com/luisangelfc/pokemos-pagination.git",
    liveUrl: "https://poke-pagination-angel.netlify.app",
  },
  {
    id: 5,
    title: "To Do List",
    categoryTag: "Manipulación de DOM & Persistencia",
    badgeText: "Online",
    badgeColor: "#38BDF8",
    description: "Gestor de tareas interactivo desarrollado con JavaScript vanilla y manipulación dinámica del DOM. Cuenta con filtrado reactivo de tareas, control de eventos y persistencia de datos en el cliente mediante serialización JSON y cookies.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Sign-check-icon.png",
    techStack: ["HTML5", "CSS3", "JavaScript Vanilla", "JSON", "Cookies"],
    githubUrl: "https://github.com/luisangelfc/to-do-list.git",
    liveUrl: "https://to-do-list-angel.netlify.app/",
  },
  {
    id: 6,
    title: "Portafolio Web Personal",
    categoryTag: "Desarrollo Frontend & UI",
    badgeText: "Online",
    badgeColor: "#60A5FA",
    description: "Portafolio web responsivo desarrollado con React 19 y TypeScript. Diseñado con arquitectura por componentes, diseño Glassmorphism personalizado con sistema de tokens, navegación responsiva con menú móvil accesible y micro-animaciones fluidas con Framer Motion.",
    image: "https://img.myloview.com/posters/portfolio-icon-element-of-science-for-mobile-concept-and-web-apps-icon-glyph-flat-icon-for-website-design-and-development-app-development-700-165307364.jpg",
    techStack: ["React 19", "TypeScript", "Vite", "Emotion", "Framer Motion"],
    githubUrl: "https://github.com/luisangelfc/portafolio.git",
    liveUrl: "https://portafolioweb-angel.netlify.app/",
  },
];

const Projects = () => {
  const projectTrackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const track = projectTrackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>('[data-project-slide]');
    if (!slide) return;
    const gap = Number.parseFloat(getComputedStyle(track).getPropertyValue('--carousel-gap')) || 20;
    const step = slide.offsetWidth + gap;
    const currentIndex = Math.round(track.scrollLeft / step);
    setActiveIndex(Math.min(Math.max(currentIndex, 0), projects.length - 1));
  }, []);

  useEffect(() => {
    const track = projectTrackRef.current;
    if (!track) return;

    let timeoutId: number;
    const handleScroll = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(updateActiveIndex, 60);
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', handleScroll);
      window.clearTimeout(timeoutId);
    };
  }, [updateActiveIndex]);

  const scrollToIndex = (index: number) => {
    const track = projectTrackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>('[data-project-slide]');
    if (!slide) return;
    const gap = Number.parseFloat(getComputedStyle(track).getPropertyValue('--carousel-gap')) || 20;
    const targetLeft = index * (slide.offsetWidth + gap);
    track.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  const scrollProjects = (direction: -1 | 1) => {
    const newIndex = Math.min(Math.max(activeIndex + direction, 0), projects.length - 1);
    scrollToIndex(newIndex);
  };

  return (
    <ProjectsSection id="projects" role="region" aria-label="Proyectos destacados">
      <div className="container">
        <SectionHeader>
          <SectionPretitle>
            // 01. Portafolio
          </SectionPretitle>
          <SectionTitle
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Proyectos <span className="highlight">Destacados</span>
          </SectionTitle>
        </SectionHeader>

        <CarouselShell>
          <ProjectGrid
            ref={projectTrackRef}
            role="list"
            aria-label="Carrusel de proyectos"
            tabIndex={0}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                data-project-slide
                role="listitem"
                aria-label={`${index + 1} de ${projects.length}: ${project.title}`}
              >
                {/* Cabecera Mockup de Ventana */}
                <WindowBar>
                  <WindowButtons>
                    <span className="dot red" aria-hidden="true" />
                    <span className="dot yellow" aria-hidden="true" />
                    <span className="dot green" aria-hidden="true" />
                  </WindowButtons>
                  <WindowAddress>
                    {project.title.toLowerCase().replace(/\s+/g, '-')}.dev
                  </WindowAddress>
                  <WindowBadge
                    style={{
                      color: project.badgeColor || '#86efac',
                      borderColor: `${project.badgeColor || '#22c55e'}45`,
                      background: `${project.badgeColor || '#22c55e'}16`,
                    }}
                  >
                    {project.badgeText || (project.liveUrl ? 'Online' : 'GitHub')}
                  </WindowBadge>
                </WindowBar>

                <ProjectImageContainer imageUrl={project.image}>
                  {project.placeholder && (
                    <ProjectPlaceholder aria-hidden="true">
                      {project.placeholder}
                    </ProjectPlaceholder>
                  )}
                </ProjectImageContainer>

                <ProjectContent>
                  {project.categoryTag && (
                    <ProjectCategory>{project.categoryTag}</ProjectCategory>
                  )}
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  
                  {project.techStack.length > 0 && (
                    <TechStack role="list" aria-label={`Tecnologías de ${project.title}`}>
                      {project.techStack.map((tech) => (
                        <TechTag key={tech} role="listitem">{tech}</TechTag>
                      ))}
                    </TechStack>
                  )}

                  {(project.githubUrl || project.liveUrl) && (
                    <ProjectLinks>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver código de ${project.title} en GitHub`}
                        >
                          <FaGithub aria-hidden="true" />
                          <span>Código</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visitar sitio de ${project.title}`}
                        >
                          <FaExternalLinkAlt aria-hidden="true" />
                          <span>{project.id === 2 ? 'Sitio Web' : 'Demo en vivo'}</span>
                        </a>
                      )}
                    </ProjectLinks>
                  )}
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectGrid>

          {/* Flecha Izquierda a Altura Media */}
          <SideArrow
            type="button"
            $direction="prev"
            onClick={() => scrollProjects(-1)}
            disabled={activeIndex === 0}
            aria-label="Proyecto anterior"
          >
            <FaChevronLeft aria-hidden="true" />
          </SideArrow>

          {/* Flecha Derecha a Altura Media */}
          <SideArrow
            type="button"
            $direction="next"
            onClick={() => scrollProjects(1)}
            disabled={activeIndex === projects.length - 1}
            aria-label="Proyecto siguiente"
          >
            <FaChevronRight aria-hidden="true" />
          </SideArrow>

          {/* Barra de Paginación por Puntos */}
          <CarouselControlsBar>
            <PaginationDots role="tablist" aria-label="Indicadores de diapositiva">
              {projects.map((proj, idx) => (
                <PaginationDot
                  key={proj.id}
                  $active={idx === activeIndex}
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Ir al proyecto ${idx + 1}: ${proj.title}`}
                  role="tab"
                  aria-selected={idx === activeIndex}
                />
              ))}
            </PaginationDots>
          </CarouselControlsBar>
        </CarouselShell>
      </div>
    </ProjectsSection>
  );
};

export default Projects;
