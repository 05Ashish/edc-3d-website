// src/App.jsx
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import { Howl } from 'howler';
import { Loader } from '@react-three/drei';
import LoadingScreen from './components/ui/LoadingScreen';
import EntryScreen from './components/ui/EntryScreen';
import BSODTransition from './components/ui/BSODTransition';
import { useAudioManager } from './systems/AudioManager';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import TeamPage from './pages/TeamPage';
import Navbar from './components/ui/Navbar'; // Assuming you create a Navbar

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
      <Router>
        <Navbar />
        <Routes>
          {screen === 'entry' && (
            <Route path="/" element={<EntryScreen onEnter={handleEntryClick} />} />
          )}

          {screen === 'bsod' && (
            <Route path="/" element={<BSODTransition onTransitionEnd={handleBSODComplete} />} />
          )}

          {screen === 'loading' && (
            <Route path="/" element={<LoadingScreen />} />
          )}

          {screen === 'experience' && (
            <Route path="/" element={
              <>
                <Canvas
                  camera={{ position: [0, -10, 20], fov: 80 }}
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
            } />
          )}

          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;