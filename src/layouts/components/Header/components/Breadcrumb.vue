<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { GlobalStore } from '@/stores'
import { AuthStore } from '@/stores/modules/auth'
import { HOME_URL } from '@/config/config'

const route = useRoute()
const { getBreadcrumbList } = AuthStore()
const { themeConfig } = storeToRefs(GlobalStore())
const breadcrumbList = computed(() => {
  // console.log(getBreadcrumbList, getBreadcrumbList[route.path])
  return getBreadcrumbList[route.path]
})
</script>

<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <transition-group name="breadcrumb" mode="out-in">
      <el-breadcrumb-item v-if="breadcrumbList[0].meta.title !== '首页'" :key="HOME_URL" :to="{ path: HOME_URL }">
        <div flex items-center>
          <el-icon v-if="themeConfig.breadcrumbIcon" class="m-r-6px text-16px!">
            <HomeFilled />
          </el-icon>
          <span>首页</span>
        </div>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="{ path: item.path }">
        <div flex items-center>
          <el-icon v-if="item.meta.icon && themeConfig.breadcrumbIcon" class="m-r-6px text-16px!">
            <component :is="item.meta.icon" />
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </div>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style scoped>

</style>
