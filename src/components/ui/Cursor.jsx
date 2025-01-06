import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import normalCursor from '../../assets/cursors/among-us-normal.png'; // Add your right figure image
import pointerCursor from '../../assets/cursors/among-us-pointer.png'; // Add your left figure image

const CursorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
`;

const CursorImage = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-image: url(${props => props.$isPointer ? pointerCursor : normalCursor});
  background-size: contain;
  background-repeat: no-repeat;
  transform: translate(-50%, -50%);
  transition: transform 0.15s ease-out;
  pointer-events: none;
  filter: drop-shadow(0 0 5px rgba(0, 180, 216, 0.5));
`;

const GlowEffect = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, rgba(0, 180, 216, 0.2), transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  mix-blend-mode: screen;
`;

const Cursor = ({ onMove }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Convert screen coordinates to normalized coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      setPosition({ x: e.clientX, y: e.clientY });
      onMove?.({ x, y, z: 0 });
    };

    const handlePointerCheck = (e) => {
      const targetStyle = window.getComputedStyle(e.target);
      const isClickable = targetStyle.cursor === 'pointer' || 
                         e.target.tagName === 'BUTTON' || 
                         e.target.tagName === 'A' ||
                         e.target.onclick != null;
      setIsPointer(isClickable);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handlePointerCheck);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handlePointerCheck);
    };
  }, [onMove]);

  return (
    <CursorContainer>
      <GlowEffect
        style={{
          left: position.x,
          top: position.y,
          opacity: isPointer ? 0.8 : 0.4,
        }}
      />
      <CursorImage
        $isPointer={isPointer}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.2 : 1})`,
        }}
      />
    </CursorContainer>
  );
};

export default Cursor;
