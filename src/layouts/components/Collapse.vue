<script setup lang="ts">
import { GlobalStore } from '@/stores'
const { themeConfig } = storeToRefs(GlobalStore())

const collapse = () => {
  themeConfig.value.isCollapse = !themeConfig.value.isCollapse
}
</script>

<template>
  <el-icon class="m-r-20px text-icon cursor-pointer" @click="collapse">
    <i-ep-expand v-if="themeConfig.isCollapse" />
    <i-ep-fold v-else />
  </el-icon>
</template>

<style scoped>

</style>
