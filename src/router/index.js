import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/shop/:page',
    name: 'shop',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Shop.vue')
  },
  {
    path: '/details/:productId',
    name: 'details',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductDetails.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orders/:orderId',
    name: 'orderDetails',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/OrderDetails.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/create-product',
    name: 'createProduct',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateProduct.vue'),
    meta: {
      requiresAuth: true,
      onlyAdmin: true
    }
  },
  {
    path: '/admin/edit-product/:productId',
    name: 'editProduct',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateProduct.vue'),
    meta: {
      requiresAuth: true,
      onlyAdmin: true
    }
  },
  {
    path: '/orders',
    name: 'orders',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Orders.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/products',
    name: 'adminProducts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminProducts.vue'),
    meta: {
      requiresAuth: true,
      onlyAdmin: true
    }
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SignIn.vue'),
    beforeEnter: (__, _, next) => {
      if(localStorage.getItem('token')){
        next({ path: '/'})
      }
      next();
    }
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue'),
    beforeEnter: (__, _, next) => {
      if(localStorage.getItem('token')){
        next({ path: '/'})
      }
      next();
    }
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
]

const router = createRouter({
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    }
  },
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(localStorage.getItem('token') === null){
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
    else {
      if(to.matched.some(record => record.meta.onlyAdmin)){
        const user = JSON.parse(localStorage.getItem('user'));
        if(user.isAdmin){
          next();
        } else {
          next('/');
        }
      } else {
        next();
      }
    }
  }
  else {
    next();
  }
})

export default router
