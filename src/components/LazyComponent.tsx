import React, { Suspense, lazy, ComponentType } from 'react';

interface LazyComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  [key: string]: any;
}

const LazyComponent: React.FC<LazyComponentProps> = ({ 
  component, 
  fallback = <div className="animate-pulse bg-gray-700 rounded h-32 w-full" />,
  ...props 
}) => {
  const LazyLoadedComponent = lazy(component);

  return (
    <Suspense fallback={fallback}>
      <LazyLoadedComponent {...props} />
    </Suspense>
  );
};

export default LazyComponent;
