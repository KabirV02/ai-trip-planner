import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ✅ ADD THIS FOR REACT ROUTER SUPPORT
  build: {
    outDir: "dist",
  },
  server: {
    // This ensures proper fallback during dev
    historyApiFallback: true,
  },
})
