
import { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '../i18n/translations';

type Language = 'ru' | 'kk' | 'en';

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['ru']) => string;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'ru';
  });

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  const t = (key: keyof typeof translations['ru']) => {
    return translations[currentLanguage][key] || key;
  };

  const languages: Language[] = ['ru', 'kk', 'en'];


    return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
