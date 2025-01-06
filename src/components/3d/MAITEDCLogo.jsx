import React, { useState } from 'react'
import { Text3D, Float, Center } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

const MAITEDCLogo = ({ position = [0, 0, 0], scale = 4 }) => {
  // Use useLoader instead of manual font loading
  const font = useLoader(FontLoader, '/fonts/helvetiker_bold.typeface.json')
  const [hovered, setHovered] = useState(false)

  if (!font) {
    return null
  }

  return (
    <group position={position} scale={scale}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Center>
          <Text3D
            font={font.data} // Important: Use font.data here
            size={1}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.01}
            bevelOffset={0}
            bevelSegments={5}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            {`EDC`}
            <meshStandardMaterial
              color={hovered ? "#ff4444" : "#ff0000"}
              emissive={hovered ? "#ff4444" : "#ff0000"}
              emissiveIntensity={hovered ? 0.5 : 0.3}
              metalness={0.8}
              roughness={0.2}
            />
          </Text3D>

          {/* Decorative rings */}
          <mesh position={[-3, 0.5, -0.1]}>
            <torusGeometry args={[0.3, 0.1, 16, 32]} />
            <meshStandardMaterial
              color="#00B4D8"
              emissive="#00B4D8"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          <mesh position={[5, 0.5, -0.1]}>
            <torusGeometry args={[0.3, 0.1, 16, 32]} />
            <meshStandardMaterial
              color="#FF0000"
              emissive="#FF0000"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Center>
      </Float>
    </group>
  )
}

export default MAITEDCLogo