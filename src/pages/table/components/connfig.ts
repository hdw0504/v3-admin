import type { FunctionalComponent, SVGAttributes } from 'vue'
import ElView from '~icons/ep/view'
import ElEditPen from '~icons/ep/edit-pen'
import ElDelete from '~icons/ep/delete'

export const commonIcons = {
  detail: ElView,
  edit: ElEditPen,
  delete: ElDelete,
}

export type columnIcons = keyof typeof commonIcons | FunctionalComponent<SVGAttributes, {}>
