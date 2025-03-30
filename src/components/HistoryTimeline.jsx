import React from "react";
import styled from "@emotion/styled";

const TimelineContainer = styled.div`
  background-color: #eff0f3;
  padding: 50px 20px;
  font-family:
    "Pretendard",
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    Roboto,
    sans-serif;

  @media (min-width: 768px) {
    padding: 80px 40px;
  }
`;

const TimelineTitle = styled.h2`
  color: #000;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;

  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;

  &::after {
    content: "";
    position: absolute;
    width: 2px;
    background-color: #909294;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: 767px) {
      left: 31px;
    }
  }
`;

const TimelineItem = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px 0;
  position: relative;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    justify-content: ${(props) =>
      props.position === "left" ? "flex-end" : "flex-start"};

    &::before {
      content: "";
      height: 0;
      position: absolute;
      top: 22px;
      width: 0;
      z-index: 1;
      right: ${(props) => (props.position === "left" ? "30px" : "auto")};
      left: ${(props) => (props.position === "left" ? "auto" : "30px")};
      border: medium solid #fff;
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent #fff;
      display: ${(props) => (props.position === "left" ? "block" : "none")};
    }

    &::after {
      content: "";
      height: 0;
      position: absolute;
      top: 22px;
      width: 0;
      z-index: 1;
      right: ${(props) => (props.position === "right" ? "auto" : "30px")};
      left: ${(props) => (props.position === "right" ? "30px" : "auto")};
      border: medium solid #fff;
      border-width: 10px 10px 10px 0;
      border-color: transparent #fff transparent transparent;
      display: ${(props) => (props.position === "right" ? "block" : "none")};
    }
  }
`;

const TimelineContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: relative;
  width: calc(100% - 80px);
  transition: all 0.3s ease;
  z-index: 1;

  @media (min-width: 768px) {
    width: 45%;
  }

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
`;

const TimelineDot = styled.div`
  background-color: ${(props) => (props.highlight ? "#4CAF50" : "#909294")};
  border: 4px solid #fff;
  border-radius: 50%;
  height: 16px;
  width: 16px;
  position: absolute;
  left: 30px;
  top: 20px;
  z-index: 2;

  @media (min-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const TimelineDate = styled.div`
  color: #000;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 5px;
`;

const TimelineText = styled.div`
  color: ${(props) => (props.highlight ? "#000" : "#909294")};
  font-size: 16px;
  line-height: 1.5;
  font-weight: ${(props) => (props.highlight ? "600" : "400")};
`;

const HistoryTimeline = () => {
  const timelineData = [
    {
      date: "2023년 3월",
      content: "AI 글래스 R&D 진행 시작",
      highlight: false,
      position: "left",
    },
    {
      date: "2024년 12월",
      content: "제작발표회",
      highlight: false,
      position: "right",
    },
    {
      date: "2025년 3월",
      content: "예약 판매",
      highlight: true,
      position: "left",
    },
    {
      date: "2025년 4월",
      content: "15% 할인",
      highlight: false,
      position: "right",
    },
    {
      date: "2025년 5월",
      content: "10% 할인",
      highlight: false,
      position: "left",
    },
    {
      date: "2025년 6월",
      content: "정상가 판매",
      highlight: false,
      position: "right",
    },
    {
      date: "2025년 6월 말",
      content: "글로벌 출하시작",
      highlight: true,
      position: "left",
    },
    {
      date: "2025년 7월",
      content: "소비자 예상 수령",
      highlight: false,
      position: "right",
    },
  ];

  return (
    <TimelineContainer>
      <TimelineTitle>연혁</TimelineTitle>
      <Timeline>
        {timelineData.map((item, index) => (
          <TimelineItem key={index} position={item.position}>
            <TimelineDot highlight={item.highlight} />
            <TimelineContent>
              <TimelineDate>{item.date}</TimelineDate>
              <TimelineText highlight={item.highlight}>
                {item.content}
              </TimelineText>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </TimelineContainer>
  );
};

export default HistoryTimeline;
