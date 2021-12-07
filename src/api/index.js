import { POST } from './http'
export default {
  /** 登录 */
  Login: (data) => POST('/vue_login', data),
  /** 获取静态数据 */
  GetStaticData: (data) => POST('/get_static_data', data),

  /** 用户管理 */
  CreateUser: (data) => POST('/create_user', data),
  DeleteUser: (data) => POST('/delete_user', data),
  UpdateUser: (data) => POST('/update_user', data),
  GetUser: (data) => POST('/get_user', data),
  GetUserList: (data) => POST('/get_user_list', data),

  /** 角色列表 */
  GetRoleList: (data) => POST('/get_role_list', data),

  /** 刷新token */
  RefreshToken: (data) => POST('/refresh_token', data)
}
