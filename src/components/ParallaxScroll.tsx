import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useDeviceOptimization from '../hooks/useDeviceOptimization';

interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
  offset?: [string, string];
}

const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  offset = ['start end', 'end start']
}) => {
  const ref = useRef(null);
  const deviceCapabilities = useDeviceOptimization();

  // Memoize adjusted speed for different devices
  const adjustedSpeed = useMemo(() => {
    // Reduce parallax effect on mobile or low-end devices
    if (deviceCapabilities.isMobile || deviceCapabilities.isLowEndDevice) {
      return speed * 0.3; // Much weaker parallax on mobile
    }
    return speed;
  }, [speed, deviceCapabilities.isMobile, deviceCapabilities.isLowEndDevice]);

  const { scrollYProgress } = useScroll({
    target: ref,
    // @ts-ignore - type issue with offset
    offset
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' 
      ? [adjustedSpeed * 100, -adjustedSpeed * 100] 
      : [-adjustedSpeed * 100, adjustedSpeed * 100]
  );

  // Don't apply parallax on very low-end devices
  if (deviceCapabilities.isLowEndDevice) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxScroll;