<script setup lang="ts" name="layoutVertical">
import { storeToRefs } from 'pinia'
import { GlobalStore } from '@/stores'
import { AuthStore } from '@/stores/modules/auth'
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue'
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue'
import SubMenu from '@/layouts/components/Menu/SubMenu.vue'

const route = useRoute()
const activeMenu = computed(() => route.path)

const { themeConfig } = storeToRefs(GlobalStore())
const { getMenuList } = storeToRefs(AuthStore())
// console.log(getMenuList)
</script>

<template>
  <el-container w-full h-full min-w-740px>
    <el-aside w-auto overflow-inherit class="w-auto! bg-[#191a20] b-r b-r-[#191a20] ">
      <div class="menu" :class="[themeConfig.isCollapse ? 'w-56px' : 'w-210px']">
        <div flex justify-center items-center box-border h-header class="b-b b-b-[#282a35]">
          <!-- <img src="@/assets/images/logo.svg" alt="logo" /> -->
          im logo
          <span v-show="!themeConfig.isCollapse" class="text-[#dadada]">Geeker Admin</span>
        </div>
        <el-scrollbar>
          <el-menu
            class="overflow-x-hidden b-r-none!"
            :default-active="activeMenu" :collapse="themeConfig.isCollapse"
            :router="false" :collapse-transition="false" :unique-opened="true"
            background-color="#191a20" text-color="#bdbdc0" active-text-color="#ffffff"
          >
            <SubMenu :menu-list="getMenuList" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header flex items-center justify-between box-border h-header class="p-x-15px! b-b b-b-[#f1f1f1]">
        <ToolBarLeft />
        <ToolBarRight />
      </el-header>
      main
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.menu{
  --at-apply: flex flex-col h-full transition-width transition-ease transition-duration-300
}
.el-scrollbar {
  height: calc(100% - 55px);
}
:deep(.el-menu-item.is-active) {
  background: #060708;
  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    content: "";
    background: var(--el-color-primary);
  }
}
</style>
