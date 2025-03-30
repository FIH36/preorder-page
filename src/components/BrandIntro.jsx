/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion"; // framer-motion 추가 (필요시 설치)
// swiper 라이브러리 관련 import
// 설치 필요: npm install swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const BrandIntro = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const videoRefs = useRef({});

  // 텍스트 애니메이션을 위한 상태 추가
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 스크롤 애니메이션을 위한 Intersection Observer 설정
  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTitleVisible(true);
            titleObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    const subtitleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 제목이 나타난 후 약간의 지연 시간을 두고 부제목 표시
            setTimeout(() => {
              setSubtitleVisible(true);
            }, 300);
            subtitleObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    if (subtitleRef.current) {
      subtitleObserver.observe(subtitleRef.current);
    }

    return () => {
      if (titleRef.current) titleObserver.disconnect();
      if (subtitleRef.current) subtitleObserver.disconnect();
    };
  }, []);

  // 비디오 재생 관리
  useEffect(() => {
    // 모든 비디오 일시 정지
    Object.values(videoRefs.current).forEach((video) => {
      if (video) video.pause();
    });

    // 활성 비디오만 재생
    const activeVideo = videoRefs.current[activeIndex];
    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play().catch((e) => console.log("비디오 자동재생 실패:", e));
    }
  }, [activeIndex]);

  const isMobile = windowWidth <= 768;

  // 동적으로 슬라이드 너비 계산
  const getSlideWidth = () => {
    if (isMobile) {
      return { width: "80vw" };
    } else {
      return { width: "720px" };
    }
  };

  // 애니메이션 변수
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <SectionWrapper>
      <HeroText>AInoon Becomes a Part of Everyday Life</HeroText>
      <ContentWrapper>
        <TitleBlock>
          <motion.div
            ref={titleRef}
            variants={titleVariants}
            initial="hidden"
            animate={titleVisible ? "visible" : "hidden"}
          >
            <MainTitle>
              탭-탭!<span> 찰칵보다 </span>빠른 터치!
            </MainTitle>
          </motion.div>

          <motion.div
            ref={subtitleRef}
            variants={subtitleVariants}
            initial="hidden"
            animate={subtitleVisible ? "visible" : "hidden"}
          >
            <Subtitle>
              찰나를 저장하는 마법의 터치, 내 눈앞의 순간을 영원히 기억하자
            </Subtitle>
          </motion.div>
        </TitleBlock>

        <CarouselContainer>
          <StyledSwiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={isMobile ? 32 : 64}
            slidesPerView={"auto"}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            initialSlide={0}
            watchSlidesProgress={true}
          >
            {cardData.map((card, index) => (
              <StyledSwiperSlide key={index} style={getSlideWidth()}>
                {({ isActive }) => (
                  <Card isActive={isActive}>
                    <VideoWrapper>
                      <Video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={card.video}
                        muted
                        loop
                        playsInline
                      />
                    </VideoWrapper>
                    <CardContent>
                      <CardTitle>{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </CardContent>
                  </Card>
                )}
              </StyledSwiperSlide>
            ))}
          </StyledSwiper>
        </CarouselContainer>
      </ContentWrapper>
    </SectionWrapper>
  );
};

const cardData = [
  {
    video: "/01_dog.mp4",
    title: "사랑스러운 순간",
    description: "반려동물의 사랑스러운 순간, 놓칠 틈 없이 빠르게 기록하세요",
  },
  {
    video: "/01_baby.mp4",
    title: "감동의 순간",
    description: "아기 첫 걸음, 순간이 아닌 영원한 기억으로 남겨주세요",
  },
  {
    video: "/01_family.mp4",
    title: "행복한 순간",
    description:
      "행복한 찰나, 기억이 아닌 기록으로 가족, 친구들과 오래오래 간직하세요",
  },
  {
    video: "/01_parking.mp4",
    title: "기억이 필요한 순간",
    description: "기억할 필요 없이 탭 한번으로 주차 위치를 저장하세요",
  },
];

const SectionWrapper = styled.div`
  background: #eff0f3;
  padding: 1rem;
`;

const HeroText = styled.div`
  color: white;
  font-size: 120px;
  font-weight: bold;
  padding: 4.5rem;
  white-space: nowrap;
  width: 140vw;
  transform: translateX(-20vw);

  @media (max-width: 768px) {
    font-size: 48px;
    padding: 2rem 1rem;
    width: 100vw;
    white-space: nowrap;
    transform: translateX(-10vw);
  }
`;

const ContentWrapper = styled.div`
  padding: 4.5rem 0 9rem 0;

  @media (max-width: 768px) {
    padding: 2rem 0 4rem 0;
  }
`;

const TitleBlock = styled.div`
  margin-bottom: 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const MainTitle = styled.div`
  color: black;
  font-size: 3.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  word-break: keep-all;

  span {
    color: #909294;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.div`
  color: #909294;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.5px;
  opacity: 0.8;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
  padding: 3rem 0;

  @media (max-width: 768px) {
    padding: 1.5rem 0;

    .swiper {
      overflow: visible;
      padding: 1.5rem 0;
    }

    .swiper-slide-active {
      z-index: 10;
    }

    .swiper-slide:not(.swiper-slide-active) {
      opacity: 0.8;
    }
  }
`;

// Swiper 스타일링
const StyledSwiper = styled(Swiper)`
  width: 100%;
  overflow: visible;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;

  @media (max-width: 768px) {
    padding-top: 2rem;
    padding-bottom: 2rem;

    /* 모바일에서 확대 효과가 잘 보이도록 여백 확보 */
    .swiper-wrapper {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;

// StyledSwiperSlide에서 width 속성을 제거하고 인라인 스타일로 처리
const StyledSwiperSlide = styled(SwiperSlide)`
  overflow: visible;
  transition: transform 0.3s ease;

  &.swiper-slide-active {
    z-index: 10;
  }
`;

const Card = styled.div`
  border-radius: 1.5rem;
  overflow: hidden;
  background: white;
  //box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease-in-out;
  transform: ${(props) => (props.isActive ? "scale(1.08)" : "scale(1)")};
  transform-origin: center center;
  height: 100%;
`;

const VideoWrapper = styled.div`
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  overflow: hidden;
`;

const Video = styled.video`
  width: 100%;
  height: 400px;
  object-fit: cover;
  background-color: gray;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const CardContent = styled.div`
  padding: 2rem;
  font-size: 1.25rem;
  letter-spacing: -0.5px;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    font-size: 1rem;
  }
`;

const CardTitle = styled.div`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2580ff;
  word-break: keep-all;
`;

const CardDescription = styled.div`
  color: black;
  line-height: 130%;
  font-weight: 400;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

export default BrandIntro;
