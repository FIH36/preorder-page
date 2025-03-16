/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export default function Header() {
  return (
    <>
      {/*<EventSection>Shipping AInoon to South Korea 🇰🇷</EventSection>*/}
      <HeaderContainer>
        <Logo src="/AInoon-logo.svg" alt="Logo" />
      </HeaderContainer>
    </>
  );
}

const EventSection = styled.div`
  width: 100%;
  //height: 24px;
  display: flex;
  align-items: center;
  color: black;
  justify-content: center;
  font-size: 13px;
  padding: 4px 2rem;
`;

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 1440px;
  height: 72px;
  display: flex;
  align-items: center;
  padding: 0 2rem;
`;

const Logo = styled.img`
  height: 1rem;
  fill: white;
`;
