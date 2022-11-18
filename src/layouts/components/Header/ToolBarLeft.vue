<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CollapseIcon from './components/CollapseIcon.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import { GlobalStore } from '@/stores'

const { themeConfig } = storeToRefs(GlobalStore())
</script>

<template>
  <div flex justify-center items-center>
    <CollapseIcon />
    <Breadcrumb v-if="themeConfig.breadcrumb" />
  </div>
</template>

<style scoped>

</style>
