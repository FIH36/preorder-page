/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export default function PreorderTimeline() {
  return (
    <Wrapper>
      <Timeline>
        <Step>
          <Dot />
          <Label>4월 사전 구매 시작</Label>
        </Step>

        <Step>
          <CurrentStep>사전 구매</CurrentStep>
        </Step>

        <Step>
          <Dot />
          <Label>
            7월 AInoon 배송
            <SubText>구매 순으로 순차 배송됩니다.</SubText>
          </Label>
        </Step>
      </Timeline>
    </Wrapper>
  );
}

// ==================== 스타일 ====================

const Wrapper = styled.div`
  padding: 40px 16px;
  background-color: #f5f6f8; // 배경 이미지 기준
`;

const Timeline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;

  &::before {
    content: "";
    position: absolute;
    top: 14px;
    left: 5%;
    right: 5%;
    height: 2px;
    background: linear-gradient(to right, #2580ff 50%, #6e5cff 50%);
    z-index: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 48px;
    align-items: flex-start;

    &::before {
      top: 0;
      left: 6px;
      right: initial;
      bottom: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(to bottom, #2580ff 50%, #6e5cff 50%);
    }
  }
`;

const Step = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 1;
  min-width: 80px;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    padding-left: 24px;
  }
`;

const Dot = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #2580ff;
  z-index: 1;

  @media (max-width: 768px) {
    top: 4px;
    left: 0;
    transform: none;
  }
`;

const Label = styled.div`
  margin-top: 24px;
  font-size: 14px;
  font-weight: 600;
  color: #2580ff;

  @media (max-width: 768px) {
    margin-top: 0;
    font-size: 13px;
    padding-left: 12px;
  }
`;

const CurrentStep = styled.div`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: #2580ff;
  color: white;
  font-weight: 600;
  font-size: 14px;
  margin-top: 6px;
  z-index: 2;
  white-space: nowrap;

  @media (max-width: 768px) {
    align-self: flex-start;
    margin-left: 18px;
  }
`;

const SubText = styled.div`
  margin-top: 4px;
  font-size: 13px;
  color: #909294;
  font-weight: 400;

  @media (max-width: 768px) {
    margin-top: 2px;
  }
`;
