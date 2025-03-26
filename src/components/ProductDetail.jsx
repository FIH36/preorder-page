/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

const theme = {
  background: {
    light: "#eee",
    card: "#ffffff",
    input: "#f8f8f8",
  },
  text: {
    primary: "#333333",
    secondary: "#555555",
    muted: "#888888",
  },
  accent: {
    primary: "orangered",
    hover: "#ff6347",
  },
  border: {
    light: "#eeeeee",
    medium: "#dddddd",
  },
};

export default function ProductDetail({}) {
  return (
    <ProductScrollSection>
      <ProductImage src={productInfo.image} alt="AInoon" />
      <ProductTitle>{getProductTitle()}</ProductTitle>
      <QuantitySelector>
        <QuantityControls>
          <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
          <QuantityDisplay>{quantity}</QuantityDisplay>
          <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
        </QuantityControls>
      </QuantitySelector>

      <PriceSummary>
        <PriceRow>
          <PriceValue>{totalPrice.toLocaleString()}원</PriceValue>
        </PriceRow>
        <TaxNotice>
          * 본 제품은 해외 배송으로 별도 세금이 부과될 수 있습니다
        </TaxNotice>
      </PriceSummary>

      <RefundPolicySection>
        <PolicyTitle>배송 및 반품/환불 안내</PolicyTitle>

        <PolicySection>
          <PolicySubtitle>사전예약 및 배송 안내</PolicySubtitle>
          <PolicyText>
            AInoon AI 글래스는 2025년 4월부터 사전예약을 받고 있으며, 2025년
            7월부터 순차적으로 배송될 예정입니다.
          </PolicyText>
          <PolicyList>
            <PolicyItem>
              <Highlight>배송 일정:</Highlight> 2025년 7월부터 순차 배송
            </PolicyItem>
            <PolicyItem>
              <Highlight>배송 방법:</Highlight> 택배 (국내 및 해외 배송 가능)
            </PolicyItem>
            <PolicyItem>
              <Highlight>배송 기간:</Highlight> 해외 배송의 경우 평균 2주 소요
              (국가별 차이 있음)
            </PolicyItem>
            <PolicyItem>
              <Highlight>배송비:</Highlight> 지역별로 배송비가 다르며, 결제 시
              자동 계산됩니다
            </PolicyItem>
            <PolicyItem>
              <Highlight>결제 내역:</Highlight> 주문 시 입력한 이메일로 결제
              완료 후 결제 내역이 발송됩니다
            </PolicyItem>
            <PolicyItem>
              <Highlight>주문 번호:</Highlight> 주문이 완료되면 이메일로 주문
              번호를 보내드립니다
            </PolicyItem>
            <PolicyItem>
              <Highlight>배송 현황:</Highlight> 2025년 7월부터 순차 배송이
              시작되면 배송 상태를 확인할 수 있습니다
            </PolicyItem>
            <PolicyItem>
              <Highlight>송장 번호:</Highlight> 배송이 시작되면 송장 번호를
              이메일로 안내해드립니다
            </PolicyItem>
          </PolicyList>
        </PolicySection>

        <PolicySection>
          <PolicySubtitle>주문 취소 안내</PolicySubtitle>
          <PolicyList>
            <PolicyItem>
              결제 완료 후 배송 준비가 시작되기 전까지는 주문 취소가 가능합니다.
            </PolicyItem>
            <PolicyItem>
              배송 준비가 시작되어 송장이 발부된 이후에는 교환 또는 반품 절차를
              따라야 합니다.
            </PolicyItem>
          </PolicyList>
        </PolicySection>

        <PolicySection>
          <PolicySubtitle>교환 및 반품 정책</PolicySubtitle>
          <PolicyText>
            AInoon 글래스는 고객님의 만족을 위해 교환 및 반품이 가능합니다. 단,
            몇 가지 조건을 확인해 주세요!
          </PolicyText>

          <NumberedList>
            <NumberedItem>
              <strong>교환 및 반품이 가능한 경우</strong>
              <PolicyList>
                <PolicyItem>
                  제품을 받은 날로부터 7일 이내에 교환 또는 반품 신청이
                  가능합니다.
                </PolicyItem>
                <PolicyItem>
                  제품을 사용하지 않은 상태여야 하며, 포장 및 구성품이 그대로
                  유지되어야 합니다.
                </PolicyItem>
                <PolicyItem>
                  제품에 하자가 있는 경우, 무료로 교환 또는 환불해 드립니다.
                </PolicyItem>
              </PolicyList>
            </NumberedItem>

            <NumberedItem>
              <strong>교환 및 반품 신청 방법</strong>
              <PolicyList>
                <PolicyItem>
                  교환 또는 반품을 원하시면, 구매처(고객 채널 톡)로 문의해
                  주세요.
                </PolicyItem>
                <PolicyItem>
                  반품 신청 후, 반품 세부 사항이 담긴 확인 이메일이 발송됩니다.
                </PolicyItem>
                <PolicyItem>
                  반품 신청 후 14일 이내에 제품이 반품 센터에 도착해야 합니다.
                </PolicyItem>
                <PolicyItem>
                  반품 접수 후 안내에 따라 제품을 보내주시면, 검수 완료 후 교환
                  또는 환불을 진행해 드립니다.
                </PolicyItem>
                <PolicyItem>
                  제품을 반품하실 때는, 주문번호 및 구매 내역이 확인 가능한
                  정보를 함께 동봉해 주세요.
                </PolicyItem>
              </PolicyList>
            </NumberedItem>

            <NumberedItem>
              <strong>교환 및 반품이 불가능한 경우</strong>
              <PolicyList>
                <PolicyItem>
                  제품을 수령한 후 7일이 지난 경우 (단, 하자가 있는 경우 제외)
                </PolicyItem>
                <PolicyItem>제품의 상품 가치가 감소한 경우</PolicyItem>
                <PolicyItem>
                  고객님의 부주의로 인해 제품이 훼손되거나 구성품이 누락된 경우
                </PolicyItem>
                <PolicyItem>
                  기타 전자상거래 소비자 보호 관련 법률에서 정한 환불/교환 불가
                  사유에 해당하는 경우
                </PolicyItem>
              </PolicyList>
            </NumberedItem>
          </NumberedList>
        </PolicySection>

        <PolicySection>
          <PolicySubtitle>환불 정책</PolicySubtitle>
          <PolicyText>
            고객님께서 구매하신 제품에 만족하지 못하셨다면, 7일 이내 환불이
            가능합니다.
          </PolicyText>
          <PolicyList>
            <PolicyItem>
              <Highlight>환불 가능 기간:</Highlight> 제품 수령 후 7일 이내 환불
              요청 가능
            </PolicyItem>
            <PolicyItem>
              <Highlight>환불 요청 방법:</Highlight> 구매처 문의하기를 통해
              접수해 주세요
            </PolicyItem>
            <PolicyItem>
              <Highlight>환불 처리 기간:</Highlight> 반품된 제품이 검수 완료되면
              7일 이내에 환불 처리됩니다
            </PolicyItem>
          </PolicyList>

          <PolicySubtitle>환불 방법</PolicySubtitle>
          <PolicyList>
            <PolicyItem>
              카드 결제하신 경우, 동일한 카드로 취소 및 환불이 진행됩니다.
            </PolicyItem>
            <PolicyItem>
              환불 요청 후 카드사 정책에 따라 영업일 기준 7~10일 이내 환불
              완료될 수 있습니다.
            </PolicyItem>
          </PolicyList>

          <PolicyText>
            <strong>환불 처리 과정</strong>
          </PolicyText>
          <NumberedList>
            <NumberedItem>반품 신청 후, 제품을 반송해 주세요.</NumberedItem>
            <NumberedItem>
              제품이 반품 센터에 도착하면 검수 절차가 진행됩니다.
            </NumberedItem>
            <NumberedItem>
              검수 완료 후 카드 결제 취소가 진행됩니다.
            </NumberedItem>
          </NumberedList>
        </PolicySection>

        <ContactInfo>
          더 궁금한 사항이 있으시면 고객센터로 문의해 주세요!
        </ContactInfo>
      </RefundPolicySection>
    </ProductScrollSection>
  );
}

