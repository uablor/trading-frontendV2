// src/router/routes/auth.routes.ts
// import { authRoutes } from "@/modules/auth/router/auth.routes";
import { AuthRouter } from "@/modules/auth/router/auth.routes";
import type { RouteRecordRaw } from "vue-router";

export const HomepageRoutes: RouteRecordRaw[] = [
  {
    path: "/homepage",
    component: () => import("../components/layout/MainLayout.vue"),
    meta: {
      skipAuthCheck: true,
    },
    children: [
      {
        path: "",
        name: "homepage",
        component: () => import("../views/homepageView.vue"),
        children: [...AuthRouter],
        meta: {
          title: "Homepage",
          skipAuthCheck: true,
        },

      },
    ],
  },
];
