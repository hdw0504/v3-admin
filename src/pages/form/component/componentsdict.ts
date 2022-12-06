/**
 * @description
 * 因为是按需引入，所以需要把用到的组件引入进来
 */
export const componentsDict = {
  ElForm,
  ElFormItem,
  ElInput,
}

export type ComponentsName = keyof typeof componentsDict
