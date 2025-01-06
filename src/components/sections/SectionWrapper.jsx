import React, { useState } from 'react';
import { useThree } from '@react-three/fiber';
import PortalEffect from '../effects/PortalEffect';

const SectionWrapper = ({ children, isActive, onTransitionComplete }) => {
  const [transitioning, setTransitioning] = useState(false);
  const { camera } = useThree();

  const handleTransition = () => {
    setTransitioning(true);
    // Animate camera moving through portal
    camera.position.z -= 5;
    onTransitionComplete?.();
  };

  return (
    <group>
      {children}
      <PortalEffect
        active={isActive}
        progress={transitioning ? 1 : 0}
        onTransitionComplete={handleTransition}
      />
    </group>
  );
};

export default SectionWrapper;