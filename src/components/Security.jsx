/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export default function Security() {
  return (
    <SectionWrapper>
      <Title>STAY SECURE, STAY PRIVATE</Title>
      <Description>
        AInoon은 사용자의 개인정보 보호를 최우선으로 고려합니다. AInoon AI
        글래스를 사용할 때 생성되는 모든 데이터는 철저한 암호화 및 스마트
        암호화를 통해 보호되며, 안전한 전송 기술과 개인정보 중심의 비공개가
        유지됩니다. 사용자는 AInoon 전용 스마트폰 앱을 통해 데이터를 직접 관리할
        수 있으며, 저장, 삭제 또는 내보내기를 선택하여 보다 안전한 경험을
        제공받을 수 있습니다.
      </Description>
      <LockImage src="/image.png" alt="보안 자물쇠 이미지" />
      <InfoGrid>
        <InfoBox>
          <InfoTitle>익명화 및 AI 훈련 미사용</InfoTitle>
          <InfoText>
            - AInoon AI 글래스를 통해 수집된 데이터는 ChatGPT와 상호 작용하기
            전에 익명화됩니다. <br />- 어떤 경우에도 AI 모델 학습을 위해
            데이터를 저장하거나 활용하지 않습니다.
          </InfoText>
        </InfoBox>
        <InfoBox>
          <InfoTitle>투명한 촬영, 안전한 보호</InfoTitle>
          <InfoText>
            - AInoon AI 글래스는 사진 및 동영상 촬영 시 LED 표시등이 자동으로
            켜져, 주변 사람들이 촬영 사실을 인지할 수 있도록 합니다. <br />-
            이를 통해 사용자의 촬영 권리를 보호하는 동시에 타인의 프라이버시도
            존중합니다.
          </InfoText>
        </InfoBox>
        <InfoBox>
          <InfoTitle>사용자 중심의 데이터 관리</InfoTitle>
          <InfoText>
            - AInoon 스마트폰 앱을 통해 사용자는 언제든지 데이터를 확인, 수정,
            삭제 및 내보내기 할 수 있습니다. <br />- 데이터 관리의 완전한
            통제권을 사용자에게 제공하여 투명성을 보장합니다.
          </InfoText>
        </InfoBox>
        <InfoBox>
          <InfoTitle>데이터 판매 금지 및 철저한 보호</InfoTitle>
          <InfoText>
            - AInoon은 사용자의 개인정보를 절대 판매하지 않습니다. <br />-
            사용자의 신뢰를 최우선 가치로 삼고 있으며, 강력한 보안 정책을
            지속적으로 유지합니다.
          </InfoText>
        </InfoBox>
      </InfoGrid>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-top: 1rem;
  line-height: 1.5;
`;

const LockImage = styled.img`
  width: 200px;
  height: auto;
  margin: 3rem auto;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 2rem;
`;

const InfoBox = styled.div`
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: left;
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  font-size: 1rem;
  line-height: 1.4;
  color: #555;
`;
