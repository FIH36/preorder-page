/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { useI18nContext } from "../contexts/I18nContext.jsx";
import { useI18n } from "../hooks/useI18n.js";

export default function MainBanner({ isActive, scrollY }) {
  const [isMuted, setIsMuted] = useState(true);
  const bannerRef = useRef(null);
  const videoRef = useRef(null);

  const { t, loading } = useI18n();
  const { lang, changeLang } = useI18nContext();

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

  const isMobile = window.innerWidth <= 768;

  return (
    <BannerWrapper ref={bannerRef} id="main-banner" onClick={toggleMute}>
      <Header>
        <LangSelectWrapper>
          <LangSelect value={lang} onChange={(e) => changeLang(e.target.value)}>
            <option value="ko">{isMobile ? "🇰🇷" : "🇰🇷 한국어"}</option>
            <option value="en">{isMobile ? "🇺🇸" : "🇺🇸 English"}</option>
            <option value="zh">{isMobile ? "🇨🇳" : "🇨🇳 中文"}</option>
            <option value="de">{isMobile ? "🇩🇪" : "🇩🇪 Deutsch"}</option>
            <option value="es">{isMobile ? "🇪🇸" : "🇪🇸 Español"}</option>
          </LangSelect>
          <ChevronDownIcon />
        </LangSelectWrapper>

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
          <source src="/MainBanner_01_c.mp4" type="video/mp4" />
        </BackgroundVideo>
      </VideoSection>

      <SoundToggleButton
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
      >
        {isMuted ? <FiVolumeX /> : <FiVolume2 />}
      </SoundToggleButton>

      <ContentContainer>
        <SubText>{t.main_title}</SubText>
        <MainText>{t.main_subtitle}</MainText>
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
  top: 0.6rem;
  left: 1rem;
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

const LangSwitcher = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  display: flex;
  z-index: 10;
`;

const FlagButton = styled.button`
  font-size: 1.4rem;
  padding: 0 0.5rem;
  background: ${({ selected }) =>
    selected ? "rgba(255,255,255,0.2)" : "transparent"};
  border-radius: 6px;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
const LangSelectWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 1.2rem;
  z-index: 10;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  padding: 0.4rem 0.6rem;
`;

const LangSelect = styled.select`
  appearance: none;
  background: transparent;
  border: none;
  color: white;
  font-size: 0.9rem;
  padding-right: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  option {
    color: black;
  }

  @media (max-width: 768px) {
    option {
      font-size: 0;
    }

    option::before {
      content: attr(value);
      font-size: 16px;
    }
  }
`;

const ChevronDownIcon = styled(ChevronDown)`
  color: white;
  width: 16px;
  height: 16px;
  margin-left: 0.1rem;
  pointer-events: none;
`;
