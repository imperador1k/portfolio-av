// Resource preloader for critical assets
interface PreloadOptions {
  priority?: 'high' | 'low';
  crossorigin?: 'anonymous' | 'use-credentials';
  as?: 'script' | 'style' | 'image' | 'font' | 'fetch';
}

class ResourcePreloader {
  private preloadedResources = new Set<string>();
  private criticalResources: string[] = [];

  constructor() {
    this.criticalResources = [
      // Critical fonts
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
      
      // Critical images
      './freel.ico',
      
      // Critical scripts (if any)
    ];
  }

  // Preload a single resource
  preloadResource(url: string, options: PreloadOptions = {}): Promise<void> {
    if (this.preloadedResources.has(url)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = options.as || this.getResourceType(url);
      
      if (options.crossorigin) {
        link.crossOrigin = options.crossorigin;
      }

      link.onload = () => {
        this.preloadedResources.add(url);
        resolve();
      };

      link.onerror = () => {
        console.warn(`Failed to preload: ${url}`);
        reject(new Error(`Failed to preload: ${url}`));
      };

      document.head.appendChild(link);
    });
  }

  // Preload multiple resources
  async preloadResources(urls: string[], options: PreloadOptions = {}): Promise<void> {
    const promises = urls.map(url => this.preloadResource(url, options));
    await Promise.allSettled(promises);
  }

  // Preload critical resources
  async preloadCritical(): Promise<void> {
    console.log('Preloading critical resources...');
    await this.preloadResources(this.criticalResources, { priority: 'high' });
    console.log('Critical resources preloaded');
  }

  // Preload images with intersection observer
  preloadImages(images: string[]): void {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px'
    });

    images.forEach(src => {
      const img = document.createElement('img');
      img.dataset.src = src;
      img.style.display = 'none';
      document.body.appendChild(img);
      imageObserver.observe(img);
    });
  }

  // Preload fonts
  async preloadFonts(fonts: string[]): Promise<void> {
    const fontPromises = fonts.map(font => {
      return new Promise<void>((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';

        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to preload font: ${font}`));

        document.head.appendChild(link);
      });
    });

    await Promise.allSettled(fontPromises);
  }

  // Preload routes (for SPA)
  preloadRoute(route: string): void {
    // This would be used with a router like React Router
    // to preload route components
    console.log(`Preloading route: ${route}`);
  }

  // Get resource type from URL
  private getResourceType(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'js':
        return 'script';
      case 'css':
        return 'style';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'webp':
      case 'svg':
        return 'image';
      case 'woff':
      case 'woff2':
      case 'ttf':
      case 'eot':
        return 'font';
      default:
        return 'fetch';
    }
  }

  // Check if resource is preloaded
  isPreloaded(url: string): boolean {
    return this.preloadedResources.has(url);
  }

  // Get preload statistics
  getStats() {
    return {
      preloadedCount: this.preloadedResources.size,
      criticalCount: this.criticalResources.length,
      preloadedResources: Array.from(this.preloadedResources)
    };
  }
}

// Create singleton instance
export const preloader = new ResourcePreloader();

// Utility functions
export const preloadCritical = () => preloader.preloadCritical();
export const preloadImages = (images: string[]) => preloader.preloadImages(images);
export const preloadFonts = (fonts: string[]) => preloader.preloadFonts(fonts);
export const preloadResource = (url: string, options?: PreloadOptions) => 
  preloader.preloadResource(url, options);

export default preloader;
