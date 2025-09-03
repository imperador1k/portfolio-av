import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [speed * 100, -speed * 100] : [-speed * 100, speed * 100]
  );

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

