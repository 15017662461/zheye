import { createRouter,createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import Signup from './views/Signup.vue'
import PostDetail from './views/PostDetail.vue'
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
    component:Signup,
    meta:{
      redirectAlreadyLogin:true
    }
  },
  {
    path:'/posts/:id',
    name:'posts',
    component:PostDetail
  }
]

const router = createRouter({
  history:createWebHistory(),
  routes
})


router.beforeEach((to,from,next) => {
    // if(to.meta.requireLogin && !store.state.user.isLogin){
    //   next({name:'login'})
    // }else if(store.state.user.isLogin && to.meta.redirectAlreadyLogin){
    //   next({name:'home'})
    // }else{
    //   next()
    // }
    const { user,token } = store.state;
    const { requireLogin,redirectAlreadyLogin } = to.meta
    if(!user.isLogin){
      if(token){
        store.dispatch('fetchCurrentUser')
          .then(data => {
            if(redirectAlreadyLogin){
              next('/')
            }else{
              next()
            }
          })
          .catch(e => {
            store.commit('logout')
            next('/login')
          })
      }else{
        if(requireLogin){
          next('/login')
        }else{
          next()
        }
      }
    }else{
      if(redirectAlreadyLogin){
        next('/')
      }else{
        next()
      }
    }
})


export default router