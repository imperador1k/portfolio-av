import { useState, useEffect } from 'react';

interface DeviceCapabilities {
  isMobile: boolean;
  isLowEndDevice: boolean;
  connectionType: string;
  hardwareConcurrency: number;
  memory: number;
  enableAnimations: boolean;
  enableHeavyAnimations: boolean;
  imageQuality: number;
  preloadImages: boolean;
  reducedMotion: boolean;
}

export const useDeviceOptimization = () => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isLowEndDevice: false,
    connectionType: 'unknown',
    hardwareConcurrency: 4,
    memory: 1073741824,
    enableAnimations: true,
    enableHeavyAnimations: true,
    imageQuality: 80,
    preloadImages: true,
    reducedMotion: false,
  });

  useEffect(() => {
    const detectCapabilities = () => {
      // Device detection
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isTablet = /iPad|Android(?=.*Mobile)/i.test(navigator.userAgent);
      
      // Connection detection
      const connection = (navigator as any).connection;
      const connectionType = connection?.effectiveType || 'unknown';
      const isSlowConnection = connectionType === 'slow-2g' || connectionType === '2g';
      
      // Hardware detection
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const memory = (performance as any).memory?.jsHeapSizeLimit || 1073741824;
      const isLowEndHardware = hardwareConcurrency <= 2 || memory < 1073741824;
      
      // Reduced motion preference
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Battery API (if available)
      const isLowBattery = (navigator as any).getBattery?.().then((battery: any) => 
        battery.level < 0.2 || battery.charging === false
      ).catch(() => false);
      
      // Determine capabilities
      const isLowEndDevice = isMobile || isLowEndHardware || isSlowConnection;
      
      const newCapabilities: DeviceCapabilities = {
        isMobile,
        isLowEndDevice,
        connectionType,
        hardwareConcurrency,
        memory,
        enableAnimations: !reducedMotion && !isSlowConnection,
        enableHeavyAnimations: !reducedMotion && !isLowEndDevice && !isMobile,
        imageQuality: isMobile ? 60 : (isLowEndDevice ? 70 : 80),
        preloadImages: !isSlowConnection && !isMobile,
        reducedMotion,
      };

      setCapabilities(newCapabilities);
      
      // Log for debugging
      console.log('Device capabilities detected:', {
        device: isMobile ? 'mobile' : 'desktop',
        connection: connectionType,
        cores: hardwareConcurrency,
        memory: Math.round(memory / 1024 / 1024) + 'MB',
        animations: newCapabilities.enableAnimations ? 'enabled' : 'disabled',
        heavyAnimations: newCapabilities.enableHeavyAnimations ? 'enabled' : 'disabled',
        imageQuality: newCapabilities.imageQuality + '%',
        preload: newCapabilities.preloadImages ? 'enabled' : 'disabled'
      });
    };

    detectCapabilities();

    // Listen for connection changes
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', detectCapabilities);
    }

    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', detectCapabilities);

    return () => {
      if (connection) {
        connection.removeEventListener('change', detectCapabilities);
      }
      mediaQuery.removeEventListener('change', detectCapabilities);
    };
  }, []);

  return capabilities;
};

export default useDeviceOptimization;
