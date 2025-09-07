import React from 'react';

interface PerformanceFallbackProps {
  height?: string;
  className?: string;
}

const PerformanceFallback: React.FC<PerformanceFallbackProps> = ({ 
  height = 'h-32', 
  className = '' 
}) => {
  return (
    <div className={`animate-pulse bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg ${height} ${className}`}>
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default PerformanceFallback;
