<script setup lang="ts">
interface Props {
  value: string
  showDots?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDots: false,
})

const boxRef = ref<HTMLElement>()

const showOmit = ref<boolean>(false)
function calculateHeight() {
  showOmit.value = boxRef.value!.scrollHeight > boxRef.value!.clientHeight
}
// 内容变化重新计算
watch(
  () => props.value,
  () => {
    // 需要等渲染完毕再去判断
    nextTick(() => {
      calculateHeight()
    })
  },
)
// 容器变化重新计算
useResizeObserver(boxRef, () => {
  calculateHeight()
})
// 首次加载计算
onMounted(() => {
  calculateHeight()
})
</script>

<template>
  <div ref="boxRef" overflow-hidden break-all>
    <!-- 实现省略并且可支持添加按钮 文字等 -->
    <span v-if="showOmit" class="omit-group">
      <span v-if="showDots" mr-1>...</span>
      <slot name="omit" />
    </span>

    <!-- 有可能会省略的内容 -->
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.omit-group {
  --at-apply: float-right h-full flex items-end;
  shape-outside: polygon(
    0 calc(100% - 1em),
    0 100%,
    100% 100%,
    100% calc(100% - 1em)
  );
}
</style>
