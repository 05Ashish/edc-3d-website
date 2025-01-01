import React, { useState, useEffect } from 'react';
import '../../styles/cursor.css'; // Custom styles for the cursor component

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="cursor-container">
      <div
        className="cursor-glow"
        style={{
          left: position.x,
          top: position.y,
        }}
      />
      <div className="cursor-coordinates">
        <span>
          X: {position.x} Y: {position.y}
        </span>
      </div>
    </div>
  );
};

export default Cursor;
