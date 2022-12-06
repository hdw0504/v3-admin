import type { FormItemProps, FormProps } from 'element-plus'
import type { GlobalComponents } from 'vue'
import type { ComponentsName } from './componentsdict'

interface basicAttrs {
  class?: any
  style?: any
}

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
    attrs: Partial<GlobalComponents[ComponentsName]>
  }
}
