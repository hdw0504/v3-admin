import type { FunctionalComponent, SVGAttributes } from 'vue'
import type { ColumnProps } from './types'
import ElView from '~icons/ep/view'
import ElEditPen from '~icons/ep/edit-pen'
import ElDelete from '~icons/ep/delete'
import ElCheck from '~icons/ep/check'
import ElClose from '~icons/ep/close'
import { deepClone } from '@/utils/object'

export const commonIcons = {
  detail: ElView,
  edit: ElEditPen,
  delete: ElDelete,
  on: ElCheck,
  off: ElClose,
}
export type columnIcons = keyof typeof commonIcons | FunctionalComponent<SVGAttributes, {}>

// 默认行参数
export function defaltColumnProp(column?: ColumnProps) {
  return {
    ...column,
    align: column?.align ?? 'center',
    showOverflowTooltip: column?.showOverflowTooltip ?? true,
  }
}
