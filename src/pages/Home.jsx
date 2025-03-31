/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
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
            <source src="/UsageVideo_c.mp4" type="video/mp4" />
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

        <img src="/FooterImage3.webp" alt="착용샷" style={{ width: "100%" }} />
        <Footer />
        <BuyNowBannerContainer>
          <ProductName>AInoon 4월 한달 15% 할인</ProductName>
          <BuyNowButton onClick={handleBuyNow}>{buyNowText}</BuyNowButton>
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

const BuyNowBannerContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 100px;
  z-index: 1000;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 1024px) {
    bottom: 0;
    border-radius: 0;
    width: 100%;
    justify-content: space-between;
  }
`;

const ProductName = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 0 1.2rem 0 2rem;
  white-space: nowrap;
  text-align: center;
  letter-spacing: -1px;
  background: linear-gradient(45deg, #2580ff, #000, #6e5cff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glowText 3s ease-in-out infinite;

  @keyframes glowText {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const BuyNowButton = styled.button`
  padding: 14px 1.5rem;
  background: linear-gradient(45deg, #2580ff, #6e5cff, #2580ff);
  background-size: 600% 600%;
  animation: gradientShift 5s ease infinite;
  color: white;
  border-radius: 100px;
  font-size: 18px;
  font-weight: 600;
  min-height: 53px;
  cursor: pointer;
  margin: 6px;
  border: none;

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  &:hover {
    filter: brightness(1.1);
  }
`;
