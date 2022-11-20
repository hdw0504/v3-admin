<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { GlobalStore } from '@/stores'
import router from '@/routers'
import { LOGIN_URL } from '@/config/config'

const { token } = storeToRefs(GlobalStore())

const openDialog = (refName: string) => {
  ElMessage({
    type: 'warning',
    message: '功能暂未实现，敬请期待',
  })
}
const logout = () => {
  ElMessageBox.confirm('是否确认退出登录?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    router.replace(LOGIN_URL)
    token.value = ''
    ElMessage({
      type: 'success',
      message: '退出登录成功！',
    })
  })
}
</script>

<template>
  <el-dropdown trigger="click">
    <div i-twemoji-pig-face text-6 />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="openDialog('infoRef')">
          <el-icon><User /></el-icon>个人信息
        </el-dropdown-item>
        <el-dropdown-item @click="openDialog('passwordRef')">
          <el-icon><Edit /></el-icon>修改密码
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <el-icon><SwitchButton /></el-icon>退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>

</style>
