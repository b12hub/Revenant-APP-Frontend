import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { StatusMetric } from '../types';
import { mockMetrics } from '../utils/mockData';

const MetricBar: React.FC<{ metric: StatusMetric }> = ({ metric }) => {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-gray-300 font-mono">{metric.name}</span>
        <span className="text-xs text-gray-300 font-mono">{metric.value}%</span>
      </div>
      <div className="h-2 bg-dark-matter-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: metric.color }}
          initial={{ width: 0 }}
          animate={{ width: `${metric.value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const StatusMetrics: React.FC = () => {
  const [metrics] = React.useState<StatusMetric[]>(mockMetrics);
  
  return (
    <motion.div 
      className="glassmorphism rounded-lg p-4 w-full max-w-4xl mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
    >
      <div className="flex items-center mb-3">
        <Activity className="h-5 w-5 mr-2 text-electric-blue" />
        <h2 className="font-sans text-lg font-medium tracking-wider">System Status</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <MetricBar key={metric.id} metric={metric} />
        ))}
      </div>
    </motion.div>
  );
};

export default StatusMetrics;