import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import {
  FaReact,
  FaJava,
  FaServer,
  FaLayerGroup,
  FaNetworkWired,
  FaDatabase,
  FaTerminal,
  FaGitAlt,
  FaBug,
  FaStar,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiSpringboot,
  SiSpringsecurity,
  SiHibernate,
  SiJsonwebtokens,
  SiMysql,
  SiApachemaven,
  SiDocker,
  SiSwagger,
  SiJunit5,
  SiPostgresql,
} from 'react-icons/si';

const SkillsSection = styled.section`
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

/* Bento Grid Container */
const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
    gap: 1.75rem;
  }
`;

/* Tarjeta Bento Base */
const BentoCard = styled(motion.div)<{ $span?: string; $isPrimary?: boolean }>`
  position: relative;
  background: ${({ $isPrimary }) =>
    $isPrimary
      ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.9) 0%, rgba(8, 15, 30, 0.82) 100%)'
      : 'rgba(8, 15, 30, 0.78)'};
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 24px;
  border: 1px solid
    ${({ $isPrimary }) => ($isPrimary ? 'rgba(96, 165, 250, 0.35)' : 'rgba(96, 165, 250, 0.18)')};
  padding: clamp(1.5rem, 2.5vw, 2.25rem);
  overflow: hidden;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;

  ${({ $isPrimary }) =>
    $isPrimary &&
    `
    box-shadow: 
      0 20px 50px rgba(0, 0, 0, 0.6),
      0 0 45px rgba(79, 140, 255, 0.14),
      inset 0 1px 0 rgba(255, 255, 255, 0.14);
  `}

  /* Resplandor superior */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ $isPrimary }) => ($isPrimary ? 'rgba(96, 165, 250, 0.8)' : 'rgba(96, 165, 250, 0.35)')},
      transparent
    );
    pointer-events: none;
  }

  @media (min-width: 1024px) {
    ${({ $span }) => $span && `grid-column: ${$span};`}
  }

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(96, 165, 250, 0.45);
    box-shadow: 
      0 24px 60px -10px rgba(0, 0, 0, 0.75),
      0 0 35px rgba(79, 140, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-weight: 700;
  letter-spacing: -0.01em;

  svg {
    font-size: 1.4rem;
    color: ${theme.colors.accent};
  }
`;

const FeaturedPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(37, 99, 235, 0.2);
  border: 1px solid rgba(96, 165, 250, 0.35);
  color: #93c5fd;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;

  svg {
    color: #fbbf24;
    font-size: 0.75rem;
  }
`;

/* Pills de Skills Flexibles */
const SkillsPillsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-content: flex-start;
  flex: 1;
`;

const SkillPill = styled(motion.div)<{ $accentColor?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.88rem;
  font-weight: 500;
  padding: 0.55rem 0.95rem;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(96, 165, 250, 0.16);
  color: #e2e8f0;
  transition: all 0.25s ease;

  svg {
    font-size: 1.15rem;
    color: ${({ $accentColor }) => $accentColor || '#60A5FA'};
    transition: transform 0.25s ease, filter 0.25s ease;
  }

  &:hover {
    background: rgba(37, 99, 235, 0.18);
    border-color: rgba(96, 165, 250, 0.45);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);

    svg {
      transform: scale(1.15);
      filter: drop-shadow(0 0 8px ${({ $accentColor }) => $accentColor || '#60A5FA'});
    }
  }
