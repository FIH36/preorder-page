/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";

export default function InteractiveBoxesSection() {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
      <Section5 style={{ backgroundColor: "#f0f0f0" }}>
        <LeftBox isHovered={hoverIndex !== null} />
        <RightBoxes isHovered={hoverIndex !== null}>
          {features.map((feature, index) => (
            <HoverBox
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              isHovered={hoverIndex === index}
              totalBoxes={features.length}
            >
              <FeatureText>{feature.text}</FeatureText>
            </HoverBox>
          ))}
        </RightBoxes>
      </Section5>
  );

}

const features = [
  { text: "재료를 보면 레시피가 떠오른다." },
  { text: "번역 뿐 아니라 요리 설명에 음식 추천까지 한 번에" },
  { text: "회의 내용도 놓치지 말고 AI를 이용해 정리해 보세요" },
  { text: "손끝으로 콕! 원하는 정보를 바로 질문하세요" },
];

const Section5 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 0.3s ease-in-out;
`;

/* ✅ 왼쪽 회색 박스 (Hover 시 사라짐) */
const LeftBox = styled.div`
  width: ${({ isHovered }) => (isHovered ? "0" : "50%")};
  height: 300px;
  background: gray;
  transition: all 0.3s ease-in-out;
`;

/* ✅ Hover 시 박스 전체 크기 조정 */
const RightBoxes = styled.div`
  width: ${({ isHovered }) => (isHovered ? "100%" : "50%")};
  height: 300px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  transition: all 0.3s ease-in-out;
`;

/* ✅ Hover된 박스만 확장 & 나머지는 기존 크기 유지 */
const HoverBox = styled.div`
  padding: 1.5rem;
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: center;
  background: #f9f9f9;
  transition: width 0.3s ease-in-out;
  width: ${({ isHovered, totalBoxes }) =>
    isHovered ? "100%" : `calc((100% - 60%) / ${totalBoxes - 1})`};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeatureText = styled.div`
  font-size: 1.2rem;
  text-align: center;
`;