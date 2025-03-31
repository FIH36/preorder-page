/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react"; // Added useRef import
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

// 제품 데이터
const PRODUCTS = [
  {
    id: "하금테_스타일",
    name: "하금테 스타일",
    color: "Black",
    price: 240000,
    image: "/black_01.png",
    subtitle: "세련된 감각을 담아 스마트함을 더한 하금테 프레임",
  },
  {
    id: "스퀘어_스타일",
    name: "스퀘어 스타일",
    color: "Black",
    price: 260000,
    image: "/Black_Clear01.png",
    subtitle: "클래식한 무드를 담아 신뢰감을 주는 블랙 프레임",
  },
];

const STORE_URLS = {
  blackFrame:
    "https://stepearth.store/product/%EC%97%90%EC%9D%B4%EC%95%84%EC%9D%B4%EB%88%88ainoon%EB%BF%94%ED%85%8C%EB%B8%94%EB%9E%99/387/category/56/display/1/",
};

const productCardVariants = {
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

export default function Home() {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [introDone, setIntroDone] = useState(false);
  const [buyNowText, setBuyNowText] = useState("사전 구매하기");
  const [videoLoaded, setVideoLoaded] = useState(false);

  // 반응형 텍스트 처리
  useEffect(() => {
    const handleResize = () => {
      setBuyNowText(window.innerWidth <= 1000 ? "구매하기" : "사전 구매하기");
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 로드 시 체크

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 인트로 로딩 처리
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

  // 제품 카드 인터섹션 옵저버
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

  // 구매 버튼
  const handleBuyNow = () => {
    window.open("https://stepearth.store/category/AInoon/78/", "_blank");
  };

  const handleBuyProduct = (productId) => {
    window.open(STORE_URLS.blackFrame, "_blank");
  };

  // UsageVideoSection 컴포넌트 정의
  const UsageVideoSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handleThumbnailClick = () => {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play();
      }
    };

    return (
      <Wrapper>
        {!isPlaying && (
          <Thumbnail
            src="/video_thumbnail.png"
            alt="video thumbnail"
            onClick={handleThumbnailClick}
          />
        )}
        <UsageVideo ref={videoRef} loop muted playsInline controls>
          <source src="/UsageVideo.mp4" type="video/mp4" />
        </UsageVideo>
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
          {/*<VideoSection>*/}
          {/*  <BackgroundVideo autoPlay loop muted playsInline controls>*/}
          {/*    <source src="/Intro.mp4" type="video/mp4" />*/}
          {/*  </BackgroundVideo>*/}
          {/*</VideoSection>*/}
          <SpecImage />
          <Feature />
          <LensFeature />
          <Performance />
          <BrandIntro />
          <UsageIdea />
          <UsageVideoSection /> {/* Using the component properly */}
          <AppFeature />
          <PrivacyFeature />
          {/*<Specification />*/}
          <HistoryTimeline />
          <PreOrder />
          {/*<DeliveryInfo />*/}
        </SectionsContainer>

        <img src="/FooterImage2.png" alt="착용샷" style={{ width: "100%" }} />
        <Footer />
        <BuyNowBannerContainer>
          <ProductName>AInoon 4월 한달 15% 할인</ProductName>
          <BuyNowButton onClick={handleBuyNow}>{buyNowText}</BuyNowButton>
        </BuyNowBannerContainer>
      </Container>
    </>
  );
}

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

const SectionWrapper = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const VideoSection = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    height: auto;
    aspect-ratio: 16 / 9;
  }
`;

const BackgroundVideo = styled.video`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    height: auto;
    aspect-ratio: 16 / 9;
    object-fit: contain;
  }
`;

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const UsageVideo = styled.video`
  width: 100%;
  height: auto;
  display: block;

  @media (max-width: 768px) {
    border-radius: 0;
  }
`;

const Thumbnail = styled.img`
  position: absolute;
  width: 100%;
  height: auto;
  object-fit: cover;
  cursor: pointer;
  z-index: 2;
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
  background: white;
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
  max-width: 400px;
  margin: 0 auto;
  line-height: 2rem;
`;

const FeatureGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 2rem;
`;

const FeatureSection = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  height: 580px;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    gap: 2rem;
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
  padding: 2rem;
  font-weight: 300;
  font-size: 15px;
  color: white;
  overflow: hidden;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
    min-height: 480px;
    padding: 2rem 1.5rem;
  }
`;

const ProductImageContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
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
  max-width: 90%;
  font-size: 1rem;
  line-height: 1.5;
`;

const PriceTag = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: orangered;
  margin: 1rem 0 1.5rem;
`;

const PreOrderButton = styled.button`
  width: 100%;
  padding: 1rem 0;
  background: linear-gradient(90deg, #ff4500, #ffa500);
  color: white;
  border: none;
  border-radius: 100px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: auto;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(255, 69, 0, 0.2);
  }
`;
