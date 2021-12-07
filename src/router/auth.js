export default [
  {
    path: '/layout/home', // 首页
    name: 'home',
    meta: {
      title: '首页',
      auth: 'home',
      key: '0'
    },
    component: () => import(/* webpackChunkName: "group-home" */ '@/views/second/home/index.vue')
  },
  {
    path: '/layout/setting',
    name: 'setting',
    meta: {
      title: '设置页',
      auth: 'setting',
      key: '1'
    },
    component: () => import(/* webpackChunkName: "group-setting" */ '@/views/second/setting/index.vue')
  },
  /** 人物页 */
  {
    path: '/layout/user',
    name: 'user',
    meta: {
      title: '用户管理',
      auth: 'user-management',
      key: '2-1'
    },
    component: () => import(/* webpackChunkName: "group-user" */ '@/views/second/user/index.vue')
  },
  {
    path: '/layout/user/role',
    name: 'role',
    meta: {
      title: '角色管理',
      auth: 'user-role',
      key: '2-2'
    },
    component: () => import(/* webpackChunkName: "group-user" */ '@/views/second/user/role/index.vue')
  },
  /** 异常页 */
  {
    path: '/layout/empty/403',
    name: 'empty/403',
    meta: {
      title: '404',
      key: '3-1'
    },
    component: () => import(/* webpackChunkName: "group-empty" */ '@/views/empty/403.vue')
  },
  {
    path: '/layout/empty/404',
    name: 'empty/404',
    meta: {
      title: '403',
      key: '3-2'
    },
    component: () => import(/* webpackChunkName: "group-empty" */ '@/views/empty/404.vue')
  },
  {
    path: '/layout/empty/500',
    name: 'empty/500',
    meta: {
      title: '500',
      key: '3-3'
    },
    component: () => import(/* webpackChunkName: "group-empty" */ '@/views/empty/500.vue')
  }
]
