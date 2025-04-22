import React, { useEffect } from 'react';
import './Tumbleweed.css'; // Add the styles in a CSS file

const Tumbleweed = () => {
  useEffect(() => {
    const handleResize = () => {
      const tumbleweed = document.querySelector('.tumbleweed');
      // if (tumbleweed) {
      //   tumbleweed.style.animation = 'none';
      //   void tumbleweed.offsetWidth; // Trigger reflow
      //   tumbleweed.style.animation = 'roll 10s linear infinite, move-across 10s linear infinite';
      // }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="tumble">
      <div className="tumbleweed"></div>
    </div>
  )
};

export default Tumbleweed;