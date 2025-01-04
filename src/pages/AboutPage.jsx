import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const AboutPage = () => {
  return (
    <div className="about-page">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="blue" />
        </mesh>
        <OrbitControls />
      </Canvas>
      <h1>About Us</h1>
    </div>
  );
};

export default AboutPage;