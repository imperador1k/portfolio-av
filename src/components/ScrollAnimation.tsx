import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollAnimationProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  reducedMotion?: boolean;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.4,
  distance = 50,
  className = '',
  once = false,
  reducedMotion = false
}) => {
  const ref = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const isInView = useInView(ref, { once, margin: "0px 0px -100px 0px" });
  const controls = useAnimation();

  useEffect(() => {
    // Enhanced device detection
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const connection = (navigator as any).connection;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const memory = (performance as any).memory?.jsHeapSizeLimit || 1073741824;
    
    const isLowEndDevice = (
      connection?.effectiveType === 'slow-2g' ||
      connection?.effectiveType === '2g' ||
      hardwareConcurrency <= 2 ||
      memory < 1073741824 ||
      isMobile
    );

    setShouldAnimate(!prefersReducedMotion && !reducedMotion && !isLowEndDevice);
  }, [reducedMotion]);

  useEffect(() => {
    if (isInView && shouldAnimate) {
      controls.start('visible');
    } else if (!once && shouldAnimate) {
      controls.start('hidden');
    } else if (!shouldAnimate) {
      controls.start('visible');
    }
  }, [isInView, controls, once, shouldAnimate]);

  const getInitialVariant = () => {
    if (!shouldAnimate) {
      return { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 };
    }

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
    return { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 };
  };

  const variants = {
    hidden: getInitialVariant(),
    visible: {
      ...getVisibleVariant(),
      transition: shouldAnimate ? {
        duration: duration * (shouldAnimate ? 1 : 0.1),
        delay: shouldAnimate ? delay : 0,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      } : { duration: 0 },
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
