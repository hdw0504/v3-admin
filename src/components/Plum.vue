<script setup lang="ts">
/**
 * 一剪梅
 * 可设置固定值 也可以根据父元素dom宽高自动设置
 * 可设置为背景 (背景虚化和无法点击)
 */
interface Props {
  width?: number
  height?: number
  branchLen: number // 单分支长度
  initBranch: number // 最少分支数
  frameDelay: number // 帧动画间隔
  lightColor: string
  darkColor: string
  isBackground: boolean // 是否背景
}

interface Point {
  x: number
  y: number
}

interface Branch {
  start: Point
  length: number
  angle: number // 角度
}
const props = withDefaults(defineProps<Props>(), {
  branchLen: 6,
  initBranch: 4,
  frameDelay: 2,
  lightColor: '#606266',
  darkColor: '#A3A6AD',
  isBackground: false,
})
const { width: propWidth, height: propHeight, branchLen, initBranch, frameDelay, lightColor, darkColor } = props

const el = ref<HTMLElement>()
const canvasEl = ref<HTMLCanvasElement>()

let width = $ref(propWidth!)
let height = $ref(propHeight!)
const ctx = $computed(() => canvasEl.value!.getContext('2d')!)

const r180 = Math.PI
const r90 = Math.PI / 2
const r15 = Math.PI / 12

// 初始化
function init() {
  ctx.strokeStyle = isDark.value ? darkColor : lightColor
  ctx.lineWidth = 1
  const length = branchLen * Math.random()

  let b1: Branch
  let b2: Branch
  if (Math.random() < 0.5) {
    b1 = {
      start: { x: 0, y: Math.random() * height },
      length,
      angle: 0,
    }
    b2 = {
      start: { x: width, y: Math.random() * height },
      length,
      angle: r180,
    }
  }
  else {
    b1 = {
      start: { x: Math.random() * width, y: 0 },
      length,
      angle: r90,
    }
    b2 = {
      start: { x: Math.random() * width, y: height },
      length,
      angle: -r90,
    }
  }
  // branch 分支
  step(b1)
  step(b2)
}

// 存放生成枝条的任务队列 广度优先
let penddingTasks: Function[] = []
function frame() {
  const tasks = [...penddingTasks]
  penddingTasks.length = 0
  tasks.forEach(fn => fn())
}

let framesCount = 0
function startFrame() {
  requestAnimationFrame(() => {
    framesCount++
    // 如果还有分支
    if (framesCount % frameDelay === 0)
      frame()
    startFrame()
  })
}
startFrame()

function cleanTaskAndFrame() {
  penddingTasks = []
  ctx.clearRect(0, 0, width, height)
}

// 递归生成枝条 depth 防止一开始就断了
function step(b: Branch, depth = 0) {
  drawBranch(b)
  const end = getEndPoint(b)

  if (depth < initBranch || Math.random() < 0.5) {
    penddingTasks.push(() => {
      step({
        start: end,
        length: branchLen * Math.random(),
        angle: b.angle - r15 * Math.random(),
      }, depth + 1)
    })
  }

  if (depth < initBranch || Math.random() < 0.5) {
    penddingTasks.push(() => {
      step({
        start: end,
        length: branchLen * Math.random(),
        angle: b.angle + r15 * Math.random(),
      }, depth + 1)
    })
  }
}

// 绘画枝条
function drawBranch(b: Branch) {
  lineTo(b.start, getEndPoint(b))
}

// 画线
function lineTo(p1: Point, p2: Point) {
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.stroke()
}

// 获取结束点
function getEndPoint(b: Branch) {
  const { start, length, angle } = b
  return {
    x: start.x + length * Math.cos(angle),
    y: start.y + length * Math.sin(angle),
  }
}

function startDraw() {
  // // 如果没有默认值获取dom的宽高
  width = propWidth || el.value!.clientWidth
  height = propHeight || el.value!.clientHeight
  // 因为上面有可能会修改宽高导致绘画颜色无法设置上去
  // 使用nextTick等修改后的dom渲染完毕再绘画
  nextTick(() => {
    init()
  })
}

onMounted(() => {
  startDraw()
})

watch([isDark, isFullscreen], () => {
  cleanTaskAndFrame()
  startDraw()
}, { immediate: false })
</script>

<template>
  <div ref="el" :class="{ 'bg-canvas': isBackground }" pointer-events-none>
    <canvas ref="canvasEl" :width="width" :height="height" />
  </div>
</template>

<style lang="scss" scoped>
.bg-canvas {
  -webkit-mask-image: radial-gradient(transparent 30%, currentcolor);
  --webkit-mask-image: radial-gradient(transparent 30%, currentcolor);
}
</style>
