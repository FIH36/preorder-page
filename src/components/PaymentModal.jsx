/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

const PaymentModal = ({ isOpen, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    address1: "",
    address2: "",
    postcode: "",
    country: "한국",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onConfirm(formData);
  };

  // ESC 키로 모달 닫기 기능 추가
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✖</CloseButton>

        <SummaryContainer>
          <p className="sectionTitle">Phantom Technology Limited에게 지불</p>
          <div className="summaryItem">
            <span>Journey Frame™ – Smart Eyewear</span>
            <strong>US$195.00</strong>
          </div>
          <div className="summaryItem">
            <span>배송 (Courier Service)</span>
            <strong>US$10.00</strong>
          </div>
          <div className="totalAmount">
            총 금액: <strong>US$205.00</strong>
          </div>
        </SummaryContainer>

        <div>
          <p className="sectionTitle">배송 정보</p>
          <InputGroup>
            <InputField
              type="email"
              name="email"
              placeholder="이메일"
              onChange={handleChange}
            />
            <InputField
              type="tel"
              name="phone"
              placeholder="Phone number"
              onChange={handleChange}
            />
            <InputField
              type="text"
              name="name"
              placeholder="성명"
              onChange={handleChange}
            />
            <SelectField
              name="country"
              onChange={handleChange}
              value={formData.country}
            >
              <option value="영국">영국</option>
              <option value="미국">미국</option>
              <option value="한국">한국</option>
              <option value="일본">일본</option>
            </SelectField>
            <InputField
              type="text"
              name="address1"
              placeholder="주소란 1"
              onChange={handleChange}
            />
            <InputField
              type="text"
              name="address2"
              placeholder="주소란 2"
              onChange={handleChange}
            />
            <InputField
              type="text"
              name="postcode"
              placeholder="우편번호"
              onChange={handleChange}
            />
          </InputGroup>
        </div>

        <PaymentButton onClick={handleSubmit}>결제</PaymentButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default PaymentModal;

const ModalBackground = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 500px;
  text-align: left;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

const SummaryContainer = styled.div`
  background: #f9f6f1;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;

  .sectionTitle {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .summaryItem {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .totalAmount {
    font-size: 20px;
    font-weight: bold;
    text-align: right;
    margin-top: 10px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const SelectField = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background: white;
`;

const PaymentButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #c76b2b;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  margin-top: 15px;

  &:hover {
    background: #a55a20;
  }
`;
