
export const AuthRouter = [
    {
        path: 'login',
        name: 'auth.login',
        component: () => import('../views/LoginFrom.vue'),
        meta: { title: 'Login', skipAuthCheck: true }
    },
    {
        path: 'register',
        name: 'auth.register',
        component: () => import('../views/RegisterFrom.vue'),
        meta: { title: 'Register', skipAuthCheck: true }
    }
]