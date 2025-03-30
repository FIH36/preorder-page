/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export default function Specifications() {
  return (
    <SectionWrapper>
      <SectionContainer>
        <SpecTable>
          <thead>
            <tr>
              <TableHeader>Category</TableHeader>
              <TableHeader>Details</TableHeader>
            </tr>
          </thead>
          <tbody>
            {specs.map((spec, index) => (
              <TableRow key={index}>
                <TableCategory>{spec.category}</TableCategory>
                <TableDetail>{spec.detail}</TableDetail>
              </TableRow>
            ))}
          </tbody>
        </SpecTable>
      </SectionContainer>
    </SectionWrapper>
  );
}

const specs = [
  { category: "Weight", detail: "40g" },
  { category: "CPU", detail: "1×A75 2.0GHz + 3×A55 @ 1.8GHz" },
  { category: "GPU", detail: "IMG8300 @ 800MHz" },
  { category: "Video Encoding", detail: "1080P 30fps, H.264 / H.265" },
  { category: "Photograph", detail: "16M" },
  { category: "Video", detail: "1080P (30Hz)" },
  { category: "Bluetooth", detail: "BT5.0/BLE" },
  { category: "Wi-Fi", detail: "Wi-Fi 5 802.11 b/g/n/ac" },
  { category: "RGB Camera - Focus Mode", detail: "Fixed focus" },
  { category: "RGB Camera - Resolution", detail: "16M" },
  { category: "Speakers", detail: "2× Speak (0.15W)" },
  { category: "Microphone", detail: "3× DMIC" },
  { category: "Battery Capacity", detail: "210mAh" },
  { category: "Fast Charging", detail: "Max 2C" },
  { category: "Battery Weight", detail: "4g" },
  { category: "Low Power Standby - Voice Wake-up", detail: "Support" },
  { category: "Interface", detail: "Pogo pin (2pin)" },
  { category: "Battery Life - Bluetooth Music", detail: "≥ 4 hours" },
  { category: "Battery Life - Photo/Video", detail: "≥ 30 minutes" },
];

// ✅ 스타일 설정
const SectionWrapper = styled.div`
  background-color: black;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  padding: 0 2rem;
  text-align: center;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 40px;
`;

// ✅ 이미지 두 개 겹치기 위한 컨테이너
const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  align-self: center;
  text-align: center;
  max-width: 1200px; /* ✅ 테이블과 같은 크기로 조정 */
  margin-bottom: 4rem;
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

// ✅ 테이블 스타일
const SpecTable = styled.table`
  width: 100%;
  max-width: 800px; /* ✅ 중앙 정렬 및 크기 조정 */
  margin: 0 auto;
  border-collapse: collapse;
  color: white;
  overflow: hidden;
`;

const TableHeader = styled.th`
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TableRow = styled.tr`
  text-align: left;
`;

const TableCategory = styled.td`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const TableDetail = styled.td`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.8;
`;
