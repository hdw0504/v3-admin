<script setup lang="ts" name="404">
import { HOME_URL } from '@/config/config'
</script>

<template>
  <div class="not-container">
    <span text-40 i-twemoji-flying-saucer />
    <div class="not-detail">
      <div>404</div>
      <div>抱歉，您访问的页面不存在~ 🤷‍♂️🤷‍♀️</div>
      <el-button type="primary" @click="$router.push(HOME_URL)">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>
