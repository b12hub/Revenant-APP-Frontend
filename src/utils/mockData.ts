import { LogEntry, Command, StatusMetric } from '../types';

export const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 60000 * 5),
    message: 'Agent initialization sequence started',
    type: 'info',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 60000 * 4),
    message: 'Neural network parameters loaded',
    type: 'success',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 60000 * 3),
    message: 'WARNING: Anomaly detected in sector 7',
    type: 'warning',
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 60000 * 2),
    message: 'Running system diagnostics...',
    type: 'info',
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 60000),
    message: 'ERROR: Failed to establish secure connection',
    type: 'error',
  },
  {
    id: '6',
    timestamp: new Date(),
    message: 'Agent is now online and operational',
    type: 'success',
  },
];

export const mockCommands: Command[] = [
  {
    id: '1',
    text: 'analyze threat_vector --deep',
    timestamp: new Date(Date.now() - 60000 * 30),
    status: 'completed',
  },
  {
    id: '2',
    text: 'deploy countermeasures --target="sector_7"',
    timestamp: new Date(Date.now() - 60000 * 20),
    status: 'completed',
  },
  {
    id: '3',
    text: 'scan network --verbose',
    timestamp: new Date(Date.now() - 60000 * 10),
    status: 'failed',
  },
];

export const mockMetrics: StatusMetric[] = [
  {
    id: '1',
    name: 'Processing Power',
    value: 78,
    max: 100,
    color: '#00CFFF', // Electric Blue
  },
  {
    id: '2',
    name: 'Memory Allocation',
    value: 45,
    max: 100,
    color: '#A020F0', // Vivid Purple
  },
  {
    id: '3',
    name: 'Network Integrity',
    value: 92,
    max: 100,
    color: '#00E676', // Neon Green
  },
  {
    id: '4',
    name: 'Threat Level',
    value: 23,
    max: 100,
    color: '#FF1744', // Blood Red
  },
];