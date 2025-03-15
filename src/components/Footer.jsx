/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export default function Footer() {
  return (
    <FooterWrapper>
        
      {/* 회사 정보 */}
      <CompanyInfo>
        <p><strong>회사명 :</strong> 주식회사 시어스랩</p>
        <p><strong>사업자번호 :</strong> 105-88-03237</p>
        <p><strong>통신판매신고번호 :</strong> 제2020-서울강남-00126호</p>
        <p><strong>대표자명 :</strong> 정진욱</p>
        <p><strong>주소 :</strong> 서울특별시 서초구 서초동 강남대로 315 파이낸셜뉴스빌딩 2층</p>
      </CompanyInfo>

      {/* 고객센터 정보 */}
      <CustomerService>
        <p><strong>고객센터 :</strong> 070-7702-6800</p>
        <p><strong>이메일 :</strong> business@seerslab.com</p>
      </CustomerService>

      {/* 이용약관 및 개인정보처리방침 */}
      <PolicyLinks>
        <a href="#">이용약관</a> | <a href="#">개인정보처리방침</a>
      </PolicyLinks>
    </FooterWrapper>
  );
}

/* ✅ Emotion 스타일 */
const FooterWrapper = styled.footer`
  width: 100%;
  background: #222;
  color: white;
  padding: 2rem 0;
  text-align: center;
`;

const CompanyInfo = styled.div`
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CustomerService = styled.div`
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const PolicyLinks = styled.div`
  font-size: 0.9rem;
  
  a {
    color: white;
    text-decoration: none;
    margin: 0 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;
