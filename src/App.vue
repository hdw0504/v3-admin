<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import en from 'element-plus/es/locale/lang/en'

import { GlobalStore } from '@/stores'

// 配置全局组件大小 (small/default(medium)/large)
const { assemblySize } = storeToRefs(GlobalStore())
// // 配置element按钮文字中间是否有空格
const config = reactive({
  autoInsertSpace: false,
})
// 标题
useTitle(import.meta.env.VITE_GLOB_APP_TITLE)
</script>

<template>
  <el-config-provider :button="config" :size="assemblySize" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss">
</style>
