<script setup lang="ts">
const openThemeDrawer = () => {
  mittBus.emit('openThemeDrawer')
}
</script>

<template>
  <span i-mdi-tshirt-crew-outline cursor-pointer @click="openThemeDrawer" />
</template>

<style scoped>

</style>
