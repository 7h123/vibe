import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleLanguage}
      className="w-9 h-9 rounded-full flex items-center justify-center border border-gold/30 text-gold hover:bg-gold/10 transition-colors font-body text-[13px] font-[600] tracking-wider uppercase"
      title={t('languageSwitcher.title')}
    >
      {language === 'fr' ? 'ع' : 'FR'}
    </button>
  );
}
