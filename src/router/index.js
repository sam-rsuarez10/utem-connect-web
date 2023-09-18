import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { fetchTopics } from '../utils/fetchTopics'; 
import CoverView from '../views/CoverView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },

    {
      path: '/learning-log/topics',
      name: 'topics',
      component: () => import('../views/TopicsView.vue'),
      beforeEnter: async (to, from, next) => {
        try {
          const topicsData = await fetchTopics(true); // Fetch topics only for this route
          // Do something with topicsData if needed
          next();
      } catch (error) {
          console.log("error fetching topics");
      }
      }
    },

    {
      path: '/',
      name: 'cover',
      component: CoverView
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },

    {
      path: '/verify',
      name: 'verify-email',
      component: () => import('../views/VerifyEmailView.vue'),
    },
  ]
})

export default router
