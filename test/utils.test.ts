import { describe, it } from 'vitest'
import {
  getAllBreadcrumbList as getAllBreadcrumbListOld,
  getFlatArr as getFlatArrOld,
  getKeepAliveRouterName as getKeepAliveRouterNameOld,
  getMenuListPath as getMenuListPathOld,
  getShowMenuList as getShowMenuListOld,
} from '@/utils/util'
import DynamicRouter from '@/assets/json/dynamicRouter.json'
import { isArray } from '@/utils/is'
import { deepClone } from '@/utils/object'

describe('utils function', () => {
  function getFlatArr(menulist: Menu.MenuOptions[]) {
    return menulist.reduce((prev: Menu.MenuOptions[], current: Menu.MenuOptions) => {
      prev.push(current)
      isArray(current.children) && prev.push(...getFlatArr(current.children))
      return prev
    }, [])
  }

  function getKeepAliveRouterName(menuList: Menu.MenuOptions[]) {
    return menuList.reduce((prev: string[], current: Menu.MenuOptions) => {
      current.meta.isKeepAlive && current.name && prev.push(current.name)
      isArray(current.children) && prev.push(...getKeepAliveRouterName(current.children))
      return prev
    }, [])
  }

  function getShowMenuList(menuList: Menu.MenuOptions[]) {
    const list = deepClone(menuList)
    const loop = (menus: Menu.MenuOptions[]) => {
      return menus.filter((item) => {
        if (isArray(item.children))
          item.children = loop(item.children)
        return !item.meta.isHide
      })
    }
    return loop(list)
  }

  function getMenuListPath(menuList: Menu.MenuOptions[]) {
    return menuList.reduce((prev: string[], cur) => {
      prev.push(cur.path)
      isArray(cur.children) && prev.push(...getMenuListPath(cur.children))
      return prev
    }, [])
  }

  function getAllBreadcrumbList(menuList: Menu.MenuOptions[], result: Record<string, any> = {}, path = []) {
    for (const item of menuList) {
      result[item.path] = [...path, item]
      if (item.children)
        getAllBreadcrumbList(item.children, result, result[item.path])
    }
    return result
  }

  it('getFlatArr', () => {
    expect(getFlatArrOld(DynamicRouter.data)).toEqual(getFlatArr(DynamicRouter.data))
  })

  it('getKeepAliveRouterName', () => {
    expect(getKeepAliveRouterNameOld(DynamicRouter.data)).toEqual(getKeepAliveRouterName(DynamicRouter.data))
  })

  it('getKeepAliveRouterName', () => {
    expect(getShowMenuListOld(DynamicRouter.data)).toEqual(getShowMenuList(DynamicRouter.data))
  })

  it('getMenuListPath', () => {
    expect(getMenuListPathOld(DynamicRouter.data)).toEqual(getMenuListPath(DynamicRouter.data))
  })

  it('getAllBreadcrumbList', () => {
    // expect(getAllBreadcrumbListOld(DynamicRouter.data)).toEqual(getAllBreadcrumbList(DynamicRouter.data))
    expect(getAllBreadcrumbListOld(DynamicRouter.data)).toMatchSnapshot()
    expect(getAllBreadcrumbList(DynamicRouter.data)).toMatchSnapshot()
  })
})
