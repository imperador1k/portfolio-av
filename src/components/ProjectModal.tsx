import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, Code, Users, Star, Award, Zap, Globe, Smartphone, Database, Palette } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  status: string;
  duration: string;
  teamSize: string;
  challenges: string[];
  features: string[];
  achievements: string[];
  screenshots: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
  };
  metrics: {
    performance: string;
    users: string;
    rating: number;
  };
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const { t } = useTranslation();
  
  // Block scroll and hide header when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store original styles
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
      
      // Hide header completely
      const header = document.querySelector('header, nav, [role="banner"]');
      if (header) {
        (header as HTMLElement).setAttribute('data-original-display', (header as HTMLElement).style.display || '');
        (header as HTMLElement).style.display = 'none';
      }
      
      // Hide any fixed elements that might interfere
      const fixedElements = document.querySelectorAll('[style*="position: fixed"], [style*="position:fixed"]');
      fixedElements.forEach((el) => {
        if (el !== document.body) {
          (el as HTMLElement).setAttribute('data-original-display', (el as HTMLElement).style.display || '');
          (el as HTMLElement).style.display = 'none';
        }
      });
      
      // Store cleanup function
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        
        // Show header again
        const header = document.querySelector('header, nav, [role="banner"]');
        if (header) {
          const originalDisplay = (header as HTMLElement).getAttribute('data-original-display');
          (header as HTMLElement).style.display = originalDisplay || '';
          (header as HTMLElement).removeAttribute('data-original-display');
        }
        
        // Show fixed elements again
        const fixedElements = document.querySelectorAll('[style*="position: fixed"], [style*="position:fixed"]');
        fixedElements.forEach((el) => {
          if (el !== document.body) {
            const originalDisplay = (el as HTMLElement).getAttribute('data-original-display');
            (el as HTMLElement).style.display = originalDisplay || '';
            (el as HTMLElement).removeAttribute('data-original-display');
          }
        });
      };
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Cleanup when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Shorter delay to ensure exit animation completes
      const timeoutId = setTimeout(() => {
        // Ensure body is not blocked
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = '0px';
        
        // Ensure header is visible
        const header = document.querySelector('header, nav, [role="banner"]');
        if (header) {
          (header as HTMLElement).style.display = '';
        }
        
        // Show all fixed elements again
        const fixedElements = document.querySelectorAll('[style*="position: fixed"], [style*="position:fixed"]');
        fixedElements.forEach((el) => {
          if (el !== document.body) {
            const originalDisplay = (el as HTMLElement).getAttribute('data-original-display');
            (el as HTMLElement).style.display = originalDisplay || '';
            (el as HTMLElement).removeAttribute('data-original-display');
          }
        });
        
        // Debug: Log modal state
        console.log('Modal cleanup completed, isOpen:', isOpen);
      }, 300); // Reduced timeout for faster cleanup

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  if (!project || !isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'web':
        return <Globe className="w-5 h-5" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'fullstack':
        return <Database className="w-5 h-5" />;
      case 'design':
        return <Palette className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'in progress':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'planned':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <AnimatePresence mode="sync">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-1 sm:p-2 md:p-4"
          data-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={(definition) => {
            if (definition === "exit") {
              // Cleanup when exit animation completes
              document.body.style.overflow = 'unset';
              document.body.style.paddingRight = '0px';
              
              const header = document.querySelector('header, nav, [role="banner"]');
              if (header) {
                (header as HTMLElement).style.display = '';
              }
              
              const fixedElements = document.querySelectorAll('[style*="position: fixed"], [style*="position:fixed"]');
              fixedElements.forEach((el) => {
                if (el !== document.body) {
                  const originalDisplay = (el as HTMLElement).getAttribute('data-original-display');
                  (el as HTMLElement).style.display = originalDisplay || '';
                  (el as HTMLElement).removeAttribute('data-original-display');
                }
              });
              
              console.log('Modal exit animation completed, cleanup done');
            }
          }}
        >
          {/* Complete Backdrop - Hides everything including header */}
          <motion.div
            className="absolute inset-0 bg-deepSpace backdrop-blur-3xl"
            initial={{ 
              opacity: 0, 
              backdropFilter: "blur(0px)",
              scale: 1.1
            }}
            animate={{ 
              opacity: 1, 
              backdropFilter: "blur(25px)",
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              backdropFilter: "blur(0px)",
              scale: 0.9,
              rotate: 2
            }}
            onClick={onClose}
            transition={{ 
              duration: 0.4
            }}
          >
            {/* Multi-layer Background Effects */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-nebulaPink/15 via-cosmicBlue/8 to-violet-500/12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0, rotate: -5 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1
              }}
            />
            
            {/* Secondary Blur Layer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-deepSpace/60 via-transparent to-deepSpace/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
            
            {/* Enhanced Floating Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${
                  i % 4 === 0 ? 'bg-nebulaPink/50 w-2 h-2' : 
                  i % 4 === 1 ? 'bg-cosmicBlue/50 w-1.5 h-1.5' : 
                  i % 4 === 2 ? 'bg-violet-500/50 w-1 h-1' : 'bg-emerald-500/50 w-0.5 h-0.5'
                }`}
                style={{
                  top: `${10 + (i * 8)}%`,
                  left: `${5 + (i * 8)}%`,
                }}
                initial={{ y: -30, opacity: 0, scale: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  rotate: 360
                }}
                exit={{ 
                  y: -50, 
                  opacity: 0, 
                  scale: 0,
                  rotate: 180,
                  x: Math.random() * 100 - 50
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + (i * 0.05),
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              />
            ))}
            
            {/* Animated Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-nebulaPink/20 to-cosmicBlue/20 rounded-full blur-3xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 1.2, 1],
                opacity: [0, 0.3, 0.5, 0.3],
                x: [0, 20, -10, 0],
                y: [0, -20, 10, 0]
              }}
              exit={{ 
                scale: 0, 
                opacity: 0,
                x: -100,
                y: -100,
                rotate: -180
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-violet-500/20 to-emerald-500/20 rounded-full blur-2xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 1.3, 1],
                opacity: [0, 0.4, 0.6, 0.4],
                x: [0, -15, 25, 0],
                y: [0, 15, -25, 0]
              }}
              exit={{ 
                scale: 0, 
                opacity: 0,
                x: 100,
                y: 100,
                rotate: 180
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>

          {/* Ultra Responsive Modal Content */}
          <motion.div
            className="relative w-full h-full sm:h-auto max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-[75vw] 2xl:max-w-[70vw] max-h-[98vh] sm:max-h-[95vh] md:max-h-[90vh] bg-deepSpace/98 backdrop-blur-2xl border border-starWhite/30 rounded-none sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-nebulaPink/20"
            data-modal="true"
            initial={{ 
              scale: 0.8, 
              opacity: 0, 
              y: 50,
              rotateX: -15,
              rotateY: 5
            }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              rotateX: 0,
              rotateY: 0
            }}
            exit={{ 
              scale: 0.9, 
              opacity: 0, 
              y: -30,
              rotateX: 15,
              rotateY: -5
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {/* Fixed Close Button - Always Visible and Properly Positioned */}
            <motion.button
              className="fixed top-2 right-2 sm:top-4 sm:right-4 z-[10000] p-2 sm:p-3 bg-red-500/95 hover:bg-red-500 rounded-full border-2 border-red-400 hover:border-red-300 transition-all duration-300 backdrop-blur-sm shadow-lg shadow-red-500/40 hover:shadow-red-500/60"
              onClick={onClose}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </motion.button>
            {/* Ultra Responsive Header */}
            <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 border-b border-starWhite/10">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-nebulaPink/5 via-cosmicBlue/5 to-violet-500/5"></div>
              <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-nebulaPink/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-18 md:h-18 lg:w-24 lg:h-24 bg-cosmicBlue/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
                {/* Title Row */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 md:p-3 bg-gradient-to-r from-nebulaPink to-cosmicBlue rounded-lg sm:rounded-xl flex-shrink-0">
                    {getCategoryIcon(project.category)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-nebulaPink via-cosmicBlue to-violet-500 text-transparent bg-clip-text break-words leading-tight">
                      {project.title}
                    </h2>
                  </div>
                </div>

                {/* Status and Category */}
                <motion.div
                  className="flex flex-wrap items-center gap-2 sm:gap-3"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className="text-starWhite/60 text-xs sm:text-sm">{project.category}</span>
                </motion.div>
                
                {/* Description */}
                <motion.p
                  className="text-xs sm:text-sm md:text-base lg:text-lg text-starWhite/80 leading-relaxed"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {project.description}
                </motion.p>
              </div>
            </div>

            {/* Ultra Responsive Content */}
            <div className="p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto max-h-[calc(98vh-140px)] sm:max-h-[calc(95vh-160px)] md:max-h-[calc(90vh-180px)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
                  {/* Ultra Responsive Project Image */}
                  <motion.div
                    className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-deepSpace/50 border border-starWhite/10"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deepSpace/50 to-transparent"></div>
                    
                    {/* Image Overlay Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-nebulaPink/5 via-transparent to-cosmicBlue/5"></div>
                    <motion.div
                      className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-nebulaPink/20 rounded-full blur-sm"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>

                  {/* Ultra Responsive Features Section */}
                  <motion.div
                    className="bg-deepSpace/50 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-starWhite/10"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4 flex items-center space-x-2">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-nebulaPink flex-shrink-0" />
                      <span className="text-white">{t('projects.projectDetails.keyFeatures')}</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {project.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-deepSpace/30 rounded-lg sm:rounded-xl border border-starWhite/5"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                        >
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-nebulaPink rounded-full mt-1 sm:mt-1.5 md:mt-2 flex-shrink-0"></div>
                          <span className="text-starWhite/80 text-xs sm:text-sm leading-relaxed">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Ultra Responsive Challenges Section */}
                  <motion.div
                    className="bg-deepSpace/50 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-starWhite/10"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4 flex items-center space-x-2">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-cosmicBlue flex-shrink-0" />
                      <span className="text-white">{t('projects.projectDetails.challengesSolutions')}</span>
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {project.challenges.map((challenge, index) => (
                        <motion.div
                          key={index}
                          className="p-2 sm:p-3 md:p-4 bg-deepSpace/30 rounded-lg sm:rounded-xl border border-starWhite/5"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                        >
                          <p className="text-starWhite/80 text-xs sm:text-sm leading-relaxed">{challenge}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Ultra Responsive Sidebar */}
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  {/* Ultra Responsive Project Info */}
                  <motion.div
                    className="bg-deepSpace/50 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-starWhite/10"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 md:mb-4 text-white">{t('projects.projectDetails.status')} Details</h3>
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-nebulaPink flex-shrink-0" />
                        <span className="text-starWhite/70 text-xs sm:text-sm">{t('projects.projectDetails.duration')}: {project.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-cosmicBlue flex-shrink-0" />
                        <span className="text-starWhite/70 text-xs sm:text-sm">{t('projects.projectDetails.teamSize')}: {project.teamSize}</span>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                        <span className="text-starWhite/70 text-xs sm:text-sm">{t('projects.projectDetails.rating')}: {project.metrics.rating}/5</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Ultra Responsive Tech Stack */}
                  <motion.div
                    className="bg-deepSpace/50 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-starWhite/10"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 md:mb-4 text-white">{t('projects.projectDetails.techStack')}</h3>
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      {Object.entries(project.techStack).map(([category, techs], index) => (
                        <div key={category}>
                          <h4 className="text-xs sm:text-sm font-medium text-starWhite/60 mb-1 sm:mb-2 capitalize">{category}</h4>
                          <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                            {techs.map((tech, techIndex) => (
                              <motion.span
                                key={techIndex}
                                className="px-2 sm:px-2.5 md:px-3 py-1 bg-nebulaPink/10 text-nebulaPink text-xs rounded-full border border-nebulaPink/20"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.5 + (index * 0.1) + (techIndex * 0.05) }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Ultra Responsive Action Buttons */}
                  <motion.div
                    className="space-y-3 sm:space-y-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-nebulaPink to-cosmicBlue text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl hover:opacity-90 transition-opacity duration-300 font-medium flex items-center justify-center space-x-2 text-xs sm:text-sm md:text-base shadow-lg shadow-nebulaPink/20"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{t('projects.projectDetails.viewLive')}</span>
                      </motion.a>
                    )}
                    
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-deepSpace/70 border-2 border-starWhite/30 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl hover:border-cosmicBlue/60 hover:bg-cosmicBlue/20 transition-all duration-300 font-medium flex items-center justify-center space-x-2 text-xs sm:text-sm md:text-base shadow-lg shadow-cosmicBlue/20 hover:shadow-cosmicBlue/40"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{t('projects.projectDetails.viewCode')}</span>
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </div>
              
              {/* Extra spacing for mobile scroll - ensures all content is accessible */}
              <div className="h-16 sm:h-8 md:h-6 lg:h-4"></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
