<script setup lang="ts" name="login">
import LoginForm from './components/LoginForm.vue'
import { isDark } from '@/composables/dark'

// 解决 unplugin-auto-import 在加载登录页的时候并未注册 ElMessage 和 ElNotification
if (!ElMessage || !ElNotification) {
  ElMessage.closeAll()
  ElNotification.closeAll()
}
</script>

<template>
  <div class="bg">
    <div class="box">
      <el-switch
        :model-value="isDark"
        class="theme-switch" inline-prompt
        active-color="#0a0a0a" inactive-color="#dcdfe6"
        active-icon="Sunny" inactive-icon="Moon"
        @change="toggleDark()"
      />
      <LazyImage src="https://picsum.photos/536/354" class="w-536px! h-354px! rd-4! img-resize shadow-2xl" />
      <LoginForm class="form" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
