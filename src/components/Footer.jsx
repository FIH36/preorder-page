/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";

export default function Footer() {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const openTermsModal = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
    document.body.style.overflow = "hidden";
  };

  const openPrivacyModal = (e) => {
    e.preventDefault();
    setShowPrivacyModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModals = () => {
    setShowTermsModal(false);
    setShowPrivacyModal(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#171719",
        }}
      >
        <FooterWrapper>
          <FooterSection>
            <SectionTitle>주식회사 시어스랩</SectionTitle>
            <InfoList>
              {/*<InfoItem>상호명 : 주식회사 시어스랩</InfoItem>*/}
              <InfoItem>대표자명 : 정진욱</InfoItem>
              <InfoItem>
                사업장 주소 : 06628 서울특별시 서초구 강남대로 315 (서초동)
                파이낸셜뉴스빌딩
              </InfoItem>
              <InfoItem>대표 전화 : 070-7702-6800</InfoItem>
              <InfoItem>사업자 등록번호 : 105-88-03237</InfoItem>
              <InfoItem>
                통신판매업 신고번호 : 2021-서울서초-1580{" "}
                <BizInfoLink
                  href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=1058803237"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  [사업자정보확인]
                </BizInfoLink>
              </InfoItem>
              <InfoItem>개인정보보호책임자 정진욱</InfoItem>
            </InfoList>
          </FooterSection>

          <FooterSection>
            <SectionTitle>고객센터 정보</SectionTitle>
            <InfoList>
              <InfoItem>상담/주문전화: 070-7702-6800</InfoItem>
              <InfoItem>상담/주문 이메일: ainoon@seerslab.com</InfoItem>
              <InfoItem>CS운영시간: 10:00~18:00</InfoItem>
            </InfoList>
          </FooterSection>

          <FooterBottom>
            {/*<PolicyLinks>*/}
            {/*  <PolicyLink href="#" onClick={openTermsModal}>*/}
            {/*    이용약관*/}
            {/*  </PolicyLink>*/}
            {/*  <PolicyLink href="#" onClick={openPrivacyModal} emphasis>*/}
            {/*    개인정보처리방침*/}
            {/*  </PolicyLink>*/}
            {/*</PolicyLinks>*/}
            <Copyright>© 2025 AInoon. All rights reserved.</Copyright>
          </FooterBottom>
        </FooterWrapper>
      </div>

      {/* 이용약관 모달 */}
      {showTermsModal && (
        <ModalOverlay onClick={closeModals}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>이용약관</ModalTitle>
              <CloseButton onClick={closeModals}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <TermsContent>
                <TermsSection>
                  <TermsTitle>이용 약관(커머스)</TermsTitle>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제 1 조 (목적)</TermsTitle>
                  <TermsText>
                    본 약관은 주식회사 시어스랩(이하 '회사')이 운영하는 AInoon
                    공식 쇼핑몰(이하 '판매채널')을 통해 제공하는 전자상거래
                    서비스(이하 '서비스')와 관련하여 '회사'와 '이용자'의 권리,
                    의무 및 책임사항을 규정함을 목적으로 합니다.
                  </TermsText>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제 2 조 (정의)</TermsTitle>
                  <TermsList>
                    <TermsListItem>
                      1. '판매채널'이란 '회사'가 AI 기반 스마트 글래스 -
                      AInoon(이하 '제품') 및 관련 서비스를 판매하기 위해 마련한
                      온라인 플랫폼을 의미합니다.
                    </TermsListItem>
                    <TermsListItem>
                      2. '이용자'란 '판매채널'에 접속하여 이 약관에 따라
                      '회사'가 제공하는 서비스를 이용하는 자(비회원 포함)를
                      의미합니다.
                    </TermsListItem>
                    <TermsListItem>
                      3. '비회원'이란 회원 가입 없이 '판매채널'을 이용하는 자를
                      의미합니다.
                    </TermsListItem>
                    <TermsListItem>
                      4. '제품'이란 '회사'가 판매하는 AI 기반 스마트 글래스인
                      'AInoon'을 의미합니다.
                    </TermsListItem>
                    <TermsListItem>
                      5. 본 조에서 명시되지 않은 용어는 관련 법령 및 일반 상거래
                      관행을 따릅니다.
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제 3 조 (약관의 명시, 설명 및 개정)</TermsTitle>
                  <TermsList>
                    <TermsListItem>
                      1. '회사'는 본 약관의 내용을 이용자가 쉽게 알 수 있도록
                      '판매채널'의 초기 화면에 게시합니다.
                    </TermsListItem>
                    <TermsListItem>
                      2. 회사가 약관을 개정할 경우에는 기존약관과 개정약관 및
                      개정약관의 적용일자와 개정사유를 명시하여 현행약관과 함께
                      그 적용일자 7일 전부터 적용일 이후 상당한 기간 동안, 개정
                      내용이 이용자에게 불리한 경우에는 그 적용일자 30일 전부터
                      적용일 이후 상당한 기간 동안 각각 이를 서비스에 연결된
                      화면에 공지합니다.
                    </TermsListItem>
                    <TermsListItem>
                      3. 개정 약관의 적용에 동의하지 않는 이용자는 서비스 이용을
                      중단할 수 있습니다.
                    </TermsListItem>
                    <TermsListItem>
                      4. 회사가 전항에 따라 회원에게 통지하면서
                      공지∙고지일로부터 개정약관 시행일 7일 후까지 거부의사를
                      표시하지 아니하면 승인한 것으로 본다는 뜻을 명확하게
                      고지하였음에도 의사표시가 없는 경우에는 변경된 약관을
                      승인한 것으로 봅니다.
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제 4 조 (서비스의 제공 및 변경)</TermsTitle>
                  <TermsList>
                    <TermsListItem>
                      1. '회사'는 다음과 같은 서비스를 제공합니다.
                      <TermsSubList>
                        <TermsSubListItem>'제품' 판매</TermsSubListItem>
                        <TermsSubListItem>
                          '제품' 연동 앱의 다운로드 안내 및 사용 지원
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      2. '회사'는 기술적 필요성, 법적 규정 준수, 서비스 개선
                      등의 사유로 서비스 내용을 변경할 수 있으며, 이 경우 변경된
                      내용을 사전 공지합니다.
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제 5 조 (구매 계약 및 결제)</TermsTitle>
                  <TermsList>
                    <TermsListItem>
                      1. 이용자는 '판매채널'에서 제공하는 절차에 따라 '제품'을
                      구매할 수 있습니다.
                    </TermsListItem>
                    <TermsListItem>
                      2. '회사'는 이용자가 결제 시 다음과 같은 방법을 제공할 수
                      있습니다.
                      <TermsSubList>
                        <TermsSubListItem>[신용카드]</TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      3. 이용자는 회원 가입 없이 '제품'을 구매할 수 있으며, 구매
                      시 결제 창에서 구매자 정보(이름, 연락처, 배송지 등)를
                      입력해야 합니다.
                    </TermsListItem>
                    <TermsListItem>
                      4. 결제 시 사용된 정보의 입력 오류 및 부정사용에 대한
                      책임은 이용자에게 있습니다.
                    </TermsListItem>
                    <TermsListItem>
                      5. '회사'는 '이용자'의 대금 지급에 법적, 기술적 문제가
                      발생하거나 '회사'가 예견하지 못한 장애(은행 통신망 장애
                      등)가 발생하는 경우 '회사'의 정책에 따라 '이용자'에게 결제
                      수단의 변경을 요청하거나 잠정 결제보류 내지 거부할 수
                      있습니다.
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제 6 조 (배송 및 해외 배송)</TermsTitle>
                  <TermsList>
                    <TermsListItem>
                      1. '회사'는 이용자가 입력한 배송지로 '제품'을 배송하며,
                      배송 소요 기간은 [국내 배송: 영업일 기준 3일 / 해외 배송:
                      영업일 기준 15일]입니다.
                    </TermsListItem>
                    <TermsListItem>
                      2. 해외 배송의 경우, 현지 세관에서 부과하는 관세 및
                      부가세는 구매자가 부담해야 하며, 관련 비용 발생 시 반품 및
                      환불이 제한될 수 있습니다.
                    </TermsListItem>
                    <TermsListItem>
                      3. 배송 중 발생한 지연, 세관 통관 문제 및 추가 비용은
                      '회사'의 책임이 아니며, 구매자가 해당 국가의 수입 규정을
                      확인하는 것은 구매자의 책임입니다.
                    </TermsListItem>
                    <TermsListItem>
                      4. 배송지는 이용자가 정확히 입력해야 하며, 잘못된 정보
                      입력으로 인한 배송 문제에 대해 '회사'는 책임지지 않습니다.
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제 7 조 (청약철회 및 환불)</TermsTitle>
                  <TermsList>
                    <TermsListItem>
                      1. '회사'는 관련 법령에 따라 이용자가 수령한 '제품'에 대해
                      7일 이내에 청약철회를 허용합니다. 단, 다음의 경우
                      청약철회가 제한될 수 있습니다.
                      <TermsSubList>
                        <TermsSubListItem>
                          포장을 개봉하여 사용한 경우 (소비자보호법상 청약철회
                          제한 사유에 해당)
                        </TermsSubListItem>
                        <TermsSubListItem>
                          소비자의 책임 있는 사유로 '제품'이 훼손된 경우
                        </TermsSubListItem>
                        <TermsSubListItem>
                          전자상거래법 등 관련 법령에 따라 청약철회가 제한되는
                          경우
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      2. 환불은 '제품' 반품 확인 후 7영업일 이내에 처리됩니다.
                    </TermsListItem>
                    <TermsListItem>
                      3. 반품 및 교환 시 발생하는 모든 배송비 및 기타 비용은
                      구매자가 부담합니다.
                    </TermsListItem>
                    <TermsListItem>
                      4. '회사'가 이용자에게 환불을 진행하는 경우, 결제 수단에
                      따라 환불 기간이 상이할 수 있습니다.
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>
                    제 8 조 (Pre-order(사전 판매)에 대한 특칙)
                  </TermsTitle>
                  <TermsList>
                    <TermsListItem>
                      1. '회사'는 특정 '제품'에 대해 사전 판매(Pre-order)를
                      진행할 수 있으며, 해당 '제품'은 정식 출시 이전에 예약 구매
                      형태로 판매됩니다.
                    </TermsListItem>
                    <TermsListItem>
                      2. 사전 판매 제품은 구매자가 주문을 먼저 진행하고,
                      '회사'가 제작을 완료한 후 순차적으로 배송됩니다.
                    </TermsListItem>
                    <TermsListItem>
                      3. 이용자는 사전 구매 버튼 클릭 후 결제 창에서 구매자
                      정보(이름, 연락처, 배송지 등)를 입력하여 주문을 완료할 수
                      있습니다.
                    </TermsListItem>
                    <TermsListItem>
                      4. 사전 판매된 '제품'의 배송 일정은 '회사'가 별도로
                      공지하는 일정에 따릅니다.
                    </TermsListItem>
                    <TermsListItem>
                      5. 사전 판매 제품의 주문 취소 및 환불은 다음과 같은 조건이
                      적용됩니다.
                      <TermsSubList>
                        <TermsSubListItem>
                          결제 완료 후 배송 준비가 시작되기 전까지는 주문 취소가
                          가능합니다.
                        </TermsSubListItem>
                        <TermsSubListItem>
                          배송 준비가 시작되어 송장이 발부된 후에는 주문 취소가
                          불가능하며, 이 경우 환불 절차를 따릅니다.
                        </TermsSubListItem>
                        <TermsSubListItem>
                          제품이 예상 출고일보다 14일 이상 지연될 경우, 이용자는
                          주문 취소 및 환불을 요청할 수 있습니다.
                        </TermsSubListItem>
                        <TermsSubListItem>
                          단순 변심으로 인한 환불은 제품 수령 후 7일 이내에
                          신청해야 하며, 제품 사용 시 환불이 제한될 수 있습니다.
                        </TermsSubListItem>
                        <TermsSubListItem>
                          반품 및 환불 시 발생하는 모든 배송비 및 기타 비용은
                          구매자가 부담합니다.
                        </TermsSubListItem>
                        <TermsSubListItem>
                          환불은 반품된 제품이 '회사'에 도착한 후 상태 확인을
                          거쳐 7영업일 이내에 처리됩니다.
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      6. '회사'가 이용자에게 사전 판매 제품 구매 시, 해당 제품의
                      예상 출고 일정 및 청약철회 제한 사항을 확인하고 동의한
                      것으로 간주한다는 뜻을 명확하게 공지 또는 통지하였음에도
                      이용자가 명시적으로 거부의 의사표시를 하지 아니한 경우,
                      이용자가 해당 제품의 예상 출고 일정 및 청약철회 제한
                      사항에 동의한 것으로 봅니다.
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제 9 조 (책임 제한 및 면책 조항)</TermsTitle>
                  <TermsList>
                    <TermsListItem>
                      1. '회사'는 천재지변, 기술적 장애, 제3자의 불법행위 등
                      불가항력적인 사유로 인해 서비스를 제공할 수 없는 경우
                      책임을 지지 않습니다.
                    </TermsListItem>
                    <TermsListItem>
                      2. '회사'는 이용자의 귀책사유로 인한 서비스 이용 불가 또는
                      손해에 대해 책임을 지지 않습니다.
                    </TermsListItem>
                    <TermsListItem>
                      3. '회사'는 배송 중 발생하는 모든 지연, 세관 문제가
                      배송업체의 고의 또는 중과실로 발생한 것이 아닌 한, 책임을
                      지지 않으며, 이는 추가 비용이 발생할 시에는 이용자가
                      부담해야 합니다.
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제 10 조 (분쟁 해결 및 준거법)</TermsTitle>
                  <TermsList>
                    <TermsListItem>
                      1. 본 약관과 관련하여 분쟁이 발생하는 경우, 이용자는
                      '회사' 고객센터를 통해 문의할 수 있으며, '회사'는 신속한
                      해결을 위해 노력합니다.
                    </TermsListItem>
                    <TermsListItem>
                      2. 본 약관과 관련된 분쟁은 대한민국 법률을 준거법으로
                      하며, 관할 법원은 민사소송법에 따라 결정됩니다.
                    </TermsListItem>
                  </TermsList>
                </TermsSection>
              </TermsContent>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* 개인정보처리방침 모달 */}
      {showPrivacyModal && (
        <ModalOverlay onClick={closeModals}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>개인정보처리방침</ModalTitle>
              <CloseButton onClick={closeModals}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <TermsContent>
                <TermsSection>
                  <TermsTitle>AInoon 개인정보 처리방침</TermsTitle>
                  <TermsSubtitle>서문</TermsSubtitle>
                  <TermsText>
                    시어스랩(이하 "회사", "우리")은 AInoon 및 관련 서비스(이하
                    "서비스")를 이용하는 이용자(이하 "귀하", "이용자")의
                    개인정보 보호를 최우선으로 생각합니다. 본 개인정보
                    처리방침은 회사가 귀하의 개인정보를 어떻게 수집, 사용, 저장,
                    공유, 보호하는지 설명하며, 「일반 데이터 보호 규정」(GDPR),
                    「캘리포니아 소비자 개인정보 보호법」(CCPA) 등 적용 가능한
                    데이터 보호 법규를 준수합니다. 서비스는 14세 이상만 이용
                    가능하며, 가입 시 이에 대한 동의를 확인합니다.
                  </TermsText>
                  <TermsText>
                    시행일: [2025년 3월 1일]
                    <br />
                    최종 수정일: [2025년 3월 3일]
                  </TermsText>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제1조: 목적</TermsTitle>
                  <TermsText>
                    본 개인정보 처리방침은 서비스 제공과 관련하여 귀하의
                    개인정보를 처리하는 방법을 안내합니다. 수집하는 정보의 종류,
                    이용 목적, 보호 조치를 상세히 설명하며, 글로벌 개인정보
                    보호법을 준수하고 안전한 이용 환경을 보장합니다.
                  </TermsText>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제2조: 수집하는 개인정보</TermsTitle>
                  <TermsText>
                    서비스 제공 및 개선을 위해 아래와 같은 개인정보를
                    수집합니다:
                  </TermsText>
                  <TermsList>
                    <TermsListItem>
                      1. 계정 및 등록 정보
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 필수: 계정 생성 및 로그인을 위한 SNS 계정 정보(예:
                          이메일 주소)
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 14세 이상임을 확인하기 위한 동의 기록
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      2. 서비스 이용 데이터
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 접속 기록, 사용 내역, 쿠키, IP 주소
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. AI 대화 기록 및 관련 데이터
                        </TermsSubListItem>
                        <TermsSubListItem>
                          c. 기기 정보(예: 모델명, OS 버전, 앱 버전)
                        </TermsSubListItem>
                        <TermsSubListItem>
                          d. 블루투스 및 네트워크 연결 정보
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      3. 결제 및 구독 정보
                      <TermsSubList>
                        <TermsSubListItem>a. 구독 구매 내역</TermsSubListItem>
                        <TermsSubListItem>
                          c. 결제 수단 정보(Apple/Google 인앱 결제)
                        </TermsSubListItem>
                        <TermsSubListItem>d. 구독 상태</TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      4. 고객 지원 정보
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 문의 내용 및 응답 기록
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 고객 지원 과정에서 제공된 추가 정보
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      5. 기기 권한
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 블루투스 권한(기기 연결용)
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제3조: 개인정보 수집 방법</TermsTitle>
                  <TermsText>
                    다음과 같은 방법으로 개인정보를 수집합니다:
                  </TermsText>
                  <TermsList>
                    <TermsListItem>
                      1. 귀하가 직접 제공하는 정보
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 계정 등록 및 14세 이상 동의 시 입력한 정보
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 고객 지원 문의 시 제공한 정보
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      2. 자동 수집 정보
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 서비스 이용 중 생성되는 데이터(예: 로그, 기기
                          데이터)
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 쿠키 및 유사한 추적 기술로 수집된 정보
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      3. 제3자로부터 받은 정보
                      <TermsSubList>
                        <TermsSubListItem>
                          a. SNS 계정 연동 시 전달받은 데이터
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 결제 처리 시 결제 업체로부터 받은 정보
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>
                    제4조: 개인정보 이용 목적 및 법적 근거
                  </TermsTitle>
                  <TermsText>
                    수집된 개인정보는 다음 목적으로 사용되며, 이는 계약 이행,
                    정당한 이익, 법적 의무 준수 등의 법적 근거에 기반합니다:
                  </TermsText>
                  <TermsList>
                    <TermsListItem>
                      1. 서비스 제공 및 운영 (계약 이행)
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 이용자 식별 및 14세 이상 등록 의사 확인
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 회원제 및 구독 서비스 제공
                        </TermsSubListItem>
                        <TermsSubListItem>
                          c. AI 기능 제공 및 개선
                        </TermsSubListItem>
                        <TermsSubListItem>
                          d. 기기 연결 및 데이터 동기화
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      2. 서비스 개선 및 개인화 (정당한 이익)
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 사용 통계 분석으로 성능 향상
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. AI 모델 학습 및 고도화
                        </TermsSubListItem>
                        <TermsSubListItem>
                          c. 맞춤형 콘텐츠 제공
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      3. 고객 지원 및 소통 (계약 이행 및 정당한 이익)
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 문의 응대 및 문제 해결
                        </TermsSubListItem>
                        <TermsSubListItem>b. 공지사항 전달</TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      4. 보안 및 법적 준수 (법적 의무 및 정당한 이익)
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 부정 사용 및 사기 방지
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 안전한 서비스 환경 유지
                        </TermsSubListItem>
                        <TermsSubListItem>c. 관련 법규 준수</TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제5조: 개인정보 보관 및 파기</TermsTitle>
                  <TermsList>
                    <TermsListItem>
                      1. 보관 기간
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 계정 삭제 시: 즉시 파기(단, 법적 의무로 인해 아래
                          정보는 명시된 기간 보관)
                        </TermsSubListItem>
                        <TermsSubListItem>
                          - 계약 또는 청약철회 기록: 5년
                        </TermsSubListItem>
                        <TermsSubListItem>
                          - 결제 및 거래 기록: 5년
                        </TermsSubListItem>
                        <TermsSubListItem>
                          - 불만 또는 분쟁 처리 기록: 3년
                        </TermsSubListItem>
                        <TermsSubListItem>
                          - 로그인 기록: 3개월
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      2. 파기 절차
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 파기 대상 정보는 별도 데이터베이스로 이동
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 법정 보유 기간 경과 후 지체 없이 파기
                        </TermsSubListItem>
                        <TermsSubListItem>
                          c. 분리 보관된 데이터는 접근이 제한된 시스템에서
                          안전하게 관리
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      3. 파기 방법
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 전자 파일: 복구 불가능한 방식으로 영구 삭제
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 물리적 기록: 파쇄 또는 소각
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제6조: 제3자와의 개인정보 공유</TermsTitle>
                  <TermsText>
                    원칙적으로 개인정보를 외부에 공유하지 않으며, 다음 경우에만
                    예외적으로 공유합니다:
                  </TermsText>
                  <TermsList>
                    <TermsListItem>
                      1. 귀하의 동의가 있는 경우
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 귀하가 명시적으로 동의한 경우(예: 마케팅 목적)
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      2. 법적 요구
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 법령에 따라 또는 공공기관의 적법한 요청이 있는 경우
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      3. 비식별 데이터
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 통계, 연구, 마케팅 목적으로 특정 개인을 식별할 수
                          없는 형태로 제공 시
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제7조: 개인정보 처리 위탁</TermsTitle>
                  <TermsText>
                    서비스 제공을 위해 일부 업무를 외부 업체에 위탁하며,
                    위탁받은 업체가 관련 법규를 준수하도록 관리·감독합니다:
                  </TermsText>
                  <TermsList>
                    <TermsListItem>
                      1. 결제 처리
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 위탁 업체: Apple Inc., Google LLC
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 위탁 업무: 인앱 결제 처리
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      2. 클라우드 인프라
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 위탁 업체: Amazon Web Services Inc
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 위탁 업무: 서비스 인프라 제공 및 운영
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      3. AI 서비스
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 위탁 업체: OpenAI
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 위탁 업무: AI 대화 기능 제공
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제8조: 이용자의 권리 및 행사 방법</TermsTitle>
                  <TermsText>
                    귀하는 다음과 같은 개인정보 관련 권리를 행사할 수 있습니다:
                  </TermsText>
                  <TermsList>
                    <TermsListItem>1. 개인정보 열람 요청</TermsListItem>
                    <TermsListItem>2. 부정확한 정보의 정정 요청</TermsListItem>
                    <TermsListItem>3. 삭제 요청("잊힐 권리")</TermsListItem>
                    <TermsListItem>4. 처리 중지 요청</TermsListItem>
                    <TermsListItem>5. 동의 철회(해당되는 경우)</TermsListItem>
                  </TermsList>
                  <TermsText>행사 방법:</TermsText>
                  <TermsList>
                    <TermsListItem>앱 내 설정 메뉴</TermsListItem>
                    <TermsListItem>
                      고객 지원팀 문의: ainoon@seerslab.com
                    </TermsListItem>
                    <TermsListItem>
                      개인정보 보호책임자 연락(제10조 참조)
                    </TermsListItem>
                  </TermsList>
                  <TermsText>
                    요청에 대해 법규가 정한 기간 내에 조치를 통지합니다.
                  </TermsText>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제9조: 보안 조치</TermsTitle>
                  <TermsText>
                    개인정보의 안전성을 확보하기 위해 다음 조치를 시행합니다:
                  </TermsText>
                  <TermsList>
                    <TermsListItem>
                      1. 관리적 조치
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 개인정보 보호책임자 지정
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 내부 개인정보 관리 계획 수립 및 [연 1회] 직원 교육
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      2. 기술적 조치
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 처리 시스템 접근 제한 및 권한 관리
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 데이터 암호화 및 보안 전송
                        </TermsSubListItem>
                        <TermsSubListItem>
                          c. 최신 보안 소프트웨어 운영
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      3. 물리적 조치
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 서버실 및 자료 보관실 접근 통제
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 비인가자 출입 방지
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제10조: 개인정보 보호책임자</TermsTitle>
                  <TermsText>
                    개인정보 처리와 관련한 문의, 불만, 피해 구제를 위해 아래
                    담당자를 지정했습니다:
                  </TermsText>
                  <TermsList>
                    <TermsListItem>이름: 정진욱</TermsListItem>
                    <TermsListItem>소속/직위: 대표이사</TermsListItem>
                    <TermsListItem>이메일: ainoon@seerslab.com</TermsListItem>
                    <TermsListItem>연락처: 070-7702-6800</TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제11조: 쿠키 및 광고 추적</TermsTitle>
                  <TermsText>
                    쿠키 및 유사 기술(예: 광고 식별자)을 활용해 서비스를
                    개선합니다:
                  </TermsText>
                  <TermsList>
                    <TermsListItem>
                      1. 사용 목적
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 방문 빈도 및 사용 패턴 분석
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 맞춤형 광고 제공(동의 시)
                        </TermsSubListItem>
                        <TermsSubListItem>
                          c. 서비스 기능 최적화
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                    <TermsListItem>
                      2. 설치 및 거부
                      <TermsSubList>
                        <TermsSubListItem>
                          a. 쿠키 및 광고 추적은 브라우저 또는 기기 설정에서
                          거부 가능(예: iOS의 "광고 추적 제한", Android의 "광고
                          개인화 거부")
                        </TermsSubListItem>
                        <TermsSubListItem>
                          b. 거부 시 일부 기능(예: 개인화된 광고)이 제한될 수
                          있음
                        </TermsSubListItem>
                      </TermsSubList>
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>제12조: 개인정보 처리방침 변경</TermsTitle>
                  <TermsList>
                    <TermsListItem>
                      1. 법령, 정책, 기술 변화에 따라 본 방침은 수정될 수
                      있습니다.
                    </TermsListItem>
                    <TermsListItem>
                      2. 변경 시, 시행 7일 전 홈페이지 및 앱 내 공지로
                      안내합니다.
                    </TermsListItem>
                    <TermsListItem>
                      3. 이 개인정보 처리방침은 2025년 3월 20일부터 적용됩니다.
                      - 변경일자: 2025년 3월 20일
                    </TermsListItem>
                  </TermsList>
                </TermsSection>

                <TermsSection>
                  <TermsTitle>부칙</TermsTitle>
                  <TermsList>
                    <TermsListItem>
                      본 개인정보 처리방침은 [2025년 3월 1일]부터 시행됩니다.
                    </TermsListItem>
                    <TermsListItem>
                      본 약관은 이전에 가입한 회원에게도 적용됩니다.
                    </TermsListItem>
                  </TermsList>
                </TermsSection>
              </TermsContent>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

// 모달 스타일 컴포넌트
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  padding: 20px;
  overflow-y: auto;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    max-width: 95%;
    max-height: 85vh;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  z-index: 10;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #333;
`;

const TermsSubtitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #444;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #000;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;

// 이용약관 컨텐츠 스타일
const TermsContent = styled.div`
  color: #333;
  font-size: 14px;
  line-height: 1.6;
`;

const TermsSection = styled.div`
  margin-bottom: 24px;
`;

const TermsTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #222;
`;

const TermsText = styled.p`
  margin-bottom: 12px;
  line-height: 1.7;
`;

const TermsList = styled.ul`
  padding-left: 20px;
  margin-bottom: 16px;
`;

const TermsListItem = styled.li`
  margin-bottom: 8px;
`;

const TermsSubList = styled.ul`
  padding-left: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const TermsSubListItem = styled.li`
  margin-bottom: 6px;
  color: #444;
`;

// Footer 스타일 컴포넌트
const FooterWrapper = styled.footer`
  width: 100%;
  max-width: 1440px;
  color: white;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  opacity: 0.8;

  @media (max-width: 1024px) {
    padding: 3rem 1.5rem;
  }
`;

const FooterSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: #eee;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InfoItem = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #aaa;
  margin: 0;
`;

const BizInfoLink = styled.a`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterBottom = styled.div`
  //margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PolicyLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const PolicyLink = styled.a`
  color: ${(props) => (props.emphasis ? "#eee" : "#aaa")};
  font-size: 14px;
  text-decoration: none;
  font-weight: ${(props) => (props.emphasis ? "700" : "400")};

  &:hover {
    text-decoration: underline;
  }
`;

const Copyright = styled.p`
  font-size: 14px;
  color: #777;
  margin: 0;
`;
