import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, GradientTexture, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

interface GlowingOrbProps {
  isHovered: boolean;
}

const GlowingOrb: React.FC<GlowingOrbProps> = ({ isHovered }) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (sphereRef.current) {
      const time = clock.getElapsedTime();
      const baseSpeed = isHovered ? 1.2 : 0.3;
      
      // Enhanced rotation animation
      sphereRef.current.rotation.x = Math.sin(time * 0.4) * 0.3;
      sphereRef.current.rotation.y = time * baseSpeed;
      sphereRef.current.rotation.z = Math.cos(time * 0.3) * 0.2;
      
      // Add floating motion
      sphereRef.current.position.y = Math.sin(time * 0.8) * 0.1;
    }
  });

  return (
    <motion.group
      animate={{
        scale: isHovered ? 1.2 : 1,
        rotateY: isHovered ? Math.PI * 4 : 0,
      }}
      transition={{
        scale: { duration: 0.8, ease: "easeInOut" },
        rotateY: { duration: 2, ease: "easeInOut" }
      }}
    >
      {/* Core Sphere */}
      <Sphere ref={sphereRef} args={[1, 128, 128]}>
        <MeshDistortMaterial
          distort={isHovered ? 0.8 : 0.4}
          speed={isHovered ? 8 : 3}
          roughness={0.2}
          metalness={0.9}
        >
          <GradientTexture
            stops={[0, 0.2, 0.4, 0.6, 1]}
            colors={isHovered ? 
              ['#FF1744', '#FF4081', '#FF80AB', '#FF1744', '#FF1744'] : 
              ['#00CFFF', '#0091FF', '#00B0FF', '#00E5FF', '#00CFFF']
            }
            size={256}
          />
        </MeshDistortMaterial>
      </Sphere>
      
      {/* Inner glow */}
      <Sphere args={[0.95, 64, 64]}>
        <meshBasicMaterial
          color={isHovered ? "#FF1744" : "#00CFFF"}
          transparent
          opacity={0.1}
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere args={[1.3, 64, 64]}>
        <meshBasicMaterial
          color={isHovered ? "#FF1744" : "#00CFFF"}
          transparent
          opacity={0.05}
        />
      </Sphere>
      
      {/* Particle system */}
      <points>
        <sphereGeometry args={[1.5, 32, 32]} />
        <pointsMaterial
          size={0.02}
          color={isHovered ? "#FF1744" : "#00CFFF"}
          transparent
          opacity={0.4}
        />
      </points>
    </motion.group>
  );
};

export default GlowingOrb;