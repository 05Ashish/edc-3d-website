// BSODTransition.jsx
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const glitchAnim = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
`;

const scanlineAnim = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
`;

const textGlitch = keyframes`
  0% {
    clip-path: inset(40% 0 61% 0);
  }
  20% {
    clip-path: inset(92% 0 1% 0);
  }
  40% {
    clip-path: inset(43% 0 1% 0);
  }
  60% {
    clip-path: inset(25% 0 58% 0);
  }
  80% {
    clip-path: inset(54% 0 7% 0);
  }
  100% {
    clip-path: inset(58% 0 43% 0);
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background:rgb(215, 0, 0);
  color: white;
  font-family: "Segoe UI", monospace;
  z-index: 9999;
  overflow: hidden;
  animation: ${glitchAnim} 0.2s infinite;

  &::before {
    content: "";
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

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 10%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: ${scanlineAnim} 4s linear infinite;
  }
`;

const Content = styled.div`
  padding: 10% 5%;
  position: relative;
`;

const ErrorText = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
  position: relative;
  animation: ${textGlitch} 0.3s infinite;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    color: #ff0000;
    left: 2px;
    text-shadow: -1px 0 #00ff00;
    clip: rect(44px, 450px, 56px, 0);
    animation: ${glitchAnim} 0.5s infinite linear alternate-reverse;
  }

  &::after {
    color: #00ff00;
    left: -2px;
    text-shadow: 1px 0 #ff0000;
    clip: rect(44px, 450px, 56px, 0);
    animation: ${glitchAnim} 0.7s infinite linear alternate-reverse;
  }
`;

const Code = styled.div`
  font-family: monospace;
  margin: 1rem 0;
  font-size: 1.2rem;
  color: #ddd;
`;

const ProgressText = styled.div`
  position: absolute;
  bottom: 10%;
  left: 5%;
  font-size: 1.2rem;
`;

const randomHex = () => Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

const BSODTransition = ({ onTransitionEnd }) => {
  const [progress, setProgress] = useState(0);
  const [errorCode, setErrorCode] = useState('0x00000021');
  
  useEffect(() => {
    // Change error code randomly
    const errorInterval = setInterval(() => {
      setErrorCode('0x' + randomHex().toUpperCase());
    }, 100);

    // Progress counter
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onTransitionEnd, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => {
      clearInterval(errorInterval);
      clearInterval(progressInterval);
    };
  }, [onTransitionEnd]);

  return (
    <Container>
      <Content>
        <ErrorText data-text="SYSTEM_FAILURE_DETECTED">
          SYSTEM_FAILURE_DETECTED
        </ErrorText>
        <Code>Error Code: {errorCode}</Code>
        <Code>MEMORY_MANAGEMENT_ERROR</Code>
        <Code>CRITICAL_PROCESS_DIED</Code>
        <Code>SYSTEM_THREAD_EXCEPTION_NOT_HANDLED</Code>
        <Code>IRQL_NOT_LESS_OR_EQUAL</Code>
        <Code>SYSTEM_SERVICE_EXCEPTION</Code>
        <ProgressText>
          Collecting error info... {progress}%
          {progress >= 100 && " COMPLETE"}
        </ProgressText>
      </Content>
    </Container>
  );
};

export default BSODTransition;
