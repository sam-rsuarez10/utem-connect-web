import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { fetchTopics } from '../utils/fetchTopics';
import CoverView from '../views/CoverView.vue';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
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
      },
      meta: { requiresAuth: true },
    },

    {
      path: '/',
      name: 'cover',
      component: CoverView,
      meta: { guestOnly: true },
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { guestOnly: true },
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { guestOnly: true },
    },

    {
      path: '/verify',
      name: 'verify-email',
      component: () => import('../views/VerifyEmailView.vue'),
      meta: { guestOnly: true },
    },

    {
      path: '/me',
      name: 'my-profile',
      component: () => import('../views/MyProfileView.vue'),
      meta: { requiresAuth: true },
    },

    {
      path: '/user/:username',
      name: 'user-profile',
      component: () => import('../views/UserProfileView.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/chat/:chatId',
      name: 'user-chat',
      component: () => import('../views/ChatView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/');
  } else if (to.meta.guestOnly && authStore.isAuthenticated) {
    next('/home');
  } else {
    next();
  }
});

export default router
