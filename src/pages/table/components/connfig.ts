import type { FunctionalComponent, SVGAttributes } from 'vue'
import ElView from '~icons/ep/view'
import ElEditPen from '~icons/ep/edit-pen'
import ElDelete from '~icons/ep/delete'
import ElCheck from '~icons/ep/check'
import ElClose from '~icons/ep/close'

export const commonIcons = {
  detail: ElView,
  edit: ElEditPen,
  delete: ElDelete,
  on: ElCheck,
  off: ElClose,
}

export type columnIcons = keyof typeof commonIcons | FunctionalComponent<SVGAttributes, {}>
