export interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  timestamp: Date;
  jitter?: number;
}

export interface HistoricalData {
  id: string;
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  timestamp: Date;
  jitter?: number;
}

export type SpeedUnit = 'Mbps' | 'Kbps' | 'Bps';

export type TestStatus = 'idle' | 'testing-ping' | 'testing-download' | 'testing-upload' | 'completed';