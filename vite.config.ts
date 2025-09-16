// vite.config.ts
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv, ProxyOptions } from "vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    const backendUrl = env.VITE_BACKEND_URL || "http://localhost:8080";

    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"), // alias @ → ./src
                "@components": path.resolve(__dirname, "src/components"),
                "@pages": path.resolve(__dirname, "src/pages"),
                "@utils": path.resolve(__dirname, "src/utils"),
                "@types": path.resolve(__dirname, "src/types"),
                "@assets": path.resolve(__dirname, "src/assets"),
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
        // Thêm cấu hình để cải thiện trải nghiệm development
        optimizeDeps: {
            include: ['react', 'react-dom', 'react-router-dom'],
        },
    };
});