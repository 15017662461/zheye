<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import PostList from '../components/PostList.vue'
export default defineComponent({
  name:'ColumnDetail',
  components:{
    PostList
  },
  setup(){
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currenId = +route.params.id
    const column = store.state.columns.find(c => c.id === currenId)
    const list = store.state.posts.filter(post => post.columnId === currenId)
    return{
      column,
      list
    }
  }

})
</script>
<style scoped>
</style>