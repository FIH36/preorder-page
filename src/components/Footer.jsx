/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import {FaFacebook, FaInstagram, FaTiktok, FaYoutube} from "react-icons/fa";
import {useI18n} from "../hooks/useI18n.js";

export default function Footer() {
  const { t, loading } = useI18n();

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#171719",
        }}
      >
        <FooterWrapper>
          <FooterSection>
            <SectionTitle>{t.footer_company}</SectionTitle>
            <InfoList>
              <InfoItem>{t.footer_name}</InfoItem>
              <InfoItem>
                {t.footer_address}
              </InfoItem>
              <InfoItem>{t.footer_bnumber}</InfoItem>
              <InfoItem>
                {t.footer_onumber}
                <BizInfoLink
                  href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=1058803237"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.footer_ncheck}
                </BizInfoLink>
              </InfoItem>
              {/*<InfoItem>개인정보보호책임자 정진욱</InfoItem>*/}
            </InfoList>
          </FooterSection>

          <FooterSection>
            <SectionTitle>{t.footer_support}</SectionTitle>
            <InfoList>
                <InfoItem>{t.footer_contact}</InfoItem>
              <InfoItem>{t.footer_mail}</InfoItem>
              <InfoItem>{t.footer_hours}</InfoItem>
            </InfoList>
          </FooterSection>

          <SocialMediaSection>
            <SocialIconsContainer>
              <SocialIconLink
                href="https://www.facebook.com/profile.php?id=61574594227937"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </SocialIconLink>
              <SocialIconLink
                href="https://www.instagram.com/ai__noon/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </SocialIconLink>
              <SocialIconLink
                href="https://www.youtube.com/@AI_noon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube size={24} />
              </SocialIconLink>
              <SocialIconLink
                href="https://www.tiktok.com/@ai__noon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok size={24} />
              </SocialIconLink>
            </SocialIconsContainer>
          </SocialMediaSection>

          <FooterBottom>
            <Copyright>© 2025 AInoon. All rights reserved.</Copyright>
          </FooterBottom>
        </FooterWrapper>
      </div>
    </>
  );
}

const FooterWrapper = styled.footer`
    width: 100%;
    max-width: 1440px;
    color: white;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    text-align: left;
    opacity: 0.8;

    @media (max-width: 1024px) {
        padding: 3rem 1.5rem;
    }
`;

const FooterSection = styled.div`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 1.2rem;
    color: #eee;
`;

const InfoList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const InfoItem = styled.p`
    font-size: 14px;
    line-height: 1.6;
    color: #aaa;
    margin: 0;
`;

const BizInfoLink = styled.a`
    color: white;
    text-decoration: none;
    margin-left: 0.5rem;

    &:hover {
        text-decoration: underline;
    }
`;

const FooterBottom = styled.div`
    //margin-top: 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Copyright = styled.p`
    font-size: 14px;
    color: #777;
    margin: 0;
`;

const SocialMediaSection = styled(FooterSection)`
    margin-bottom: 2rem;
`;

const SocialIconsContainer = styled.div`
    display: flex;
    gap: 1.5rem;
`;

const SocialIconLink = styled.a`
    color: #aaa;
    transition: color 0.2s ease;

    &:hover {
        color: #fff;
    }
`;