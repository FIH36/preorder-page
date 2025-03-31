/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

export default function MainBanner({ isActive, scrollY }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const bannerRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5; // 볼륨 50%로 시작
    }
  }, []);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
    }
  };

  return (
    <BannerWrapper ref={bannerRef} id="main-banner" onClick={toggleMute}>
      <Header>
        <img
          src="/AInoon-logo.svg"
          alt="Logo"
          style={{
            height: "1.25rem",
            filter: "invert(1)",
          }}
        />
      </Header>

      <VideoSection>
        <BackgroundVideo
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
        >
          <source src="/Main2_c.mp4" type="video/mp4" />
        </BackgroundVideo>
      </VideoSection>

      <SoundToggleButton
        onClick={(e) => {
          e.stopPropagation(); // 배너 전체 클릭 이벤트 차단
          toggleMute();
        }}
      >
        {isMuted ? <FiVolumeX /> : <FiVolume2 />}
      </SoundToggleButton>

      <ContentContainer>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: currentStep >= 1 ? 1 : 0,
            y: currentStep >= 1 ? 0 : 30,
          }}
          transition={{ duration: 0.5 }}
        >
          <SubText>눈으로 보고, 찍고, 듣고, 즐기다</SubText>
          <MainText>눈앞의 모든 순간이 당신의 콘텐츠가 됩니다</MainText>
        </motion.div>
      </ContentContainer>
    </BannerWrapper>
  );
}

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

const Header = styled.div`
  z-index: 5;
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoSection = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BackgroundVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
`;

const ContentContainer = styled.div`
  position: absolute;
  z-index: 3;
  top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;

  @media (max-width: 768px) {
    align-items: center;
    padding: 0 1.5rem;
  }
`;

const SubText = styled.h3`
  font-size: 42px;
  font-weight: 700;
  color: white;
  text-align: center;
  word-break: keep-all;
  margin-bottom: 0.5rem;
  opacity: 50%;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const MainText = styled.h1`
  font-size: 42px;
  font-weight: 700;
  color: white;
  text-align: center;
  word-break: keep-all;
  letter-spacing: -1px;
  line-height: 130%;

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const SoundToggleButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  border: none;
  color: white;
  font-size: 1.8rem;
  padding: 0.6rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
`;
