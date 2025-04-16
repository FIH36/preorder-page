import React from "react";
import styled from "@emotion/styled";
import {motion} from "framer-motion";
import {useI18n} from '../hooks/useI18n.js';

const historyData = [
  { date: "timeline_23_03", event: "timeline_23_03_text" },
  {
    date: "timeline_24_12",
    event: "timeline_24_12_text",
  },
  { date: "timeline_25_03", event: "timeline_25_03_text", highlight: true },
  { date: "timeline_25_04", event: "timeline_25_04_text" },
  { date: "timeline_25_05", event: "timeline_25_05_text" },
  { date: "timeline_25_06", event: "timeline_25_06_text" },
  { date: "timeline_25_07", event: "timeline_25_07_text" },
  {
    date: "timeline_25_08",
    event: "timeline_25_08_text",
    highlight: true,
    special: true,
  },
];

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true, amount: 0.2 },
});

const History = () => {
  const { t, loading } = useI18n();
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
              {item.highlight ? (
                item.special ? (
                  <SpecialCircle>
                    <SpecialGlow />
                  </SpecialCircle>
                ) : (
                  <HighlightedCircle>
                    <GlowEffect />
                  </HighlightedCircle>
                )
              ) : (
                <Circle />
              )}
              <Line side={index % 2 === 0 ? "left" : "right"}>
                <TextBlock side={index % 2 === 0 ? "left" : "right"}>
                  <Date highlighted={item.highlight} special={item.special}>
                    {t[item.date] || item.date}
                  </Date>

                  <Event
                    highlighted={item.highlight}
                    special={item.special}
                    dangerouslySetInnerHTML={{
                      __html: (t[item.event] || "").replace(/\n/g, "<br />"),
                    }}
                  />

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

const Wrapper = styled.section`
  padding: 9rem 2rem 2rem 2rem;
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

const HighlightedCircle = styled.div`
  width: 14px;
  height: 14px;
  background-color: #2580ff;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 2;
  box-shadow: 0 0 0 4px rgba(37, 128, 255, 0.3);

  @media (max-width: 768px) {
    left: 20px;
    transform: translate(-50%, 0);
  }
`;

const SpecialCircle = styled(HighlightedCircle)`
  background-color: orangered;
  box-shadow: 0 0 0 4px rgba(255, 69, 0, 0.3);
`;

const GlowEffect = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background: radial-gradient(
    circle,
    rgba(37, 128, 255, 0.4) 0%,
    rgba(37, 128, 255, 0) 70%
  );
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
`;

const SpecialGlow = styled(GlowEffect)`
  background: radial-gradient(
    circle,
    rgba(255, 69, 0, 0.4) 0%,
    rgba(255, 69, 0, 0) 70%
  );
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

  @media (max-width: 768px) {
    padding: 0 1rem;
    text-align: left;
  }
`;

const Date = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${(props) =>
    props.special ? "orangered" : props.highlighted ? "#2580ff" : "#2580ff"};
  ${(props) => props.highlighted && "font-weight: 700;"}
`;

const Event = styled.div`
  font-size: 1.4rem;
  color: #333;
  ${(props) => props.highlighted && "font-weight: 600;"}
  line-height: 1.4;
`;
