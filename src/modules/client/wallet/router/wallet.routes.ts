import type { RouteRecordRaw } from "vue-router";

export const WalletRouter: RouteRecordRaw[] = [
  {
    path: "wallet",
    name: "customer.wallet",
    component: () => import("../views/walletFrom.vue"),
    meta: {
      title: "Wallet",
    },
  },
];
