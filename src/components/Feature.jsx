/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import {
  FiBatteryCharging,
  FiCamera,
  FiEye,
  FiFeather,
  FiMic,
  FiVolume2,
  FiZap,
} from "react-icons/fi";

const FEATURE_CONTENTS = [
  {
    icon: <FiZap />,
    subtitle: "언제, 어디서나 꾹- 누르기만 하면 실행",
    title: "고성능 AI 어시스턴트",
  },
  {
    icon: <FiCamera />,
    subtitle: "내 시선과 같은 각도로 촬영",
    title: "16MP 카메라 & 1080P 영상",
  },
  {
    icon: <FiBatteryCharging />,
    subtitle: "4시간 이상 음악 재생, 30분 이상 촬영 가능",
    title: "강력한 배터리와 고속 충전",
  },
  {
    icon: <FiFeather />,
    subtitle: "실제 안경 같은 하루 종일 편안한 착용감",
    title: "45g 초경량 디자인",
  },
  {
    icon: <FiVolume2 />,
    subtitle: "소리 유출 최소화 및 생생한 몰입형 사운드",
    title: "오픈 이어 스피커",
  },
  {
    icon: <FiEye />,
    subtitle: "라이프스타일에 맞춘 렌즈 교체 지원",
    title: "도수안경 및 선글라스 렌즈 교체",
  },
  {
    icon: <FiMic />,
    subtitle: "라이프스타일에 맞춘 렌즈 교체 지원",
    title: "3개 마이크 + 노이즈 감소",
  },
];

export default function Feature() {
  const featuresSection1 = FEATURE_CONTENTS.slice(0, 4);
  const featuresSection2 = FEATURE_CONTENTS.slice(4, 7);

  return (
    <SectionWrapper>
      <FeatureRow>
        {featuresSection1.map((item, i) => (
          <FeatureItem key={i}>
            <Icon>{item.icon}</Icon>
            <Title>{item.title}</Title>
            <Subtitle>{item.subtitle}</Subtitle>
          </FeatureItem>
        ))}
      </FeatureRow>
      <FeatureRow>
        {featuresSection2.map((item, i) => (
          <FeatureItem key={i}>
            <Icon>{item.icon}</Icon>
            <Title>{item.title}</Title>
            <Subtitle>{item.subtitle}</Subtitle>
          </FeatureItem>
        ))}
      </FeatureRow>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 0 1.5rem 9rem 1.5rem;
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

const FeatureRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4rem;

  @media (max-width: 1024px) {
    gap: 2rem;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeatureItem = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: white;
  text-align: center;

  @media (max-width: 600px) {
    width: 100%;
    max-width: 300px;
  }
`;

const Icon = styled.div`
  font-size: 32px;
  color: white;
  margin-bottom: 0.75rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #909294;
  line-height: 1.4;
  margin: 0;
`;
