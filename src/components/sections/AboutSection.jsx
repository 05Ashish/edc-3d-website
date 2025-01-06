import React, { useRef } from 'react'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { animated, useSpring } from '@react-spring/three'

const AboutCard = ({ position, title, content, scale = 1.2 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.position.y += Math.sin(time + position[0]) * 0.001
  })

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial
          color="#00B4D8"
          emissive="#00B4D8"
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      <Text
        position={[0, 0.5, 0.1]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
      >
        {title}
      </Text>

      <Text
        position={[0, -0.2, 0.1]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
      >
        {content}
      </Text>
    </group>
  )
}

const AboutSection = ({ onClose, scale = 1.2, position = [0, 0, -2] }) => {
  const groupRef = useRef()

  const [springs] = useSpring(() => ({
    from: { scale: 0, opacity: 0 },
    to: { scale: scale, opacity: 1 },
    config: { duration: 500 }
  }))

  const cards = [
    {
      title: "Our Vision",
      content: "Fostering innovation and entrepreneurship in the next generation of leaders.",
      position: [-6, 1, 0]
    },
    {
      title: "Our Mission",
      content: "Creating a vibrant ecosystem for startups and innovators to thrive.",
      position: [0, 1, 0]
    },
    {
      title: "Our Values",
      content: "Innovation, Collaboration, Excellence, and Impact.",
      position: [6, 1, 0]
    }
  ]

  return (
    <animated.group
      ref={groupRef}
      position={position}
      {...springs}
    >
      <Text
        position={[0, 4, 0]}
        fontSize={0.7}
        color="#00B4D8"
        anchorX="center"
        anchorY="middle"
      >
        About EDC MAIT
      </Text>

      {cards.map((card, index) => (
        <AboutCard
          key={index}
          {...card}
          scale={1.2}
        />
      ))}

      <Text
        position={[0, -3, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={10}
      >
        The Entrepreneurship Development Cell of MAIT is a student-run organization
        that aims to foster the spirit of entrepreneurship among students.
      </Text>
    </animated.group>
  )
}

export default AboutSection