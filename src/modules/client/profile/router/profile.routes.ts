import type { RouteRecordRaw } from "vue-router";

export const ProfileRouter: RouteRecordRaw[] = [
    {
        path: "profile",
        name: "customer.profile",
        component: () => import("../views/ProfileForm.vue"),
        meta: {
            title: "Profile",
        },
    },  
]