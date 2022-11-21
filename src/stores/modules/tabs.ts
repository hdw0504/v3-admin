import piniaPersistConfig from '@/config/piniaPersist'
import type { TabsMenuProps, TabsState } from '@/stores/interface'
import { TABS_WHITE_LIST } from '@/config/config'
import router from '@/routers/index'

export const TabsStore = defineStore('TabsState', () => {
  const tabsMenuList = reactive<TabsState['tabsMenuList']>([])

  const addTabs = (tabItem: TabsMenuProps) => {
    // not add tabs white list
    if (TABS_WHITE_LIST.includes(tabItem.path))
      return
    if (tabsMenuList.some(item => item.path === tabItem.path))
      return
    tabsMenuList.push(tabItem)
  }

  const removeTabs = (tabPath: string, isCurrent = true) => {
    const curInx = tabsMenuList.findIndex(item => item.path === tabPath)
    if (isCurrent) {
      const nextTab = tabsMenuList[curInx + 1] || tabsMenuList[curInx - 1]
      if (!nextTab)
        return
      router.push(nextTab.path)
    }
    tabsMenuList.splice(curInx, 1)
  }

  const closeMultipleTab = (tabsMenuValue?: string) => {
    const curInx = tabsMenuList.findIndex(item => item.path === tabsMenuValue || !item.close)
    tabsMenuList.splice(curInx, 1)
  }

  return {
    tabsMenuList,
    addTabs,
    removeTabs,
    closeMultipleTab,
  }
}, {
  persist: piniaPersistConfig('TabState'),
})
