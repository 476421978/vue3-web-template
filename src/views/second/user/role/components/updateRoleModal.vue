<template>
  <div>
    <DialogModal ref="DialogModalRef" :title="dialogTitle" :isHideFooter="true">
      <template #content>
        <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
          <a-form-item name="name" label="名称">
            <a-input v-model:value="formState.name" placeholder="请输入新角色名称" />
          </a-form-item>

          <a-form-item name="code" label="编码">
            <a-input type="number" v-model:value="formState.code" placeholder="请输入唯一编码" />
          </a-form-item>

          <a-form-item name="describe" label="描述">
            <a-textarea
              v-model:value="formState.describe"
              placeholder="请输入角色的描述"
              :auto-size="{ minRows: 2, maxRows: 5 }"
            />
          </a-form-item>

          <a-form-item name="web_auth_arr" label="权限角色">
            <a-checkbox-group v-model:value="formState.web_auth_arr" name="role" :options="getRoleFilter" />
          </a-form-item>

          <a-form-item name="open_flag" label="状态">
            <a-switch v-model:checked="formState.open_flag" />
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">{{ props.userType === 'Add' ? '创建' : '更新' }}</a-button>
            <a-button style="margin-left: 10px" @click="onCancel">取消</a-button>
          </a-form-item>
        </a-form>
      </template>
    </DialogModal>
  </div>
</template>

<script setup>
import API from '@/api'
import { ref, onMounted, computed, inject, reactive, toRaw } from 'vue'
import { getRoleCheckbox } from '@/utils/menu.js'
import DialogModal from '@/components/modal/dialogModal'

const DialogModalRef = ref('DialogModalRef')
const dialogTitle = {
  top: '权限详情'
}

const props = defineProps({
  roleType: {
    type: String,
    default: 'Add'
  },
  roleInfo: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['refreshData'])

const $Toast = inject('$Toast')

// 显示
const onShowModal = function () {
  DialogModalRef.value.onShowModal()
  if (props.roleInfo) {
    // 已拥有的权限
    formState.web_auth_arr = props.roleInfo.web_auth_arr || []
    formState.name = props.roleInfo.name
    formState.code = props.roleInfo.code
    formState.describe = props.roleInfo.describe
    formState.open_flag = props.roleInfo.open_flag === 0 ? false : true
  }
}

// from 表单
const formRef = ref()
const formState = reactive({
  name: '',
  code: 0,
  describe: '',
  web_auth_arr: [],
  open_flag: false
})
const rules = {
  name: [
    {
      required: true,
      message: '请输入正确格式的角色名称',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 10,
      message: '长度为1-10位',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      type: 'number',
      message: '请输入1-3位数字',
      trigger: 'blur',
      transform: (value) => {
        return Number(value)
      }
    }
  ],
  describe: [
    {
      required: true,
      message: '请输入1-99个字符',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 99,
      message: '长度为1-99位',
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
      // roleInfo.id 则更新反之则创建
      console.log('values', toRaw(formState))
      $Toast({ msg: `${props.roleInfo ? '更新' : '创建'}成功` })
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

// 递归权限
const getRoleFilter = computed(() => {
  // 过滤后的权限路由数据
  return getRoleCheckbox()
})

// 初始化
onMounted(() => {
  init()
})

const init = function () {}

// 将方法、变量暴露给父组件使用，父组件才可通过ref API拿到子组件暴露的数据
defineExpose({
  onShowModal
})
</script>
