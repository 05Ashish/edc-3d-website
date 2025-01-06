// src/App.jsx
import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import { Loader } from '@react-three/drei';
import LoadingScreen from './components/ui/LoadingScreen';
import EntryScreen from './components/ui/EntryScreen';
import BSODTransition from './components/ui/BSODTransition';
import { useAudioManager } from './systems/AudioManager';
import Experience from './components/Experience';
import Navbar from './components/ui/Navbar';
import Cursor from './components/ui/Cursor';
import ParticleSystem from './components/effects/ParticleSystem';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
`;

function App() {
  const [screen, setScreen] = useState('entry');
  const audioManager = useAudioManager();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0, z: 0 });

  const handleEntryClick = () => {
    audioManager.playSound('transition');
    setScreen('bsod');
  };

  const handleBSODComplete = () => {
    audioManager.playSound('transition');
    setScreen('loading');
  };

  const handleLoadingComplete = useCallback(() => {
    audioManager.initAudio();
    setScreen('experience');
  }, [audioManager]);

  return (
    <AppContainer>
      <Cursor onMove={setCursorPosition} />
      {screen === 'entry' && (
        <EntryScreen onEnter={handleEntryClick} />
      )}

      {screen === 'bsod' && (
        <BSODTransition onTransitionEnd={handleBSODComplete} />
      )}

        {screen === 'loading' && (
          <LoadingScreen onEndLoading={handleLoadingComplete} />
        )}

      {screen === 'experience' && (
        <>
          <Navbar onSectionChange={(section) => {
            if (window.handleNavigation) {
              window.handleNavigation(section);
            }
          }} />
          <Suspense fallback={<div>Loading Experience...</div>}>
            <Canvas
              camera={{ position: [0, 0, 15], fov: 75 }}
              dpr={[1, 2]}
              gl={{
                antialias: true,
                alpha: false,
                powerPreference: 'high-performance',
              }}
            >
              <Suspense fallback={null}>
                <Experience />
                <ParticleSystem />
              </Suspense>
            </Canvas>
            <Loader />
          </Suspense>
        </>
      )}
    </AppContainer>
  );
}

export default App;
