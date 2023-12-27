import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: String(env.HOST),
      port: Number(env.PORT),
      hot: true,
    },
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      extract: true,
      sourceMap: false,
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "@/assets/styles/extensions.scss";`,
        },
      },
    },

    define: {
      "process.env": env,
    },
  };
});
