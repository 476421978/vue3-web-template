<template>
  <DialogModal ref="DialogModalRef" :title="dialogTitle" :isHideFooter="true">
    <template #content>
      <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
        <a-form-item name="account" label="账号">
          <a-input type="text" v-model:value="formState.account" placeholder="请输入新用户账号4-8位" />
        </a-form-item>

        <a-form-item name="password" label="密码">
          <a-input type="text" v-model:value="formState.password" placeholder="请输入新用户密码4-8位" />
        </a-form-item>

        <a-form-item name="sex" label="性别">
          <a-radio-group v-model:value="formState.sex">
            <a-radio value="1">男</a-radio>
            <a-radio value="0">女</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item name="vue_role_id" label="权限角色">
          <a-select v-model:value="formState.vue_role_id" style="width: 120px">
            <template v-for="item in roleList" :key="item.id">
              <a-select-option :value="item.id">{{ item.name }}</a-select-option>
            </template>
          </a-select>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">{{ props.userType === 'Add' ? '创建' : '更新' }}</a-button>
          <a-button style="margin-left: 10px" @click="onCancel">取消</a-button>
        </a-form-item>
      </a-form>
    </template>
  </DialogModal>
</template>

<script setup>
import API from '@/api'
import { ref, onMounted, reactive, toRaw, inject } from 'vue'
import DialogModal from '@/components/modal/dialogModal'

const DialogModalRef = ref('DialogModalRef')
const dialogTitle = {
  top: '增加新用户'
}

const props = defineProps({
  userType: {
    type: String,
    default: 'Add'
  },
  userInfo: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['refreshData'])

const $Toast = inject('$Toast')

// 权限下拉框
const roleList = ref([])
const getRoleList = async function () {
  const res = await API.GetRoleList()
  if (res) roleList.value = res.rows
}

// from 表单
const formRef = ref()
const formState = reactive({
  account: '',
  password: '',
  sex: '',
  vue_role_id: ''
})
const rules = {
  account: [
    {
      required: true,
      message: '请输入正确格式的账号',
      trigger: 'blur'
    },
    {
      min: 4,
      max: 8,
      message: '长度为4位-8位',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入正确格式的密码',
      trigger: 'blur'
    },
    {
      min: 4,
      max: 8,
      message: '长度为4位-8位',
      trigger: 'blur'
    }
  ],
  sex: [
    {
      required: true,
      message: '请选择性别',
      trigger: 'blur'
    }
  ],
  vue_role_id: [
    {
      required: true,
      message: '请选择角色',
      trigger: 'blur'
    }
  ]
}
// label 标签布局，同 <Col> 组件，设置 span offset 值，
//如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}
const labelCol = {
  span: 4
}
// 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
const wrapperCol = {
  span: 14
}

// 提交表单
const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      // userInfo.id 则更新反之则创建
      // const res = await API.CreateUser(toRaw(formState))
      console.log('values', toRaw(formState))
      $Toast({ msg: `${props.userInfo ? '更新' : '创建'}成功` })
      emit('refreshData') // 刷新数据
      DialogModalRef.value.onHideModal()
    })
    .catch((error) => {
      console.log('error', error)
    })
}
// 取消
const onCancel = () => {
  DialogModalRef.value.onHideModal()
}

// 嵌套子组件显示
const modalType = ref('')
const onShowModal = function () {
  DialogModalRef.value.onShowModal()
  if (props.userInfo) {
    formState.account = props.userInfo.account
    formState.password = props.userInfo.password
    formState.sex = props.userInfo.sex + ''
    formState.vue_role_id = props.userInfo.vue_role_id
  }
}

// 初始化
onMounted(() => {
  init()
})

const init = function () {
  getRoleList()
}

// 将方法、变量暴露给父组件使用，父组件才可通过ref API拿到子组件暴露的数据
defineExpose({
  onShowModal
})
</script>
