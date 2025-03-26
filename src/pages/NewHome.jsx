/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import New from "../components/New.jsx";

export default function NewHome() {
  return (
    <Container>
      <New />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;
