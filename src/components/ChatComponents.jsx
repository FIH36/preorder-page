import {keyframes} from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

// 마크다운 처리를 위한 함수
const formatTextContent = (text) => {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
};

// 채팅 히스토리 표시 컴포넌트
export const ChatHistory = ({
                              messages,
                              isLoading,
                              typingContent,
                              chatHistoryRef,
                            }) => {
  return (
    <ChatHistoryContainer ref={chatHistoryRef}>
      {messages.length === 0 ? (
        <EmptyStateMessage>AInoon에게 질문해보세요!</EmptyStateMessage>
      ) : (
        messages.map((msg, i) => (
          <ChatBubble
            key={`message-${i}-${msg.role}`}
            $user={msg.role === "user"}
            $animated={false}
          >
            {msg.content.map((c, j) =>
              c.type === "text" ? (
                <div
                  key={j}
                  dangerouslySetInnerHTML={{
                    __html: formatTextContent(c.text),
                  }}
                />
              ) : (
                <img
                  key={j}
                  src={c.image_url.url}
                  alt="img"
                  style={{ width: "100%", display: "none" }}
                />
              )
            )}
          </ChatBubble>
        ))
      )}
      {typingContent && (
        <ChatBubble $user={false} $animated={true}>
          <div
            dangerouslySetInnerHTML={{
              __html: formatTextContent(typingContent),
            }}
          />
        </ChatBubble>
      )}
      {isLoading && <LoadingSpinner>답변 생성 중...</LoadingSpinner>}
    </ChatHistoryContainer>
  );
};

// ✅ 여기서 default export 대신 named export로 변경
export const PresetQuestionList = ({ questions, onSelect, disabled }) => {
  return (
    <PresetContainer>
      {questions.map((q, idx) => (
        <PresetButton key={idx} onClick={() => onSelect(q)} disabled={disabled}>
          {q}
        </PresetButton>
      ))}
    </PresetContainer>
  );
};

export const ChatInput = ({
                            value,
                            onChange,
                            onSubmit,
                            disabled,
                            isLoading,
                          }) => {
  return (
    <ChatBox>
      <Input
        type="text"
        placeholder="질문을 입력하세요"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        disabled={disabled || isLoading}
      />
      <SendButton
        onClick={onSubmit}
        disabled={disabled || isLoading || !value.trim()}
      >
        질문하기
      </SendButton>
    </ChatBox>
  );
};

export const ErrorPopup = ({ message }) => {
  return message ? <Popup>{message}</Popup> : null;
};

// 스타일 컴포넌트
const bubbleInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(10px) translateY(10px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateX(0) translateY(0) scale(1);
  }
`;

const bubbleInLeft = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-10px) translateY(10px) scale(0.9);
    }
    100% {
        opacity: 1;
        transform: translateX(0) translateY(0) scale(1);
    }
`;

export const ChatContainer = styled.div`
    position: absolute;
    right: 0;
    z-index: 100;
    width: 400px;
    height: auto;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    padding: 24px;
    margin-left: auto;
    align-self: center;

    @media (max-width: 768px) {
        width: 100%;
        max-width: 400px;
        height: auto;
        margin: 100px 0 20px 0;
        max-height: calc(100vh - 120px);
    }
`;

const ChatHistoryContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: black;
    padding: 16px 0;
    position: relative;
    margin-bottom: 16px;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
        width: 0;
        background: transparent;
    }
`;

const ChatBubble = styled.div`
    background: ${(props) =>
            props.$user
                    ? "#f0f0f0"
                    : "linear-gradient(135deg, #2580FF 0%, #6E5CFF 50%, #B5A1FF 100%)"};
    color: ${(props) => (props.$user ? "#000" : "#fff")};
    align-self: ${(props) => (props.$user ? "flex-end" : "flex-start")};
    padding: 12px;
    border-radius: 12px;
    max-width: 80%;
    white-space: pre-wrap;
    line-height: 1.4;
    animation: ${(props) =>
            props.$animated ? (props.$user ? bubbleInRight : bubbleInLeft) : "none"}
    0.3s ease-out forwards;
    transform-origin: ${(props) =>
            props.$user ? "bottom right" : "bottom left"};
    text-align: ${(props) => (props.$user ? "right" : "left")};
`;


const EmptyStateMessage = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #999;
    font-size: 16px;
    text-align: center;
    width: 100%;
    padding-top: 1rem;
`;

const PresetContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 1rem 0;
`;

const PresetButton = styled.button`
    padding: 10px 16px;
    border-radius: 0.5rem;
    background-color: #f5f5f5;
    color: #666;
    border: 0.5px solid #E0E0E0;
    cursor: pointer;
    font-size: 0.95rem;
    text-align: left;
    transition: background-color 0.2s ease;

    &:hover:enabled {
        background-color: #e0e0e0;
        border: none;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const ChatBox = styled.div`
    display: flex;
    gap: 6px;
`;

const Input = styled.input`
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    border: 0.5px solid #ccc;
    background-color: white;
    font-size: 1rem;
    color: #0c0c0c;
`;

const SendButton = styled.button`
    padding: 8px 12px;
    border-radius: 8px;
    border: none;
    background: linear-gradient(45deg, #2580FF, #6E5CFF, #B5A1FF);
    color: white;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
        filter: brightness(1.1); /* 살짝 밝게 */
    }

    &:disabled {
        background: linear-gradient(45deg, #ccc, #aaa); /* 흐릿한 그라디언트 */
        color: #666;
        cursor: not-allowed;
    }
`;


export const HelperText = styled.div`
    margin-top: 8px;
    font-size: 14px;
    color: #f44336;
`;

const LoadingSpinner = styled.div`
    font-size: 14px;
    color: gray;
    align-self: flex-start;
    display: flex;
    align-items: center;

    &:before {
        content: "";
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 8px;
        border-radius: 50%;
        border: 2px solid #ddd;
        border-top-color: #888;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

const Cursor = styled.span`
    animation: blink 1s step-start infinite;
    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
`;

const Popup = styled.div`
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #f44336;
    color: white;
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10;
    animation: slideDown 0.3s ease-out;

    @keyframes slideDown {
        0% {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
`;
