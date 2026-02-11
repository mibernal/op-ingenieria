// vite.config.ts — PRODUCTION READY (ColombiaHosting / Apache / www.opingenieria.com)
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
    // ✅ Para dominio raíz (www.opingenieria.com)
    base: "/",

    server: {
      host: "0.0.0.0",
      port: 8080,
      hmr: { overlay: false },
    },

    plugins: [
      react(),

      ViteImageOptimizer({
        jpg: { quality: 80 },
        png: { quality: 80 },
        webp: { quality: 80 },
        avif: { quality: 70 },
        svg: {
          plugins: [
            // Si necesitas preservar viewBox, ajusta preset-default con overrides
            { name: "preset-default" } as PluginConfig,
          ],
        },
      }),

      VitePWA({
        registerType: "autoUpdate",
        // Asegúrate de que estos archivos EXISTAN en /public
        includeAssets: [
          "favicon.ico",
          "favicon.svg",
          "apple-touch-icon.png",
          "favicon-16x16.png",
          "favicon-32x32.png",
          "favicon-192x192.png",
          "pwa-192x192.png",
          "pwa-512x512.png",
        ],
        manifest: {
          name: "O&P Ingeniería - Catálogo Profesional",
          short_name: "O&P Catálogo",
          theme_color: "#1e3a8a",
          background_color: "#ffffff",
          display: "standalone",

          // ✅ Para dominio raíz
          start_url: "/",
          scope: "/",

          // ✅ Rutas absolutas evitan problemas en producción
          icons: [
            { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
            { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
          ],
        },
      }),

      isAnalyze &&
        visualizer({
          open: true,
          filename: "dist/bundle-analysis.html",
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),

    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
      dedupe: ["react", "react-dom"],
    },

    build: {
      target: "es2022",
      // ✅ esbuild suele ser más estable que terser para evitar edge cases
      minify: isProduction ? "esbuild" : false,

      cssMinify: isProduction,
      sourcemap: isProduction ? false : true,

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) return "vendor";
            if (id.includes("/src/modules/catalog")) return "catalog";
            return undefined;
          },
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
        },
      },

      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
    },

    optimizeDeps: {
      force: true,
    },
  };
});
