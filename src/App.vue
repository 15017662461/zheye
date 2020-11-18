<template>
  <div class="container-fluid px-0 flex-shrink-0">
    <globale-header :user="user"></globale-header>
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
  computed
} from "vue";
import GlobaleHeader, { UserProps } from "./components/GlobalHeader.vue";
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import "bootstrap/dist/css/bootstrap.min.css";

export default defineComponent({
  name: "App",
  components: {
    GlobaleHeader,
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const user = computed(() => store.state.user)
    return {
      user,
    };
  },
});
</script>

<style lang="scss">
.container{
  width: 100vw;
}
</style>
