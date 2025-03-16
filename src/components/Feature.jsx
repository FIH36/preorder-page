/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export default function Feature() {
  return (
    <ContentSection>
      <FeatureGrid>
        <FeatureSection>
          <FeatureBox>
            <div style={{ color: "#999" }}>
              언제, 어디서든 만나는 빠른 음성 인식 & 실시간 응답
            </div>
            <h3>고성능 AI 어시스턴트</h3>
          </FeatureBox>
          <FeatureBox>
            <div style={{ color: "#999" }}>
              1600만 화소 Full HD(1080P) 동영상 촬영
            </div>
            <h3>16MP 카메라 & 1080P 영상</h3>
          </FeatureBox>
        </FeatureSection>
        <FeatureSection>
          <FeatureBox>
            <div style={{ color: "#999" }}>
              4시간 이상 음악 재생, 30분 이상 촬영 가능
            </div>
            <h3>강력한 배터리와 고속 충전</h3>
          </FeatureBox>
          <FeatureBox>
            <div style={{ color: "#999" }}>하루 종일 편안한 착용감</div>
            <h3>40g 초경량 디자인</h3>
          </FeatureBox>
          <FeatureBox>
            <div style={{ color: "#999" }}>
              소리 유출 최소화 및 생생한 몰입형 사운드
            </div>
            <h3>개방형 스피커</h3>
          </FeatureBox>
        </FeatureSection>
        <FeatureSection>
          <FeatureBox>
            <div style={{ color: "#999" }}>선글라스 및 처방렌즈 교체가능</div>
            <h3>스타일리쉬한 디자인</h3>
          </FeatureBox>
          <FeatureBox>
            <div style={{ color: "#999" }}>깨끗한 음성 인식 & 통화 품질</div>
            <h3>3개 마이크 + 노이즈 감소</h3>
          </FeatureBox>
        </FeatureSection>
      </FeatureGrid>
    </ContentSection>
  );
}

const ContentSection = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 6rem 6rem;
  text-align: center;
  @media (max-width: 1024px) {
    padding: 6rem 1rem;
  }
`;

const FeatureGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const FeatureSection = styled.div`
  width: 100%;
  height: 720px;
  display: flex;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
  }
`;

const FeatureBox = styled.div`
  flex-grow: 1;
  background-color: #171719;
  border-radius: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 4rem;
  font-weight: 300;
  font-size: 15px;
  color: white;

  h3 {
    font-size: 2rem;
    font-weight: 600;
    color: white;
    text-align: center;
    margin-top: 0.5rem;
    letter-spacing: 0.9px;
    line-height: 1.3;
  }

  /* ✅ 태블릿 이하에서 FeatureBox가 100% 너비 차지 */
  @media (max-width: 1024px) {
    width: 100%;
    height: 380px;
    padding: 2.5rem;

    h3 {
      font-size: 1.5rem;
    }
  }
`;
