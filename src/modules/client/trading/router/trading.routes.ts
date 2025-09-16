export const TradingRouter = [
  {
    path: "trading",
    name: "customer.lucifer.trading",
    component: () => import("../views/TradingFrom.vue"),
    meta: { requiresAuth: true ,
      title: "Trading",
    },
    children: [
      {
        path: "btc",
        name: "customer.lucifer.trading.btc",
        component: () => import("../views/chart/Btc.vue"),
        meta: {
          requiresAuth: true,
          title: "Trading",
        },
      },
    ],
  },
];
