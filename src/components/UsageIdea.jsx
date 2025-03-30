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
    description:
      "음식 사진을 찍으면, 칼로리를 계산하고 영양 정보를 제공해 드립니다",
  },
  {
    video: "UsageIdea_02.mp4",
    title: "여행중 외국어 번역",
    description: "여행 중 메뉴, 표지판 등 실시간으로 외국어를 번역해 드립니다",
  },
  {
    video: "UsageIdea_03.mp4",
    title: "회사 업무 지원",
    description: "회의 내용을 자동으로 기록하고 중요 포인트를 요약해 드립니다",
  },
  {
    video: "UsageIdea_04.mp4",
    title: "스타일 코디네이터",
    description: "입지 않아도 OK! 손짓 하나로 코디 추천을 받아보세요",
  },
];

// 메인 컴포넌트 함수
function UsageIdea() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef({});

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
              <span>언제 어디서나</span> AI와 대화하고,
              <br />
              지금 보이는 장면에 대해<span> 물어보세요!</span>
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
          <StyledSwiper
            direction="vertical"
            modules={[Autoplay]}
            spaceBetween={80} // 간격 줄임
            slidesPerView={2.5} // PC에서 카드 3개가 보이도록 2.5로 설정
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              769: {
                spaceBetween: 80, // PC에서 카드 간 간격
                slidesPerView: 2.5, // PC에서 보이는 카드 수
              },
              0: {
                spaceBetween: 20,
                slidesPerView: 1.2,
              },
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {cardData.map((card, index) => (
              <StyledSwiperSlide key={index}>
                <Card isActive={index === activeIndex}>
                  <VideoWrapper isActive={index === activeIndex}>
                    <Video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={card.video}
                      muted
                      loop
                      playsInline
                    />
                  </VideoWrapper>
                  <CardContent>
                    <CardTitleMotion
                      initial={{ opacity: 0, y: 15 }}
                      animate={
                        index === activeIndex
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 15 }
                      }
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <CardTitle>{card.title}</CardTitle>
                    </CardTitleMotion>
                    <CardDescMotion
                      initial={{ opacity: 0, y: 15 }}
                      animate={
                        index === activeIndex
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 15 }
                      }
                      transition={{
                        duration: 0.5,
                        delay: 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <CardDescription>{card.description}</CardDescription>
                    </CardDescMotion>
                  </CardContent>
                </Card>
              </StyledSwiperSlide>
            ))}
          </StyledSwiper>
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
  min-height: 100vh;
  padding: 7rem 0;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;

  @media (max-width: 1200px) {
    flex-direction: column;
    padding: 6rem 0 4.5rem 0rem;
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
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 1200px) {
    width: 100%;
    padding: 0;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0 auto;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 220px; /* 더 넓은 그라디언트 영역 */
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    top: 0;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 1) 15%,
      rgba(255, 255, 255, 0.95) 30%,
      rgba(255, 255, 255, 0.8) 45%,
      rgba(255, 255, 255, 0.6) 60%,
      rgba(255, 255, 255, 0.3) 80%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  &::after {
    bottom: 0;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 1) 15%,
      rgba(255, 255, 255, 0.95) 30%,
      rgba(255, 255, 255, 0.8) 45%,
      rgba(255, 255, 255, 0.6) 60%,
      rgba(255, 255, 255, 0.3) 80%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  @media (max-width: 1200px) {
    height: 90vh;

    &::before,
    &::after {
      height: 150px;
    }
  }

  @media (max-width: 768px) {
    height: 50vh;
    margin-top: 0;

    &::before {
      height: 0;
      opacity: 0;
    }

    &::after {
      height: 100px;
      background: linear-gradient(
        to top,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.95) 0%,
        rgba(255, 255, 255, 0.85) 20%,
        rgba(255, 255, 255, 0.7) 40%,
        rgba(255, 255, 255, 0.4) 60%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100vh;

  @media (max-width: 768px) {
    padding: 0 0 80px 0;
    height: 53vh;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  opacity: 0.3;
  transform: scale(0.75);
  transition: all 0.4s ease;
  height: auto; // ✅ 중요: 강제 높이 제거

  &.swiper-slide-active {
    opacity: 1;
    transform: scale(1);
  }

  @media (max-width: 768px) {
    opacity: 0.4;
    transform: scale(0.9);
  }
`;

const Card = styled.div`
  background: transparent;
  transition: all 0.4s ease-in-out;
  width: 520px;
  max-width: 85%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: auto; // ✅ 반드시 auto로

  @media (max-width: 768px) {
    max-width: 92%;
  }

  @media (min-width: 1200px) {
    width: 480px;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9; // ✅ 핵심
  border-radius: 1.5rem;
  overflow: hidden;
  background: white;
  margin-bottom: 1.5rem;
  box-shadow: ${(props) =>
    props.isActive
      ? "0 16px 40px rgba(0, 0, 0, 0.16)"
      : "0 4px 12px rgba(0, 0, 0, 0.06)"};
  border: 1px solid ${(props) => (props.isActive ? "#e8e8e8" : "#f0f0f0")};

  // ✅ aspect-ratio 미지원 브라우저만 fallback
  @supports not (aspect-ratio: 16 / 9) {
    &::before {
      content: "";
      display: block;
      padding-top: 56.25%;
    }
  }
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

const CardContent = styled.div`
  margin-top: 1rem;
  font-size: 1.25rem;
  text-align: center;
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const CardTitleMotion = styled(motion.div)`
  margin-bottom: 0.5rem;
`;

const CardDescMotion = styled(motion.div)``;

const CardTitle = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const CardDescription = styled.div`
  color: #909294;
  font-weight: 400;
  font-size: 1.25rem;
  text-align: center;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// default 내보내기
export default UsageIdea;
