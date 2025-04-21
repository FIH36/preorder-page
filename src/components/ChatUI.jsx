// ChatUI.jsx
import styled from "@emotion/styled";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "../hooks/useI18n.js";
import {
  ChatHistory,
  ChatInput,
  ErrorPopup,
  HelperText,
  PresetQuestionList,
} from "./ChatComponents";

// 이미지 및 질문 데이터
const imageOptions = [
  "https://www.ainoon.io/chat_01.webp",
  "https://www.ainoon.io/chat_02.webp",
  "https://www.ainoon.io/chat_03.webp",
  "https://www.ainoon.io/chat_04.webp",
  "https://www.ainoon.io/chat_05.webp",
];

const apiImageUrls = imageOptions.map((url) =>
  url.replace(/chat_(\d{2})\.webp$/, "chat_$1_send.webp")
);

// 이미지별 타이틀 추가
const imageTitles = [
  "chatui_01_title",
  "chatui_02_title",
  "chatui_03_title",
  "chatui_04_title",
  "chatui_05_title",
];

const presetQuestionsByImage = {
  0: ["chatui_01_q1", "chatui_01_q2", "chatui_01_q3", "chatui_01_q4"],
  1: ["chatui_02_q1", "chatui_02_q2", "chatui_02_q3", "chatui_02_q4"],
  2: ["chatui_03_q1", "chatui_03_q2", "chatui_03_q3", "chatui_03_q4"],
  3: ["chatui_04_q1", "chatui_04_q2", "chatui_04_q3", "chatui_04_q4"],
  4: ["chatui_05_q1", "chatui_05_q2", "chatui_05_q3", "chatui_05_q4"],
};

const MAX_QUESTIONS = 10;
const STORAGE_KEY = "daily-question-count";
const DATE_KEY = "daily-question-date";

