import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { theme } from '../../styles/theme';
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaCopy,
  FaCheck,
  FaArrowRight,
} from 'react-icons/fa';

const ContactSection = styled.section`
  position: relative;
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.textLight};
  padding: clamp(3rem, 6vh, 6rem) 0;

  .container {
    position: relative;
    z-index: 2;
    width: 95%;
    max-width: 1100px;
    margin: 0 auto;

    @media (min-width: ${theme.breakpoints.sm}) {
      width: 92%;
    }
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: clamp(2rem, 4vw, 3rem);
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

const ContactCardWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const AmbientGlow = styled.div`
  position: absolute;
  inset: -15px;
  background: radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.2), transparent 60%),
              radial-gradient(circle at 80% 80%, rgba(37, 99, 235, 0.15), transparent 50%);
  filter: blur(45px);
  pointer-events: none;
  z-index: 0;
`;

const ContactCard = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(8, 15, 30, 0.84);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 32px;
  border: 1px solid rgba(96, 165, 250, 0.25);
  padding: clamp(1.75rem, 4vw, 3.75rem);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(0, 0, 0, 0.5),
    0 32px 84px -12px rgba(0, 0, 0, 0.75),
    0 0 50px rgba(79, 140, 255, 0.14);
  overflow: hidden;

  /* Resplandor superior */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.75), transparent);
    pointer-events: none;
  }
`;

const ContactIntro = styled.p`
  text-align: center;
  max-width: 680px;
  margin: 0 auto 2.5rem auto;
  font-size: clamp(1rem, 1.2vw, 1.15rem);
  color: #cbd5e1;
  line-height: 1.7;
  opacity: 0.92;
`;

/* Bloque Destacado de Correo */
const EmailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(96, 165, 250, 0.25);
  border-radius: 20px;
  padding: 1.25rem 1.75rem;
  margin-bottom: 2.5rem;
  transition: all ${theme.transitions.default};

  @media (min-width: 640px) {
    flex-direction: row;
  }

  &:hover {
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 8px 30px rgba(37, 99, 235, 0.2);
  }
`;

const EmailDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;

  .icon-wrap {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: rgba(37, 99, 235, 0.18);
    border: 1px solid rgba(96, 165, 250, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #60a5fa;
    font-size: 1.3rem;
    flex-shrink: 0;
  }

  .text-wrap {
    display: flex;
    flex-direction: column;
    min-width: 0;

    .label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #94a3b8;
      font-weight: 600;
    }

    .address {
      font-size: clamp(0.95rem, 1.2vw, 1.15rem);
      color: #ffffff;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const EmailActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
  width: 100%;

  @media (min-width: 640px) {
    width: auto;
  }
`;

const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem 1.25rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  flex: 1;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(96, 165, 250, 0.25);
  color: #e2e8f0;

  @media (min-width: 640px) {
    flex: initial;
  }

  &:hover {
    background: rgba(37, 99, 235, 0.2);
    border-color: rgba(96, 165, 250, 0.45);
    color: white;
    transform: translateY(-2px);
  }
`;


/* Grid de Tarjetas de Redes Sociales */
const SocialCardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-bottom: 2.25rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SocialCard = styled(motion.a)<{ $brandColor: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(96, 165, 250, 0.16);
  color: #e2e8f0;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  .info {
    display: flex;
    align-items: center;
    gap: 0.85rem;

    .icon {
      font-size: 1.6rem;
      color: ${({ $brandColor }) => $brandColor};
      transition: transform 0.25s ease;
    }

    .meta {
      display: flex;
      flex-direction: column;

      .name {
        font-weight: 700;
        font-size: 0.98rem;
        color: #ffffff;
      }

      .handle {
        font-size: 0.78rem;
        color: #94a3b8;
      }
    }
  }

  .arrow {
    color: #64748b;
    font-size: 0.9rem;
    transition: transform 0.25s ease, color 0.25s ease;
  }

  &:hover {
    background: rgba(37, 99, 235, 0.14);
    border-color: rgba(96, 165, 250, 0.45);
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);

    .info .icon {
      transform: scale(1.15);
    }

    .arrow {
      transform: translateX(3px) translateY(-3px);
      color: #93c5fd;
    }
  }
`;

