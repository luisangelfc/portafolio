import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import { keyframes } from '@emotion/react';
import { lazy, Suspense } from 'react';
import profileImg from '../../assets/foto.jpeg';
const FaGithub = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaGithub })));
const FaLinkedin = lazy(() => import('react-icons/fa').then(mod => ({ default: mod.FaLinkedin })));

const HeroSection = styled.section`
  min-height: calc(100vh - 4.5rem);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: ${theme.colors.textLight};
  padding: ${theme.spacing.lg} 0;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    width: 95%;
    
    @media (min-width: ${theme.breakpoints.sm}) {
      width: 90%;
    }
  }
`;

const HeroFlex = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: ${theme.spacing.md};
  width: 100%;

  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.xl};
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  min-width: 0;
  width: 100%;
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(8px);
  border-radius: 20px;
  padding: ${theme.spacing.md};
  border: none;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl};
  }
`;

const HeroText = styled.div`
  width: 100%;
`;

const fadeUpKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Title = styled.h1`
  animation: ${fadeUpKeyframes} 0.5s ease-out forwards;
  font-size: clamp(1.75rem, 6vw, 4.5rem);
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.light};
  line-height: 1.1;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.h2`
  animation: ${fadeUpKeyframes} 0.5s ease-out 0.2s forwards;
  opacity: 0;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  margin-bottom: ${theme.spacing.lg};
  opacity: 0.9;
  font-weight: 500;
`;

const Description = styled.p`
  animation: ${fadeUpKeyframes} 0.5s ease-out 0.4s forwards;
  opacity: 0;
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  max-width: 600px;
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.8;
  line-height: 1.7;
`;

const SocialLinks = styled.div`
  animation: ${fadeUpKeyframes} 0.5s ease-out 0.6s forwards;
  opacity: 0;
  display: flex;
  gap: ${theme.spacing.md};
  
  a {
    color: ${theme.colors.textLight};
    font-size: 1.5rem;
    transition: all ${theme.transitions.default};
    padding: ${theme.spacing.xs};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.glass.background};
    
    &:hover {
      color: ${theme.colors.light};
      transform: translateY(-3px);
      background: ${theme.colors.glass.card};
      box-shadow: 0 4px 12px rgba(246, 177, 122, 0.2);
    }
  }

  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.lg};
    
    a {
      font-size: 1.75rem;
    }
  }
`;

const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${theme.colors.accent};
  box-shadow: 0 8px 30px rgba(246, 177, 122, 0.2);
  flex-shrink: 0;
  animation: ${fadeUpKeyframes} 0.5s ease-out 0.3s forwards;
  opacity: 0;

  @media (min-width: ${theme.breakpoints.md}) {
    width: 300px;
    height: 300px;
  }
`;

export const Hero = () => {
  return (
    <HeroSection id="hero" role="region" aria-label="Introduction">
      <div className="container">
        <HeroFlex>
          <ProfileImage src={profileImg} alt="Foto de Angel Martínez" />
          <HeroContent>
            <HeroText>
            <Title role="heading" aria-level={2}>
              Hola, Soy Angel Martínez
            </Title>
            <Subtitle role="heading" aria-level={3}>
              Desarrollador Java Full Stack Jr
            </Subtitle>
            <Description role="paragraph">
                      Soy Luis Ángel Hernández Martínez, Desarrollador Java Full Stack Jr. Estudié Ciencias de la Computación en la UNAM y además tengo formación en el Bootcamp de Generation México, donde reforcé mi camino como desarrollador Java.

            Me gusta participar en todo el ciclo de desarrollo de software, desde entender el problema hasta ver la solución funcionando y disfruto especialmente resolver retos técnicos con buenas prácticas. Soy una persona orientada al detalle, proactiva y con aprendizaje autónomo constante: si no sé algo, lo investigo hasta entenderlo.

            Actualmente busco sumarme a un equipo donde pueda seguir creciendo, aportar valor real y seguir aprendiendo de otros desarrolladores.
            </Description>
            <SocialLinks role="list" aria-label="Social media links">
              <a 
                href="https://github.com/luisangelfc" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit my GitHub profile"
                role="listitem"
              >
                <Suspense fallback={<div style={{ width: '1.5rem', height: '1.5rem' }} />}>
                  <FaGithub aria-hidden="true" />
                </Suspense>
                <span className="sr-only">GitHub</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/luisangelhm04" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit my LinkedIn profile"
                role="listitem"
              >
                <Suspense fallback={<div style={{ width: '1.5rem', height: '1.5rem' }} />}>
                  <FaLinkedin aria-hidden="true" />
                </Suspense>
                <span className="sr-only">LinkedIn</span>
              </a>
            </SocialLinks>
          </HeroText>
          </HeroContent>
        </HeroFlex>
      </div>
    </HeroSection>
  );
};
