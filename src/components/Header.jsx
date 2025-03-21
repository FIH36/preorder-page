/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    navigate("/purchase"); // '/purchase'는 PurchasePage 컴포넌트의 경로입니다
  };

  return (
    <HeaderContainer>
      <ContentsBox>
        <Logo src="/AInoon-logo.svg" alt="Logo" />
        <BuyNow onClick={handleBuyNowClick}>구매하기</BuyNow>
      </ContentsBox>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 92px;
  padding: 0 1.5rem;
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentsBox = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* ✅ 로고와 구매하기 버튼을 양 끝으로 정렬 */
`;

const Logo = styled.img`
  height: 1.25rem;
  filter: invert(1);
`;

const BuyNow = styled.div`
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 18px;
  border: 2px solid orangered;
  border-radius: 100rem;
  transition: all 0.3s ease-in-out;
  background-color: orangered;
  color: white;

  &:hover {
    background: black;
    color: orangered;
  }
`;
