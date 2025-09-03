import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrollAnimation from './ScrollAnimation';

const ExperienceCarousel = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const experiences = [
    {
      company: t('experience.experiences.fiverr.company'),
      role: t('experience.experiences.fiverr.role'),
      period: t('experience.experiences.fiverr.period'),
      description: t('experience.experiences.fiverr.description'),
      logo: "./freel.png",
      technologies: ["React", "Node.js", "TypeScript", "Tailwind CSS", "HTML", "CSS", "JavaScript"],
      achievements: t('experience.experiences.fiverr.achievements', { returnObjects: true }) as string[]
    },
    {
      company: t('experience.experiences.university.company'),
      role: t('experience.experiences.university.role'),
      period: t('experience.experiences.university.period'),
      description: t('experience.experiences.university.description'),
      logo: "./uni1.png",
      technologies: ["Python", "Django", "React", "MySQL", "HTML", "CSS", "JavaScript"],
      achievements: t('experience.experiences.university.achievements', { returnObjects: true }) as string[]
    },
    {
      company: t('experience.experiences.local.company'),
      role: t('experience.experiences.local.role'),
      period: t('experience.experiences.local.period'),
      description: t('experience.experiences.local.description'),
      logo: "./local.jpeg",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"],
      achievements: t('experience.experiences.local.achievements', { returnObjects: true }) as string[]
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % experiences.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + experiences.length) % experiences.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="experience" className="py-20 px-4 relative z-10">
      <div className="max-w-8xl mx-auto px-4 lg:px-20">
        <div className="text-center mb-12">
          <ScrollAnimation direction="up" delay={0.1} duration={0.4}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
              {t('experience.title')}
            </h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={0.2} duration={0.4}>
            <p className="text-lg md:text-xl text-gray-300">
              {t('experience.subtitle')}
            </p>
          </ScrollAnimation>
        </div>

        <ScrollAnimation direction="up" delay={0.3} duration={0.4}>
          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Buttons - Completely Outside (Desktop) */}
            <button
              onClick={prevSlide}
              className="hidden xl:block absolute -left-20 top-1/2 transform -translate-y-1/2 bg-deepSpace/90 border border-starWhite/30 rounded-full p-4 hover:bg-deepSpace transition-all duration-300 backdrop-blur-sm z-10 shadow-lg hover:shadow-nebulaPink/20"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            
            <button
              onClick={nextSlide}
              className="hidden xl:block absolute -right-20 top-1/2 transform -translate-y-1/2 bg-deepSpace/90 border border-starWhite/30 rounded-full p-4 hover:bg-deepSpace transition-all duration-300 backdrop-blur-sm z-10 shadow-lg hover:shadow-nebulaPink/20"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Navigation Buttons - Outside (Tablet) */}
            <button
              onClick={prevSlide}
              className="hidden lg:block xl:hidden absolute -left-12 top-1/2 transform -translate-y-1/2 bg-deepSpace/90 border border-starWhite/30 rounded-full p-3 hover:bg-deepSpace transition-all duration-300 backdrop-blur-sm z-10 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <button
              onClick={nextSlide}
              className="hidden lg:block xl:hidden absolute -right-12 top-1/2 transform -translate-y-1/2 bg-deepSpace/90 border border-starWhite/30 rounded-full p-3 hover:bg-deepSpace transition-all duration-300 backdrop-blur-sm z-10 shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Buttons - Outside (Mobile) */}
            <button
              onClick={prevSlide}
              className="lg:hidden absolute -left-8 top-1/2 transform -translate-y-1/2 bg-deepSpace/90 border border-starWhite/30 rounded-full p-2 hover:bg-deepSpace transition-all duration-300 backdrop-blur-sm z-10 shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            
            <button
              onClick={nextSlide}
              className="lg:hidden absolute -right-8 top-1/2 transform -translate-y-1/2 bg-deepSpace/90 border border-starWhite/30 rounded-full p-2 hover:bg-deepSpace transition-all duration-300 backdrop-blur-sm z-10 shadow-lg"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>

          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {experiences.map((exp, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-deepSpace/50 border border-starWhite/10 backdrop-blur-sm p-4 md:p-6 lg:p-8 xl:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
                      {/* Left Side - Company Info */}
                      <div className="px-1 md:px-2 lg:px-0">
                        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-nebulaPink">
                            <img 
                              src={exp.logo} 
                              alt={exp.company}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white">{exp.company}</h3>
                            <p className="text-nebulaPink font-semibold text-sm md:text-base">{exp.role}</p>
                            <p className="text-gray-400 text-xs md:text-sm">{exp.period}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                          {exp.description}
                        </p>

                        {/* Technologies */}
                        <div className="mb-4 md:mb-6">
                          <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">{t('experience.technologiesUsed')}</h4>
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="px-2 md:px-3 py-1 bg-gradient-to-r from-nebulaPink/20 to-cosmicBlue/20 border border-nebulaPink/30 rounded-full text-xs md:text-sm text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        <div>
                          <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">{t('experience.keyAchievements')}</h4>
                          <ul className="space-y-1 md:space-y-2">
                            {exp.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-center gap-2 text-gray-300 text-sm md:text-base">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-nebulaPink rounded-full flex-shrink-0"></div>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Side - Company Logo */}
                      <div className="relative px-1 md:px-2 lg:px-0">
                        <div className="bg-gradient-to-br from-nebulaPink/10 to-cosmicBlue/10 rounded-2xl p-3 md:p-4 lg:p-6 xl:p-8 border border-starWhite/10">
                          <div className="text-center">
                            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mx-auto mb-4 md:mb-6 rounded-full overflow-hidden border-2 border-nebulaPink/30 hover:border-nebulaPink/60 transition-all duration-300">
                              <img 
                                src={exp.logo} 
                                alt={exp.company}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <h4 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{exp.company}</h4>
                            <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">{exp.role}</p>
                            <div className="flex justify-center gap-1 md:gap-2">
                              {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 md:w-2 md:h-2 bg-nebulaPink rounded-full"></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-nebulaPink scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ExperienceCarousel;
