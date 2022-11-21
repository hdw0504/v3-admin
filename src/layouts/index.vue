<script setup  lang="ts" name="layout">
import LayoutVertical from './layoutMode/Vertical.vue'
import ThemeDrawer from './components/ThemeDrawer.vue'
import { GlobalStore } from '@/stores'

const LayoutComponents: { [key: string]: any } = {
  vertical: LayoutVertical,
  // classic: LayoutClassic,
  // transverse: LayoutTransverse,
  // columns: LayoutColumns
}

const { themeConfig } = storeToRefs(GlobalStore())
</script>

<template>
  <component :is="LayoutComponents[themeConfig.layout]" />
  <ThemeDrawer />
</template>

<style lang="scss" scoped>

</style>
