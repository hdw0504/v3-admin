<script setup lang="ts">
import { TestInjectionKey } from './injection-key'

// 不加感叹号会有 undefined 类型，或者给 inject 第二个参数提供默认值
const { provideInp: val, provideChange } = inject(TestInjectionKey, {
  provideInp: ref('default value'),
  provideChange: () => {},
})
</script>

<template>
  <div mt-2>
    child inject : {{ val }}
    <el-button @click="provideChange">
      click provide fn
    </el-button>
  </div>
</template>

<style scoped>

</style>
