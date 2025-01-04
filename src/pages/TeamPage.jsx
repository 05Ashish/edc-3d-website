import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const TeamPage = () => {
  return (
    <div className="team-page">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Text position={[0, 0, 0]} fontSize={1} color="#00B4D8">
          Our Team
        </Text>
      </Canvas>
      <h1>Team</h1>
    </div>
  );
};

export default TeamPage;