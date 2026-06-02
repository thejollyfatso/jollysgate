import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import { VitePWA } from "vite-plugin-pwa";

// Set VITE_BASE_PATH=/ when deploying to a custom domain
const base = process.env.VITE_BASE_PATH ?? "/jollysgate/";

export default defineConfig({
  base,
  plugins: [
    react(),
    federation({
      name: "launchpad",
      remotes: {
        nf4lm: "https://nf4lm.deleonanddeleon.com/assets/remoteEntry.js",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Jolly's Gate",
        short_name: "Launchpad",
        theme_color: "#E8623A",
        background_color: "#FAF8F5",
        display: "standalone",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png}"],
        runtimeCaching: [],
      },
    }),
  ],
  build: {
    target: "esnext",
    modulePreload: false,
    cssCodeSplit: false,
  },
});
