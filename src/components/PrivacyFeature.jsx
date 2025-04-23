/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import {motion} from "framer-motion";
import {useI18n} from '../hooks/useI18n.js';

export default function PrivacyFeature() {
  const { t, loading } = useI18n();
  const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut", delay },
    viewport: { once: true },
  });

  return (
    <SectionWrapper>
      <BackgroundImage src="PrivacyFeature_02_c.webp" alt="bg" />
      <OverlayDark />
      <OverlayAccent />

      <motion.div {...fadeInUp(0)} style={{ zIndex: 3 }}>
        <Title>{t.privacy_title}</Title>
      </motion.div>

      <ContentContainer as={motion.div} {...fadeInUp(0.2)}>
        <TextBlock>
          <Subtitle>{t.privacy_privacy}</Subtitle>
          <Description>{t.privacy_ainoon}
          </Description>
        </TextBlock>
        <LeftBlock>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Subtitle style={{ textAlign: "left" }}>
              {t.privacy_transparency}
            </Subtitle>
            <Description>
              {t.privacy_led}
            </Description>
          </div>
          <RightVideo
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            src="/PrivacyFeature_01_c.mp4"
          />
        </LeftBlock>
      </ContentContainer>

      {/* 카드 */}
      <CardRow as={motion.div} {...fadeInUp(0.4)}>
        {cardData.map((card, i) => (
          <InfoCard key={i}>
            <CardTitle>{t[card.titleKey]}</CardTitle>
            <CardDesc>{t[card.descKey]}</CardDesc>
          </InfoCard>
        ))}
      </CardRow>
    </SectionWrapper>
  );
}

const cardData = [
  {
    titleKey: "privacy_tech",
    descKey: "privacy_data",
  },
  {
    titleKey: "privacy_management",
    descKey: "privacy_policy",
  },
  {
    titleKey: "privacy_zero",
    descKey: "privacy_sale",
  },
];

// 스타일 구성
const SectionWrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  padding: 9rem 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const OverlayDark = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #0c0c0c 0%, rgba(12, 12, 12, 0.8) 100%);
  z-index: 1;
`;

const OverlayAccent = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #0c0c0c 30%, #2580ff 100%);
  opacity: 0.1;
  z-index: 2;
`;

const Title = styled.h2`
  color: white;
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.4;
  text-align: center;
  z-index: 3;
`;

const ContentContainer = styled.div`
  z-index: 3;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(2rem, 5vw, 6rem);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LeftBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: clamp(2rem, 5vw, 4.5rem);
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  text-align: center;
  margin-bottom: 2rem;
`;

const Subtitle = styled.h3`
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 600;
  color: white;
`;

const Description = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 400;
  line-height: 1.6;
  color: #909294;
`;

const RightVideo = styled.video`
  width: clamp(20rem, 40vw, 32rem);
  aspect-ratio: 16 / 10;
  border-radius: 1rem;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const CardRow = styled.div`
  position: relative;
  max-width: 1200px;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 0;
  gap: 1rem;

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media (max-width: 640px) {
    gap: 0.5rem;
  }
`;

const InfoCard = styled.div`
  width: calc(33% - 1.125rem);
  background: #0c0c0c;
  border-radius: 1.25rem;
  padding: 2rem;
  border: 1px solid rgba(144, 146, 148, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 12rem;

  @media (max-width: 1024px) {
    width: calc(50% - 0.75rem);
  }

  @media (max-width: 640px) {
    width: 100%;
    min-height: auto;
  }
`;

const CardTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  line-height: 130%;
`;

const CardDesc = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  color: #909294;
  line-height: 150%;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;
