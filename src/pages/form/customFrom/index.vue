<script setup lang="ts">
import ELFormPro from '../component/FormPro.vue'
import type { FormPro } from '../component/types'
import Search from '~icons/ep/search'
import Calendar from '~icons/ep/calendar'

const form = ref<FormPro.Form>({
  // inline: false,
  labelPosition: 'right',
  labelWidth: '80px',
  // size: 'default',
  // disabled: false,
  labelSuffix: ' :',
  rules: {
    username: [{ required: true, message: 'no required' }],
  },
})

const components: FormPro.Components[] = [
  {
    formItem: {
      label: '用户名',
      prop: 'username',
      required: true,
    },
    component: 'ElInput',
    attrs: {
      clearable: true,
      placeholder: '请输入用户名',
      prefixIcon: Search,
      suffixIcon: Calendar,
    },
  },
  {
    formItem: {
      label: '昵称',
      prop: 'nickname',
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
      label: '年龄',
      prop: 'age',
    },
    component: 'ElInputNumber',
    attrs: {
      min: 1,
      max: 15,
      controlsPosition: 'right',
    },
    slotKey: 'inp',
  },
  {
    formItem: {
      label: '性别',
      prop: 'gender',
    },
    component: 'ElSelect',
    attrs: {
      clearable: true,
      placeholder: '请选择',
      // class: 'w-100!',
    },
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
      { label: '?', value: 'emmm' },
    ],
  },
  {
    formItem: {
      label: '年级',
      prop: 'grade',
    },
    component: 'ElRadioGroup',
    attrs: {
      clearable: true,
      placeholder: '请选择年级',
    },
    options: [
      { label: '一年级' },
      { label: '二年级' },
      { label: '三年级' },
    ],
  },
  {
    formItem: {
      label: '爱好',
      prop: 'interest',
    },
    component: 'ElCheckboxGroup',
    attrs: {
      clearable: true,
      placeholder: '请输入邮箱',
    },
    options: [
      { label: '唱歌', value: 'sing' },
      { label: '跳舞', value: 'dance' },
      { label: '说唱', value: 'rap' },
      { label: '篮球', value: 'basketball' },
    ],
  },
]

const model = ref<Record<string, any>>({
  username: '恁爹',
  nickname: 'cxk',
  age: 6,
  grade: '一年级',
  interest: ['唱歌', '跳舞', '说唱', '篮球'],
})
</script>

<template>
  <div class="card-full">
    <div mb-4>
      <el-alert title="使用 <component is='xxx' /> 简单实现自定义表单，具体逻辑查阅代码" type="warning" :closable="false" />
    </div>
    <ELFormPro :value="model" :form="form" :components="components">
      <template #inp-prepend>
        Http://
      </template>
    </ELFormPro>
    <div flex gap-2 flex-wrap>
      <div class="card">
        表单数据
        <pre>{{ model }}</pre>
      </div>
      <div class="card">
        form 配置<br>
        类型 FormPro.Form
        <pre>{{ form }}</pre>
      </div>
      <div class="card" flex flex-wrap gap-2>
        <div w-full>
          formItem components 配置<br>
          类型 FormPro.Components[]
        </div>
        <div v-for="(item, inx) in components" :key="inx" class="card">
          <pre>{{ item }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box .card{
  --at-apply: m-t-2;
}
</style>
