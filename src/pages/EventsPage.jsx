import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

const EventsPage = () => {
  return (
    <div className="events-page">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Sparkles count={1000} speed={0.5} size={2} color="#00B4D8" />
      </Canvas>
      <h1>Events</h1>
    </div>
  );
};

export default EventsPage;