const RefundPolicySection = styled.div`
  margin: 40px 0;
  background-color: ${theme.background.light};
  border-radius: 12px;
  padding: 25px;
`;

const PolicyTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  color: ${theme.text.primary};
  border-bottom: 1px solid ${theme.border.light};
  padding-bottom: 10px;
`;

const PolicySection = styled.div`
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PolicySubtitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: ${theme.text.primary};
  display: flex;
  align-items: center;

  &:before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 16px;
    background-color: orangered;
    margin-right: 8px;
    border-radius: 2px;
  }
`;

const PolicyText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${theme.text.secondary};
  margin: 0 0 12px 0;
`;

const PolicyList = styled.ul`
  margin: 10px 0;
  padding-left: 20px;
`;

const PolicyItem = styled.li`
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.6;
  color: ${theme.text.secondary};

  &:last-child {
    margin-bottom: 0;
  }
`;

const NumberedList = styled.ol`
  margin: 10px 0;
  padding-left: 20px;
`;

const NumberedItem = styled.li`
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.6;
  color: ${theme.text.secondary};
`;

const Highlight = styled.span`
  color: orangered;
  font-weight: 500;
`;

const ContactInfo = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: ${theme.background.light};
  border-radius: 8px;
  font-size: 14px;
  color: ${theme.text.secondary};
  text-align: center;
`;

const ProductScrollSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-right: 15px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  /* Chrome, Safari 및 Opera에서 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    max-height: none;
    overflow-y: visible;
    margin-bottom: 30px;
  }
`;

const ProductTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  color: ${theme.text.primary};
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuantityControls = styled.div`
  display: flex;
  background-color: white;
  align-items: center;
  border: 1px solid ${theme.border.medium};
  border-radius: 100px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: ${theme.text.primary};

  &:hover {
    background-color: ${theme.border.light};
  }
`;

const QuantityDisplay = styled.span`
  width: 40px;
  text-align: center;
  color: ${theme.text.primary};
`;

const PriceSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PriceValue = styled.span`
  font-weight: 700;
  font-size: 24px;
  color: orangered;
`;

const TaxNotice = styled.p`
  font-size: 12px;
  color: ${theme.text.muted};
  margin: 5px 0 0 0;
`;
