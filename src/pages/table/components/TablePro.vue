<script setup lang="ts">
import type { TableProps } from 'element-plus'
import { commonIcons, defaltColumnProp, slotKey } from './config'
import type { ColumnProps, OperationProps } from './types'
import ColumnPro from './ColumnPro.vue'
import { isArray, isString } from '@/utils/is'

interface Props<T = any> extends TableProps<T> {
  data: any[]
  columns: ColumnProps<T>[]
  operation?: OperationProps<T>[]
  slot?: string
  selection?: boolean | 'single'
  expand?: boolean
  // ElTable config
  height?: string | number
  maxHeight?: string | number
  fit?: boolean
  stripe?: boolean
  border?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  selection: false,
  expand: false,
  // ElTable config
  fit: true,
  stripe: true,
  border: true,
})

const attrs = useAttrs()
const slots = useSlots()
provide(slotKey, { ...slots })
console.log({ props, attrs, slots })

// 操作按钮
function opIcon(icon: OperationProps['icon']) {
  if (isString(icon)) {
    if (!commonIcons[icon])
      console.warn(`icon '${icon}' is not in commonIcons, please check again.`)
    return commonIcons[icon] ?? null
  }
}
</script>

<template>
  <el-table v-bind="$props">
    <!-- 默认插槽 -->
    <slot />

    <!-- 单选和多选 -->
    <el-table-column
      v-if="selection" width="50px" :type="selection === 'single' ? 'index' : 'selection'"
      v-bind="defaltColumnProp()"
    />

    <!-- 扩展 -->
    <el-table-column
      v-if="expand" v-slot="scope" width="50px" type="expand"
      label="#" v-bind="defaltColumnProp()"
    >
      <slot name="expand" v-bind="scope" />
    </el-table-column>

    <!-- 其余 -->
    <template v-for="column in columns" :key="column">
      <!-- 封装el-column使实现多重表头 -->
      <ColumnPro v-slot="scope" :column="column">
        <!-- 操作按钮 -->
        <template v-if="isArray(operation)">
          <template v-for="op in operation" :key="op.label">
            <el-button
              v-if="op.visible ? op.visible(scope) : true"
              type="primary" link :icon="opIcon(op.icon)"
              @click="op.action(scope)"
            >
              {{ op.label }}
            </el-button>
          </template>
        </template>
      </ColumnPro>
    </template>
  </el-table>
</template>

<style lang="scss" scoped>
// 多选按钮不对齐
:deep(.el-table-column--selection > .cell) {
  justify-content: center;
}
</style>
