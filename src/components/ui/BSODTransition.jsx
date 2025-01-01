// src/components/ui/BSODTransition.jsx
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

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

const screenShake = keyframes`
  0% { transform: translate(0); }
  25% { transform: translate(5px, -5px); }
  50% { transform: translate(-5px, 5px); }
  75% { transform: translate(-5px, -5px); }
  100% { transform: translate(0); }
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

const Container = styled.div`
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

const ProgressBar = styled.div.attrs(props => ({
    style: {
      '--progress': `${props.$progress}%`
    }
  }))`
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
      width: var(--progress);
      background: #00ff00;
      transition: width 0.2s ease;
    }
`;

const BSODTransition = ({ onTransitionEnd }) => {
  const [progress, setProgress] = useState(0);
  const [errorCode, setErrorCode] = useState('0x00000000');

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onTransitionEnd(), 500);
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
  }, [onTransitionEnd]);

  return (
    <Container>
      <ErrorTitle>SYSTEM_CRITICAL_FAILURE</ErrorTitle>
      <ErrorMessage>Error Code: {errorCode}</ErrorMessage>
      <ErrorMessage>MEMORY_MANAGEMENT_ERROR</ErrorMessage>
      <ErrorMessage>SYSTEM_THREAD_EXCEPTION_NOT_HANDLED</ErrorMessage>
      <ErrorMessage>IRQL_NOT_LESS_OR_EQUAL</ErrorMessage>
      <ErrorMessage>ATTEMPTING_EMERGENCY_OVERRIDE...</ErrorMessage>
      <ErrorMessage>BYPASSING_SECURITY_PROTOCOLS...</ErrorMessage>
      <ProgressBar $progress={progress} />
      <ErrorMessage>System Recovery: {progress}% Complete</ErrorMessage>
    </Container>
  );
};

export default BSODTransition;