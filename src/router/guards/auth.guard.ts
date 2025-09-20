import type { Router } from "vue-router";
export function authGuard(router: Router) {
  router.beforeEach((to, _from, next) => {
    const token = localStorage.getItem("token");

    if (to.meta.skipAuthCheck) {

      // if (token && to.name === "auth.login") {
      //   return next({ name: "customer.lucifer.trading.btc" });
      // }
      console.log("skipAuthCheck", to.name);
      return next();
    }
    if (token) {
      // if (to.name === "auth.login") {
      //   return next({ name: "customer.lucifer.trading.btc" });
      // }
      return next();
    } else {
      if (to.name === "auth.register") {
        return next();
      }
      if (to.name === "auth.verify") {
        return next();
      }
      if (to.name === "auth.login") {
        return next();
      }
      return next();
    }
  });
}
