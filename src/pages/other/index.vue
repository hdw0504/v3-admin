<script setup lang="ts" name="other">
import TestProps from './TestProps.vue'
import TestInject from './TestInject.vue'
import TestExpose from './TestExpose.vue'
import TestSlot from './TestSlot.vue'

// https://cn.vuejs.org/guide/typescript/composition-api.html

const testInp = ref('')
const name = ref('name')
const text = ref('text')

const provideInp = ref('provide')
const provideChange = () => {
  provideInp.value = provideInp.value === 'provide' ? 'new provide' : 'provide'
}
// 用对象穿方便子组件拆
provide('testInject', { provideInp, provideChange })

const testFn = ref<InstanceType<typeof TestExpose>>()
</script>

<template>
  <div class="card-full">
    <div w-100>
      props传参
      <TestProps v-model="testInp" v-model:name="name" :text="text" @text-change="(v) => { text = v }" />
    </div>

    <div w-100>
      provide inject传参
      <el-input v-model="provideInp" />
      <TestInject />
    </div>

    <div w-100>
      父组件调用子组件方法（defineExpose）
      <TestExpose ref="testFn" />
      <el-button @click="testFn?.openMessage">
        child message
      </el-button>
      <el-button @click="testFn?.openNotification">
        child notification
      </el-button>
    </div>

    <div w-100>
      slot插槽 使用（useMouse）
      <TestSlot v-slot="{ x, y, sourceType }">
        <div>x: {{ x }}</div>
        <div>y: {{ y }}</div>
        <div>sourceType: {{ sourceType }}</div>
      </TestSlot>
    </div>
    <div w-100>
      自定义svg和自动注册svg
      <i-icons-test />
      <i-mdi-account />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-full{
  >div:not(:first-child){
    --at-apply: m-t-6;
  }
}
</style>
