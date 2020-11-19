<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <h2>点击上传头图</h2>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput from "../components/ValidateInput.vue";
import { RulesProp } from "../components/ValidateInput.vue";
import { GlobalDataProps } from "../store";
import { PostProps } from "../store";
export default defineComponent({
  name: "CreatePost",
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const titleRules: RulesProp = [
      {
        type: "required",
        message: "标题不能为空",
      },
    ];
    const contentRules: RulesProp = [
      {
        type: "required",
        message: "内容不能为空",
      },
    ];
    const titleVal = ref("");
    const contentVal = ref("");
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column } = store.state.user.columnId;
        if (column) {
          const newPost: PostProps = {
            _id: new Date().getTime().toString(),
            title: titleVal.value,
            content: contentVal.value,
            column,
            createAt: new Date().toLocaleString(),
          };
          store.commit('createPost',newPost)
          router.push({name:'column',params:{id : column}})
        }
      }
    };

    return {
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      onFormSubmit,
    };
  },
});
</script>
<style scoped>
</style>