`;

export const Skills = () => {
  return (
    <SkillsSection id="skills" role="region" aria-label="Habilidades y herramientas">
      <div className="container">
        <SectionHeader>
          <SectionPretitle>
            // 02. Competencias
          </SectionPretitle>
          <SectionTitle
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Skills & <span className="highlight">Tecnologías</span>
          </SectionTitle>
        </SectionHeader>

        {/* Bento Grid Layout Asimétrico */}
        <BentoGrid role="list">
          {/* 1. HERO BENTO: Backend (Foco Principal) - Span 7 cols en desktop */}
          <BentoCard
            $span="span 7"
            $isPrimary
            role="listitem"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <CardHeader>
              <CategoryTitle>
                <FaJava aria-hidden="true" style={{ color: '#F97316' }} />
                Backend & Arquitectura
              </CategoryTitle>
              <FeaturedPill>
                <FaStar aria-hidden="true" />
                Especialidad Principal
              </FeaturedPill>
            </CardHeader>
            <SkillsPillsWrap role="list" aria-label="Habilidades de Backend">
              <SkillPill $accentColor="#EA580C" role="listitem">
                <FaJava aria-hidden="true" />
                <span>Java</span>
              </SkillPill>
              <SkillPill $accentColor="#22C55E" role="listitem">
                <SiSpringboot aria-hidden="true" />
                <span>Spring Boot</span>
              </SkillPill>
              <SkillPill $accentColor="#16A34A" role="listitem">
                <SiSpringsecurity aria-hidden="true" />
                <span>Spring Security</span>
              </SkillPill>
              <SkillPill $accentColor="#B45309" role="listitem">
                <SiHibernate aria-hidden="true" />
                <span>Spring Data JPA / Hibernate</span>
              </SkillPill>
              <SkillPill $accentColor="#38BDF8" role="listitem">
                <FaServer aria-hidden="true" />
                <span>APIs RESTful</span>
              </SkillPill>
              <SkillPill $accentColor="#EC4899" role="listitem">
                <SiJsonwebtokens aria-hidden="true" />
                <span>JWT Auth</span>
              </SkillPill>
              <SkillPill $accentColor="#818CF8" role="listitem">
                <FaLayerGroup aria-hidden="true" />
                <span>Arquitectura MVC</span>
              </SkillPill>
              <SkillPill $accentColor="#38BDF8" role="listitem">
                <FaNetworkWired aria-hidden="true" />
                <span>Microservicios</span>
              </SkillPill>
            </SkillsPillsWrap>
          </BentoCard>

          {/* 2. BENTO: Bases de Datos - Span 5 cols en desktop */}
          <BentoCard
            $span="span 5"
            role="listitem"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardHeader>
              <CategoryTitle>
                <FaDatabase aria-hidden="true" style={{ color: '#0284C7' }} />
                Bases de Datos
              </CategoryTitle>
            </CardHeader>
            <SkillsPillsWrap role="list" aria-label="Bases de datos">
              <SkillPill $accentColor="#0284C7" role="listitem">
                <SiMysql aria-hidden="true" />
                <span>MySQL</span>
              </SkillPill>
              <SkillPill $accentColor="#38BDF8" role="listitem">
                <SiPostgresql aria-hidden="true" />
                <span>PostgreSQL</span>
              </SkillPill>
              <SkillPill $accentColor="#93C5FD" role="listitem">
                <FaDatabase aria-hidden="true" />
                <span>Consultas SQL & DDL/DML</span>
              </SkillPill>
              <SkillPill $accentColor="#60A5FA" role="listitem">
                <FaLayerGroup aria-hidden="true" />
                <span>Modelado Relacional</span>
              </SkillPill>
            </SkillsPillsWrap>
          </BentoCard>

          {/* 3. BENTO: Herramientas & DevOps - Span 6 cols en desktop */}
          <BentoCard
            $span="span 6"
            role="listitem"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardHeader>
              <CategoryTitle>
                <FaGitAlt aria-hidden="true" style={{ color: '#F43F5E' }} />
                Herramientas & Testing
              </CategoryTitle>
            </CardHeader>
            <SkillsPillsWrap role="list" aria-label="Herramientas y pruebas">
              <SkillPill $accentColor="#F05032" role="listitem">
                <FaGitAlt aria-hidden="true" />
                <span>Git & GitHub</span>
              </SkillPill>
              <SkillPill $accentColor="#0EA5E9" role="listitem">
                <SiDocker aria-hidden="true" />
                <span>Docker</span>
              </SkillPill>
              <SkillPill $accentColor="#C026D3" role="listitem">
                <SiApachemaven aria-hidden="true" />
                <span>Apache Maven</span>
              </SkillPill>
              <SkillPill $accentColor="#10B981" role="listitem">
                <SiSwagger aria-hidden="true" />
                <span>Swagger / OpenAPI</span>
              </SkillPill>
              <SkillPill $accentColor="#2563EB" role="listitem">
                <SiJunit5 aria-hidden="true" />
                <span>JUnit 5</span>
              </SkillPill>
              <SkillPill $accentColor="#22C55E" role="listitem">
                <FaBug aria-hidden="true" />
                <span>Mockito</span>
              </SkillPill>
              <SkillPill $accentColor="#94A3B8" role="listitem">
                <FaTerminal aria-hidden="true" />
                <span>Bash / Terminal</span>
              </SkillPill>
            </SkillsPillsWrap>
          </BentoCard>

          {/* 4. BENTO: Frontend Complementario - Span 6 cols en desktop */}
          <BentoCard
            $span="span 6"
            role="listitem"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CardHeader>
              <CategoryTitle>
                <FaReact aria-hidden="true" style={{ color: '#61DAFB' }} />
                Frontend & UI
              </CategoryTitle>
            </CardHeader>
            <SkillsPillsWrap role="list" aria-label="Tecnologías Frontend">
              <SkillPill $accentColor="#61DAFB" role="listitem">
                <FaReact aria-hidden="true" />
                <span>React</span>
              </SkillPill>
              <SkillPill $accentColor="#3178C6" role="listitem">
                <SiTypescript aria-hidden="true" />
                <span>TypeScript</span>
              </SkillPill>
              <SkillPill $accentColor="#F7DF1E" role="listitem">
                <SiJavascript aria-hidden="true" />
                <span>JavaScript</span>
              </SkillPill>
              <SkillPill $accentColor="#E34F26" role="listitem">
                <SiHtml5 aria-hidden="true" />
                <span>HTML5</span>
              </SkillPill>
              <SkillPill $accentColor="#1572B6" role="listitem">
                <SiCss3 aria-hidden="true" />
                <span>CSS3</span>
              </SkillPill>
              <SkillPill $accentColor="#38BDF8" role="listitem">
                <SiTailwindcss aria-hidden="true" />
                <span>Tailwind CSS</span>
              </SkillPill>
            </SkillsPillsWrap>
          </BentoCard>
        </BentoGrid>
      </div>
    </SkillsSection>
  );
};

export default Skills;
