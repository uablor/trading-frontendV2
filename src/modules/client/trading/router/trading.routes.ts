import type { RouteRecordRaw } from "vue-router";

export const TradingRouter: RouteRecordRaw[] = [
  {
    path: "trading",
    name: "customer.lucifer.trading",
    component: () => import("../views/TradingFrom.vue"),
    meta: {
      title: "Trading",
    },
    children: [
      {
        path: "btc",
        name: "customer.lucifer.trading.btc",
        component: () => import("../views/chart/Btc.vue"),
        meta: {
          title: "Trading",
        },
      },
    ],
  },
];
