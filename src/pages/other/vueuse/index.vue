<script setup lang="ts" name="vueuse">
// useClipboard
const { text, copy } = useClipboard()
const copyText = ref('')
// usedebouncefn useThrottleFn
const debounceUpdated = ref(0)
const debounceClicked = ref(0)
const throttleUpdated = ref(0)
const throttleClicked = ref(0)
const debouncedFn = useDebounceFn(() => {
  debounceUpdated.value += 1
}, 1000, { maxWait: 3000 })
const throttleFn = useThrottleFn(() => {
  throttleUpdated.value += 1
}, 1000)
const clickedFn = (key: string, fn: Function) => {
  key === 'debounce' ? debounceClicked.value++ : throttleClicked.value++
  fn()
}
// refDebounced refThrottled
const debouncedAndThrottledInp = ref('')
const debouncedInp = refDebounced(debouncedAndThrottledInp, 1000)
const throttledInp = refThrottled(debouncedAndThrottledInp, 1000)

const val = ref<string>('了解设计指南，帮助产品设计人员搭建逻辑清晰、结构合理且高效易用的产品。使用组件 Demo 快速体验交互细节；使用前端框架封装的代码帮助工程师快速开发。在线主题编辑器，可视化定制和管理站点主题、组件样式。下载相关资源，用其快速搭建页面原型或高保真视觉稿，提升产品设计效率。')

const data = ref([{
  value: '1',
}, {
  value: '2',
  children: [
    {
      value: '2-1',
      action: () => {
        ElMessage({ type: 'success', message: '2-1' })
      },
    },
    {
      value: '2-2',
      children: [{
        value: '2-2-1',
        children: [
          {
            value: '2-2-1-1',
          },
          {
            value: '2-2-1-2',
          },
        ],
      },
      {
        value: '2-2-2',
      }],
    },
  ],
}, {
  value: '3',
}])
const targetRef = ref<HTMLElement[]>()
</script>

<template>
  <div class="card-full">
    <!-- useClipboard -->
    <div>
      <div class="head">
        <el-link href="https://vueuse.org/core/useclipboard" target="_blank">
          useClipboard (copy复制)
        </el-link>
      </div>
      <div class="card">
        <div m-b-2>
          当前复制的值 <code>{{ text || 'none' }}</code>
        </div>
        <el-input v-model="copyText">
          <template #append>
            <el-button @click="copy(copyText)">
              copy
            </el-button>
          </template>
        </el-input>
      </div>
    </div>
    <!-- usedebouncefn useThrottleFn -->
    <div>
      <div class="head">
        <el-link href="https://vueuse.org/shared/usedebouncefn" target="_blank">
          useDebounceFn (按钮防抖)
        </el-link>
        <el-link href="https://vueuse.org/shared/usethrottlefn" target="_blank">
          useThrottleFn (按钮节流)
        </el-link>
      </div>
      <div class="card" grid grid-cols-2 gap-2>
        <el-button @click="clickedFn('debounce', debouncedFn)">
          Debounce
        </el-button>
        <el-button class="m-l-none!" @click="clickedFn('throttle', throttleFn)">
          Throttle
        </el-button>
        <div class="note m-t-2" style="grid-column-start:span 2">
          设置了 1000ms 延迟 和最大 3000ms 间隔时间
        </div>
        <div>
          <p>点击次数: {{ debounceClicked }}</p>
          <p>防抖后实际次数: {{ debounceUpdated }}</p>
        </div>
        <div>
          <p>点击次数: {{ throttleClicked }}</p>
          <p>防抖后实际次数: {{ throttleUpdated }}</p>
        </div>
      </div>
    </div>
    <!-- refDebounced refThrottled -->
    <div>
      <div class="head">
        <el-link href="https://vueuse.org/shared/refdebounced" target="_blank">
          refDebounced (输入防抖)
        </el-link>
        <el-link href="https://vueuse.org/shared/refthrottled" target="_blank">
          refThrottled (输入节流)
        </el-link>
      </div>
      <div class="card max-w-100">
        <el-input v-model="debouncedAndThrottledInp" />
        <div class="note m-t-2">
          设置了 1000ms 延迟
        </div>
        <div grid grid-cols-2 gap-2>
          <span break-words>Debounced: {{ debouncedInp }}</span>
          <span break-words>Throttled: {{ throttledInp }}</span>
        </div>
      </div>
    </div>

    <div class="card">
      <!-- 高度必填 可用 line-clamp-n 或者 show-dots 来展示省略号 -->
      <line-clamp :value="val" h="12!" line-clamp-2>
        <!-- 自定义在省略号后的结尾内容 -->
        <template #omit>
          <el-button size="small" type="warning">
            自定义结尾
          </el-button>
        </template>
        {{ val }}
      </line-clamp>
    </div>

    <div class="card flex-row! gap-2">
      <ContextMenu :data="data" :target-ref="targetRef" />

      <div v-for="i in 2" :key="i" ref="targetRef" class="card w-full">
        试试右键
      </div>
    </div>
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
.el-link{
  margin: 0 0.25em;
  font-size: 1rem;
}
code {
  --at-apply: text-3.5 p-x-2 p-y-1 b-rd-1.5 bg-[var(--el-fill-color)] text-[var(--el-text-color-regular)];
}
.note{
  --at-apply: text-3.6 opacity-70;
}
</style>
