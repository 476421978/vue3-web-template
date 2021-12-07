import axios from 'axios'
import store from '@/store'
import storage from '../utils/storage'
import AES from '../utils/aesUtil'
import VueConfig from '../utils/config'
import sign from '../utils/sign'
// 框架
import { message } from 'ant-design-vue'

const PRO_URL = 'https://hlgshare.top'
const DEV_URL = 'http://127.0.0.1:7001'

let URL_PREFIX = process.env.NODE_ENV === 'development' ? `${DEV_URL}/vue` : `${PRO_URL}/vue`

// 创建实例
let instance = axios.create({
  baseURL: URL_PREFIX,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})

let isRefreshing = false // 标记是否正在刷新 token
let requests = [] // 存储待重发请求的数组

let POST = function (url, data, options) {
  let code, result
  return new Promise(function (resolve, reject) {
    instance
      .post(url, data, options)
      .then((res) => {
        code = res.data.code
        result = res.data.result
        if (code !== 200) throw codeStatus(code, result)
        resolve(result)
      })
      .catch((err) => {
        message.error(err)
        reject(err)
      })
  })
}

// code 详情
const codeStatus = function (code, result) {
  let errInfo = '请求接口出错'
  // 默认常见类型
  switch (code) {
    case 403:
      errInfo = '无权限请求'
      break
    case 404:
      errInfo = '找不到页面'
      break
    case 412:
      errInfo = '请求头出错'
      break
    case 500:
      errInfo = '服务器请求出错'
      break
    default:
      break
  }

  // 重定向 错误信息
  if (typeof result === 'string') {
    errInfo = result
    if (result.indexOf('登录') !== -1) routerRedirect('/login', 2000)
  }

  // 返回错误信息
  return errInfo
}

// 刷新令牌
const refreshToken = async function () {
  return POST('/refresh_token', {
    account: store.state.stoUser?.account
  })
}

// 路由重定向 跳转登录页
const routerRedirect = function (rUrl, time) {
  // 跳转页面
  setTimeout(() => {
    router.replace({
      path: rUrl
    })
  }, time)
}

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // Token
    config.headers.token = store.state.stoUser?.token || null
    config.headers.refToken = store.state.stoUser?.refToken || null

    // Sign
    if (VueConfig.IsOpenSign) {
      const { vueSignature, vueTimestamp, vueNonce } = sign.signatureInterface(config.data)
      config.headers['vue-signature'] = vueSignature
      config.headers['vue-timestamp'] = vueTimestamp
      config.headers['vue-nonce'] = vueNonce
    }

    // AES
    if (VueConfig.IsOpenAesParams) {
      data = { reqAes: AES.AesEncrypt(JSON.stringify(data)) } || { reqAes: undefined }
    }

    return config
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (VueConfig.IsOpenAesDec) {
      if (typeof response.data.result !== 'string' || !JSON.parse(AES.AesDecrypt(response.data.result))) {
        throw '尝试解密失败/数据格式不对'
      }
      response.data.result = JSON.parse(AES.AesDecrypt(response.data.result))
    }

    // 对响应数据做点什么
    if (response.data?.code === 4002 && !response.config.url.includes('/refresh_token')) {
      const { config } = response
      if (!isRefreshing) {
        isRefreshing = true
        return refreshToken()
          .then((res) => {
            // 获取存储用户信息
            let userInfo = store.state.stoUser
            userInfo.token = res.token

            // 更新用户token存储信息
            storage.set('VUE_USER_INFO', userInfo)
            store.dispatch('saveUser', userInfo)
            config.headers.token = res.token

            // token 刷新后将数组的方法重新执行
            requests.forEach((cb) => cb(token))
            requests = [] // 重新请求完清空

            // 再次执行请求
            return instance(config)
          })
          .catch((err) => {
            console.log('抱歉，您的登录状态已失效，请重新登录！')
            return Promise.reject(err)
          })
          .finally(() => {
            isRefreshing = false
          })
      } else {
        // 返回未执行 resolve 的 Promise
        return new Promise((resolve) => {
          // 用函数形式将 resolve 存入，等待刷新后再执行
          requests.push((token) => {
            config.headers.token = token
            resolve(instance(config))
          })
        })
      }
    }

    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { POST }
