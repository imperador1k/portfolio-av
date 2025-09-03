import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Heart, 
  Trophy, 
  Star,
  Quote,
  Code,
  Gamepad2,
  Mountain,
  Languages,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';
import StaggerAnimation from './StaggerAnimation';

const EnhancedAbout = () => {
  const { t } = useTranslation();
  const [currentFact, setCurrentFact] = useState(0);

  const funFacts = [
    {
      text: t('about.funFactsList.0'),
      emoji: "🍔",
      icon: "🍕",
      image: "./mac.jpg",
      color: "from-orange-400 to-red-500"
    },
    {
      text: t('about.funFactsList.1'),
      emoji: "🏔️",
      icon: "⛰️",
      image: "./serra.jpg",
      color: "from-green-400 to-blue-500"
    },
    {
      text: t('about.funFactsList.2'),
      emoji: "🏍️",
      icon: "🏍️",
      image: "./mota.jpg",
      color: "from-green-400 to-blue-500"
    },
    {
      text: t('about.funFactsList.3'),
      emoji: "🌍",
      icon: "🗣️",
      image: "./tomar.webp",
      color: "from-blue-400 to-purple-500"
    },
    {
      text: t('about.funFactsList.4'),
      emoji: "💻",
      icon: "⌨️",
      image: "./site.png",
      color: "from-cyan-400 to-blue-500"
    },
    {
      text: t('about.funFactsList.5'),
      emoji: "🏃‍♂️",
      icon: "💪",
      image: "./botas.jpg",
      color: "from-green-400 to-emerald-500"
    },
  ];

  const timeline = [
    {
      year: "2025",
      title: t('about.timeline.freelanceDeveloper'),
      description: t('about.timeline.freelanceDeveloperDesc'),
      icon: <Code className="w-6 h-6" />
    },
    {
      year: "2025",
      title: t('about.timeline.firstCommercialProjects'),
      description: t('about.timeline.firstCommercialProjectsDesc'),
      icon: <Trophy className="w-6 h-6" />
    },
    {
      year: "2025",
      title: t('about.timeline.exploringMore'),
      description: t('about.timeline.exploringMoreDesc'),
      icon: <Code className="w-6 h-6" />
    },
    {
      year: "2025",
      title: t('about.timeline.programmingJourneyBegins'),
      description: t('about.timeline.programmingJourneyBeginsDesc'),
      icon: <Star className="w-6 h-6" />
    },
    {
      year: "2024",
      title: t('about.timeline.computerEngineeringStudent'),
      description: t('about.timeline.computerEngineeringStudentDesc'),
      icon: <GraduationCap className="w-6 h-6" />
    },
    
  ];

  const hobbies = [
    { name: t('about.hobbiesList.0'), icon: <Mountain className="w-8 h-8" />, color: "from-orange-500 to-red-500" },
    { name: t('about.hobbiesList.1'), icon: <Gamepad2 className="w-8 h-8" />, color: "from-blue-500 to-purple-500" },
    { name: t('about.hobbiesList.2'), icon: <Heart className="w-8 h-8" />, color: "from-green-500 to-teal-500" },
    { name: t('about.hobbiesList.3'), icon: <Languages className="w-8 h-8" />, color: "from-pink-500 to-rose-500" }
  ];

  const testimonials = [
    {
      name: t('about.testimonialsList.0.name'),
      role: t('about.testimonialsList.0.role'),
      content: t('about.testimonialsList.0.content'),
      rating: 5,
      image: "/marias.jpg"
    },
    {
      name: t('about.testimonialsList.1.name'),
      role: t('about.testimonialsList.1.role'), 
      content: t('about.testimonialsList.1.content'),
      rating: 5,
      image: "/joao.jpg"
    },
    {
      name: t('about.testimonialsList.2.name'),
      role: t('about.testimonialsList.2.role'),
      content: t('about.testimonialsList.2.content'),
      rating: 5,
      image: "/anac.jpg"
    }
  ];

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % funFacts.length);
  };

  const prevFact = () => {
    setCurrentFact((prev) => (prev - 1 + funFacts.length) % funFacts.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header with Profile Photo */}
        <div className="text-center mb-16">
          <ScrollAnimation direction="scale" delay={0.2} duration={0.8}>
            <div className="relative inline-block mb-8">
              {/* Profile Photo Container */}
              <div className="relative group">
                {/* Main Photo */}
                <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-nebulaPink via-cosmicBlue to-violet-500 rounded-full p-1 animate-pulse"></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-deepSpace/50 border-4 border-starWhite/20 group-hover:border-nebulaPink/50 transition-all duration-500">
                    <img 
                      src="/me.png"
                      alt="Miguel Santos - Full Stack Developer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-deepSpace/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-nebulaPink rounded-full flex items-center justify-center animate-bounce">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-cosmicBlue rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0.5s'}}>
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div className="absolute top-1/2 -left-4 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '1s'}}>
                  <Star className="w-3 h-3 text-white" />
                </div>
              </div>
              
              {/* Decorative Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-nebulaPink/20 animate-spin" style={{animationDuration: '20s'}}></div>
              <div className="absolute inset-2 rounded-full border border-cosmicBlue/20 animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
            </div>
          </ScrollAnimation>
          
          <ScrollAnimation direction="up" delay={0.2} duration={0.4}>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
              {t('about.title')}
            </h2>
          </ScrollAnimation>
          
          <ScrollAnimation direction="up" delay={0.3} duration={0.4}>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('about.story')}
            </p>
          </ScrollAnimation>
        </div>

        {/* Personal Info Cards */}
        <StaggerAnimation staggerDelay={0.05} direction="up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-deepSpace/50 border border-starWhite/10 rounded-xl p-6 backdrop-blur-sm hover:border-starWhite/20 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-nebulaPink/20 rounded-lg group-hover:bg-nebulaPink/30 transition-colors">
                  <MapPin className="w-6 h-6 text-nebulaPink" />
                </div>
                <h3 className="text-lg font-semibold">{t('about.personalInfo.location')}</h3>
              </div>
              <p className="text-gray-300">{t('about.personalInfo.portugal')}</p>
            </div>
            
            <div className="bg-deepSpace/50 border border-starWhite/10 rounded-xl p-6 backdrop-blur-sm hover:border-starWhite/20 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-cosmicBlue/20 rounded-lg group-hover:bg-cosmicBlue/30 transition-colors">
                  <Calendar className="w-6 h-6 text-cosmicBlue" />
                </div>
                <h3 className="text-lg font-semibold">{t('about.personalInfo.age')}</h3>
              </div>
              <p className="text-gray-300">{t('about.personalInfo.ageValue')}</p>
            </div>
            
            <div className="bg-deepSpace/50 border border-starWhite/10 rounded-xl p-6 backdrop-blur-sm hover:border-starWhite/20 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-violet-500/20 rounded-lg group-hover:bg-violet-500/30 transition-colors">
                  <GraduationCap className="w-6 h-6 text-violet-500" />
                </div>
                <h3 className="text-lg font-semibold">{t('about.personalInfo.education')}</h3>
              </div>
              <p className="text-gray-300">{t('about.personalInfo.educationValue')}</p>
            </div>
          </div>
        </StaggerAnimation>

        {/* Personal Story Section */}
        <ScrollAnimation direction="up" delay={0.1} duration={0.4}>
          <div className="mb-16">
            <div className="bg-gradient-to-r from-deepSpace/50 to-deepSpace/30 border border-starWhite/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Story */}
                <div>
                  <ScrollAnimation direction="left" delay={0.4} duration={0.8}>
                    <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
                      {t('about.subtitle')}
                    </h3>
                  </ScrollAnimation>
                  <StaggerAnimation staggerDelay={0.05} direction="up">
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                      <p>
                        {t('about.story')}
                      </p>
                    </div>
                  </StaggerAnimation>
                </div>
                
                {/* Right Side - Visual Elements */}
                <ScrollAnimation direction="right" delay={0.6} duration={0.8}>
                  <div className="relative">
                    <StaggerAnimation staggerDelay={0.05} direction="up">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-nebulaPink/20 to-cosmicBlue/20 rounded-xl p-6 border border-nebulaPink/30">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-nebulaPink rounded-full flex items-center justify-center mx-auto mb-3">
                              <Code className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="font-semibold text-white mb-2">{t('about.passions.code')}</h4>
                            <p className="text-sm text-gray-300">{t('about.passions.codeDesc')}</p>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-cosmicBlue/20 to-violet-500/20 rounded-xl p-6 border border-cosmicBlue/30">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-cosmicBlue rounded-full flex items-center justify-center mx-auto mb-3">
                              <Mountain className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="font-semibold text-white mb-2">{t('about.passions.adventure')}</h4>
                            <p className="text-sm text-gray-300">{t('about.passions.adventureDesc')}</p>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-violet-500/20 to-nebulaPink/20 rounded-xl p-6 border border-violet-500/30">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Languages className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="font-semibold text-white mb-2">{t('about.passions.languages')}</h4>
                            <p className="text-sm text-gray-300">{t('about.passions.languagesDesc')}</p>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-nebulaPink/20 to-cosmicBlue/20 rounded-xl p-6 border border-nebulaPink/30">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-nebulaPink rounded-full flex items-center justify-center mx-auto mb-3">
                              <Heart className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="font-semibold text-white mb-2">{t('about.passions.fitness')}</h4>
                            <p className="text-sm text-gray-300">{t('about.passions.fitnessDesc')}</p>
                          </div>
                        </div>
                      </div>
                    </StaggerAnimation>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Fun Facts */}
        <ScrollAnimation direction="up" delay={0.1} duration={0.4}>
          <div className="mb-16">
            <ScrollAnimation direction="scale" delay={0.4} duration={0.8}>
              <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
                {t('about.funFacts')}
              </h3>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.3} duration={0.4}>
              <div className="relative max-w-4xl mx-auto">
                {/* Navigation Buttons - Outside on larger screens */}
                <button
                  onClick={prevFact}
                  className="hidden md:block absolute -left-12 top-1/2 transform -translate-y-1/2 bg-deepSpace/80 border border-starWhite/20 rounded-full p-3 hover:bg-deepSpace transition-colors backdrop-blur-sm z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                
                <button
                  onClick={nextFact}
                  className="hidden md:block absolute -right-12 top-1/2 transform -translate-y-1/2 bg-deepSpace/80 border border-starWhite/20 rounded-full p-3 hover:bg-deepSpace transition-colors backdrop-blur-sm z-10"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Navigation Buttons - Inside on smaller screens */}
                <button
                  onClick={prevFact}
                  className="md:hidden absolute left-2 top-1/2 transform -translate-y-1/2 bg-deepSpace/80 border border-starWhite/20 rounded-full p-2 hover:bg-deepSpace transition-colors backdrop-blur-sm z-10"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                
                <button
                  onClick={nextFact}
                  className="md:hidden absolute right-2 top-1/2 transform -translate-y-1/2 bg-deepSpace/80 border border-starWhite/20 rounded-full p-2 hover:bg-deepSpace transition-colors backdrop-blur-sm z-10"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>

                <ScrollAnimation direction="scale" delay={0.8} duration={0.8}>
                  <div className="bg-deepSpace/50 border border-starWhite/10 rounded-xl p-4 md:p-8 backdrop-blur-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      {/* Image Section */}
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${funFacts[currentFact].color} rounded-xl opacity-20 blur-xl`}></div>
                        <div className="relative bg-deepSpace/80 border border-starWhite/20 rounded-xl p-4 backdrop-blur-sm">
                          <div className="aspect-square relative overflow-hidden rounded-lg">
                            <img 
                              src={funFacts[currentFact].image}
                              alt={funFacts[currentFact].text}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-deepSpace/60 via-transparent to-transparent"></div>
                            <div className="absolute top-4 right-4 text-4xl animate-bounce">
                              {funFacts[currentFact].emoji}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Text Section */}
                      <div className="text-center md:text-left">
                        <div className="text-6xl mb-4 animate-pulse">
                          {funFacts[currentFact].icon}
                        </div>
                        <div className="text-lg md:text-xl font-semibold text-white mb-4 leading-relaxed">
                          {funFacts[currentFact].text}
                        </div>
                        <div className="flex justify-center md:justify-start gap-2">
                          {funFacts.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentFact(index)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentFact 
                                  ? `bg-gradient-to-r ${funFacts[currentFact].color} scale-125 shadow-lg` 
                                  : 'bg-gray-600 hover:bg-gray-500'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>

        {/* Timeline */}
        <ScrollAnimation direction="up" delay={0.1} duration={0.4}>
          <div className="mb-16">
            <ScrollAnimation direction="scale" delay={0.4} duration={0.8}>
              <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
                {t('about.journey')}
              </h3>
            </ScrollAnimation>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-nebulaPink to-cosmicBlue rounded-full"></div>
              <StaggerAnimation staggerDelay={0.1} direction="up">
                {timeline.map((item, index) => (
                  <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-deepSpace/50 border border-starWhite/10 rounded-xl p-6 backdrop-blur-sm hover:border-starWhite/20 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-nebulaPink">{item.icon}</div>
                          <span className="text-sm font-semibold text-nebulaPink">{item.year}</span>
                        </div>
                        <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                        <p className="text-gray-300 text-sm">{item.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-nebulaPink rounded-full border-4 border-deepSpace"></div>
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </StaggerAnimation>
            </div>
          </div>
        </ScrollAnimation>

        {/* Hobbies */}
        <ScrollAnimation direction="up" delay={0.1} duration={0.4}>
          <div className="mb-16">
            <ScrollAnimation direction="scale" delay={0.4} duration={0.8}>
              <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
                {t('about.hobbies')}
              </h3>
            </ScrollAnimation>
            <StaggerAnimation staggerDelay={0.05} direction="up">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {hobbies.map((hobby, index) => (
                  <div
                    key={index}
                    className="bg-deepSpace/50 border border-starWhite/10 rounded-xl p-6 backdrop-blur-sm hover:border-starWhite/20 transition-all duration-300 group cursor-pointer"
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${hobby.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                      {hobby.icon}
                    </div>
                    <h4 className="text-center font-semibold text-gray-300">{hobby.name}</h4>
                  </div>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </ScrollAnimation>

        {/* Testimonials */}
        <ScrollAnimation direction="up" delay={0.1} duration={0.4}>
          <div className="mb-16">
            <ScrollAnimation direction="scale" delay={0.4} duration={0.8}>
              <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
                {t('about.testimonials')}
              </h3>
            </ScrollAnimation>
            <StaggerAnimation staggerDelay={0.05} direction="up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-deepSpace/50 border border-starWhite/10 rounded-xl p-6 backdrop-blur-sm hover:border-starWhite/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-nebulaPink mb-4" />
                    <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-nebulaPink/30 hover:border-nebulaPink/60 transition-all duration-300">
                        <img 
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </StaggerAnimation>
          </div>
        </ScrollAnimation>


      </div>
    </section>
  );
};

export default EnhancedAbout;
