/** @jsxImportSource @emotion/react */
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";
import Home from "./pages/Home.jsx";
import SEO from "./components/SEO.jsx";
import "./styles/global.css";
import {I18nProvider} from "./contexts/I18nContext.jsx";

function App() {
  return (
    <HelmetProvider>
      <I18nProvider>
      <BrowserRouter>
        <SEO />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      </I18nProvider>
    </HelmetProvider>
  );
}

export default App;
