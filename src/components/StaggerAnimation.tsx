import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StaggerAnimationProps {
  children: React.ReactNode;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  once?: boolean;
}

const StaggerAnimation: React.FC<StaggerAnimationProps> = ({
  children,
  staggerDelay = 0.05,
  direction = 'up',
  className = '',
  once = false
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const getInitialVariant = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 60 };
      case 'down':
        return { opacity: 0, y: -60 };
      case 'left':
        return { opacity: 0, x: 60 };
      case 'right':
        return { opacity: 0, x: -60 };
      default:
        return { opacity: 0, y: 60 };
    }
  };

  const getVisibleVariant = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: getInitialVariant(),
    visible: {
      ...getVisibleVariant(),
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggerAnimation;
