import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Github, Linkedin, Mail, Rocket, Code, Sparkles, ChevronDown, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';
import StaggerAnimation from './StaggerAnimation';
import { XIcon } from './XIcon';
import LanguageSelector from './LanguageSelector';

const NavBar = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [rippleEffect, setRippleEffect] = useState(false);

  const navItems = [
    { href: '#about', label: t('nav.about'), icon: Code },
    { href: '#projects', label: t('nav.projects'), icon: Rocket },
    { href: '#experience', label: t('nav.experience'), icon: Sparkles },
    { href: '#appstore', label: t('nav.appstore'), icon: Rocket },
    { href: '#skills', label: t('nav.skills'), icon: Code },
    { href: '#contact', label: t('nav.contact'), icon: Mail }
  ];

  const sections = ['home', 'about', 'projects', 'experience', 'appstore', 'skills', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      setActiveSection(currentSection || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <>
      {/* Desktop Header - Redesigned */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isMobileMenuOpen
            ? 'bg-transparent'
            : isScrolled
              ? 'bg-deepSpace/95 backdrop-blur-xl border-b border-starWhite/10 shadow-2xl shadow-nebulaPink/10' 
              : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Elegant MS Logo Only */}
            <ScrollAnimation direction="left" delay={0.1} duration={0.4}>
              <a href="#home" className="group relative flex items-center">
                {/* Enhanced Logo Container */}
                <div className="relative">
                  <motion.div 
                    className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-nebulaPink via-cosmicBlue to-violet-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 border border-white/10"
                    whileHover={{ 
                      scale: 1.08,
                      rotate: 3,
                      boxShadow: "0 25px 50px rgba(236, 72, 153, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white font-bold text-xl lg:text-2xl tracking-tight drop-shadow-lg">MS</span>
                    
                    {/* Enhanced Floating Particles */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white/70 rounded-full shadow-lg"
                      animate={{ 
                        scale: [1, 1.6, 1],
                        opacity: [0.7, 1, 0.7],
                        y: [0, -2, 0]
                      }}
                      transition={{ 
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-1 -left-1 w-2 h-2 bg-cosmicBlue/90 rounded-full shadow-lg"
                      animate={{ 
                        scale: [1, 1.4, 1],
                        opacity: [0.8, 1, 0.8],
                        y: [0, 2, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.7
                      }}
                    />
                    <motion.div
                      className="absolute top-1 -left-1 w-1.5 h-1.5 bg-violet-500/80 rounded-full"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6],
                        x: [0, -1, 0]
                      }}
                      transition={{ 
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.2
                      }}
                    />
                  </motion.div>
                  
                  {/* Enhanced Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-nebulaPink/40 via-cosmicBlue/40 to-violet-500/40 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Pulsing Ring Effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-nebulaPink/30 rounded-2xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                
                {/* Elegant Hover Effect Line */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-nebulaPink via-cosmicBlue to-violet-500 group-hover:w-16 transition-all duration-500"></div>
              </a>
            </ScrollAnimation>
            
            {/* Compact Desktop Navigation */}
            <StaggerAnimation staggerDelay={0.05} direction="down">
              <nav className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href.slice(1);
                  
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className={`group relative px-3 py-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-nebulaPink/20 to-cosmicBlue/20 text-nebulaPink border border-nebulaPink/30 shadow-lg'
                          : 'text-starWhite/70 hover:text-white hover:bg-starWhite/5'
                      }`}
                      whileHover={{ 
                        scale: 1.02,
                        y: -1
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                      
                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div 
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-nebulaPink rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      
                      {/* Hover Effect */}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-nebulaPink/10 to-cosmicBlue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.a>
                  );
                })}
              </nav>
            </StaggerAnimation>
            
            {/* Enhanced Right Section */}
            <div className="flex items-center space-x-3">
              
              {/* Language Selector */}
              <div className="hidden lg:block">
                <LanguageSelector />
            </div>
              
              {/* Compact Social Links */}
              <div className="hidden lg:flex items-center space-x-2">
                <motion.a
                  href="https://github.com/kanish-v15"
                  className="p-2 bg-deepSpace/50 rounded-lg border border-starWhite/10 hover:border-nebulaPink/50 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    y: -1
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4 text-starWhite/70 group-hover:text-nebulaPink transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-r from-nebulaPink/10 to-cosmicBlue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </motion.a>
                
                <motion.a
                  href="https://www.linkedin.com/in/kanishv/"
                  className="p-2 bg-deepSpace/50 rounded-lg border border-starWhite/10 hover:border-cosmicBlue/50 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    y: -1
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-4 h-4 text-starWhite/70 group-hover:text-cosmicBlue transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cosmicBlue/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </motion.a>
                
                <motion.a
                  href="https://x.com/kanish2233"
                  className="p-2 bg-deepSpace/50 rounded-lg border border-starWhite/10 hover:border-violet-500/50 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    y: -1
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <XIcon className="w-4 h-4 text-starWhite/70 group-hover:text-violet-500 transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </motion.a>
              </div>
              
              {/* Enhanced CTA Button */}
              <ScrollAnimation direction="right" delay={0.2} duration={0.4}>
                <motion.a
              href="#contact"
                  className="hidden lg:block relative px-6 py-2.5 bg-gradient-to-r from-nebulaPink via-cosmicBlue to-violet-500 text-white rounded-full hover:opacity-90 transition-all duration-300 font-medium overflow-hidden group"
                  whileHover={{ 
                    scale: 1.05,
                    y: -1,
                    boxShadow: "0 10px 30px rgba(236, 72, 153, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Hire Me</span>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-nebulaPink/30 via-cosmicBlue/30 to-violet-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.a>
              </ScrollAnimation>

              {/* Enhanced Mobile Menu Button */}
              <motion.button
                className="lg:hidden relative p-2 bg-deepSpace/50 rounded-lg border border-starWhite/10 hover:border-nebulaPink/50 transition-all duration-300 backdrop-blur-sm overflow-hidden group"
                onClick={() => {
                  setRippleEffect(true);
                  setTimeout(() => setRippleEffect(false), 600);
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(236, 72, 153, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {/* Animated Background Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-nebulaPink/20 via-cosmicBlue/20 to-violet-500/20 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: isMobileMenuOpen ? 1 : 0,
                    scale: isMobileMenuOpen ? 1 : 0.8
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Menu Icon */}
                <div className="relative z-10">
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <X className="w-5 h-5 text-starWhite drop-shadow-lg" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Menu className="w-5 h-5 text-starWhite drop-shadow-lg" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Enhanced Floating Particles */}
                <motion.div
                  className="absolute -top-1 -right-1 w-1 h-1 bg-nebulaPink/60 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [0, -10, -20],
                    x: [0, -5, -10]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
                <motion.div
                  className="absolute -bottom-1 -left-1 w-1 h-1 bg-cosmicBlue/60 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [0, 10, 20],
                    x: [0, 5, 10]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2.5
                  }}
                />
                
                {/* Click Burst Effect */}
                <AnimatePresence>
                  {rippleEffect && (
                    <>
                      <motion.div
                        className="absolute top-1/2 left-1/2 w-2 h-2 bg-nebulaPink/80 rounded-full"
                        initial={{ scale: 0, opacity: 1, x: "-50%", y: "-50%" }}
                        animate={{ 
                          scale: 4,
                          opacity: 0,
                          x: "-50%",
                          y: "-50%"
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                      <motion.div
                        className="absolute top-1/2 left-1/2 w-1 h-1 bg-cosmicBlue/80 rounded-full"
                        initial={{ scale: 0, opacity: 1, x: "-50%", y: "-50%" }}
                        animate={{ 
                          scale: 6,
                          opacity: 0,
                          x: "-50%",
                          y: "-50%"
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                      />
                    </>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay - Keep existing */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Enhanced Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-deepSpace/95 via-deepSpace/98 to-deepSpace/95 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Animated Background Elements */}
            <motion.div className="absolute inset-0 overflow-hidden">
              <motion.div 
                className="absolute top-20 right-20 w-32 h-32 bg-nebulaPink/20 rounded-full blur-3xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              <motion.div 
                className="absolute bottom-40 left-20 w-24 h-24 bg-cosmicBlue/20 rounded-full blur-3xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <motion.div 
                className="absolute top-40 left-40 w-20 h-20 bg-violet-500/20 rounded-full blur-3xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              <motion.div 
                className="absolute bottom-20 right-40 w-28 h-28 bg-emerald-500/20 rounded-full blur-3xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </motion.div>
            
            {/* Animated Menu Content */}
            <motion.div 
              className="relative z-50 pt-20 px-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="max-w-sm mx-auto">
                {/* Animated Mobile Logo */}
                <motion.div 
                  className="text-center mb-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <motion.div 
                    className="text-2xl font-bold bg-gradient-to-r from-nebulaPink via-cosmicBlue to-violet-500 text-transparent bg-clip-text mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    Miguel Santos
                  </motion.div>
                  <motion.div 
                    className="text-starWhite/60"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    Full-Stack Developer
                  </motion.div>
                </motion.div>
                
                {/* Animated Mobile Navigation */}
                <motion.div 
                  className="space-y-2 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.href.slice(1);
                    
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-nebulaPink/20 text-nebulaPink border border-nebulaPink/30'
                            : 'text-starWhite/70 hover:text-nebulaPink hover:bg-nebulaPink/10'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: 0.4 + (index * 0.1),
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          initial={{ rotate: -180, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 180, opacity: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.5 + (index * 0.1),
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.div>
                        <span className="font-medium">{item.label}</span>
                      </motion.a>
                    );
                  })}
                </motion.div>
                
                {/* Language Selector for Mobile */}
                <motion.div 
                  className="flex justify-center mb-6"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <LanguageSelector />
                </motion.div>
                
                {/* Animated Mobile Social Links & CTA */}
                <motion.div 
                  className="mb-6"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  {/* Animated Social Links Row */}
                  <motion.div 
                    className="flex justify-center space-x-4 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                  >
                    {[
                      { href: "https://github.com/kanish-v15", icon: Github, color: "nebulapink" },
                      { href: "https://www.linkedin.com/in/kanishv/", icon: Linkedin, color: "cosmicblue" },
                      { href: "https://x.com/kanish2233", icon: XIcon, color: "violet-500" },
                      { href: "mailto:migasmps2005@gmail.com", icon: Mail, color: "emerald-500" }
                    ].map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={social.href}
                          href={social.href}
                          className={`p-3 bg-deepSpace/50 rounded-xl border border-starWhite/10 hover:border-${social.color}/50 transition-all duration-300 backdrop-blur-sm`}
                          initial={{ y: 30, opacity: 0, scale: 0.8 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          exit={{ y: 30, opacity: 0, scale: 0.8 }}
                          transition={{ 
                            duration: 0.4, 
                            delay: 0.8 + (index * 0.1),
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                          whileHover={{ 
                            scale: 1.1,
                            y: -2,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className={`w-5 h-5 text-starWhite/70 hover:text-${social.color} transition-colors`} />
                        </motion.a>
                      );
                    })}
                  </motion.div>
                  
                  {/* Download CV Button */}
                  <motion.div 
                    className="text-center mb-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <motion.button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = '/Miguel_Santos_CV.pdf';
                        link.download = 'Miguel_Santos_CV.pdf';
                        link.click();
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity duration-300 font-medium inline-flex items-center gap-2"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-4 h-4" />
                      Download CV
                    </motion.button>
                  </motion.div>

                  {/* Animated CTA Button */}
                  <motion.div 
                    className="text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                  >
                    <motion.a
            href="#contact"
                      className="bg-gradient-to-r from-nebulaPink to-cosmicBlue text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity duration-300 font-medium inline-block"
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(236, 72, 153, 0.3)",
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
          >
            Hire Me
                    </motion.a>
                  </motion.div>
                </motion.div>
        </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;