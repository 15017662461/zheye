<template>
  <div class="file-upload">
    <button class="btn btn-primary" @click.prevent="triggerUpload">
      <span v-if="fileStatus === 'loading'">正在上传...</span>
      <span v-else-if="fileStatus === 'success'">上传成功</span>
      <span v-else>点击上传</span>
    </button>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { uploadFile } from "../network/file";
type UploadStatus = "ready" | "loading" | "success" | "error";
type CheckFunction = (file: File) => boolean;
export default defineComponent({
  name: "Upload",
  props: {
    actions: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>,
    },
  },
  setup(props) {
    const fileInput = ref<null | HTMLElement>(null);
    const fileStatus = ref<UploadStatus>("ready");
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement;
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files);
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0]);
          if(!result){
            return
          }
        }
        fileStatus.value = "loading";

        const formData = new FormData();
        formData.append("file", files[0]);
        uploadFile(props.actions, formData)
          .then((data) => {
            fileStatus.value = "success";
            console.log(data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };
    return {
      fileInput,
      fileStatus,
      triggerUpload,
      handleFileChange,
    };
  },
});
</script>
<style scoped>
</style>