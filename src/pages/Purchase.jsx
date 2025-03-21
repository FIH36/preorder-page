/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

export default function Purchase() {
  const navigate = useNavigate();
  const location = useLocation();

  // 초기 제품 정보 설정 (Home에서 전달받거나 기본값 사용)
  const defaultProduct = {
    id: "browline",
    name: "browline",
    color: "Black",
    price: 193700,
    image: "/Main_Glasses.png",
    quantity: 1,
    type: "single",
  };

  // location.state에서 제품 정보 가져오기 (없으면 기본값 사용)
  const initialProduct = location.state?.product || defaultProduct;

  // 달러 가격을 원화로 변환 (필요하면 적절한 환율 적용)
  const convertToKRW = (usdPrice) => {
    // 만약 이미 원화로 들어왔다면 그대로 사용, 달러라면 변환
    return typeof usdPrice === "number" && usdPrice < 1000
      ? Math.round(usdPrice * 1300)
      : usdPrice;
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    postcode: "",
    address: "",
    detailAddress: "",
  });

  // 초기 수량은 선택된 제품의 수량으로 설정
  const [quantity, setQuantity] = useState(initialProduct.quantity);
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);
  // 스크립트 로딩 상태 추가
  const [postcodeScriptLoaded, setPostcodeScriptLoaded] = useState(false);
  const [impScriptLoaded, setImpScriptLoaded] = useState(false);

  // 제품 정보
  const [productInfo, setProductInfo] = useState({
    name: initialProduct.name,
    color: initialProduct.color,
    image: initialProduct.image,
    price: convertToKRW(initialProduct.price),
    type: initialProduct.type,
  });

  // Purchase.jsx 컴포넌트 내부
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 포트원 SDK 로드 (누락된 부분 추가)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    script.onload = () => {
      setImpScriptLoaded(true);
      console.log("포트원 SDK 로드 완료");
    };
    script.onerror = () => {
      console.error("포트원 SDK 로드 실패");
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // 다음 우편번호 검색 API 로드 - 콜백 추가
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => {
      setPostcodeScriptLoaded(true);
      console.log("우편번호 검색 API 로드 완료");
    };
    script.onerror = () => {
      console.error("우편번호 검색 API 로드 실패");
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // 브라우저 뒤로가기 처리
  useEffect(() => {
    const handlePopState = (event) => {
      // 결제 진행 중에 뒤로가기를 누른 경우
      if (isPaymentInProgress) {
        setIsPaymentInProgress(false);
        // 포트원 결제창을 닫기 위한 처리
        if (window.IMP) {
          try {
            window.IMP.close();
          } catch (error) {
            console.error("결제창 닫기 실패:", error);
          }
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isPaymentInProgress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoBack = () => navigate(-1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email) {
      alert("이름, 연락처, 이메일을 입력해주세요.");
      return;
    }

    // SDK 로드 확인
    if (!window.IMP) {
      alert(
        "포트원 SDK가 로드되지 않았습니다. 페이지를 새로고침 후 다시 시도해주세요.",
      );
      console.error("IMP 객체가 없음:", window.IMP);
      return;
    }

    // 결제 진행 상태 설정
    setIsPaymentInProgress(true);

    // 결제 시점의 수량과 총액을 정확하게 반영
    const currentProductPrice = productInfo.price * quantity;

    // 결제창 표시 전에 현재 URL을 기억하기 위한 히스토리 포인트 추가
    window.history.pushState({ page: "payment" }, "", window.location.href);

    // 디바이스 체크
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    console.log("디바이스 체크:", isMobile ? "모바일" : "PC");

    const paymentData = {
      pg: "html5_inicis", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `order_${new Date().getTime()}`, // 주문번호
      name: `${productInfo.name} _ ${productInfo.color} x ${quantity}`, // 주문명
      amount: currentProductPrice, // 결제금액
      buyer_email: formData.email,
      buyer_name: formData.name,
      buyer_tel: formData.phone,
      buyer_addr: `${formData.address || ""} ${formData.detailAddress || ""}`,
      buyer_postcode: formData.postcode || "00000",
      // 모바일 환경에서는 여기서 m_redirect_url 설정하지 않고 requestPayment 함수에서 처리
    };

    console.log("결제 요청 데이터:", paymentData);
    console.log("IMP 객체 존재 여부:", window.IMP ? "존재함" : "존재하지 않음");

    requestPayment(paymentData);
  };

  // 결제 요청 함수 수정
  const requestPayment = (data) => {
    if (!window.IMP) {
      setIsPaymentInProgress(false);
      alert(
        "포트원 SDK가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.",
      );
      return;
    }

    const { IMP } = window;
    IMP.init("imp66470748"); // 가맹점 식별코드

    // 모바일 환경 확인
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    console.log("모바일 환경:", isMobile);

    // 주문 정보
    const orderInfo = {
      product: `${productInfo.name} _ ${productInfo.color}`,
      quantity: quantity,
      totalPrice: productInfo.price * quantity,
      buyerInfo: formData,
      productImage: productInfo.image,
    };

    // 모바일 환경에서는 m_redirect_url 설정 필수, 콜백 없음
    if (isMobile) {
      // 주문 정보를 로컬 스토리지에 저장
      try {
        localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
      } catch (error) {
        console.error("로컬 스토리지 저장 실패:", error);
      }

      // 모바일용 결제 요청 데이터 구성
      data.m_redirect_url = `${window.location.origin}/order-complete`;

      // 모바일에서는 콜백 없이 결제 요청
      IMP.request_pay(data);
    } else {
      // PC 환경에서는 iframe 방식, 콜백 함수 사용
      IMP.request_pay(data, function (response) {
        setIsPaymentInProgress(false);
        console.log("결제 응답:", response);

        if (response.success) {
          // 결제 성공 시 주문 완료 페이지로 이동
          navigate("/order-complete", {
            state: {
              orderId: response.merchant_uid,
              paymentInfo: response,
              orderInfo: orderInfo,
            },
          });
        } else {
          // 결제 실패 처리
          if (response.error_msg === "사용자가 결제를 취소하셨습니다") {
            console.log("사용자가 결제를 취소했습니다.");
          } else {
            alert(`결제에 실패했습니다: ${response.error_msg}`);
          }
        }
      });
    }
  };

  const searchPostcode = () => {
    if (postcodeScriptLoaded && window.daum && window.daum.Postcode) {
      console.log("우편번호 검색 시작");

      // PC와 모바일 환경에 따라 다르게 처리
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );

      if (isMobile) {
        // 모바일에서는 기본 팝업 사용
        new window.daum.Postcode({
          oncomplete: (data) => {
            console.log("우편번호 검색 완료:", data);
            setFormData((prev) => ({
              ...prev,
              postcode: data.zonecode,
              address: data.address,
            }));
          },
        }).open();
      } else {
        // PC에서는 iframe으로 표시
        const postcodeWrapper = document.getElementById(
          "searchPostcodeWrapper",
        );
        if (postcodeWrapper) {
          postcodeWrapper.style.display = "block";

          // iframe을 이용해 우편번호 서비스 실행
          new window.daum.Postcode({
            oncomplete: (data) => {
              console.log("우편번호 검색 완료:", data);
              setFormData((prev) => ({
                ...prev,
                postcode: data.zonecode,
                address: data.address,
              }));

              // 검색 완료 후 팝업 닫기
              postcodeWrapper.style.display = "none";

              // iframe 제거
              postcodeWrapper.innerHTML = "";
            },
            onclose: () => {
              // 사용자가 닫기 버튼을 눌렀을 때
              postcodeWrapper.style.display = "none";
              postcodeWrapper.innerHTML = "";
            },
            width: "100%",
            height: "100%",
          }).embed(postcodeWrapper);
        }
      }
    } else {
      alert(
        "우편번호 검색 서비스가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.",
      );
      console.error("우편번호 검색 불가:", {
        postcodeScriptLoaded,
        daumExists: !!window.daum,
        postcodeExists: window.daum ? !!window.daum.Postcode : false,
      });
    }
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    quantity > 1 && setQuantity((prev) => prev - 1);

  const productPrice = productInfo.price;
  const totalPrice = productPrice * quantity;

  // 제품 타입에 따른 제목 및 설명 결정
  const getProductTitle = () => {
    if (productInfo.type === "bundle") {
      return `${productInfo.name} ${productInfo.color}`;
    }
    return `${productInfo.name} _ ${productInfo.color}`;
  };
  return (
    <PageContainer>
      {/* 상단 고정 헤더 */}
      <FixedHeader>
        <BackButton onClick={handleGoBack}>
          <ArrowIcon>&larr;</ArrowIcon>
          <span>뒤로가기</span>
        </BackButton>
      </FixedHeader>

      {/* 메인 콘텐츠 */}
      <MainContentWrapper>
        {/* 왼쪽 스크롤 섹션 */}
        <ProductScrollWrapper>
          <ProductScrollSection>
            <ProductImage src={productInfo.image} alt="AInoon" />
            <ProductTitle>{getProductTitle()}</ProductTitle>
            {/*<QuantitySelector>*/}
            {/*  <QuantityControls>*/}
            {/*    <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>*/}
            {/*    <QuantityDisplay>{quantity}</QuantityDisplay>*/}
            {/*    <QuantityButton onClick={increaseQuantity}>+</QuantityButton>*/}
            {/*  </QuantityControls>*/}
            {/*</QuantitySelector>*/}

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
                  AInoon AI 글래스는 2025년 4월부터 사전예약을 받고 있으며,
                  2025년 7월부터 순차적으로 배송될 예정입니다.
                </PolicyText>
                <PolicyList>
                  <PolicyItem>
                    <Highlight>배송 일정:</Highlight> 2025년 7월부터 순차 배송
                  </PolicyItem>
                  <PolicyItem>
                    <Highlight>배송 방법:</Highlight> 택배 (국내 및 해외 배송
                    가능)
                  </PolicyItem>
                  <PolicyItem>
                    <Highlight>배송 기간:</Highlight> 해외 배송의 경우 평균 2주
                    소요 (국가별 차이 있음)
                  </PolicyItem>
                  <PolicyItem>
                    <Highlight>배송비:</Highlight> 지역별로 배송비가 다르며,
                    결제 시 자동 계산됩니다
                  </PolicyItem>
                  <PolicyItem>
                    <Highlight>결제 내역:</Highlight> 주문 시 입력한 이메일로
                    결제 완료 후 결제 내역이 발송됩니다
                  </PolicyItem>
                  <PolicyItem>
                    <Highlight>주문 번호:</Highlight> 주문이 완료되면 이메일로
                    주문 번호를 보내드립니다
                  </PolicyItem>
                  <PolicyItem>
                    <Highlight>배송 현황:</Highlight> 2025년 7월부터 순차 배송이
                    시작되면 배송 상태를 확인할 수 있습니다
                  </PolicyItem>
                  <PolicyItem>
                    <Highlight>송장 번호:</Highlight> 배송이 시작되면 송장
                    번호를 이메일로 안내해드립니다
                  </PolicyItem>
                </PolicyList>
              </PolicySection>

              <PolicySection>
                <PolicySubtitle>주문 취소 안내</PolicySubtitle>
                <PolicyList>
                  <PolicyItem>
                    결제 완료 후 배송 준비가 시작되기 전까지는 주문 취소가
                    가능합니다.
                  </PolicyItem>
                  <PolicyItem>
                    배송 준비가 시작되어 송장이 발부된 이후에는 교환 또는 반품
                    절차를 따라야 합니다.
                  </PolicyItem>
                </PolicyList>
              </PolicySection>

              <PolicySection>
                <PolicySubtitle>교환 및 반품 정책</PolicySubtitle>
                <PolicyText>
                  AInoon 글래스는 고객님의 만족을 위해 교환 및 반품이
                  가능합니다. 단, 몇 가지 조건을 확인해 주세요!
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
                        제품을 사용하지 않은 상태여야 하며, 포장 및 구성품이
                        그대로 유지되어야 합니다.
                      </PolicyItem>
                      <PolicyItem>
                        제품에 하자가 있는 경우, 무료로 교환 또는 환불해
                        드립니다.
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
                        반품 신청 후, 반품 세부 사항이 담긴 확인 이메일이
                        발송됩니다.
                      </PolicyItem>
                      <PolicyItem>
                        반품 신청 후 14일 이내에 제품이 반품 센터에 도착해야
                        합니다.
                      </PolicyItem>
                      <PolicyItem>
                        반품 접수 후 안내에 따라 제품을 보내주시면, 검수 완료 후
                        교환 또는 환불을 진행해 드립니다.
                      </PolicyItem>
                      <PolicyItem>
                        제품을 반품하실 때는, 주문번호 및 구매 내역이 확인
                        가능한 정보를 함께 동봉해 주세요.
                      </PolicyItem>
                    </PolicyList>
                  </NumberedItem>

                  <NumberedItem>
                    <strong>교환 및 반품이 불가능한 경우</strong>
                    <PolicyList>
                      <PolicyItem>
                        제품을 수령한 후 7일이 지난 경우 (단, 하자가 있는 경우
                        제외)
                      </PolicyItem>
                      <PolicyItem>제품의 상품 가치가 감소한 경우</PolicyItem>
                      <PolicyItem>
                        고객님의 부주의로 인해 제품이 훼손되거나 구성품이 누락된
                        경우
                      </PolicyItem>
                      <PolicyItem>
                        기타 전자상거래 소비자 보호 관련 법률에서 정한 환불/교환
                        불가 사유에 해당하는 경우
                      </PolicyItem>
                    </PolicyList>
                  </NumberedItem>
                </NumberedList>
              </PolicySection>

              <PolicySection>
                <PolicySubtitle>환불 정책</PolicySubtitle>
                <PolicyText>
                  고객님께서 구매하신 제품에 만족하지 못하셨다면, 7일 이내
                  환불이 가능합니다.
                </PolicyText>
                <PolicyList>
                  <PolicyItem>
                    <Highlight>환불 가능 기간:</Highlight> 제품 수령 후 7일 이내
                    환불 요청 가능
                  </PolicyItem>
                  <PolicyItem>
                    <Highlight>환불 요청 방법:</Highlight> 구매처 문의하기를
                    통해 접수해 주세요
                  </PolicyItem>
                  <PolicyItem>
                    <Highlight>환불 처리 기간:</Highlight> 반품된 제품이 검수
                    완료되면 7일 이내에 환불 처리됩니다
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
                  <NumberedItem>
                    반품 신청 후, 제품을 반송해 주세요.
                  </NumberedItem>
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
        </ProductScrollWrapper>

        {/* 오른쪽 고정 배송정보 섹션 */}
        <CheckoutFixedWrapper>
          <CheckoutFixedSection>
            <CheckoutForm onSubmit={handleSubmit}>
              <SectionTitle>배송 정보</SectionTitle>
              <FormGroup>
                <Label htmlFor="name">이름</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">연락처</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">이메일</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="postcode">우편번호</Label>
                <PostcodeContainer>
                  <PostcodeInput
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    readOnly
                    required
                  />
                  {/*<PostcodeButton type="button" onClick={searchPostcode}>*/}
                  {/*  우편번호 찾기*/}
                  {/*</PostcodeButton>*/}
                  <PostcodeButton
                    type="button"
                    onClick={searchPostcode}
                    disabled={!postcodeScriptLoaded}
                  >
                    우편번호 찾기
                  </PostcodeButton>
                </PostcodeContainer>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="address">주소</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  readOnly
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="detailAddress">상세 주소</Label>
                <Input
                  type="text"
                  id="detailAddress"
                  name="detailAddress"
                  value={formData.detailAddress}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={isPaymentInProgress || !impScriptLoaded}
              >
                {isPaymentInProgress ? "처리 중..." : "결제하기"}
              </SubmitButton>
            </CheckoutForm>
          </CheckoutFixedSection>
        </CheckoutFixedWrapper>
      </MainContentWrapper>
      {/* 우편번호 검색 결과를 표시할 컨테이너 - 여기에 추가 */}
      <div
        id="searchPostcodeWrapper"
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000,
          background: "rgba(0, 0, 0, 0.5)",
        }}
      ></div>
    </PageContainer>
  );
}

// 스타일 컴포넌트
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.background.light};
  color: ${theme.text.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FixedHeader = styled.div`
  position: fixed;
  max-width: 1200px;
  width: 100%;
  background-color: ${theme.background.light};
  padding: 20px;
  z-index: 100;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 15px;
  color: ${theme.text.secondary};
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.2s;

  &:hover {
    color: orangered;
  }
`;

const ArrowIcon = styled.span`
  font-size: 18px;
`;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 70px 20px 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 80px;
  }
`;

const ProductScrollWrapper = styled.div`
  flex: 1;
  overflow: hidden;
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

const SectionTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
  color: ${theme.text.primary};
`;

const CheckoutFixedWrapper = styled.div`
  width: 450px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CheckoutFixedSection = styled.div`
  position: sticky;
  top: 80px;
  height: fit-content;

  @media (max-width: 768px) {
    position: static;
  }
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

const CheckoutForm = styled.form`
  background-color: ${theme.background.card};
  border-radius: 12px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.text.secondary};
`;

const Input = styled.input`
  height: 48px;
  padding: 0 15px;
  border: 1px solid ${theme.border.medium};
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
  background-color: ${theme.background.input};
  color: ${theme.text.primary};

  &:focus {
    border-color: orangered;
  }
`;

const PostcodeContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const PostcodeInput = styled.input`
  flex: 1;
  height: 48px;
  padding: 0 15px;
  border: 1px solid ${theme.border.medium};
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  background-color: ${theme.background.input};
  color: ${theme.text.primary};
`;

const PostcodeButton = styled.button`
  height: 48px;
  padding: 0 15px;
  background-color: #555;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.3s;

  &:hover {
    background-color: #444;
  }
`;

const SubmitButton = styled.button`
  height: 54px;
  background-color: orangered;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;

  &:hover {
    background-color: #ff6347;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

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
