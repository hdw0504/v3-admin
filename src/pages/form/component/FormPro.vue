<!-- eslint-disable vue/no-useless-v-bind -->
<script setup lang="ts">
import type { FormPro } from '../component/types'
import { componentsDict } from './componentsdict'

interface Props {
  form: FormPro.Form
  components: FormPro.Components[]
  value: Record<string, any>
}

const props = defineProps<Props>()
const val = ref(props.value)
</script>

<template>
  <el-form v-bind="form" :model="val">
    <template v-for="item in components" :key="item.prop">
      <el-form-item v-bind="item.formItem">
        <component :is="componentsDict[item.component]" v-bind="item.attrs" v-model="val[item.formItem.prop]" />
      </el-form-item>
    </template>

    <el-form-item>
      <slot name="operation" />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
</style>
