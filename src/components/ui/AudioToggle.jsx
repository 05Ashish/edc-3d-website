import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useAudioManager } from '../../systems/AudioManager';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 180, 216, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(0, 180, 216, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 180, 216, 0); }
`;

const AudioButton = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #00B4D8;
  color: #00B4D8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: none;
  z-index: 1000;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(0, 180, 216, 0.1), transparent);
    transform: translateX(-100%);
  }

  &:hover {
    transform: scale(1.1);
    animation: ${pulse} 1.5s infinite;

    &::before {
      transform: translateX(100%);
      transition: transform 0.6s ease;
    }
  }
`;

const VolumeIcon = styled.div`
  position: relative;
  width: 15px;
  height: 15px;

  &::before,
  &::after {
    content: '';
    position: absolute;
  }

  &::before {
    left: 0;
    top: 50%;
    width: 8px;
    height: 8px;
    background: #00B4D8;
    transform: translateY(-50%);
    clip-path: polygon(0 0, 40% 0, 100% 50%, 40% 100%, 0 100%);
  }

  ${({ $isMuted }) => !$isMuted && `
    &::after {
      right: 0;
      top: 50%;
      width: 10px;
      height: 10px;
      border: 2px solid #00B4D8;
      border-left: none;
      border-radius: 0 50% 50% 0;
      transform: translateY(-50%);
    }
  `}
`;

const AudioToggle = () => {
  const { toggleMute, isMuted } = useAudioManager();

  return (
    <AudioButton
      onClick={toggleMute}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <VolumeIcon $isMuted={isMuted} />
    </AudioButton>
  );
};

export default AudioToggle; 