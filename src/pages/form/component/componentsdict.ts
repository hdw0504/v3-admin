/**
 * @description
 * 因为是按需引入，所以需要把用到的组件引入进来
 */
export const componentsDict = {
  ElForm,
  ElFormItem,
  ElCheckbox,
  ElCheckboxGroup,
  ElInput,
  ElInputNumber,
  ElRadio,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElOption,
  // ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  // ElUpload
}

export type ComponentsName = keyof typeof componentsDict
