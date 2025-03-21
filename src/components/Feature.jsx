/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export default function Feature() {
  const [visibleBoxes, setVisibleBoxes] = useState([]);

  // boxRefs 초기화 방식 수정
  const boxRefs = useRef([]);

  // refs 배열 설정
  useEffect(() => {
    // 참조 배열 초기화
    boxRefs.current = Array(8)
      .fill()
      .map((_, i) => boxRefs.current[i] || React.createRef());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 박스의 데이터 인덱스 가져오기
            const boxIndex = parseInt(entry.target.dataset.index);
            if (!visibleBoxes.includes(boxIndex)) {
              // 약간의 지연 시간을 두고 배열에 추가
              setTimeout(() => {
                setVisibleBoxes((prev) => [...prev, boxIndex]);
              }, boxIndex * 200); // 각 박스마다 200ms 지연
            }
          }
        });
      },
      { threshold: 0.2 },
    );

    // 모든 박스 참조에 관찰자 추가
    boxRefs.current.forEach((ref, index) => {
      if (ref.current) {
        ref.current.dataset.index = index; // 데이터 인덱스 설정
        observer.observe(ref.current);
      }
    });

    return () => {
      boxRefs.current.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [visibleBoxes]); // visibleBoxes의 의존성 추가

  // 박스 콘텐츠 데이터
  const boxContents = [
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="orangered"
            strokeWidth="2"
          />
          <path
            d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
            stroke="orangered"
            strokeWidth="2"
          />
        </svg>
      ),
      subtitle: "언제, 어디서든 만나는 빠른 음성 인식 & 실시간 응답",
      title: "고성능 AI 어시스턴트",
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
            stroke="orangered"
            strokeWidth="2"
          />
          <path
            d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z"
            stroke="orangered"
            strokeWidth="2"
          />
        </svg>
      ),
      subtitle: "1600만 화소 Full HD(1080P) 동영상 촬영",
      title: "16MP 카메라 & 1080P 영상",
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.5 10C7.88071 10 9 8.88071 9 7.5C9 6.11929 7.88071 5 6.5 5C5.11929 5 4 6.11929 4 7.5C4 8.88071 5.11929 10 6.5 10Z"
            stroke="orangered"
            strokeWidth="2"
          />
          <path
            d="M17.5 19C18.8807 19 20 17.8807 20 16.5C20 15.1193 18.8807 14 17.5 14C16.1193 14 15 15.1193 15 16.5C15 17.8807 16.1193 19 17.5 19Z"
            stroke="orangered"
            strokeWidth="2"
          />
          <path
            d="M20 16.5H22.5C22.5 13.6005 20.1495 11.25 17.25 11.25C15.247 11.25 13.5064 12.3285 12.5779 13.9879C11.7233 13.5509 10.7459 13.3 9.7106 13.3C6.5461 13.3 3.8806 15.6134 3.504 18.6879L3.5 18.7H6.5"
            stroke="orangered"
            strokeWidth="2"
          />
          <path
            d="M13.5 7.5C13.5 5.01472 11.4853 3 9 3L9 12C11.4853 12 13.5 9.98528 13.5 7.5Z"
            stroke="orangered"
            strokeWidth="2"
          />
        </svg>
      ),
      subtitle: "4시간 이상 음악 재생, 30분 이상 촬영 가능",
      title: "강력한 배터리와 고속 충전",
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 4L12 20" stroke="orangered" strokeWidth="2" />
          <path d="M4 12L20 12" stroke="orangered" strokeWidth="2" />
          <path d="M7.5 7.5L16.5 16.5" stroke="orangered" strokeWidth="2" />
          <path d="M7.5 16.5L16.5 7.5" stroke="orangered" strokeWidth="2" />
        </svg>
      ),
      subtitle: "하루 종일 편안한 착용감",
      title: "40g 초경량 디자인",
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 8.5C15.5 10.433 13.933 12 12 12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5C13.933 5 15.5 6.567 15.5 8.5Z"
            stroke="orangered"
            strokeWidth="2"
          />
          <path
            d="M2 10.5V8.5C2 4.91015 4.91015 2 8.5 2H15.5C19.0899 2 22 4.91015 22 8.5V10.5"
            stroke="orangered"
            strokeWidth="2"
          />
          <path d="M8 15L3 20L1 18" stroke="orangered" strokeWidth="2" />
          <path d="M16 15L21 20L23 18" stroke="orangered" strokeWidth="2" />
          <path d="M12 12V21" stroke="orangered" strokeWidth="2" />
          <path d="M12 21H7" stroke="orangered" strokeWidth="2" />
          <path d="M12 21H17" stroke="orangered" strokeWidth="2" />
        </svg>
      ),
      subtitle: "소리 유출 최소화 및 생생한 몰입형 사운드",
      title: "개방형 스피커",
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 5L12 12L3 5" stroke="orangered" strokeWidth="2" />
          <path
            d="M3 5H21V18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18V5Z"
            stroke="orangered"
            strokeWidth="2"
          />
          <path
            d="M10.3607 12L3.00001 19.3607"
            stroke="orangered"
            strokeWidth="2"
          />
          <path
            d="M20.3711 19.3605L13.0104 11.9998"
            stroke="orangered"
            strokeWidth="2"
          />
        </svg>
      ),
      subtitle: "선글라스 및 처방렌즈 교체가능",
      title: "스타일리쉬한 디자인",
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="orangered"
            strokeWidth="2"
          />
          <path
            d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z"
            stroke="orangered"
            strokeWidth="2"
          />
          <path
            d="M19.7942 4.20577C16.0618 0.473343 9.93822 0.473344 6.20577 4.20577C2.47332 7.93822 2.47332 14.0618 6.20577 17.7942C9.93821 21.5267 16.0618 21.5267 19.7942 17.7942C23.5267 14.0618 23.5267 7.93822 19.7942 4.20577Z"
            stroke="orangered"
            strokeWidth="2"
          />
        </svg>
      ),
      subtitle: "깨끗한 음성 인식 & 통화 품질",
      title: "3개 마이크 + 노이즈 감소",
    },
  ];

  // 애니메이션 변수
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
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      backgroundColor: "#1e1e21",
      transition: { duration: 0.3 },
    },
  };

  // ref 할당 함수
  const setBoxRef = (el, index) => {
    if (el && !boxRefs.current[index]) {
      boxRefs.current[index] = { current: el };
      el.dataset.index = index;
    }
  };

  return (
    <ContentSection>
      <FeatureGrid>
        <FeatureSection>
          {boxContents.slice(0, 2).map((content, index) => (
            <FeatureBox
              key={index}
              ref={(el) => setBoxRef(el, index)}
              as={motion.div}
              variants={boxVariants}
              initial="hidden"
              animate={visibleBoxes.includes(index) ? "visible" : "hidden"}
              whileHover="hover"
            >
              {/*<IconContainer>{content.icon}</IconContainer>*/}
              <FeatureSubtitle>{content.subtitle}</FeatureSubtitle>
              <FeatureTitle>{content.title}</FeatureTitle>
            </FeatureBox>
          ))}
        </FeatureSection>

        <FeatureSection>
          {boxContents.slice(2, 5).map((content, index) => (
            <FeatureBox
              key={index + 2}
              ref={(el) => setBoxRef(el, index + 2)}
              as={motion.div}
              variants={boxVariants}
              initial="hidden"
              animate={visibleBoxes.includes(index + 2) ? "visible" : "hidden"}
              whileHover="hover"
            >
              {/*<IconContainer>{content.icon}</IconContainer>*/}
              <FeatureSubtitle>{content.subtitle}</FeatureSubtitle>
              <FeatureTitle>{content.title}</FeatureTitle>
            </FeatureBox>
          ))}
        </FeatureSection>

        <FeatureSection>
          {boxContents.slice(5, 8).map((content, index) => (
            <FeatureBox
              key={index + 5}
              ref={(el) => setBoxRef(el, index + 5)}
              as={motion.div}
              variants={boxVariants}
              initial="hidden"
              animate={visibleBoxes.includes(index + 5) ? "visible" : "hidden"}
              whileHover="hover"
            >
              <FeatureSubtitle>{content.subtitle}</FeatureSubtitle>
              <FeatureTitle>{content.title}</FeatureTitle>
            </FeatureBox>
          ))}
        </FeatureSection>
      </FeatureGrid>
    </ContentSection>
  );
}

