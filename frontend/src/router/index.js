import { createRouter, createWebHistory } from "vue-router";
import HomeView from '@/views/HomeView.vue';
import MailView from "@/views/MailView.vue";
import PostView from "@/views/PostView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "@/views/SignupView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/mail',
            name: 'mail',
            component: MailView,
        },
        {
            path: '/post',
            name: 'post',
            component: PostView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupView,
        },
    ],
});

export default router;