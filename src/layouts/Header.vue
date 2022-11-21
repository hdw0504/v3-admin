<script setup lang="ts">
import Collapse from './components/Collapse.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Dark from './components/Dark.vue'
import AssemblySize from './components/AssemblySize.vue'
import ThemeSetting from './components/ThemeSetting.vue'
import Fullscreen from './components/Fullscreen.vue'
import Avatar from './components/Avatar.vue'
import { GlobalStore } from '@/stores'

const { themeConfig } = storeToRefs(GlobalStore())
</script>

<template>
  <!-- left -->
  <div flex justify-center items-center>
    <Collapse />
    <Breadcrumb v-if="themeConfig.breadcrumb" />
  </div>
  <!-- right 给 loading 腾位置 -->
  <div flex justify-center items-center gap-4 mr-8>
    <Dark />
    <AssemblySize />
    <!-- <Language /> -->
    <!-- <SearchMenu /> -->
    <ThemeSetting />
    <!-- <Message /> -->
    <Fullscreen />
    <span>piggy</span>
    <Avatar />
  </div>
</template>

<style scoped>

</style>
