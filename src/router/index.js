import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import AuthPage from '../views/AuthPage.vue'
import Dashboard from '../views/DashBoard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  const userStore = useUserStore()
  userStore.logon()
  console.log('router bfe userStore.loggedIn', userStore.loggedIn)
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    console.log('router reached')
    // Check if the user is authenticated (you may need to modify this based on your store structure)
    if (userStore.loggedIn == false) {
      // User is not authenticated, redirect to login page
      next('/auth')
    }
  }
  // Proceed to the route
  next()
})
export default router
