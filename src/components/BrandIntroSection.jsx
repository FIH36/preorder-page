/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";

const BrandIntroSection = () => {
  return (
    <SectionWrapper>
      <HeroText>AInoon Becomes a Part of Everyday Life</HeroText>

      <ContentWrapper>
        <TitleBlock>
          <MainTitle>
            안경처럼 <span>가볍게,</span> 스마트폰보다 <span>빠르게</span>
          </MainTitle>
          <Subtitle>
            한 번의 탭으로 빠르게 촬영하여, 순간을 놓치지 않고 오래 기억하세요!
          </Subtitle>
        </TitleBlock>

        <CardRow>
          <Card>
            <CardImage />
            <CardContent>
              <CardTitle>반려동물의 사랑스러운 순간</CardTitle>
              <CardDescription>놓칠 틈 없이 빠르게 기록하세요</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardImage />
            <CardContent>
              <CardTitle>아기 첫 걸음</CardTitle>
              <CardDescription>
                순간이 아닌 영원한 기억으로 남겨주세요
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardImage />
            <CardContent>
              <CardTitle>행복한</CardTitle>
              <CardDescription>
                기억이 아닌 기록으로 오래오래 간직하세요
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardImage />
            <CardContent>
              <CardTitle>기억할 필요 없이</CardTitle>
              <CardDescription>
                사진 한장으로 주차 위치를 찾으세요
              </CardDescription>
            </CardContent>
          </Card>
        </CardRow>
      </ContentWrapper>
      {/*<div*/}
      {/*  style={{*/}
      {/*    backgroundColor: "#EFF0F3",*/}
      {/*    display: "flex",*/}
      {/*    flexDirection: "column",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      color: "white",*/}
      {/*      fontSize: "120px",*/}
      {/*      fontWeight: "bold",*/}
      {/*      padding: "4.5rem",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    AInoon Becomes a Part of Everyday Life*/}
      {/*  </div>*/}
      {/*  <div style={{ padding: "4.5rem 0 9rem 0" }}>*/}
      {/*    <div style={{ marginBottom: "100px" }}>*/}
      {/*      <div*/}
      {/*        style={{*/}
      {/*          color: "black",*/}
      {/*          fontSize: "3.25rem",*/}
      {/*          fontWeight: "700",*/}
      {/*          textAlign: "center",*/}
      {/*          marginBottom: "1rem",*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        안경처럼 <span style={{ color: "#909294" }}>가볍게,</span>*/}
      {/*        스마트폰보다 <span style={{ color: "#909294" }}>빠르게</span>*/}
      {/*      </div>*/}
      {/*      <div*/}
      {/*        style={{*/}
      {/*          color: "#909294",*/}
      {/*          fontSize: "1.5rem",*/}
      {/*          textAlign: "center",*/}
      {/*          fontWeight: "400",*/}
      {/*          letterSpacing: "-0.5px",*/}
      {/*          opacity: "0.8",*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        한 번의 탭으로 빠르게 촬영하여, 순간을 놓치지 않고 오래*/}
      {/*        기억하세요!*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        display: "flex",*/}
      {/*        flexDirection: "row",*/}
      {/*        gap: "1.5rem",*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <div*/}
      {/*        style={{*/}
      {/*          backgroundColor: "white",*/}
      {/*          color: "black",*/}
      {/*          borderRadius: "1.5rem",*/}
      {/*          overflow: "hidden",*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <div*/}
      {/*          style={{*/}
      {/*            backgroundColor: "gray",*/}
      {/*            width: "520px",*/}
      {/*            height: "293px",*/}
      {/*          }}*/}
      {/*        />*/}
      {/*        <div*/}
      {/*          style={{*/}
      {/*            padding: "2rem",*/}
      {/*            fontSize: "1.25rem",*/}
      {/*            letterSpacing: "-0.5px",*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <div*/}
      {/*            style={{*/}
      {/*              marginBottom: "0.5rem",*/}
      {/*              fontWeight: "600",*/}
      {/*              color: "#2580FF",*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            반려동물의 사랑스러운 순간*/}
      {/*          </div>*/}
      {/*          <div>놓칠 틈 없이 빠르게 기록하세요</div>*/}
      {/*        </div>*/}
      {/*      </div>*/}

      {/*      <div*/}
      {/*        style={{*/}
      {/*          backgroundColor: "white",*/}
      {/*          color: "black",*/}
      {/*          borderRadius: "1.5rem",*/}
      {/*          overflow: "hidden",*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <div*/}
      {/*          style={{*/}
      {/*            backgroundColor: "gray",*/}
      {/*            width: "520px",*/}
      {/*            height: "293px",*/}
      {/*          }}*/}
      {/*        />*/}
      {/*        <div*/}
      {/*          style={{*/}
      {/*            padding: "2rem",*/}
      {/*            fontSize: "1.25rem",*/}
      {/*            letterSpacing: "-0.5px",*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <div*/}
      {/*            style={{*/}
      {/*              marginBottom: "0.5rem",*/}
      {/*              fontWeight: "600",*/}
      {/*              color: "#2580FF",*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            아기 첫 걸음*/}
      {/*          </div>*/}
      {/*          <div>순간이 아닌 영원한 기억으로 남겨주세요</div>*/}
      {/*        </div>*/}
      {/*      </div>*/}

      {/*      <div*/}
      {/*        style={{*/}
      {/*          backgroundColor: "white",*/}
      {/*          color: "black",*/}
      {/*          borderRadius: "1.5rem",*/}
      {/*          overflow: "hidden",*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <div*/}
      {/*          style={{*/}
      {/*            backgroundColor: "gray",*/}
      {/*            width: "520px",*/}
      {/*            height: "293px",*/}
      {/*          }}*/}
      {/*        />*/}
      {/*        <div*/}
      {/*          style={{*/}
      {/*            padding: "2rem",*/}
      {/*            fontSize: "1.25rem",*/}
      {/*            letterSpacing: "-0.5px",*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <div*/}
      {/*            style={{*/}
      {/*              marginBottom: "0.5rem",*/}
      {/*              fontWeight: "600",*/}
      {/*              color: "#2580FF",*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            행복한*/}
      {/*          </div>*/}
      {/*          <div>기억이 아닌 기록으로 오래오래 간직하세요</div>*/}
      {/*        </div>*/}
      {/*      </div>*/}

      {/*      <div*/}
      {/*        style={{*/}
      {/*          backgroundColor: "white",*/}
      {/*          color: "black",*/}
      {/*          borderRadius: "1.5rem",*/}
      {/*          overflow: "hidden",*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        <div*/}
      {/*          style={{*/}
      {/*            backgroundColor: "gray",*/}
      {/*            width: "520px",*/}
      {/*            height: "293px",*/}
      {/*          }}*/}
      {/*        />*/}
      {/*        <div*/}
      {/*          style={{*/}
      {/*            padding: "2rem",*/}
      {/*            fontSize: "1.25rem",*/}
      {/*            letterSpacing: "-0.5px",*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <div*/}
      {/*            style={{*/}
      {/*              marginBottom: "0.5rem",*/}
      {/*              fontWeight: "600",*/}
      {/*              color: "#2580FF",*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            기억할 필요 없이*/}
      {/*          </div>*/}
      {/*          <div>사진 한장으로 주차 위치를 찾으세요</div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  background-color: #eff0f3;
  overflow: hidden;
`;

const HeroText = styled.div`
  color: white;
  font-size: 120px;
  font-weight: bold;
  padding: 4.5rem;
  white-space: nowrap;
  width: 140vw; // ← 넓게 보여지도록
  transform: translateX(-20vw); // ← 좌우로 살짝 밀기
`;

const ContentWrapper = styled.div`
  padding: 4.5rem 0 9rem 0;
`;

const TitleBlock = styled.div`
  margin-bottom: 100px;
  text-align: center;
`;

const MainTitle = styled.div`
  color: black;
  font-size: 3.25rem;
  font-weight: 700;
  margin-bottom: 1rem;

  span {
    color: #909294;
  }
`;

const Subtitle = styled.div`
  color: #909294;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.5px;
  opacity: 0.8;
`;

const CardRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 0 20vw;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  flex: 0 0 auto;
  background-color: white;
  color: black;
  border-radius: 1.5rem;
  overflow: hidden;
  width: 520px;
  height: auto;
  scroll-snap-align: start;
`;

const CardImage = styled.div`
  background-color: gray;
  width: 100%;
  height: 293px;
`;

const CardContent = styled.div`
  padding: 2rem;
  font-size: 1.25rem;
  letter-spacing: -0.5px;
`;

const CardTitle = styled.div`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2580ff;
`;

const CardDescription = styled.div``;

export default BrandIntroSection;
