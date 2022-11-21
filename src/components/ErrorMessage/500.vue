<script setup lang="ts" name="500">
import { HOME_URL } from '@/config/config'
</script>

<template>
  <div class="not-container">
    <span text-40 i-twemoji-satellite-antenna />
    <div class="not-detail">
      <div>500</div>
      <div>抱歉，您的网络不见了~ 🤦‍♂️🤦‍♀️</div>
      <el-button type="primary" @click="$router.push(HOME_URL)">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>
