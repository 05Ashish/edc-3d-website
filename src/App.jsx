import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import { Howl } from 'howler'
import { Loader } from '@react-three/drei';
import LoadingScreen from './components/ui/LoadingScreen';
import Experience from './components/Experience';
import EntryScreen from './components/ui/EntryScreen';
import BSODTransition from './components/ui/BSODTransition';
import { useAudioManager } from './systems/AudioManager';

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

  const handleEntryClick = () => {
    audioManager.playSound('transition');
    setScreen('bsod');
  };

  const handleBSODComplete = () => {
    audioManager.playSound('transition');
    setScreen('loading');
  };

  useEffect(() => {
    const handleLoadingComplete = () => {
      audioManager.initAudio();
      setScreen('experience');
    };

    window.addEventListener('loadingComplete', handleLoadingComplete);

    return () => {
      window.removeEventListener('loadingComplete', handleLoadingComplete);
    };
  }, [audioManager]);

  return (
    <AppContainer>
      {screen === 'entry' && (
        <EntryScreen 
          onEnter={handleEntryClick} 
        />
      )}
      
      {screen === 'bsod' && (
        <BSODTransition 
          onTransitionEnd={handleBSODComplete}
        />
      )}
      
      {screen === 'loading' && (
        <LoadingScreen />
      )}
      
      {screen === 'experience' && (
        <>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance',
            }}
          >
            <Suspense fallback={null}>
              <Experience />
            </Suspense>
          </Canvas>
          <Loader />
        </>
      )}
    </AppContainer>
  );
}

export default App;