// import { DEFAULT_PRIMARY } from '@/config/config'
// import { GlobalStore } from '@/stores'
// import { getDarkColor, getLightColor } from '@/utils/theme/tool'

// 修改主题颜色

export const useTheme = () => {
  // const { themeConfig } = storeToRefs(GlobalStore())

  // const changeThemeColor = (val: string) => {
  //   themeConfig.value.primary = val

  //   const primarylKey = '--el-color-primary'
  //   const primary = useCssVar(primarylKey)
  //   primary.value = themeConfig.value.primary

  //   // 颜色加深
  //   const primaryDark = useCssVar(`${primarylKey}-dark-2`)
  //   primaryDark.value = getDarkColor(themeConfig.value.primary, 0.1)
  //   // 颜色变浅
  //   for (let i = 1; i <= 9; i++) {
  //     const primaryLight = useCssVar(`${primarylKey}-light-${i}`)
  //     primaryLight.value = getLightColor(themeConfig.value.primary, i / 10)
  //   }
  // }
  // // 首次加载的时候需要同步颜色
  // onBeforeMount(() => {
  //   changeThemeColor(themeConfig.value.primary)
  // })

  // return {
  //   changeThemeColor,
  // }
}
