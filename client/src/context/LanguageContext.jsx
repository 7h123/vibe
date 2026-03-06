import { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Récupérer la langue sauvegardée dans localStorage, par défaut 'fr'
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'fr';
    }
    return 'fr';
  });

  // Sauvegarder la langue dans localStorage et appliquer dir="rtl" ou dir="ltr"
  useEffect(() => {
    localStorage.setItem('language', language);

    // Appliquer la direction RTL/LTR sur l'élément html
    if (typeof document !== 'undefined') {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'ar' : 'fr');
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isArabic: language === 'ar',
    isFrench: language === 'fr'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