export default function ChatUI() {
  const { t, loading, lang } = useI18n(); // 컴포넌트 상단에서 한 번만!
  const [question, setQuestion] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  // 각 배열 요소가 독립적인 빈 배열을 가지도록 수정
  const [chatHistories, setChatHistories] = useState(() =>
    Array(imageOptions.length)
      .fill(0)
      .map(() => [])
  );
  const [isFirstQuestionMap, setIsFirstQuestionMap] = useState(
    Array(imageOptions.length).fill(true)
  );
  const [questionCount, setQuestionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [typingContent, setTypingContent] = useState(null);
  const chatHistoryRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const storedDate = localStorage.getItem(DATE_KEY);
    const storedCount = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;

    if (storedDate !== today) {
      localStorage.setItem(DATE_KEY, today);
      localStorage.setItem(STORAGE_KEY, "0");
    } else {
      setQuestionCount(storedCount);
      if (storedCount >= MAX_QUESTIONS) setDisabled(true);
    }
  }, []);

  // 채팅 히스토리나 타이핑 컨텐츠가 변경될 때 스크롤을 아래로 이동
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistories, typingContent]);

  // imageIndex가 변경될 때 기존 타이핑 중인 애니메이션을 정리
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTypingContent(null);
    }
  }, [imageIndex]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const increaseCount = () => {
    const newCount = questionCount + 1;
    localStorage.setItem(STORAGE_KEY, newCount.toString());
    setQuestionCount(newCount);
    if (newCount >= MAX_QUESTIONS) setDisabled(true);
  };

  // 프리셋 질문 선택 시 입력창에 표시하는 함수
  const handlePresetSelect = (q) => {
    setQuestion(q);
  };

  const handleSubmit = async () => {
    const questionText = question;
    if (!questionText.trim() || disabled || isLoading) return;

    const currentIndex = imageIndex;
    const currentHistory = chatHistories[currentIndex];
    const isFirst = isFirstQuestionMap[currentIndex];
    const lastAssistantMessage =
      currentHistory.length > 0
        ? currentHistory[currentHistory.length - 1]
        : null;

    const isLastMessageUnrelated =
      lastAssistantMessage &&
      lastAssistantMessage.role === "assistant" &&
      lastAssistantMessage.content.some(
        (c) =>
          c.type === "text" &&
          (c.text.startsWith("이미지와 질문이 관련 없어 보여요") ||
            c.text.startsWith("The question doesn't seem related to the image"))
      );

    const shouldIncludeImage = isFirst || isLastMessageUnrelated;

    // ✅ 언어에 따라 프롬프트 분기
    const promptMap = {
      ko: {
        first: `다음은 이미지와 질문입니다. 질문이 이미지와 관련 있다고 판단되면, 사실에 기반해 창의적이고 명쾌하며 친절하게 200자 이내로 답해주세요. 다음 중 하나라도 해당되면 ‘관련 있음’으로 간주하세요: 1. 질문이 이미지에 보이는 사람, 사물, 배경, 텍스트 등에 대해 직접적으로 묻는 경우 2. 질문이 이미지로부터 합리적으로 추론 가능한 정보(날씨, 계절, 분위기, 상황, 행동, 장소 유추 등)를 기반으로 한 경우 3. 이미지의 주요 요소(예: 옷, 음식, 풍경 등)와 관련된 설명, 추천, 평가 등을 요청하는 경우 4. 질문에 “이 사진”, “이 장면”, “이 옷” 등 이미지와 명시적으로 연결된 표현이 있는 경우. 위 조건 중 **하나라도 해당하면 ‘관련 있음’**으로 간주하고 답변을 생성하세요. 질문이 명백히 이미지와 무관하거나, 이미지 정보만으로는 전혀 유추할 수 없는 외부적 사실을 묻는 경우에만 아래와 같이 답해주세요: ‘이미지와 질문이 관련 없어 보여요. 이미지에 대해 궁금하신 게 있다면 알려주세요!’ ※ 판단 결과(예: ‘관련 있음’/‘관련 없음’)라는 표현은 출력하지 마세요. 관련 있는 경우에는 바로 답변만 출력하세요.`,
        followUp: `다음은 이미지와 질문입니다. 질문이 이미지와 관련 있다고 판단되면, 사실에 기반해 창의적이고 명쾌하며 친절하게 200자 이내로 답해주세요. 다음 중 하나라도 해당되면 ‘관련 있음’으로 간주하세요: 1. 질문이 이미지에 보이는 사람, 사물, 배경, 텍스트 등에 대해 직접적으로 묻는 경우 2. 질문이 이미지로부터 합리적으로 추론 가능한 정보(날씨, 계절, 분위기, 상황, 행동, 장소 유추 등)를 기반으로 한 경우 3. 이미지의 주요 요소(예: 옷, 음식, 풍경 등)와 관련된 설명, 추천, 평가 등을 요청하는 경우 4. 질문에 “이 사진”, “이 장면”, “이 옷” 등 이미지와 명시적으로 연결된 표현이 있는 경우. 위 조건 중 **하나라도 해당하면 ‘관련 있음’**으로 간주하고 답변을 생성하세요. 질문이 명백히 이미지와 무관하거나, 이미지 정보만으로는 전혀 유추할 수 없는 외부적 사실을 묻는 경우에만 아래와 같이 답해주세요: ‘이미지와 질문이 관련 없어 보여요. 이미지에 대해 궁금하신 게 있다면 알려주세요!’ ※ 판단 결과(예: ‘관련 있음’/‘관련 없음’)라는 표현은 출력하지 마세요. 관련 있는 경우에는 바로 답변만 출력하세요.`,
      },
      en: {
        first: `Here is an image and a related question. If you determine that the question is relevant to the image, respond with a clear, creative, and friendly answer based on facts—within 200 characters. Consider the question relevant if any of the following apply: The question directly refers to people, objects, background, or text visible in the image. The question is based on information that can reasonably be inferred from the image (e.g., weather, season, mood, situation, activity, or location). The question asks for descriptions, recommendations, or evaluations of key elements in the image (e.g., clothing, food, scenery). The question includes explicit references to the image, such as “this photo,” “this scene,” or “this outfit.” If at least one of these conditions is met, generate an answer.
If the question is clearly unrelated to the image or asks about facts that cannot reasonably be inferred from it, respond with: “The question doesn’t seem related to the image. Feel free to ask about the image if you're curious!” Do not state whether the question is “relevant” or “not relevant” in your response. If it’s relevant, just go ahead and answer.`,
        followUp: `Here is an image and a related question. If you determine that the question is relevant to the image, respond with a clear, creative, and friendly answer based on facts—within 200 characters. Consider the question relevant if any of the following apply: The question directly refers to people, objects, background, or text visible in the image. The question is based on information that can reasonably be inferred from the image (e.g., weather, season, mood, situation, activity, or location). The question asks for descriptions, recommendations, or evaluations of key elements in the image (e.g., clothing, food, scenery). The question includes explicit references to the image, such as “this photo,” “this scene,” or “this outfit.” If at least one of these conditions is met, generate an answer.
If the question is clearly unrelated to the image or asks about facts that cannot reasonably be inferred from it, respond with: “The question doesn’t seem related to the image. Feel free to ask about the image if you're curious!” Do not state whether the question is “relevant” or “not relevant” in your response. If it’s relevant, just go ahead and answer.`,
      },
    };

    // ✅ lang 안전하게 처리
    const safeLang = ["ko", "en"].includes(lang) ? lang : "ko";
    const prompt = isFirst
      ? promptMap[safeLang].first
      : promptMap[safeLang].followUp;

    let userMessage = {
      role: "user",
      content: [{ type: "text", text: `${prompt}\n\n${questionText}` }],
    };

    if (shouldIncludeImage) {
      userMessage.content.push({
        type: "image_url",
        image_url: { url: apiImageUrls[currentIndex] },
      });
    }

    const payload = {
      messages: isFirst ? [userMessage] : [...currentHistory, userMessage],
    };

    const userMessageForHistory = {
      role: "user",
      content: [{ type: "text", text: questionText }],
    };

    if (shouldIncludeImage) {
      userMessageForHistory.content.push({
        type: "image_url",
        image_url: { url: apiImageUrls[currentIndex] },
      });
    }

    setChatHistories((prev) => {
      const newHistories = [...prev];
      newHistories[currentIndex] = [
        ...newHistories[currentIndex],
        userMessageForHistory,
      ];
      return newHistories;
    });

    setQuestion("");
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://gi0r5h4vnh.execute-api.ap-northeast-2.amazonaws.com/dev/openai/chat-completion",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      let assistantText;

      if (data?.choices?.[0]?.message?.content?.[0]?.text) {
        assistantText = data.choices[0].message.content[0].text;
      } else if (data?.content?.[0]?.text) {
        assistantText = data.content[0].text;
      } else if (typeof data === "string") {
        assistantText = data;
      } else {
        assistantText = null;
      }

      const isUnrelated =
        assistantText &&
        (assistantText.includes("앞선 대화와 관련 없는 질문처럼 보여요") ||
          assistantText.includes("The question doesn't seem related"));

      const nextHistory = isUnrelated
        ? [...currentHistory]
        : [...currentHistory, userMessageForHistory];

      if (assistantText) {
        typeText(assistantText, currentIndex, nextHistory);
      } else {
        const fallback = {
          role: "assistant",
          content: [{ type: "text", text: "응답을 불러올 수 없습니다." }],
        };
        setChatHistories((prev) => {
          const newHistories = [...prev];
          newHistories[currentIndex] = [
            ...newHistories[currentIndex],
            fallback,
          ];
          return newHistories;
        });
      }

      setIsFirstQuestionMap((prev) => {
        const updated = [...prev];
        updated[currentIndex] = false;
        return updated;
      });

      increaseCount();
    } catch (err) {
      console.error("API 호출 실패:", err);
      setError("질문 처리 중 오류가 발생했어요.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const typeText = (text, index, prevMessages) => {
    // 이전 interval 정리
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setTypingContent(text.slice(0, i));

      if (i >= text.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        // 응답이 "앞선 대화와 관련 없는 질문처럼 보여요" 인지 확인
        const isUnrelatedResponse =
          text && text.includes("앞선 대화와 관련 없는 질문처럼 보여요");

        // requestAnimationFrame을 활용해 깜빡임 방지
        requestAnimationFrame(() => {
          setChatHistories((prevHistories) => {
            const newHistories = [...prevHistories];

            if (isUnrelatedResponse) {
              // 이전 메시지 유지 + assistant 답변만 추가
              newHistories[index] = [
                ...prevMessages,
                {
                  role: "assistant",
                  content: [{ type: "text", text }],
                },
              ];
            } else {
              newHistories[index] = [
                ...prevMessages,
                {
                  role: "assistant",
                  content: [{ type: "text", text }],
                },
              ];
            }

            return newHistories;
          });

          // 타이핑 애니메이션 종료
          setTypingContent(null);
        });
      }
    }, 20);
  };

  const handleImageSwipe = (dir) => {
    // 이미지 변경 시 타이핑 애니메이션 정리
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTypingContent(null);
    }

    // 입력창 초기화
    setQuestion("");

    setImageIndex((prev) =>
      dir === "left"
        ? (prev - 1 + imageOptions.length) % imageOptions.length
        : (prev + 1) % imageOptions.length
    );
  };

  // 현재 표시할 3개의 이미지 인덱스 계산
  const getVisibleImageIndices = () => {
    const totalImages = imageOptions.length;
    // 현재 이미지를 중앙에 배치하고 양옆에 이미지를 배치
    return [
      (imageIndex - 1 + totalImages) % totalImages, // 왼쪽 이미지
      imageIndex, // 현재 이미지
      (imageIndex + 1) % totalImages, // 오른쪽 이미지
    ];
  };

  const visibleImageIndices = getVisibleImageIndices();
  const currentMessages = chatHistories[imageIndex];
  const presetQuestions =
    presetQuestionsByImage[imageIndex]?.map((key) => t[key]) || [];
  const currentTitle = imageTitles[imageIndex];
  // 상태 추가 (component 내부에 추가)
  const [isChatVisible, setIsChatVisible] = useState(false);

  // 말풍선 클릭 핸들러 (component 내부에 추가)
  const handleSpeechBubbleClick = () => {
    setIsChatVisible(true);
  };

  const handleCloseChat = () => {
    setIsChatVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      handleOverlayLoad();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const overlayRef = useRef(null);
  const [bubbleLeft, setBubbleLeft] = useState(null); // 초기에는 null

  const handleOverlayLoad = () => {
    if (overlayRef.current) {
      const containerWidth = window.innerWidth;
      // 작은 화면이면 가운데로 고정
      if (containerWidth <= 1199) {
        setBubbleLeft("50%");
        return;
      }

      const rect = overlayRef.current.getBoundingClientRect();
      const rightEdge = rect.left + rect.width;
      const centerX = containerWidth / 7;

      const offsetPx = rightEdge - centerX;
      const bubbleLeftPercent = (offsetPx / containerWidth) * 90;

      setBubbleLeft(`${bubbleLeftPercent.toFixed(2)}%`);
    }
  };

  return (
    <PageContainer $isChatVisible={isChatVisible}>
      <ErrorPopup message={error} />

      <LayoutWrapper $isChatVisible={isChatVisible}>
        <MainTitle>{t.chatui_title}</MainTitle>
        <ImageSection $isChatVisible={isChatVisible}>
          {!isChatVisible && (
            <ArrowButton
              direction="left"
              onClick={() => handleImageSwipe("left")}
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </ArrowButton>
          )}
          <ImageCarousel>
            {visibleImageIndices.map((idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ImageTitle $isActive={idx === imageIndex}>
                  {t[imageTitles[idx]]}
                </ImageTitle>
                <ImageCard
                  $isActive={idx === imageIndex}
                  onClick={() => setImageIndex(idx)}
                >
                  <CardImage src={imageOptions[idx]} alt={imageTitles[idx]} />
                </ImageCard>
              </div>
            ))}
          </ImageCarousel>

          {!isChatVisible && (
            <ArrowButton
              direction="right"
              onClick={() => handleImageSwipe("right")}
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </ArrowButton>
          )}

          <OverlayImage
            ref={overlayRef}
            src="/ChatUI_001.webp"
            alt="ChatUI"
            onLoad={handleOverlayLoad}
            onClick={handleSpeechBubbleClick}
            style={{ cursor: !isChatVisible ? "pointer" : "default" }}
          />

          {/* <LongpressImage
            src="/longpress.webp"
            alt="hint"
            $left={bubbleLeft}
            $isChatVisible={isChatVisible}
          /> */}

          {!isChatVisible && bubbleLeft && (
            <SpeechBubble
              style={{ left: bubbleLeft }}
              onClick={handleSpeechBubbleClick}
            >
              <SpeechBubbleText>{t.chatui_bubble}</SpeechBubbleText>
            </SpeechBubble>
          )}
        </ImageSection>

        {isChatVisible && (
          <ChatContainerWrapper>
            <StyledChatContainer
              $hasStarted={currentMessages.some((msg) => msg.role === "user")}
            >
              <CloseButton onClick={handleCloseChat} />
              <ChatHistory
                messages={currentMessages}
                isLoading={isLoading}
                typingContent={typingContent}
                chatHistoryRef={chatHistoryRef}
              />

              <PresetQuestionList
                questions={presetQuestions}
                onSelect={handlePresetSelect}
                disabled={disabled}
              />

              <ChatInput
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onSubmit={handleSubmit}
                disabled={disabled}
                isLoading={isLoading}
              />
              {disabled && <HelperText>{t.chaui_limit}</HelperText>}
            </StyledChatContainer>
          </ChatContainerWrapper>
        )}
      </LayoutWrapper>
      {!isChatVisible && <BottomSpacer />}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  height: auto;
  min-height: ${(props) => (props.$isChatVisible ? "100vh" : "auto")};
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 5rem 0;
  position: relative;
  background-color: white;
  transition: height 0.3s ease;
`;

const BottomSpacer = styled.div`
  height: 80px;

  @media (max-width: 1199px) {
    height: 0;
  }
`;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  transition: transform 0.4s ease-in-out;

  ${(props) =>
    props.$isChatVisible &&
    `
    @media (min-width: 1320px) {
      transform: translateX(-5%); /* -15%에서 -5%로 변경 */
    }

    @media (max-width: 1320px) {
      align-items: center; /* 1320px 이하에서 컨텐츠 중앙 정렬 */
    }
  `}
`;

const ImageSection = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.4s ease-in-out;

  ${(props) =>
    props.$isChatVisible &&
    `
    @media (min-width: 1320px) {
      transform: translateX(-3%); /* 채팅창이 표시될 때 이미지를 더 왼쪽으로 이동 */
    }

    @media (max-width: 1320px) {
      width: 90%; /* 이미지 섹션 너비 축소 */
      margin: 0 auto; /* 중앙 정렬 */
    }
  `}
`;

const SpeechBubble = styled.div`
  position: absolute;
  background: linear-gradient(45deg, #2580ff, #6e5cff, #b5a1ff);
  border-radius: 1rem;
  padding: 0.8rem 1rem; /* 패딩 상하 줄임 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  font-weight: 400;
  z-index: 25;
  transition: all 0.2s ease;

  /* 안경 이미지 바로 위에 위치 */
  top: 55%;
  bottom: auto;
  transform: translateY(-100%);
  width: auto;
  min-width: 320px; /* 최소 너비 설정하여 텍스트가 한줄로 나오도록 */
  height: auto;

  animation: speechBubbleFloat 2s infinite ease-in-out alternate;

  @keyframes speechBubbleFloat {
    0% {
      transform: translateX(-50%) translateY(-100%);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    }
    100% {
      transform: translateX(-50%) translateY(-110%);
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
    }
  }

  /* 말풍선 꼬리 추가 */

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 85%;
    margin-left: -10px;
    border-width: 11px;
    border-style: solid;
    border-color: #897aff transparent transparent transparent;
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2));
  }

  &:hover {
    transform: translateX(-50%) translateY(-100%) scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }

  /* 작은 화면에서의 스타일 */
  @media (max-width: 1199px) {
    position: absolute;
    top: auto;
    bottom: 10%; /* 더 아래로 내림 */
    transform: translateX(-50%);
    left: 50%;
    min-width: 280px;
    max-width: 280px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);

    animation: smallScreenFloat 2s infinite ease-in-out alternate;

    @keyframes smallScreenFloat {
      0% {
        transform: translateX(-50%) translateY(0);
      }
      100% {
        transform: translateX(-50%) translateY(-10px);
      }
    }

    &::after {
      display: none;
    }

    &:hover {
      transform: translateX(-50%) scale(1.05);
    }
  }

  @media (max-width: 768px) {
    bottom: 5%; /* 모바일에서 더 아래로 */
    padding: 0.8rem 1.5rem;
    min-width: 240px;
    max-width: 240px;
  }
