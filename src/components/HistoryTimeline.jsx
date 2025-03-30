import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

const historyData = [
  { date: "2023년 3월", event: "AI 글래스 R&D 진행 시작" },
  { date: "2024년 12월", event: "제작발표회" },
  { date: "2025년 3월", event: "예약 판매" },
  { date: "2025년 4월", event: "15% 할인" },
  { date: "2025년 5월", event: "10% 할인" },
  { date: "2025년 6월", event: "정상가 판매" },
  { date: "2025년 6월 말", event: "글로벌 출하시작" },
  { date: "2025년 7월", event: "소비자 예상 수령" },
];

// fadeInUp 애니메이션
const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true, amount: 0.2 },
});

const History = () => {
  return (
    <Wrapper>
      <Container>
        <Title>Timeline</Title>
        <Timeline>
          {historyData.map((item, index) => (
            <Item
              as={motion.div}
              key={index}
              side={index % 2 === 0 ? "left" : "right"}
              {...fadeInUp(index * 0.2)}
            >
              <Circle />
              <Line side={index % 2 === 0 ? "left" : "right"}>
                <TextBlock side={index % 2 === 0 ? "left" : "right"}>
                  <Date>{item.date}</Date>
                  <Event>{item.event}</Event>
                </TextBlock>
              </Line>
            </Item>
          ))}
        </Timeline>
      </Container>
    </Wrapper>
  );
};

export default History;

// 스타일 -----------------------------------------

const Wrapper = styled.section`
  padding: 0 2rem 9rem 2rem;
  background-color: #eff0f3;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: black;
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 5rem;
`;

const Timeline = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: #d1d2d6;
    opacity: 0.5;
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 20px;
      transform: none;
    }
  }
`;

const Item = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${({ side }) => (side === "left" ? "flex-end" : "flex-start")};
  margin: 40px 0;

  @media (max-width: 768px) {
    align-items: flex-start;
    padding-left: 40px;
  }
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  background-color: #d1d2d6;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);

  @media (max-width: 768px) {
    left: 20px;
    transform: translate(-50%, 0);
  }
`;

const Line = styled.div`
  width: 50%;
  display: flex;
  justify-content: ${({ side }) =>
    side === "left" ? "flex-start" : "flex-end"};

  @media (max-width: 768px) {
    width: calc(100% - 40px);
    justify-content: flex-start;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 5rem;
  text-align: ${({ side }) => (side === "left" ? "left" : "right")};
`;

const Date = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: #2580ff;
`;

const Event = styled.div`
  font-size: 1.4rem;
  color: #0c0c0c;
`;