/* Footer de Estado de Disponibilidad */
const AvailabilityBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 0.85rem 1.25rem;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.25);
  color: #86efac;
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
  width: fit-content;
  margin: 0 auto;

  span.pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #22c55e;
    box-shadow: 0 0 10px #22c55e;
    flex-shrink: 0;
  }
`;

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const emailAddress = 'angelhmtzz@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <ContactSection id="contact" role="region" aria-label="Información de contacto">
      <div className="container">
        <SectionHeader>
          <SectionPretitle>
            // 03. Contacto
          </SectionPretitle>
          <SectionTitle
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Hablemos y <span className="highlight">Colaboremos</span>
          </SectionTitle>
        </SectionHeader>

        <ContactCardWrapper>
          <AmbientGlow aria-hidden="true" />
          <ContactCard>
            <ContactIntro>
              ¿Tienes una vacante de desarrollador, una propuesta de colaboración o una consulta técnica?
              Estoy disponible para nuevas oportunidades y abierto a conversar.
            </ContactIntro>

            {/* Caja Destacada de Correo Electrónico */}
            <EmailBox>
              <EmailDetails>
                <div className="icon-wrap" aria-hidden="true">
                  <FaEnvelope />
                </div>
                <div className="text-wrap">
                  <span className="label">Correo Electrónico Directo</span>
                  <span className="address">{emailAddress}</span>
                </div>
              </EmailDetails>

              <EmailActions>
                <ActionBtn
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={copied ? "Correo copiado" : "Copiar correo electrónico"}
                >
                  {copied ? (
                    <>
                      <FaCheck aria-hidden="true" style={{ color: '#22c55e' }} />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy aria-hidden="true" />
                      <span>Copiar</span>
                    </>
                  )}
                </ActionBtn>

                {/* <ActionLink
                  href={`mailto:${emailAddress}?subject=Contacto%20desde%20Portafolio`}
                  aria-label="Abrir cliente de correo para enviar mensaje"
                >
                  <FaPaperPlane aria-hidden="true" />
                  <span>Enviar Correo</span>
                </ActionLink> */}
              </EmailActions>
            </EmailBox>

            {/* Grid de Tarjetas de Redes Sociales */}
            <SocialCardsGrid role="list" aria-label="Redes sociales y perfiles profesionales">
              <SocialCard
                href="https://www.linkedin.com/in/angelmtzz/"
                target="_blank"
                rel="noopener noreferrer"
                $brandColor="#0A66C2"
                role="listitem"
                aria-label="Conectar en LinkedIn con Angel Martínez"
              >
                <div className="info">
                  <FaLinkedin className="icon" aria-hidden="true" />
                  <div className="meta">
                    <span className="name">LinkedIn</span>
                    <span className="handle">/in/angelmtzz</span>
                  </div>
                </div>
                <FaArrowRight className="arrow" aria-hidden="true" />
              </SocialCard>

              <SocialCard
                href="https://github.com/luisangelfc"
                target="_blank"
                rel="noopener noreferrer"
                $brandColor="#F1F5F9"
                role="listitem"
                aria-label="Explorar perfil de GitHub de Angel Martínez"
              >
                <div className="info">
                  <FaGithub className="icon" aria-hidden="true" />
                  <div className="meta">
                    <span className="name">GitHub</span>
                    <span className="handle">@luisangelfc</span>
                  </div>
                </div>
                <FaArrowRight className="arrow" aria-hidden="true" />
              </SocialCard>

              <SocialCard
                href="https://www.instagram.com/angelmtzzz_/"
                target="_blank"
                rel="noopener noreferrer"
                $brandColor="#E1306C"
                role="listitem"
                aria-label="Seguir en Instagram a Angel Martínez"
              >
                <div className="info">
                  <FaInstagram className="icon" aria-hidden="true" />
                  <div className="meta">
                    <span className="name">Instagram</span>
                    <span className="handle">@angelmtzzz_</span>
                  </div>
                </div>
                <FaArrowRight className="arrow" aria-hidden="true" />
              </SocialCard>
            </SocialCardsGrid>

            {/* Banner de Disponibilidad Laboral */}
            <AvailabilityBanner role="status">
              <span className="pulse" aria-hidden="true" />
              <span>Disponible para posiciones Jr / Full Stack • Remoto o Híbrido o Presencial (México)</span>
            </AvailabilityBanner>
          </ContactCard>
        </ContactCardWrapper>
      </div>
    </ContactSection>
  );
};

export default Contact;
