import {
  Github,
  Mail,
  Rocket,
  Instagram,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { lazy, Suspense, useEffect } from 'react';
import NavBar from './components/NavBar';
import ProjectCard from './components/ProjectCard';
import ContactForm from './components/ContactForm';
import SkillCard from './components/SkillCard';
import StarField from './components/StarField';
import MeteorShower from './components/MeteorShower';
import TypewriterText from './components/TypewriterText';
import ScrollAnimation from './components/ScrollAnimation';
import StaggerAnimation from './components/StaggerAnimation';
import ParallaxScroll from './components/ParallaxScroll';
import usePerformanceMonitor from './hooks/usePerformanceMonitor';
import useServiceWorker from './hooks/useServiceWorker';
import useDeviceOptimization from './hooks/useDeviceOptimization';
import PerformanceFallback from './components/PerformanceFallback';
import preloader from './utils/preloader';

// Lazy load heavy components
const EnhancedAbout = lazy(() => import('./components/EnhancedAbout'));
const ExperienceCarousel = lazy(() => import('./components/ExperienceCarousel'));
const DownloadCV = lazy(() => import('./components/DownloadCV'));


function App() {
  const { t } = useTranslation();
  
  // Monitor performance
  usePerformanceMonitor();
  
  // Get device optimization settings
  const deviceCapabilities = useDeviceOptimization();
  
  // Initialize service worker
  const { isSupported: swSupported, preloadResources } = useServiceWorker();
  
  // Preload critical resources with device adaptation
  useEffect(() => {
    const preloadCritical = async () => {
      try {
        // Only preload if device can handle it
        if (deviceCapabilities.preloadImages) {
          await preloader.preloadCritical();
          
          // Preload project images with quality adaptation
          const projectImages = projects
            .map(project => project.image)
            .filter(img => img.startsWith('http'))
            .map(img => {
              // Add quality parameter based on device
              const url = new URL(img);
              url.searchParams.set('q', deviceCapabilities.imageQuality.toString());
              return url.toString();
            });
          
          if (projectImages.length > 0) {
            preloader.preloadImages(projectImages);
          }
          
          // Preload skill icons
          const skillIcons = skills.map(skill => skill.icon);
          preloader.preloadImages(skillIcons);
        }
        
        console.log('Critical resources preloaded successfully', {
          device: deviceCapabilities.isMobile ? 'mobile' : 'desktop',
          capabilities: deviceCapabilities
        });
      } catch (error) {
        console.error('Preload failed:', error);
      }
    };
    
    preloadCritical();
  }, [deviceCapabilities]);
  
  // Project data with translations
  const projects = [
    {
      id: 1,
      title: t('projects.dietFitnessApp.title'),
      description: t('projects.dietFitnessApp.description'),
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400",
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express', 'JWT', 'Bcrypt'],
      liveLink: "#",
      codeLink: "#",
      category: t('common.mobile'),
      status: t('projects.projectDetails.completed'),
      duration: `1 ${t('common.month')}`,
      teamSize: t('projects.projectDetails.solo'),
      challenges: t('projects.dietFitnessApp.challenges', { returnObjects: true }) as string[],
      features: t('projects.dietFitnessApp.features', { returnObjects: true }) as string[],
      achievements: t('projects.dietFitnessApp.achievements', { returnObjects: true }) as string[],
      screenshots: [
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400"
      ],
      techStack: {
        frontend: ['React Native', 'Redux', 'React Navigation', 'Styled Components'],
        backend: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
        database: ['MongoDB', 'Redis', 'Cloudinary'],
        tools: ['Stripe', 'Firebase', 'Jest', 'GitHub Actions']
      },
      metrics: {
        performance: "98% uptime",
        users: "5,000+ active users",
        rating: 4.8
      }
    },
    {
      id: 2,
      title: t('projects.smartShoppingApp.title'),
      description: t('projects.smartShoppingApp.description'),
      image: "./shopm.png",
      tags: ['React Native', 'Firebase', 'Real-time Chat', 'Redux', 'WebSocket'],
      liveLink: "#",
      codeLink: "#",
      category: t('common.mobile'),
      status: t('projects.projectDetails.completed'),
      duration: `1 ${t('common.month')}`,
      teamSize: t('projects.projectDetails.solo'),
      challenges: t('projects.smartShoppingApp.challenges', { returnObjects: true }) as string[],
      features: t('projects.smartShoppingApp.features', { returnObjects: true }) as string[],
      achievements: t('projects.smartShoppingApp.achievements', { returnObjects: true }) as string[],
      screenshots: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=400"
      ],
      techStack: {
        frontend: ['React Native', 'Redux', 'React Navigation', 'Native Base'],
        backend: ['Firebase', 'Cloud Functions', 'Firestore'],
        database: ['Firestore', 'Firebase Storage'],
        tools: ['Firebase Analytics', 'Crashlytics', 'GitHub', 'VS Code']
      },
      metrics: {
        performance: "99.5% uptime",
        users: "2,500+ active users",
        rating: 4.6
      }
    },
    {
      id: 3,
      title: t('projects.moinhoWebsite.title'),
      description: t('projects.moinhoWebsite.description'),
      image: "./Logo moinho branco pequeno pequeno.png",
      tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
      liveLink: "#",
      codeLink: "#",
      category: t('common.web'),
      status: t('projects.projectDetails.completed'),
      duration: `3 ${t('common.weeks')}`,
      teamSize: t('projects.projectDetails.solo'),
      challenges: t('projects.moinhoWebsite.challenges', { returnObjects: true }) as string[],
      features: t('projects.moinhoWebsite.features', { returnObjects: true }) as string[],
      achievements: t('projects.moinhoWebsite.achievements', { returnObjects: true }) as string[],
      screenshots: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?auto=format&fit=crop&q=80&w=400"
      ],
      techStack: {
        frontend: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery'],
        backend: ['PHP', 'MySQL', 'Apache'],
        database: ['MySQL', 'phpMyAdmin'],
        tools: ['Git', 'VS Code', 'Google Analytics', 'Google Maps API']
      },
      metrics: {
        performance: "95+ PageSpeed score",
        users: "500+ monthly visitors",
        rating: 4.9
      }
    },
    {
      id: 4,
      title: t('projects.vacationApartmentWebsite.title'),
      description: t('projects.vacationApartmentWebsite.description'),
      image: "./smarta.png",
      tags: ['WordPress', 'WooCommerce', 'Payment Gateway', 'PHP', 'MySQL'],
      liveLink: "#",
      codeLink: "#",
      category: t('common.web'),
      status: t('projects.projectDetails.completed'),
      duration: `3 ${t('common.weeks')}`,
      teamSize: t('projects.projectDetails.solo'),
      challenges: t('projects.vacationApartmentWebsite.challenges', { returnObjects: true }) as string[],
      features: t('projects.vacationApartmentWebsite.features', { returnObjects: true }) as string[],
      achievements: t('projects.vacationApartmentWebsite.achievements', { returnObjects: true }) as string[],
      screenshots: [
        "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400"
      ],
      techStack: {
        frontend: ['WordPress', 'PHP', 'CSS3', 'JavaScript', 'jQuery'],
        backend: ['WordPress', 'WooCommerce', 'MySQL'],
        database: ['MySQL', 'WordPress Database'],
        tools: ['cPanel', 'FileZilla', 'Google Analytics', 'MailChimp']
      },
      metrics: {
        performance: "99% uptime",
        users: "1,200+ monthly visitors",
        rating: 4.7
      }
    },
    {
      id: 5,
      title: t('projects.burgerRestaurantWebsite.title'),
      description: t('projects.burgerRestaurantWebsite.description'),
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=400",
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'PHP', 'MySQL'],
      liveLink: "#",
      codeLink: "#",
      category: t('common.web'),
      status: t('projects.projectDetails.completed'),
      duration: `2 ${t('common.weeks')}`,
      teamSize: t('projects.projectDetails.solo'),
      challenges: t('projects.burgerRestaurantWebsite.challenges', { returnObjects: true }) as string[],
      features: t('projects.burgerRestaurantWebsite.features', { returnObjects: true }) as string[],
      achievements: t('projects.burgerRestaurantWebsite.achievements', { returnObjects: true }) as string[],
      screenshots: [
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=400"
      ],
      techStack: {
        frontend: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery'],
        backend: ['PHP', 'MySQL', 'Apache'],
        database: ['MySQL', 'phpMyAdmin'],
        tools: ['Git', 'VS Code', 'XAMPP', 'Adobe Photoshop']
      },
      metrics: {
        performance: "Academic project",
        users: "Class demonstration",
        rating: 4.5
      }
    },
    {
      id: 6,
      title: t('projects.personalTrainingApp.title'),
      description: t('projects.personalTrainingApp.description'),
      image: "./perfo.png",
      tags: ['React Native', 'Video Streaming', 'Firebase', 'Redux', 'Expo'],
      liveLink: "#",
      codeLink: "#",
      category: t('common.mobile'),
      status: t('projects.projectDetails.inProgress'),
      duration: `2 ${t('common.months')}`,
      teamSize: t('projects.projectDetails.solo'),
      challenges: t('projects.personalTrainingApp.challenges', { returnObjects: true }) as string[],
      features: t('projects.personalTrainingApp.features', { returnObjects: true }) as string[],
      achievements: t('projects.personalTrainingApp.achievements', { returnObjects: true }) as string[],
      screenshots: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400",
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400"
      ],
      techStack: {
        frontend: ['React Native', 'Expo', 'Redux', 'React Navigation'],
        backend: ['Firebase', 'Cloud Functions', 'Firestore'],
        database: ['Firestore', 'Firebase Storage'],
        tools: ['Expo CLI', 'Firebase Console', 'GitHub', 'VS Code']
      },
      metrics: {
        performance: "In development",
        users: "Beta testing",
        rating: 4.2
      }
    }
  ];

  const skills = [
    {
      name: 'React',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: 'text-[#61DAFB]',
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      color: 'text-[#3178C6]',
    },
    {
      name: 'Node.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      color: 'text-[#339933]',
    },
    {
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      color: 'text-[#F7DF1E]',
    },
    {
      name: 'HTML5',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      color: 'text-[#E34F26]',
    },
    {
      name: 'CSS3',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      color: 'text-[#1572B6]',
    },
    {
      name: 'Tailwind CSS',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      color: 'text-[#06B6D4]',
    },
    {
      name: 'React Native',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: 'text-[#61DAFB]',
    },
    {
      name: 'Firebase',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      color: 'text-[#FFCA28]',
    },
    {
      name: 'MongoDB',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      color: 'text-[#47A248]',
    },
    {
      name: 'WordPress',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg',
      color: 'text-[#21759B]',
    },
    {
      name: 'PHP',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      color: 'text-[#777BB4]',
    },
  ];

  return (
    <div className="min-h-screen bg-deepSpace text-white relative overflow-hidden">
      {/* Conditional rendering based on device capabilities */}
      {deviceCapabilities.enableHeavyAnimations && <StarField />}
      <MeteorShower />

      <NavBar />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative px-4">
        <ParallaxScroll speed={0.3} direction="up">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="space-y-6">
              <ScrollAnimation direction="scale" delay={0.1} duration={0.4}>
            <h1 className="text-7xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-nebulaPink via-cosmicBlue to-violet-500 animate-glow">
                  {t('hero.title')}
            </h1>
              </ScrollAnimation>
              
              <ScrollAnimation direction="up" delay={0.2} duration={0.4}>
            <div className="relative inline-block">
              <h2 className="text-4xl md:text-4xl font-bold mb-4 animate-float">
                    <TypewriterText 
                      texts={[
                        t('hero.typewriterTexts.fullStack'),
                        t('hero.typewriterTexts.reactSpecialist'), 
                        t('hero.typewriterTexts.mobileDeveloper'),
                        t('hero.typewriterTexts.webDesigner'),
                        t('hero.typewriterTexts.freelanceDeveloper')
                      ]}
                      speed={100}
                      deleteSpeed={50}
                      pauseTime={2000}
                      className="bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text"
                    />
              </h2>
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-nebulaPink via-cosmicBlue to-violet-500 animate-pulse"></div>
            </div>
              </ScrollAnimation>
              
              <ScrollAnimation direction="up" delay={0.3} duration={0.4}>
                <p className="text-xl md:text-2xl text-starWhite/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                  {t('hero.description')}
                </p>
              </ScrollAnimation>
              
              <ScrollAnimation direction="up" delay={0.4} duration={0.4}>
                <StaggerAnimation staggerDelay={0.05} direction="up">
                  <div className="flex gap-6 justify-center">
              <a
                href="https://github.com/imperador1k"
                className="group relative p-3 bg-deepSpace/50 rounded-full hover:bg-deepSpace/80 transition-all duration-300 border border-starWhite/10"
              >
                <Github className="w-6 h-6 group-hover:text-nebulaPink transition-colors" />
                <div className="absolute inset-0 rounded-full bg-nebulaPink/20 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </a>
              <a
                href="https://www.instagram.com/miguel1santos7/"
                className="group relative p-3 bg-deepSpace/50 rounded-full hover:bg-deepSpace/80 transition-all duration-300 border border-starWhite/10"
              >
                <Instagram className="w-6 h-6 group-hover:text-pink-500 transition-colors" />
                <div className="absolute inset-0 rounded-full bg-pink-500/20 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </a>
              <a
                      href="mailto:migasmps2005@gmail.com"
                className="group relative p-3 bg-deepSpace/50 rounded-full hover:bg-deepSpace/80 transition-all duration-300 border border-starWhite/10"
              >
                <Mail className="w-6 h-6 group-hover:text-emerald-500 transition-colors" />
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </a>
            </div>
                </StaggerAnimation>
              </ScrollAnimation>
              
              <ScrollAnimation direction="up" delay={0.5} duration={0.4}>
            <div className="mt-12 animate-bounce-slow">
              <Rocket className="w-8 h-8 mx-auto text-nebulaPink" />
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </ParallaxScroll>
      </section>

      {/* Enhanced About Section */}
      <section id="about">
        <Suspense fallback={<PerformanceFallback height="h-96" />}>
          <EnhancedAbout />
        </Suspense>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation direction="up" delay={0.1} duration={0.4}>
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
            {t('projects.title')}
          </h2>
          </ScrollAnimation>
          
          <StaggerAnimation staggerDelay={0.05} direction="up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
              />
            ))}
          </div>
          </StaggerAnimation>
        </div>
      </section>

      {/* Experience Carousel */}
      <section id="experience">
        <Suspense fallback={<PerformanceFallback height="h-64" />}>
          <ExperienceCarousel />
        </Suspense>
      </section>

      {/* App Store Section */}
      <section id="appstore" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation direction="up" delay={0.1} duration={0.4}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-nebulaPink via-cosmicBlue to-violet-500 text-transparent bg-clip-text">
                {t('appstore.title')}
              </h2>
              <p className="text-xl text-starWhite/80 max-w-3xl mx-auto leading-relaxed">
                {t('appstore.subtitle')}
              </p>
            </div>
          </ScrollAnimation>

          {/* App Store Card */}
          <ScrollAnimation direction="scale" delay={0.3} duration={0.6}>
            <div className="relative max-w-4xl mx-auto">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-nebulaPink/10 via-cosmicBlue/10 to-violet-500/10 rounded-3xl blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-nebulaPink/5 via-cosmicBlue/5 to-violet-500/5 rounded-3xl"></div>
              
              {/* Main Card */}
              <div className="relative bg-deepSpace/80 backdrop-blur-xl border border-starWhite/20 rounded-3xl p-8 md:p-12 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-nebulaPink/20 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cosmicBlue/20 to-transparent rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-12">
                    <ScrollAnimation direction="up" delay={0.4} duration={0.4}>
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-nebulaPink to-cosmicBlue rounded-2xl mb-6">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </ScrollAnimation>
                    
                    <ScrollAnimation direction="up" delay={0.5} duration={0.4}>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
                        {t('appstore.miguelAppStore')}
                      </h3>
                    </ScrollAnimation>
                    
                    <ScrollAnimation direction="up" delay={0.6} duration={0.4}>
                      <p className="text-lg text-starWhite/70 mb-8 max-w-2xl mx-auto">
                        {t('appstore.miguelAppStoreDesc')}
                      </p>
                    </ScrollAnimation>
                  </div>

                  {/* Features Grid */}
                  <StaggerAnimation staggerDelay={0.1} direction="up">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                      <div className="bg-deepSpace/50 border border-starWhite/10 rounded-2xl p-6 backdrop-blur-sm hover:border-nebulaPink/30 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-r from-nebulaPink to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-semibold mb-3 text-white">{t('appstore.mobileApps')}</h4>
                        <p className="text-starWhite/70 text-sm leading-relaxed">
                          {t('appstore.mobileAppsDesc')}
                        </p>
                      </div>

                      <div className="bg-deepSpace/50 border border-starWhite/10 rounded-2xl p-6 backdrop-blur-sm hover:border-cosmicBlue/30 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-r from-cosmicBlue to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-semibold mb-3 text-white">{t('appstore.webApps')}</h4>
                        <p className="text-starWhite/70 text-sm leading-relaxed">
                          {t('appstore.webAppsDesc')}
                        </p>
                      </div>

                      <div className="bg-deepSpace/50 border border-starWhite/10 rounded-2xl p-6 backdrop-blur-sm hover:border-violet-500/30 transition-all duration-300 group">
                        <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-semibold mb-3 text-white">{t('appstore.liveUpdates')}</h4>
                        <p className="text-starWhite/70 text-sm leading-relaxed">
                          {t('appstore.liveUpdatesDesc')}
                        </p>
                      </div>
                    </div>
                  </StaggerAnimation>

                  {/* CTA Section */}
                  <ScrollAnimation direction="up" delay={0.7} duration={0.4}>
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-deepSpace/50 to-deepSpace/30 border border-starWhite/10 rounded-2xl p-8 backdrop-blur-sm">
                        <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
                          {t('appstore.readyToExplore')}
                        </h4>
                        <p className="text-starWhite/70 mb-8 max-w-lg mx-auto">
                          {t('appstore.readyToExploreDesc')}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <a
                            href="https://miguelstore.vercel.app/" target="_blank"
                            className="group relative bg-gradient-to-r from-nebulaPink to-cosmicBlue text-white px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-300 font-medium shadow-lg shadow-nebulaPink/25 hover:shadow-nebulaPink/40"
                          >
                            <div className="flex items-center justify-center space-x-3">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              <span>{t('appstore.visitAppStore')}</span>
                            </div>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-nebulaPink to-cosmicBlue blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                          </a>
                          
                          <a
                            href="#contact"
                            className="group bg-deepSpace/50 border border-starWhite/20 text-white px-8 py-4 rounded-xl hover:border-nebulaPink/50 hover:bg-nebulaPink/10 transition-all duration-300 font-medium backdrop-blur-sm"
                          >
                            <div className="flex items-center justify-center space-x-3">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              <span>{t('appstore.getInTouch')}</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation direction="up" delay={0.1} duration={0.4}>
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
            {t('skills.title')}
          </h2>
          </ScrollAnimation>
          
          <StaggerAnimation staggerDelay={0.05} direction="up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                name={skill.name}
                icon={skill.icon}
                color={skill.color}
                delay={index * 100}
              />
            ))}
          </div>
          </StaggerAnimation>
        </div>
      </section>

      {/* Download CV Section */}
      <Suspense fallback={<PerformanceFallback height="h-32" />}>
        <DownloadCV />
      </Suspense>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <ScrollAnimation direction="up" delay={0.1} duration={0.4}>
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
            {t('contact.title')}
          </h2>
          </ScrollAnimation>
          
          <ScrollAnimation direction="up" delay={0.2} duration={0.4}>
          <div className="bg-deepSpace/30 backdrop-blur-lg rounded-2xl border border-starWhite/10 p-8">
            <ContactForm />
          </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-deepSpace via-deepSpace/95 to-deepSpace/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-nebulaPink/5 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-nebulaPink/50 to-transparent"></div>
        
        {/* Main Footer Content */}
        <div className="relative z-10 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Top Section */}
            <StaggerAnimation staggerDelay={0.05} direction="up">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                {/* Brand Section */}
                <div className="lg:col-span-2">
                  <ScrollAnimation direction="scale" delay={0.1} duration={0.4}>
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-nebulaPink via-cosmicBlue to-violet-500 text-transparent bg-clip-text mb-4">
                        Miguel Santos
              </h3>
                      <div className="w-20 h-1 bg-gradient-to-r from-nebulaPink to-cosmicBlue rounded-full mb-6"></div>
                    </div>
                  </ScrollAnimation>
                  
                  <ScrollAnimation direction="up" delay={0.2} duration={0.4}>
                    <p className="text-starWhite/80 text-lg leading-relaxed mb-8 max-w-md">
                      Passionate full-stack developer creating amazing digital experiences. 
                      Turning ideas into reality through code, one project at a time.
                    </p>
                  </ScrollAnimation>
                  
                  <ScrollAnimation direction="up" delay={0.3} duration={0.4}>
                    <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/imperador1k"
                        className="group relative p-3 bg-deepSpace/50 rounded-xl border border-starWhite/10 hover:border-nebulaPink/50 transition-all duration-300 backdrop-blur-sm"
                >
                        <Github className="w-6 h-6 text-starWhite/70 group-hover:text-nebulaPink transition-colors" />
                        <div className="absolute inset-0 rounded-xl bg-nebulaPink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a
                  href="https://www.instagram.com/miguel1santos7/"
                        className="group relative p-3 bg-deepSpace/50 rounded-xl border border-starWhite/10 hover:border-pink-500/50 transition-all duration-300 backdrop-blur-sm"
                >
                        <Instagram className="w-6 h-6 text-starWhite/70 group-hover:text-pink-500 transition-colors" />
                        <div className="absolute inset-0 rounded-xl bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a
                        href="mailto:migasmps2005@gmail.com"
                        className="group relative p-3 bg-deepSpace/50 rounded-xl border border-starWhite/10 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm"
                >
                        <Mail className="w-6 h-6 text-starWhite/70 group-hover:text-emerald-500 transition-colors" />
                        <div className="absolute inset-0 rounded-xl bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
                  </ScrollAnimation>
            </div>

                {/* Quick Links */}
            <div>
                  <ScrollAnimation direction="up" delay={0.4} duration={0.4}>
                    <h4 className="text-xl font-semibold mb-6 bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
                      {t('footer.quickLinks')}
                    </h4>
                    <ul className="space-y-4">
                      {[
                        { href: "#about", label: t('nav.about') },
                        { href: "#projects", label: t('nav.projects') },
                        { href: "#experience", label: t('nav.experience') },
                        { href: "#skills", label: t('nav.skills') },
                        { href: "#contact", label: t('nav.contact') }
                      ].map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="group flex items-center text-starWhite/70 hover:text-nebulaPink transition-all duration-300"
                          >
                            <div className="w-2 h-2 bg-nebulaPink/50 rounded-full mr-3 group-hover:bg-nebulaPink transition-colors duration-300"></div>
                            {link.label}
                  </a>
                </li>
                      ))}
                    </ul>
                  </ScrollAnimation>
                </div>

                {/* Contact Info */}
                <div>
                  <ScrollAnimation direction="up" delay={0.5} duration={0.4}>
                    <h4 className="text-xl font-semibold mb-6 bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
                      {t('footer.letsConnect')}
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center group">
                        <div className="p-2 bg-nebulaPink/20 rounded-lg mr-3 group-hover:bg-nebulaPink/30 transition-colors duration-300">
                          <Mail className="w-5 h-5 text-nebulaPink" />
                        </div>
                        <div>
                          <p className="text-starWhite/70 text-sm">{t('footer.email')}</p>
                          <a 
                            href="mailto:migasmps2005@gmail.com"
                            className="text-starWhite hover:text-nebulaPink transition-colors duration-300"
                          >
                            migasmps2005@gmail.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center group">
                        <div className="p-2 bg-cosmicBlue/20 rounded-lg mr-3 group-hover:bg-cosmicBlue/30 transition-colors duration-300">
                          <Rocket className="w-5 h-5 text-cosmicBlue" />
            </div>
            <div>
                          <p className="text-starWhite/70 text-sm">{t('footer.status')}</p>
                          <p className="text-starWhite">{t('footer.availableForProjects')}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </StaggerAnimation>

            {/* Skills Showcase */}
            <ScrollAnimation direction="up" delay={0.6} duration={0.4}>
              <div className="mb-16">
                <h4 className="text-xl font-semibold mb-8 text-center bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
                  {t('footer.techStack')}
                </h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {['React', 'TypeScript', 'Node.js', 'Python', 'MongoDB', 'Firebase', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
                    <div
                      key={tech}
                      className="px-4 py-2 bg-deepSpace/50 border border-starWhite/10 rounded-full text-starWhite/70 hover:text-nebulaPink hover:border-nebulaPink/50 transition-all duration-300 backdrop-blur-sm"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            {/* Bottom Section */}
            <ScrollAnimation direction="up" delay={0.7} duration={0.4}>
              <div className="border-t border-starWhite/10 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-starWhite/60 mb-2">
                      &copy; {new Date().getFullYear()} Miguel Santos. {t('footer.copyright').split('©')[1]}
                    </p>
                    <p className="text-starWhite/40 text-sm">
                      {t('footer.madeWith')}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-starWhite/40 text-sm">
                    <div className="w-2 h-2 bg-nebulaPink rounded-full animate-pulse"></div>
                    <span>{t('footer.madeInPortugal')}</span>
                  </div>
            </div>
          </div>
            </ScrollAnimation>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-nebulaPink/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-cosmicBlue/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-violet-500/10 rounded-full blur-lg animate-pulse delay-500"></div>
      </footer>
    </div>
  );
}

export default App;
