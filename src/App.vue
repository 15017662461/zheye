<template>
  <div class="container">
    <globale-header :user="currentUser"></globale-header>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">@ 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">练习</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
    
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from "vue";
import GlobaleHeader, { UserProps } from "./components/GlobalHeader.vue";
import "bootstrap/dist/css/bootstrap.min.css";

const currentUser: UserProps = {
  isLogin: true,
  name: "123",
  id: 123,
};

export default defineComponent({
  name: "App",
  components: {
    GlobaleHeader,
  },
  setup() {

    return {
      currentUser,
    };
  },
});
</script>

<style lang="scss">
</style>
