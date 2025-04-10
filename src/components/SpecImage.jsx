/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export default function SpecImage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1, delay: 0.5, ease: "easeOut" },
    viewport: { once: false },
  };

  return (
    <ImageWrapper>
      <BaseImage
        as={motion.img}
        src={"/Specifications_01.webp"}
        alt="Glasses Spec"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false }}
      />
      <OverlayImage
        src="/Specifications_02.webp"
        alt="Glasses Text"
        {...fadeInUp}
      />
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  align-self: center;
  text-align: center;
  max-width: 1200px;
  margin: 6rem auto 4rem auto;
`;

const BaseImage = styled.img`
  width: 100%;
  display: block;
  margin: 0 auto;
  align-self: center;
  text-align: center;
`;

const OverlayImage = styled(motion.img)`
  position: absolute;
  width: 100%;
  display: block;
`;