`;

const SpeechBubbleText = styled.p`
  margin: 0 0.5rem;
  padding: 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: white;
  text-align: center;
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  line-height: 1.2;
`;

const MainTitle = styled.div`
  color: black;
  font-size: 2.5rem;
  line-height: 140%;
  font-weight: 700;
  word-break: keep-all;
  text-align: center;
  margin: 0 2rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    text-align: center;
    font-weight: 700;
  }
`;

const ImageCarousel = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  width: 160%;
  padding: 20px 0;

  @media (max-width: 768px) {
    width: 140%;
    gap: 0.75rem;
  }
`;

const ImageTitle = styled.div`
  height: 2.25rem;
  margin-bottom: 4rem;
  font-size: 2.25rem;
  text-align: center;
  font-weight: 600;
  color: #000;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  transition: opacity 0.3s ease;
  color: #909294;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    height: 2.2rem;
    margin-bottom: 1.5rem;
  }
`;

const ImageCard = styled.div`
  width: 90%; // 기본 너비를 80%에서 90%로 증가
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  opacity: ${(props) => (props.$isActive ? 1 : 0.6)};
  z-index: ${(props) => (props.$isActive ? 2 : 1)};
  position: relative;

  &:hover {
    opacity: 1;
    box-shadow: ${(props) =>
      props.$isActive
        ? "0 8px 24px rgba(0, 0, 0, 0.2)"
        : "0 6px 16px rgba(0, 0, 0, 0.15)"};

    img {
      transform: scale(1.03);
    }
  }

  @media (max-width: 768px) {
    width: 95%; // 모바일에서 너비를 늘려 작아지지 않도록 조정
    min-width: 280px; // 최소 너비 설정
  }

  @media (min-width: 769px) and (max-width: 1199px) {
    width: 480px; // 태블릿 크기에서의 너비 조정
  }

  @media (min-width: 1200px) {
    width: 780px; // 데스크탑에서의 너비 유지
  }
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
`;

