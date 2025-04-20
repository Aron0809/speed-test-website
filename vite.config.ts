import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
      },
    },
  },
});
