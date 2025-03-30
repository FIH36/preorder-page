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
                  <Price>{product.price}</Price>
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
    image: "https://placehold.co/300x150/000000/FFFFFF?text=Square+Black",
    title: "스퀘어 스타일 Black",
    price: "260,000원",
    description: "클래식한 무드를 담아 신뢰감을 주는 블랙 프레임",
    link: "https://example.com/product1",
  },
  {
    image: "https://placehold.co/300x150/222222/FFFFFF?text=Half-rim+Black",
    title: "하금테 스타일 Black",
    price: "240,000원",
    description: "세련된 감각을 담아 스마트함을 더한 하금테 프레임",
    link: "https://example.com/product2",
  },
  {
    image: "https://placehold.co/300x150/444444/FFFFFF?text=Round+Silver",
    title: "라운드 스타일 Silver",
    price: "270,000원",
    description: "감각적인 디자인과 실버 컬러의 조화",
    link: "https://example.com/product3",
  },
  {
    image: "https://placehold.co/300x150/666666/FFFFFF?text=Rectangle+Gold",
    title: "사각 프레임 Gold",
    price: "280,000원",
    description: "고급스러운 무드의 골드 프레임",
    link: "https://example.com/product4",
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
  gap: 24px;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Card = styled.div`
  max-width: 340px;
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

  @media (max-width: 768px) {
    max-width: 100%;
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
  flex: 1;
  width: 100%;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 2rem 0;
`;

const ProductTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -1px;
  line-height: 32px;
  color: black;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    line-height: 1.4;
  }
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: #2580ff;

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 28px;
  }
`;

const Description = styled.div`
  font-size: 1.2rem;
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
