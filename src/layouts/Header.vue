<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Collapse from './components/Collapse.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import AssemblySize from './components/AssemblySize.vue'
import Fullscreen from './components/Fullscreen.vue'
import Avatar from './components/Avatar.vue'
import Dark from './components/Dark.vue'
import { GlobalStore } from '@/stores'

const { themeConfig } = storeToRefs(GlobalStore())
</script>

<template>
  <!-- left -->
  <div flex justify-center items-center>
    <Collapse />
    <Breadcrumb v-if="themeConfig.breadcrumb" />
  </div>
  <!-- right -->
  <div flex justify-center items-center gap-4 mr-4>
    <Dark />
    <AssemblySize />
    <!-- <Language /> -->
    <!-- <SearchMenu /> -->
    <!-- <ThemeSetting/> -->
    <!-- <Message /> -->
    <Fullscreen />
    <span>piggy</span>
    <Avatar />
  </div>
</template>

<style scoped>

</style>
