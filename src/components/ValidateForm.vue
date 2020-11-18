<template>
  <form action="" class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import { emitter } from "../main";
// type ValidateFunc = () => boolean;
interface ValidateFunc{
  (): boolean;
}

export default defineComponent({
  name: "ValidateForm",
  emits: {
    "form-submit": null,
  },
  setup(props, context) {
    let funcArr: ValidateFunc[] = [];
    const submitForm = () => {
      const result = funcArr.map((func) => func()).every((result) => result);
      context.emit("form-submit", result);
    };
    const callback = (func: any | ValidateFunc) => {
      if(func){
        funcArr.push(func);
        return func
      }
    };
    emitter.on("form-item-created", callback);
    onBeforeUnmount(() => {
      emitter.off("form-item-created", callback);
      funcArr = [];
    });
    return {
      submitForm,
    };
  },
});
</script>
<style scoped>
</style>