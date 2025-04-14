import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Set base to '/' for custom domain deployments (e.g., researchchat.io)
export default defineConfig({
  base: "/",
  build: {
    manifest: true,
    outDir: "dist",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
