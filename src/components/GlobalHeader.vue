<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <div class="w-75 mx-auto navbar">
      <a href="#" class="navbar-brand">者也专栏</a>
      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <a href="#" class="btn btn-outline-light my-2">登录</a>
        </li>
        <li class="list-inline-item">
          <a href="#" class="btn btn-outline-light my-2">注册</a>
        </li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item">
          <dropdown :title="`你好 ${user.name}`">
            <dropdown-item
              ><a href="#" class="dropdown-item" @click="createPost"
                >新建文章</a
              ></dropdown-item
            >
            <dropdown-item
              ><a href="#" class="dropdown-item">编辑资料</a></dropdown-item
            >
            <dropdown-item
              ><a href="#" class="dropdown-item">退出登录</a></dropdown-item
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
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
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
    const createPost = () => {
      router.push('/create')
    }
    return {
      createPost
    }
  }
});
</script>
<style scoped>
</style>