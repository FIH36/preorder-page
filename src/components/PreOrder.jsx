/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export default function PreOrder() {
  return (
    <Section>
      <Content>
        <Title>
          <Highlight>AInoon</Highlight>
          <span> 사전 구매하기</span>
        </Title>
        <CardRow>
          {products.map((product, i) => (
            <Card key={i}>
              <ImageWrapper>
                <img src={product.image} alt={product.title} />
              </ImageWrapper>
              <CardContent>
                <TextGroup>
                  <ProductTitle>{product.title}</ProductTitle>
                  <Description>{product.description}</Description>
                  <Price>
                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "400",
                        textDecoration: "line-through",
                        lineHeight: "120%",
                        color: "#909294",
                        opacity: "0.5",
                      }}
                    >
                      {product.salePrice}
                    </div>
                    <div style={{ flexDirection: "row" }}>
                      <span
                        style={{
                          color: "Red",
                          fontSize: "1.2rem",
                          letterSpacing: "-1px",
                        }}
                      >
                        15%
                      </span>{" "}
                      {product.price}
                    </div>
                  </Price>
                </TextGroup>
                <BuyButton
                  as="a"
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>사전 구매하기</span>
                </BuyButton>
              </CardContent>
            </Card>
          ))}
        </CardRow>
      </Content>
    </Section>
  );
}

const products = [
  {
    image: "/PreOrder_01.png",
    title: "하금테 Black",
    price: "270,000원",
    salePrice: "229,000원",
    description: "세련된 감각을 담아 스마트함을 더한 하프 프레임",
    link: "https://stepearth.store/product/%EC%97%90%EC%9D%B4%EC%95%84%EC%9D%B4%EB%88%88ainoon%ED%95%98%EA%B8%88%ED%85%8C%EB%B8%94%EB%9E%99/385/category/78/display/1/",
  },
  {
    image: "/PreOrder_02.png",
    title: "하금테 Grey",
    price: "270,000원",
    salePrice: "229,000원",
    description: "고급스럽지만 산뜻한 느낌을 더한 하프 프레임",
    link: "https://stepearth.store/product/%EC%97%90%EC%9D%B4%EC%95%84%EC%9D%B4%EB%88%88ainoon%ED%95%98%EA%B8%88%ED%85%8C%EA%B7%B8%EB%A0%88%EC%9D%B4/386/category/78/display/1/",
  },
  {
    image: "/PreOrder_03.png",
    title: "뿔테 Black",
    price: "290,000원",
    salePrice: "246,000원",
    description: "첨단 감각에 세련된 디자인의 풀 프레임",
    link: "https://stepearth.store/product/%EC%97%90%EC%9D%B4%EC%95%84%EC%9D%B4%EB%88%88ainoon%EB%BF%94%ED%85%8C%EB%B8%94%EB%9E%99/387/category/78/display/1/",
  },
  {
    image: "/PreOrder_04.png",
    title: "뿔테 Grey",
    price: "290,000원",
    salePrice: "246,000원",
    description: "도시적이고 감각적인 디자인의 풀 프레임",
    link: "https://stepearth.store/product/%EC%97%90%EC%9D%B4%EC%95%84%EC%9D%B4%EB%88%88ainoon%EB%BF%94%ED%85%8C%EA%B7%B8%EB%A0%88%EC%9D%B4/388/category/78/display/1/",
  },
];

const Section = styled.section`
  width: 100%;
  background: #eff0f3;
  padding: 144px 10px;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;

  @media (max-width: 768px) {
    gap: 60px;
  }
`;

const Title = styled.h2`
  font-size: 52px;
  font-weight: 700;
  color: black;

  @media (max-width: 768px) {
    font-size: 32px;
    text-align: center;
    line-height: 1.3;
  }
`;

const Highlight = styled.span`
  color: #909294;
`;

const CardRow = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 16px;
    padding: 0 2rem; // 모바일 좌우 마진 역할
  }
`;

const Card = styled.div`
  width: calc((100% - 72px) / 4); // 4개 카드 기준 (gap 24px x 3)
  height: 450px;
  background: white;
  border-radius: 24px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  @media (max-width: 1024px) {
    width: calc((100% - 48px) / 3); // 3개 카드
  }

  @media (max-width: 768px) {
    width: 100%; // 모바일은 한 줄씩 꽉 차게
    height: auto;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;

const ProductTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -1px;
  line-height: 32px;
  color: black;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    line-height: 1.4;
  }
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: #2580ff;
  text-align: right;

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 28px;
  }
`;

const Description = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.4;
  height: 55px;
  color: #909294;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BuyButton = styled.a`
  margin-top: auto;
  align-self: stretch;
  padding: 14px 42px;
  background: linear-gradient(46deg, #2580ff 0%, #6e5cff 50%, #b5a1ff 100%);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }

  span {
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 24px;
    color: white;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;
