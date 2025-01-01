// App.jsx
import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import { Loader } from '@react-three/drei';
import LoadingScreen from './components/ui/LoadingScreen';
import Experience from './components/Experience';
import EntryScreen from './components/ui/EntryScreen';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
`;

function App() {
  const [showEntryScreen, setShowEntryScreen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleLoadingComplete = () => {
      setIsLoading(false);
    };

    window.addEventListener('loadingComplete', handleLoadingComplete);
    return () => window.removeEventListener('loadingComplete', handleLoadingComplete);
  }, []);

  const handleEnter = () => {
    setShowEntryScreen(false);
    setIsLoading(true);
  };

  return (
    <AppContainer>
      {showEntryScreen && <EntryScreen onEnter={handleEnter} />}
      {isLoading && <LoadingScreen />}
      <div style={{ visibility: isLoading || showEntryScreen ? 'hidden' : 'visible', height: '100%' }}>
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
      </div>
      <Loader />
    </AppContainer>
  );
}

export default App;