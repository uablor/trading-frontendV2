export const AuthRouter = [
  {
    path: "login",
    name: "auth.login",
    component: () => import("../views/LoginFrom.vue"),
    meta: { title: "Login", skipAuthCheck: true },
  },
  {
    path: "register",
    name: "auth.register",
    component: () => import("../views/RegisterFrom.vue"),
    meta: { title: "Register", skipAuthCheck: true },
  },
  {
    path: "verify",
    name: "auth.resend-verify",
    component: () => import("../views/ResenVerifyFrom.vue"),
    meta: { title: "Verify", skipAuthCheck: true },
  },
  {
    path: "email-verify",
    name: "auth.email-verify",
    component: () => import("../views/EmaillVerifyFrom.vue"),
    meta: { title: "Email Verify", skipAuthCheck: true },
  },
  {
    path: "reset-password",
    name: "auth.reset-password",
    component: () => import("../views/passwordViews/ResetPasswordFrom.vue"),
    meta: { title: "Reset Password", skipAuthCheck: true },
  },
  {
    path: "confirm-password/:encode_id/:token",
    name: "auth.confirm-password",
    component: () => import("../views/passwordViews/ConfirmPassword.vue"),
    meta: { title: "Confirm Password", skipAuthCheck: true },
  },
];
