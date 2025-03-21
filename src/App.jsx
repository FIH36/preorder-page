/** @jsxImportSource @emotion/react */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Purchase from "./pages/Purchase";
import OrderComplete from "./pages/OrderComplete"; // 추가된 import
import "./styles/global.css"; // 글로벌 CSS 임포트 추가

function App() {
  return (
    <BrowserRouter>
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
