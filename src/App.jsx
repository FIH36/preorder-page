/** @jsxImportSource @emotion/react */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
