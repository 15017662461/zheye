<template>
  <div class="create-post-page container">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <upload
        actions="/upload"
        class="d-flex justify-content-center align-items-center bg-light text-secondary w-100 my-4"
        :beforeUpload="uploadCheck"
        @file-uploaded="handleFileUploaded"
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
        </template>
      </upload>
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
import { useRouter } from "vue-router";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput from "../components/ValidateInput.vue";
import { RulesProp } from "../components/ValidateInput.vue";
import { GlobalDataProps } from "../store";
import { PostProps,ResponseType,PostImage } from "../store";
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
    const store = useStore();
    const router = useRouter();
    let imageId = ''
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
    const handleFileUploaded = (data: ResponseType<PostImage>) => {
      if(data.data._id){
        imageId = data.data._id
      }
    }
    const titleVal = ref("");
    const contentVal = ref("");
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column,_id } = store.state.user;
        if (column) {
          const newPost: PostProps = {
            _id: new Date().getTime().toString(),
            title: titleVal.value,
            content: contentVal.value,
            column,
            createdAt: new Date().toLocaleString(),
            author:_id
          };
          if(imageId){
            newPost.image = imageId
          }
          store.dispatch('createPost',newPost)
            .then(() => {
              createMessage('发表成功 2秒后跳转到文章','success',2000)
              setTimeout(() => {
                router.push({name:'column',params:{id:column}})
              },2000)
            })
          store.commit("createPost", newPost);
          router.push({ name: "column", params: { id: column } });
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
      console.log(passed)
      return passed
    };
    return {
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      onFormSubmit,
      uploadCheck,
      handleFileUploaded
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