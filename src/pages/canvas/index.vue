<script setup lang="ts" name="canvas">

</script>

<template>
  <div class="card-full">
    <Plum class="card" :width="400" :height="400" />
    <ConnectLine class="card" :width="400" :height="400" />
  </div>
</template>

<style lang="scss" scoped>
.card{
  --at-apply: box-content p-0 w-400px h-400px;
  --at-apply: inline-flex flex-col min-w-100 m-r-2 m-b-2;
    &:last-child{
      --at-apply: m-r-0 m-b-0;
    }
}
</style>
