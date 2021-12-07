<template>
  <div>
    <a-row :gutter="24">
      <a-col :md="6" :sm="24">
        <a-input-search
          v-model:value="searchTxt"
          placeholder="请输入待搜索内容"
          style="width: 200px"
          @search="onSearch"
        />
      </a-col>
      <a-col :md="6" :sm="24">
        <a-button type="primary" @click="onAddRole">增加角色</a-button>
      </a-col>
    </a-row>
    <br /><br />
    <h2>角色列表</h2>
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="dataSource"
      :loading="loading"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #open_flag="{ text }">
        {{ text === 0 ? '关' : '开' }}
      </template>

      <template #btn="{ record }">
        <a class="ant-dropdown-link" @click="onDetail(record)">编辑</a>
        <a-divider type="vertical" style="height: 10px; background-color: #7cb305" />
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            更多
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="#:;">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a href="#:;">禁用</a>
              </a-menu-item>
              <a-menu-item>
                <a href="#:;">删除</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-table>

    <updateRoleModal
      ref="updateRoleModalRef"
      :roleInfo="roleInfo"
      :roleType="roleType"
      @refreshData="getRoleList"
    ></updateRoleModal>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, nextTick, inject } from 'vue'
import { roleColumns } from './data'
import API from '@/api/index'
import updateRoleModal from './components/updateRoleModal'
import { DownOutlined } from '@ant-design/icons-vue'

const columns = ref(roleColumns)
const loading = ref(false)
// 默认分页
// reactive 只能给对象，数组 添加响应式
// 如果想给值类型(String，Number，Boolean，Symbol)添加响应式，就要用到ref
// toRef 针对一个响应式对象（reactive 封装）的 prop（属性）创建一个ref，且保持响应式
// toRefs 是一种用于破坏响应式对象并将其所有属性转换为 ref 的实用方法
const pagination = reactive({})
const dataSource = ref([])
const $Toast = inject('$Toast')

const updateRoleModalRef = ref('updateRoleModalRef')

onMounted(() => {
  init()
})

// 初始化
const init = function () {
  getRoleList()
}

// 获取角色列表
const getRoleList = async function (params = { current: 1, pageSize: 1 }) {
  loading.value = true
  await API.GetRoleList({
    pages_num: params.current,
    pages_size: params.pagesSize
  }).then((data) => {
    pagination.pageSize = params.pageSize
    pagination.current = params.current
    pagination.total = data.count
    pagination.showTotal = (total) => `总数 ${total} 条`
    loading.value = false
    dataSource.value = data.rows
  })
}

// 翻页
const handleTableChange = function (pag) {
  getRoleList({
    pageSize: pag.pageSize,
    current: pag.current
  })
}

// 搜索
let searchTxt = ref('')
const onSearch = () => {
  $Toast({ type: 'info', msg: `搜索${searchTxt.value}` })
}

// 弹窗 增加用户 查看详情
let roleInfo = ref({})
let roleType = ref('')
const onDetail = function (item) {
  roleType.value = 'Detail'
  roleInfo.value = item
  nextTick(() => {
    updateRoleModalRef.value.onShowModal()
  })
}

const onAddRole = async () => {
  roleType.value = 'Add'
  roleInfo.value = {}
  nextTick(() => {
    updateRoleModalRef.value.onShowModal()
  })
}
</script>
