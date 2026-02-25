import React, { createContext, useEffect, useMemo, useState, useContext, ReactNode } from 'react';
import { translations } from './translations';

type Language = keyof typeof translations;
type Translation = (typeof translations)[Language];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    if (stored && stored in translations) {
      return stored as Language;
    }
    return 'cz';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    const htmlLangMap: Record<Language, string> = {
      en: 'en',
      cz: 'cs',
      sk: 'sk',
      pl: 'pl',
      de: 'de',
      fr: 'fr',
    };
    document.documentElement.lang = htmlLangMap[language];
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
