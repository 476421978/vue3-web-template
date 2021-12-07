<template>
  <a-sub-menu :key="menuInfo.key">
    <template #icon>
      <ComIcon :title="menuInfo.icon" />
    </template>

    <template #title>{{ menuInfo.name }}</template>
    <template v-for="item in menuInfo.childMenu">
      <template v-if="hasChild(item)">
        <MenuItem :menu-info="item" :key="item.key" />
      </template>
      <template v-else>
        <a-menu-item :key="item.key" @click="Location(item)">
          {{ item.name }}
        </a-menu-item>
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined } from '@ant-design/icons-vue' // 图标
import ComIcon from '@/components/icon'
// 路由
const router = useRouter()

// 组件通讯
const props = defineProps({
  menuInfo: {
    type: Object,
    default: () => ({})
  }
})
// 是否有子菜单
const hasChild = function (item) {
  return item.childMenu && item.childMenu.length
}
// 跳转页面
const Location = async function (item) {
  router.push(`/layout/${item.path}`)
}
</script>
