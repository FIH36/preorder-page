/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function Header() {
  return (
    <header css={styles.header}>
      <div css={styles.logoWrapper}>
        <img src="/AInoon-logo.svg" alt="Logo" css={styles.logo} />
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
    height: 1rem;
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
