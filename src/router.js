import { createRouter, createWebHistory } from "vue-router";
import LoginView from "./components/LoginView.vue";
import TheWelcome from "./components/TheWelcome.vue";
import RegisterView from "./components/RegisterView.vue";
import TodoPage from "./components/TodoPage.vue";
import { useAuthStore } from './stores/auth';  // Assuming you're using Pinia for state management

const routes = [
    { path: '/', component: TheWelcome },
    { path: "/login",
        name: 'login',
         component: LoginView },

    { path: "/register",
        name : 'register',
         component: RegisterView },
    {
        path: '/todo',
        name: 'todo',
        component: TodoPage,
        // Adding a navigation guard for auth
        // beforeEnter: (to, from, next) => {
        //     const authStore = useAuthStore();
        //     if (!authStore.isAuthenticated) {  // Assuming you have isAuthenticated in your store
        //         next('/login');  // Redirect to login if not authenticated
        //     } else {
        //         next();  // Proceed to the Todo page if authenticated
        //     }
        // }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
