<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { TabsPaneContext } from 'element-plus'
import { GlobalStore } from '@/stores'
import { TabsStore } from '@/stores/modules/tabs'

const route = useRoute()
const router = useRouter()
const tabStore = TabsStore()
const { tabsMenuList } = storeToRefs(tabStore)
const { themeConfig } = storeToRefs(GlobalStore())
const tabsMenuValue = ref(route.path)

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.path,
  () => {
    tabsMenuValue.value = route.path
    const tabsParams = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.path,
      close: !route.meta.isAffix,
    }
    tabStore.addTabs(tabsParams)
  },
  {
    immediate: true,
  },
)

// Tab Click
const tabClick = (tabItem: TabsPaneContext) => {
  const path = tabItem.props.name as string
  router.push(path)
}

// Remove Tab
const tabRemove = (activeTabPath: string) => {
  tabStore.removeTabs(activeTabPath, activeTabPath === route.path)
}
</script>

<template>
  <div flex dark="bg-[var(--el-bg-color)] b-b b-b-[var(--el-border-color-light)]">
    <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
      <el-tab-pane v-for="item in tabsMenuList" :key="item.path" :label="item.title" :name="item.path" :closable="item.close">
        <template #label>
          <el-icon v-if="item.icon && themeConfig.tabsIcon">
            <component :is="item.icon" />
          </el-icon>
          {{ item.title }}
        </template>
      </el-tab-pane>
    </el-tabs>
    <el-button self-center size="small" type="primary">
      更多<el-icon m-l-1>
        <arrow-down />
      </el-icon>
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs){
  // 按钮 64px
  width: calc(100% - 79px);
   .el-tabs__header{
  --at-apply: box-border  m-0 p-x-10px b-none;
  .el-tabs__nav{
    --at-apply: b-none;
  }
  .el-tabs__item{
    --at-apply: b-l-none b-b-2px b-b-current;
    &:not(.is-active){
      --at-apply: b-none text-[#ccc];
    }
  }
  // tab 的 icon 位置不对
  .el-icon{
    font-size: 15px;
    &:not(.is-icon-close){
      top: 2px;
    }
  }
}
}
</style>
