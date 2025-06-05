import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import GlowingOrb from './GlowingOrb';

const OrbContainer: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="w-64 h-64 md:w-96 md:h-96 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="absolute inset-0 rounded-full bg-dark-matter-700 bg-opacity-30 backdrop-blur-lg" />
      
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight 
          position={[10, 10, 10]} 
          intensity={2} 
          color={isHovered ? "#FF1744" : "#00CFFF"} 
        />
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={1.5} 
          color={isHovered ? "#FF4081" : "#0091FF"} 
        />
        
        <Suspense fallback={null}>
          <GlowingOrb isHovered={isHovered} />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={!isHovered}
          autoRotateSpeed={1}
        />
      </Canvas>
      
      {/* Enhanced glow effect */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none transition-all duration-500"
        style={{ 
          boxShadow: `0 0 60px ${isHovered ? 40 : 20}px ${isHovered ? 'rgba(255, 23, 68, 0.3)' : 'rgba(0, 207, 255, 0.3)'}`,
          opacity: isHovered ? 1 : 0.6
        }}
      />
    </motion.div>
  );
};

export default OrbContainer;