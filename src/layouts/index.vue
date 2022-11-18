<script setup  lang="ts" name="layout">
import { storeToRefs } from 'pinia'
import LayoutVertical from './layoutVertical/index.vue'
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
  <!-- <ThemeDrawer /> -->
</template>

<style lang="scss" scoped>

</style>
