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
.bg {
  --at-apply: w-full h-full bg-cover flex items-center justify-center bg-gray-50;
  background-image: url('@/assets/images/login_bg.svg')
}

.box {
  --at-apply: w-90% h-90% relative flex flex-row justify-around items-center gap-10 p-10 m-10 rd-4;
  background-color: hsla(0deg, 0%, 100%, 0.8);
}

.theme-switch {
  --at-apply: absolute top-10 right-10
}

.dark {
  .bg {
    background-color: var(--el-fill-color-extra-light);
  }
  .box {
    background-color: var(--el-mask-color);
  }
  .form{
    --at-apply: shadow-dark;
    background-color: var(--el-bg-color);

  }
}
</style>
