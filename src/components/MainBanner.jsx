/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Header from "../components/Header.jsx";

export default function SecuritySection() {
  return (
    <>
      <BannerWrapper>
        <Header />
        <BannerContainer>
          <BannerInfo>
            <SubText>AInoon Becomes a Part of Everday Life</SubText>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1>Transform Sight Into Insight</h1>
              <h1 style={{ color: "#ff5f00" }}>.</h1>
            </div>

            <BuyButton>Buy now</BuyButton>
          </BannerInfo>
          <BannerImage />
        </BannerContainer>
      </BannerWrapper>
    </>
  );
}

const BannerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%),
    /* ✅ 하단으로 자연스럽게 어두워짐 */ url("/bg.jpg") center/cover no-repeat;
`;

const BannerContainer = styled.div`
  //position: relative;
  width: 100%;
  max-width: 1440px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  //padding-top: 180px;
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
  //position: absolute;
  //top: 14%;
  //left: 50%;
  //transform: translate(-50%, -50%);
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
    letter-spacing: 0.9px;
    line-height: 1.3;
  }

  @media (max-width: 1024px) {
    margin-bottom: 2rem;
    h1 {
      font-size: 2rem;
    }
  }
`;

const SubText = styled.div`
  color: white;
  font-size: 16px;
  margin-bottom: 1rem;
  opacity: 80%;
  font-weight: 300;
  letter-spacing: 0.8px;
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
  transition: all 0.3s ease-in-out;

  &:hover {
    color: black;
    background-color: white;
  }
`;
