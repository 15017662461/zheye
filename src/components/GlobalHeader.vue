<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <div class="w-75 mx-auto navbar">
      <a href="#" class="navbar-brand" @click="clickToHome">知乎专栏</a>
      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <a href="#" class="btn btn-outline-light my-2" @click="clickToLogin">登录</a>
        </li>
        <li class="list-inline-item">
          <a href="#" class="btn btn-outline-light my-2" @click="toSignup">注册</a>
        </li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item">
          <dropdown :title="`你好 ${user.nickName}`">
            <dropdown-item
              ><a href="#" class="dropdown-item" @click="createPost"
                >新建文章</a
              ></dropdown-item
            >
            <dropdown-item
              ><a href="#" class="dropdown-item" @click="toMyColumn"
                >我的专栏</a
              ></dropdown-item
            >
            <dropdown-item
              ><a href="#" class="dropdown-item">编辑资料</a></dropdown-item
            >
            <dropdown-item
              ><a href="#" class="dropdown-item" @click="toLogout">退出登录</a></dropdown-item
            >
          </dropdown>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRouter } from 'vue-router'
import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";
import { GlobalDataProps } from '../store'

import { useStore } from "vuex";
export default defineComponent({
  name: "GlobaleHeader",
  components: {
    Dropdown,
    DropdownItem,
  },
  setup(){
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const user = computed(() => store.state.user)

    const createPost = () => {
      router.push('/create')
    }
    const clickToHome = () => {
      router.push({name:'home'})
    }
    const clickToLogin = () => {
      router.push({name:'login'})
    }
    const toLogout = () => {
      store.commit('logout')
      router.push('/login')
    }
    const toSignup = () => {
      router.push({name:'signup'})
    } 
    const toMyColumn = () =>{
      const id = user.value.column as string;
      router.push(`/column/${id}`)
    }
    return {
      createPost,
      clickToLogin,
      clickToHome,
      toLogout,
      toSignup,
      toMyColumn,
      user
    }
  }
});
</script>
<style scoped>
</style>