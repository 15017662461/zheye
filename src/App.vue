<template>
  <div class="container">
    <globale-header :user="currentUser"></globale-header>
    <!-- <column-list :list="testData"></column-list> -->
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <validate-input ref="inputRef" v-model="emailVal" :rules="emailRules" type="text" placeholder="请输入邮箱地址"></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <validate-input v-model="passVal" :rules="passRules" type="password" placeholder="请输入密码"></validate-input>
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
import GlobaleHeader, { UserProps } from "./components/GlobalHeader.vue";
import ValidateInput, { RulesProp } from "./components/ValidateInput.vue";
import ValidateForm from './components/ValidateForm.vue'
import { emitter } from './components/ValidateForm.vue'
import "bootstrap/dist/css/bootstrap.min.css";
const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test1的专栏",
    description: "这是test1的专栏，有一段非常有益的见解，来更新吧",
    avatar: "123",
  },
  {
    id: 1,
    title: "test1的专栏",
    description: "这是test1的专栏，有一段非常有益的见解，来更新吧",
    avatar: "123",
  },
  {
    id: 1,
    title: "test1的专栏",
    description: "这是test1的专栏，有一段非常有益的见解，来更新吧",
    avatar: "123",
  },
  {
    id: 1,
    title: "test1的专栏",
    description: "这是test1的专栏，有一段非常有益的见解，来更新吧",
    avatar: "123",
  },
  {
    id: 1,
    title: "test1的专栏",
    description: "这是test1的专栏，有一段非常有益的见解，来更新吧",
    // avatar:'123'
  },
  {
    id: 1,
    title: "test1的专栏",
    description: "这是test1的专栏，有一段非常有益的见解，来更新吧",
    avatar: "123",
  },
];

const currentUser: UserProps = {
  isLogin: true,
  name: "123",
  id: 123,
};

export default defineComponent({
  name: "App",
  components: {
    // ColumnList,
    GlobaleHeader,
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const emailVal = ref('')
    const passVal = ref('')
    const inputRef = ref<any>(null)
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱不能为空" },
      { type: "email", message: "请输入正确的邮箱地址" },
    ];
    const passRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
    ];
    const onFormSubmit = (result: boolean) => {
      console.log(result)
      emitter.emit('clear-value')
    }

    return {
      testData,
      currentUser,
      emailRules, 
      passRules,
      emailVal,
      passVal,
      onFormSubmit,
      inputRef
    };
  },
});
</script>

<style lang="scss">
</style>
