import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Image } from '@react-three/drei';

const GalleryPage = () => {
  return (
    <div className="gallery-page">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Image url="/path/to/image.jpg" position={[0, 0, 0]} scale={[5, 5, 1]} />
      </Canvas>
      <h1>Gallery</h1>
    </div>
  );
};

export default GalleryPage;