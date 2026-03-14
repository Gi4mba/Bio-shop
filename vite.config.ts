import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-wagmi": ["wagmi", "viem"],
          "vendor-ui": ["@reown/appkit", "@reown/appkit-adapter-wagmi"],
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  optimizeDeps: {
    // Pre-Bundle di React, React Router e Zustand per Hot Module Replacement in dev
    include: ["react", "react-dom", "react-router-dom", "zustand"],
  },
  server: {
    warmup: {
      clientFiles: ["./src/main.tsx"],
    },
  },
});
