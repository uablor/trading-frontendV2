export const DashboardRouter = [
    {
        path: "dashboard",
        name: "admin.dashboard",
        component: () => import("../views/Dashboard.vue"),
        meta: {
            title: "Dashboard",
        },
    },
]