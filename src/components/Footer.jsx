/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export default function Footer() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#171719",
      }}
    >
      <FooterWrapper>
        <>
          <CompanyInfo>
            <div style={{ marginBottom: "1rem" }}>주식회사 시어스랩</div>
            <CustomerService>
              <p>대표자명 : 정진욱</p>
              <p>사업자번호 : 105-88-03237</p>
              <p>통신판매신고번호 : 제2020-서울강남-00126호</p>
              <p>서울특별시 서초구 서초동 강남대로 315 파이낸셜뉴스빌딩 2층</p>
              <p>070-7702-6800</p>
              <p>business@seerslab.com</p>
            </CustomerService>
          </CompanyInfo>
        </>
        <>
          <PolicyLinks>
            <a href="#">이용약관</a> <a href="#">개인정보처리방침</a>
          </PolicyLinks>
        </>
      </FooterWrapper>
    </div>
  );
}

/* ✅ Emotion 스타일 */
const FooterWrapper = styled.footer`
  width: 100%;
  max-width: 1440px;
  color: white;
  padding: 6rem;
  display: flex;
  justify-content: space-between;
  text-align: left;
  opacity: 50%;
`;

/* ✅ 내부 요소들이 균등한 크기를 가짐 */
const CompanyInfo = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 800;
`;

const CustomerService = styled.div`
  font-weight: 300;
  text-align: left;
  font-size: 14px;
  line-height: 2;
`;

const PolicyLinks = styled.div`
  text-align: left;
  font-size: 14px;
  font-weight: 300;

  a {
    color: white;
    text-decoration: none;
    margin: 0 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;
