import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: () => import('@/App.vue')
  },
  {
    path: '/todo',
    name: 'Todo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/TodoView.vue')
  },
  {
    path: '/discuss',
    name: 'Discuss',
    component: () => import('../views/DiscussView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=>{
  document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`
  next()
})

export default router
