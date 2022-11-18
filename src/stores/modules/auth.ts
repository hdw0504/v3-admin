import { defineStore } from 'pinia'
import type { AuthState } from '@/stores/interface'
import piniaPersistConfig from '@/config/piniaPersist'
import { getAuthButtonListApi, getAuthMenuListApi } from '@/api/modules/login'
import { getAllBreadcrumbList, getShowMenuList } from '@/utils/util'

export const AuthStore = defineStore('AuthState', () => {
  // state
  const authButtonList = reactive<AuthState['authButtonList']>({})
  const authMenuList = reactive<AuthState['authMenuList']>([])

  // getters
  const getBreadcrumbList = computed(() => getAllBreadcrumbList(authMenuList))
  const getMenuList = computed(() => getShowMenuList(authMenuList))

  // actions
  // getAuthButtonList
  const getAuthButtonList = async () => {
    const { data } = await getAuthButtonListApi()
    Object.assign(authButtonList, data)
  }
  // getAuthMenuList
  const getAuthMenuList = async () => {
    const { data } = await getAuthMenuListApi()
    authMenuList.push(...data)
  }

  return {
    authButtonList,
    authMenuList,
    getBreadcrumbList,
    getMenuList,
    getAuthMenuList,
    getAuthButtonList,
  }
}, {
  persist: piniaPersistConfig('AuthState', ['authButtonList']),
})
