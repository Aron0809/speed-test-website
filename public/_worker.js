export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 静态资源处理
    if (url.pathname.startsWith('/assets/')) {
      // 尝试从KV存储或资源目录获取资产
      return env.ASSETS.fetch(request);
    }
    
    // 对于其他路径，默认返回index.html
    // 这样可以支持SPA应用的客户端路由
    if (!url.pathname.includes('.')) {
      return env.ASSETS.fetch(`${url.origin}/index.html`);
    }
    
    // 处理正常的静态文件请求
    return env.ASSETS.fetch(request);
  },
}; 