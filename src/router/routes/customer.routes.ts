// src/router/routes/auth.routes.ts
import { ProfileRouter } from "@/modules/client/profile/router/profile.routes";
import { TradingRouter } from "@/modules/client/trading/router/trading.routes";
import { WalletRouter } from "@/modules/client/wallet/router/wallet.routes";
import type { RouteRecordRaw } from "vue-router";

export const customerRoutes: RouteRecordRaw[] = [
  {
    path: "/lucifer",
    name: "customer.lucifer",
    component: () => import("@modules/client/layout/AppLayout.vue"),
    children: [
      ...WalletRouter,
      ...ProfileRouter,
      ...TradingRouter,

      {
        path: ":pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@ui/Notfound.vue")

      },
    ],
    meta: {
    },
  },
];
