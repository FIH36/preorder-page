import {useEffect, useState} from 'react';
import {supabase} from '../lib/supabase';
import {useI18nContext} from '../contexts/I18nContext.jsx';

export const useI18n = () => {
  const { lang } = useI18nContext();
  const [t, setT] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lang) return; // lang이 설정되지 않았으면 실행 안함

    const fetchTranslations = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('i18n_strings')
        .select('key, ko_text, en_text');

      if (error) {
        console.error('❌ i18n 불러오기 실패:', error.message);
        return;
      }

      const mapped = {};
      data.forEach((row) => {
        mapped[row.key] = lang === 'ko' ? row.ko_text : row.en_text;
      });

      setT(mapped);
      setLoading(false);
    };

    fetchTranslations();
  }, [lang]);

  return {
    t: new Proxy(t, {
      get(target, prop) {
        return target[prop] ?? prop; // t.chatui_placeholder → 번역 없으면 키 그대로
      },
    }),
    loading,
    lang,
  };
};
