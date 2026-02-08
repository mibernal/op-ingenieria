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
            // ✅ en tu setup lo que quieres es NO eliminar viewBox:
            // ojo: si svgo te insiste, lo mejor es NO tocar removeViewBox aquí.
          ],
        },
      }),

      VitePWA({
        registerType: "autoUpdate",
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
          start_url: ".", // ✅ GH Pages
          scope: ".",     // ✅ GH Pages
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
      // ✅ IMPORTANTÍSIMO: evita React duplicado / createContext undefined
      dedupe: ["react", "react-dom"],
    },

    build: {
      target: "es2022",
      minify: isProduction ? "terser" : false,
      cssMinify: isProduction,
      sourcemap: isProduction ? false : true,

      rollupOptions: {
        output: {
          // ✅ simplificado y estable
          manualChunks(id) {
            if (id.includes("node_modules")) return "vendor";
            if (id.includes("/src/modules/catalog")) return "catalog";
            if (id.includes("/src/modules/projects")) return "projects";
            if (id.includes("/src/modules/clients")) return "clients";
            if (id.includes("/src/modules/partners")) return "partners";
            if (id.includes("/src/modules/marketing")) return "marketing";
            if (id.includes("/src/modules/contact")) return "contact";
          },
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
        },
      },

      terserOptions: {
        compress: { drop_console: isProduction, drop_debugger: isProduction },
      },

      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
    },

    // Dev optimizer: ok
    optimizeDeps: {
      force: true,
    },
  };
});
