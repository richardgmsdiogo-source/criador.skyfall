import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// NOME EXATO DO REPOSITÓRIO NO GITHUB
const repoName = "criador.skyfall";

// Produção = build pro GitHub Pages
const isProd = process.env.NODE_ENV === "production";

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];

export default defineConfig({
  plugins,
  // Em dev: "/", em produção: "/criador.skyfall/"
  base: isProd ? `/${repoName}/` : "/",

  // seu app React está em /client
  root: path.resolve(__dirname, "client"),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },

  envDir: __dirname,

  build: {
    // Manda o build direto pro /docs (pasta que o GitHub Pages usa)
    outDir: path.resolve(__dirname, "docs"),
    emptyOutDir: true,
  },

  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
