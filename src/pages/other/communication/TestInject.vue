<script setup lang="ts">
interface injectProps {
  provideInp: string
  provideChange: Function
}
// 不加感叹号会有 undefined 类型，或者给 inject 第二个参数提供默认值
const { provideInp: val, provideChange } = inject<injectProps>('testInject', {
  provideInp: 'default value',
  provideChange: () => {},
})
</script>

<template>
  <div mt-2>
    child inject : {{ val }}
    <el-button @click="provideChange">
      change
    </el-button>
  </div>
</template>

<style scoped>

</style>
