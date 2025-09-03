import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollAnimationProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.4,
  distance = 50,
  className = '',
  once = false
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  const getInitialVariant = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'fade':
        return { opacity: 0 };
      case 'scale':
        return { opacity: 0, scale: 0.8 };
      case 'rotate':
        return { opacity: 0, rotate: -10, scale: 0.9 };
      default:
        return { opacity: 0, y: distance };
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
      case 'fade':
        return { opacity: 1 };
      case 'scale':
        return { opacity: 1, scale: 1 };
      case 'rotate':
        return { opacity: 1, rotate: 0, scale: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  const variants = {
    hidden: getInitialVariant(),
    visible: {
      ...getVisibleVariant(),
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
