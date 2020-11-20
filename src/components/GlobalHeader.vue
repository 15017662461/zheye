<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <div class="w-75 mx-auto navbar">
      <a href="#" class="navbar-brand" @click="clickToHome">者也专栏</a>
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
import { defineComponent, PropType } from "vue";
import { useRouter } from 'vue-router'
import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";

import { UserProps } from '../store'
import { useStore } from "vuex";
export default defineComponent({
  name: "GlobaleHeader",
  components: {
    Dropdown,
    DropdownItem,
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup(){
    const router = useRouter()
    const store = useStore()
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
      router.push({name:'login'})
    }
    const toSignup = () => {
      router.push({name:'signup'})
    } 
    return {
      createPost,
      clickToLogin,
      clickToHome,
      toLogout,
      toSignup
    }
  }
});
</script>
<style scoped>
</style>