/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

// 상수 데이터를 컴포넌트 외부로 분리
const FEATURE_CONTENTS = [
  {
    subtitle: "언제, 어디서나 꾹- 누르기만 하면\n",
    title: "고성능 AI 어시스턴트",
  },
  {
    subtitle: "내 시각과 같은 각도에서 촬영이 되는",
    title: "16MP 카메라 & 1080P 영상",
  },
  {
    subtitle: "4시간 이상 음악 재생, 30분 이상 촬영 가능",
    title: "강력한 배터리와 고속 충전",
  },
  {
    subtitle: "실제 안경 같은 하루 종일 편안한 착용감",
    title: "45g 초경량 디자인",
  },
  {
    subtitle: "소리 유출 최소화 및 생생한 몰입형 사운드",
    title: "오픈 이어 스피커",
  },
  {
    subtitle: "내가 하루 종일 쓰고 생활하는",
    title: "도수안경 및 선글라스 렌즈 교체",
  },
  {
    subtitle: "깨끗한 음성 인식 & 통화 품질",
    title: "3개 마이크 + 노이즈 감소",
  },
];

// 애니메이션 변수를 컴포넌트 외부로 분리
const boxVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
  hover: {
    y: -10,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    backgroundColor: "#f5f5f7",
    transition: { duration: 0.3 },
  },
};

// 기능 박스 컴포넌트 분리
const FeatureBoxItem = React.forwardRef(
  ({ content, index, isVisible, setBoxRef }, ref) => (
    <FeatureBox
      ref={(el) => setBoxRef(el, index)}
      as={motion.div}
      variants={boxVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover="hover"
    >
      <FeatureSubtitle>{content.subtitle}</FeatureSubtitle>
      <FeatureTitle>{content.title}</FeatureTitle>
    </FeatureBox>
  ),
);

export default function Feature() {
  const [visibleBoxes, setVisibleBoxes] = useState([]);
  const boxRefs = useRef([]);

  // refs 배열 초기화
  useEffect(() => {
    boxRefs.current = Array(FEATURE_CONTENTS.length)
      .fill()
      .map((_, i) => boxRefs.current[i] || React.createRef());
  }, []);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const boxIndex = parseInt(entry.target.dataset.index);
            if (!visibleBoxes.includes(boxIndex)) {
              setTimeout(() => {
                setVisibleBoxes((prev) => [...prev, boxIndex]);
              }, boxIndex * 200);
            }
          }
        });
      },
      { threshold: 0.2 },
    );

    // 관찰 대상 등록
    boxRefs.current.forEach((ref, index) => {
      if (ref.current) {
        ref.current.dataset.index = index;
        observer.observe(ref.current);
      }
    });

    // 클린업 함수
    return () => {
      boxRefs.current.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [visibleBoxes]);

  // ref 설정 헬퍼 함수
  const setBoxRef = (el, index) => {
    if (el && !boxRefs.current[index]) {
      boxRefs.current[index] = { current: el };
      el.dataset.index = index;
    }
  };

  // 콘텐츠 분할
  const featuresSection1 = FEATURE_CONTENTS.slice(0, 2);
  const featuresSection2 = FEATURE_CONTENTS.slice(2, 5);
  const featuresSection3 = FEATURE_CONTENTS.slice(5, 7);

  return (
    <ContentSection>
      <FeatureGrid>
        <FeatureSection>
          {featuresSection1.map((content, index) => (
            <FeatureBoxItem
              key={index}
              content={content}
              index={index}
              isVisible={visibleBoxes.includes(index)}
              setBoxRef={setBoxRef}
            />
          ))}
        </FeatureSection>

        <FeatureSection>
          {featuresSection2.map((content, index) => (
            <FeatureBoxItem
              key={index + 2}
              content={content}
              index={index + 2}
              isVisible={visibleBoxes.includes(index + 2)}
              setBoxRef={setBoxRef}
            />
          ))}
        </FeatureSection>

        <FeatureSection>
          {featuresSection3.map((content, index) => (
            <FeatureBoxItem
              key={index + 5}
              content={content}
              index={index + 5}
              isVisible={visibleBoxes.includes(index + 5)}
              setBoxRef={setBoxRef}
            />
          ))}
        </FeatureSection>
      </FeatureGrid>
    </ContentSection>
  );
}

const ContentSection = styled.div`
  word-break: keep-all;
  margin: 0 auto;
  padding: 6rem 0;
  text-align: center;
  background: linear-gradient(to bottom, #eff0f3, white);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 6rem 2rem;
  }
`;

const FeatureGrid = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FeatureSection = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  min-height: 380px;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    gap: 1.5rem;
  }
`;

const FeatureBox = styled.div`
  word-break: keep-all;
  flex: 1;
  position: relative;
  background-color: #f8f8fa;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  font-weight: 300;
  font-size: 15px;
  color: #333;
  overflow: hidden;
  height: 100%;
  min-height: 380px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); /* 파란끼 제거한 그림자 */
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 1024px) {
    min-height: 320px;
    padding: 2.5rem 1.5rem;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  word-break: keep-all;
  font-weight: 600;
  color: black;
  text-align: center;
  margin-top: 1rem;
  line-height: 1.3;
  opacity: 0.8;

  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const FeatureSubtitle = styled.div`
  color: #909294;
  word-break: keep-all;
  text-align: center;
  max-width: 80%;
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
`;
