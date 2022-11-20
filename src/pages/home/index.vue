<script setup name="home">
const openMessage = () => {
  ElMessage({
    type: 'success',
    message: 'ElMessage',
  })
}
const openMessageBox = () => {
  ElMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    },
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
const openNotification = () => {
  ElNotification({
    title: 'Prompt',
    message: 'ElNotification',
  })
}
</script>

<template>
  <div class="card w-full h-full">
    <el-button @click="openMessage">
      message
    </el-button>
    <el-button @click="openMessageBox">
      message box
    </el-button>
    <el-button @click="openNotification">
      notification
    </el-button>
  </div>
</template>

<style lang="scss" scoped>

</style>
