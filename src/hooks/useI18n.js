import { useEffect, useState } from "react";
import { useI18nContext } from "../contexts/I18nContext.jsx";
import { supabase } from "../lib/supabase";

export const useI18n = () => {
  const { lang } = useI18nContext();
  const [t, setT] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lang) return;

    const fetchTranslations = async () => {
      setLoading(true);

      const columns = [
        "key",
        "ko_text",
        "en_text",
        "zh_text",
        "de_text",
        "es_text",
        "ja_text",
      ];
      const { data, error } = await supabase
        .from("i18n_strings")
        .select(columns.join(", "));

      if (error) {
        console.error("❌ 다국어 텍스트 불러오기 실패:", error.message);
        setLoading(false);
        return;
      }

      const mapped = {};
      data.forEach((row) => {
        const key = row.key;
        mapped[key] = row[`${lang}_text`] ?? row.en_text ?? row.ko_text ?? key; // Fallback 순서
      });

      setT(mapped);
      setLoading(false);
    };

    fetchTranslations();
  }, [lang]);

  return {
    t: new Proxy(t, {
      get(target, prop) {
        return target[prop] ?? prop;
      },
    }),
    loading,
    lang,
  };
};
