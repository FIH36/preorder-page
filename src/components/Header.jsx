/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // 제품 데이터
  const products = [
    {
      id: "하금테 스타일",
      name: "하금테 스타일",
      color: "Black",
      price: 240000,
      image: "/black_01.png", // 기존 이미지 경로 사용
      quantity: 1,
      type: "single",
      subtitle: "세련된 감각을 담아 스마트함을 더한 하금테 프레임",
    },
    {
      id: "스퀘어 스타일",
      name: "스퀘어 스타일",
      color: "Black",
      price: 260000,
      image: "/Black_Clear01.png", // 기존 이미지 경로 사용
      quantity: 1,
      type: "bundle",
      subtitle: "클래식한 무드를 담아 신뢰감을 주는 블랙 프레임",
    },
  ];

  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    navigate("/purchase", { state: { product: products[1] } });
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
