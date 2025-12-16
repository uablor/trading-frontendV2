// src/router/routes/admin.routes.ts

import { DashboardRouter } from "@/modules/admin/dashboard/router/dashboard.routes";
import { UserRouter } from "@/modules/admin/user/router/user.routes";
import type { RouteRecordRaw } from "vue-router";

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/admin",
    name: "admin.lucifer",
    component: () => import("@modules/admin/layout/AppLayout.vue"),
    children: [
      ...DashboardRouter,
      ...UserRouter,
      {
        path: ":pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@ui/Notfound.vue"),
      },
      {
        path: "/admin",
        redirect: "/admin/dashboard",
      },
    ],
    meta: {},
  },
];
