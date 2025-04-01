/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import {useEffect, useRef, useState} from "react";
import MainBanner from "../components/MainBanner.jsx";
import Feature from "../components/Feature.jsx";
import Footer from "../components/Footer.jsx";
import BrandIntro from "../components/BrandIntro.jsx";
import UsageIdea from "../components/UsageIdea.jsx";
import Performance from "../components/Performance.jsx";
import LensFeature from "../components/LensFeature.jsx";
import SpecImage from "../components/SpecImage.jsx";
import AppFeature from "../components/AppFeature.jsx";
import PrivacyFeature from "../components/PrivacyFeature.jsx";
import PreOrder from "../components/PreOrder.jsx";
import HistoryTimeline from "../components/HistoryTimeline.jsx";

export default function Home() {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [introDone, setIntroDone] = useState(false);
  const [buyNowText, setBuyNowText] = useState("사전 구매하기");
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setBuyNowText(window.innerWidth <= 1000 ? "구매하기" : "사전 구매하기");
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setVideoLoaded(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (videoLoaded) {
      const timer = setTimeout(() => setIntroDone(true), 1800);
      return () => clearTimeout(timer);
    }
  }, [videoLoaded]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const productIndex = parseInt(entry.target.dataset.index);
            if (!visibleProducts.includes(productIndex)) {
              setTimeout(() => {
                setVisibleProducts((prev) => [...prev, productIndex]);
              }, productIndex * 200);
            }
          }
        });
      },
      { threshold: 0.2 },
    );

    const productElements = document.querySelectorAll(".product-card");
    productElements.forEach((el, index) => {
      el.dataset.index = index;
      observer.observe(el);
    });

    return () => {
      productElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [visibleProducts]);

  const handleBuyNow = () => {
    window.open("https://stepearth.store/category/AInoon/78/", "_blank");
  };

  const UsageVideoSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handleThumbnailClick = () => {
      setIsPlaying(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.muted = false;
          videoRef.current.play();
        }
      }, 100);
    };

    return (
      <Wrapper>
        {!isPlaying && (
          <>
            <Background src="/UsageVideo_firstframe.jpg" alt="first frame" />
            <Thumbnail
              src="/video_thumbnail.png"
              alt="video thumbnail"
              onClick={handleThumbnailClick}
            />
          </>
        )}

        {isPlaying && (
          <UsageVideo ref={videoRef} controls loop playsInline preload="none">
            <source src="/UsageVideo.mp4" type="video/mp4" />
          </UsageVideo>
        )}
      </Wrapper>
    );
  };

  return (
    <>
      {!introDone && (
        <IntroSection>
          <LogoWrapper>
            <img
              src="/AInoon-logo.svg"
              alt="logo"
              style={{ width: "200px", filter: "invert(1)" }}
            />
          </LogoWrapper>
        </IntroSection>
      )}

      <Container>
        <SectionsContainer>
          <MainBanner />
          <SpecImage />
          <Feature />
          <LensFeature />
          <Performance />
          <BrandIntro />
          <UsageIdea />
          <UsageVideoSection />
          <AppFeature />
          <PrivacyFeature />
          <HistoryTimeline />
          <PreOrder />
        </SectionsContainer>

        <img src="/FooterImage.webp" alt="착용샷" style={{ width: "100%" }} />
        <Footer />

        <BuyNowBannerContainer>
          <ProductName>AInoon 4월 한달 15% 할인</ProductName>
          <BuyNowButton onClick={handleBuyNow}>
            사전 구매하기
          </BuyNowButton>
        </BuyNowBannerContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
    width: 100%;
    position: relative;
    background-color: black;
    color: white;
    overflow-x: hidden;
`;

const IntroSection = styled.section`
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
`;

const LogoWrapper = styled.div`
    animation: zoomOut 1.2s ease forwards;

    @keyframes zoomOut {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        30% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(1.4);
        }
    }
`;

const SectionsContainer = styled.div`
    position: relative;
`;

const Wrapper = styled.div`
    width: 100%;
    aspect-ratio: 16 / 9;
    position: relative;
    background-color: black;
    overflow: hidden;
`;

const Background = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
`;

const Thumbnail = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    z-index: 1;
`;

const UsageVideo = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 2;

    @media (max-width: 768px) {
        border-radius: 0;
    }
`;

