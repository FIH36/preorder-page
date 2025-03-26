/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const theme = {
  background: {
    light: "#eee",
    card: "#ffffff",
  },
  text: {
    primary: "#333333",
    secondary: "#555555",
    muted: "#888888",
  },
  accent: {
    primary: "orangered",
    hover: "#ff6347",
  },
  border: {
    light: "#eeeeee",
    medium: "#dddddd",
  },
};

export default function OrderComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderInfo, setOrderInfo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // 페이지 로드 시 실행
  useEffect(() => {
    // 모바일 디바이스인지 확인
    const checkMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    setIsMobile(checkMobile);

    // 주문 정보 가져오기 (location.state 또는 localStorage)
    if (location.state?.paymentInfo) {
      setOrderInfo(location.state.paymentInfo);
    } else {
      try {
        const savedOrderInfo = localStorage.getItem("orderInfo");
        if (savedOrderInfo) {
          setOrderInfo(JSON.parse(savedOrderInfo));
          // 사용 후 삭제 (안전하게 유지하고 싶으면 주석 처리 가능)
          localStorage.removeItem("orderInfo");
        }
      } catch (error) {
        console.error("주문 정보 로드 실패:", error);
      }
    }
  }, [location.state]);

  // 홈으로 이동
  const handleGoHome = () => {
    navigate("/");
  };

  // 주문 정보가 없는 경우
  if (!orderInfo) {
    return (
      <Container>
        <Card>
          <Title>주문 정보를 찾을 수 없습니다</Title>
          <Message>
            주문 처리 중 문제가 발생했거나 브라우저가 새로고침되었습니다.
          </Message>
          <HomeButton onClick={handleGoHome}>홈으로 돌아가기</HomeButton>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <SuccessIcon>✓</SuccessIcon>
        <Title>주문이 완료되었습니다!</Title>

        <OrderDetails>
          <ProductImage
            src={orderInfo.productImage || "/default-image.png"}
            alt="Product"
          />
          <OrderSummary>
            <ProductName>{orderInfo.product}</ProductName>
            <OrderQuantity>수량: {orderInfo.quantity}개</OrderQuantity>
            <OrderPrice>
              총 결제 금액: {orderInfo.amount.toLocaleString()}원
            </OrderPrice>
          </OrderSummary>
        </OrderDetails>

        <DeliveryInfo>
          <InfoTitle>배송 정보</InfoTitle>
          <InfoItem>
            <Label>이름:</Label>
            <Value>{orderInfo.buyer_name}</Value>
          </InfoItem>
          <InfoItem>
            <Label>연락처:</Label>
            <Value>{orderInfo.buyer_tel}</Value>
          </InfoItem>
          <InfoItem>
            <Label>이메일:</Label>
            <Value>{orderInfo.buyer_email}</Value>
          </InfoItem>
          <InfoItem>
            <Label>주소:</Label>
            <Value>
              ({orderInfo.buyer_postcode}) {orderInfo.buyer_addr}
            </Value>
          </InfoItem>
        </DeliveryInfo>

        <DeliveryNotice>
          <NoticeTitle>배송 안내</NoticeTitle>
          <NoticeText>
            AInoon AI 글래스는 2025년 7월부터 순차적으로 배송될 예정입니다.
            배송이 시작되면 입력하신 이메일 주소로 배송 관련 정보가 발송됩니다.
          </NoticeText>
        </DeliveryNotice>

        <Divider />

        <ButtonContainer>
          <HomeButton onClick={handleGoHome}>홈으로 돌아가기</HomeButton>
        </ButtonContainer>
      </Card>
    </Container>
  );
}

// 스타일 컴포넌트
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.background.light};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: ${theme.background.card};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #4caf50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  color: ${theme.text.primary};
`;

const Message = styled.p`
  font-size: 16px;
  text-align: center;
  color: ${theme.text.secondary};
  margin-bottom: 30px;
`;

const OrderDetails = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-right: 20px;

  @media (max-width: 480px) {
    margin-right: 0;
    margin-bottom: 15px;
  }
`;

const OrderSummary = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${theme.text.primary};
`;

const OrderQuantity = styled.p`
  font-size: 14px;
  color: ${theme.text.secondary};
  margin-bottom: 5px;
`;

const OrderPrice = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.accent.primary};
`;

const DeliveryInfo = styled.div`
  width: 100%;
  margin-bottom: 20px;
  background-color: ${theme.background.light};
  padding: 15px;
  border-radius: 8px;
`;

const InfoTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: ${theme.text.primary};
`;

const InfoItem = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const Label = styled.span`
  width: 80px;
  font-size: 14px;
  color: ${theme.text.secondary};
`;

const Value = styled.span`
  flex: 1;
  font-size: 14px;
  color: ${theme.text.primary};
`;

const DeliveryNotice = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid ${theme.border.medium};
  padding: 15px;
  border-radius: 8px;
`;

const NoticeTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: ${theme.text.primary};
`;

const NoticeText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${theme.text.secondary};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.border.light};
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HomeButton = styled.button`
  padding: 12px 24px;
  background-color: ${theme.accent.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.accent.hover};
  }
`;
