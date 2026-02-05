// vite.config.ts - CONFIGURACIÓN CORREGIDA
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  
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
      // Solo en desarrollo
      ...(mode === "development" 
        ? [] 
        : []
      ),
      // Optimización de imágenes
      ViteImageOptimizer({
        jpg: {
          quality: 80,
        },
        png: {
          quality: 80,
        },
        webp: {
          quality: 80,
          lossless: false,
        },
        avif: {
          quality: 70,
          lossless: false,
        },
      }),
      // PWA para offline support
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
        manifest: {
          name: 'O&P Ingeniería - Catálogo Profesional',
          short_name: 'O&P Catálogo',
          theme_color: '#1e3a8a',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
      // Bundle analyzer (solo en modo análisis)
      mode === 'analyze' && visualizer({
        open: true,
        filename: 'dist/bundle-analysis.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // CONFIGURACIÓN DE BUILD OPTIMIZADA
    build: {
      target: 'es2022',
      minify: isProduction ? 'terser' : false,
      cssMinify: isProduction,
      sourcemap: isProduction ? 'hidden' : true,
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks separados
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
            'utils-vendor': ['date-fns', 'zod', 'clsx', 'tailwind-merge'],
            'charts-vendor': ['recharts'],
            // Feature-based chunks
            'catalog': ['@/features/catalog'],
            'projects': ['@/features/projects'],
          },
          // Naming consistente
          entryFileNames: isProduction ? 'assets/[name]-[hash].js' : 'assets/[name].js',
          chunkFileNames: isProduction ? 'assets/[name]-[hash].js' : 'assets/[name].js',
          assetFileNames: isProduction ? 'assets/[name]-[hash].[ext]' : 'assets/[name].[ext]',
        },
      },
      terserOptions: {
        compress: {
          drop_console: isProduction, // Remover console.log en producción
          drop_debugger: isProduction,
        },
      },
      // Reportar bundle size
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000, // 1MB warning
    },
    // Pre-carga de módulos críticos
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
      ],
      force: false,
    },
  };
});