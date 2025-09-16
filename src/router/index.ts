// src/router/index.ts

import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "./guards/auth.guard";
import { customerRoutes } from "./routes/customer.routes";
// import { AuthRouter } from "@modules/auth/router/auth.routes";
import { HomepageRoutes } from "@/modules/mainpage/router/homepage.routes";
const routes = [
  ...customerRoutes,
  // ...AuthRouter,
  ...HomepageRoutes,
  {
    path: "/",
    redirect: "/homepage",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

authGuard(router);

export default router;
