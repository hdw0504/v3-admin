<script setup lang="ts">
const { x, y, sourceType } = useMouse()
</script>

<template>
  <div>
    <slot :x="x" :y="y" :source-type="sourceType" />
  </div>
</template>

<style scoped>

</style>
