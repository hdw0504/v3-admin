<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { GlobalStore } from '@/stores'
import { AuthStore } from '@/stores/modules/auth'
import { HOME_URL } from '@/config/config'
import { hump2line } from '@/utils/string'
import ArrowRight from '~icons/ep/arrow-right'

const route = useRoute()
const { getBreadcrumbList } = AuthStore()
const { themeConfig } = storeToRefs(GlobalStore())
const breadcrumbList = computed(() => {
  // console.log(getBreadcrumbList, getBreadcrumbList[route.path])
  return getBreadcrumbList[route.path]
})
</script>

<template>
  <el-breadcrumb display-none xl:display-initial :separator-icon="ArrowRight">
    <transition-group name="breadcrumb" mode="out-in">
      <el-breadcrumb-item v-if="breadcrumbList[0].meta.title !== '首页'" :key="HOME_URL" :to="{ path: HOME_URL }">
        <div flex items-center>
          <el-icon v-if="themeConfig.breadcrumbIcon" class="m-r-6px text-1.1em!">
            <i-ep-home-filled />
          </el-icon>
          <span>首页</span>
        </div>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="{ path: item.path }">
        <div flex items-center>
          <Icon v-if="item.meta.icon && themeConfig.breadcrumbIcon" class="m-r-6px text-1.1em!" :icon="`ep:${hump2line(item.meta.icon)}`" />
          <!-- <el-icon v-if="item.meta.icon && themeConfig.breadcrumbIcon" class="m-r-6px text-1.1em!">
            <component :is="item.meta.icon" />
          </el-icon> -->
          <span>{{ item.meta.title }}</span>
        </div>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style scoped>

</style>
