/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import InteractiveBoxesSection from "../components/InteractiveBoxesSection";
import SecuritySection from "../components/SecuritySection";
import SpecificationsSection from "../components/SpecificationsSection";
import Footer from "../components/Footer";

export default function Home() {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <Wrapper>
      {/* 섹션 1: 풀폭 이미지 + 중앙 텍스트 */}
      <Section1>
        <h1>TRANSFORM <br /> SIGHT INTO INSIGHT</h1>
      </Section1>

      {/* 섹션 2: 풀폭 비디오 (중앙 플레이 버튼) */}
      <Section2>
        <Video controls>
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </Video>
        <PlayButton>▶</PlayButton>
      </Section2>

      {/* 섹션 3: 제품 특장점 박스 */}
      <ContentSection>
        <h2>제품 특장점</h2>
        <FeatureGrid>
          <FeatureBox>특장점 1</FeatureBox>
          <FeatureBox>특장점 2</FeatureBox>
          <FeatureBox>특장점 3</FeatureBox>
          <FeatureBox>특장점 4</FeatureBox>
        </FeatureGrid>
      </ContentSection>

      {/* 섹션 4: 중앙 정렬 문구 */}
      <ContentSection>
        <h2>AInoon Becomes a Part of Everyday Life</h2>
      </ContentSection>

      <InteractiveBoxesSection/>
      <SecuritySection/>
      <SpecificationsSection/>
      <Footer/>

    </Wrapper>
  );
}

/* ✅ 특장점 데이터 */
const features = [
  { text: "재료를 보면 레시피가 떠오른다." },
  { text: "번역 뿐 아니라 요리 설명에 음식 추천까지 한 번에" },
  { text: "회의 내용도 놓치지 말고 AI를 이용해 정리해 보세요" },
  { text: "손끝으로 콕! 원하는 정보를 바로 질문하세요" },
];

/* ✅ Emotion 스타일 */
const Wrapper = styled.div`
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Section1 = styled.div`
  width: 100%;
  height: 80vh;
  background: url('/background.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  h1 {
    font-size: 3rem;
    font-weight: bold;
    color: black;
  }
`;

const Section2 = styled.div`
  width: 100%;
  position: relative;
`;

const Video = styled.video`
  width: 100%;
  height: auto;
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  cursor: pointer;
`;

/* ✅ 모든 콘텐츠 섹션 (Section3 ~ Section5) 공통 스타일 */
const ContentSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
  text-align: center;
`;

/* ✅ 특장점 그리드 */
const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 2rem;
`;

const FeatureBox = styled.div`
  padding: 2rem;
  border: 1px solid #ddd;
  text-align: center;
`;

/* ✅ 섹션 5 */
const Section5 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 0.3s ease-in-out;
  width: 100%;
  max-width: 1200px;
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
