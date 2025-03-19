/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export default function Header() {
  return (
    <HeaderContainer>
      <ContentsBox>
        <Logo src="/AInoon-logo.svg" alt="Logo" />
        <BuyNow>구매하기</BuyNow>
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
  max-width: 1440px;
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
