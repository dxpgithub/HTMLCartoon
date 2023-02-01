import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js';

import UserInfo from "../components/user/info.vue"
import CartoonDetails from "../components/cartoon/cartoondetails.vue"
import CartoonClassification from "../components/cartoon/classification.vue"
import Search from "../components/cartoon/search.vue"
import Serialization  from "../components/cartoon/Serialization.vue"
import Finish from "../components/cartoon/Finish.vue"
import UserLogin from "../components/common/login.vue"
import UserRegister from "../components/user/register.vue"


import Administrator from "../components/administrator/administrator.vue"
import AddCartoon from "../components/administrator/addCartoon.vue"
import UpdateCartoon from "../components/administrator/updateCartoon.vue"
import DeleteCartoon from "../components/administrator/deleteCartoon.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'main',
    component: () => import('../components/common/main.vue')
  },
  {
    path: '/user/info',
    name: 'userinfo',
    component: UserInfo
  },
  {
    path: '/administrator/info',
    name: 'administrator',
    component: Administrator
  },
  {
    path: '/addCartoon',
    name: 'addCartoon',
    component: AddCartoon 
  },
  {
    path: '/updateCartoon',
    name: 'updateCartoon',
    component: UpdateCartoon 
  },
  {
    path: '/deleteCartoon',
    name: 'deleteCartoon',
    component: DeleteCartoon 
  },
  {
    path: '/cartoon/cartoondetails',
    name: 'cartoondetails',
    component: CartoonDetails
  },
  {
    path: '/cartoon/classification',
    name: 'classification',
    component: CartoonClassification
  },
  {
    path: '/cartoon/search',
    name: 'search',
    component: Search
  },
  {
    path: '/cartoon/serialization',
    name: 'serialization',
    component: Serialization
  },
  {
    path: '/cartoon/finish',
    name: 'finish',
    component: Finish
  },
  {
    path: '/login',
    name: 'login',
    component: UserLogin
  },
  {
  path: '/user/register',
    name: 'userRegister',
    component:  UserRegister
  },
  {
  	path: "/",
  	redirect: "main"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, form, next) => {
	if (to.name == "userinfo" && store.getters.getLoginUser == null) {
		next("login");
	} else {
		next();
	}
});

export default router
