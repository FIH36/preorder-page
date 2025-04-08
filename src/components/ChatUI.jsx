// ChatUI.jsx
import React, {useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled';
import {keyframes} from '@emotion/react';

// 이미지 및 질문 데이터
const imageOptions = [
  'https://www.ainoon.io/chat_01.webp',
  'https://www.ainoon.io/chat_02.webp',
  'https://www.ainoon.io/chat_03.webp',
  'https://www.ainoon.io/chat_04.webp',
  'https://www.ainoon.io/chat_05.webp'
];

// 이미지별 타이틀 추가
const imageTitles = [
  '식당에서',
  '산책중에',
  '미술관에서',
  '의류 매장 에서',
  '관광지에서'
];

const presetQuestionsByImage = {
  0: [
    '메뉴를 한국어로 번역해줘',
    '해산물과 어울리는 음료를 추천해줘',
    '논 알코올 음료를 추천해줘',
    '메뉴판에 적혀 있는 피셀리노 뜻이 뭐야?'
  ],
  1: [
    '이 꽃 이름을 알려줘',
    '이 꽃은 물을 얼마나 자주 줘야해?',
    '이 꽃의 꽃말을 알려줘',
    '비슷한 종류의 다른 꽃은 뭐가 있지?'
  ],
  2: [
    '이 그림은 무엇을 표현한 거야?',
    '그림 속 인물의 표정은 어떤 감정을 나타내지?',
    '이 작품의 특징은 뭐야?',
    '이 그림이 유명해진 이유는 뭐야?'
  ],
  3: [
    '이 두 의상 중 어느 것이 더 실용적인가요?',
    '핑크색 니트에 포인트를 줄 수 있는 코디를 추천해줘',
    '두 의상 중 회사 면접에 어울리는 코디를 추천해줘',
    '두 개의 상의 중 데이트에 어울리는 코디를 추천해줘'
  ],
  4: [
    '이 장소의 이름을 알려줘',
    '이 장소와 관련된 유명한 이야기나 사건이 있나요?',
    '이 장소에서 꼭 봐야할 포인트를 알려줘',
    '이 장소와 관련된 재미있는 이야기를 알려줘'
  ]
};

const MAX_QUESTIONS = 10;
const STORAGE_KEY = 'daily-question-count';
const DATE_KEY = 'daily-question-date';

// 마크다운 처리를 위한 함수
const formatTextContent = (text) => {
  // ** 볼드 처리 (마크다운 처리)
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

export default function ChatUI() {
  const [question, setQuestion] = useState('');
  const [imageIndex, setImageIndex] = useState(0);
  // 각 배열 요소가 독립적인 빈 배열을 가지도록 수정
  const [chatHistories, setChatHistories] = useState(() =>
    Array(imageOptions.length).fill(0).map(() => [])
  );
  const [isFirstQuestionMap, setIsFirstQuestionMap] = useState(Array(imageOptions.length).fill(true));
  const [questionCount, setQuestionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');
  const [typingContent, setTypingContent] = useState(null);
  const chatHistoryRef = useRef(null); // 채팅 히스토리 컨테이너 ref로 수정
  const intervalRef = useRef(null); // 타이핑 interval 참조를 저장할 ref

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const storedDate = localStorage.getItem(DATE_KEY);
    const storedCount = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;

    if (storedDate !== today) {
      localStorage.setItem(DATE_KEY, today);
      localStorage.setItem(STORAGE_KEY, '0');
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
    // 질문이 비어있거나 disabled 상태면 처리하지 않음
    const questionText = question;
    if (!questionText.trim() || disabled || isLoading) return;

    const currentIndex = imageIndex;
    const currentHistory = chatHistories[currentIndex];
    const isFirst = isFirstQuestionMap[currentIndex];

    // 이전 응답이 '이미지와 질문이 관련 없어 보여요'로 시작하는지 확인
    const lastAssistantMessage = currentHistory.length > 0 ?
      currentHistory[currentHistory.length - 1] : null;

    const isLastMessageUnrelated = lastAssistantMessage &&
      lastAssistantMessage.role === 'assistant' &&
      lastAssistantMessage.content.some(c =>
        c.type === 'text' && c.text.startsWith('이미지와 질문이 관련 없어 보여요')
      );

    // 첫 질문이거나 이전 응답이 '관련 없음' 응답인 경우 이미지 포함
    const shouldIncludeImage = isFirst || isLastMessageUnrelated;

    // 사용자 메시지와 payload 변수 선언
    let userMessage;
    let payload;

    // 이미지가 포함되어야 하는 경우
    if (shouldIncludeImage) {
      userMessage = {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `다음은 이미지와 질문입니다.\n- 질문이 이미지와 관련 있다고 판단되면, 사실에 기반해 창의적이고 명쾌하며 친절하게 200자 이내로 답해주세요. \n- 이미지에서 유추 가능한 정보(날씨, 분위기, 장소, 행동 등)와 연관 질문(이미지 상에 포함되어 있거나 언급된 것과 관련된 것)은 '관련 있음'으로 간주해주세요.\n- 질문이 이미지와 관련없어 보인다면 이렇게 답해주세요: '이미지와 질문이 관련 없어 보여요. 이미지에 대해 궁금하신 게 있다면 알려주세요!'\n\n${questionText}`
          },
          {
            type: 'image_url',
            image_url: {
              url: imageOptions[currentIndex]
            }
          }
        ]
      };

      // 첫 질문이면 이전 대화 제외, 아니면 포함
      payload = {
        messages: isFirst ? [userMessage] : [...currentHistory, userMessage]
      };
    }
    // 일반 후속 질문인 경우
    else {
      userMessage = {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `다음은 앞선 대답과 연관된 질문입니다.\n- 사실에 기반해 창의적이고 명쾌하며 친절하게 200자 이내로 답해주세요. \n- 앞의 대화에서 유추 가능한 정보(날씨, 분위기, 장소, 행동 등)나 연관 질문(이미지 상에 포함되어 있거나 언급된 것과 관련된 것)은 '관련 있음'으로 간주해주세요.\n- 질문이 대화와 관련없어 보인다면 이렇게 답해주세요: '앞선 대화와 관련 없는 질문처럼 보여요. 더 궁금하신 게 있다면 알려주세요!'\n\n${questionText}`
          }
        ]
      };

      payload = {
        messages: [...currentHistory, userMessage]
      };
    }

    // 사용자 메시지를 채팅 히스토리에 먼저 추가 (UI에 즉시 표시)
    const userMessageForHistory = {
      role: 'user',
      content: [{ type: 'text', text: questionText }]
    };

    // 이전 응답 확인 (이 부분은 위에서 계산한 shouldIncludeImage 사용)
    if (shouldIncludeImage) {
      userMessageForHistory.content.push({
        type: 'image_url',
        image_url: { url: imageOptions[currentIndex] }
      });
    }

    // 채팅 히스토리 업데이트 (API 응답 전에)
    setChatHistories(prevHistories => {
      const newHistories = [...prevHistories];
      newHistories[currentIndex] = [...newHistories[currentIndex], userMessageForHistory];
      return newHistories;
    });

    // 입력창 초기화
    setQuestion('');

    setIsLoading(true);
    try {
      const res = await fetch(
        'https://gi0r5h4vnh.execute-api.ap-northeast-2.amazonaws.com/dev/openai/chat-completion',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      console.log("API 응답 데이터:", data); // 디버깅용 로그

      // 다양한 API 응답 형식 처리
      let assistantText;

      // 첫 번째 형식 - choices 배열을 통한 접근
      if (data?.choices?.[0]?.message?.content?.[0]?.text) {
        assistantText = data.choices[0].message.content[0].text;
      }
      // 두 번째 형식 - 직접 content 배열에 접근
      else if (data?.content?.[0]?.text) {
        assistantText = data.content[0].text;
      }
      // 세 번째 형식 - 단순 텍스트 응답
      else if (typeof data === 'string') {
        assistantText = data;
      }
      // 그 외 형식
      else {
        console.error("예상치 못한 API 응답 형식:", data);
        assistantText = null;
      }

      // 응답이 "앞선 대화와 관련 없는 질문처럼 보여요" 인지 확인
      const isUnrelatedResponse = assistantText &&
        assistantText.includes('앞선 대화와 관련 없는 질문처럼 보여요');

      if (assistantText) {
        // 관련 없는 응답인 경우 이전 대화 내용을 그대로 유지
        if (isUnrelatedResponse) {
          typeText(assistantText, currentIndex, [...currentHistory]);
        } else {
          // 정상 응답인 경우 새 메시지 추가
          typeText(assistantText, currentIndex, [...currentHistory, userMessageForHistory]);
        }
      } else {
        console.error("API 응답에 예상된 형식의 텍스트가 없습니다:", data);

        const fallback = {
          role: 'assistant',
          content: [{ type: 'text', text: '응답을 불러올 수 없습니다.' }]
        };

        // 새 history 배열을 안전하게 업데이트 (이미 사용자 메시지는 추가되어 있음)
        setChatHistories(prevHistories => {
          const newHistories = [...prevHistories];
          newHistories[currentIndex] = [...newHistories[currentIndex], fallback];
          return newHistories;
        });
      }

      // 첫 질문 맵 업데이트
      setIsFirstQuestionMap(prevMap => {
        const updatedFirstMap = [...prevMap];
        updatedFirstMap[currentIndex] = false;
        return updatedFirstMap;
      });

      increaseCount();
    } catch (err) {
      console.error('API 호출 실패:', err);
      setError('질문 처리 중 오류가 발생했어요.');

      // 5초 후 에러 메시지 제거
      setTimeout(() => setError(''), 5000);
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
        const isUnrelatedResponse = text &&
          text.includes('앞선 대화와 관련 없는 질문처럼 보여요');

        // 채팅 히스토리 안전하게 업데이트
        setChatHistories(prevHistories => {
          const newHistories = [...prevHistories];

          // 관련 없는 응답인 경우 이전 대화 내용을 유지하면서 응답만 추가
          if (isUnrelatedResponse) {
            newHistories[index] = [...prevMessages, {
              role: 'assistant',
              content: [{ type: 'text', text }]
            }];
          } else {
            // 사용자가 보낸 질문이 포함되어 있지 않으면 추가
            const userMessageExists = prevMessages.length > 0 &&
              prevMessages[prevMessages.length - 1].role === 'user';

            const messagesToUpdate = userMessageExists ?
              prevMessages : [...prevMessages, {
                role: 'user',
                content: [{ type: 'text', text: question }]
              }];

            newHistories[index] = [...messagesToUpdate, {
              role: 'assistant',
              content: [{ type: 'text', text }]
            }];
          }

          return newHistories;
        });

        setTypingContent(null);
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
    setQuestion('');

    setImageIndex((prev) =>
      dir === 'left' ? (prev - 1 + imageOptions.length) % imageOptions.length : (prev + 1) % imageOptions.length
    );
  };

  const currentMessages = chatHistories[imageIndex];
  const presetQuestions = presetQuestionsByImage[imageIndex];
  const currentTitle = imageTitles[imageIndex];

  return (
    <BackgroundContainer style={{ backgroundImage: `url(${imageOptions[imageIndex]})` }}>
      <GradientOverlay />
      <Container>
        {error && <Popup>{error}</Popup>}
        {/*<ImageNavigator>*/}
        {/*  <TitleArrow onClick={() => handleImageSwipe('left')}>◀</TitleArrow>*/}
        {/*  <ImageCounter>{imageIndex + 1} / {imageOptions.length}</ImageCounter>*/}
        {/*  <TitleArrow onClick={() => handleImageSwipe('right')}>▶</TitleArrow>*/}
        {/*</ImageNavigator>*/}

        <TitleContainer>
          <TitleArrow onClick={() => handleImageSwipe('left')}>◀</TitleArrow>
          <ImageTitle>{currentTitle}</ImageTitle>
          <TitleArrow onClick={() => handleImageSwipe('right')}>▶</TitleArrow>
        </TitleContainer>

        <ChatContainer>
          <ChatHistory ref={chatHistoryRef}>
            {currentMessages.length === 0 ? (
              <EmptyStateMessage>질문을 입력해보세요</EmptyStateMessage>
            ) : (
              currentMessages.map((msg, i) => (
                <ChatBubble
                  key={`${imageIndex}-${i}-${msg.role}`}
                  $user={msg.role === 'user'}
                  $animated={i === currentMessages.length - 1} // 마지막 메시지만 애니메이션 적용
                >
                  {msg.content.map((c, j) =>
                    c.type === 'text' ? (
                      <div
                        key={j}
                        dangerouslySetInnerHTML={{ __html: formatTextContent(c.text) }}
                      />
                    ) : (
                      <img key={j} src={c.image_url.url} alt="img" style={{ width: '100%', display: 'none' }} />
                    )
                  )}
                </ChatBubble>
              ))
            )}
            {typingContent &&
              <ChatBubble $user={false} $animated={true}>
                <div dangerouslySetInnerHTML={{ __html: formatTextContent(typingContent) }} />
                <Cursor>|</Cursor>
              </ChatBubble>
            }
            {isLoading && <LoadingSpinner>답변 생성 중...</LoadingSpinner>}
          </ChatHistory>

          <PresetListContainer>
            <PresetList>
              {presetQuestions.map((q, i) => (
                <PresetButton key={i} onClick={() => handlePresetSelect(q)} disabled={disabled}>{q}</PresetButton>
              ))}
            </PresetList>
          </PresetListContainer>

          <ChatBox>
            <Input
              type="text"
              placeholder="질문을 입력하세요"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              disabled={disabled || isLoading}
            />
            <SendButton onClick={handleSubmit} disabled={disabled || isLoading || !question.trim()}>질문하기</SendButton>
          </ChatBox>
          {disabled && <HelperText>오늘 하루 물을 수 있는 질문을 모두 사용하였어요.</HelperText>}
        </ChatContainer>
      </Container>
    </BackgroundContainer>
  );
}

// 애니메이션 키프레임
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

// 스타일 컴포넌트 정의
const BackgroundContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-size: cover;
    background-position: left center;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    overflow: hidden;
`;

const GradientOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.9) 80%, rgba(255,255,255,1) 100%);
    z-index: 1;
`;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    z-index: 2;
    padding: 0 40px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 16px;
        align-items: center;
    }
