import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown, FaGraduationCap, FaCode, FaRocket } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import profileImg from '../../assets/foto.jpeg';

const HeroSection = styled.section`
  min-height: calc(100vh - 4.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  color: ${theme.colors.textLight};
  padding: clamp(1.5rem, 3vh, 3.5rem) 0;

  .container {
    max-width: 1380px;
    margin: 0 auto;
    width: 95%;

    @media (min-width: ${theme.breakpoints.sm}) {
      width: 93%;
    }
  }
`;

const fadeUpKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(28px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
`;

const blinkCursor = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const rotateAmbient = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const HeroCardWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const AmbientGlow = styled.div`
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.22), transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(37, 99, 235, 0.18), transparent 55%);
  filter: blur(45px);
  pointer-events: none;
  z-index: 0;
`;

const HeroCard = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: min(760px, 86vh);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(8, 15, 30, 0.82);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 32px;
  border: 1px solid rgba(96, 165, 250, 0.28);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    inset 0 -1px 0 rgba(0, 0, 0, 0.5),
    0 32px 84px -12px rgba(0, 0, 0, 0.75),
    0 0 60px rgba(79, 140, 255, 0.16);
  padding: clamp(1.75rem, 3.5vw, 3.75rem);
  animation: ${fadeUpKeyframes} 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  overflow: hidden;

  /* Resplandor superior sutil */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 8%;
    right: 8%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.75), transparent);
    pointer-events: none;
  }
`;

const SplitGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
  align-items: center;
  width: 100%;

  @media (min-width: 960px) {
    display: grid;
    grid-template-columns: minmax(300px, 360px) 1fr;
    gap: clamp(2.5rem, 4vw, 4.5rem);
    align-items: center;
  }
`;

/* Columna Izquierda: Identidad / Foto / Estado / Redes */
const IdentityCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  position: relative;

  @media (min-width: 960px) {
    border-right: 1px solid rgba(96, 165, 250, 0.16);
    padding-right: clamp(1.5rem, 3vw, 3.5rem);
  }
`;

const AvatarFrame = styled.div`
  position: relative;
  width: clamp(160px, 18vw, 250px);
  height: clamp(160px, 18vw, 250px);
  margin-bottom: 1.5rem;

  &::before {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    background: conic-gradient(from 180deg, #3B82F6, #60A5FA, transparent, #2563EB, #60A5FA);
    animation: ${rotateAmbient} 16s linear infinite;
    opacity: 0.55;
    filter: blur(6px);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 2px solid rgba(147, 197, 253, 0.4);
    pointer-events: none;
    z-index: 2;
  }
`;

const ProfileImg = styled.img`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${theme.colors.accent};
  box-shadow: 0 12px 36px rgba(37, 99, 235, 0.45);
  display: block;
`;

const StatusPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.14);
  border: 1px solid rgba(34, 197, 94, 0.4);
  color: #86efac;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  margin-bottom: 1.35rem;
  box-shadow: 0 0 20px rgba(34, 197, 94, 0.12);

  span.dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: #22c55e;
    animation: ${pulseAnimation} 2s infinite;
  }
`;

const MetaBadges = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-bottom: 1.75rem;
  width: 100%;
  max-width: 290px;
`;

const MetaBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(96, 165, 250, 0.18);
  color: #e2e8f0;
  font-size: 0.82rem;
  padding: 0.45rem 0.85rem;
  border-radius: 10px;
  font-weight: 500;
  text-align: left;
  transition: all ${theme.transitions.default};

  svg {
    color: ${theme.colors.accent};
    font-size: 1rem;
    flex-shrink: 0;
  }

  &:hover {
    background: rgba(37, 99, 235, 0.15);
    border-color: rgba(96, 165, 250, 0.35);
    transform: translateX(2px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.85rem;
  justify-content: center;

  a {
    color: ${theme.colors.textLight};
    font-size: 1.35rem;
    width: 46px;
    height: 46px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid ${theme.colors.glass.border};
    transition: all ${theme.transitions.default};

    &:hover {
      color: white;
      background: ${theme.colors.accent};
      border-color: ${theme.colors.accent};
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 8px 24px rgba(79, 140, 255, 0.4);
    }
  }
`;

/* Columna Derecha: Contenido / Historia / Métricas / CTAs */
const ContentCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
`;

const GreetingTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.accent};
  font-size: clamp(0.85rem, 1vw, 0.95rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0.65rem;
`;

const Title = styled.h1`
  font-size: clamp(2.2rem, 4.2vw, 3.8rem);
  color: ${theme.colors.light};
  line-height: 1.12;
  letter-spacing: -0.025em;
  margin-bottom: 0.45rem;
  font-weight: 800;

  .name-gradient {
    background: linear-gradient(135deg, #FFFFFF 30%, #93C5FD 75%, #3B82F6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const TypewriterCursor = styled.span`
  display: inline-block;
  width: 3px;
  height: 0.85em;
  background: #60a5fa;
  margin-left: 3px;
  vertical-align: middle;
  border-radius: 2px;
  animation: ${blinkCursor} 0.9s step-start infinite;
`;

const RoleSubtitle = styled.h2`
  font-size: clamp(1.25rem, 2.2vw, 1.75rem);
  color: #93c5fd;
  font-weight: 500;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
`;

const BioText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  p {
    font-size: clamp(0.98rem, 1.15vw, 1.14rem);
    color: ${theme.colors.textLight};
    line-height: 1.72;
    opacity: 0.92;
    margin: 0;
  }

  strong {
    color: #ffffff;
    font-weight: 600;
  }
`;

const HighlightsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.85rem;
  margin-bottom: 2.25rem;
  padding: 1rem;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid rgba(96, 165, 250, 0.14);
`;

const HighlightItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  .label {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #94a3b8;
    font-weight: 600;
  }

  .value {
    font-size: 0.95rem;
    color: #f1f5f9;
    font-weight: 600;
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;

    a {
      width: 100%;
      justify-content: center;
    }
  }
`;

const PrimaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.9rem 1.85rem;
  background: ${theme.colors.gradient.accent};
  color: #030712;
  font-weight: 700;
  font-size: 1.02rem;
  border-radius: 14px;
  box-shadow: 0 4px 22px rgba(79, 140, 255, 0.4);
  transition: all ${theme.transitions.default};

  svg {
    font-size: 0.95rem;
    transition: transform 0.2s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(79, 140, 255, 0.55);
    filter: brightness(1.1);

    svg {
      transform: translateY(2px);
    }
  }
`;

const SecondaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.9rem 1.75rem;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid ${theme.colors.glass.border};
  color: ${theme.colors.light};
  font-weight: 600;
  font-size: 1.02rem;
  border-radius: 14px;
  transition: all ${theme.transitions.default};

  &:hover {
    background: rgba(37, 99, 235, 0.22);
    border-color: ${theme.colors.accent};
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
  }
`;

const TYPEWRITER_TEXTS = ['Luis Angel Martínez', 'un Desarrollador Java', 'un Ingeniero Backend', 'Luis Angel Martínez'];
const TYPE_SPEED = 65;    // ms por letra al escribir
const DELETE_SPEED = 35;  // ms por letra al borrar
const PAUSE_MS = 2500;    // pausa antes de borrar

function useTypewriter(texts: string[]) {
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  useEffect(() => {
    const current = texts[textIndex];

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), TYPE_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('deleting'), PAUSE_MS);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(prev => prev.slice(0, -1)), DELETE_SPEED);
        return () => clearTimeout(t);
      } else {
        setTextIndex(i => (i + 1) % texts.length);
        setPhase('typing');
      }
    }
  }, [displayed, phase, textIndex, texts]);

  return displayed;
}

