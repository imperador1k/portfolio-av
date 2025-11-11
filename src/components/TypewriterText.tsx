import { useState, useEffect, useMemo } from 'react';
import useDeviceOptimization from '../hooks/useDeviceOptimization';

interface TypewriterTextProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = ""
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const deviceCapabilities = useDeviceOptimization();

  // Memoize adjusted speeds for different devices
  const adjustedSpeeds = useMemo(() => {
    // Slow down animations on mobile or low-end devices
    const speedMultiplier = deviceCapabilities.isMobile || deviceCapabilities.isLowEndDevice ? 1.5 : 1;
    
    return {
      typeSpeed: speed * speedMultiplier,
      deleteSpeed: deleteSpeed * speedMultiplier,
      pauseTime: pauseTime
    };
  }, [speed, deleteSpeed, pauseTime, deviceCapabilities.isMobile, deviceCapabilities.isLowEndDevice]);

  // Don't animate on very low-end devices
  if (deviceCapabilities.isLowEndDevice) {
    return (
      <span className={className}>
        {texts[0]}
        <span className="text-nebulaPink">|</span>
      </span>
    );
  }

  useEffect(() => {
    // Use adjusted speeds
    const { typeSpeed, deleteSpeed, pauseTime } = adjustedSpeeds;
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      const fullText = texts[currentTextIndex];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        
        if (currentText === fullText) {
          setIsPaused(true);
        }
      }
    }, isPaused ? pauseTime : isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [
    currentText, 
    isDeleting, 
    isPaused, 
    currentTextIndex, 
    texts, 
    adjustedSpeeds.typeSpeed, 
    adjustedSpeeds.deleteSpeed, 
    adjustedSpeeds.pauseTime
  ]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse text-nebulaPink">|</span>
    </span>
  );
};

export default TypewriterText;