// EntryScreen.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const EntryContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const Title = styled.h1`
  color: #00B4D8;
  font-size: 4rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(0, 180, 216, 0.5);
  text-align: center;
  
  span {
    display: block;
    font-size: 2rem;
    margin-top: 1rem;
    animation: ${blink} 1.5s linear infinite;
  }
`;

const EntryButton = styled.button`
  background: transparent;
  border: 2px solid #00B4D8;
  color: #00B4D8;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${pulse} 2s infinite ease-in-out;

  &:hover {
    background: #00B4D8;
    color: #000000;
    box-shadow: 0 0 20px rgba(0, 180, 216, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(45deg);
    transition: all 0.3s ease;
  }

  &:hover::before {
    transform: rotate(45deg) translateY(100%);
  }
`;

const EntryScreen = ({ onEnter }) => {
  const handleClick = () => {
    // Create and play a silent audio to initialize audio context
    const audio = new Audio();
    audio.play().catch(() => {});
    
    // Call the onEnter callback
    onEnter();
  };

  return (
    <EntryContainer>
      <Title>
        EDC MAIT
        <span>Click to Enter</span>
      </Title>
      <EntryButton onClick={handleClick}>
        Enter The Entrepreneur Experience
      </EntryButton>
    </EntryContainer>
  );
};

export default EntryScreen;