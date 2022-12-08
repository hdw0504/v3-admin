<script setup lang="ts" name="other">
import TestProps from './TestProps.vue'
import TestInject from './TestInject.vue'
import TestExpose from './TestExpose.vue'
import TestSlot from './TestSlot.vue'

import MoonIcon from '~icons/ep/moon'

// https://cn.vuejs.org/guide/typescript/composition-api.html

const testInp = ref('v-model')
const name = ref('v-model:name')
const text = ref(':text')

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
    <div>
      <div class="head">
        props传参
      </div>
      <div class="card w-100">
        <TestProps v-model="testInp" v-model:name="name" :text="text" @text-change="(v) => { text = v }" />
      </div>
    </div>

    <div>
      <div class="head">
        provide inject传参
      </div>
      <div class="card">
        <el-input v-model="provideInp" />
        <TestInject />
      </div>
    </div>

    <div>
      <div class="head">
        父组件调用子组件方法（defineExpose）
      </div>
      <div class="card">
        <TestExpose ref="testFn" />
        <el-button @click="testFn?.openMessage">
          child message
        </el-button>
        <el-button @click="testFn?.openNotification">
          child notification
        </el-button>
      </div>
    </div>

    <div>
      <div class="head">
        slot插槽 使用（useMouse）
      </div>
      <div class="card">
        <TestSlot v-slot="{ x, y, sourceType }">
          <div>x: {{ x }}</div>
          <div>y: {{ y }}</div>
          <div>sourceType: {{ sourceType }}</div>
        </TestSlot>
      </div>
    </div>

    <div>
      <div class="head">
        项目内置svg (自定义、自动注册、手动注册)
      </div>
      <div class="card">
        <i-icons-test />
        <i-mdi-account />
        <MoonIcon />
      </div>
    </div>

    <!-- <div>
      <div class="head">
      </div>
      <div class="card">
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.card-full{
  >div{
    --at-apply: inline-flex flex-col min-w-100 m-r-2 m-b-2;
    &:last-child{
      --at-apply: m-r-0 m-b-0;
    }
    .head{
      --at-apply: m-b-2;
    }
  }
}
</style>
