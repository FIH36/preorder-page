/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export default function SpecificationsSection() {
  return (
    <SectionWrapper>
      <Title>SPECIFICATIONS</Title>
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
    </SectionWrapper>
  );
}

/* ✅ 스펙 데이터 */
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

/* ✅ Emotion 스타일 */
const SectionWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const SpecTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background: #ddd;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: left;
  border: 1px solid #ccc;
`;

const TableRow = styled.tr`
  &:nth-of-type(odd) {
    background: #f9f9f9;
  }
`;

const TableCategory = styled.td`
  font-weight: bold;
  padding: 1rem;
  border: 1px solid #ccc;
`;

const TableDetail = styled.td`
  padding: 1rem;
  border: 1px solid #ccc;
`;
