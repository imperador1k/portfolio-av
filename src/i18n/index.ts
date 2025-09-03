import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import en from './locales/en.json';
import pt from './locales/pt.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import it from './locales/it.json';
import de from './locales/de.json';

const resources = {
  en: { translation: en },
  pt: { translation: pt },
  fr: { translation: fr },
  es: { translation: es },
  it: { translation: it },
  de: { translation: de },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      convertDetectedLanguage: (lng: string) => {
        // Convert en-US, en-GB, etc. to just 'en'
        if (lng.startsWith('en')) return 'en';
        if (lng.startsWith('pt')) return 'pt';
        if (lng.startsWith('fr')) return 'fr';
        if (lng.startsWith('es')) return 'es';
        if (lng.startsWith('it')) return 'it';
        if (lng.startsWith('de')) return 'de';
        return lng;
      },
    },
  });

export default i18n;
