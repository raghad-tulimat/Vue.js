import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../components/LoginPage.vue'
import Dashboard from '../components/dashboard.vue'
import SignUp from '../components/SignUp.vue'
import ProductDetails from '../components/ProductDetails.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      redirect: '/login'          
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/dashboard',
      component: Dashboard
    },
    { path: '/signup', 
      component: SignUp 
    },
    {
      path: '/product/:id',
      component: ProductDetails,
      props: true
    }
  ]
})

export default router