import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/myStore-Admin/" : "/",
  plugins: [react()],
/*   build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "./index.html",
        "404": "./public/404.html",
      },
    },
  }, */
}));
