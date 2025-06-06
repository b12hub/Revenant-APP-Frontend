import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import OrbContainer from './components/OrbContainer';
import ControlButtons from './components/ControlButtons';
import CommandTerminal from './components/CommandTerminal';
import LogsPanel from './components/LogsPanel';
import StatusMetrics from './components/StatusMetrics';
import AuthInterface from './components/AuthInterface';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-matter-900 carbon-texture flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="glow-text-blue text-3xl font-sans font-bold tracking-widest mb-4"
          >
            REVENANT AI
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="h-1 bg-electric-blue mx-auto rounded-full"
          />
          <motion.div 
            className="text-gray-400 mt-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Initializing systems...
          </motion.div>
        </div>
      </div>
    );
  }

  // Show authentication interface if not authenticated
  if (!isAuthenticated) {
    return <AuthInterface />;
  }

  return (
    <div className="min-h-screen bg-dark-matter-900 carbon-texture overflow-x-hidden">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <main>
          <div className="flex flex-col items-center">
            <OrbContainer />
            <ControlButtons />
            <CommandTerminal />
            <LogsPanel />
            <StatusMetrics />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;