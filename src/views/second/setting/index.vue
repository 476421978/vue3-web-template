<template>
  <div class="setting">
    <a-tabs v-model:activeKey="activeKey" tabPosition="left">
      <a-tab-pane key="1" tab="基本设置">
        <h2>基本设置</h2>

        <a-form ref="formRef" layout="vertical" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item name="name" label="昵称">
            <a-input v-model:value="formState.name" placeholder="请输入昵称" />
          </a-form-item>

          <a-form-item name="describe" label="自我介绍">
            <a-textarea
              v-model:value="formState.describe"
              placeholder="请输入自我介绍"
              :auto-size="{ minRows: 2, maxRows: 5 }"
            />
          </a-form-item>

          <a-form-item name="email" label="电子邮件">
            <a-input v-model:value="formState.email" placeholder="请输入电子邮件@" />
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">更新</a-button>
            <a-button style="margin-left: 10px" @click="onCancel">重置</a-button>
          </a-form-item>
        </a-form>

        <div class="up-image">
          <a-avatar :size="64">
            <template #icon><UserOutlined /></template>
          </a-avatar>

          <a-upload
            class="margin-top"
            v-model:file-list="fileList"
            name="file"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers"
            @change="handleChange"
          >
            <a-button>
              <upload-outlined></upload-outlined>
              上传头像
            </a-button>
          </a-upload>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="安全设置" force-render>安全设置</a-tab-pane>
      <a-tab-pane key="3" tab="个性化">个性化</a-tab-pane>
      <a-tab-pane key="4" tab="账号绑定">账号绑定</a-tab-pane>
      <a-tab-pane key="5" tab="新消息通知">新消息通知</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject, reactive, toRaw } from 'vue'
// import { useRouter } from 'vue-router'
import { UserOutlined } from '@ant-design/icons-vue' // 图标

const $Toast = inject('$Toast')

// from 表单
const formRef = ref()
const formState = reactive({
  name: '',
  email: '',
  describe: ''
})
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
      $Toast({ msg: '更新成功' })
    })
    .catch((error) => {
      console.log('error', error)
    })
}
// 取消
const onCancel = () => {
  DialogModalRef.value.onHideModal()
}

// 上传头像
const fileList = ref([])
const headers = reactive({
  authorization: 'authorization-text'
})
const handleChange = function (info) {
  if (info.file.status !== 'uploading') {
    $Toast({ type: 'error', msg: '上传错误' })
  }
  if (info.file.status === 'done') {
    $Toast({ msg: `${info.file.name} file uploaded successfully.` })
  } else if (info.file.status === 'error') {
    $Toast({ type: 'error', msg: `${info.file.name} file upload failed.` })
  }
}

// 导航
const activeKey = ref('1')
</script>

<style lang="scss" scoped>
.up-image {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
