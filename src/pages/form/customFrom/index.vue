<script setup lang="ts">
import ELFormPro from '../component/FormPro.vue'
import type { FormPro } from '../component/types'

const form = ref<FormPro.Form>({
  inline: false,
  labelPosition: 'right',
  labelWidth: '80px',
  size: 'default',
  disabled: false,
  labelSuffix: ' :',
  rules: {
    username: [{ required: true, message: 'no required' }],
  },
})
const components = ref<FormPro.Components[]>([
  {
    formItem: {
      label: '用户名',
      prop: 'username',
      labelWidth: '80px',
      required: true,
    },
    component: 'ElInput',
    attrs: {
      clearable: true,
      placeholder: '请输入用户名',
    },
  },
  {
    formItem: {
      label: '密码',
      prop: 'password',
      labelWidth: '80px',
      required: true,
    },
    component: 'ElInput',
    attrs: {
      clearable: true,
      placeholder: '请输入密码',
      type: 'password',
    },
  },
  {
    formItem: {
      label: '邮箱',
      prop: 'email',
    },
    component: 'ElInput',
    attrs: {
      clearable: true,
      placeholder: '请输入邮箱',
      // class: 'w-100!',
    },
  },
])

const model = ref<Record<string, any>>({
  username: 'name',
  password: 'hhh',
  email: 'aaa@xx.com',
})
</script>

<template>
  <div class="card-full">
    <div mb-4>
      <el-alert title="通过配置自定义表单，具体逻辑查阅代码" type="warning" :closable="false" />
    </div>
    <ELFormPro :value="model" :form="form" :components="components" />
    <div flex gap-2>
      <div class="card">
        表单数据
        <pre>{{ model }}</pre>
      </div>
      <div class="card">
        form 配置<br>
        类型 FormPro.Form
        <pre>{{ form }}</pre>
      </div>
      <div class="card">
        formItem components 配置<br>
        类型 FormPro.Components[]
        <pre>[{{ components[0] }}]</pre>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box .card{
  --at-apply: m-t-2;
}
</style>
