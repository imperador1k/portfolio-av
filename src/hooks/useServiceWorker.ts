import { useEffect, useState } from 'react';

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isOnline: boolean;
  registration: ServiceWorkerRegistration | null;
}

export const useServiceWorker = () => {
  const [swState, setSwState] = useState<ServiceWorkerState>({
    isSupported: 'serviceWorker' in navigator,
    isRegistered: false,
    isOnline: navigator.onLine,
    registration: null
  });

  useEffect(() => {
    if (!swState.isSupported) return;

    // Register service worker
    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });

        setSwState(prev => ({
          ...prev,
          isRegistered: true,
          registration
        }));

        console.log('Service Worker registered:', registration);

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content available
                console.log('New content available, please refresh');
                // You can show a notification to the user here
              }
            });
          }
        });

      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    };

    registerSW();

    // Handle online/offline events
    const handleOnline = () => setSwState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setSwState(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Handle service worker messages
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'CACHE_UPDATED') {
        console.log('Cache updated:', event.data);
      }
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, [swState.isSupported]);

  // Preload critical resources
  const preloadResources = async (urls: string[]) => {
    if (!swState.registration) return;

    try {
      const cache = await caches.open('portfolio-static-v1.0.0');
      await cache.addAll(urls);
      console.log('Resources preloaded:', urls);
    } catch (error) {
      console.error('Preload failed:', error);
    }
  };

  // Update cache with new resources
  const updateCache = async (urls: string[]) => {
    if (!swState.registration) return;

    try {
      swState.registration.active?.postMessage({
        type: 'CACHE_URLS',
        urls
      });
    } catch (error) {
      console.error('Cache update failed:', error);
    }
  };

  // Clear all caches
  const clearCache = async () => {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('All caches cleared');
    } catch (error) {
      console.error('Cache clear failed:', error);
    }
  };

  return {
    ...swState,
    preloadResources,
    updateCache,
    clearCache
  };
};

export default useServiceWorker;
