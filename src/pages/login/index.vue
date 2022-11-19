<script setup lang="ts" name="login">
import LoginForm from './components/LoginForm.vue'
import { isDark } from '@/composables/dark'
// import { storeToRefs } from 'pinia'
// import { GlobalStore } from '@/stores'
// const { assemblySize } = storeToRefs(GlobalStore())
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
      <img img-resize w-536px h-354px shadow-2xl rd-4 src="https://picsum.photos/536/354" alt="">
      <LoginForm class="form" flex-1 max-w-500px p-10 p-b-4 rd-4 shadow-xl />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
