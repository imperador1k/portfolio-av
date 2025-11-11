import { useEffect, useRef, useMemo } from 'react';

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Memoize device capabilities to prevent recalculating on each render
  const deviceCapabilities = useMemo(() => {
    const connection = (navigator as any).connection;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const memory = (performance as any).memory?.jsHeapSizeLimit || 1073741824;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEndConnection = connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';
    const isLowEndHardware = hardwareConcurrency <= 2 || memory < 1073741824;
    
    return {
      isMobile,
      isLowEndDevice: isLowEndConnection || isLowEndHardware || isMobile,
      starCount: isMobile ? 30 : (isLowEndHardware ? 60 : 100), // Reduced star count
      fps: isMobile ? 15 : (isLowEndHardware ? 25 : 45), // Lower FPS targets
      enableAnimations: !isLowEndConnection && !isMobile
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Use memoized device capabilities
    const stars: { x: number; y: number; z: number; size: number }[] = [];
    const numStars = deviceCapabilities.starCount;
    const maxDepth = 800; // Reduced depth for better performance

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * maxDepth,
        size: 0.5 + Math.random() * 1.5 // Smaller stars
      });
    }

    const targetFPS = deviceCapabilities.fps;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      // Throttle animation frames for better performance
      if (currentTime - lastTimeRef.current >= frameInterval) {
        // Use a more efficient clear method
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Only draw background if needed
        if (stars.length > 0) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;

          // Batch drawing operations
          ctx.fillStyle = 'white';
          
          stars.forEach(star => {
            star.z -= 0.3; // Slower movement

            if (star.z <= 0) {
              star.z = maxDepth;
              star.x = (Math.random() - 0.5) * canvas.width * 2;
              star.y = (Math.random() - 0.5) * canvas.height * 2;
            }

            const scale = maxDepth / (maxDepth + star.z);
            const x = centerX + star.x * scale;
            const y = centerY + star.y * scale;

            const opacity = Math.min(0.8, (maxDepth - star.z) / maxDepth);
            
            // Only draw visible stars
            if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
              ctx.globalAlpha = opacity;
              ctx.beginPath();
              ctx.arc(x, y, star.size * scale, 0, Math.PI * 2);
              ctx.fill();
            }
          });
          
          ctx.globalAlpha = 1;
        }
        
        lastTimeRef.current = currentTime;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation only when visible and device can handle it
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && deviceCapabilities.enableAnimations) {
          lastTimeRef.current = performance.now();
          animate(lastTimeRef.current);
        } else {
          cancelAnimationFrame(animationRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (canvas) {
      observer.observe(canvas);
    }

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
    };
  }, [deviceCapabilities]); // Add deviceCapabilities as dependency

  // Don't render on very low-end devices
  if (deviceCapabilities.isLowEndDevice) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #030014, #0F0728)' }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, #030014, #0F0728)' }}
    />
  );
};

export default StarField;