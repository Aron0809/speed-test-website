import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

/**
 * 设置调试模式为true可获取更多错误信息
 */
const DEBUG = true;

/**
 * 处理所有请求的事件处理器
 */
addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      );
    }
    event.respondWith(new Response('内部服务器错误', { status: 500 }));
  }
});

/**
 * 定义html页面的缓存控制
 * @param {Response} response
 */
function htmlRewriter(response) {
  return new Response(response.body, {
    ...response,
    headers: {
      ...response.headers,
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

/**
 * 定义资源文件的缓存控制
 * @param {Response} response
 */
function assetRewriter(response) {
  return new Response(response.body, {
    ...response,
    headers: {
      ...response.headers,
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

/**
 * 处理请求的主要函数
 */
async function handleEvent(event) {
  const url = new URL(event.request.url);
  
  // 为调试输出记录请求路径
  if (DEBUG) {
    console.log(`处理请求: ${url.pathname}`);
  }
  
  try {
    // 当请求根路径或没有文件扩展名时(可能是SPA路由)
    // 直接提供index.html
    if (url.pathname === '/' || !url.pathname.includes('.')) {
      const page = await getAssetFromKV(event, {
        mapRequestToAsset: req => {
          const url = new URL(req.url);
          url.pathname = '/index.html';
          return new Request(url.toString(), req);
        },
      });
      return htmlRewriter(page);
    }
    
    // 处理常规资源请求
    const asset = await getAssetFromKV(event);
    
    // 根据资源类型确定是否使用缓存
    const contentType = asset.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      return htmlRewriter(asset);
    } else {
      return assetRewriter(asset);
    }
  } catch (e) {
    // 如果找不到请求的资源，尝试提供index.html以支持SPA路由
    if (e.status === 404 || e.status === 400) {
      try {
        // 处理SPA应用的客户端路由
        const notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => {
            const url = new URL(req.url);
            url.pathname = '/index.html';
            return new Request(url.toString(), req);
          },
        });
        
        return htmlRewriter(notFoundResponse);
      } catch (e) {
        if (DEBUG) {
          return new Response(`获取index.html失败: ${e.message}`, { status: 500 });
        }
        return new Response('页面未找到', { status: 404 });
      }
    }
    
    // 返回错误信息
    if (DEBUG) {
      return new Response(`请求处理错误: ${e.message}`, { 
        status: 500,
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8' 
        }
      });
    }
    
    return new Response('服务器错误', { status: 500 });
  }
} 