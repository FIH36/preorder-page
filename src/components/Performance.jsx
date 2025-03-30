/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export default function Performance() {
  return (
    <Container>
      <TextGroup
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Headline>두 손 가볍게 소리에 집중하고, 일상은 스마트하게</Headline>
        <SubText>
          두 손이 자유로운 순간, 더 많은 퍼포먼스가 가능해집니다!
        </SubText>
      </TextGroup>

      <CardWrapper>
        <CardItem
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Image src="Performance_01.gif" alt="요리하며 통화" />
          <Caption>핸즈프리로 통화를 하면서도 요리에 집중</Caption>
        </CardItem>

        <CardItem
          style={{ marginTop: "100px" }}
          className="offset"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Image src="Performance_02.gif" alt="운동하며 음악 듣기" />
          <Caption>블루투스로 음악을 들으며 두 손 자유롭게 운동</Caption>
        </CardItem>
      </CardWrapper>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1440px;
  margin: 9rem auto;
  padding: 0 2rem;
  background: #0c0c0c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6.25rem;

  @media (max-width: 768px) {
    gap: 4rem;
  }
`;

const TextGroup = styled(motion.header)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
`;

const Headline = styled.h2`
  color: white;
  font-size: 3.25rem;
  font-weight: 700;
  line-height: 130%;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubText = styled.p`
  color: #909294;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 130%;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const CardItem = styled(motion.figure)`
  width: calc((100% - 2rem) / 2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0 !important;
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
  aspect-ratio: 16 / 9;
`;

const Caption = styled.div`
  text-align: center;
  color: white;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 130%;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    line-height: 130%;
  }
`;
