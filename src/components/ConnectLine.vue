<script setup lang="ts">
interface Props {
  width?: number
  height?: number
  lightColor?: string
  darkColor?: string
  isBackground?: boolean // 是否背景
  pointFadeTime?: number // 点存在时间
  maxLength?: number // 两点之间最大可连接距离
  lineWidth?: number // 线粗
}

const props = withDefaults(defineProps<Props>(), {
  lightColor: '#000000',
  darkColor: '#ffffff',
  isBackground: false,
  pointFadeTime: 3000,
  maxLength: 100,
  lineWidth: 0.3,
})
const {
  width: propWidth,
  height: propHeight,
  lightColor,
  darkColor,
  isBackground,
  pointFadeTime,
  maxLength: propMaxLength,
  lineWidth,
} = props

const el = ref<HTMLElement>()
const canvasEl = ref<HTMLCanvasElement>()

let width = $ref(propWidth!)
let height = $ref(propHeight!)
let maxLength = $ref(propMaxLength)
const ctx = $computed(() => canvasEl.value!.getContext('2d')!)

const color = ref<string>('')

function updateConfig() {
  // // 如果没有默认值获取dom的宽高

  if (isBackground) {
    width = Math.floor(el.value!.clientWidth)
    height = Math.floor(el.value!.clientHeight)
    maxLength = Math.max(maxLength, width / 4, height / 4)
  }
  else {
    width = propWidth || Math.floor(el.value!.clientWidth)
    height = propHeight || Math.floor(el.value!.clientHeight)
    // 如果没给默认值
    maxLength = propMaxLength === 100 ? Math.max(maxLength, width / 4, height / 4) : propMaxLength
  }
  color.value = isDark.value ? darkColor : lightColor
}

function getFade(t = 0, ts = 0) {
  return 1 - (ts - t) / pointFadeTime
}

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

// 平方
function square(x: number) {
  return x ** 2
}

// 三角函数
function distance([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  return Math.sqrt(square(x1 - x2) + square(y1 - y2))
}

function toHex(c: number) {
  return c.toString(16).padStart(2, '0')
}

let points: [number, number, number][] = []
function updateCanvas() {
  const curTime = $(useTimestamp())

  points.push([
    random(-maxLength, width + maxLength),
    random(-maxLength, width + maxLength),
    curTime,
  ])

  ctx.clearRect(0, 0, width, height)
  ctx.lineWidth = lineWidth

  // 过滤
  points = points.filter((point, inx) => {
    const [x, y, pointTime] = point
    const fade = getFade(pointTime, curTime)
    // 超过延迟时间了就删掉
    if (fade < 0)
      return false

    // 判断当前点和前面的点所在的位置距离是否短于要求（maxLength）
    for (let i = 0; i < inx; i++) {
      const [x1, y1, prevTime] = points[i]
      // 间距
      const spaceLen = distance([x1, y1], [x, y])
      if (spaceLen <= maxLength) {
        const fade2 = getFade(prevTime, curTime)
        // 计算颜色深浅
        const hexColor = Math.max(0, Math.round(fade * fade2 * 255))
        ctx.strokeStyle = `${color.value}${toHex(hexColor)}`
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x, y)
        ctx.stroke()
      }
    }

    return true
  })
}

onMounted(() => {
  updateConfig()
  useRafFn(updateCanvas)
})

watch([isDark, isFullscreen], () => {
  updateConfig()
}, { immediate: false })
</script>

<template>
  <div ref="el" :class="{ 'bg-canvas': isBackground }" pointer-events-none>
    <canvas ref="canvasEl" :width="width" :height="height" />
  </div>
</template>

<style lang="scss" scoped>
.bg-canvas {
  // -webkit-mask-image: radial-gradient(transparent 30%, currentcolor);
  // --webkit-mask-image: radial-gradient(transparent 30%, currentcolor);
}
</style>
