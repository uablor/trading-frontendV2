
import router from "@/router/index";
import i18n from "./vue18n.config";
import { createPinia } from "pinia";
import type { App } from "vue";

export const registerPlugins = (app: App) => {
  app
    .use(router)
    .use(i18n)
    .use(createPinia());
};
