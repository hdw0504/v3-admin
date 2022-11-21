<script setup lang="ts">
import { AuthStore } from '@/stores/modules/auth'

const { getKeepAliveRouter } = storeToRefs(AuthStore())
// 刷新当前页面
const isRouterRefresh = ref(true)
const refreshCurrentPage = () => {
  isRouterRefresh.value = false
  nextTick(() => {
    isRouterRefresh.value = true
  })
}
provide('refresh', refreshCurrentPage)
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition appear name="fade-transform" mode="out-in">
      <keep-alive v-if="isRouterRefresh" :include="getKeepAliveRouter">
        <component :is="Component" :key="route.path" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped>

</style>
