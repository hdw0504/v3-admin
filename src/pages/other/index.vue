<script setup lang="ts">
import Test from './test.vue'

const testInp = ref('')
const name = ref('name')
const text = ref('text')
</script>

<template>
  <div class="card-full">
    父子传参
    <Test v-model="testInp" v-model:name="name" class="w-100" :text="text" @text-change="(v) => { text = v }" />
  </div>
</template>

<style scoped>

</style>
