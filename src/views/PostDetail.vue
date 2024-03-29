<template>
  <div class="post-detail-page">
    <modal title="删除文章" :visible="modalIsVisible"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete"
    >
      <p>确定要删除这篇文章吗？</p>
    </modal>
    <article class="w-75 mx-auto mb-5 pb-3">
      <img
        :src="currentImageUrl"
        :alt="currentPost && currentPost.title"
        class="rounded-lg img-fluid my-4"
      />
      <h2 class="mb-4">{{ currentPost && currentPost.title }}</h2>
      <div
        class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0"
      >
        <div class="col">
          <user-profile :user="currentPost.author" v-if="currentPost && typeof currentPost.author === 'object'"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic"
          >发表于：2022-05-20 17:20:00</span
        >
      </div>
      <div v-html="currentHTML"></div>
      <div class="btn-group mt-5" v-if="showEditArea">
        <router-link
          type="button"
          class="btn btn-success"
          :to="{ name: 'create', query: { id: currentPost._id } }"
        >
          编辑
        </router-link>
        <button type="button" class="btn btn-danger" @click.prevent="modalIsVisible = true">删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import UserProfile from '../components/UserProfile.vue'
import Modal from '../components/Modal.vue'
import MarkdownIt from "markdown-it";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import createMessage from '../components/createMessage'
import {
  GlobalDataProps,
  PostProps,
  ImageProps,
  UserProps,
} from "../store";
export default defineComponent({
  name: "PostDetail",
  components:{
    UserProfile,
    Modal
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const router = useRouter();
    const route = useRoute();
    const modalIsVisible = ref(false)
    const currentId = route.params.id;
    const md = new MarkdownIt();
    const currentPost = computed<PostProps>(() =>
      store.getters.getCurrentPost(currentId)
    );
    const currentHTML = computed(() => {
      if (currentPost.value) {
        const { content, isHTML } = currentPost.value;
        if (currentPost.value && content) {
          return isHTML ? content : md.render(content);
        }
      }
    });
    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user;
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as UserProps;
        return postAuthor._id === _id;
      } else {
        return false;
      }
    });
    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value;
        return (image as ImageProps).url + "?x-oss-process=image/resize,w_850";
      } else {
        return null;
      }
    });
    const hideAndDelete = () => {
      modalIsVisible.value = false
      store.dispatch('deletePost', currentId).then(() => {
        createMessage('删除成功，2秒后跳转到专栏首页', 'success', 2000)
        setTimeout(() => {
          router.push(`/column/${store.state.user.column}`)
        }, 2000)
      })
    }
    onMounted(() => {
      store.dispatch("fetchPost", currentId);
    });

    return {
      currentPost,
      currentImageUrl,
      currentHTML,
      showEditArea,
      modalIsVisible,
      hideAndDelete
    };
  },
});
</script>
<style scoped>
</style>