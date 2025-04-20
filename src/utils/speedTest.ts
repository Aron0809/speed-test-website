const FILE_SIZE = 5 * 1024 * 1024; // 5MB for test
const TEST_DURATION = 10000; // 10 seconds
const PING_SAMPLES = 5; // Number of ping tests to run

/**
 * Generates random data for testing upload speed
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
 * Measures ping by sending small requests to the server
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
    
    // Small delay between ping measurements
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Calculate average ping
  const avgPing = pings.reduce((sum, time) => sum + time, 0) / pings.length;
  
  // Calculate jitter (average deviation)
  const jitter = pings.reduce((sum, time) => sum + Math.abs(time - avgPing), 0) / pings.length;
  
  return { ping: Math.round(avgPing), jitter: Math.round(jitter) };
};

/**
 * Measures download speed using a timed download
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
        
        // Update at most 5 times per second
        if (now - lastUpdateTime > 200) {
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
 * Measures upload speed by sending data to the server
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
    // Upload in chunks to simulate continuous upload
    const chunkSize = 256 * 1024; // 256KB chunks
    
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
      
      // Update at most 5 times per second
      if (now - lastUpdateTime > 200) {
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
 * Format speed value with appropriate unit
 */
export const formatSpeed = (speedMbps: number): string => {
  if (speedMbps >= 1) {
    return `${speedMbps.toFixed(2)} Mbps`;
  } else {
    const speedKbps = speedMbps * 1000;
    return `${speedKbps.toFixed(2)} Kbps`;
  }
};

/**
 * Get qualitative rating based on speed
 */
export const getSpeedRating = (speedMbps: number): 'poor' | 'fair' | 'good' | 'excellent' => {
  if (speedMbps < 5) return 'poor';
  if (speedMbps < 15) return 'fair';
  if (speedMbps < 40) return 'good';
  return 'excellent';
};

/**
 * Get color based on speed rating
 */
export const getSpeedColor = (rating: 'poor' | 'fair' | 'good' | 'excellent'): string => {
  switch (rating) {
    case 'poor': return '#EF4444'; // red
    case 'fair': return '#F59E0B'; // amber
    case 'good': return '#10B981'; // green
    case 'excellent': return '#3B82F6'; // blue
    default: return '#3B82F6';
  }
};