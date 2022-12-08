<script setup lang="ts">
import Loading from './Loading.vue'
</script>

<template>
  <suspense>
    <template #default>
      <slot />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </suspense>
</template>

<style scoped>

</style>
