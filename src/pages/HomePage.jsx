import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import MAITEDCLogo from '../components/3d/MAITEDCLogo';

const HomePage = () => {
  return (
    <div className="home-page">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <MAITEDCLogo position={[0, 0, 0]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
      <h1>Welcome to EDC MAIT</h1>
    </div>
  );
};

export default HomePage;