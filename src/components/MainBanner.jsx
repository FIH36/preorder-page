/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import PaymentModal from "../components/PaymentModal.jsx"; // ✅ 팝업 컴포넌트 추가

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
        <BannerContainer>
          <BannerInfo>
            <SubText>AInoon Becomes a Part of Everyday Life</SubText>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1>Transform Sight Into Insight</h1>
              <h1 style={{ color: "#ff5f00" }}>.</h1>
            </div>
            <BuyButton onClick={handleOpenModal}>Buy now</BuyButton>
          </BannerInfo>
          <BannerImage />
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

// ✅ 스타일 코드 (기존과 동일)
const BannerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%),
    url("/bg.jpg") center/cover no-repeat;
`;

const BannerContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
`;

const BannerImage = styled.div`
  width: 100%;
  max-width: 1200px;
  height: auto;
  aspect-ratio: 16 / 9;
  background-image: url("/glasses_01.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const BannerInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 4rem;
    font-weight: bold;
    color: white;
    text-align: center;
    margin-bottom: 40px;
  }
`;

const SubText = styled.div`
  color: white;
  font-size: 16px;
  margin-bottom: 1rem;
  opacity: 80%;
`;

const BuyButton = styled.div`
  color: white;
  font-size: 15px;
  font-weight: 800;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 48px;
  border-radius: 100rem;
  cursor: pointer;

  &:hover {
    color: black;
    background-color: white;
  }
`;
