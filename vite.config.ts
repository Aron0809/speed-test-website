import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/', // 确保使用根路径
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    // 确保静态资源正确引用
    assetsDir: 'assets',
    // 生成更清晰的源码映射，有助于调试
    sourcemap: true,
    // Rollup选项
    rollupOptions: {
      output: {
        // 确保代码分割符合预期
        manualChunks: undefined,
        // 添加这些配置，确保资源路径正确
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      },
    },
  },
});
