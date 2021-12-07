import Mock from 'mockjs' // 模拟数据
import { randomString } from '@/utils/common'
import { baseData } from '../base.js'

// 登录接口匹配拦截
Mock.mock(RegExp('/vue_login'), function (options) {
  const username = JSON.parse(options.body).account
  if (username === 'admin') {
    baseData.code = 200
    baseData.result = {
      id: '888',
      account: 'admin',
      password: 'admin',
      sex: 1,
      last_time: '2021-11-15T03:11:11.000Z',
      created_at: '2021-11-10T16:00:00.000Z',
      updated_at: '2021-11-10T16:00:00.000Z',
      deleted_at: null,
      vue_role_id: '1',
      vue_role: {
        id: '1',
        name: '管理员',
        code: 1,
        describe: '全部',
        open_flag: 1,
        web_auth_arr: ['home', 'setting', 'user', 'user-management', 'user-role'],
        created_at: '2021-11-10T16:00:00.000Z',
        updated_at: '2021-11-10T16:00:00.000Z',
        deleted_at: null
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNmJiOTA2Mi1jOTFkLTQ3NzMtODliOC0yNDYwOWIzODBkMTEiLCJpYXQiOjE2MzgxNzAwNzAsIm5iZiI6MTYzODE3MDA3MCwiZXhwIjoxNjM4MTczNjcwLCJ1aWQiOiI4ODgifQ.fj7VvRJHAxF9nynAmtbXlDjItxX8B9UsPSojGRsvlSE',
      refToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMmIzZDJhZC02MmIwLTRmZmEtYTdmMy0wZDY3Yzc4ZTJkN2EiLCJpYXQiOjE2MzgxNzAwNzAsIm5iZiI6MTYzODE3MDA3MCwiZXhwIjoxNjM4MjU2NDcwLCJ1aWQiOiI4ODgifQ.ZhaH4nF0K4-0EkmuW9McS2Pfgx7yFuYnLrqUYsdj7xY'
    }
  } else if (username === 'editor') {
    baseData.code = 200
    baseData.result = {
      id: '888',
      account: 'editor',
      password: 'editor',
      sex: 0,
      last_time: '2021-11-15T03:11:11.000Z',
      created_at: '2021-11-10T16:00:00.000Z',
      updated_at: '2021-11-10T16:00:00.000Z',
      deleted_at: null,
      vue_role_id: '2',
      vue_role: {
        id: '2',
        name: '二级人员',
        code: 2,
        describe: '部分权限',
        open_flag: 0,
        web_auth_arr: ['home', 'setting'],
        created_at: '2021-11-10T16:00:00.000Z',
        updated_at: '2021-11-10T16:00:00.000Z',
        deleted_at: null
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNmJiOTA2Mi1jOTFkLTQ3NzMtODliOC0yNDYwOWIzODBkMTEiLCJpYXQiOjE2MzgxNzAwNzAsIm5iZiI6MTYzODE3MDA3MCwiZXhwIjoxNjM4MTczNjcwLCJ1aWQiOiI4ODgifQ.fj7VvRJHAxF9nynAmtbXlDjItxX8B9UsPSojGRsvlSE',
      refToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMmIzZDJhZC02MmIwLTRmZmEtYTdmMy0wZDY3Yzc4ZTJkN2EiLCJpYXQiOjE2MzgxNzAwNzAsIm5iZiI6MTYzODE3MDA3MCwiZXhwIjoxNjM4MjU2NDcwLCJ1aWQiOiI4ODgifQ.ZhaH4nF0K4-0EkmuW9McS2Pfgx7yFuYnLrqUYsdj7xY'
    }
  } else {
    baseData.code = 400
    baseData.result = '用户名或密码错误'
  }
  return Mock.mock(baseData)
})

// 获取用户列表
Mock.mock(RegExp('/get_user_list'), function (options) {
  const data = {
    code: 200,
    result: {
      count: 2,
      rows: [
        {
          id: '777',
          account: 'editor',
          password: 'editor',
          sex: 0,
          last_time: '2021-11-15T03:11:11.000Z',
          created_at: '2021-11-10T16:00:00.000Z',
          updated_at: '2021-11-10T16:00:00.000Z',
          deleted_at: null,
          vue_role_id: '2',
          vue_role: {
            id: '2',
            name: '二级人员',
            code: 2,
            describe: '部分权限',
            open_flag: 0,
            web_auth_arr: ['home', 'setting'],
            created_at: '2021-11-10T16:00:00.000Z',
            updated_at: '2021-11-10T16:00:00.000Z',
            deleted_at: null
          }
        },
        {
          id: '888',
          account: 'admin',
          password: 'admin',
          sex: 1,
          last_time: '2021-11-15T03:11:11.000Z',
          created_at: '2021-11-10T16:00:00.000Z',
          updated_at: '2021-11-10T16:00:00.000Z',
          deleted_at: null,
          vue_role_id: '1',
          vue_role: {
            id: '1',
            name: '管理员',
            code: 1,
            describe: '全部权限',
            open_flag: 1,
            web_auth_arr: ['home', 'setting', 'user', 'user-management', 'user-role'],
            created_at: '2021-11-10T16:00:00.000Z',
            updated_at: '2021-11-10T16:00:00.000Z',
            deleted_at: null
          }
        }
      ]
    }
  }
  return Mock.mock(data)
})

// 获取权限列表
Mock.mock(RegExp('/get_role_list'), function (options) {
  const data = {
    code: 200,
    result: {
      count: 2,
      rows: [
        {
          id: '1',
          name: '管理员',
          code: 1,
          describe: '全部权限',
          open_flag: 1,
          web_auth_arr: ['home', 'setting', 'user', 'user-management', 'user-role'],
          created_at: '2021-11-10T16:00:00.000Z',
          updated_at: '2021-11-10T16:00:00.000Z',
          deleted_at: null
        },
        {
          id: '2',
          name: '二级人员',
          code: 2,
          describe: '部分权限',
          open_flag: 0,
          web_auth_arr: ['home', 'setting'],
          created_at: '2021-11-10T16:00:00.000Z',
          updated_at: '2021-11-10T16:00:00.000Z',
          deleted_at: null
        }
      ]
    }
  }
  return Mock.mock(data)
})
