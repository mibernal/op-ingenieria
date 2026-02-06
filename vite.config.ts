// vite.config.ts — CONFIGURACIÓN PRODUCTION READY
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { VitePWA } from "vite-plugin-pwa";
import type { PluginConfig } from "svgo";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  const isAnalyze = mode === "analyze";

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },

    plugins: [
      react(),

      // Optimización de imágenes
      ViteImageOptimizer({
        jpg: { quality: 80 },
        png: { quality: 80 },
        webp: { quality: 80 },
        avif: { quality: 70 },
        svg: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  // 🔥 CRÍTICO: mantener responsive SVG
                  removeViewBox: false,
                },
              },
            } as PluginConfig,
          ],
        },
      }),

      // PWA
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.ico", "apple-touch-icon.png"],
        manifest: {
          name: "O&P Ingeniería - Catálogo Profesional",
          short_name: "O&P Catálogo",
          theme_color: "#1e3a8a",
          background_color: "#ffffff",
          display: "standalone",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),

      // Bundle Analyzer
      isAnalyze &&
        visualizer({
          open: true,
          filename: "dist/bundle-analysis.html",
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      target: "es2022",
      minify: isProduction ? "terser" : false,
      cssMinify: isProduction,
      sourcemap: isProduction ? false : true,

      rollupOptions: {
        output: {
          manualChunks(id) {
            // Vendor splitting
            if (id.includes("node_modules")) {
              if (id.includes("react")) return "react-vendor";
              if (id.includes("@radix-ui")) return "ui-vendor";
              if (id.includes("recharts")) return "charts-vendor";
              if (id.includes("date-fns") || id.includes("zod")) return "utils-vendor";
              return "vendor";
            }

            // Feature splitting real
            if (id.includes("/src/modules/catalog")) return "catalog";
            if (id.includes("/src/modules/projects")) return "projects";
          },

          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
        },
      },

      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
      },

      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
    },

    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom", "@tanstack/react-query"],
    },
  };
});