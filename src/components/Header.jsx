/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const products = [
    {
      id: "하금테 스타일",
      name: "하금테 스타일",
      color: "Black",
      price: 240000,
      image: "/black_01.png",
      quantity: 1,
      type: "single",
      subtitle: "세련된 감각을 담아 스마트함을 더한 하금테 프레임",
    },
    {
      id: "스퀘어 스타일",
      name: "스퀘어 스타일",
      color: "Black",
      price: 260000,
      image: "/Black_Clear01.png",
      quantity: 1,
      type: "bundle",
      subtitle: "클래식한 무드를 담아 신뢰감을 주는 블랙 프레임",
    },
  ];

  const navigate = useNavigate();

  const handleBuyNowClick = () => {
    navigate("/purchase", { state: { product: products[1] } });
  };

  return (
    <header css={styles.header}>
      <div css={styles.logoWrapper}>
        <img src="/AInoon-logo.svg" alt="Logo" css={styles.logo} />
      </div>
      <div css={styles.buyNow} onClick={handleBuyNowClick}>
        구매하기
      </div>
    </header>
  );
}

const styles = {
  header: css`
    width: 100%;
    height: 72px;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    background: transparent;
    z-index: 5;
    top: 0;
  `,
  logoWrapper: css`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  `,
  logo: css`
    height: 1.25rem;
    filter: invert(1);
  `,
  buyNow: css`
    margin-left: auto;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    padding: 6px 18px;
    border: 2px solid orangered;
    border-radius: 100rem;
    transition: all 0.3s ease-in-out;
    background-color: orangered;
    color: white;

    &:hover {
      background: black;
      color: orangered;
    }
  `,
};
