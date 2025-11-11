import { useMemo } from 'react';
import useDeviceOptimization from '../hooks/useDeviceOptimization';

const MeteorShower = () => {
  const deviceCapabilities = useDeviceOptimization();
  
  // Memoize meteors to prevent unnecessary re-renders
  const meteors = useMemo(() => {
    // Reduce number of meteors on mobile or low-end devices
    const meteorCount = deviceCapabilities.isMobile || deviceCapabilities.isLowEndDevice ? 4 : 6;
    
    return Array.from({ length: meteorCount }, (_, i) => ({
      id: i + 1,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${0.5 + Math.random() * 1.5}px`,
      length: `${30 + Math.random() * 40}px`,
      opacity: 0.3 + Math.random() * 0.4,
      animationDuration: `${5 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 5}s`
    }));
  }, [deviceCapabilities.isMobile, deviceCapabilities.isLowEndDevice]);

  // Don't render on very low-end devices
  if (deviceCapabilities.isLowEndDevice) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="absolute"
          style={{
            left: meteor.x,
            top: meteor.y,
            width: meteor.size,
            height: meteor.length,
            transform: 'rotate(45deg)',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)',
            opacity: meteor.opacity,
            // Only animate on devices that can handle it
            ...(deviceCapabilities.enableAnimations && {
              animation: `meteor ${meteor.animationDuration} linear ${meteor.animationDelay} infinite`,
            }),
          }}
        />
      ))}
      
      <style>
        {`
          @keyframes meteor {
            0% {
              transform: translate3d(0, 0, 0) rotate(45deg);
              opacity: 1;
            }
            100% {
              transform: translate3d(-100px, 200px, 0) rotate(45deg);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MeteorShower;