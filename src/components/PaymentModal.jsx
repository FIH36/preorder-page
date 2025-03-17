/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";

const modalBackground = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const modalContainer = css`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
  text-align: center;
`;

const inputStyle = css`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const buttonStyle = css`
  width: 100%;
  padding: 10px;
  background: #ff6600;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #ff4500;
  }
`;

const closeButton = css`
  background: none;
  border: none;
  font-size: 18px;
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
`;

const PaymentModal = ({ isOpen, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    postcode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onConfirm(formData); // 부모 컴포넌트(MainBanner)로 데이터 전달
  };

  if (!isOpen) return null;

  return (
    <div css={modalBackground}>
      <div css={modalContainer}>
        <button css={closeButton} onClick={onClose}>
          ✖
        </button>
        <h2>회원 정보 입력</h2>
        <input
          css={inputStyle}
          type="email"
          name="email"
          placeholder="이메일"
          onChange={handleChange}
        />
        <input
          css={inputStyle}
          type="text"
          name="name"
          placeholder="이름"
          onChange={handleChange}
        />
        <input
          css={inputStyle}
          type="tel"
          name="phone"
          placeholder="전화번호"
          onChange={handleChange}
        />
        <input
          css={inputStyle}
          type="text"
          name="address"
          placeholder="주소"
          onChange={handleChange}
        />
        <input
          css={inputStyle}
          type="text"
          name="postcode"
          placeholder="우편번호"
          onChange={handleChange}
        />
        <button css={buttonStyle} onClick={handleSubmit}>
          결제하기
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
