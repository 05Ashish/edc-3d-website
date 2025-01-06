import React, { useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';

// Constants for cyberpunk colors
const CYBERPUNK_TEAL = '#008B8B';
const CYBERPUNK_GLOW = '#00CED1';

const EventCard = ({ position, title, date, description, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  // Calculate responsive card width
  const cardWidth = viewport.width < 10 ? 3 : 4;
  const cardHeight = viewport.width < 10 ? 1.5 : 2;

  const springProps = useSpring({
    scale: hovered ? 1.1 : 1,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y += Math.sin(time + position[0]) * 0.002;
  });

  return (
    <animated.group
      ref={meshRef}
      position={position}
      scale={springProps.scale}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <planeGeometry args={[cardWidth, cardHeight]} />
        <meshStandardMaterial
          color={CYBERPUNK_TEAL}
          emissive={CYBERPUNK_GLOW}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <Text
        position={[0, 0.5, 0.1]}
        fontSize={viewport.width < 10 ? 0.15 : 0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>

      <Text
        position={[0, 0, 0.1]}
        fontSize={viewport.width < 10 ? 0.12 : 0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {date}
      </Text>

      <Text
        position={[0, -0.4, 0.1]}
        fontSize={viewport.width < 10 ? 0.1 : 0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={cardWidth * 0.8}
      >
        {description}
      </Text>
    </animated.group>
  );
};

const EventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const groupRef = useRef();
  const { viewport } = useThree();

  // Calculate responsive spacing
  const spacing = viewport.width < 10 ? 3 : 5;
  
  const events = [
    {
      title: "Startup Weekend",
      date: "March 15-17, 2024",
      description: "48-hour intensive startup building experience",
      position: [-spacing, 1, 0]
    },
    {
      title: "Innovation Summit",
      date: "April 5, 2024",
      description: "Annual gathering of innovators and entrepreneurs",
      position: [0, 1, 0]
    },
    {
      title: "Pitch Perfect",
      date: "April 20, 2024",
      description: "Learn the art of pitching from industry experts",
      position: [spacing, 1, 0]
    }
  ];

  const springProps = useSpring({
    scale: 1,
    opacity: 1,
    from: { scale: 0, opacity: 0 },
    config: { mass: 1, tension: 280, friction: 60 }
  });

  return (
    <animated.group
      ref={groupRef}
      scale={springProps.scale}
      opacity={springProps.opacity}
    >
      <Text
        position={[0, 3, 0]}
        fontSize={viewport.width < 10 ? 0.4 : 0.5}
        color={CYBERPUNK_GLOW}
        anchorX="center"
        anchorY="middle"
      >
        Upcoming Events
      </Text>

      {events.map((event, index) => (
        <EventCard
          key={index}
          {...event}
          onClick={() => setSelectedEvent(event)}
        />
      ))}

      {selectedEvent && (
        <animated.group
          position={[0, -2, 1]}
          scale={useSpring({
            from: { scale: 0 },
            to: { scale: 1 },
            config: { mass: 1, tension: 280, friction: 60 }
          }).scale}
        >
          <mesh onClick={() => setSelectedEvent(null)}>
            <planeGeometry args={[viewport.width < 10 ? 6 : 8, viewport.width < 10 ? 3 : 4]} />
            <meshStandardMaterial
              color={CYBERPUNK_TEAL}
              emissive={CYBERPUNK_GLOW}
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.9}
            />
          </mesh>

          <Text
            position={[0, 1, 0.1]}
            fontSize={viewport.width < 10 ? 0.25 : 0.3}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {selectedEvent.title}
          </Text>

          <Text
            position={[0, 0, 0.1]}
            fontSize={viewport.width < 10 ? 0.15 : 0.2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {selectedEvent.date}
          </Text>

          <Text
            position={[0, -1, 0.1]}
            fontSize={viewport.width < 10 ? 0.12 : 0.15}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={viewport.width < 10 ? 4 : 6}
          >
            {selectedEvent.description}
          </Text>
        </animated.group>
      )}
    </animated.group>
  );
};

export default EventsSection;