import { createRouter,createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import Signup from './views/Signup.vue'
import store from './store'





const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    component:Home
  },
  {
    path: '/login',
    name: 'login',
    component:Login,
    meta:{
      redirectAlreadyLogin:true
    }
  },
  {
    path: '/column/:id',
    name: 'column',
    component:ColumnDetail,
  },
  {
    path: '/create',
    name: 'create',
    component:CreatePost,
    meta:{
      requireLogin:true
    }
  },
  {
    path:'/signup',
    name:'signup',
    component:Signup
  }
]

const router = createRouter({
  history:createWebHistory(),
  routes
})


router.beforeEach((to,from,next) => {
  setTimeout(() => {
    console.log(store.state.user)
    if(to.meta.requireLogin && !store.state.user.isLogin){
      next({name:'login'})
    }else if(store.state.user.isLogin && to.meta.redirectAlreadyLogin){
      next({name:'home'})
    }else{
      next()
    }
  },200)
})


export default router