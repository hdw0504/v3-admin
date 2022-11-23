<script setup lang="ts">
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import en from 'element-plus/es/locale/lang/en'

import { GlobalStore } from '@/stores'

// 配置全局组件大小 (small/default(medium)/large)
const { assemblySize } = storeToRefs(GlobalStore())
// // 配置element按钮文字中间是否有空格
const config = reactive({
  autoInsertSpace: false,
})
</script>

<template>
  <el-config-provider :button="config" :size="assemblySize">
    <suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <i-ep-loading />
      </template>
    </suspense>
  </el-config-provider>
</template>

<style lang="scss">
</style>
