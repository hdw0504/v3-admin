import qs from 'qs'
import type { Login } from '../interface'
import http from '@/api'
import DynamicRouter from '@/assets/json/dynamicRouter.json'

// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>('/login', params, { headers: { noLoading: true } }) // 正常 post json 请求  ==>  application/json
  return http.post<Login.ResLogin>('/login', {}, { params }) // post 请求携带 query 参数  ==>  ?username=admin&password=123456
  return http.post<Login.ResLogin>('/login', qs.stringify(params)) // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
  return http.post<Login.ResLogin>('/login', params, { headers: { noLoading: true } }) // 控制当前请求不显示 loading
}

// * 获取按钮权限
export const getAuthButtonListApi = () => {
  return http.get<Login.ResAuthButtons>('/auth/buttons', {}, { headers: { noLoading: true } })
}

// * 获取菜单列表
export const getAuthMenuListApi = () => {
  // return http.get<Menu.MenuOptions[]>('/menu/list', {}, { headers: { noLoading: true } })
  // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 dynamicRouter.json 数据
  return DynamicRouter
}
