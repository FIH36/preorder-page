/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MainBanner from "../components/MainBanner.jsx";
import Feature from "../components/Feature.jsx";
import Footer from "../components/Footer.jsx";
import Specification from "../components/Specifications.jsx";

export default function Home() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const sectionsRef = useRef([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const productsRef = useRef([]);

  const sections = [
    { id: "banner", component: MainBanner, ref: null },
    { id: "feature", component: Feature, ref: null },
    { id: "Specification", component: Specification, ref: null },
    { id: "products", component: null, ref: null }, // 새로운 제품 선택 섹션
  ];

  // 제품 데이터
  const products = [
    {
      id: "browline",
      name: "Browline",
      color: "Black",
      price: 149,
      image: "/Main_Glasses.png", // 기존 이미지 경로 사용
      quantity: 1,
      type: "single",
      subtitle: "가볍고 편안한 착용감의 스탠다드 모델",
    },
    {
      id: "browline-bundle",
      name: "Browline 1+1",
      color: "Black",
      price: 288,
      image: "/Main_Glasses.png", // 기존 이미지 경로 사용
      quantity: 1,
      type: "bundle",
      subtitle: "동일한 제품 2개, 더 저렴한 가격으로",
    },
  ];

  // 애니메이션 변수
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

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollY(position);

      // 현재 활성 섹션 찾기
      let active = 0;
      sectionsRef.current.forEach((section, index) => {
        if (section && position >= section.offsetTop - window.innerHeight / 2) {
          active = index;
        }
      });

      setActiveSection(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 제품 카드 인터섹션 옵저버
  useEffect(() => {
    // refs 배열 초기화
    productsRef.current = Array(products.length)
      .fill()
      .map((_, i) => productsRef.current[i] || { current: null });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 제품의 데이터 인덱스 가져오기
            const productIndex = parseInt(entry.target.dataset.index);
            if (!visibleProducts.includes(productIndex)) {
              // 약간의 지연 시간을 두고 배열에 추가
              setTimeout(() => {
                setVisibleProducts((prev) => [...prev, productIndex]);
              }, productIndex * 200); // 각 제품마다 200ms 지연
            }
          }
        });
      },
      { threshold: 0.2 },
    );

    // 모든 제품 참조에 관찰자 추가
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

  // 섹션으로 스크롤
  const scrollToSection = (index) => {
    const section = sectionsRef.current[index];
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // 구매하기 페이지로 이동 (하단 버튼용)
  const handleBuyNow = () => {
    // 기본 제품으로 purchase 페이지로 이동
    navigate("/purchase", { state: { product: products[0] } });
  };

  // 특정 제품 구매하기
  const handleBuyProduct = (product) => {
    navigate("/purchase", { state: { product } });
  };

  return (
    <Container>
      {/* 섹션 컨테이너 */}
      <SectionsContainer>
        {sections.slice(0, 3).map((Section, index) => (
          <SectionWrapper
            key={Section.id}
            ref={(el) => (sectionsRef.current[index] = el)}
            id={Section.id}
          >
            <Section.component
              isActive={activeSection === index}
              scrollY={scrollY}
            />
          </SectionWrapper>
        ))}

        {/* 제품 선택 섹션 */}
        <SectionWrapper
          ref={(el) => (sectionsRef.current[3] = el)}
          id="products"
        >
          <ContentSection>
            <SectionTitle>
              <GradientText>AInoon 구매하기</GradientText>
              <Subtitle>
                스타일과 성능을 모두 갖춘 AInoon, 지금 사전예약하세요
              </Subtitle>
            </SectionTitle>

            <FeatureGrid>
              <FeatureSection>
                {products.map((product, index) => (
                  <FeatureBox
                    key={product.id}
                    className="product-card"
                    as={motion.div}
                    variants={productCardVariants}
                    initial="hidden"
                    animate={
                      visibleProducts.includes(index) ? "visible" : "hidden"
                    }
                    whileHover="hover"
                    data-index={index}
                  >
                    <ProductImageContainer>
                      <ProductImage src={product.image} alt={product.name} />
                    </ProductImageContainer>
                    <FeatureSubtitle>{product.subtitle}</FeatureSubtitle>
                    <FeatureTitle>
                      {product.name} {product.color}
                    </FeatureTitle>
                    <PriceTag>${product.price}</PriceTag>
                    <PreOrderButton onClick={() => handleBuyProduct(product)}>
                      {product.type === "bundle"
                        ? "1+1 Pre-order"
                        : "Pre-order"}
                    </PreOrderButton>
                  </FeatureBox>
                ))}
              </FeatureSection>
            </FeatureGrid>
          </ContentSection>
        </SectionWrapper>
      </SectionsContainer>

      {/* 푸터 */}
      <Footer />

      {/* 하단 고정 구매하기 배너 */}
      <BuyNowBannerContainer>
        <BuyNowBanner>
          <ProductName>
            스타일과 성능을 모두 갖춘 AInoon, 지금 바로 구매하기
          </ProductName>
          <BuyNowButton onClick={handleBuyNow}>Buy Now</BuyNowButton>
        </BuyNowBanner>
      </BuyNowBannerContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  position: relative;
  background-color: black;
  color: white;
  overflow-x: hidden;
  padding-bottom: 70px; /* 하단 배너 높이만큼 여백 추가 */
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

const NavigationIndicator = styled.div`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 100;
`;

const NavDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? "white" : "rgba(255, 255, 255, 0.3)"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }

  ${(props) =>
    props.active &&
    `
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
  `}
`;

// 하단 고정 구매하기 배너 스타일
const BuyNowBannerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  z-index: 1000;
`;

const BuyNowBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 1rem 0;
  }
`;

const ProductName = styled.div`
  color: black;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  text-align: center;

  @media (max-width: 768px) {
    white-space: normal;
    margin-bottom: 8px;
  }
`;

const BuyNowButton = styled.button`
  padding: 12px 24px;
  background-color: white;
  color: orangered;
  border: none;
  border-radius: 100px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    padding: 0 0;
  }
`;

// Feature 컴포넌트와 일치하는 스타일
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
  height: 580px; /* 제품 카드 높이 조정 */

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
  width: 80%;
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
