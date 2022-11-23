<script setup lang="ts" name="login">
import LoginForm from './components/LoginForm.vue'
import sunny from '~icons/ep/sunny'
import moon from '~icons/ep/moon'
</script>

<template>
  <div class="bg">
    <div class="box">
      <el-switch
        :model-value="isDark"
        class="theme-switch" inline-prompt
        active-color="#0a0a0a" inactive-color="#dcdfe6"
        :active-icon="sunny" :inactive-icon="moon"
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
