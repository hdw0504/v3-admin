import type { FormItemProps, FormProps } from 'element-plus'
import type { GlobalComponents } from 'vue'
import type { ComponentsName } from './componentsdict'

interface basicAttrs {
  class?: any
  style?: any
}

export type getAttrs<T extends ComponentsName> = InstanceType<GlobalComponents[T]>['$props']

// 配置化表单
export namespace FormPro{
  /**
   * @description el-form 属性
   */
  export type Form = Partial<FormProps> & basicAttrs

  /**
   * @description el-form-item 属性
   * prop 只能字符串
   */
  export type FormItem = Partial<Exclude<FormItemProps, 'prop'>> & basicAttrs & {
    prop: string
  }
  /**
   * @description 展示的组件配置项
   */
  export interface Components {
    /**
     * @description el-form-item 属性
     */
    formItem: FormItem

    component: ComponentsName
    /**
     * @description component 属性
     */
    attrs: getAttrs<ComponentsName>
    /**
     * @description 有孩子节点的属性值
     */
    options?: { label?: any; value?: any }[]
    /**
     * @description 自定义组件的插槽key
     */
    slotKey?: string
  }
}
