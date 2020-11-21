<template>
  <div class="w-690 column-detail-page">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img :src="column && column.avatar && column.avatar.fitUrl" :alt="column && column.description" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column && column.title}}</h4>
        <p class="text-muted">{{column && column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue"
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps, ColumnProps } from '../store'
import PostList from '../components/PostList.vue'
import { addColumnAvatar } from "../helper"
export default defineComponent({
  name:'ColumnDetail',
  components:{
    PostList
  },
  setup(){
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currenId = route.params.id
    const column = computed(() => {
      const selectColumn = store.getters.getColumnById(currenId) as ColumnProps | undefined
      if (selectColumn) {
        addColumnAvatar(selectColumn, 100, 100)
      }
      return selectColumn
    })
    const list = computed(() => store.getters.getPostsByCid(currenId))
    onMounted(() => {
      store.dispatch('fetchColumn',currenId)
      store.dispatch('fetchPosts',currenId)
    })
    return{
      column,
      list
    }
  }

})
</script>
<style scoped>
  .w-690{
    width: 690px;
    margin: 0 auto;
  }
</style>