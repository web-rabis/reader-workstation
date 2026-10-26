
import { useState, useEffect, useCallback } from 'react';
import { translations } from '../i18n/translations';

type Language = 'ru' | 'kk' | 'en';

const getInitialLanguage = (): Language => {
  return (localStorage.getItem('language') as Language) || 'ru';
};

export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(getInitialLanguage);

  const changeLanguage = useCallback((language: Language) => {
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
  }, []);

  const t = (key: keyof typeof translations['ru']) => {
    return translations[currentLanguage][key] || key;
  };

  return { t, currentLanguage, changeLanguage };
}
