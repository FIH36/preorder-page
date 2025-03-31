/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";

// 데이터 정의
const cardData = [
  {
    video: "UsageIdea_01.mp4",
    title: "칼로리 계산",
    description: "음식 사진을 찍으면, 칼로리와 영양 정보를 바로 알려드려요",
  },
  {
    video: "UsageIdea_02.mp4",
    title: "여행 중 외국어 번역",
    description: "낯선 여행지에서 외국어 번역은 물로 관광지 정보도 물어보세요",
  },
  {
    video: "UsageIdea_03.mp4",
    title: "회사 업무 지원",
    description: "업무 중에도 스마트하게 보고, 듣고, 질문하세요",
  },
  {
    video: "UsageIdea_04.mp4",
    title: "코디네이터",
    description: "입지 않아도 OK! 손짓 하나로 코디 추천을 받아보세요",
  },
];

// 메인 컴포넌트 함수
function UsageIdea() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef({});
  const swiperRef = useRef(null);

  // 애니메이션을 위한 상태
  const [titleVisible, setTitleVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

  // 요소 참조
  const titleRef = useRef(null);
  const imageRef = useRef(null);

  // 스크롤 애니메이션을 위한 Intersection Observer 설정
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          titleObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setImageVisible(true);
          }, 400);
          imageObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (titleRef.current) titleObserver.observe(titleRef.current);
    if (imageRef.current) imageObserver.observe(imageRef.current);

    return () => {
      titleObserver.disconnect();
      imageObserver.disconnect();
    };
  }, []);

  // 비디오 재생 관리
  useEffect(() => {
    Object.values(videoRefs.current).forEach((video) => {
      if (video) video.pause();
    });

    const activeVideo = videoRefs.current[activeIndex];
    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play().catch((e) => console.log("비디오 자동재생 실패:", e));
    }
  }, [activeIndex]);

  return (
    <SectionWrapper>
      <LeftSection>
        <MainTitleWrapper>
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              titleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <MainTitle>
              <span>궁금할땐</span> 꾹-! 눌러서
              <br />
              언제, 어디서나<span> 망설이지 말고</span> AI에게 물어보세요!
            </MainTitle>
          </motion.div>
        </MainTitleWrapper>

        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            imageVisible
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ImageWrapper>
            <Image src="/UsageIdea.png" alt="Glasses" />
          </ImageWrapper>
        </motion.div>
      </LeftSection>

      <RightSection>
        <CarouselContainer>
          {/* 상단 그라데이션 오버레이 */}
          <GradientOverlayTop />

          <StyledSwiper
            direction="vertical"
            modules={[Autoplay]}
            spaceBetween={100}
            slidesPerView={1.8}
            centeredSlides={true}
            allowTouchMove={false}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            breakpoints={{
              1200: {
                slidesPerView: 2.2,
                spaceBetween: 100,
              },
              768: {
                slidesPerView: 2.0,
                spaceBetween: 90,
              },
              0: {
                slidesPerView: 1.5,
                spaceBetween: 30,
              },
            }}
          >
            {cardData.map((card, index) => (
              <StyledSwiperSlide key={index}>
                <IntegratedCard isActive={index === activeIndex}>
                  {/* 비디오 부분 */}
                  <VideoWrapper isActive={index === activeIndex}>
                    <Video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={card.video}
                      muted
                      loop
                      playsInline
                    />
                  </VideoWrapper>

                  {/* 텍스트 부분 */}
                  <CardTextContent isActive={index === activeIndex}>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardTextContent>
                </IntegratedCard>
              </StyledSwiperSlide>
            ))}
          </StyledSwiper>

          {/* 하단 그라데이션 오버레이 */}
          <GradientOverlayBottom />
        </CarouselContainer>
      </RightSection>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  color: black;
  height: 100vh;
  padding: 7rem 0 5rem 0;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;

  @media (max-width: 1200px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    padding: 4rem 0 3rem 0;
    overflow: hidden; /* 모바일에서 전체 섹션 오버플로우 히든 유지 */
  }
`;

const LeftSection = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  padding-left: 5rem;
  justify-content: center;

  @media (max-width: 1200px) {
    width: 100%;
    padding: 0 2rem;
    margin-bottom: 2rem;
  }
`;

const MainTitleWrapper = styled.div`
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const MainTitle = styled.div`
  color: black;
  font-size: 2.5rem;
  line-height: 140%;
  font-weight: 700;
  word-break: keep-all;

  span {
    color: #909294;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    text-align: center;
    font-weight: 700;
  }
`;

const ImageWrapper = styled.div`
  width: 115%;
  display: flex;
  margin-left: -30%;

  @media (max-width: 768px) {
    width: 135%;
  }
`;

const Image = styled.img`
  width: 100%;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const RightSection = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1200px) {
    width: 100%;
    padding: 0;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 캐러셀 컨테이너 오버플로우 히든 유지 */

  @media (max-width: 1200px) {
    height: 700px;
  }

  @media (max-width: 768px) {
    height: 500px;
  }
`;

// 그라데이션 오버레이 높이 조정
const GradientOverlayTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 210px;
  z-index: 10;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.9) 40%,
    rgba(255, 255, 255, 0.5) 70%,
    rgba(255, 255, 255, 0) 100%
  );

  @media (max-width: 768px) {
    height: 72px;
  }
`;

// 하단 그라데이션 오버레이 조정
const GradientOverlayBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 210px;
  z-index: 10;
  pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.9) 40%,
    rgba(255, 255, 255, 0.5) 70%,
    rgba(255, 255, 255, 0) 100%
  );

  @media (max-width: 768px) {
    height: 72px;
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;

  .swiper-wrapper {
    align-items: center;
    transition-timing-function: ease-out;
  }

  .swiper-slide {
    transition: all 0.4s ease-out;
    overflow: visible; /* 개별 슬라이드는 visible 유지 */
  }

  .swiper-slide-active {
    z-index: 5;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s ease-out;
  opacity: 0.4;
  transform: scale(0.85);
  overflow: visible;

  &.swiper-slide-active {
    opacity: 1;
    transform: scale(1);
  }
`;

// 통합된 카드 컴포넌트
const IntegratedCard = styled.div`
  background: transparent;
  transition: all 0.4s ease-in-out;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
  border: none;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const VideoWrapper = styled.div`
  width: calc(100% - 1.5rem);
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  background: white;
  overflow: hidden;
  border-radius: 1.5rem;
  box-shadow: ${(props) =>
    props.isActive
      ? "0 16px 40px rgba(0, 0, 0, 0.16)"
      : "0 4px 12px rgba(0, 0, 0, 0.06)"};
  margin: 0 0.75rem; /* 양쪽에 여백 추가 */
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  background-color: #f5f5f5;
`;

const CardTextContent = styled.div`
  width: 100%;
  padding: 1.5rem 1rem;
  text-align: center;
  background-color: transparent;
  transition: all 0.3s ease-out;
  transform: ${(props) =>
    props.isActive ? "translateY(0)" : "translateY(5px)"};
  opacity: ${(props) => (props.isActive ? 1 : 0.8)};
`;

const CardTitle = styled.div`
  font-weight: 600;
  font-size: 1.35rem;
  text-align: center;
  word-break: keep-all;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const CardDescription = styled.div`
  color: #909294;
  font-weight: 400;
  font-size: 1.1rem;
  text-align: center;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default UsageIdea;
