import piniaPersistConfig from '@/config/piniaPersist'
import type { TabsMenuProps, TabsState } from '@/stores/interface'
import { TABS_WHITE_LIST } from '@/config/config'
import router from '@/routers/index'

export const TabsStore = defineStore('TabsState', () => {
  const tabsMenuList = ref<TabsState['tabsMenuList']>([])

  const addTabs = (tabItem: TabsMenuProps) => {
    // not add tabs white list
    if (TABS_WHITE_LIST.includes(tabItem.path))
      return
    if (tabsMenuList.value.some(item => item.path === tabItem.path))
      return
    tabsMenuList.value.push(tabItem)
  }

  const removeTabs = (tabPath: string, isCurrent = true) => {
    const curInx = tabsMenuList.value.findIndex(item => item.path === tabPath)
    if (isCurrent) {
      const nextTab = tabsMenuList.value[curInx + 1] || tabsMenuList.value[curInx - 1]
      if (!nextTab)
        return
      router.push(nextTab.path)
    }
    tabsMenuList.value.splice(curInx, 1)
  }

  const closeMultipleTab = (tabsMenuValue?: string) => {
    tabsMenuList.value = tabsMenuList.value.filter(item => item.path === tabsMenuValue || !item.close)
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
