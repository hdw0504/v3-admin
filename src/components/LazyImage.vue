<script setup lang="ts" name="LazyImage">
// 因为基础样式有宽度和高度限制，需要加 important 去提高优先级
const props = defineProps<{
  src: string
}>()

const loading = ref(true)
const skeletonImgRef = ref()

onMounted(() => {
  const img = new Image()
  img.onload = () => {
    loading.value = false
  }
  img.src = props.src
})
</script>

<template>
  <el-skeleton v-bind="$attrs" :loading="loading" variant="image" :rows="1" animated>
    <template #template>
      <el-skeleton-item ref="skeletonImgRef" v-bind="$attrs" variant="image" />
    </template>
    <template #default>
      <img v-bind="$attrs" :src="src">
    </template>
  </el-skeleton>
</template>

<style lang="scss" scoped>
</style>
