/** @jsxImportSource @emotion/react */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Purchase from "./pages/Purchase";
import OrderComplete from "./pages/OrderComplete"; // 추가된 import
import "./styles/global.css"; // 글로벌 CSS 임포트 추가
import Home from "./pages/Home.jsx";
import SEO from "./components/SEO.jsx";

function App() {
  return (
    <BrowserRouter>
      <SEO />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/order-complete" element={<OrderComplete />} />{" "}
        {/* 추가된 라우트 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
