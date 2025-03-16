/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MainBanner from "../components/MainBanner.jsx";
import Feature from "../components/Feature.jsx";
import Specifications from "../components/Specifications.jsx";

import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const fadeInUp = {
    style: { display: "block", width: "100%" },
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1, delay: 0.5, ease: "easeOut" },
    viewport: { once: false },
  };

  const mainRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            // 업데이트 시 로직 추가 가능
          },
        },
      })
      .to(sceneRef.current, {
        ease: "none",
        x: "-25vw",
        y: "100vh",
      });
  }, []);

  return (
    <Container
      // style={{ backgroundColor: "yellow" }}
      ref={mainRef}
    >
      <MainBanner />

      {/*<motion.div {...fadeInUp}>*/}
      <Section2>
        <Video controls>
          <source src="/Intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </Video>
        {/*<PlayButton>▶</PlayButton>*/}
      </Section2>
      {/*</motion.div>*/}

      {/*<CanvasWrapper ref={sceneRef}>*/}
      {/*  <Canvas>*/}
      {/*    <Scene />*/}
      {/*  </Canvas>*/}
      {/*</CanvasWrapper>*/}

      <motion.div {...fadeInUp}>
        <Feature />
      </motion.div>

      {/*<motion.div {...fadeInUp}>*/}
      {/*  <h2>AInoon Becomes a Part of Everyday Life</h2>*/}
      {/*</motion.div>*/}

      {/*<motion.div {...fadeInUp}>*/}
      {/*  <InteractiveBoxes />*/}
      {/*</motion.div>*/}

      {/*<motion.div {...fadeInUp}>*/}
      {/*  <SecuritySection />*/}
      {/*</motion.div>*/}

      <motion.div {...fadeInUp}>
        <Specifications />
      </motion.div>

      <Footer />
    </Container>
  );
}

const features = [
  { text: "재료를 보면 레시피가 떠오른다." },
  { text: "번역 뿐 아니라 요리 설명에 음식 추천까지 한 번에" },
  { text: "회의 내용도 놓치지 말고 AI를 이용해 정리해 보세요" },
  { text: "손끝으로 콕! 원하는 정보를 바로 질문하세요" },
];

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const Section2 = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 0 1rem;
  display: flex;
  position: relative;
`;

const Video = styled.video`
  width: 100%;
  border-radius: 1.5rem;
  height: auto;

  @media (max-width: 1024px) {
    border-radius: 0.5rem;
  }
`;
