import React from 'react';

const MeteorShower = () => {
  // Static meteors for better performance
  const staticMeteors = [
    { id: 1, x: '15%', y: '20%', size: '2px', length: '80px', opacity: 0.6 },
    { id: 2, x: '75%', y: '35%', size: '1px', length: '60px', opacity: 0.4 },
    { id: 3, x: '45%', y: '60%', size: '3px', length: '100px', opacity: 0.8 },
    { id: 4, x: '85%', y: '70%', size: '1.5px', length: '70px', opacity: 0.5 },
    { id: 5, x: '25%', y: '80%', size: '2.5px', length: '90px', opacity: 0.7 },
    { id: 6, x: '65%', y: '15%', size: '1px', length: '50px', opacity: 0.3 },
    { id: 7, x: '35%', y: '45%', size: '2px', length: '75px', opacity: 0.6 },
    { id: 8, x: '90%', y: '25%', size: '1.5px', length: '65px', opacity: 0.4 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {staticMeteors.map((meteor) => (
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
            willChange: 'auto', // No animation, so no need for will-change
          }}
        />
      ))}
    </div>
  );
};

export default MeteorShower;