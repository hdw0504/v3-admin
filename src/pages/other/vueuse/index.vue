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
