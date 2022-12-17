<script setup lang="tsx">
import type { VNode } from 'vue'
import type { ColumnProps, HeaderScope, RowScope } from './types'
import { defaltColumnProp, slotKey } from './config'
import { isArray } from '@/utils/is'

interface Props {
  column: ColumnProps
}

defineProps<Props>()
const opSlots = useSlots()
const tableSlots = inject(slotKey)
// console.log({ opSlots, tableSlots })

const renderCol = (column: ColumnProps): VNode => {
  return h(ElTableColumn, defaltColumnProp(column),
    isArray(column.children)
      ? {
          default: () => column.children!.map(i => renderCol(i)),
        }
      : {
          header: (scope: HeaderScope) => {
            if (tableSlots?.[`${column.prop}Header`])
              return tableSlots[`${column.prop}Header`]!(scope)

            return column.label ?? '--'
          },
          default: (scope: RowScope) => {
            if (column.prop) {
              if (column.prop !== 'operation') {
              // 非操作插槽，如果有找到插槽就用
                return tableSlots?.[column.prop]
                  ? tableSlots[column.prop]!(scope)
                  : scope.row[column.prop] ?? '--'
              }
              // 操作插槽
              return opSlots.default!(scope)
            }
            else {
              return '--'
            }
          },
        },
  )
}
</script>

<template>
  <component :is="renderCol(column)" />
</template>

<style scoped>

</style>
