import {createContext, useContext, useState} from 'react';

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const getDefaultLang = () => {
    const stored = localStorage.getItem('lang');
    if (stored) return stored;

    const browserLang = navigator.language; // 예: "en-US", "ko-KR"
    if (browserLang.startsWith('ko')) return 'ko';
    return 'en';
  };

  const [lang, setLang] = useState(getDefaultLang());

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <I18nContext.Provider value={{ lang, changeLang }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18nContext = () => useContext(I18nContext);
