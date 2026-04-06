import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'template/[name].[hash].js',
        chunkFileNames: 'template/[name].[hash].js',
        assetFileNames: 'template/[name].[hash].[ext]'
      }
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
    proxy: {
      '/api': {
        target: env.VITE_SITE_URL || "/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
      '/assets': {
        target: env.VITE_SITE_URL || "/",
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "~": resolve(__dirname, "./assets"),
    },
  },
}
});
