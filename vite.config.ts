import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: "/",
  server: {
    host: "::",
    port: 8081,
    proxy: {
      '/sso/api': {
        target: 'http://localhost:8089',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sso/, ''),
      },
      '/api': {
        target: 'http://localhost:8015',
        changeOrigin: true,
      }
    }
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
