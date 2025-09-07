import { useEffect, useRef, useState } from 'react';

const MeteorShower = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Performance detection
    const isLowEndDevice = () => {
      const connection = (navigator as any).connection;
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const memory = (performance as any).memory?.jsHeapSizeLimit || 1073741824;
      
      return (
        connection?.effectiveType === 'slow-2g' ||
        connection?.effectiveType === '2g' ||
        hardwareConcurrency <= 2 ||
        memory < 1073741824
      );
    };

    // Object pool for meteors
    const meteorPool: HTMLDivElement[] = [];
    const activeMeteors: HTMLDivElement[] = [];
    const maxMeteors = isLowEndDevice() ? 3 : 8;

    // Pre-create meteor elements
    for (let i = 0; i < maxMeteors; i++) {
      const meteor = document.createElement('div');
      meteor.className = 'meteor';
      meteor.style.cssText = `
        position: absolute;
        width: 2px;
        height: 100px;
        transform: rotate(45deg);
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.1s ease;
      `;
      meteorPool.push(meteor);
      container.appendChild(meteor);
    }

    const createMeteor = () => {
      if (meteorPool.length === 0 || activeMeteors.length >= maxMeteors) return;

      const meteor = meteorPool.pop()!;
      activeMeteors.push(meteor);
      
      // Random position and size
      const startX = Math.random() * window.innerWidth;
      const startY = -50;
      const size = Math.random() * 2 + 1;
      
      meteor.style.cssText = `
        position: absolute;
        left: ${startX}px;
        top: ${startY}px;
        width: ${size}px;
        height: ${size * 50}px;
        transform: rotate(45deg);
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%);
        animation: meteor 1s linear forwards;
        pointer-events: none;
        opacity: 1;
      `;
      
      // Return meteor to pool after animation
      setTimeout(() => {
        meteor.style.opacity = '0';
        setTimeout(() => {
          const index = activeMeteors.indexOf(meteor);
          if (index > -1) {
            activeMeteors.splice(index, 1);
            meteorPool.push(meteor);
          }
        }, 100);
      }, 1000);
    };

    // Create meteors periodically with reduced frequency on low-end devices
    const interval = setInterval(() => {
      if (isVisible && Math.random() < (isLowEndDevice() ? 0.15 : 0.3)) {
        createMeteor();
      }
    }, isLowEndDevice() ? 1000 : 500);

    // Visibility observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      clearInterval(interval);
      observer.disconnect();
      // Clean up meteors
      meteorPool.forEach(meteor => meteor.remove());
      activeMeteors.forEach(meteor => meteor.remove());
    };
  }, [isVisible]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    />
  );
};

export default MeteorShower;