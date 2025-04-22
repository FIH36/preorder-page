/** @jsxImportSource @emotion/react */
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatOnlyPage from "./components/ChatOnlyPage.jsx";
import SEO from "./components/SEO.jsx";
import { I18nProvider } from "./contexts/I18nContext.jsx";
import Home from "./pages/Home.jsx";
import "./styles/global.css";

function App() {
  return (
    <HelmetProvider>
      <I18nProvider>
        <BrowserRouter>
          <SEO />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* iframe용 페이지 */}
            <Route path="/chat" element={<ChatOnlyPage />} />
          </Routes>
        </BrowserRouter>
      </I18nProvider>
    </HelmetProvider>
  );
}

export default App;
