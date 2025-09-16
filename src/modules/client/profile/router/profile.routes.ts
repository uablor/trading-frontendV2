
export const ProfileRouter = [
    {
        path: "profile",
        name: "customer.profile",
        component: () => import("../views/ProfileForm.vue"),
        meta: {
            requiresAuth: true,
            title: "Profile",
        },
    },  
]