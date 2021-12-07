# vue3

vue3.2 开始支持`<script steup></script>` 语法糖

UI 框架 ant-design-vue@next 支持 vue3

在线预览地址：https://www.hlgshare.top

## mock 模拟数据

### src/api

> http.js #axios 封装
> index.js #接口暴露

### src/assets 静态资源

### src/components 组件

### src/mixins 混合

> common.js #通用

### src/router 路由

> index.js #基本页面
> permission.js #权限页面
> second.js #二级页面

### src/store 存储

> index.js #Vuex

### src/utils 工具

> aesUtil.js #aes 加密解密
> config.js #静态配置
> login.js #登录方法封装
> sign.js #数据接口签名加密
> storage.js #localStorage 存储

### src/views 页面

> /empty/ #403 404 等页面
> /login/ #登录页
> /second #二级页
> index.vue #过度页
> layout.vue #布局页

### App.vue 默认页

### main.js 默认入口

### vue.config.js 跨域配置等配置

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```
