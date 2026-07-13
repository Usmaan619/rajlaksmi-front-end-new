import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


export default defineConfig({
  server: {
    host: true,
    port: 8080,
    allowedHosts: ["cisted-hylozoistic-latasha.ngrok-free.dev"],
    hmr: {
      overlay: false,
    },
  },

  plugins: [
    react(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    sourcemap: true,
    target: "esnext",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
  },
});
