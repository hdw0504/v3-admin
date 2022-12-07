<!-- eslint-disable vue/no-useless-v-bind -->
<script setup lang="ts">
import type { FormPro } from '../component/types'
import type { ComponentsName } from './componentsdict'
import { componentsDict } from './componentsdict'
import { isArray, isNullOrUnDef } from '@/utils/is'

interface Props {
  form: FormPro.Form
  components: FormPro.Components[]
  value: Record<string, any>
}

const props = defineProps<Props>()
const val = ref(props.value)

const hasChildrenComp: Record<string, string> = {
  ElSelect: 'ElOption',
  ElCheckboxGroup: 'ElCheckbox',
  ElRadioGroup: 'ElRadio',
}

function hasOptionChild(parent: FormPro.Components) {
  return !isNullOrUnDef(hasChildrenComp[parent.component]) && isArray(parent.options)
}

function optionComponent(parent: FormPro.Components) {
  return componentsDict[hasChildrenComp[parent.component] as ComponentsName]
}
</script>

<template>
  <el-form v-bind="form" :model="val">
    <template v-for="item in components" :key="item.prop">
      <el-form-item v-bind="item.formItem">
        <component :is="componentsDict[item.component]" v-bind="item.attrs" v-model="val[item.formItem.prop]">
          <!-- Option Component 实现 -->
          <template v-if="hasOptionChild(item)">
            <template v-for="option in item.options" :key="option.value">
              <component :is="optionComponent(item)" v-bind="option" />
            </template>
          </template>
        </component>
      </el-form-item>
    </template>

    <el-form-item>
      <slot name="operation" />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
</style>
