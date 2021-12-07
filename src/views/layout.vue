<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu mode="inline" theme="dark" v-model:selectedKeys="getSelectKey">
          <!-- 循环菜单列表 -->
          <template v-for="item in getNavList">
            <!-- 一级菜单 没有子菜单-->
            <template v-if="!item.childMenu || item.childMenu.length === 0">
              <a-menu-item :key="item.key" @click="Location(item)">
                <template #icon>
                  <ComIcon :title="item.icon" />
                </template>
                {{ item.name }}
              </a-menu-item>
            </template>
            <!-- 递归组件 -->
            <template v-else>
              <MenuItem :menu-info="item" :key="item.key" />
            </template>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <!-- 头部 -->
        <a-layout-header style="background: #fff; padding: 0; padding-right: 20px">
          <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          <div class="user-wrapper">
            <a-dropdown :trigger="['hover']" placement="bottomRight">
              <div class="ant-dropdown-link" href="#">
                {{ $store.state.stoUser?.account }}
              </div>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="3">
                    <div @click="overloading">重载用户信息</div>
                  </a-menu-item>
                  <a-menu-item key="4">
                    <div @click="onChangePass">修改密码</div>
                  </a-menu-item>
                  <a-menu-item key="5">
                    <div @click="signOut">退出</div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </a-layout-header>
        <Crumb :selectKey="getSelectKey[0]" />
        <!-- 主内容 -->
        <a-layout-content :style="{ margin: '12px 16px', padding: '24px', background: '#fff', minHeight: 'auto' }">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <a
            target="_blank"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44122502000031"
            style="display: inline-block; text-decoration: none; height: 20px; line-height: 20px"
            ><img src="../assets/备案图标.png" style="float: left" />
            <p style="float: left; height: 20px; line-height: 20px; margin: 0px 0px 0px 5px; color: #939393">
              粤公网安备 44122502000031号
            </p></a
          >
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref, computed, toRaw } from 'vue'
import { menuList } from '@/utils/menu.js'
import MenuItem from '@/components/menu/MenuItem.vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import utilsL from '@/utils/login'
import { getMenuAllPath } from '@/utils/menu.js'
import Crumb from '@/components/crumb'
import ComIcon from '@/components/icon'

const router = useRouter()
const route = useRoute()
const store = useStore() // 使用useStore方法
const collapsed = ref(false) // 隐藏/显示菜单

const navList = menuList // 默认菜单

// 菜单默认选择
const getSelectKey = computed(() => {
  const MenuAllArr = toRaw(getMenuAllPath())
  const routePath = route.meta.key
  const selectIndex = MenuAllArr.findIndex(function (item) {
    return item === routePath
  })
  return [MenuAllArr[selectIndex]]
})

// 过滤菜单
const getNavList = computed(() => {
  const userInfo = store.state.stoUser
  if (!userInfo) return []
  const userAuth = userInfo.vue_role.web_auth_arr || []
  const res = navList
    .map((item) => {
      if (userAuth.includes(item.auth) || !item.auth) {
        return item
      }
    })
    .filter((obj) => {
      if (obj) return true
    })
  return res
})

// 跳转页面
const Location = function (item) {
  router.push(`/layout/${item.path}`)
}

const overloading = function () {
  alert('重载信息')
}
const onChangePass = function () {
  alert('修改密码')
}
const signOut = function () {
  utilsL.UtiLoginOut()
  router.push('/login')
}
</script>

<style lang="less">
#components-layout-demo-custom-trigger {
  min-height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.user-wrapper {
  float: right;
  padding: 0 12px;
}
</style>