const OverlayImage = styled.img`
  position: absolute;
  left: 50%;
  width: 100%;
  max-width: 1320px;
  z-index: 5;
  bottom: -15%;
  transform: translateX(-50%) translateY(10%);

  /* 두둥실 애니메이션 추가 */
  animation: floatOverlay 2.5s ease-in-out infinite alternate;

  @media (max-width: 1320px) {
    max-width: 1280px;
    bottom: -20%;
  }

  @media (max-width: 1080px) {
    bottom: -15%;
  }

  @media (max-width: 768px) {
    bottom: 0%;
  }

  @media (max-width: 620px) {
    bottom: 10%;
  }

  @media (max-width: 450px) {
    bottom: 18%;
  }
`;

const ChatContainerWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 450px;
  height: 100%;
  z-index: 10;
  padding: 20px;
  display: flex;
  justify-content: center;
  animation: slideIn 0.5s ease-out forwards;
  margin-right: 10%;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 1320px) {
    position: relative;
    width: 90%;
    max-width: 600px;
    padding: 0 20px;
    margin: -100px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledChatContainer = styled.div`
  width: 100%;
  height: auto;
  max-height: ${({ $hasStarted }) => ($hasStarted ? "75vh" : "40vh")};
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 24px;
  top: 20px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: -20px;
    left: 20px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: white;
    display: ${({ $hasStarted }) => ($hasStarted ? "none" : "block")};

    @media (max-width: 1320px) {
      display: none;
    }
  }

  @media (max-width: 1320px) {
    margin-bottom: 50px;
  }

  @media (max-width: 768px) {
    max-height: none; // ✅ 제한 해제
    height: auto; // ✅ 내용만큼 늘어나도록
    overflow-y: visible; // ✅ 아래로 흘러나오지 않게
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 20;

  &:hover {
    &::before,
    &::after {
      background-color: #000;
    }
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 14px;
    height: 2px;
    background-color: #777;
    border-radius: 1px;
    transition: background-color 0.2s ease;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 40%;
  ${(props) => (props.direction === "left" ? "left: 23%;" : "right: 23%;")}
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;

  svg {
    width: 24px;
    height: 24px;
    stroke-width: 2.5;
  }

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-50%) scale(1.05);
  }

  @media (max-width: 1320px) {
    ${(props) => (props.direction === "left" ? "left: 15%;" : "right: 15%;")}
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    ${(props) => (props.direction === "left" ? "left: 5%;" : "right: 5%;")}

    svg {
      width: 20px;
      height: 20px;
    }
  }

  /* 작은 모바일 스타일 */
  @media (max-width: 450px) {
    ${(props) => (props.direction === "left" ? "left: 2%;" : "right: 2%;")}
  }
`;

// const LongpressImage = styled.img`
//   position: absolute;
//   width: 120px;
//   z-index: 3;
//   top: 73%;
//   left: ${(props) => props.$left};
//   transform: translateX(80%) translateY(-50%);
//   animation: floatLeftRight 1s ease-in-out infinite alternate;
//   display: ${(props) => (props.$isChatVisible ? "none" : "block")};

//   @media (max-width: 1200px) {
//     width: 50px;
//     top: auto;
//     bottom: 18%;
//     left: 50%;
//     transform: translateX(-50%);
//     display: none;
//   }

//   @keyframes floatLeftRight {
//     0% {
//       transform: translateX(75%) translateY(-50%);
//     }
//     100% {
//       transform: translateX(85%) translateY(-50%);
//     }
//   }
// `;
