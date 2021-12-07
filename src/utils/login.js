import API from '../api'
import storage from '@/utils/storage'
import Store from '../store/index'
/**
 * 登录逻辑
 * @param {object} params
 * @param {string} params.account
 * @param {string} params.password
 * @returns {boolean}
 */
const UtiLogin = async (params) => {
  try {
    const res = await API.Login(params)
    if (!res) return
    // 保存用户信息
    storage.set('VUE_USER_INFO', res)
    Store.dispatch('saveUser', res)
    return res
  } catch (err) {
    return false
  }
}

// 退出 清除用户信息  跳转登录页
const UtiLoginOut = async () => {
  try {
    // 清除用户信息
    storage.remove('VUE_USER_INFO')
    Store.dispatch('saveUser', null)
    return res
  } catch (err) {
    return false
  }
}

export default {
  UtiLogin,
  UtiLoginOut
}
