import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { GlobalState } from './interface'
// import { ThemeConfigProps } from './interface'
import piniaPersistConfig from '@/config/piniaPersist'
import { DEFAULT_PRIMARY } from '@/config/config'

export const GlobalStore = defineStore('GlobalState', () => {
  const token = ref<GlobalState['token']>('')

  const userInfo = ref<GlobalState['userInfo']>('')
  // element组件大小
  const assemblySize = ref<GlobalState['assemblySize']>('default')

  const language = ref<GlobalState['language']>('')
  // userInfo
  const themeConfig = reactive<GlobalState['themeConfig']>({
    // 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
    layout: 'vertical',
    // 默认 primary 主题颜色
    primary: DEFAULT_PRIMARY,
    // 深色模式
    isDark: false,
    // 灰色模式
    isGrey: false,
    // 色弱模式
    isWeak: false,
    // 折叠菜单
    isCollapse: false,
    // 面包屑导航
    breadcrumb: true,
    // 面包屑导航图标
    breadcrumbIcon: true,
    // 标签页
    tabs: true,
    // 标签页图标
    tabsIcon: true,
    // 页脚
    footer: true,
    // 当前页面是否全屏
    maximize: false,
  })

  return {
    token,
    userInfo,
    assemblySize,
    language,
    themeConfig,
    // setAssemblySizeSize,
  }
}, {
  persist: piniaPersistConfig('GlobalState'),
})

// piniaPersist(持久化)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
