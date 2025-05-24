/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ChevronDown } from "lucide-react";
import { useI18nContext } from "../contexts/I18nContext.jsx";
import ChatOnlyUI from "./ChatOnlyUI.jsx";
import { useEffect } from "react";

export default function ChatOnlyPage() {
  const { lang, changeLang } = useI18nContext();
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      window.parent.postMessage(
        { type: 'IFRAME_HEIGHT', height },
        'https://t5fopekllmfgt0sw-75045765378.shopifypreview.com'
      );
    });
    resizeObserver.observe(document.body);
    // 초기 높이 전송
    const initialHeight = document.body.scrollHeight;
    window.parent.postMessage(
      { type: 'IFRAME_HEIGHT', height: initialHeight },
      'https://t5fopekllmfgt0sw-75045765378.shopifypreview.com'
    );
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <FullScreenWrapper>
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
      <ChatOnlyUI />
    </FullScreenWrapper>
  );
}

const FullScreenWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  margin: 0;
  padding: 0;
  background: #fff;
`;

const LangSelectWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 1.2rem;
  z-index: 10;
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 0.4rem 0.6rem;
`;

const LangSelect = styled.select`
  color: #666;
  appearance: none;
  background: transparent;
  border: none;
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
  color: #999;
  width: 16px;
  height: 16px;
  margin-left: 0.1rem;
  pointer-events: none;
`;
