<script setup lang="ts">
import { GlobalStore } from '@/stores'
import type { AssemblyList } from '@/stores/interface'

const { assemblySize } = storeToRefs(GlobalStore())
const assemblyList: AssemblyList = ['default', 'large', 'small']
const assemblyDict: Record<AssemblyList[number], string> = {
  default: '默认',
  large: '大型',
  small: '小型',
}
</script>

<template>
  <el-dropdown trigger="click">
    <span i-mdi-format-size />

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in assemblyList" :key="item" :disabled="assemblySize === item" @click="assemblySize = item">
          {{ assemblyDict[item] }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>

</style>
