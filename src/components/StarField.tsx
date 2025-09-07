import { useEffect, useRef, useState } from 'react';

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Enhanced performance detection
    const getDeviceCapabilities = () => {
      const connection = (navigator as any).connection;
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const memory = (performance as any).memory?.jsHeapSizeLimit || 1073741824;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isLowEndConnection = connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';
      const isLowEndHardware = hardwareConcurrency <= 2 || memory < 1073741824;
      
      return {
        isMobile,
        isLowEndDevice: isLowEndConnection || isLowEndHardware || isMobile,
        starCount: isMobile ? 50 : (isLowEndHardware ? 100 : 150),
        fps: isMobile ? 20 : (isLowEndHardware ? 30 : 60),
        enableAnimations: !isLowEndConnection && !isMobile
      };
    };

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const deviceCapabilities = getDeviceCapabilities();
    const stars: { x: number; y: number; z: number; size: number }[] = [];
    const numStars = deviceCapabilities.starCount;
    const maxDepth = 1000;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * maxDepth,
        size: 1 + Math.random()
      });
    }

    let animationFrame: number;
    let lastTime = 0;
    const targetFPS = deviceCapabilities.fps;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        ctx.fillStyle = 'rgba(3, 0, 20, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        stars.forEach(star => {
          star.z -= 0.5;

          if (star.z <= 0) {
            star.z = maxDepth;
            star.x = (Math.random() - 0.5) * canvas.width * 2;
            star.y = (Math.random() - 0.5) * canvas.height * 2;
          }

          const scale = maxDepth / (maxDepth + star.z);
          const x = centerX + star.x * scale;
          const y = centerY + star.y * scale;

          const opacity = Math.min(1, (maxDepth - star.z) / maxDepth);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, star.size * scale, 0, Math.PI * 2);
          ctx.fill();
        });

        lastTime = currentTime;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    // Start animation only when visible and device can handle it
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && deviceCapabilities.enableAnimations) {
          animate(0);
        } else {
          cancelAnimationFrame(animationFrame);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, #030014, #0F0728)' }}
    />
  );
};

export default StarField;