<template>
  <div class="create-post-page container">
    <h4>{{ isEditMode ? "编辑文章" : "新建文章" }}</h4>

    <upload
      actions="/upload"
      class="d-flex justify-content-center align-items-center bg-light text-secondary w-100 my-4"
      :beforeUpload="uploadCheck"
      @file-uploaded="handleFileUploaded"
      :uploaded="uploadedData"
    >
      <template v-slot:default><h2>点击上传头图</h2></template>
      <template v-slot:loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status"></div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template v-slot:uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" />
        <h3>点击重新上传</h3>
      </template>
    </upload>
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
        <button class="btn btn-primary btn-large">{{ isEditMode ? '更新文章' : '发表文章'}}</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput from "../components/ValidateInput.vue";
import { RulesProp } from "../components/ValidateInput.vue";
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from "../store";
import { uploadFile } from "../network/file";
import Upload from "../components/Upload.vue";
import { beforeUploadCheck } from "../helper";
import createMessage from "../components/createMessage";
export default defineComponent({
  name: "CreatePost",
  components: {
    ValidateForm,
    ValidateInput,
    Upload,
  },
  setup() {
    const uploadedData = ref();
    const titleVal = ref("");
    const contentVal = ref("");
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isEditMode = !!route.query.id;
    let imageId = "";
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
    const handleFileUploaded = (data: ResponseType<ImageProps>) => {
      if (data.data._id) {
        imageId = data.data._id;
      }
    };

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user;
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column,
            author: _id,
          };
          if (imageId) {
            newPost.image = imageId;
          }
          const actionName = isEditMode ? "updatePost" : "createPost";
          const sendData = isEditMode
            ? {
                id: route.query.id,
                payload: newPost,
              }
            : newPost;
          console.log(sendData)
          store.dispatch(actionName, sendData).then(() => {
            createMessage("发表成功 2秒后跳转到文章", "success", 2000);
            setTimeout(() => {
              router.push({ name: "column", params: { id: column } });
            }, 2000);
          });
        }
      }
    };
    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, {
        format: ["image/jpeg", "image/png"],
        size: 1,
      });
      const { passed, error } = result;
      if (error === "format") {
        createMessage("上传图片只能是png或者jpg格式", "error");
      }
      if (error === "size") {
        createMessage("上传图片大小不能超过1 Mb", "error");
      }
      // console.log(passed);
      return passed;
    };

    onMounted(() => {
      if (isEditMode) {
        store
          .dispatch("fetchPost", route.query.id)
          .then((rawData: ResponseType<PostProps>) => {
            const currentPost = rawData.data;
            if (currentPost.image) {
              uploadedData.value = { data: currentPost.image };
            }
            titleVal.value = currentPost.title;
            console.log(titleVal.value);
            contentVal.value = currentPost.content || "";
          });
      }
    });
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit,
      uploadCheck,
      handleFileUploaded,
      uploadedData,
      isEditMode,
    };
  },
});
</script>
<style>
.create-post-page .file-upload-container {
  height: 250px;
  cursor: pointer;
}

.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>