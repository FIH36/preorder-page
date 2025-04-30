/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useI18n } from "../hooks/useI18n.js";

export default function PreOrder() {
  const { t, loading } = useI18n();
  const isComingSoon = (title) =>
    title === "purchase_horn_black" || title === "purchase_horn_grey";

  return (
    <Section>
      <Content>
        <Title>{t.purchase_title}</Title>
        <CardRow>
          {products.map((product, i) => (
            <Card
              key={i}
              style={{
                position: "relative",
                pointerEvents: isComingSoon(product.title) ? "none" : "auto",
              }}
            >
              {isComingSoon(product.title) && (
                <>
                  <DimmedLayer />
                  <ComingSoonOverlay>
                    <span>Coming Soon</span>
                  </ComingSoonOverlay>
                </>
              )}

              {isComingSoon(product.title) && (
                <ComingSoonOverlay>
                  <span>Coming Soon</span>
                </ComingSoonOverlay>
              )}

              <ImageWrapper>
                <img src={product.image} alt={product.title} />
              </ImageWrapper>
              <CardContent>
                <TextGroup>
                  <ProductTitle>{t[product.title]}</ProductTitle>
                  <Description>{t[product.description]}</Description>
                  <Price>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "500",
                        lineHeight: "120%",
                        color: "#0c0c0c",
                        opacity: 0.8,
                        display: "flex",
                        textAlign: "right",
                        justifySelf: "end",
                        flexDirection: "row",
                      }}
                    >
                      <span
                        style={{ textDecoration: "none", marginRight: "4px" }}
                      >
                        {t.purchase_regular_price}{" "}
                      </span>
                      <div
                        style={{
                          textDecoration: "line-through",
                          textDecorationColor: "red",
                        }}
                      >
                        {t[product.price]}
                      </div>
                    </div>
                    <div style={{ flexDirection: "row" }}>
                      <span
                        style={{
                          color: "Red",
                          fontSize: "1.2rem",
                          letterSpacing: "-1px",
                        }}
                      >
                        {t.purchase_percent}
                      </span>{" "}
                      {t[product.salePrice]}
                    </div>
                  </Price>
                </TextGroup>
                <BuyButton
                  id={`buy-${product.title.toLowerCase().replace(/\s+/g, "-")}`}
                  as="a"
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t.purchase_buy}</span>
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
    image: "/PreOrder_01.webp",
    title: "purchase_browline_black",
    price: "purchase_regular_browline_black",
    salePrice: "purchase_saleprice_browline_black",
    description: "purchase_browline_black_description",
    link: "https://stepearth.store/surl/O/385?utm_source=AInoonHP&utm_medium=botton_click&utm_c[…]&utm_term=AInoonHP_half_black&utm_content=AInoonHP_half_black",
  },
  {
    image: "/PreOrder_02.webp",
    title: "purchase_browline_grey",
    price: "purchase_regular_browline_grey",
    salePrice: "purchase_saleprice_browline_grey",
    description: "purchase_browline_bgrey_description",
    link: "https://stepearth.store/surl/O/386?utm_source=AInoonHP&utm_medium=botton_click&utm_c[…]ey&utm_term=AInoonHP_half_grey&utm_content=AInoonHP_half_grey",
  },
  {
    image: "/PreOrder_03.webp",
    title: "purchase_horn_black",
    price: "purchase_regular_horn_black",
    salePrice: "purchase_saleprice_horn_black",
    description: "purchase_horn_black_description",
    link: "https://stepearth.store/product/%EC%97%90%EC%9D%B4%EC%95%84%EC%9D%B4%EB%88%88ainoon%EB%BF%94%ED%85%8C%EB%B8%94%EB%9E%99/387/category/78/display/1/",
  },
  {
    image: "/PreOrder_04.webp",
    title: "purchase_horn_grey",
    price: "purchase_regular_horn_grey",
    salePrice: "purchase_saleprice_horn_grey",
    description: "purchase_horn_grey_description",
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
    padding: 0 2rem;
  }
`;

const Card = styled.div`
  width: calc((100% - 72px) / 4);
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
    width: calc((100% - 48px) / 3);
  }

  @media (max-width: 768px) {
    width: 100%;
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
  justify-content: flex-end;

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
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin-bottom: 1rem;

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
const DimmedLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0.85;
  border-radius: 24px;
  z-index: 9;
`;

const ComingSoonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  span {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ff0000;

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }
`;
