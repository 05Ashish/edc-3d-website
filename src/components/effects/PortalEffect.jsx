import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Custom shader for the portal effect
const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uIntensity: 2.0,
    uColorStart: new THREE.Color('#ff1b1b'),
    uColorEnd: new THREE.Color('#ff69b4')
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform float uProgress;
    uniform float uIntensity;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    varying vec2 vUv;

    void main() {
      // Create circular portal effect
      vec2 center = vec2(0.5, 0.5);
      float dist = length(vUv - center);
      
      // Ring effect
      float ring = smoothstep(0.4, 0.5, dist) * smoothstep(0.6, 0.5, dist);
      
      // Animated glow
      float glow = sin(uTime * 2.0) * 0.5 + 0.5;
      ring *= 1.0 + glow * 0.5;
      
      // Color gradient
      vec3 color = mix(uColorStart, uColorEnd, ring);
      
      // Add some noise/sparkle effect
      float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
      float sparkle = step(0.98, noise) * sin(uTime * 10.0) * ring;
      
      // Combine effects
      float alpha = ring * uIntensity + sparkle;
      gl_FragColor = vec4(color, alpha * uProgress);
    }
  `
);

// Extend Three.js materials with our custom material
extend({ PortalMaterial });

const PortalEffect = ({ active = false, progress = 0, onTransitionComplete }) => {
  const portalRef = useRef();
  const materialRef = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (materialRef.current) {
      timeRef.current += delta;
      materialRef.current.uTime = timeRef.current;
      materialRef.current.uProgress = THREE.MathUtils.lerp(
        materialRef.current.uProgress,
        active ? 1 : 0,
        0.05
      );

      // Rotate the portal
      portalRef.current.rotation.z += delta * 0.2;
      
      // Scale effect based on progress
      const scale = 1 + progress * 0.2;
      portalRef.current.scale.set(scale, scale, 1);

      // Check if transition is complete
      if (active && materialRef.current.uProgress > 0.95) {
        onTransitionComplete?.();
      }
    }
  });

  return (
    <mesh
      ref={portalRef}
      position={[0, 0, -1]}
    >
      <ringGeometry args={[5, 7, 64]} />
      <portalMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      
      {/* Inner glow */}
      <mesh position={[0, 0, -0.1]}>
        <ringGeometry args={[4.8, 7.2, 64]} />
        <meshBasicMaterial
          color="#ff1b1b"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Particles around the portal */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={new Float32Array(3000).map(() => (Math.random() - 0.5) * 10)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#ff69b4"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </mesh>
  );
};

export default PortalEffect;