import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send } from 'lucide-react';
import { Command } from '../types';
import { mockCommands } from '../utils/mockData';

const CommandTerminal: React.FC = () => {
  const [commands, setCommands] = useState<Command[]>(mockCommands);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Autofocus the input when component mounts
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 1000);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim()) {
      const newCommand: Command = {
        id: Date.now().toString(),
        text: inputValue,
        timestamp: new Date(),
        status: 'processing',
      };
      
      setCommands([...commands, newCommand]);
      setInputValue('');
      
      // Simulate command processing
      setTimeout(() => {
        setCommands(prevCommands => 
          prevCommands.map(cmd => 
            cmd.id === newCommand.id 
              ? { ...cmd, status: Math.random() > 0.2 ? 'completed' : 'failed' } 
              : cmd
          )
        );
      }, 2000);
    }
  };
  
  return (
    <motion.div
      className="glassmorphism rounded-lg p-4 w-full max-w-4xl mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <div className="flex items-center mb-3">
        <Terminal className="h-5 w-5 mr-2 text-electric-blue" />
        <h2 className="font-sans text-lg font-medium tracking-wider">Command Interface</h2>
      </div>
      
      <div className="mb-4 max-h-32 overflow-y-auto terminal-text text-sm space-y-1 pb-2">
        {commands.map((cmd) => (
          <div key={cmd.id} className="flex items-start">
            <div className="mr-2 text-gray-500 font-mono text-xs pt-0.5">
              {cmd.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="flex-1">
              <span className="text-white">$ {cmd.text}</span>
              {cmd.status === 'processing' && (
                <span className="ml-2 text-electric-blue animate-pulse">processing...</span>
              )}
              {cmd.status === 'completed' && (
                <span className="ml-2 text-neon-green">✓ complete</span>
              )}
              {cmd.status === 'failed' && (
                <span className="ml-2 text-blood-red">✗ failed</span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="relative">
        <div 
          className={`
            border rounded-md transition-all duration-300 
            ${isFocused 
              ? 'border-electric-blue shadow-neon-blue' 
              : 'border-gray-700'
            }
          `}
        >
          <div className="flex items-center">
            <span className="text-electric-blue pl-3 font-mono">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Type command..."
              className="bg-transparent py-2 px-2 w-full focus:outline-none font-mono text-white"
            />
            <button 
              type="submit" 
              className="bg-dark-matter-700 hover:bg-dark-matter-600 rounded-r-md p-2 transition-colors"
              disabled={!inputValue.trim()}
            >
              <Send className={`h-5 w-5 ${inputValue.trim() ? 'text-electric-blue' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default CommandTerminal;