// 速度测试结果基础接口
export interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  timestamp: Date;
  jitter?: number;
}

// 历史数据接口，继承自SpeedTestResult并添加id
export interface HistoricalData extends SpeedTestResult {
  id: string;
}

// 测试状态枚举
export type TestStatus = 'idle' | 'testing-ping' | 'testing-download' | 'testing-upload' | 'completed';

// 速度评级类型
export type SpeedRating = 'poor' | 'fair' | 'good' | 'excellent';

// Blog related types
export interface BlogPost {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: 'Cloudflare' | 'Google Cloud';
  guid?: string;
}

export interface RSSFeed {
  title: string;
  description: string;
  link: string;
  items: BlogPost[];
}