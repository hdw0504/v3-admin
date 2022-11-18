<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { GlobalStore } from '@/stores'

const { themeConfig } = storeToRefs(GlobalStore())
</script>

<template>
  <div flex justify-center items-center gap-20px>
    <div flex justify-between items-center>
      123
    </div>
    <span>username</span>
  </div>
</template>

<style scoped>

</style>
