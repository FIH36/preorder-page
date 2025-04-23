/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useI18nContext } from "../contexts/I18nContext.jsx";
import ChatUI from "./ChatUI.jsx";

export default function ChatOnlyPage() {
  const { lang, changeLang } = useI18nContext();

  return (
    <FullScreenWrapper>
      <LangSwitcher>
        <FlagButton onClick={() => changeLang("ko")} selected={lang === "ko"}>
          🇰🇷
        </FlagButton>
        <FlagButton onClick={() => changeLang("en")} selected={lang === "en"}>
          🇺🇸
        </FlagButton>
      </LangSwitcher>
      <ChatUI />
    </FullScreenWrapper>
  );
}

const FullScreenWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: #fff;
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
