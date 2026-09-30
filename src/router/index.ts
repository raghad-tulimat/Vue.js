import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('../layouts/LayoutAuth.vue'),
    children: [
      { path: '', name: 'Login', component: () => import('../views/LoginPage.vue') }
    ]
  },
  {
    path: '/signup',
    component: () => import('../layouts/LayoutAuth.vue'),
    children: [
      { path: '', name: 'Signup', component: () => import('../views/Signup.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('../layouts/LayoutMain.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'Dashboard', component: () => import('../views/dashboard.vue') },
      { path: 'products/:id', name: 'ProductDetails', component: () => import('../views/ProductDetails.vue') },
      { path: 'cart', name: 'Cart', component: () => import('../views/Cart.vue') },
      { path: 'orders', name: 'Orders', component: () => import('../views/Orders.vue') }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) return '/login'
  if ((to.path === '/login' || to.path === '/signup') && token) return '/dashboard'
})

export default router