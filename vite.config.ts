import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@reducers": path.resolve(__dirname, "./src/reducers"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@mocks": path.resolve(__dirname, "./mocks"),
    },
  },
  plugins: [react(), svgr()],
});
