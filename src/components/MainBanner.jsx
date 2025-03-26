/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import PaymentModal from "./PaymentModal.jsx";

export default function MainBanner({ isActive, scrollY }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const bannerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start start", "end start"],
  });

  // 스크롤 위치에 따라 효과 적용
  useEffect(() => {
    const vh = window.innerHeight;

    // 스크롤 위치에 따라 단계 변경
    if (scrollY < vh * 0.3) {
      setCurrentStep(1); // 초기 상태에서도 첫 번째 텍스트가 보이도록 0에서 1로 변경
    } else if (scrollY < vh * 0.6) {
      setCurrentStep(1);
    } else if (scrollY < vh * 0.9) {
      setCurrentStep(2);
    } else {
      setCurrentStep(3);
    }
  }, [scrollY]);

  // 결제 관련 스크립트 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleConfirm = (formData) => {
    setUserData(formData);
    handleCloseModal();
    processPayment(formData);
  };

  const processPayment = (formData) => {
    if (!window.IMP) {
      alert("포트원 SDK가 로드되지 않았습니다.");
      return;
    }

    const IMP = window.IMP;
    IMP.init("imp05377622");
    const merchantUid = `order_${new Date().getTime()}`;
    const amount = 10000;

    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: merchantUid,
        amount: amount,
        name: "테스트 상품",
        buyer_email: formData.email,
        buyer_name: formData.name,
        buyer_tel: formData.phone,
        buyer_addr: formData.address,
        buyer_postcode: formData.postcode,
      },
      async (response) => {
        if (response.success) {
          alert("✅ 결제 성공!");
          console.log("결제 성공 데이터:", response);
          await saveToGoogleSheet({
            merchant_uid: merchantUid,
            amount: amount,
            buyer_name: formData.name,
            buyer_email: formData.email,
            buyer_tel: formData.phone,
            status: "성공",
          });
        } else {
          alert(`❌ 결제 실패: ${response.error_msg}`);
          await saveToGoogleSheet({
            merchant_uid: merchantUid,
            amount: amount,
            buyer_name: formData.name,
            buyer_email: formData.email,
            buyer_tel: formData.phone,
            status: "실패",
          });
        }
      },
    );
  };

  const saveToGoogleSheet = async (data) => {
    try {
      console.log("📌 Google Sheets API 요청 데이터:", data);
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwYZaOJ6TDQPi0zYSzlb5r7aM1CzXzbEt6YIiwNZsYGo73MdKFyxUe9TuW4z-8uoXttUg/exec",
        {
          method: "POST",
          redirect: "follow",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
        },
      );
      console.log("📌 스프레드시트 저장 성공!", await response.text());
    } catch (error) {
      console.error("❌ 스프레드시트 저장 오류:", error);
    }
  };

  return (
    <BannerWrapper ref={bannerRef} id="main-banner">
      <Header>
        <img
          src="/AInoon-logo.svg"
          alt="Logo"
          style={{
            height: "1rem",
            filter: "invert(1)",
          }}
        />
      </Header>

      <VideoSection style={{ opacity: currentStep === 3 ? 0 : 1 }}>
        <BackgroundVideo autoPlay loop muted playsInline>
          <source src="/Main.mp4" type="video/mp4" />
        </BackgroundVideo>
      </VideoSection>

      <ContentContainer>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: currentStep >= 1 ? 1 : 0,
            y: currentStep >= 1 ? 0 : 30,
          }}
          transition={{ duration: 0.5 }}
        >
          <SubText>눈으로 보고, 찍고, 듣고, 즐기다</SubText>
          <MainText>눈앞의 모든 순간이 당신의 콘텐츠가 됩니다</MainText>
        </motion.div>
      </ContentContainer>

      {/* 결제 모달 */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </BannerWrapper>
  );
}

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: black;
`;
const Header = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  z-index: 5;
  position: absolute;
  top: 0;
`;

const VideoSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: opacity 0.5s ease-in-out;
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
`;

const ContentContainer = styled.div`
  position: absolute;
  z-index: 3;
  top: 14%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;

  @media (max-width: 768px) {
    align-items: center;
    padding: 0 1.5rem;
  }
`;

const SubText = styled.h3`
  font-size: 3rem;
  font-weight: 600;
  color: white;
  text-align: center;
  word-break: keep-all;
  margin-bottom: 0.75rem;
  opacity: 50%;
  letter-spacing: -1.4px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const MainText = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  color: white;
  text-align: center;
  word-break: keep-all;
  letter-spacing: -1.2px;
  line-height: 130%;

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;
