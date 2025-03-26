/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    // URL에서 결제 정보 가져오기
    const queryParams = new URLSearchParams(location.search);
    const impSuccess = queryParams.get("imp_success");
    const merchantUid = queryParams.get("merchant_uid");
    const errorMsg = queryParams.get("error_msg");

    if (impSuccess === "true") {
      setOrderStatus("success");
      setOrderInfo({ merchantUid });
    } else {
      setOrderStatus("failed");
      setOrderInfo({ merchantUid, errorMsg });
    }
  }, [location.search]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <Card>
        {orderStatus === "success" ? (
          <>
            <SuccessIcon>✓</SuccessIcon>
            <Title>결제가 완료되었습니다!</Title>
            <Message>주문번호: {orderInfo?.merchantUid}</Message>
          </>
        ) : (
          <>
            <FailIcon>✗</FailIcon>
            <Title>결제가 실패했습니다</Title>
            <Message>
              {orderInfo?.errorMsg || "알 수 없는 오류가 발생했습니다."}
            </Message>
          </>
        )}
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
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: white;
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

const FailIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #e53935;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  font-size: 32px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const Message = styled.p`
  font-size: 16px;
  text-align: center;
  color: #666;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HomeButton = styled.button`
  padding: 12px 24px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d84315;
  }
`;
