import { useTranslation } from 'react-i18next';
import { Download, Award } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

const DownloadCV = () => {
  const { t } = useTranslation();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Miguel_Santos_CV.pdf';
    link.download = 'Miguel_Santos_CV.pdf';
    link.click();
  };

  return (
    <section id="download-cv" className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <ScrollAnimation direction="up" delay={0.1} duration={0.4}>
          <div className="text-center">
            <ScrollAnimation direction="scale" delay={0.4} duration={0.8}>
              <div className="bg-deepSpace/50 border border-starWhite/10 rounded-xl p-8 backdrop-blur-sm inline-block">
                <ScrollAnimation direction="scale" delay={0.6} duration={0.8}>
                  <Award className="w-12 h-12 text-nebulaPink mx-auto mb-4" />
                </ScrollAnimation>
                <ScrollAnimation direction="up" delay={0.4} duration={0.4}>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-nebulaPink to-cosmicBlue text-transparent bg-clip-text">
                    {t('about.downloadCV')}
                  </h2>
                </ScrollAnimation>
                <ScrollAnimation direction="up" delay={0.5} duration={0.4}>
                  <p className="text-gray-300 mb-6 max-w-md mx-auto">
                    Get a detailed overview of my skills, experience, and projects in a professional format
                  </p>
                </ScrollAnimation>
                <ScrollAnimation direction="scale" delay={1.2} duration={0.8}>
                  <button 
                    onClick={handleDownload}
                    className="bg-gradient-to-r from-nebulaPink to-cosmicBlue text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto hover:scale-105 transform transition-transform duration-300"
                  >
                    <Download className="w-5 h-5" />
                    {t('about.cvButton')}
                  </button>
                </ScrollAnimation>
              </div>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default DownloadCV;
