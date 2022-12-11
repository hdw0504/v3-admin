<script setup lang="tsx">
import type { MaybeRef } from '@vueuse/core'
import type { VNode } from 'vue'
import { isArray } from '@/utils/is'

interface Item {
  label: string
  children?: Item[]
}
const arr = ref<Item[]>([
  {
    label: '',
  },
])
function appendChild(column: Item) {
  if (!isArray(column.children))
    column.children = []
  column.children.push({
    label: `${column.label ? `${column.label}-` : ''}${column.children.length + 1}`,
  })
}

function renderColumn(columns: Item[]): () => VNode[] {
  return () => columns.map(col => h(renderItem(col)))
}

function renderItem(column: Item): () => VNode {
  return () => <>
        <div class='card max-h-none! flex flex-col gap-4'>
            <div>
              {column.label}
              <el-button class='ml-4' onClick={() => appendChild(column)}>append child</el-button>
            </div>

            {/* 加上 h() 是让函数变成 vNode */}
            {isArray(column.children) && h(renderColumn(column.children))}
        </div>
    </>
}

// 最大深度
function maxDepth(arr: MaybeRef<Item[]>, max = 0): number {
  return unref(arr).reduce((prev, cur) => {
    if (cur.children)
      return Math.max(maxDepth(cur.children, max + 1), prev, max)

    return Math.max(prev, max)
  }, max)
}

const popoverWidth = computed(() => Math.max(maxDepth(arr) + 3, 5) * 50)
</script>

<template>
  <div class="card-full">
    <p mb-2>
      使用 jsx 实现递归组件, 当前最大深度为 {{ maxDepth(arr) }}
      <el-popover placement="bottom" trigger="click" :width="popoverWidth">
        <template #reference>
          <el-button> 数据 </el-button>
        </template>
        <div>
          <pre class="card">{{ arr }}</pre>
        </div>
      </el-popover>
    </p>
    <!-- 递归组件 -->
    <component :is="renderColumn(arr)" />
  </div>
</template>

<style lang="scss" scoped>
</style>
