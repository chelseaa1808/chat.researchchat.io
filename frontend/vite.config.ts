// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/" : "/", // Since using a custom domain!
  plugins: [react()],
  build: {
    outDir: "../docs",
    manifest: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        chat: path.resolve(__dirname, "chat.html"),
        about: path.resolve(__dirname, "about.html"),
        adminpanel: path.resolve(__dirname, "adminpanel.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));
