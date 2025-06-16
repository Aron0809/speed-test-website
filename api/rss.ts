import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 只允许 GET 请求
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 获取 Cloudflare RSS
    const rssUrl = 'https://blog.cloudflare.com/rss/';
    
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'SpeedPulse-Bot/1.0',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xmlContent = await response.text();

    // 设置正确的 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/xml');

    // 返回原始 XML
    res.status(200).send(xmlContent);
  } catch (error) {
    console.error('Error fetching RSS:', error);
    res.status(500).json({ 
      error: 'Failed to fetch RSS feed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 