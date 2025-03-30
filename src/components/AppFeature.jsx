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
        <FeatureBlock as={motion.div} {...fadeInUp(0.1)}>
          <Title>
            AInoon 전용 앱으로
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
          <ButtonSection>
            <div
              style={{
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/AInoon-logo.svg"
                alt="AInoon"
                style={{
                  filter: "invert(1)",
                  height: "20px",
                  marginRight: "0.75rem",
                }}
              />{" "}
              전용 앱 (6월 출시)
            </div>
            <DownloadButtons as={motion.div} {...fadeInUp(1.3)}>
              {/*<a*/}
              {/*  href="https://apps.apple.com/app/id000000000" // 실제 앱스토어 링크로 변경*/}
              {/*  target="_blank"*/}
              {/*  rel="noopener noreferrer"*/}
              {/*>*/}
              <img src="/appstore_badge.png" alt="Download on the App Store" />
              {/*</a>*/}
              {/*<a*/}
              {/*  href="https://play.google.com/store/apps/details?id=com.example.app" // 실제 플레이스토어 링크로 변경*/}
              {/*  target="_blank"*/}
              {/*  rel="noopener noreferrer"*/}
              {/*>*/}
              <img src="/googleplay_badge.png" alt="Get it on Google Play" />
              {/*</a>*/}
            </DownloadButtons>
          </ButtonSection>
        </FeatureBlock>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <VideoBox as={motion.div} {...fadeInUp(1.2)}>
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
          <div
            style={{ color: "#909294", marginTop: "2rem", fontSize: "1rem" }}
          >
            AInoon 전용 앱으로 간편한 사용 경험 제공
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
    aspect-ratio: 3 / 4;
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
  margin-top: 1.75rem;

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
