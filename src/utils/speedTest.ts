// 测试配置常量
const FILE_SIZE = 5 * 1024 * 1024; // 测试文件大小：5MB
const TEST_DURATION = 10000; // 测试持续时间：10秒
const PING_SAMPLES = 5; // ping测试次数
const UPDATE_INTERVAL = 200; // 进度更新间隔：200ms
const CHUNK_SIZE = 256 * 1024; // 上传块大小：256KB

// 速度评级阈值
const SPEED_THRESHOLDS = {
  POOR: 5,
  FAIR: 15,
  GOOD: 40
} as const;

/**
 * 生成测试用的随机数据
 */
const generateTestData = (size: number): ArrayBuffer => {
  const buffer = new ArrayBuffer(size);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < size; i++) {
    view[i] = Math.floor(Math.random() * 256);
  }
  return buffer;
};

/**
 * 通过发送小型请求到服务器来测量ping值
 */
export const measurePing = async (): Promise<{ ping: number; jitter: number }> => {
  const pings: number[] = [];
  
  for (let i = 0; i < PING_SAMPLES; i++) {
    const start = performance.now();
    
    // Add a cache-busting parameter
    await fetch(`https://www.cloudflare.com/cdn-cgi/trace?t=${Date.now()}`, {
      method: 'GET',
      cache: 'no-store',
    });
    
    const end = performance.now();
    pings.push(end - start);
    
    // 在ping测量之间短暂延迟
    await new Promise(resolve => setTimeout(resolve, UPDATE_INTERVAL));
  }
  
  // Calculate average ping
  const avgPing = pings.reduce((sum, time) => sum + time, 0) / pings.length;
  
  // Calculate jitter (average deviation)
  const jitter = pings.reduce((sum, time) => sum + Math.abs(time - avgPing), 0) / pings.length;
  
  return { ping: Math.round(avgPing), jitter: Math.round(jitter) };
};

/**
 * 通过计时下载来测量下载速度
 */
export const measureDownloadSpeed = async (onProgress?: (speed: number) => void): Promise<number> => {
  const testFile = `https://speed.cloudflare.com/__down?bytes=${FILE_SIZE}&ckSize=1048576`;
  
  const startTime = performance.now();
  const endTime = startTime + TEST_DURATION;
  let bytesLoaded = 0;
  let lastUpdateTime = startTime;
  let lastUpdateBytes = 0;
  
  const samples: number[] = [];
  
  try {
    const response = await fetch(testFile, { cache: 'no-store' });
    const reader = response.body?.getReader();
    
    if (!reader) {
      throw new Error('Failed to initialize download test');
    }
    
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      
      const now = performance.now();
      
      if (done || now >= endTime) {
        break;
      }
      
      if (value) {
        bytesLoaded += value.length;
        
        // 最多每秒更新5次
        if (now - lastUpdateTime > UPDATE_INTERVAL) {
          const intervalSeconds = (now - lastUpdateTime) / 1000;
          const intervalBytes = bytesLoaded - lastUpdateBytes;
          const currentSpeed = (intervalBytes * 8) / intervalSeconds / 1000000; // Mbps
          
          samples.push(currentSpeed);
          
          if (onProgress) {
            onProgress(currentSpeed);
          }
          
          lastUpdateTime = now;
          lastUpdateBytes = bytesLoaded;
        }
      }
    }
  } catch (error) {
    console.error('Download test failed:', error);
    return 0;
  }
  
  // Return the average speed, excluding the lowest and highest values if we have enough samples
  if (samples.length > 4) {
    const sortedSamples = [...samples].sort((a, b) => a - b);
    const trimmedSamples = sortedSamples.slice(1, sortedSamples.length - 1);
    return trimmedSamples.reduce((sum, speed) => sum + speed, 0) / trimmedSamples.length;
  }
  
  return samples.reduce((sum, speed) => sum + speed, 0) / Math.max(1, samples.length);
};

/**
 * 通过发送数据到服务器来测量上传速度
 */
export const measureUploadSpeed = async (onProgress?: (speed: number) => void): Promise<number> => {
  const uploadUrl = 'https://speed.cloudflare.com/__up';
  const testData = generateTestData(FILE_SIZE);
  
  const samples: number[] = [];
  const startTime = performance.now();
  const endTime = startTime + TEST_DURATION;
  
  let bytesUploaded = 0;
  let lastUpdateTime = startTime;
  let lastUpdateBytes = 0;
  
  try {
    // 分块上传以模拟连续上传
    const chunkSize = CHUNK_SIZE;
    
    while (performance.now() < endTime) {
      const chunk = testData.slice(0, chunkSize);
      const blob = new Blob([chunk]);
      
      const uploadStart = performance.now();
      
      await fetch(uploadUrl, {
        method: 'POST',
        body: blob,
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });
      
      const now = performance.now();
      bytesUploaded += chunkSize;
      
      // 最多每秒更新5次
      if (now - lastUpdateTime > UPDATE_INTERVAL) {
        const intervalSeconds = (now - lastUpdateTime) / 1000;
        const intervalBytes = bytesUploaded - lastUpdateBytes;
        const currentSpeed = (intervalBytes * 8) / intervalSeconds / 1000000; // Mbps
        
        samples.push(currentSpeed);
        
        if (onProgress) {
          onProgress(currentSpeed);
        }
        
        lastUpdateTime = now;
        lastUpdateBytes = bytesUploaded;
      }
      
      if (now >= endTime) break;
      
      // Add small delay between chunks
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  } catch (error) {
    console.error('Upload test failed:', error);
    return 0;
  }
  
  // Return the average speed, excluding the lowest and highest values if we have enough samples
  if (samples.length > 4) {
    const sortedSamples = [...samples].sort((a, b) => a - b);
    const trimmedSamples = sortedSamples.slice(1, sortedSamples.length - 1);
    return trimmedSamples.reduce((sum, speed) => sum + speed, 0) / trimmedSamples.length;
  }
  
  return samples.reduce((sum, speed) => sum + speed, 0) / Math.max(1, samples.length);
};

/**
 * 格式化速度值，显示合适的单位
 */
export const formatSpeed = (speedMbps: number): string => {
  if (speedMbps >= 1) {
    return `${speedMbps.toFixed(2)} Mbps`;
  } else {
    const speedKbps = speedMbps * 1000;
    return `${speedKbps.toFixed(2)} Kbps`;
  }
};

import { SpeedRating } from '../types';

/**
 * 根据速度获取定性评级
 */
export const getSpeedRating = (speedMbps: number): SpeedRating => {
  if (speedMbps < SPEED_THRESHOLDS.POOR) return 'poor';
  if (speedMbps < SPEED_THRESHOLDS.FAIR) return 'fair';
  if (speedMbps < SPEED_THRESHOLDS.GOOD) return 'good';
  return 'excellent';
};

/**
 * 根据速度评级获取对应颜色
 */
export const getSpeedColor = (rating: SpeedRating): string => {
  switch (rating) {
    case 'poor': return '#EF4444'; // red
    case 'fair': return '#F59E0B'; // amber
    case 'good': return '#10B981'; // green
    case 'excellent': return '#3B82F6'; // blue
    default: return '#3B82F6';
  }
};