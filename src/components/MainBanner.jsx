/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import PaymentModal from "../components/PaymentModal.jsx";
import Header from "./Header.jsx";

export default function MainBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);

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
    IMP.init("imp05377622"); // ✅ 포트원 고객사 식별코드

    const merchantUid = `order_${new Date().getTime()}`; // ✅ 주문번호 생성
    const amount = 10000; // ✅ 결제 금액

    IMP.request_pay(
      {
        pg: "html5_inicis", // ✅ KG이니시스 PG
        pay_method: "card", // 카드 결제
        merchant_uid: merchantUid, // ✅ 주문번호
        amount: amount, // ✅ 결제금액
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

          // ✅ Google Sheets에 저장
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

          // ✅ 실패한 결제도 기록
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
        "https://script.google.com/macros/s/AKfycbwYZaOJ6TDQPi0zYSzlb5r7aM1CzXzbEt6YIiwNZsYGo73MdKFyxUe9TuW4z-8uoXttUg/exec", // ✅ 배포된 최신 URL 사용
        {
          method: "POST",
          redirect: "follow", // ✅ 리디렉션 처리
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "text/plain;charset=utf-8", // ✅ CORS 문제 해결
          },
        },
      );

      console.log("📌 스프레드시트 저장 성공!", await response.text());
    } catch (error) {
      console.error("❌ 스프레드시트 저장 오류:", error);
    }
  };

  return (
    <>
      <BannerWrapper>
        <Header />
        <BackgroundVideo autoPlay loop muted playsInline>
          <source src="/08.mp4" type="video/mp4" />
        </BackgroundVideo>
        <BannerContainer>
          <BannerImage />
          <BannerInfo>
            <SubText>
              <span>더 넓게</span> 보고, <span>더 깊게</span> 이해하다.
            </SubText>
            <BannerTitle>
              <h1>세상을 더 스마트하게 경험하는 방법</h1>
            </BannerTitle>
            <BuyButton onClick={handleOpenModal}>Buy now</BuyButton>
          </BannerInfo>
        </BannerContainer>
      </BannerWrapper>

      {/* ✅ 결제 팝업 */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
      />
    </>
  );
}

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 980px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: black;
  @media (max-width: 1024px) {
    height: auto;
  }
`;

const BannerContainer = styled.div`
  width: 100%;
  height: auto;
  max-width: 1440px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 1.5rem;
  position: relative;
  @media (max-width: 1024px) {
    position: inherit;
  }
`;

const BackgroundVideo = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BannerImage = styled.div`
  z-index: 1;
  position: absolute;
  width: 120%;
  height: auto;
  aspect-ratio: 16 / 9;
  background-image: url("/Main_Glasses.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 90%;

  @media (max-width: 1024px) {
    position: inherit;
    width: 130%;
  }
`;

const BannerInfo = styled.div`
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: center;

  @media (max-width: 1024px) {
    align-items: center;
  }
`;

const SubText = styled.div`
  font-size: 3.8rem;
  font-weight: bold;
  line-height: 5.5rem;
  color: white;
  opacity: 70%;
  text-align: left;
  word-break: keep-all;

  span {
    opacity: 100%;
  }

  @media (max-width: 1024px) {
    text-align: center;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 3.25rem;
  }
`;

const BannerTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.5rem;
  h1 {
    font-size: 3.8rem;
    line-height: 5.5rem;
    color: white;
    text-align: left;
    word-break: keep-all;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    margin-bottom: 2rem;
    h1 {
      font-size: 2.5rem;
      line-height: 3.25rem;
      text-align: center;
    }
  }
`;

const BuyButton = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.2);
  //border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 48px;
  border-radius: 100rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-bottom: 1rem;

  &:hover {
    color: black;
    background-color: white;
  }
`;
