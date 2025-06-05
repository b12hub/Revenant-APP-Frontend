export interface LogEntry {
  id: string;
  timestamp: Date;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface Command {
  id: string;
  text: string;
  timestamp: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface StatusMetric {
  id: string;
  name: string;
  value: number;
  max: number;
  color: string;
}