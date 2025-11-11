import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import useDeviceOptimization from '../hooks/useDeviceOptimization';
import type { Variants } from 'framer-motion';

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
  duration = 0.3, // Reduced duration for lighter feel
  distance = 20, // Reduced distance for subtler effect
  className = '',
  once = true, // Changed to true to reduce re-animations
  reducedMotion = false
}) => {
  const ref = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const isInView = useInView(ref, { once, margin: "-50px 0px -50px 0px" }); // Reduced margin
  const controls = useAnimation();
  const deviceCapabilities = useDeviceOptimization();

  // Simplified device detection
  const shouldEnableAnimation = useMemo(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !prefersReducedMotion && !reducedMotion && deviceCapabilities.enableAnimations;
  }, [reducedMotion, deviceCapabilities.enableAnimations]);

  useEffect(() => {
    setShouldAnimate(shouldEnableAnimation);
  }, [shouldEnableAnimation]);

  useEffect(() => {
    if (isInView && shouldAnimate) {
      controls.start('visible');
    } else if (!once && shouldAnimate) {
      controls.start('hidden');
    } else if (!shouldAnimate) {
      controls.start('visible');
    }
  }, [isInView, controls, once, shouldAnimate]);

  // Much simpler and lighter variants
  const variants: Variants = useMemo(() => {
    if (!shouldAnimate) {
      return {
        hidden: { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 },
        visible: { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }
      };
    }

    const hiddenVariant = (() => {
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
          return { opacity: 0, scale: 0.95 }; // Subtler scale
        case 'rotate':
          return { opacity: 0, rotate: -3, scale: 0.98 }; // Subtler rotation
        default:
          return { opacity: 0, y: distance };
      }
    })();

    return {
      hidden: hiddenVariant,
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
        transition: {
          duration: duration,
          delay: delay,
          ease: "easeOut" // Simpler easing
        }
      }
    };
  }, [shouldAnimate, direction, distance, duration, delay]);

  // Disable animations entirely on low-end devices
  if (!shouldEnableAnimation || deviceCapabilities.isLowEndDevice) {
    return <div className={className}>{children}</div>;
  }

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