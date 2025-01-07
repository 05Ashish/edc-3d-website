// src/components/effects/ParticleSystem.jsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSystem = ({ cursorPosition = { x: 0, y: 0, z: 0 }, count = 50000 }) => {
  const points = useRef();
  
  // Generate initial particle positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  // Store original positions for resetting
  const originalPositions = useMemo(() => particles.slice(), [particles]);

  useFrame((state) => {
    if (!points.current) return;

    const positions = points.current.geometry.attributes.position.array;

    // Update each particle position based on cursor
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Get current position
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Calculate distance to cursor (in normalized coordinates)
      const dx = x - cursorPosition.x * 10; // Scale factor for scene size
      const dy = y - cursorPosition.y * 10;
      const dz = z - (cursorPosition.z || 0);
      
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      // Repulsion force (stronger when closer)
      const force = Math.max(0, 1 - distance / 5);
      
      // Apply force
      positions[i3] += dx * force * 0.02;
      positions[i3 + 1] += dy * force * 0.02;
      positions[i3 + 2] += dz * force * 0.02;

      // Gradually return to original position
      const returnForce = 0.01;
      positions[i3] += (originalPositions[i3] - positions[i3]) * returnForce;
      positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * returnForce;
      positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * returnForce;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.005}
        color="#00B4D8"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
};

export default ParticleSystem;