import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Zap, Database } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header
      className="glassmorphism p-4 rounded-lg mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        <motion.div 
          className="flex items-center mb-4 md:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Zap className="h-8 w-8 text-blood-red mr-2" />
          <h1 className="font-sans font-bold text-2xl tracking-wider glow-text-red">
            REVENANT <span className="text-white">AI</span>
          </h1>
        </motion.div>
        
        <motion.div 
          className="flex space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-center text-sm">
            <Terminal className="h-4 w-4 text-blood-red mr-1" />
            <span className="text-gray-400">SYSTEM</span>
            <span className="ml-2 text-blood-red">ACTIVE</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Shield className="h-4 w-4 text-blood-red mr-1" />
            <span className="text-gray-400">SECURITY</span>
            <span className="ml-2 text-blood-red">ONLINE</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Database className="h-4 w-4 text-blood-red mr-1" />
            <span className="text-gray-400">MEMORY</span>
            <span className="ml-2 text-blood-red">OPTIMAL</span>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;