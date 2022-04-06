<template>
  <div class="container-fluid px-0 flex-shrink-0">
    <globale-header></globale-header>
    <router-view />
    <loader v-if="isLoading" background="rgba(0,0,0,0.8)"></loader>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">@ 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">练习</li>
          <li class="list-inline-item">123</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import GlobaleHeader from "./components/GlobalHeader.vue";
import Loader from "./components/Loader.vue";
import createMessage from "./components/createMessage";
import { useStore } from "vuex";
import { GlobalDataProps } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

export default defineComponent({
  name: "App",
  components: {
    GlobaleHeader,
    Loader,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const isLoading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);
    watch(error, () => {
      const { status, message } = error.value;
      if (status && message) {
        createMessage(message, "error");
      }
    });
    return {
      isLoading,
      error,
    };
  },
});
</script>

<style lang="scss">
.container {
  width: 100vw;
}
</style>
