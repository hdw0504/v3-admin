<script setup lang="tsx">
import type { ColumnProps } from './types'
import { isArray } from '@/utils/is'

interface Props {
  columns: ColumnProps[]
}

defineProps<Props>()

function useRenderColumn(columns: ColumnProps<any>[]) {
  return () => columns.map(col => useRenderItem(col))
}

function useRenderItem(column: ColumnProps<any>) {
  return <>
    <div class='card'>
        {column.label}
        {isArray(column.children) && h(useRenderColumn(column.children!))}
    </div>
    </>
}
</script>

<template>
  <component :is="useRenderColumn(columns)" />
</template>

<style scoped>

</style>
