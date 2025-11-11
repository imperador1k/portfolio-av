import React, { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import useDeviceOptimization from '../hooks/useDeviceOptimization';
import type { Variants } from 'framer-motion';

interface StaggerAnimationProps {
  children: React.ReactNode;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  once?: boolean;
}

const StaggerAnimation: React.FC<StaggerAnimationProps> = ({
  children,
  staggerDelay = 0.1, // Increased delay for lighter feel
  direction = 'up',
  className = '',
  once = true // Changed to true to reduce re-animations
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });
  const deviceCapabilities = useDeviceOptimization();

  // Memoize device-aware stagger delay
  const effectiveStaggerDelay = useMemo(() => {
    // Reduce stagger effect on mobile or low-end devices
    if (deviceCapabilities.isMobile || deviceCapabilities.isLowEndDevice) {
      return Math.min(staggerDelay * 3, 0.2); // Even slower on mobile
    }
    return staggerDelay;
  }, [staggerDelay, deviceCapabilities.isMobile, deviceCapabilities.isLowEndDevice]);

  // Much simpler and lighter variants
  const containerVariants: Variants = useMemo(() => ({
    hidden: { opacity: 1 }, // Start visible but with children hidden
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: effectiveStaggerDelay,
        delayChildren: 0.05,
      },
    },
  }), [effectiveStaggerDelay]);

  const itemVariants: Variants = useMemo(() => {
    const distance = deviceCapabilities.isMobile ? 15 : 25; // Reduced distance
    
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
        transition: {
          duration: deviceCapabilities.isMobile ? 0.2 : 0.3, // Faster animations
          ease: "easeOut",
        },
      },
    };
  }, [direction, deviceCapabilities.isMobile]);

  // Disable entirely on very low-end devices
  if (deviceCapabilities.isLowEndDevice) {
    return <div className={className}>{children}</div>;
  }

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