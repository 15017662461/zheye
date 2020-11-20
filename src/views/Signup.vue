<template>
  <div class="signup-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">注册者也账户</h5>
    <validate-form @form-submit="formSubmit">
      <template v-slot:default>
        <div class="mb-3">
          <label class="form-label">邮箱地址</label>
          <validate-input
            placeholder="请输入邮箱地址"
            type="text"
            v-model="formData.email"
            :rules="emailRules"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">昵称</label>
          <validate-input
            placeholder="请输入昵称"
            type="text"
            v-model="formData.nickName"
            :rules="nickNameRules"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">密码</label>
          <validate-input
            placeholder="请输入密码"
            type="password"
            v-model="formData.password"
            :rules="passwordRules"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">重复密码</label>
          <validate-input
            placeholder="请再次输入密码"
            type="password"
            v-model="formData.repeatPassword"
            :rules="repeatPasswordRules"
          />
        </div>
      </template>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">
          注册新用户
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from 'vue-router'
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import { signup } from '../network/user'
import { emitter } from '../main'
import createMessage from '../components/createMessage'
export default defineComponent({
  name: "Signup",
  components: {
    ValidateForm,
    ValidateInput,
  },
  setup() {
    const router = useRouter()
    const formData = reactive({
      email: "",
      nickName: "",
      password: "",
      repeatPassword: "",
    });
    const emailRules: RulesProp = [
      { type: "required", message: "邮箱地址不能为空" },
      { type: "email", message: "请输入正确的邮箱地址" },
    ];
    const nickNameRules: RulesProp = [
      { type: "required", message: "昵称不能为空" },
    ];
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" },
    ];
    const repeatPasswordRules: RulesProp = [
      { type: "required", message: "重复密码不能为空" },
      { type:"custom",validator:() =>{return formData.password === formData.repeatPassword},message:'两次密码不相同'  }
    ];
    const formSubmit = (result) => {
      if(result){
        console.log(result)
        signup({email:formData.email,nickName:formData.nickName,password:formData.password})
          .then(data => {
            console.log(data)
            createMessage('注册成功,2s后跳转至登录页面','success')
            setTimeout(() => {
              router.push({name:'login'})
            },2000)
          })
          .catch(e => {
            console.log('error',e)
            emitter.emit('clear-value')
          })
      }
    }

    return {
      formData,
      emailRules,
      nickNameRules,
      passwordRules,
      repeatPasswordRules,
      formSubmit,
    };
  },
});
</script>
<style scoped>
.w-330 {
  max-width: 330px;
}
.btn-block{
  width: 100%;
  display: block;
}
</style>