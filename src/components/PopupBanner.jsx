/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

export default function PopupBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hideDate = localStorage.getItem("popupHideDate");
    const today = new Date().toISOString().slice(0, 10);

    if (hideDate !== today) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleHideToday = () => {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem("popupHideDate", today);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <PopupContainer>
      <PopupImageWrapper>
        <PopupImage src="/Popup.webp" alt="팝업 배너" />
      </PopupImageWrapper>
      <PopupButtons>
        <PopupButton onClick={handleHideToday}>오늘 하루 보지 않기</PopupButton>
        <PopupButton onClick={handleClose}>닫기</PopupButton>
      </PopupButtons>
    </PopupContainer>
  );
}

const PopupContainer = styled.div`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 2000;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  width: 580px;
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  overflow: hidden

  @media (max-width: 480px) {
    width: 95%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const PopupImageWrapper = styled.div`
  overflow-y: auto;
`;

const PopupImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`;

const PopupButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #f7f7f7;
  border-top: 1px solid #ddd;
  border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  flex-shrink: 0;
`;


const PopupButton = styled.button`
  background: none;
  border: none;
  font-size: 0.85rem;
  color: #333;
  cursor: pointer;
  padding: 0.25rem 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;
