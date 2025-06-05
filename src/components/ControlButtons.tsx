import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Database, Brain, Zap, Power } from 'lucide-react';

const buttonVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.5,
    },
  }),
  hover: {
    scale: 1.1,
    y: -5,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  },
};

const rippleVariants = {
  initial: { scale: 0, opacity: 0.8 },
  animate: {
    scale: 1.5,
    opacity: 0,
    transition: { duration: 0.8 }
  },
};

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  index: number;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, color, index }) => {
  const [isRippling, setIsRippling] = React.useState(false);
  
  const handleClick = () => {
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 800);
  };
  
  const glowClass = 
    color === "blue" ? "glow-border-blue" :
    color === "purple" ? "glow-border-purple" :
    color === "red" ? "border-blood-red shadow-neon-red" :
    "border-neon-green shadow-neon-green";
  
  const textClass = 
    color === "blue" ? "glow-text-blue" :
    color === "purple" ? "glow-text-purple" :
    color === "red" ? "glow-text-red" :
    "glow-text-green";
  
  return (
    <motion.div
      className="relative"
      custom={index}
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
    >
      <button className={`relative glassmorphism rounded-full w-14 h-14 flex items-center justify-center ${glowClass} cursor-pointer z-10`}>
        {icon}
      </button>
      
      {isRippling && (
        <motion.div
          className={`absolute inset-0 rounded-full border-2 ${color === "blue" ? "border-electric-blue" : color === "purple" ? "border-vivid-purple" : color === "red" ? "border-blood-red" : "border-neon-green"}`}
          variants={rippleVariants}
          initial="initial"
          animate="animate"
        />
      )}
      
      <div className="mt-2 text-center text-xs font-sans tracking-wider">
        <span className={textClass}>{label}</span>
      </div>
    </motion.div>
  );
};

const ControlButtons: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-8">
      <ActionButton 
        icon={<Brain className="h-6 w-6 text-electric-blue" />}
        label="ANALYZE"
        color="blue"
        index={0}
      />
      <ActionButton 
        icon={<Database className="h-6 w-6 text-vivid-purple" />}
        label="LEARN"
        color="purple"
        index={1}
      />
      <ActionButton 
        icon={<Play className="h-6 w-6 text-neon-green" />}
        label="EXECUTE"
        color="green"
        index={2}
      />
      <ActionButton 
        icon={<Pause className="h-6 w-6 text-blood-red" />}
        label="PAUSE"
        color="red"
        index={3}
      />
    </div>
  );
};

export default ControlButtons;