/** @jsxImportSource @emotion/react */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Purchase from "./pages/Purchase";
import OrderComplete from "./pages/OrderComplete";
import OrderResult from "./pages/order-result.jsx";
import Home from "./pages/Home.jsx";
import SEO from "./components/SEO.jsx";
import "./styles/global.css";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SEO />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/order-result" element={<OrderResult />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
