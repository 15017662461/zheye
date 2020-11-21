<template>
  <div class="file-upload">
    <div class="file-upload-container" v-bind="$attrs" @click.prevent="triggerUpload">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData"
        ><button class="btn btn-primary" disabled>上传成功</button></slot
      >
      <slot v-else name="default"><button class="btn btn-primary">点击上传</button></slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from "vue";
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
    uploaded:{
      type: Object
    }
  },
  emits: {
    "file-uploaded": null,
    "file-upload-error": null,
  },
  inheritAttrs:false,
  setup(props, context) {
    const fileInput = ref<null | HTMLElement>(null);
    const fileStatus = ref<UploadStatus>("ready");
    const uploadedData = ref();
    watch(() => props.uploaded, (newValue) => {
      if (newValue) {
        fileStatus.value = 'success'
        uploadedData.value = newValue
      }
    })
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
          if (!result) {
            return;
          }
        }
        fileStatus.value = "loading";

        const formData = new FormData();
        formData.append("file", files[0]);
        uploadFile(props.actions, formData)
          .then((data) => {
            fileStatus.value = "success";
            uploadedData.value = data
            console.log(data);
            context.emit("file-uploaded", data);
          })
          .catch((error) => {
            console.log(error);
            context.emit("file-upload-error", { error });
          });
      }
      onMounted(() => {
        if(props.uploaded){
          fileStatus.value = 'success'
          uploadedData.value = props.uploaded
        }
      })
    };
    return {
      fileInput,
      fileStatus,
      triggerUpload,
      handleFileChange,
      uploadedData
    };
  },
});
</script>
<style scoped>
</style>