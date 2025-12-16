export const UserRouter = [{
    path: "user",
    name: "admin.user",
    component: () => import("../views/User.vue"),
    meta: {
        title : "User",
    },
}];