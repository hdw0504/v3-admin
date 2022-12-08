import type { ResPage, User } from '../interface'
import http from '@/api/index'

export const getUserList = (params: User.ReqGetUserParams) => {
  return http.get<ResPage<User.ResUserList>>('/user/list', params)
  // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 dynamicRouter.json 数据
}
