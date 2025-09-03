import { useState } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ScrollAnimation from './ScrollAnimation';
import ProjectModal from './ProjectModal';

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink?: string;
  codeLink?: string;
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

const ProjectCard = ({ 
  id, title, description, image, tags, liveLink, codeLink, 
  category, status, duration, teamSize, challenges, features, 
  achievements, screenshots, techStack, metrics 
}: ProjectCardProps) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle modal close with proper state reset
  const handleCloseModal = () => {
    console.log('Closing modal for project:', title);
    setIsModalOpen(false);
  };

  const projectData = {
    id,
    title,
    description,
    image,
    technologies: tags,
    githubUrl: codeLink,
    liveUrl: liveLink,
    category,
    status,
    duration,
    teamSize,
    challenges,
    features,
    achievements,
    screenshots,
    techStack,
    metrics
  };

  return (
    <>
      <ScrollAnimation direction="up" delay={0.1} duration={0.4}>
        <motion.div 
          className="group relative overflow-hidden rounded-xl bg-deepSpace/50 border border-starWhite/10 backdrop-blur-sm hover:border-starWhite/20 transition-all duration-500 cursor-pointer"
          onClick={() => {
            console.log('Opening modal for project:', title);
            setIsModalOpen(true);
          }}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="aspect-video overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-deepSpace via-transparent to-transparent z-10"></div>
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Overlay with View Details Button */}
            <div className="absolute inset-0 bg-deepSpace/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
              <motion.div
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-nebulaPink to-cosmicBlue rounded-lg text-white font-medium"
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-4 h-4" />
                <span>{t('projects.viewDetails')}</span>
              </motion.div>
            </div>
          </div>
          
          <div className="p-6 relative z-20">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-nebulaPink group-hover:to-cosmicBlue transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="text-sm px-3 py-1 rounded-full bg-deepSpace/50 text-gray-300 border border-starWhite/10"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-sm px-3 py-1 rounded-full bg-nebulaPink/10 text-nebulaPink border border-nebulaPink/20">
                  +{tags.length - 3} {t('projects.moreTags')}
                </span>
              )}
            </div>
            <div className="flex gap-4">
              {liveLink && (
                <a 
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-nebulaPink hover:text-nebulaPink/80 transition-colors group/link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4 transform group-hover/link:rotate-45 transition-transform" />
                  {t('projects.liveDemo')}
                </a>
              )}
              {codeLink && (
                <a 
                  href={codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-cosmicBlue hover:text-cosmicBlue/80 transition-colors group/link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4 transform group-hover/link:scale-110 transition-transform" />
                  {t('projects.viewCode')}
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </ScrollAnimation>

      {/* Project Modal */}
      <ProjectModal 
        key={`modal-${id}`}
        project={projectData}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProjectCard;