import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],

  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@assets", replacement: "/src/assets" },
      { find: "@ui", replacement: "/src/common/ui" },
      { find: "@modules", replacement: "/src/modules" },
      { find: "@common", replacement: "/src/common" },
      { find: "@routes", replacement: "/src/router/routes" },
      { find: /^@\/(.*)/, replacement: "/src/$1" }, // fallback สำหรับ @/file
    ],
  },
});