// BuyNowBannerContainer - 모바일 대응 추가
const BuyNowBannerContainer = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: rgba(34, 34, 34, 0.9);
    border-radius: 100px;
    z-index: 1000;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.25rem 0.25rem 0.25rem 1.75rem;
    border: 1px solid #333;

    @media (max-width: 1024px) {
        bottom: 0;
        border-radius: 0;
        width: 100%;
        justify-content: space-between;
        padding: 0.5rem 0.75rem 0.5rem 1rem;
    }

    @media (max-width: 480px) {
        flex-wrap: nowrap;
        padding: 0.5rem 0.5rem 0.5rem 0.75rem;
    }
`;

// ProductName - 모바일에서 두 줄 표시 가능하도록 수정
const ProductName = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-right: 0.75rem;
    white-space: nowrap;
    text-align: center;
    letter-spacing: -1px;
    color: #f0f0f0;

    @media (max-width: 480px) {
        white-space: normal;
        line-height: 1.2;
        margin-right: 0.5rem;
        max-width: calc(100% - 120px); /* 버튼 너비를 감안하여 조정 */
    }

    @media (max-width: 380px) {
        font-size: 18px;
    }
`;

// 디스코 그라데이션 버튼 컴포넌트
const BuyNowButton = ({ onClick, children }) => {
  return (
    <ButtonWrapper>
      <DiscoButton onClick={onClick} className="disco-button">
        <ButtonInner className="button-inner">{children}</ButtonInner>
        <DiscoEffect className="disco-effect" />
      </DiscoButton>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
    position: relative;
    width: auto;
    min-width: 150px;
    margin: 6px 4px 6px 10px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 480px) {
        min-width: 140px;
        margin: 6px 0 6px 6px;
        height: 38px;
    }
`;

const DiscoButton = styled.button`
    position: relative;
    overflow: hidden;
    border-radius: 1000px;
    width: 100%;
    height: 46px;
    z-index: 10;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;

    /* 애니메이션 기본 적용 - 호버 상태가 아닐 때도 작동 (속도 감소) */
    & .disco-effect::before {
        animation-duration: 4s;
    }

    & .disco-effect::after {
        animation-duration: 5s;
    }

    /* 호버 시 애니메이션 속도 변경 (속도 감소) */
    &:hover .disco-effect::before {
        animation-duration: 3s;
    }

    &:hover .disco-effect::after {
        animation-duration: 3.5s;
    }

    /* 기본 상태의 내부 배경 설정 */
    & .button-inner {
        background-color: transparent;
        background-image: none;
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }

    /* 호버 시 내부 배경 효과 강화 */
    &:hover .button-inner {
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
    }

    /* 기본 상태의 디스코 효과 설정 */
    & .disco-effect {
        filter: blur(8px);
        transform: scale(1.2);
    }

    /* 호버 시 디스코 효과 조정 */
    &:hover .disco-effect {
        filter: blur(5px);
        transform: scale(1.5);
    }
`;

const ButtonInner = styled.span`
    position: absolute;
    inset: 2px;
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 1000px;
    background-color: transparent;
    color: white;
    font-weight: 600;
    font-size: 1.1rem;
    white-space: nowrap;
    padding: 0 1.5rem;
    transition: background-color 0.3s ease, text-shadow 0.3s ease;

`;

const DiscoEffect = styled.span`
    position: absolute;
    inset: 0;
    z-index: 0;
    transform: scale(1.2);
    filter: blur(8px);
    opacity: 0.9;
    overflow: hidden;
    transition: filter 0.3s ease, transform 0.3s ease;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        top: 50%;
        aspect-ratio: 1;
        background: conic-gradient(from 0deg, #0052CC, #FF3A3A, #2580FF);
        animation: disco 1.5s linear infinite;
        box-shadow: 0 0 15px 5px rgba(37, 128, 255, 0.5);
    }

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        top: 50%;
        aspect-ratio: 1;
        background: conic-gradient(from 180deg, #0052CC, #FF3A3A, #2580FF);
        animation: disco 2s linear infinite reverse;
        opacity: 0.7;
    }

    @keyframes disco {
        0% {
            transform: translateY(-50%) rotate(0deg);
        }
        100% {
            transform: translateY(-50%) rotate(360deg);
        }
    }
`;