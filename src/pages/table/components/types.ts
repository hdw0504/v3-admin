import type { TableColumnCtx } from 'element-plus'
import type { columnIcons } from './connfig'

export interface ColumnProps<T = any> extends Partial<TableColumnCtx<T>> {
  prop: 'selection' | 'expand' | 'index' | 'operation' | string
  label?: string
}

export interface OperationProps<T = any> {
  label?: any
  icon: columnIcons
  visible?: ({ row, column, $index }: {
    row: T
    column: TableColumnCtx<T>
    $index: number
  }) => boolean
  action: ({ row, column, $index }: {
    row: T
    column: TableColumnCtx<T>
    $index: number
  }) => any
}
