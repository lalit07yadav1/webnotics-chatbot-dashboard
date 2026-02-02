import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// @ts-ignore - Plugin doesn't have types
import { widgetEnvPlugin } from "./vite-plugin-widget-env.js";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
    widgetEnvPlugin(), // Plugin to inject env vars into widget.js
  ],
  server: {
    port: 3000,
    host: true
  },
  base: mode === 'production' ? '/webnoticschatbot/admin/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
}));
