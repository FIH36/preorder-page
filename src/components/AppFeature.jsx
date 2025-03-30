/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export default function AppFeature() {
  const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut", delay },
    viewport: { once: true },
  });

  return (
    <SectionWrapper>
      <SectionContent as={motion.div} {...fadeInUp(0)}>
        <VideoBox as={motion.div} {...fadeInUp(0.2)}>
          <video
            src="AppFeature_01.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "1rem",
              objectFit: "cover",
            }}
          />
        </VideoBox>
        <FeatureBlock as={motion.div} {...fadeInUp(0.4)}>
          <Title>
            AInoon 전용앱으로
            <br />
            복잡함은 줄이고, 편리함은 더하다
          </Title>
          <FeatureList>
            <FeatureItem>
              <ItemTitle>디바이스 관리</ItemTitle>
              <ItemDesc>
                음량, AI 대기시간, Multi-LLM 선택 등의 디바이스 설정 변경 및
                개인 정보 관리
              </ItemDesc>
            </FeatureItem>
            <FeatureItem>
              <ItemTitle>사진 / 비디오 촬영 관리</ItemTitle>
              <ItemDesc>
                안경으로 순간포착하고, 촬영한 사진과 비디오를 동기화하여, 관리
              </ItemDesc>
            </FeatureItem>
            <FeatureItem>
              <ItemTitle>AI 대화 히스토리</ItemTitle>
              <ItemDesc>
                날짜, 시간 및 사진 포함 대화 기록을 최신 대화 순으로 접근 및
                검색
              </ItemDesc>
            </FeatureItem>
          </FeatureList>
        </FeatureBlock>
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
  display: flex;
  gap: clamp(2rem, 6vw, 6.25rem);
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const VideoBox = styled.div`
  width: clamp(18rem, 40vw, 32.5rem);
  aspect-ratio: 3 / 4;
  border-radius: 1rem;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    aspect-ratio: 3 / 4;
  }
`;

const FeatureBlock = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: clamp(3rem, 4vw, 3.25rem);

  @media (max-width: 768px) {
    width: 100%;
    align-items: flex-start;
    text-align: left;
  }
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

const FeatureList = styled.div`
  width: 100%;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 3.25rem);
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
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const ItemDesc = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 400;
  line-height: 1.6;
  color: #909294;
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`;
