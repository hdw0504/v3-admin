/**
 * namespace 可以 GlobalState.assemblySize
 * interface 只能GlobalState['assemblySize']
 */
// export namespace ThemeConfigProps {
//   export type layout = string
// }

/* themeConfigProp */
export interface ThemeConfigProps {
  // 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
  layout: string
  primary: string
  isDark: boolean
  isGrey: boolean
  isCollapse: boolean
  isWeak: boolean
  breadcrumb: boolean
  breadcrumbIcon: boolean
  tabs: boolean
  tabsIcon: boolean
  footer: boolean
  maximize: boolean
}

/* GlobalState */
export interface GlobalState {
  token: string
  userInfo: any
  assemblySize: 'default' | 'large' | 'small'
  language: string
  themeConfig: ThemeConfigProps
}

/* tabsMenuProps */
export interface TabsMenuProps {
  icon: string
  title: string
  path: string
  close: boolean
}

/* TabsState */
export interface TabsState {
  tabsMenuList: TabsMenuProps[]
}

/* AuthState */
export interface AuthState {
  authButtonList: {
    [key: string]: {
      [key: string]: boolean
    }
  }
  authMenuList: Menu.MenuOptions[]
}
