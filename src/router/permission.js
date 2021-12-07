import router from './index'
import Store from '@/store/index'
import Storage from '@/utils/storage'

router.beforeEach((to, from, next) => {
  // 进入404
  if (from.name === '404' || to.path === '/404') next()

  // 进入不存在路由
  if (to.path !== '/404' && to.matched.length === 0) {
    next({
      path: '/404'
    })
  }

  // 权限判断
  if (to.matched.some((res) => res.meta.requireAuth)) {
    // 获取用户信息
    let userInfo = Store.state.stoUser
    // 找不到 则local重载用户信息
    if (!userInfo) {
      userInfo = Storage.get('VUE_USER_INFO')
      Store.dispatch('saveUser', userInfo)
      // 如果还是没有则要求重新登录
      if (!userInfo) {
        next({
          path: '/login'
        })
      }
    }

    // 判断进入页面是否需要权限
    if (!to.meta.auth) next()

    // 需要权限并且有权限进入
    if (userInfo.vue_role?.web_auth_arr.includes(to.meta.auth)) {
      next()
    } else {
      // 需要权限但无权限进入
      next({ name: '403' })
    }
  } else {
    next()
  }
})
