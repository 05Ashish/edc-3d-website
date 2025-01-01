// EntryScreen.jsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

const matrixRain = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const glitch = keyframes`
  0% {
    clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
    transform: translate(-10px);
  }
  20% {
    clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
    transform: translate(-10px);
  }
  40% {
    clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
    transform: translate(10px);
  }
  60% {
    clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
    transform: translate(-5px);
  }
  80% {
    clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
    transform: translate(5px);
  }
  100% {
    clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
    transform: translate(-10px);
  }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const flicker = keyframes`
  0% { opacity: 0.1; }
  2% { opacity: 1; }
  8% { opacity: 0.1; }
  9% { opacity: 1; }
  12% { opacity: 0.1; }
  20% { opacity: 1; }
  25% { opacity: 0.3; }
  30% { opacity: 1; }
  70% { opacity: 0.7; }
  72% { opacity: 0.2; }
  77% { opacity: 0.9; }
  100% { opacity: 0.9; }
`;

const bsodGlitch = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-20px); }
  40% { transform: translateX(20px); }
  60% { transform: translateX(-15px); }
  80% { transform: translateX(15px); }
  100% { transform: translateX(0); }
`;

const screenShake = keyframes`
  0% { transform: translate(0); }
  25% { transform: translate(5px, -5px); }
  50% { transform: translate(-5px, 5px); }
  75% { transform: translate(-5px, -5px); }
  100% { transform: translate(0); }
`;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Cyberpunk';
    src: url('src/assets/fonts/cyberpunk.woff') format('woff');
  }
`;

const MatrixRain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  
  &::before {
    content: '';
    position: absolute;
    top: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(0, 180, 216, 0.1) 50%,
      transparent 100%
    );
    animation: ${matrixRain} 5s linear infinite;
  }
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
  overflow: hidden;
  font-family: 'Cyberpunk', sans-serif;
  transition: opacity 0.5s ease;
  opacity: ${props => props.$fading ? 0 : 1};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 8px;
    background: rgba(0, 180, 216, 0.1);
    animation: ${scanline} 6s linear infinite;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.15) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }
`;

const Title = styled.h1`
  color: #00B4D8;
  font-size: 6rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 20px rgba(0, 180, 216, 0.8);
  text-align: center;
  position: relative;
  animation: ${flicker} 4s linear infinite;
  
  &::before,
  &::after {
    content: 'EDC MAIT';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }

  &::before {
    color: #ff0000;
    animation: ${glitch} 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
    animation-delay: 0.1s;
  }

  &::after {
    color: #0000ff;
    animation: ${glitch} 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite reverse;
    animation-delay: 0.2s;
  }

  span {
    display: block;
    font-size: 2rem;
    margin-top: 1rem;
    text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
    animation: ${flicker} 2s linear infinite;
  }
`;

const EntryButton = styled.button`
  background: transparent;
  border: 2px solid #00B4D8;
  color: #00B4D8;
  padding: 1.5rem 3rem;
  font-size: 1.8rem;
  font-family: 'Cyberpunk', sans-serif;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 4px;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: rgba(0, 180, 216, 0.1);
    transform: rotate(45deg);
    transition: all 0.3s ease;
  }

  &:hover {
    background: rgba(0, 180, 216, 0.1);
    color: #ffffff;
    box-shadow: 
      0 0 20px rgba(0, 180, 216, 0.5),
      0 0 40px rgba(0, 180, 216, 0.3),
      0 0 60px rgba(0, 180, 216, 0.1);
    text-shadow: 0 0 10px rgba(0, 180, 216, 1);
    border-color: #ffffff;
  }

  &:hover::before {
    transform: rotate(45deg) translateY(100%);
  }
`;

const BSODContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #0078D7;
  color: white;
  font-family: "Segoe UI", monospace;
  z-index: 2001;
  overflow: hidden;
  animation: ${screenShake} 0.2s infinite;
  display: flex;
  flex-direction: column;
  padding: 50px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    animation: ${bsodGlitch} 0.3s infinite;
  }
`;

const ErrorTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 2rem;
  animation: ${glitch} 0.3s infinite;
  text-shadow: 2px 2px #ff0000, -2px -2px #0000ff;
`;

const ErrorMessage = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: monospace;
  animation: ${flicker} 2s infinite;
`;

const ProgressBar = styled.div`
  width: 50%;
  height: 30px;
  background: #004b87;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: #00ff00;
    transition: width 0.2s ease;
  }
`;

const EntryScreen = ({ onEnter }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showBSOD, setShowBSOD] = useState(false);
  const [glitchText, setGlitchText] = useState('INITIALIZE SYSTEM');
  const [bsodProgress, setBsodProgress] = useState(0);
  const [errorCode, setErrorCode] = useState('0x00000000');

  useEffect(() => {
    const texts = [
      'INITIALIZE SYSTEM',
      'BREACH PROTOCOL',
      'ACCESS MAINFRAME',
      'ENTER THE VOID'
    ];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setGlitchText(texts[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showBSOD) {
      const progressInterval = setInterval(() => {
        setBsodProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => onEnter(), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      const errorInterval = setInterval(() => {
        setErrorCode('0x' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase());
      }, 100);

      return () => {
        clearInterval(progressInterval);
        clearInterval(errorInterval);
      };
    }
  }, [showBSOD, onEnter]);

  const handleClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowBSOD(true);
    }, 1000);
  };

  if (showBSOD) {
    return (
      <BSODContainer>
        <ErrorTitle>SYSTEM_CRITICAL_FAILURE</ErrorTitle>
        <ErrorMessage>Error Code: {errorCode}</ErrorMessage>
        <ErrorMessage>MEMORY_MANAGEMENT_ERROR</ErrorMessage>
        <ErrorMessage>SYSTEM_THREAD_EXCEPTION_NOT_HANDLED</ErrorMessage>
        <ErrorMessage>IRQL_NOT_LESS_OR_EQUAL</ErrorMessage>
        <ErrorMessage>ATTEMPTING_EMERGENCY_OVERRIDE...</ErrorMessage>
        <ErrorMessage>BYPASSING_SECURITY_PROTOCOLS...</ErrorMessage>
        <ProgressBar progress={bsodProgress} />
        <ErrorMessage>System Recovery: {bsodProgress}% Complete</ErrorMessage>
      </BSODContainer>
    );
  }

  return (
    <>
      <GlobalStyle />
      <EntryContainer $fading={isTransitioning}>
        <MatrixRain />
        <Title>
          EDC MAIT
          <span>{glitchText}</span>
        </Title>
        <EntryButton onClick={handleClick}>
          Initialize Protocol
        </EntryButton>
      </EntryContainer>
    </>
  );
};

export default EntryScreen;