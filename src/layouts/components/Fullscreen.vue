<script setup lang="ts">
const { toggle, isFullscreen } = useFullscreen()
</script>

<template>
  <div :class="isFullscreen ? 'i-mdi-fullscreen-exit' : 'i-mdi-fullscreen'" cursor-pointer @click="toggle" />
</template>

<style scoped>

</style>
