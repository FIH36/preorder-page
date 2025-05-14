import { createContext, useContext, useEffect, useState } from "react";

const I18nContext = createContext();

const countryToLangMap = {
  KR: "ko",
  US: "en",
  GB: "en",
  CA: "en",
  DK: "en",
  SE: "en",
  AU: "en",
  NL: "en",
  NO: "en",
  SG: "en",
  IN: "en",
  HK: "zh",
  ID: "zh",
  DE: "de",
  CH: "de",
  AT: "de",
  ES: "es",
  MX: "es",
  ZA: "es",
  JP: "ja",
};

export const I18nProvider = ({ children }) => {
  const getInitialLang = () => {
    const stored = localStorage.getItem("lang");
    if (stored) return stored;

    const browserLang = navigator.language;
    if (browserLang.startsWith("ko")) return "ko";
    if (browserLang.startsWith("zh")) return "zh";
    if (browserLang.startsWith("de")) return "de";
    if (browserLang.startsWith("es")) return "es";
    if (browserLang.startsWith("ja")) return "ja";
    return "en";
  };

  const [lang, setLang] = useState(getInitialLang());

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const country = data.country;
        const countryLang = countryToLangMap[country] || "en";
        const storedLang = localStorage.getItem("lang");

        if (!storedLang || storedLang !== countryLang) {
          setLang(countryLang);
          localStorage.setItem("lang", countryLang);
        }
      })
      .catch((err) => {
        console.error("🌐 국가 기반 언어 설정 실패:", err);
      });
  }, []);

  return (
    <I18nContext.Provider value={{ lang, changeLang }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18nContext = () => useContext(I18nContext);
