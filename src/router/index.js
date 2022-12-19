import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter)

const Home = () => import('../views/home/Home')
const category = () => import("../views/category/Category")
const cart = () => import("../views/cart/Cart")
const profile = () => import("../views/profile/Profile")
const detail = () => import("../views/detail/Detail")

const routes = [
  {
    path:'',
    redirect:'/home',
  },
  {
    path:'/home',
    component:Home,
  },
  {
    path:'/category',
    component:category,
  },
  {
    path:'/cart',
    component:cart,
  },
  {
    path:'/profile',
    component:profile,
  },
  {
    path:'/detail/:iid',
    component:detail,
  },
]

const routers = new VueRouter({
  routes,
  mode:'history'
});

export default routers
