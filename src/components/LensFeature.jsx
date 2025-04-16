/** @jsxImportSource @emotion/react */
import {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {motion} from "framer-motion";
import {useI18n} from '../hooks/useI18n.js';

export default function LensFeature() {
  const { t, loading } = useI18n();

  const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut", delay },
    viewport: { once: true },
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/LensFeature_02_c.webp",
    "/LensFeature_03_c.webp",
    "/LensFeature_04_c.webp",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const images2 = [
    "/LensFeature_05_c.webp",
    "/LensFeature_06_c.webp",
    "/LensFeature_07_c.webp",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex2((prev) => (prev + 1) % images2.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper>
      <SectionContent as={motion.div} {...fadeInUp(0)}>
        <FeatureImageCards>
          <ImageCard
            as={motion.div}
            {...fadeInUp(0.75)}
            style={{ backgroundImage: `url(${images2[currentImageIndex2]})` }}
          />
          <ImageCard
            as={motion.div}
            {...fadeInUp(0.75)}
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          />
        </FeatureImageCards>
        <FeatureTextBlock as={motion.div} {...fadeInUp(0.1)}>
          <Title>
            {t.lens_title}
          </Title>
          <Description>
            {t.lens_easily_change}
          </Description>
        </FeatureTextBlock>
      </SectionContent>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  width: 100%;
  padding: 9rem 2rem;
  background: black;
  display: flex;
  justify-content: center;

    @media (max-width: 768px) {
        padding: 2rem 2rem;
    }
`;

const SectionContent = styled.div`
  max-width: 1440px;
  display: flex;
  gap: clamp(2rem, 6vw, 6.25rem);
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2.5rem;
  }
`;

const FeatureTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 4vw, 2rem);
    justify-content: flex-end;
    align-items: flex-end;
`;

const Title = styled.h2`
  color: white;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.4;
  text-align: right;
  @media (max-width: 768px) {
    text-align: left;
  }
`;

const Description = styled.p`
  max-width: 50rem;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 400;
  line-height: 1.6;
  text-align: right;
  color: #909294;
  @media (max-width: 768px) {
    text-align: left;
  }
`;

const SubDescription = styled.p`
  font-size: clamp(0.9rem, 2vw, 1rem);
  font-weight: 400;
  color: #909294;
  opacity: 0.7;
  text-align: left;
`;

const FeatureImageCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 2rem);

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const ImageCard = styled.div`
  width: clamp(20rem, 35vw, 32.5rem);
  aspect-ratio: 16 / 9;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 1rem;
  transition: background-image 0.5s ease-in-out;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;