// 스타일링
const ContentSection = styled.div`
  word-break: keep-all;
  max-width: 1440px;
  margin: 0 auto;
  padding: 6rem 0;
  text-align: center;
  @media (max-width: 1024px) {
    padding: 6rem 1rem;
  }
`;

const SectionTitle = styled.div`
  margin-bottom: 4rem;
  word-break: keep-all;
`;

const GradientText = styled.h2`
  word-break: keep-all;
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(90deg, #ff4500, #ffa500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  word-break: keep-all;
  color: #999;
  max-width: 600px;
  margin: 0 auto;
`;

const FeatureGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FeatureSection = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  height: 380px; /* 고정 높이 설정 */

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    gap: 1rem;
  }
`;

const FeatureBox = styled.div`
  word-break: keep-all;
  flex: 1;
  position: relative;
  background-color: #171719;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  font-weight: 300;
  font-size: 15px;
  color: white;
  overflow: hidden;
  height: 100%;
  min-height: 380px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  //&:hover {
  //  border-color: rgba(255, 69, 0, 0.2);
  //  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  //  background-color: #1a1a1d;
  //}

  @media (max-width: 1024px) {
    min-height: 320px;
    padding: 2.5rem 1.5rem;
  }
`;

const IconContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 69, 0, 0.1);
`;

const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  word-break: keep-all;
  font-weight: 600;
  color: white;
  text-align: center;
  margin-top: 1rem;
  line-height: 1.3;

  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const FeatureSubtitle = styled.div`
  color: #999;
  word-break: keep-all;
  text-align: center;
  max-width: 80%;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;
