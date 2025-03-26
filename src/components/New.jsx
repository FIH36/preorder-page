/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";

const sections = [
  { id: "section-0", label: "", bg: "black" },
  { id: "section-1", label: "섹션 2", bg: "white" },
  { id: "section-2", label: "섹션 3", bg: "black" },
  { id: "section-3", label: "섹션 4", bg: "white" },
  { id: "section-4", label: "", bg: "white" },
];

function App() {
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);
  const section0LogoRef = useRef(null);
  const section0TextRef = useRef(null);

  const [introDone, setIntroDone] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoLoaded) {
      const timer = setTimeout(() => setIntroDone(true), 1800);
      return () => clearTimeout(timer);
    }
  }, [videoLoaded]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          const section = sections.find((s) => s.id === target.id);
          if (!section) return;

          if (target.id === "section-0") {
            [videoRef, section0LogoRef, section0TextRef].forEach((ref) => {
              if (ref.current)
                ref.current.style.opacity = isIntersecting ? "1" : "0";
            });
          }

          if (isIntersecting) {
            bgRef.current.style.backgroundColor = section.bg;

            if (section.label) {
              textRef.current.style.opacity = 0;
              textRef.current.style.color =
                section.bg === "white" ? "black" : "white";
              textRef.current.textContent = section.label;
              setTimeout(() => (textRef.current.style.opacity = 1), 150);
            } else {
              textRef.current.textContent = "";
              textRef.current.style.opacity = 0;
            }
          }
        });
      },
      { threshold: 0.6 },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {!introDone && (
        <div css={styles.introWrapper}>
          <img src="/AInoon-logo.svg" alt="logo" css={styles.logo} />
        </div>
      )}

      <video
        ref={videoRef}
        src="/Main.mp4"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        css={styles.fixedVideo}
      />

      <div ref={bgRef} css={styles.background} />
      <div ref={textRef} css={styles.fixedText} />

      <main css={styles.container}>
        <div css={styles.snapWrapper}>
          {sections.map(({ id }) => (
            <section
              key={id}
              id={id}
              css={id === "section-4" ? styles.sectionFooter : styles.section}
            >
              {id === "section-0" && (
                <div css={styles.overlayContent}>
                  <img
                    ref={section0LogoRef}
                    src="/AInoon-logo.svg"
                    alt="AI-noon"
                    css={styles.sectionLogo}
                  />
                  <div ref={section0TextRef} css={styles.sectionTextBox}>
                    <p css={styles.headline}>눈으로 보고, 찍고, 듣고, 즐기다</p>
                    <p css={styles.subline}>
                      "눈앞의 모든 순간이 당신의 콘텐츠가 됩니다"
                    </p>
                  </div>
                </div>
              )}
              {id === "section-4" && (
                <div css={styles.sideContainer}>
                  <div css={styles.leftArea}>
                    안경처럼 가볍게, 스마트폰보다 빠르게
                  </div>
                  <div css={styles.rightArea}>
                    {[
                      { img: "", label: "반려동물의 사랑스러운 순간" },
                      { img: "", label: "아기의 첫 걸음" },
                      { img: "", label: "행복한 찰나" },
                      { img: "", label: "주차 위치를 사진 한 장으로" },
                    ].map((item, i) => (
                      <div key={i}>
                        <img src={item.img} alt={item.label} />
                        <p>{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {id === "section-4" && <Footer />}
            </section>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;

const styles = {
  container: css`
    height: 100vh;
    overflow-y: auto;
  `,
  snapWrapper: css`
    scroll-snap-type: y mandatory;
    height: 100%;
  `,
  section: css`
    height: 100vh;
    scroll-snap-align: start;
    position: relative;
  `,
  sectionFooter: css`
    min-height: 100vh;
    scroll-snap-align: start;
    position: relative;
  `,
  fixedVideo: css`
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  fixedText: css`
    position: fixed;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.5rem;
    transition: opacity 0.5s ease;
  `,
  introWrapper: css`
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
  `,
  logo: css`
    width: 200px;
    animation: zoomOut 1.2s ease forwards;
    filter: invert(1);
    @keyframes zoomOut {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      30% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(1.4);
      }
    }
  `,
};
