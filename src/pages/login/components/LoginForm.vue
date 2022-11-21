<script setup lang="ts">
import type { FormInstance } from 'element-plus'

import type { Login } from '@/api/interface'
import { loginApi } from '@/api/modules/login'
import { GlobalStore } from '@/stores'
import { TabsStore } from '@/stores/modules/tabs'
import { HOME_URL } from '@/config/config'
import { getTimeState } from '@/utils/util'
import { initDynamicRouter } from '@/routers/modules/dynamicRouter'

const router = useRouter()
const tabsStore = TabsStore()
const globalStore = GlobalStore()

const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const loginForm = reactive<Login.ReqLoginForm>({ username: '', password: '' })
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
// resetForm
const resetForm = () => {
  loginFormRef.value?.resetFields()
}

const login = () => {
  loginFormRef.value?.validate(async (valid) => {
    if (!valid)
      return
    loading.value = true
    try {
      // 1.执行登录接口
      const { data } = await loginApi({ ...loginForm, password: loginForm.password })
      const { token } = storeToRefs(globalStore)
      token.value = data.access_token

      // 2.添加动态路由
      await initDynamicRouter()

      // 3.清除上个账号的 tab 信息
      tabsStore.closeMultipleTab()

      // 4.跳转到首页
      router.push(HOME_URL)
      ElNotification({
        title: getTimeState(),
        message: '欢迎登录',
        type: 'success',
        duration: 3000,
      })
    }
    finally {
      loading.value = false
    }
  })
}
// 监听回车键
const { enter } = useMagicKeys()
whenever(enter, () => {
  login()
})
</script>

<template>
  <div v-bind="$attrs">
    <ElForm ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名：admin / user">
          <template #prefix>
            <el-icon>
              <user />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="密码：123456" show-password autocomplete="new-password">
          <template #prefix>
            <el-icon>
              <lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-button w-full icon="CircleClose" round @click="resetForm()">
            重置
          </el-button>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-button w-full icon="UserFilled" round type="primary" :loading="loading" @click="login()">
            登录
          </el-button>
        </el-col>
      </el-form-item>
    </ElForm>
  </div>
</template>

<style scoped lang="scss">
</style>
