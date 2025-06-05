import React from 'react';
import { motion } from 'framer-motion';
import { AlignLeft, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { LogEntry } from '../types';
import { mockLogs } from '../utils/mockData';

const LogsPanel: React.FC = () => {
  const [logs] = React.useState<LogEntry[]>(mockLogs);
  
  const getLogIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4 text-electric-blue" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-blood-red" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-neon-green" />;
      default:
        return <Info className="h-4 w-4 text-electric-blue" />;
    }
  };
  
  return (
    <motion.div 
      className="glassmorphism rounded-lg p-4 w-full max-w-4xl mt-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="flex items-center mb-3">
        <AlignLeft className="h-5 w-5 mr-2 text-electric-blue" />
        <h2 className="font-sans text-lg font-medium tracking-wider">System Logs</h2>
      </div>
      
      <div className="max-h-48 overflow-y-auto terminal-text text-sm pb-2 relative">
        {logs.map((log) => (
          <motion.div 
            key={log.id} 
            className="flex items-start mb-2 last:mb-0"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mr-2 text-gray-500 font-mono text-xs pt-0.5 shrink-0">
              {log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="shrink-0 mr-2 pt-0.5">
              {getLogIcon(log.type)}
            </div>
            <div 
              className={`
                ${log.type === 'info' ? 'text-electric-blue' : ''}
                ${log.type === 'warning' ? 'text-yellow-500' : ''}
                ${log.type === 'error' ? 'text-blood-red' : ''}
                ${log.type === 'success' ? 'text-neon-green' : ''}
              `}
            >
              {log.message}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="scanline"></div>
    </motion.div>
  );
};

export default LogsPanel;