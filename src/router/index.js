import { createRouter, createWebHistory } from 'vue-router'
import home from "../pages/index.vue"
import lgnn from "../pages/lg.vue"

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: home,
  },
  {
    path: '/',
    name: 'Login',
    component: lgnn,
  },
  
  // Additional routes can be added here if needed
];

// Extend the routes with layouts if needed
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
