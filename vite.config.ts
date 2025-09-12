// vite.config.ts
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv, ProxyOptions } from "vite";

export default defineConfig(({ mode }) => {
    // Đọc biến môi trường VITE_* từ .env.* theo mode
    const env = loadEnv(mode, process.cwd(), "");
    const backendUrl = env.VITE_BACKEND_URL || "http://localhost:8080";

    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        server: {
            port: 3000,
            proxy: {
                "/api": {
                    target: backendUrl,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (p) => p.replace(/^\/api/, ""),
                    configure: (proxy) => {
                        proxy.on("proxyReq", (proxyReq) => {
                            try {
                                proxyReq.removeHeader("origin");
                            } catch {}
                        });
                    },
                } as ProxyOptions,
            },
        },
    };
});
