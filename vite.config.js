import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // proxy
  server: {
    proxy: {
      "/api": {
        target: "https://ctf.jax.geesec.com",
        changeOrigin: true,
      },
    },
  },
});
