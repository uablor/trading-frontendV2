export const WalletRouter = [
  {
    path: "wallet",
    name: "customer.wallet",
    component: () => import("../views/walletFrom.vue"),
    meta: {
      requiresAuth: true,
      title: "Wallet",
    },
  },
];
