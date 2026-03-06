import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { translations } from '../locales/translations';

export function useTranslation() {
  const { language } = useContext(LanguageContext);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        // Si la clé n'existe pas, retourner la même clé + warning
        console.warn(`🔴 Clé de traduction manquante: "${key}" (lang: ${language})`);
        return key;
      }
    }

    // Si la valeur finale est undefined/null, aussi avertir
    if (value === undefined || value === null) {
      console.warn(`🔴 Clé de traduction vide: "${key}" (lang: ${language})`);
      return key;
    }

    return value;
  };

  return { t, language };
}
