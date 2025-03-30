/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export default function PrivacyFeature() {
  const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut", delay },
    viewport: { once: true },
  });

  return (
    <SectionWrapper>
      <BackgroundImage src="PrivacyFeature_02.png" alt="bg" />
      <OverlayDark />
      <OverlayAccent />

      {/* 타이틀 */}
      <motion.div {...fadeInUp(0)} style={{ zIndex: 3 }}>
        <Title>보안은 철저하게, 개인정보는 안전하게</Title>
      </motion.div>

      {/* 설명 + 이미지 */}
      <ContentContainer as={motion.div} {...fadeInUp(0.2)}>
        <LeftBlock>
          <TextBlock>
            <Subtitle>개인정보 보호 및 보안 정책</Subtitle>
            <Description>
              AInoon은 사용자 개인정보 보호를 최우선으로 하여 모든 데이터를
              익명화 및 암호화로 안전하게 보호합니다. 개인정보 중심 처리와 보안
              전송 기술로 정보의 비공개를 유지하며, 사용자는 전용 앱을 통해
              데이터를 직접 저장하거나 삭제할 수 있어 안전한 환경을 제공합니다.
            </Description>
          </TextBlock>
        </LeftBlock>
        <RightImage />
      </ContentContainer>

      {/* 카드 */}
      <CardRow as={motion.div} {...fadeInUp(0.4)}>
        {cardData.map((card, i) => (
          <InfoCard key={i}>
            <CardTitle>{card.title}</CardTitle>
            <CardDesc>{card.desc}</CardDesc>
          </InfoCard>
        ))}
      </CardRow>
    </SectionWrapper>
  );
}

// 카드 데이터
const cardData = [
  {
    title: "투명한 촬영으로 신뢰를 높이다",
    desc: "사진이나 동영상 촬영 시 LED 표시등이 작동하여 주변인들에게 촬영 상황을 알리며, 사용자와 타인의 권리를 동시에 존중합니다.",
  },
  {
    title: "프라이버시를 지키는 익명화 기술",
    desc: "모든 데이터는 AI 상호작용 전에 철저히 익명화되며, 이 데이터는 어떤 경우에도 AI 모델 학습에 활용되지 않습니다.",
  },
  {
    title: "내 손 안에서 완벽한 데이터 관리",
    desc: "스마트폰을 통해 언제든 데이터를 확인·수정·삭제할 수 있으며, 모든 데이터는 각 국가의 개인정보보호정책에 따라 관리됩니다.",
  },
  {
    title: "데이터 판매 제로, 철저한 보안 원칙",
    desc: "수집된 모든 데이터는 제3자에게 판매되지 않으며, LED 표시등 작동을 통해 사용자의 촬영 권리와 타인의 프라이버시를 동시에 존중합니다.",
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
  flex-direction: row;
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
  max-width: 44rem;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 5vw, 4.5rem);
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Subtitle = styled.h3`
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 600;
  color: white;
`;

const Description = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  font-weight: 400;
  line-height: 1.6;
  color: #909294;
`;

const RightImage = styled.div`
  width: clamp(20rem, 40vw, 32rem);
  aspect-ratio: 16 / 10;
  background: url("PrivacyFeature_01.gif") center center / cover no-repeat;
  border-radius: 1rem;
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
  width: calc(25% - 1.125rem);
  background: #0c0c0c;
  border-radius: 1.25rem;
  padding: 2rem;
  border: 1px solid rgba(144, 146, 148, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 18rem;

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
