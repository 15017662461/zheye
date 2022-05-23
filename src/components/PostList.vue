<template>
  <div class="post-list">
    <article
      v-for="post in newList"
      :key="post._id"
      class="card mb-3 shadow-sm"
    >
      <div class="card-body">
        <h4>
          <router-link :to="`/posts/${post._id}`">{{
            post.title
          }}</router-link>
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-4">
            <img
              :src="post.image.fitUrl"
              :alt="post.title"
              class="rounded-lg w-100"
            />
          </div>
          <p :class="{ 'col-8': post.image }" class="text-muted">
            {{ post.excerpt }}
          </p>
        </div>
        <span class="text-muted">2022-05-20 17:20:00</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { ImageProps, PostProps } from "../store";
import { generateFitUrl } from '../helper'
export default defineComponent({
  name: "PostList",
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true,
    },
  },
  setup(props) {
    const newList = computed(() => {
      return props.list.map(post => {
        generateFitUrl(post.image as ImageProps, 200, 110, ['m_fill'])
        return post
      });
    });
    return {
      newList,
    };
  },
});
</script>
<style scoped>
.rounded-lg {
  border-radius: 0.3rem !important;
}
</style>