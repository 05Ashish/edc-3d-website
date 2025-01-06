import React, { useState, useRef, Suspense, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Stars, PerspectiveCamera } from '@react-three/drei';
import MAITEDCLogo from './3d/MAITEDCLogo';
import ParticleSystem from './effects/ParticleSystem';
import PortalEffect from './effects/PortalEffect';
import AboutSection from './sections/AboutSection';
import EventsSection from './sections/EventsSection';
import GallerySection from './sections/GallerySection';
import TeamSection from './sections/TeamSection';
import { useAudioManager } from '../systems/AudioManager';

const SECTIONS = {
  HOME: 'home',
  ABOUT: 'about',
  EVENTS: 'events',
  GALLERY: 'gallery',
  TEAM: 'team',
};

const Experience = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS.HOME);
  const mainGroupRef = useRef();
  const { playSound } = useAudioManager();

  // Set up the navigation handler for the navbar
  useEffect(() => {
    window.handleNavigation = (section) => {
      playSound('transition');
      setActiveSection(section);
    };

    // Cleanup
    return () => {
      window.handleNavigation = null;
    };
  }, [playSound]);

  // Floating animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mainGroupRef.current.position.y = Math.sin(time * 0.5) * 0.2;
  });

  return (
    <>
      {/* Environment Setup */}
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 15, 60]} />
      <Environment preset="night" />
      <Stars
        radius={150}
        depth={70}
        count={2500}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Main Content */}
      <group ref={mainGroupRef} scale={1.5}>
        {/* Fixed elements - only visible on HOME */}
        {activeSection === SECTIONS.HOME && (
          <>
            <MAITEDCLogo position={[0, 3, 0]} scale={1.2} />
            <ParticleSystem />
            <PortalEffect position={[0, 0, -8]} scale={1.5} />
          </>
        )}

        {/* Sections */}
        {activeSection === SECTIONS.ABOUT && (
          <AboutSection 
            onClose={() => setActiveSection(SECTIONS.HOME)} 
            scale={1.2}
            position={[0, 0, -2]}
          />
        )}

        {activeSection === SECTIONS.EVENTS && (
          <EventsSection 
            onClose={() => setActiveSection(SECTIONS.HOME)} 
            scale={1.2}
            position={[0, 0, -2]}
          />
        )}

        {activeSection === SECTIONS.GALLERY && (
          <GallerySection 
            onClose={() => setActiveSection(SECTIONS.HOME)} 
            scale={1.2}
            position={[0, 0, -2]}
          />
        )}

        {activeSection === SECTIONS.TEAM && (
          <TeamSection 
            onClose={() => setActiveSection(SECTIONS.HOME)} 
            scale={1.2}
            position={[0, 0, -2]}
          />
        )}
      </group>

      {/* Adjusted camera position */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 15]}
        fov={75}
      />

      {/* Enhanced lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} color="#00B4D8" intensity={0.7} />
    </>
  );
};

export default Experience;