`;

const TitleContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 40px;
    transform: translateY(-50%);
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 15px;

    @media (max-width: 768px) {
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
    }
`;

const TitleArrow = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    color: #000;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    transition: all 0.2s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.9);
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95);
    }
`;

const ImageTitle = styled.h1`
    font-size: 3rem;
    font-weight: bold;
    color: #000;
    margin: 0;
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 15px;

    @media (max-width: 768px) {
        font-size: 2rem;
        padding: 8px 16px;
    }
`;

const ChatContainer = styled.div`
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

const ImageNavigator = styled.div`
    position: absolute;
    top: 20px;
    left: 40px;
    display: flex;
    align-items: center;
    gap: 16px;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 8px 16px;
    border-radius: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 3;

    @media (max-width: 768px) {
        top: 10px;
        left: 16px;
    }
`;

const ImageCounter = styled.div`
    font-size: 14px;
    color: #333;
    font-weight: 500;
`;

const ChatHistory = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: black;
    padding: 16px;
    position: relative;
    margin-bottom: 16px;

    /* 스크롤바 완전히 숨기기 */
    -ms-overflow-style: none;  /* IE 및 Edge */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
        display: none;  /* Chrome, Safari, Opera */
        width: 0;
        background: transparent;
    }
`;

const ChatBubble = styled.div`
    background-color: ${(props) => (props.$user ? '#d1f3f9' : '#f5f5f5')};
    align-self: ${(props) => (props.$user ? 'flex-end' : 'flex-start')};
    padding: 12px;
    border-radius: 12px;
    max-width: 80%;
    white-space: pre-wrap;
    line-height: 1.4;

    /* 애니메이션 효과 추가 - $animated 프롭으로 제어 */
    animation: ${(props) => (props.$animated ? (props.$user ? bubbleInRight : bubbleInLeft) : 'none')} 0.3s ease-out forwards;
    transform-origin: ${(props) => (props.$user ? 'bottom right' : 'bottom left')};
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
`;

const PresetListContainer = styled.div`
    overflow-x: auto;
    position: relative;
    min-height: 44px;
    margin-bottom: 16px;

    /* 스크롤바 스타일 숨기기 */
    -ms-overflow-style: none;  /* IE 및 Edge */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
        display: none;  /* Chrome, Safari, Opera */
        width: 0;
        height: 0;
        background: transparent;
    }
`;

const PresetList = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding: 4px 0;
    width: max-content; /* 모든 버튼을 가로로 수용 */
`;

const PresetButton = styled.button`
    padding: 8px 16px;
    border-radius: 20px;
    border: none;
    background-color: #eee;
    cursor: pointer;
    font-size: 14px;
    text-align: center;
    white-space: nowrap; /* 버튼 내 텍스트 줄바꿈 방지 */
    min-width: max-content; /* 텍스트 길이에 맞게 버튼 너비 설정 */

    &:hover {
        background-color: #ddd;
    }

    &:disabled {
        background-color: #f2f2f2;
        color: #aaa;
        cursor: not-allowed;
    }
`;

const ChatBox = styled.div`
    display: flex;
    gap: 8px;
`;

const Input = styled.input`
    flex: 1;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid #ccc;
    background-color: white;
`;

const SendButton = styled.button`
    padding: 12px 20px;
    border-radius: 12px;
    border: none;
    background-color: black;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #333;
    }
    &:disabled {
        background-color: #999;
        cursor: not-allowed;
    }
`;

const HelperText = styled.div`
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