import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_URL || "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        // Bỏ prefix /api khi forward sang backend
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy) => {
          // Loại bỏ header Origin để backend không chặn CORS ở dev
          proxy.on("proxyReq", (proxyReq) => {
            try {
              proxyReq.removeHeader("origin");
            } catch (_) {}
          });
        },
      },
    },
  },
});
