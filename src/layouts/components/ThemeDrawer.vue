<script setup lang="ts">
import { GlobalStore } from '@/stores'
// import { DEFAULT_PRIMARY } from '@/config/config'

const drawerVisible = ref(false)
mittBus.on('openThemeDrawer', () => {
  drawerVisible.value = true
})
const { themeConfig } = storeToRefs(GlobalStore())

// const { changeThemeColor } = useTheme()
// // 预定义主题颜色
// const colorList = [
//   DEFAULT_PRIMARY,
//   '#DAA96E',
//   '#0C819F',
//   '#409EFF',
//   '#27ae60',
//   '#ff5c93',
//   '#e74c3c',
//   '#fd726d',
//   '#f39c12',
//   '#9b59b6',
// ]
</script>

<template>
  <el-drawer v-model="drawerVisible" title="布局设置" size="300px" direction="rtl">
    <!-- 布局切换 -->
    <!-- <el-divider content-position="center">
      <el-icon><Notification /></el-icon>
      布局切换
    </el-divider> -->

    <el-divider content-position="center">
      <el-icon><ColdDrink /></el-icon>
      全局主题
    </el-divider>
    <!-- <div class="theme-item">
      <span>主题颜色</span>
      <el-color-picker v-model="themeConfig.primary" :predefine="colorList" @change="changeThemeColor" />
    </div> -->
    <div class="theme-item">
      <span>暗黑模式</span>
      <el-switch
        :model-value="isDark" inline-prompt
        active-icon="Sunny" inactive-icon="Moon"
        @change="toggleDark()"
      />
    </div>

    <!-- 界面设置 -->
    <el-divider content-position="center">
      <el-icon><Setting /></el-icon>
      界面设置
    </el-divider>
    <div>
      <span>折叠菜单</span>
      <el-switch v-model="themeConfig.isCollapse" />
    </div>
    <div>
      <span>面包屑</span>
      <el-switch v-model="themeConfig.breadcrumb" />
    </div>
    <div>
      <span>面包屑图标</span>
      <el-switch v-model="themeConfig.breadcrumbIcon" />
    </div>
    <div>
      <span>标签栏</span>
      <el-switch v-model="themeConfig.tabs" />
    </div>
    <div>
      <span>标签栏图标</span>
      <el-switch v-model="themeConfig.tabsIcon" />
    </div>
    <div>
      <span>页脚</span>
      <el-switch v-model="themeConfig.footer" />
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.el-drawer .el-drawer__body{
  &>div:not(.el-divider){
    --at-apply: flex justify-between items-center m-y-2;
  }
}
.el-icon{
  top:0.15em;
}
</style>
