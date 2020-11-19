<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img :src="column" :alt="column" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column}}</h4>
        <p class="text-muted">{{column}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue"
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
    const currenId = route.params.id
    const column = computed(() => store.getters.getColumnById(currenId))
    const list = computed(() => store.getters.getPostsByCid(currenId))
    console.log(store.state)
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
</style>