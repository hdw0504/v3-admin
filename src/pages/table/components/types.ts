import type { TableColumnCtx } from 'element-plus'
import type { columnIcons } from './connfig'

export interface ColumnProps<T = any> extends Partial<TableColumnCtx<T>> {
  prop?: any
  label: string
  slot?: string
}

export interface OperationProps<T = any> {
  label?: any
  icon: columnIcons
  action: ({ row, column, $index }: {
    row: T
    column: TableColumnCtx<T>
    $index: number
  }) => any
}
