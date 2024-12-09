import { createRouter, createWebHistory } from "vue-router";
import LoginView from "./components/LoginView.vue";
import TheWelcome from "./components/TheWelcome.vue";
import RegisterView from "./components/RegisterView.vue";
import TodoPage from "./components/TodoPage.vue";
import AddTodo from "./components/AddTodo.vue";
import EditTodo from "./components/EditTodo.vue";
import { useAuthStore } from './stores/auth'; 

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
    },
    { path: "/add-todo",
        name : 'add-todo',
         component: AddTodo},

         { 
            path: '/edit-todo/:id', 
            name: 'edit-todo', 
            component: EditTodo, 
            props: true, 
          },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