export const Hero = () => {
  const typedName = useTypewriter(TYPEWRITER_TEXTS);
  return (
    <HeroSection id="hero" role="region" aria-label="Introducción personal y profesional">
      <div className="container">
        <HeroCardWrapper>
          <AmbientGlow aria-hidden="true" />
          <HeroCard>
            <SplitGrid>
              {/* Lado izquierdo: Identidad */}
              <IdentityCol>
                <AvatarFrame>
                  <ProfileImg 
                    src={profileImg} 
                    alt="Fotografía de Luis Ángel Hernández Martínez" 
                    loading="eager"
                    width="250"
                    height="250"
                  />
                </AvatarFrame>

                <StatusPill aria-label="Estado laboral: Disponible para trabajar">
                  <span className="dot" aria-hidden="true" />
                  Disponible para trabajar
                </StatusPill>

                <MetaBadges aria-label="Datos clave del desarrollador">
                  <MetaBadge>
                    <FaGraduationCap aria-hidden="true" />
                    <span>Ciencias de la Computación - Facultad de Ciencias UNAM</span>
                  </MetaBadge>
                  <MetaBadge>
                    <FaRocket aria-hidden="true" />
                    <span>Bootcamp Java Fullstack - Generation MX</span>
                  </MetaBadge>
                  <MetaBadge>
                    <FaCode aria-hidden="true" />
                    <span>Java, Spring Boot & React</span>
                  </MetaBadge>
                </MetaBadges>

                <SocialLinks role="list" aria-label="Redes sociales y contacto">
                  <a 
                    href="https://github.com/luisangelfc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Perfil de GitHub de Angel Martínez"
                    role="listitem"
                  >
                    <FaGithub aria-hidden="true" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/luisangelhm04" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Perfil de LinkedIn de Angel Martínez"
                    role="listitem"
                  >
                    <FaLinkedin aria-hidden="true" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a 
                    href="#contact" 
                    aria-label="Ir a la sección de contacto"
                    role="listitem"
                  >
                    <FaEnvelope aria-hidden="true" />
                    <span className="sr-only">Contacto directo</span>
                  </a>
                </SocialLinks>
              </IdentityCol>

              {/* Lado derecho: Historia, Métricas y CTAs */}
              <ContentCol>
                <GreetingTag aria-hidden="true">
                  Bienvenido a mi portafolio
                </GreetingTag>

                <Title>
                  Hola, soy{' '}
                  <span className="name-gradient" aria-label="Luis Angel Martínez">
                    {typedName}
                  </span>
                  <TypewriterCursor aria-hidden="true" />
                </Title>

                <RoleSubtitle>
                  Desarrollador Java Full Stack Jr
                </RoleSubtitle>

                <BioText>
                  <p>
                    Egresado de <strong>Ciencias de la Computación en la UNAM</strong> y egresado del <strong>Bootcamp de Generation México</strong>, 
                    especializado en el desarrollo de software backend y full stack con el ecosistema <strong>Java y Spring Boot</strong>.
                  </p>
                  <p>
                    Me apasiona participar en todo el ciclo de desarrollo: desde el modelado relacional y la construcción de <strong>APIs RESTful seguras, escalables y bien documentadas</strong>, 
                    hasta su integración con interfaces web modernas y dinámicas.
                  </p>
                  <p>
                    Soy una persona analítica, orientada al detalle y con hábito de aprendizaje autónomo constante. Me entusiasma resolver problemas reales con código limpio, arquitectura sólida y buenas prácticas de ingeniería.
                  </p>
                </BioText>

                <HighlightsBar role="list" aria-label="Resumen de perfil">
                  <HighlightItem role="listitem">
                    <span className="label">Especialidad</span>
                    <span className="value">Backend Java & Spring</span>
                  </HighlightItem>
                  <HighlightItem role="listitem">
                    <span className="label">Idiomas</span>
                    <span className="value">Español nativo • Inglés B2</span>
                  </HighlightItem>
                  <HighlightItem role="listitem">
                    <span className="label">Ubicación</span>
                    <span className="value">CDMX (Remoto / Híbrido / Presencial)</span>
                  </HighlightItem>
                </HighlightsBar>

                <ActionsGroup>
                  <PrimaryBtn href="#projects" aria-label="Explorar proyectos destacados">
                    Ver Proyectos
                    <FaArrowDown aria-hidden="true" />
                  </PrimaryBtn>
                  <SecondaryBtn href="#contact" aria-label="Ir a formulario de contacto">
                    Contáctame
                  </SecondaryBtn>
                </ActionsGroup>
              </ContentCol>
            </SplitGrid>
          </HeroCard>
        </HeroCardWrapper>
      </div>
    </HeroSection>
  );
};
