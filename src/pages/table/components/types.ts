import type { TableColumnCtx } from 'element-plus'
import type { columnIcons } from './config'

type elTableColumnProps<T = any> = Partial<Omit<TableColumnCtx<T>, 'children'>>
// 需要先在原来的TableColumnCtx排除后重写
export interface ColumnProps<T = any> extends elTableColumnProps {
  prop?: 'selection' | 'expand' | 'index' | 'operation' | string
  label?: string
  // overwrite column config
  children?: ColumnProps<T>[]
}

export interface HeaderScope<T = any> {
  column: TableColumnCtx<T>
  $index: number
}

export interface RowScope<T = any> {
  row: T
  column: TableColumnCtx<T>
  $index: number
}

export interface OperationProps<T = any> {
  label?: any
  icon: columnIcons
  visible?: ({ row, column, $index }: RowScope<T>) => boolean
  action: ({ row, column, $index }: RowScope<T>) => any
}
