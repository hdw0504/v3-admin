import type { FunctionalComponent, InjectionKey, SVGAttributes, Slots } from 'vue'
import type { ColumnProps } from './types'
import ElView from '~icons/ep/view'
import ElEditPen from '~icons/ep/edit-pen'
import ElDelete from '~icons/ep/delete'
import ElCheck from '~icons/ep/check'
import ElClose from '~icons/ep/close'
import { deepClone } from '@/utils/object'

// 常用操作的 logo
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
  const config = deepClone(column)
  delete config?.children
  return {
    ...config,
    align: config?.align ?? 'center',
    showOverflowTooltip: config?.showOverflowTooltip ?? true,
  }
}

// 爷孙传参 插槽
export const slotKey: InjectionKey<Slots> = Symbol('slotsKey')
