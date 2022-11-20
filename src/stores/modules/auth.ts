import { defineStore } from 'pinia'
import type { AuthState } from '@/stores/interface'
import piniaPersistConfig from '@/config/piniaPersist'
import { getAuthButtonListApi, getAuthMenuListApi } from '@/api/modules/login'
import { getAllBreadcrumbList, getKeepAliveRouterName, getShowMenuList } from '@/utils/util'

export const AuthStore = defineStore('AuthState', () => {
  // state
  const authButtonList = ref<AuthState['authButtonList']>({})
  const authMenuList = ref<AuthState['authMenuList']>([])

  // getters
  const getBreadcrumbList = computed(() => getAllBreadcrumbList(authMenuList.value))
  const getMenuList = computed(() => getShowMenuList(authMenuList.value))
  const getKeepAliveRouter = computed(() => getKeepAliveRouterName(authMenuList.value))

  // actions
  // getAuthButtonList
  const getAuthButtonList = async () => {
    const { data } = await getAuthButtonListApi()
    authButtonList.value = data
  }
  // getAuthMenuList
  const getAuthMenuList = async () => {
    const { data } = await getAuthMenuListApi()
    authMenuList.value = data
  }

  return {
    authButtonList,
    authMenuList,
    getBreadcrumbList,
    getMenuList,
    getAuthMenuList,
    getAuthButtonList,
    getKeepAliveRouter,
  }
}, {
  persist: piniaPersistConfig('AuthState', ['authButtonList']),
})
