// vite.config.js
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3000, // 👈 Thêm dòng này để cố định cổng
        proxy: {
            "/api": {
                target: process.env.VITE_BACKEND_URL || "http://localhost:8080",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
                configure: (proxy) => {
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
