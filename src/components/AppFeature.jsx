/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useI18n } from '../hooks/useI18n.js';
import { useI18nContext } from "../contexts/I18nContext.jsx";

export default function AppFeature() {
  const { t, loading } = useI18n();
  const { lang } = useI18nContext();

  const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut", delay },
    viewport: { once: true },
  });

  const isKorean = lang?.startsWith("ko");
  const imageSrc = isKorean
    ? "/AppFeature_01_ko.webp"
    : "/AppFeature_01_en.webp";

  return (
    <SectionWrapper>
      <SectionContent as={motion.div} {...fadeInUp(0)}>
        <FeatureBlock as={motion.div} {...fadeInUp(0.1)}>
          <Title>
            {t.app_title}
          </Title>
          <FeatureList>
            <FeatureItem>
              <ItemTitle>{t.app_device_settings}</ItemTitle>
              <ItemDesc>
                {t.app_easily_manage}
              </ItemDesc>
            </FeatureItem>
            <FeatureItem>
              <ItemTitle>{t.app_photo_video}</ItemTitle>
              <ItemDesc>
                {t.app_capture_with}
              </ItemDesc>
            </FeatureItem>
            <FeatureItem>
              <ItemTitle>{t.app_history}</ItemTitle>
              <ItemDesc>
                {t.app_finding}
              </ItemDesc>
            </FeatureItem>
          </FeatureList>
          <DownloadButtons as={motion.div} {...fadeInUp(1.3)}>
            <img src="/appstore_badge.webp" alt="Download on the App Store" />
            <img src="/googleplay_badge.webp" alt="Get it on Google Play" />
          </DownloadButtons>
          {/*<ButtonSection>*/}
          {/*<div*/}
          {/*  style={{*/}
          {/*    fontSize: "1.1rem",*/}
          {/*    display: "flex",*/}
          {/*    alignItems: "center",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <img*/}
          {/*    src="/AInoon-logo.svg"*/}
          {/*    alt="AInoon"*/}
          {/*    style={{*/}
          {/*      filter: "invert(1)",*/}
          {/*      height: "20px",*/}
          {/*      marginRight: "0.75rem",*/}
          {/*    }}*/}
          {/*  />{" "}*/}
          {/*  App*/}
          {/*</div>*/}
          {/*</ButtonSection>*/}
        </FeatureBlock>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <VideoBox as={motion.div} {...fadeInUp(1.2)}>
            <img
              src={imageSrc}
              alt="App Feature Animation"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </VideoBox>
          <div
            style={{ color: "#909294", marginTop: "2rem", fontSize: "1rem" }}
          >
            {t.app_ux}
          </div>
        </div>
      </SectionContent>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  width: 100%;
  padding: 9rem 2rem;
  background: #0c0c0c;
  display: flex;
  justify-content: center;
`;

const SectionContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem; // 텍스트와 비디오 사이 간격 추가
  }
`;

const VideoBox = styled.div`
  width: clamp(18rem, 40vw, 24rem);
  aspect-ratio: 3 / 4;
  border-radius: 1rem;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FeatureBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(3rem, 4vw, 3.25rem);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DownloadButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  img {
    max-width: 210px;
  }

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;

const Title = styled.h2`
  color: white;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.4;
  text-align: left;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const FeatureList = styled.div`
  width: 100%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 3.25rem);
`;

const ButtonSection = styled.div`
  @media (max-width: 768px) {
    text-align: center;
    align-items: center;
    justify-content: center;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ItemTitle = styled.div`
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 600;
  color: #aaa;
  text-align: left;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const ItemDesc = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 400;
  line-height: 1.6;
  color: #909294;
  text-align: left;

  @media (max-width: 768px) {
    text-align: left;
  }
`;
