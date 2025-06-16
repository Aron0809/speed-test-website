export interface ISPInfo {
  isp: string;
  serverLocation: string;
  ip: string;
  location: string;
}

export async function getISPInfo(): Promise<ISPInfo> {
  try {
    // 使用免费的IP地理位置API获取ISP信息
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    return {
      isp: data.org || 'Unknown ISP',
      serverLocation: `${data.city || 'Unknown'}, ${data.country_name || 'Unknown'}`,
      ip: data.ip || 'Unknown',
      location: `${data.city || 'Unknown'}, ${data.region || 'Unknown'}`
    };
  } catch (error) {
    console.error('Failed to fetch ISP info:', error);
    return {
      isp: 'Unknown ISP',
      serverLocation: 'Unknown Location',
      ip: 'Unknown',
      location: 'Unknown Location'
    };
  }
} 