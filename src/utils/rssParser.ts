import { BlogPost, RSSFeed } from '../types';

/**
 * Parse RSS XML content to extract blog posts
 */
function parseRSSXML(xmlText: string, source: 'Cloudflare' | 'Google Cloud'): RSSFeed {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  
  // Extract feed metadata
  const title = xmlDoc.querySelector('channel > title')?.textContent || '';
  const description = xmlDoc.querySelector('channel > description')?.textContent || '';
  const link = xmlDoc.querySelector('channel > link')?.textContent || '';
  
  // Extract items
  const items = Array.from(xmlDoc.querySelectorAll('item')).map(item => {
    const title = item.querySelector('title')?.textContent || '';
    const description = cleanDescription(item.querySelector('description')?.textContent || '');
    const link = item.querySelector('link')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';
    const guid = item.querySelector('guid')?.textContent || '';
    
    return {
      title: cleanTitle(title),
      description,
      link,
      pubDate,
      source,
      guid
    } as BlogPost;
  });
  
  return {
    title,
    description,
    link,
    items
  };
}

/**
 * Clean HTML tags and decode entities from description
 */
function cleanDescription(description: string): string {
  // Remove HTML tags
  const cleaned = description.replace(/<[^>]*>/g, '');
  // Decode HTML entities
  const textArea = document.createElement('textarea');
  textArea.innerHTML = cleaned;
  // Truncate to reasonable length
  const result = textArea.value.substring(0, 200);
  return result.endsWith('...') ? result : result + '...';
}

/**
 * Clean title from CDATA and other unwanted content
 */
function cleanTitle(title: string): string {
  // Remove CDATA wrapper
  return title.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
}

/**
 * Provide mock Cloudflare data for development/fallback
 */
function getMockCloudflareData(): BlogPost[] {
  return [
    {
      title: "Building a more secure and private Internet",
      description: "Cloudflare's mission is to help build a better Internet. Learn about our latest security and privacy initiatives that protect millions of websites...",
      link: "https://blog.cloudflare.com/building-secure-private-internet",
      pubDate: new Date().toISOString(),
      source: 'Cloudflare' as const,
      guid: "mock-cf-1"
    },
    {
      title: "How we're improving network performance globally",
      description: "Our global network spans over 300 cities, delivering content closer to users. Discover the latest improvements to our infrastructure...",
      link: "https://blog.cloudflare.com/network-performance-improvements",
      pubDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      source: 'Cloudflare' as const,
      guid: "mock-cf-2"
    }
  ];
}



/**
 * Fetch and parse Cloudflare Blog RSS using Vercel API endpoint
 */
export async function fetchCloudflareRSS(): Promise<BlogPost[]> {
  const sources = [
    // Try our Vercel API endpoint first (no CORS issues)
    '/api/rss',
    // Fallback to proxy services
    'https://api.allorigins.win/get?url=' + encodeURIComponent('https://blog.cloudflare.com/rss/'),
    'https://corsproxy.io/?' + encodeURIComponent('https://blog.cloudflare.com/rss/')
  ];
  
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    try {
      console.log(`Trying RSS source ${i + 1}/${sources.length}: ${source.substring(0, 50)}...`);
      
      const response = await fetch(source, {
        headers: {
          'Accept': 'application/rss+xml, application/xml, text/xml, text/plain, */*',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const textContent = await response.text();
      let xmlContent = '';
      
      // Handle different response formats
      if (source.startsWith('/api/')) {
        // Our API endpoint returns direct XML
        xmlContent = textContent;
      } else {
        // Proxy services might return JSON-wrapped content
        try {
          const jsonData = JSON.parse(textContent);
          xmlContent = jsonData.contents || textContent;
        } catch {
          xmlContent = textContent;
        }
      }
      
      // Parse XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
      
      if (xmlDoc.querySelector('parsererror')) {
        console.warn(`XML parsing failed for source ${i + 1}. Content preview:`, xmlContent.substring(0, 200));
        throw new Error('XML parsing failed');
      }
      
      const items = Array.from(xmlDoc.querySelectorAll('item')).slice(0, 15);
      
      if (items.length > 0) {
        console.log(`✅ Successfully fetched ${items.length} items from Cloudflare RSS via source ${i + 1}`);
        return items.map(item => ({
          title: cleanTitle(item.querySelector('title')?.textContent || ''),
          description: cleanDescription(item.querySelector('description')?.textContent || ''),
          link: item.querySelector('link')?.textContent || '',
          pubDate: item.querySelector('pubDate')?.textContent || '',
          source: 'Cloudflare' as const,
          guid: item.querySelector('guid')?.textContent || ''
        }));
      }
    } catch (error) {
      console.warn(`❌ RSS source ${i + 1} failed:`, error);
      if (i === sources.length - 1) {
        // All sources failed
        console.warn('All Cloudflare RSS sources failed, using mock data');
        return getMockCloudflareData();
      }
    }
  }
  
  return getMockCloudflareData();
}



/**
 * Fetch all blog posts from Cloudflare
 */
export async function fetchAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const cloudflareData = await fetchCloudflareRSS();
    
    // Sort by publication date (newest first)
    return cloudflareData.sort((a, b) => 
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
} 