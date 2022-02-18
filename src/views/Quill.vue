<template>
  <h2>quill test</h2>
  <div id="editor" ref="quillContainer">123</div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from "vue";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default defineComponent({
  name: "Quill",
  setup() {
    const quillContainer = ref<null | HTMLElement>(null);
    nextTick(() => {
      if (quillContainer.value) {
        const editor = new Quill(quillContainer.value, {
          theme: "snow",
          readOnly: false,
        });
      }
    });
    console.log("quill");

    return {
      quillContainer,
    };
  },
});
</script>
<style scoped>
</style>