import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

/**
 * 处理所有请求的事件处理器
 */
addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    event.respondWith(new Response('内部服务器错误', { status: 500 }));
  }
});

/**
 * 处理请求的主要函数
 */
async function handleEvent(event) {
  const url = new URL(event.request.url);
  
  try {
    // 获取静态资源
    let response = await getAssetFromKV(event);
    
    // 如果是HTML文件，设置适当的缓存控制
    if (response.headers.get('content-type').includes('text/html')) {
      response = new Response(response.body, {
        ...response,
        headers: {
          ...response.headers,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      });
    } else {
      // 对于其他资源，设置较长的缓存时间
      response = new Response(response.body, {
        ...response,
        headers: {
          ...response.headers,
          'Cache-Control': 'public, max-age=31536000',
        }
      });
    }
    
    return response;
    
  } catch (e) {
    // 处理找不到资源的情况，尝试返回index.html
    // 这样SPA应用也可以正常工作
    if (e.status === 404 || e.status === 400) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
        });
        
        return new Response(notFoundResponse.body, { 
          ...notFoundResponse, 
          status: 200,
          headers: {
            ...notFoundResponse.headers,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          }
        });
      } catch (e) {
        // 如果仍然失败，返回404
        return new Response('未找到页面', { status: 404 });
      }
    }
    
    // 其他错误，返回500
    return new Response('服务器错误', { status: 500 });
  }
} 