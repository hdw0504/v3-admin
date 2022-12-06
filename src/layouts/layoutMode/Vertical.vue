<script setup lang="ts" name="layoutVertical">
import Footer from '../Footer.vue'
import Header from '../Header.vue'
import Main from '../Main.vue'
import Tabs from '../Tabs.vue'
import { GlobalStore } from '@/stores'
import { AuthStore } from '@/stores/modules/auth'
import SubMenu from '@/layouts/components/SubMenu.vue'

const route = useRoute()
const activeMenu = computed(() => route.path)

const { themeConfig } = storeToRefs(GlobalStore())
const { getMenuList } = storeToRefs(AuthStore())
// console.log(getMenuList)
</script>

<template>
  <el-container w-full h-full min-w-740px>
    <el-aside>
      <div class="menu" :class="[themeConfig.isCollapse ? 'w-[var(--menu-hide)]' : 'w-[var(--menu-show)]']">
        <div flex justify-center items-center box-border b-b="~ [var(--logo-border-color)]" h="[var(--header-height)]">
          <img src="@/assets/images/logo.svg" alt="logo">
          <span v-show="!themeConfig.isCollapse" m-l-2 font-bold truncate text="8 [var(--logo-color)]">wink</span>
        </div>
        <el-scrollbar>
          <el-menu
            class="overflow-x-hidden b-r-none!"
            :default-active="activeMenu" :collapse="themeConfig.isCollapse"
            :router="false" :collapse-transition="false" :unique-opened="true"
          >
            <SubMenu :menu-list="getMenuList" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>

    <el-container>
      <el-header>
        <Header />
      </el-header>

      <Tabs v-if="themeConfig.tabs" />

      <el-main>
        <Main />
      </el-main>

      <el-footer v-if="themeConfig.footer">
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-aside{
 --at-apply: overflow-inherit box-border w-auto\! bg-[var(--menu-bg-color)] b-r b-r-[var(--menu-bg-color)] dark:b-r-[var(--border-color)];
 .menu{
  --at-apply: flex flex-col h-full transition-width transition-ease transition-duration-300;
    .el-scrollbar {
      height: calc(100% - 55px);
    }
  }
}
.el-header{
  --at-apply: flex items-center justify-between box-border dark:bg-[var(--el-bg-color)] b-b b-b-[var(--border-color)];
}
.el-main{
  --at-apply: bg-[var(--main-bg-color)] box-border p-10px overflow-x-hidden;
  &::-webkit-scrollbar {
    --at-apply: bg-[var(--main-bg-color)];
  }
}
.el-footer{
  --at-apply: box-border color-fade font-sans flex justify-center items-center text-sm dark:bg-[var(--el-bg-color)] b-t b-t-[var(--border-color)];
}
</style>
