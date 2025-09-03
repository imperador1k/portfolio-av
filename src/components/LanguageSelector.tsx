import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const languages = [
    { code: 'en', name: t('languages.en'), flag: '🇬🇧' },
    { code: 'pt', name: t('languages.pt'), flag: '🇵🇹' },
    { code: 'fr', name: t('languages.fr'), flag: '🇫🇷' },
    { code: 'es', name: t('languages.es'), flag: '🇪🇸' },
    { code: 'it', name: t('languages.it'), flag: '🇮🇹' },
    { code: 'de', name: t('languages.de'), flag: '🇩🇪' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Language Selector Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center space-x-2 px-3 sm:px-4 py-2 bg-deepSpace/50 backdrop-blur-sm border border-starWhite/20 rounded-xl hover:border-nebulaPink/50 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-nebulaPink/5 to-cosmicBlue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
        
        {/* Content */}
        <div className="relative flex items-center space-x-1 sm:space-x-2">
          <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-starWhite/70 group-hover:text-nebulaPink transition-colors" />
          <span className="text-base sm:text-lg">{currentLanguage.flag}</span>
          <span className="text-xs sm:text-sm font-medium text-starWhite/90 group-hover:text-white transition-colors hidden sm:block">
            {currentLanguage.name}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-starWhite/70 group-hover:text-nebulaPink transition-colors" />
          </motion.div>
        </div>
      </motion.button>

      {/* Dropdown Menu - Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`absolute top-full mt-2 w-48 sm:w-52 lg:w-48 bg-deepSpace/95 backdrop-blur-xl border border-starWhite/20 rounded-xl shadow-2xl shadow-nebulaPink/10 overflow-hidden z-50 max-h-80 overflow-y-auto ${
              isMobile 
                ? 'left-1/2 transform -translate-x-1/2 max-w-[calc(100vw-2rem)]' 
                : 'right-0'
            }`}
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-nebulaPink/5 via-cosmicBlue/5 to-violet-500/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-nebulaPink/10 rounded-full blur-3xl"></div>
            
            {/* Language Options */}
            <div className="relative z-10">
              {languages.map((language, index) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 text-left transition-all duration-200 ${
                    i18n.language === language.code
                      ? 'bg-nebulaPink/20 text-nebulaPink border-r-2 border-nebulaPink'
                      : 'text-starWhite/70 hover:text-white hover:bg-starWhite/5'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-base sm:text-lg">{language.flag}</span>
                    <span className="text-xs sm:text-sm font-medium">{language.name}</span>
                  </div>
                  {i18n.language === language.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-nebulaPink" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;
