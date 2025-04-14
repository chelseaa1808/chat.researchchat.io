import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/chat.researchchat.io/" : "/",
  publicDir: "public",
  build: {
    outDir: "dist",
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: undefined, // Optional — disables chunk splitting
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));
