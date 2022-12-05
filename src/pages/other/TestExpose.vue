<script setup lang="ts">
const openMessage = () => {
  ElMessage({
    type: 'success',
    message: 'ElMessage',
  })
}
const openNotification = () => {
  ElNotification({
    title: 'Prompt',
    message: 'ElNotification',
  })
}

// 对外释放的方法
defineExpose({
  openMessage,
  openNotification,
})
</script>

<template>
  <div mb-2>
    Im child expose
  </div>
</template>

<style scoped>

</style>
