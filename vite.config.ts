// vite.config.ts — PRODUCTION READY + GitHub Pages (op-ingenieria)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { VitePWA } from "vite-plugin-pwa";
import type { PluginConfig } from "svgo";

const GH_PAGES_REPO = "op-ingenieria";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  const isAnalyze = mode === "analyze";

  return {
    base: isProduction ? `/${GH_PAGES_REPO}/` : "/",

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
            { name: "preset-default" } as PluginConfig,
            // Nota: para preservar viewBox, en svgo normalmente se configura así:
            // { name: "preset-default", params: { overrides: { removeViewBox: false } } }
            // Pero depende de versión; si no te da problemas, déjalo como está.
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
          start_url: ".", // GH Pages friendly
          scope: ".", // GH Pages friendly
          icons: [
            { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
            { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
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
      // Si necesitas terserOptions sí o sí, puedes volver a "terser".
      minify: isProduction ? "esbuild" : false,

      cssMinify: isProduction,
      sourcemap: isProduction ? false : true,

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) return "vendor";
            // separa solo lo realmente pesado; evita ciclos TDZ entre módulos de app
            if (id.includes("/src/modules/catalog")) return "catalog";
            return undefined;
          },
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
        },
      },

      // Si vuelves a terser, puedes reactivar esto:
      // terserOptions: {
      //   compress: { drop_console: isProduction, drop_debugger: isProduction },
      // },

      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
    },

    optimizeDeps: {
      force: true,
    },
  };
});
