import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './router/permission'
// ant-design框架
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { message } from 'ant-design-vue'

// 模拟数据mock 会拦截请求
import '../mock/index.js'

// 全局样式
import '../src/styles/base.css'

const app = createApp(App)

/**
 * 全局变量
 */
// 判断浏览器或手机设备
app.provide(
  '$isMobile',
  navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
)

app.provide('$Toast', function Toast({ type = 'success', msg = '提示信息', time = 3 }) {
  message[type](msg, time)
})

app.config.productionTip = false // 阻止启动生产消息

app.use(Antd)
app.use(store).use(router).mount('#app')
