<template>
  <div class="home-page container-md">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <a href="#" class="btn btn-primary my-2" @click="toCreatePost"
              >开始写文章</a
            >
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
    <button class="btn btn-outline-primary mt-2 mb-5 btn-block w-25 aaa"
      @click="loadMorePage" v-if="!isLastPage"
    >
      加载更多
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onActivated } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useLoadMore from "../hooks/useLoadMore";
import ColumnList from "../components/ColumnList.vue";
import { GlobalDataProps } from "../store";
export default defineComponent({
  name: "Home",
  components: {
    ColumnList,
  },
  setup() {
    const router = useRouter();
    const store = useStore<GlobalDataProps>();
    const total = computed(() => store.state.columns.total);
    const list = computed(() => store.getters.getColumns);
    const currentPage = computed(() => store.state.columns.currentPage)
    const toCreatePost = () => {
      router.push("/create");
    };
    onMounted(() => {
      store.dispatch("fetchColumns",{ pageSize: 3 });
    });
    const { loadMorePage, isLastPage } = useLoadMore('fetchColumns', total, { pageSize: 3, currentPage: (currentPage.value ? currentPage.value + 1 : 2) })

    return {
      list,
      toCreatePost,
      loadMorePage,
      isLastPage,
    };
  },
});
</script>
<style scoped>
.aaa{
  margin-left: 50%;
  transform: translate3d(-50%,0,0);
}
</style>